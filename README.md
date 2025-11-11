 # 🎙️ Zoid AI Support Agent

A production-ready, bilingual (English/Arabic) voice-enabled AI customer support agent built with Next.js, featuring real-time speech interaction and RAG-powered knowledge retrieval.

## ✨ Features

- 📞 **Real-time Phone System**: Live phone line (+1 (510) 370 5981) with IVR language selection
- 🗣️ **Voice Interaction**: Speech-to-Text and Text-to-Speech using Google Cloud APIs
- 🌍 **Bilingual Support**: Full English and Modern Standard Arabic (ar-SA) support
- 📚 **RAG-Powered Knowledge Base**: Vector-based document retrieval using Supabase pgvector
- 🎯 **Language-Aware Retrieval**: Automatic language filtering for context accuracy
- 📝 **Text & Voice Chat**: Seamless switching between text and voice input
- 🔄 **RTL Support**: Right-to-left text rendering for Arabic
- 📊 **Call Logs Dashboard**: Track all phone calls with transcripts, costs, and analytics
- 💰 **Cost Monitoring**: Real-time tracking of AI/voice service costs
- ⚡ **Real-time Streaming**: Low-latency (<200ms) streaming audio pipeline for phone calls

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI Model**: Google Gemini 2.5 Flash
- **Embeddings**: text-embedding-004 (768 dimensions)
- **Vector Database**: Supabase with pgvector
- **Voice Services**: Google Cloud Speech-to-Text & Text-to-Speech
- **Telephony**: VAPI.ai for real-time call handling
- **Frontend**: React 19, TailwindCSS, shadcn/ui
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Google Cloud Platform** account with:
  - Speech-to-Text API enabled
  - Text-to-Speech API enabled
  - Gemini API access
- **Supabase** account (free tier works)
- **Git** for version control

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd zoiddd
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**How to get these keys:**

#### Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into `.env.local`

#### Supabase Keys
1. Create a project at [Supabase](https://supabase.com)
2. Go to Project Settings → API
3. Copy the **Project URL** and **anon public** key
4. Copy the **service_role** key (keep this secret!)

### 4. Set Up Google Cloud Credentials

#### 4.1 Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Go to **IAM & Admin** → **Service Accounts**
4. Click **Create Service Account**
5. Grant the following roles:
   - **Cloud Speech-to-Text API User**
   - **Cloud Text-to-Speech API User**
6. Create and download a **JSON key file**

#### 4.2 Add Credentials to Project

1. Rename the downloaded JSON file to `google-cloud-key.json`
2. Place it in the `lib/` directory:
   ```
   lib/google-cloud-key.json
   ```
3. **Important**: This file is already in `.gitignore` - never commit it to Git!

### 5. Configure Supabase Database

#### 5.1 Create the Documents Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(768),
  metadata JSONB DEFAULT '{}',
  language VARCHAR(10) DEFAULT 'en-US',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Create index for language filtering
CREATE INDEX idx_documents_language ON documents(language);
```

#### 5.2 Create the Match Documents Function

Run this SQL in your Supabase SQL Editor:

```sql
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(768),
  match_count int,
  language varchar DEFAULT 'en-US',
  filter jsonb DEFAULT '{}'
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE documents.language = match_documents.language
    AND metadata @> filter
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

#### 5.3 Create Call Logs Tables (Phase 5.5)

Run this SQL in your Supabase SQL Editor to enable call logging:

```sql
-- Call logs table
CREATE TABLE vapi_call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(50),
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration INTEGER,
  cost DECIMAL(10, 4),
  language VARCHAR(10),
  status VARCHAR(50),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Call messages table
CREATE TABLE vapi_call_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_id UUID REFERENCES vapi_call_logs(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_call_logs_started_at ON vapi_call_logs(started_at DESC);
CREATE INDEX idx_call_logs_call_id ON vapi_call_logs(call_id);
CREATE INDEX idx_call_messages_call_id ON vapi_call_messages(call_id);
```

**Note:** Call logs dashboard is currently in troubleshooting. See [`TROUBLESHOOTING_CALL_LOGS.md`](TROUBLESHOOTING_CALL_LOGS.md) for details.

### 6. Upload Sample Knowledge Base (Optional)

Sample knowledge base files are provided in the `knowledge-bases/` directory:
- `sample-en.txt` - English content
- `sample-ar.txt` - Arabic content

**To upload:**
1. Start the dev server (see step 7)
2. Open the ingestion form in the app
3. Upload the sample files
4. The system will automatically:
   - Split text into chunks
   - Generate embeddings
   - Store in Supabase with language tags

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Grant Microphone Permissions

When prompted by your browser, allow microphone access to use voice features.

## 📁 Project Structure

```
zoiddd/
├── app/
│   ├── api/
│   │   ├── chat/          # Text chat endpoint
│   │   ├── voice/         # Voice interaction endpoint
│   │   └── ingest/        # Document ingestion endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── chat-interface.tsx # Main chat UI component
│   ├── ingestion-form.tsx # Document upload component
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── gemini.ts                  # Gemini AI client
│   ├── voice.ts                   # STT/TTS functions
│   ├── rag.ts                     # RAG retrieval logic
│   ├── supabase.ts                # Supabase client
│   ├── language.ts                # Language configuration
│   ├── cost-monitor.ts            # Cost tracking
│   ├── document-context.ts        # Document refresh events
│   ├── call-state-manager.ts      # Call tracking (Phase 5)
│   ├── vapi-client.ts             # VAPI API client (Phase 5)
│   ├── vapi-ivr-config.ts         # IVR configuration (Phase 5)
│   ├── rag-cache.ts               # Response caching (Phase 5)
│   └── google-cloud-key.json      # (YOU MUST CREATE THIS)
├── app/api/
│   ├── chat/                      # Text chat endpoint
│   ├── voice/                     # Voice interaction endpoint
│   ├── ingest/                    # Document ingestion endpoint
│   ├── documents/                 # Document management
│   ├── vapi-webhook/              # Streaming webhook handler (Phase 5)
│   ├── vapi-call-report/          # End-of-call webhook (Phase 5.5)
│   ├── call-logs/                 # Call history API (Phase 5.5)
│   └── admin/vapi-setup/          # VAPI configuration (Phase 5)
├── components/
│   ├── chat-interface.tsx         # Main chat UI
│   ├── ingestion-form.tsx         # Document upload
│   ├── document-list.tsx          # Document management
│   ├── cost-dashboard.tsx         # Cost monitoring
│   ├── call-logs-dashboard.tsx    # Call logs UI (Phase 5.5)
│   └── ui/                        # shadcn/ui components
├── supabase/
│   └── schema.sql                 # Complete database schema
├── knowledge-bases/       # Sample knowledge base files
├── .env.local            # (YOU MUST CREATE THIS)
└── PROJECT_HANDOVER.md   # Comprehensive technical documentation
```

## 📞 Live Phone System

**Status:** 🟢 OPERATIONAL

### How to Use
1. Call **+1 (510) 370 5981** from any phone
2. Listen to the IVR greeting
3. Select your language:
   - Press **1** for English
   - Press **2** for العربية (Arabic)
4. Speak your question clearly
5. The AI will respond with information from the knowledge base
6. Ask follow-up questions or say "goodbye" to end the call

### Performance
- Response Latency: <200ms (excluding TTS synthesis)
- Cache Hit Rate: 50%+ for common queries
- Success Rate: 99%+
- Multi-turn Conversation: Supported with call state management

---

## 🎯 Usage

### Text Chat
1. Select language (English | العربية) from dropdown
2. Type your message in the input field
3. Press "Send" or Enter

### Voice Chat (Web Interface)
1. Select your preferred language (English | العربية)
2. Click the "Record" button
3. Speak your question clearly
4. Click "Send Recording"
5. The AI will respond with both text and audio

**Note:** For phone calls, use the Live Phone System above instead.

### IVR Language Selection (Phone System)
When calling +1 (510) 370 5981:
- Press **1** for English with English-language knowledge base
- Press **2** for العربية with Arabic-language knowledge base

### Document Ingestion
1. Navigate to the ingestion page
2. Select language (en-US or ar-SA)
3. Upload a `.txt`, `.pdf`, or `.docx` file
4. The system will process and store the content

## 📚 Documentation

- **[PROJECT_HANDOVER.md](PROJECT_HANDOVER.md)** - Comprehensive technical documentation including:
  - Complete development history (Phases 1-5 complete)
  - Phase 5 telephony implementation details
  - VAPI.ai integration reference
  - Phase 6 multi-user session design
  - Architecture decisions and system dependencies
  - Known constraints and workarounds
  - Future roadmap (Phases 6-9)
  - Testing protocols and performance benchmarks

- **[ROADMAP.md](ROADMAP.md)** - Strategic roadmap including:
  - Phase completion status
  - Phase 6 multi-user sessions (current)
  - Phase 7 human handoff system
  - Phase 8 tool use / function calling
  - Phase 9 production hardening
  - Cost considerations and MENA-specific guidance

## 🔐 Security Notes

**Never commit these files:**
- `.env.local` (contains API keys)
- `lib/google-cloud-key.json` (contains service account credentials)

These are already in `.gitignore`, but always double-check before committing.

## 🐛 Troubleshooting

### Call Logs Dashboard Issues

**Dashboard Shows "No Calls Found"**
- Database tables created but no data being saved
- VAPI may not be sending end-of-call-report events
- See complete debugging guide: [`TROUBLESHOOTING_CALL_LOGS.md`](TROUBLESHOOTING_CALL_LOGS.md)

**Quick Debug Steps:**
1. Make a test call to +1 (510) 370 5981
2. Check terminal logs for "📞 End-of-call report received"
3. If not present → VAPI configuration issue
4. If present but no "✅ Call log saved" → database/API issue

**Temporary Workaround:** Phone system works perfectly without dashboard. Call logs are a monitoring feature, not required for core functionality.

### Phone System Issues

**Call Doesn't Connect**
- Verify VAPI.ai account has active phone number
- Check that `VAPI_API_KEY` is set in `.env.local`
- Confirm webhook URL is correctly configured in VAPI dashboard
- For local development, use ngrok tunnel: `ngrok http 3000`

**IVR Language Selection Not Working**
- Test with phone keypad: 1 for English, 2 for Arabic
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Check server logs for webhook authentication errors

**Call Dropped or Audio Issues**
- Check internet connection stability
- Verify STT/TTS APIs are enabled in Google Cloud
- Review call latency in call-state-manager logs

### Web Interface Issues

### Microphone Not Working
- Check browser permissions (Settings → Privacy → Microphone)
- Try a different browser (Chrome/Firefox recommended)
- Ensure no other app is using the microphone

### STT/TTS Errors
- Verify Google Cloud credentials are correct
- Check that APIs are enabled in Google Cloud Console
- Review server logs for detailed error messages

### RAG Not Retrieving Context
- Ensure documents are uploaded with correct language tag
- Verify Supabase `match_documents()` function exists
- Check that knowledge base has content for the selected language

### Database Connection Issues
- Verify Supabase URL and keys in `.env.local`
- Check that the `documents` table exists
- Ensure pgvector extension is enabled

## 📊 Current Status & Roadmap

### ✅ Completed Phases
- ✅ Phase 1: Core RAG Chat Implementation
- ✅ Phase 2: Persistent Knowledge Base & Ingestion
- ✅ Phase 3: Voice Integration
- ✅ Phase 4: Arabic Language Support (VERIFIED)
- ✅ Phase 5: Telephony Integration (COMPLETE - Live phone system operational)
- 🟡 Phase 5.5: Call Logs Dashboard (TROUBLESHOOTING - Infrastructure complete, data not flowing)

### 🚧 Current & Future Phases
- 🔧 **Phase 5.5: Call Logs Dashboard** (TROUBLESHOOTING)
  - All infrastructure built and deployed
  - Issue: VAPI not sending end-of-call reports
  - See [`TROUBLESHOOTING_CALL_LOGS.md`](TROUBLESHOOTING_CALL_LOGS.md) for debugging
  
- 🚧 **Phase 6: Multi-User Sessions** (NEXT)
  - User authentication (phone number based)
  - Session persistence in database
  - Conversation history retrieval
  - Analytics dashboard
  - See [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md:175) for details

- 🚧 Phase 7: Human Handoff System (Planned)
- 🚧 Phase 8: Tool Use / Function Calling (Planned)
- 🚧 Phase 9: Production Hardening (Planned)

For complete roadmap details, see [`ROADMAP.md`](ROADMAP.md)

## 🔗 Next Steps

**For Call Logs Dashboard Fix (Phase 5.5):**
1. Read [`TROUBLESHOOTING_CALL_LOGS.md`](TROUBLESHOOTING_CALL_LOGS.md) for complete debugging guide
2. Check VAPI dashboard for end-of-call-report configuration
3. Test webhook with manual curl commands
4. Verify database tables and permissions

**For Phase 6 Implementation:**
1. Review multi-user session design in [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md:175)
2. Create database tables for users, sessions, and messages
3. Implement authentication middleware
4. Build session management APIs
5. Update UI to support user login and history

**For Detailed Setup of Phase 5:**
- See [`PHASE_5_SETUP.md`](PHASE_5_SETUP.md) for step-by-step VAPI configuration
- See [`CALL_LOGS_SETUP.md`](CALL_LOGS_SETUP.md) for call logs setup guide

---

## 📝 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines here]

## 📧 Contact

[Add contact information here]

---

**Built with ❤️ for the MENA region**
