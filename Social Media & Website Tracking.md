# Signal-Gated Social + GA4 Daily Briefing System

## 1. Purpose & Non-Goals

### Purpose
Design and implement a **signal-gated daily briefing system** that monitors social media and website analytics, detects material changes, and notifies the engagement team **only when action-relevant signals are present**.

The system prioritizes:
- Signal over noise
- Deterministic logic before AI
- Human judgment preservation

### Non-Goals
- No automated decision-making
- No marketing performance reporting
- No raw event mirroring from platforms
- No real-time alerting

---

## 2. System Overview

### High-Level Flow
1. Ingest daily data from social APIs and GA4
2. Store normalized, reduced datasets
3. Compare latest snapshot against baselines
4. Detect deterministic signals
5. If signals exist:
   - Classify signals
   - Generate a structured briefing
   - Deliver via email
6. If no signals exist:
   - No notification

### Human-in-the-Loop Boundary
- System surfaces **context and patterns**
- Humans decide **actions and responses**

---

## 3. Data Sources

### Social Platforms
- LinkedIn (company pages)
- Facebook (pages)
- Instagram (business/creator accounts)

### Website Analytics
- Google Analytics 4 (GA4 Data API)

### Internal Configuration
- Threshold definitions
- Platform-specific overrides
- Page taxonomy
- UTM standards

---

## 4. Canonical Data Models

### 4.1 Social Account Snapshot (Daily)
- platform
- account_id
- date
- followers
- following
- impressions (if available)
- reach (if available)

### 4.2 Social Post Entity
- post_id
- platform
- account_id
- published_at
- text
- media_type
- permalink
- paid_flag

### 4.3 Social Post Metrics (Daily Time Series)
- post_id
- date
- impressions
- reach
- likes
- comments
- shares
- saves

### 4.4 Messaging / DM Objects
- thread_id
- platform
- sender_type
- opened_at
- last_message_at
- status
- assigned_owner

### 4.5 GA4 Daily Rollup
- date
- source
- medium
- campaign
- country
- region
- page_bucket
- sessions
- engaged_sessions
- avg_engagement_time
- conversions

---

## 5. Metric Definitions (Authoritative)

### Followers
- Absolute count
- Net daily change

### Impressions
- Total content exposures

### Engagement Rate
```
(likes + comments + shares + saves) / impressions
```

### Engagement Time (GA4)
- Active, in-focus user time only

### Conversions
- Explicitly defined GA4 events

### Message Volume
- New inbound threads per day

---

## 6. Aggregation & Storage Rules

### Storage Principles
- Posts are atomic objects
- Metrics are stored as daily snapshots
- GA4 data is **pre-aggregated only**

### Discarded Data
- User-level identifiers
- Event-level GA4 logs
- Raw referrer URLs
- City-level geo by default

### Privacy Guardrails
- Aggregation before persistence
- No personal data storage

---

## 7. Baselines & Comparison Windows

### Required Baselines
- Previous day
- Rolling 7-day average

### Optional
- Rolling 30-day average (low-volume platforms)

### Noise Handling
- Minimum volume thresholds
- Suppress comparisons on sparse data

---

## 8. Signal Detection Rules (Deterministic)

### 8.1 Follower Change
- Trigger if daily change > X% (platform-specific)

### 8.2 Post Impression Spike
- Trigger if impressions > X% above 7-day rolling avg

### 8.3 Engagement Rate Deviation
- Trigger if z-score > X standard deviations

### 8.4 Geographic Anomaly
- New country appears
- OR region traffic > X% above baseline

### 8.5 DM Volume Spike
- Daily inbound threads > X% above baseline

### 8.6 Suppression Rules
- Max one email per day
- Cooldown window after major alert

---

## 9. Signal Classification

Each detected signal is classified as one of:
- Growth
- Engagement
- Decline
- Geographic expansion
- Messaging workload

Classification is rule-based and deterministic.

---

## 10. AI Usage Boundaries

### OpenAI Is Used For:
- Summarization
- Contextual synthesis
- Risk and attention framing

### OpenAI Is NOT Used For:
- Detection
- Threshold evaluation
- Metric calculation
- Action decisions

---

## 11. OpenAI Input Schema

### JSON Payload
```json
{
  "date": "YYYY-MM-DD",
  "signals": [
    {
      "type": "geo_spike",
      "platform": "linkedin",
      "details": {"region": "Japan", "delta_pct": 42}
    }
  ],
  "top_posts": [],
  "ga_summary": {}
}
```

### Constraints
- Max payload size controlled
- No raw metrics spam

---

## 12. AI Output Requirements

- Max 100 words
- Internal ops tone
- No decisions
- No speculation beyond inputs

---

## 13. Key Messages Generation

### Section A — Deterministic Bullets
- Explicit metric changes

### Section B — AI Synthesis
- Why this matters
- What to watch

### Section C — Rule-Based Attention Areas
- Research preparation
- Monitoring flags

---

## 14. Email Assembly Rules

### Structure
1. Subject (signal-driven)
2. What Changed
3. Why It Matters
4. Attention Areas

### Formatting
- Plain text or simple HTML
- No charts

---

## 15. Notification Trigger Logic

- Zero signals → no email
- One signal → brief email
- Multiple signals → full briefing

---

## 16. Scheduling & Execution

- Daily execution window
- Timezone-aware
- Idempotent runs

---

## 17. Configuration & Tuning

- Thresholds via config file or DB
- Platform overrides
- Safe defaults

---

## 18. Testing & Validation

- Synthetic data tests
- Backtesting
- False-positive review

---

## 19. Extensibility

- Slack / Teams delivery
- Weekly summaries
- Additional platforms

---

## 20. Operating Principles

- Signal over noise
- Determinism before AI
- Human judgment preserved
- Storage discipline

