# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build optimized Next.js application
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint on the codebase
```

## Project Overview

**Zoid** is a production-ready, bilingual (English/Arabic) voice-enabled AI customer support agent. It uses RAG (Retrieval-Augmented Generation) to answer customer queries from a knowledge base with real-time speech interaction via Google Cloud APIs.

**Status:** Phases 1-4 complete (core system operational). Phase 5 (telephony integration) planned.

## High-Level Architecture

### System Design

The application follows a **client-server RAG architecture**:

```
Browser Client
    ↓ (fetch)
Next.js API Routes (/api/chat, /api/voice, /api/ingest)
    ↓ (service calls)
┌─────────────────────────────────────────┐
│ Core Processing Pipeline:               │
│ 1. Query/Audio Input                    │
│ 2. Text Normalization (STT if voice)    │
│ 3. Vector Embedding (Gemini API)        │
│ 4. Semantic Search (Supabase pgvector)  │
│ 5. Context Retrieval (language-filtered)│
│ 6. LLM Response (Gemini 2.5 Flash)      │
│ 7. Audio Output (TTS if voice mode)     │
└─────────────────────────────────────────┘
    ↓ (external services)
├─ Google Gemini 2.5 Flash (AI chat & embeddings)
├─ Google Cloud Speech-to-Text API (STT)
├─ Google Cloud Text-to-Speech API (TTS)
└─ Supabase PostgreSQL + pgvector (vector database)
```

### Core Data Flow

**Text Chat:**
User Query → `/api/chat` → Embed query → Search Supabase vectors → Inject context → Gemini response → Return JSON

**Voice Chat:**
Audio Recording → `/api/voice` → STT → Embed → Search → Gemini → TTS → Return MP3 + JSON

**Document Ingestion:**
File Upload → `/api/ingest` → Chunk text (1000 chars, 200 overlap) → Embed chunks → Store in Supabase with language tag

### Key Components

| Component | File | Role |
|-----------|------|------|
| Chat UI | `components/chat-interface.tsx` | Main conversational interface with voice recording |
| API Routes | `app/api/{chat,voice,ingest,documents}` | Backend processing pipelines |
| RAG Logic | `lib/rag.ts` | Query embedding & Supabase vector search |
| LLM Client | `lib/gemini.ts` | Google Gemini API initialization |
| Voice Services | `lib/voice.ts` | Speech-to-Text & Text-to-Speech operations |
| Language Config | `lib/language.ts` | Bilingual settings, system prompts, language validation |
| Database Client | `lib/supabase.ts` | Supabase authentication & RPC calls |

## Technology Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Frontend:** TailwindCSS 4, shadcn/ui, Lucide icons
- **Backend:** Next.js API Routes
- **AI:** Gemini 2.5 Flash (chat), text-embedding-004 (768-dim embeddings)
- **Database:** Supabase PostgreSQL with pgvector extension
- **Voice:** Google Cloud Speech-to-Text & Text-to-Speech APIs
- **Linting:** ESLint 9

## Critical Environment Setup

### Required .env.local Variables

```env
GEMINI_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
```

### Required Supabase Configuration

1. **Enable pgvector extension** in PostgreSQL
2. **Create documents table:**
   ```sql
   CREATE TABLE documents (
     id BIGSERIAL PRIMARY KEY,
     content TEXT NOT NULL,
     embedding vector(768),
     metadata JSONB DEFAULT '{}',
     language VARCHAR(10) DEFAULT 'en-US',
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
   CREATE INDEX idx_documents_language ON documents(language);
   ```

3. **Create match_documents RPC function** (see README.md lines 135-163 for full SQL)

### Google Cloud Setup

- Service account JSON file at `lib/google-cloud-key.json` (already in .gitignore)
- Requires roles: Cloud Speech-to-Text API User, Cloud Text-to-Speech API User

## Directory Structure Highlights

```
app/
├── api/
│   ├── chat/route.ts      # Text queries → RAG + Gemini
│   ├── voice/route.ts     # Voice input → STT → RAG → Gemini → TTS
│   ├── ingest/route.ts    # Document chunking & embedding
│   └── documents/route.ts # Document management (GET/DELETE)
├── page.tsx               # Main UI orchestrator
└── layout.tsx             # Root layout with sidebar

lib/
├── gemini.ts              # Gemini client (chat + embedding models)
├── rag.ts                 # Query embedding & vector search logic
├── voice.ts               # STT/TTS service wrappers
├── supabase.ts            # Supabase client & RPC integration
├── language.ts            # Language configs, system prompts
└── cost-monitor.ts        # Token usage tracking

components/
├── chat-interface.tsx     # Main conversational UI
├── ingestion-form.tsx     # Document upload
├── document-list.tsx      # Knowledge base viewer
└── ui/                    # shadcn/ui component library
```

## Bilingual Architecture

**Supported Languages:** English (en-US), Modern Standard Arabic (ar-SA)

**Implementation:**
- Language stored with each document in Supabase (`language` column)
- Vector search filtered by language: only retrieves documents matching user's language
- System prompts differ per language (defined in `lib/language.ts`)
- STT/TTS configured per-language in `lib/voice.ts`
- Frontend has language selector, RTL support for Arabic

**Key Files:**
- Language config: `lib/language.ts` (SUPPORTED_LANGUAGES, SYSTEM_INSTRUCTIONS)
- RAG filter: `lib/rag.ts` line ~40 (language parameter in vector search)
- API routes: Both `/api/chat` and `/api/voice` receive language parameter

## State Management

- **Messages:** localStorage key `zoid_chat_messages` (JSON array)
- **Language:** localStorage key `zoid_preferred_language`
- **Cost metrics:** localStorage for usage tracking
- **Document events:** Custom event system via `DocumentContext` for refresh signals

## API Response Patterns

### /api/chat Response
```json
{
  "response": "AI response text",
  "context": ["chunk1", "chunk2"],
  "usageMetadata": {
    "promptTokenCount": 123,
    "candidatesTokenCount": 456
  }
}
```

### /api/voice Response
```json
{
  "response": "AI response text",
  "audioData": "base64_mp3_data",
  "context": ["chunk1"],
  "usageMetadata": { ... }
}
```

## Key Architectural Patterns

1. **RAG Pattern:** Query → embed → semantic search → inject context → generate response
2. **Language-Aware Retrieval:** Supabase query filters `WHERE language = ?` to prevent cross-language contamination
3. **Document Chunking:** LangChain `RecursiveCharacterTextSplitter` (1000 char chunks, 200 char overlap)
4. **Lazy Loading:** Components use React hooks with client-side data fetching
5. **Cost Monitoring:** Token counts logged from Gemini API, stored in localStorage

## Common Development Tasks

### Adding a New API Endpoint

1. Create `app/api/[feature]/route.ts` with POST/GET handler
2. Import necessary services from `lib/` (gemini, rag, voice, etc.)
3. Add language parameter validation if needed
4. Use Supabase client from `lib/supabase.ts`
5. Return JSON with consistent error structure

### Modifying Language Support

1. Update `SUPPORTED_LANGUAGES` in `lib/language.ts`
2. Add system instruction for new language
3. Update voice language codes in `lib/voice.ts`
4. Test with sample documents in both languages

### Working with Vector Search

- Query embedding happens in `lib/rag.ts` via Gemini text-embedding-004
- Search calls Supabase RPC: `match_documents(embedding, k, language_filter)`
- Results always filtered by language to prevent mixing languages
- Default k=2 (top 2 results)

### Adding UI Components

- Place in `components/` directory
- Use shadcn/ui primitives from `components/ui/`
- Use `cn()` utility for Tailwind class merging: `cn("base-class", conditional && "extra-class")`
- Import paths use `@/` alias (e.g., `@/components/ui/button`)

## Testing

**Current Status:** No automated test framework configured.

The codebase uses manual and integration testing (run via `npm run dev`). To add testing:
- Jest/Vitest recommended for Next.js
- Mock external APIs: Gemini, Google Cloud Speech/TTS, Supabase
- Focus on RAG logic and API endpoints

## Documentation Files

- **AGENTS.md** - Architecture guidance for AI agents (critical reading)
- **PROJECT_HANDOVER.md** - Comprehensive technical history (phases 1-4 complete)
- **ROADMAP.md** - 9-phase strategic plan
- **README.md** - End-user setup guide
- **.roo/** - Agent rule sets for different contexts (code, architecture, Q&A, debugging)

## Important Notes

- **No secrets in commits:** `.env.local` and `lib/google-cloud-key.json` are in .gitignore
- **TypeScript strict mode:** Enabled throughout
- **Import paths:** Always use `@/` prefix for root-relative imports
- **Embedding dimensions:** Supabase table expects `vector(768)` for Gemini embeddings
- **Language filtering:** Critical for RAG quality—never retrieve documents in wrong language
- **Cost monitoring:** Token counts available from all Gemini API calls in response metadata
