# 🔍 Arabic STT Debugging Protocol

**Date:** November 8, 2025  
**Objective:** Identify root cause of intermittent Arabic Speech-to-Text failures  
**Modified Files:** 
- [`lib/voice.ts`](lib/voice.ts:1) - Added STT/TTS diagnostic logging
- [`app/api/voice/route.ts`](app/api/voice/route.ts:1) - Added request flow tracking

---

## 📋 Pre-Test Checklist

Before running tests, ensure:
- [ ] Development server is running: `npm run dev`
- [ ] Browser DevTools console is open (F12 → Console tab)
- [ ] Server terminal is visible to see backend logs
- [ ] Microphone permissions are granted in browser
- [ ] You can speak Modern Standard Arabic clearly
- [ ] Quiet environment (minimal background noise)

---

## 🧪 Test Protocol: Arabic Voice Recording

### Test 1: Basic Arabic Voice Recording (3 attempts)

**Goal:** Determine if failures are consistent or truly intermittent

**Steps:**
1. Open `http://localhost:3000` in browser
2. Select "العربية" (Arabic) from language dropdown
3. Click "Record" button
4. Speak clearly in Arabic: **"ما هو Zoid؟"** (What is Zoid?)
5. Wait 2 seconds after speaking
6. Click "Send Recording"
7. Observe terminal logs for STT section
8. Record the outcome below

**Attempt 1:**
- [ ] SUCCESS - Transcription appeared correctly
- [ ] FAILURE - No transcription / Error message
- Terminal Log Key Points: ____________________

**Attempt 2:**
- [ ] SUCCESS - Transcription appeared correctly
- [ ] FAILURE - No transcription / Error message  
- Terminal Log Key Points: ____________________

**Attempt 3:**
- [ ] SUCCESS - Transcription appeared correctly
- [ ] FAILURE - No transcription / Error message
- Terminal Log Key Points: ____________________

**Consistency Pattern:** ____________________

---

### Test 2: Audio Quality Analysis

**Goal:** Check if audio encoding is the issue

**Look for in terminal logs:**

```
🎤 [STT] Starting Speech-to-Text conversion
  Language: ar-SA
  Encoding: WEBM_OPUS
  Audio Buffer Size: ______ bytes  ← RECORD THIS
```

**Questions:**
1. What is the audio buffer size? __________ bytes
2. Is the size consistent across attempts? [ ] YES [ ] NO
3. If buffer is < 10,000 bytes → recording may be too short
4. If buffer is > 1,000,000 bytes → recording may have quality issues

**Browser Console Check:**
- Open Browser DevTools → Network tab
- Look for `/api/voice` request
- Check request payload size: __________ bytes
- Does it match terminal "Audio Buffer Size"? [ ] YES [ ] NO

---

### Test 3: API Response Analysis

**Goal:** Identify the exact error from Google Cloud API

**If STT fails, look for this in terminal:**

```
❌ STT Error Details:
  Error Type: __________ ← RECORD THIS
  Error Message: __________ ← RECORD THIS
  Error Code: __________ ← RECORD THIS
```

**Common Error Codes:**
- `INVALID_ARGUMENT` → Configuration issue
- `NOT_FOUND` → Language model not found
- `RESOURCE_EXHAUSTED` → API quota exceeded
- `DEADLINE_EXCEEDED` → Timeout
- `UNKNOWN` → Network or auth issue

**Your Error (if any):** ____________________

---

### Test 4: English vs Arabic Comparison

**Goal:** Confirm the issue is specific to Arabic

**Steps:**
1. Switch to "English" in language dropdown
2. Click "Record"
3. Speak clearly: **"What is Zoid?"**
4. Click "Send Recording"
5. Record outcome: [ ] SUCCESS [ ] FAILURE

**English Terminal Log:**
```
Audio Buffer Size: ______ bytes
Result 1:
  Transcript: "______"
  Confidence: ______
```

**Now repeat with Arabic:**
1. Switch to "العربية"
2. Click "Record"
3. Speak: **"ما هو Zoid؟"**
4. Click "Send Recording"
5. Record outcome: [ ] SUCCESS [ ] FAILURE

**Arabic Terminal Log:**
```
Audio Buffer Size: ______ bytes
Result 1:
  Transcript: "______"
  Confidence: ______
```

**Comparison:**
- Buffer sizes similar? [ ] YES [ ] NO
- Both successful? [ ] YES [ ] NO
- If only English works → Language-specific issue confirmed

---

### Test 5: Recording Duration Test

**Goal:** Check if recording length affects success rate

**Short Recording (1-2 seconds):**
1. Select Arabic
2. Record and speak quickly: **"مرحبا"** (Hello)
3. Outcome: [ ] SUCCESS [ ] FAILURE

**Medium Recording (3-4 seconds):**
1. Select Arabic
2. Record: **"ما هي الخدمات المتاحة؟"** (What services are available?)
3. Outcome: [ ] SUCCESS [ ] FAILURE

**Long Recording (5-6 seconds):**
1. Select Arabic
2. Record: **"أريد أن أعرف المزيد عن المنتجات والخدمات"** (I want to know more about products and services)
3. Outcome: [ ] SUCCESS [ ] FAILURE

**Pattern Observed:** ____________________

---

## 📊 Diagnostic Data Collection

### Critical Log Sections to Copy

Please copy and paste the **complete terminal output** from a FAILED Arabic attempt here:

```
[PASTE FULL TERMINAL LOG HERE]
```

### Browser Console Errors

Please copy any RED error messages from browser console here:

```
[PASTE BROWSER ERRORS HERE]
```

---

## 🎯 Analysis: Root Cause Identification

Based on test results, check the most likely root cause:

**Audio Encoding Issues:**
- [ ] Buffer size < 10KB (recording too short)
- [ ] Buffer size inconsistent between English/Arabic
- [ ] WEBM_OPUS encoding not supported for ar-SA

**Language Model Issues:**
- [ ] Error message mentions "model" or "language"
- [ ] Error code: `NOT_FOUND` or `INVALID_ARGUMENT`
- [ ] English works but Arabic consistently fails

**Network/Timeout Issues:**
- [ ] Error code: `DEADLINE_EXCEEDED` or `UNAVAILABLE`
- [ ] STT duration > 5000ms
- [ ] Intermittent failures with no pattern

**API Configuration Issues:**
- [ ] Error code: `PERMISSION_DENIED` or `UNAUTHENTICATED`
- [ ] Both English and Arabic fail
- [ ] Error mentions credentials or quota

**Audio Quality Issues:**
- [ ] Transcription confidence < 0.5
- [ ] Background noise present
- [ ] Longer recordings fail more often

---

## 🔧 Next Steps Based on Diagnosis

### If Audio Encoding Issue:
→ Switch to different encoding format or add format conversion

### If Language Model Issue:
→ Change from `"latest_long"` to `"default"` or `"command_and_search"` model

### If Network/Timeout Issue:
→ Add retry logic and increase timeout thresholds

### If API Configuration Issue:
→ Check Google Cloud credentials and API quotas

### If Audio Quality Issue:
→ Adjust MediaRecorder settings for higher quality

---

## 📝 Test Results Summary

**Completion Date:** ____________________  
**Total Tests Run:** ____________________  
**Success Rate:** ___% English | ___% Arabic  
**Primary Root Cause:** ____________________  
**Secondary Factors:** ____________________

**Recommended Fix:** ____________________

---

**End of Debug Protocol**  
*Save this file with your test results for the agent to review*