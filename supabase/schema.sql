-- ============================================
-- VAPI Call Logs Schema
-- ============================================
-- This schema stores detailed call data from VAPI.ai
-- Run this in your Supabase SQL Editor

-- Call Logs Table - Stores all phone call data
CREATE TABLE IF NOT EXISTS vapi_call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Call Identifiers
  call_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number_id VARCHAR(255),
  assistant_id VARCHAR(255),
  
  -- Call Details
  type VARCHAR(50), -- 'inboundPhoneCall' | 'outboundPhoneCall'
  status VARCHAR(50), -- 'completed' | 'failed' | 'busy' | 'no-answer'
  ended_reason VARCHAR(100),
  
  -- Customer Info
  customer_number VARCHAR(50),
  customer_name VARCHAR(255),
  
  -- Timing
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  duration_minutes DECIMAL(10, 2),
  
  -- Transcript & Recording
  transcript TEXT,
  summary TEXT,
  recording_url TEXT,
  stereo_recording_url TEXT,
  
  -- Performance Metrics
  model_latency_avg INTEGER, -- milliseconds
  voice_latency_avg INTEGER,
  transcriber_latency_avg INTEGER,
  turn_latency_avg INTEGER,
  
  -- Costs (from VAPI)
  cost_total DECIMAL(10, 4),
  cost_stt DECIMAL(10, 4),
  cost_llm DECIMAL(10, 4),
  cost_tts DECIMAL(10, 4),
  cost_vapi DECIMAL(10, 4),
  cost_knowledge_base DECIMAL(10, 4),
  
  -- Token Usage
  llm_prompt_tokens INTEGER,
  llm_completion_tokens INTEGER,
  tts_characters INTEGER,
  
  -- Language & Config
  language VARCHAR(10),
  
  -- Raw Data (for debugging)
  raw_data JSONB,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_vapi_calls_call_id ON vapi_call_logs(call_id);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_started_at ON vapi_call_logs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_customer ON vapi_call_logs(customer_number);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_status ON vapi_call_logs(status);
CREATE INDEX IF NOT EXISTS idx_vapi_calls_language ON vapi_call_logs(language);

-- Call Messages Table - Stores individual messages in calls
CREATE TABLE IF NOT EXISTS vapi_call_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_log_id UUID REFERENCES vapi_call_logs(id) ON DELETE CASCADE,
  
  -- Message Details
  role VARCHAR(20), -- 'user' | 'assistant' | 'system'
  message TEXT,
  
  -- Timing
  time BIGINT, -- Unix timestamp in milliseconds
  seconds_from_start DECIMAL(10, 3),
  duration INTEGER, -- milliseconds
  
  -- Metadata
  tool_calls JSONB,
  word_level_confidence JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vapi_messages_call_log ON vapi_call_messages(call_log_id);
CREATE INDEX IF NOT EXISTS idx_vapi_messages_time ON vapi_call_messages(time);

-- Function to get call logs with stats
CREATE OR REPLACE FUNCTION get_call_logs_with_stats(
  limit_count INTEGER DEFAULT 50,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  call_id VARCHAR,
  customer_number VARCHAR,
  started_at TIMESTAMPTZ,
  duration_minutes DECIMAL,
  cost_total DECIMAL,
  status VARCHAR,
  language VARCHAR,
  message_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cl.id,
    cl.call_id,
    cl.customer_number,
    cl.started_at,
    cl.duration_minutes,
    cl.cost_total,
    cl.status,
    cl.language,
    COUNT(cm.id) as message_count
  FROM vapi_call_logs cl
  LEFT JOIN vapi_call_messages cm ON cm.call_log_id = cl.id
  GROUP BY cl.id
  ORDER BY cl.started_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get daily call stats
CREATE OR REPLACE FUNCTION get_daily_call_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  date DATE,
  total_calls BIGINT,
  total_duration_minutes DECIMAL,
  total_cost DECIMAL,
  avg_duration_seconds DECIMAL,
  avg_cost DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    DATE(started_at) as date,
    COUNT(*) as total_calls,
    SUM(duration_minutes) as total_duration_minutes,
    SUM(cost_total) as total_cost,
    AVG(duration_seconds) as avg_duration_seconds,
    AVG(cost_total) as avg_cost
  FROM vapi_call_logs
  WHERE started_at >= NOW() - INTERVAL '1 day' * days_back
  GROUP BY DATE(started_at)
  ORDER BY date DESC;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (optional - adjust policies as needed)
ALTER TABLE vapi_call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vapi_call_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for service role (full access)
CREATE POLICY "Service role has full access to call logs"
  ON vapi_call_logs
  FOR ALL
  USING (true);

CREATE POLICY "Service role has full access to call messages"
  ON vapi_call_messages
  FOR ALL
  USING (true);

-- Comments for documentation
COMMENT ON TABLE vapi_call_logs IS 'Stores comprehensive data for all VAPI.ai phone calls';
COMMENT ON TABLE vapi_call_messages IS 'Stores individual messages/turns within each call';
COMMENT ON COLUMN vapi_call_logs.raw_data IS 'Full JSON payload from VAPI for debugging';
COMMENT ON COLUMN vapi_call_logs.summary IS 'AI-generated summary of the call';