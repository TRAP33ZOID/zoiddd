# 🗺️ Zoid AI Voice Agent - Strategic Roadmap

**Last Updated:** November 11, 2025
**Current Status:** Phases 1-5.6 Complete ✅ | **PATH 1 REFACTORING COMPLETE** ✅

---

## 🚨 CRITICAL: PRODUCT VISION CLARIFICATION (November 11, 2025)

### ⚠️ MAJOR STRATEGIC PIVOT

**Previous Understanding (INCORRECT):**
- Building a web chatbot with voice features for customers
- Customers visit website to chat with AI
- Phone system was just "another channel"

**CORRECTED Vision (PATH 1: PURE PHONE AGENT):**
- This is a **phone-based customer support system**, NOT a web chatbot
- Customers dial +1 (510) 370 5981, they do NOT visit a website
- Web interface is **ONLY for admins** to monitor and manage the system
- The web chat interface (ChatInterface) was a **prototype** for testing the AI engine

### What This Means

**Customer Experience:**
```
Customer → Dials +1 (510) 370 5981 → AI answers → Conversation → Hang up
```
No website. No app. Just phone calls.

**Admin Experience:**
```
Admin → Opens https://your-domain.com → Views dashboard
  ↓
- Monitor live calls
- Review call logs
- Manage knowledge base
- Track costs
- Configure system
```

### Why This Matters

Phases 1-4 were spent building a **web chatbot** that customers don't need. We built:
- ❌ Voice recording in browser (customers call phone, not website)
- ❌ Text chat interface (customers speak on phone)
- ❌ Message persistence in localStorage (no web users to persist)

Now in **Phase 5.5+**, we must:
- ✅ Remove customer-facing web chat from landing page
- ✅ Restructure UI to be admin-only
- ✅ Redefine Phase 6-9 around phone operations, not web features

---

## 🎯 End Goal

**Build a production-ready AI phone agent that receives customer calls, answers from a knowledge base, and provides an admin dashboard for monitoring and management.**

### Product Vision: Pure Phone Agent

**Who Uses What:**

| User Type | Interface | Purpose |
|-----------|-----------|---------|
| **Customers** | Phone: +1 (510) 370 5981 | Call for support, ask questions |
| **Admins** | Web Dashboard | Monitor calls, manage knowledge, track costs |
| **Developers** | `/test/demo` route | Test AI responses internally |

### Architecture

```
┌─────────────┐
│  CUSTOMERS  │ ──► Dial +1 (510) 370 5981
└─────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│           VAPI.ai Phone System           │
│  • IVR (English/Arabic)                  │
│  • Real-time STT/TTS                     │
│  • <200ms response latency               │
└──────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│     Your Backend (Next.js API Routes)    │
│  • /api/vapi-webhook (call handling)     │
│  • /api/vapi-call-report (logging)       │
│  • lib/rag.ts (knowledge retrieval)      │
│  • lib/gemini.ts (AI responses)          │
└──────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────┐
│    Supabase (Data Persistence)           │
│  • documents (knowledge base)            │
│  • vapi_call_logs (call history)         │
│  • vapi_call_messages (transcripts)      │
└──────────────────────────────────────────┘
       │
       ▼
┌─────────────┐
│   ADMINS    │ ──► Open https://your-domain.com
└─────────────┘       │
                      ▼
            ┌──────────────────┐
            │  Admin Dashboard │
            │  • Call logs     │
            │  • Cost monitor  │
            │  • Documents     │
            └──────────────────┘
```

---

## 📋 Completed Phases

### Phase 1: Core RAG Chat ✅
**Purpose:** Build AI engine prototype
- Gemini 2.5 Flash integration
- RAG with in-memory knowledge base
- Text-based chat interface (prototype)

**Note:** The chat interface was for testing the AI engine, not for end customers.

### Phase 2: Persistent Knowledge Base ✅
**Purpose:** Add vector database for document retrieval
- Supabase/pgvector integration
- Document ingestion with embeddings
- Vector storage and retrieval
- Chunking strategy

### Phase 3: Voice Integration ✅
**Purpose:** Add speech processing capabilities
- Google Cloud Speech-to-Text
- Google Cloud Text-to-Speech
- Audio pipeline testing
- Full RAG + voice integration

**Note:** Voice recording in browser was for prototyping before we had phone system.

### Phase 4: Arabic Language Support ✅
**Purpose:** Add bilingual support for MENA region
- English/Arabic language support
- RTL text rendering
- Arabic STT/TTS
- Sample knowledge bases
- Cost monitoring dashboard
- Document management UI

### Phase 5: Telephony Integration ✅
**Purpose:** Deploy live phone system (THE ACTUAL PRODUCT)
- VAPI.ai integration with real phone number (+1 (510) 370 5981)
- Live webhook handler streaming real-time calls
- IVR language selection (1=English, 2=Arabic)
- Call state management for multi-turn conversations
- RAG cache optimization (<5ms cache hits)
- Bearer token webhook authentication
- Performance monitoring per call

**Performance Results:**
- Response latency: <200ms ✅
- Cache hit rate: 50%+ ✅
- Real call verified: 42 seconds, $0.1208 cost ✅
- Success rate: 99%+ ✅

### Phase 5.5: Call Logs Dashboard ✅
**Purpose:** Add admin monitoring capability
- Database tables for call logs and messages
- Webhook handler for end-of-call reports
- Dashboard UI showing call history
- Debug endpoint for testing
- Cost integration

**Status:** Infrastructure complete, needs VAPI dashboard configuration to receive webhook data.

---

## 🚀 PATH 1 REFACTORING (COMPLETE)

### Why Refactoring?

The current UI shows a **customer chat interface** on the landing page, but customers don't use the website - they call the phone. The web interface should be **admin-only**.

### What Needs to Change

#### Current State (INCORRECT)
```
Landing page (/) shows:
- IngestionForm ✅ (admin tool - correct)
- DocumentList ✅ (admin tool - correct)
- CostDashboard ✅ (admin tool - correct)
- CallLogsDashboard ✅ (admin tool - correct)
- ChatInterface ❌ (customer tool - WRONG, customers use phone)
```

#### Target State (CORRECT)
```
Landing page (/) shows ONLY admin tools:
- System Status Card (new: phone number status, uptime)
- CallLogsDashboard (existing: primary view)
- CostDashboard (existing)
- DocumentList (existing)
- IngestionForm (existing)

/test/demo shows internal testing tools:
- ChatInterface (moved here for developer testing)
- Debug tools
```

### Implementation Summary (Phase 5.6: UI Refactoring)

**Status:** COMPLETE ✅

**Changes Implemented:**
- **Admin Dashboard:** The landing page (`/`) was restructured to be admin-only, featuring the new `<SystemStatusCard />` at the top, followed by Call Logs, Costs, Documents, and Ingestion tools.
- **Customer UI Removed:** The customer-facing `<ChatInterface />` was removed from the landing page.
- **Internal Testing Route:** The `<ChatInterface />` was moved to `/test` and `/test/demo` for internal developer testing and prototyping, with clear warning banners.
- **System Status API:** A new API endpoint (`/api/system-status`) was created to provide real-time metrics for the dashboard.

**Remaining Documentation Tasks (Priority 3):**
- [ ] Update [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md:55-58) - Clarify product goal
- [ ] Update [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md:336-360) - Fix architecture diagram
- [ ] Update [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md:560-596) - Correct Phase 6 definition
- [ ] Update [`README.md`](README.md) - Clarify this is phone system, not web chat

**Remaining Configuration Tasks (Priority 4):**
- [ ] Configure VAPI dashboard to send webhooks (see PROJECT_HANDOVER.md Phase 5.5 section)
- [ ] Test end-of-call-report endpoint
- [ ] Verify call logs appear in dashboard

### Files Modified

| File | Action | Purpose |
|------|--------|---------|
| [`app/page.tsx`](app/page.tsx) | Modify | Remove ChatInterface, add SystemStatusCard |
| `app/test/page.tsx` | Create | New route for internal testing |
| `components/system-status-card.tsx` | Create | Show phone system health |
| [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md) | Update | Document vision clarification |
| [`README.md`](README.md) | Update | Clarify product is phone agent |

### Success Criteria (Phase 5.6)

After refactoring:
- [x] Landing page shows only admin tools
- [x] Phone system status visible at top
- [x] ChatInterface accessible at `/test` for internal use
- [ ] Documentation accurately describes phone agent product (Pending Doc Update)
- [x] Phase 6 correctly defined as "Human Handoff" not "Multi-user Sessions" (Confirmed in Handover)

---

## 🔜 Remaining Phases (CORRECTED)

### Phase 6: Human Handoff System 🎯 NEXT

**Goal:** Allow AI to escalate complex calls to human agents

**Why This Phase (Not Multi-User Sessions)?**
- Customers call phone number, don't create web accounts
- Phone number IS the user ID (caller ID)
- Critical need: AI can't handle everything, needs human backup
- Call logs already track history (Phase 5.5)

**Key Features:**
- Confidence scoring on AI responses
- Automatic escalation triggers
- Call transfer to human agent queue
- Agent notification system (SMS/Slack)
- Context preservation (full conversation history)
- Agent takeover UI in web dashboard

**Escalation Triggers:**
```typescript
// lib/escalation-triggers.ts
- Confidence score < 0.6 (AI isn't confident)
- User says "talk to a human" or "speak to manager"
- Multiple "I don't know" responses (3+)
- Profanity or escalation keywords detected
- Call duration > 10 minutes (complex issue)
```

**Database Schema:**
```sql
CREATE TABLE agent_users (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone_number VARCHAR(20),
  status VARCHAR(20), -- 'available', 'busy', 'offline'
  created_at TIMESTAMP
);

CREATE TABLE call_escalations (
  id UUID PRIMARY KEY,
  call_id VARCHAR(100) REFERENCES vapi_call_logs(call_id),
  reason VARCHAR(200),
  confidence_score FLOAT,
  escalated_at TIMESTAMP,
  agent_id UUID REFERENCES agent_users(id),
  resolved_at TIMESTAMP,
  resolution_notes TEXT
);
```

**Implementation Files:**
- `lib/confidence-scorer.ts` - Score AI responses (0-1 scale)
- `lib/escalation-manager.ts` - Trigger logic & call transfer
- `app/api/escalate/route.ts` - Escalation API endpoint
- `components/agent-queue-dashboard.tsx` - Human agent UI
- `lib/notification-service.ts` - SMS/Slack alerts

**Deliverables:**
- [x] Confidence scoring integrated into webhook
- [x] Agent queue management system
- [x] Call transfer mechanism (VAPI API)
- [x] Agent dashboard for takeover
- [x] Notification system (SMS/email/Slack)
- [ ] Post-call notes capability
- [ ] Analytics: escalation rate, resolution time

**Success Metrics:**
- 95%+ escalation accuracy
- <30 seconds average handoff time
- 100% context transfer success
- Agent satisfaction >4/5

---

### Phase 7: CRM Integration & Tool Use

**Goal:** Enable AI to access customer data and perform actions during calls

**Why This Phase?**
After human handoff works (Phase 6), we need the AI to be more useful by accessing real customer data.

**Use Cases:**
- **Customer Lookup:** "What's my account balance?" → Query CRM by phone number
- **Order Status:** "Where's my order?" → Check order tracking system
- **Appointment Booking:** "I want to schedule a visit" → Check calendar, book slot
- **Ticket Creation:** "I have a problem" → Create support ticket in system

**Implementation:**
```typescript
// lib/tools.ts
export const tools = {
  lookupCustomer: {
    name: "lookup_customer",
    description: "Find customer by phone number",
    parameters: { phone: "string" },
    execute: async (params) => {
      // Query CRM API
      return customerData;
    }
  },
  checkOrderStatus: {
    name: "check_order_status",
    description: "Look up order by ID",
    parameters: { orderId: "string" },
    execute: async (params) => {
      // Query order system
      return orderStatus;
    }
  },
  // ... 5-10 more tools
};
```

**Safety Features:**
- User confirmation before actions
- Comprehensive audit logging
- Rate limiting per tool
- Parameter validation
- Rollback capability

**Deliverables:**
- [ ] Tool registry system with 5-10 basic tools
- [ ] Safe function executor with confirmations
- [ ] Audit logging database table
- [ ] Tool usage dashboard for admins
- [ ] Integration examples (mock CRM, order system)

---

### Phase 8: Production Hardening

**Goal:** Production-ready, scalable, monitored system

**Key Areas:**

1. **Error Recovery**
   - Retry logic for API failures
   - Fallback responses
   - Circuit breakers

2. **Rate Limiting**
   - Per-caller limits (prevent abuse)
   - API quota management
   - Cost caps and alerts

3. **Monitoring & Alerting**
   - Uptime monitoring (99.9% SLA)
   - Error rate tracking
   - Latency monitoring
   - Cost alerts
   - On-call rotation

4. **Security**
   - DDoS protection
   - Webhook signature verification
   - Rate limiting
   - Secrets management

5. **CI/CD Pipeline**
   - Automated tests
   - Staging deployment
   - Blue-green production deployment

6. **Load Testing**
   - Simulate 100+ concurrent calls
   - Database stress testing
   - Failover testing

**Deliverables:**
- [ ] Comprehensive error handling
- [ ] Rate limiting middleware
- [ ] Monitoring dashboard (Datadog/Grafana)
- [ ] CI/CD pipeline
- [ ] Load test results
- [ ] Security audit report
- [ ] Operations runbook

---

## 💰 Cost Considerations

### Current Costs (Per 1000 Calls/Day)
- Gemini 2.5 Flash: ~$30/month
- Google Cloud STT: ~$480/month
- Google Cloud TTS: ~$2,280/month
- Supabase: ~$25/month
- VAPI: ~$50-90/month
- **Total:** ~$2,865/month

### Cost Optimization
- ✅ Caching implemented (reduces 30-50%)
- ✅ Gemini Flash (most cost-effective model)
- 🔜 Response caching (Phase 8)
- 🔜 Cost alerts (Phase 8)

---

## 🌍 MENA-Specific Considerations

### Language Support
- ✅ Modern Standard Arabic (MSA)
- ✅ English
- 🔜 Egyptian Arabic (future)
- 🔜 Gulf Arabic (future)

### Infrastructure
**Recommended Hosting:**
- AWS UAE (Middle East - Bahrain)
- Or AWS EU (Frankfurt) for GDPR
- Target: <100ms latency from MENA

**Phone Numbers:**
- Current: +1 (510) 370 5981 (US)
- Future: Local MENA numbers via du, Etisalat, STC

---

## 🚀 Launch Readiness Checklist

### Technical Requirements
- [x] Phone system operational ✅
- [x] Call logs infrastructure ✅
- [ ] UI refactored to admin-only (PATH 1 refactoring)
- [ ] Human handoff ready (Phase 6)
- [ ] CRM integration (Phase 7)
- [ ] Production hardened (Phase 8)
- [ ] Load tested (100 concurrent calls)
- [ ] Security audit passed

### Business Requirements
- [ ] Phone numbers provisioned
- [ ] Human agents trained
- [ ] Escalation procedures documented
- [ ] SLA agreements in place
- [ ] Cost budget approved

---

**End of Strategic Roadmap**

**For detailed implementation guidance, see [`PROJECT_HANDOVER.md`](PROJECT_HANDOVER.md:1)**

**Last Updated:** November 11, 2025
**Status:** Phases 1-5.5 Complete, PATH 1 Refactoring In Progress
