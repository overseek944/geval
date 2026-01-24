# core product

---

# **Twotrim — Eval-Driven Release Enforcement for AI**

---

## **1\. The Problem (precise, grounded in data)**

**Teams can run LLM evals, but they cannot reliably turn eval results into enforced release decisions.**

From LinkedIn \#evals threads, Reddit (r/MLOps, r/LLMDev), and engineering blogs, the same problems repeat:

* Evals exist, but **shipping decisions are still manual**  
* Results are reviewed via:  
  * dashboards  
  * Slack messages  
  * “vibe checks”  
* CI/CD pipelines **do not understand AI behavior**  
* Regressions ship because:  
  * no one owned the decision  
  * nothing blocked the PR  
* After incidents, teams cannot answer:  
  “Why was this allowed to ship?”

**Existing tools stop at measurement.**  
**The missing piece is enforcement.**

---

## **2\. The Solution (what Twotrim actually is)**

**Twotrim is an open-core release enforcement engine that turns bespoke eval results into deterministic go / no-go decisions inside CI/CD.**

Key idea:

**Evals are not reports.**  
**They are release contracts.**

Twotrim:

* Does **not** run evals  
* Does **not** define correctness  
* Does **not** optimize prompts

Instead, it:

* Consumes eval outputs  
* Applies explicit contracts  
* Enforces decisions in PRs and CI/CD  
* Blocks unverified AI changes before production

---

## **3\. Competitors (what exists today)**

### **Confident AI**

* Focus: eval execution, scoring, regression tracking  
* Strength: LLM-as-judge workflows, metrics  
* Limitation:  
  * No PR blocking  
  * No deployment authority  
  * No approval enforcement

### **Helicone**

* Focus: observability, logging, cost analytics  
* Strength: production visibility  
* Limitation:  
  * Post-hoc only  
  * No gating  
  * No contracts or enforcement

### **Others (Arize, WhyLabs, W\&B GenAI, Promptfoo)**

* Strong at:  
  * metrics  
  * dashboards  
  * comparisons  
* Weak at:  
  * enforced decisions  
  * CI/CD authority  
  * audit-grade release control

**All competitors answer:**

“What happened?”

**None answer:**

**“Was this allowed to ship?”**

---

## **4\. Where Twotrim Stands & What Makes It Unique**

### **Twotrim’s category**

**Eval-Driven Release Enforcement**

Twotrim is **not**:

* an eval platform  
* an observability tool  
* a quality dashboard

Twotrim is:

* a **decision authority**  
* a **gate**, not a graph  
* a **boring, trusted enforcer**

### **Unique Differentiators**

1. **Evals → Decisions → Enforcement**  
   * Eval results directly block or allow PRs  
   * No manual “interpretation layer”  
2. **Contracts, not scores**  
   * Teams define what “acceptable” means  
   * Twotrim enforces those rules consistently  
3. **CI/CD-native authority**  
   * Required checks  
   * Non-bypassable without approval  
4. **OSS-first trust model**  
   * Core logic is inspectable and forkable  
   * No vendor-defined correctness  
5. **Auditability by default**  
   * Every decision has a reason  
   * Every override has an owner

This is a **structural gap** competitors intentionally avoid.

---

## **5\. Features (Final, Locked Scope)**

### **🟢 Open Source (Core Product)**

**Trust-critical, adoption-driving**

* Eval contract specification (YAML / JSON)  
* Deterministic policy engine  
* Eval result ingestion:  
  * OpenEvals  
  * Promptfoo  
  * LangSmith exports  
  * Generic JSON  
* Pass / block / approval-required decisions  
* CLI:  
  * `twotrim check`  
  * `twotrim diff`  
  * `twotrim explain`  
* CI/CD integrations:  
  * GitHub Actions  
  * GitLab CI  
* PR annotations with clear failure reasons  
* Contract versioning & diffs  
* Local \+ CI-only execution  
* “Bring your own evals” by design

### **🔵 Paid (Same Product, Higher-Order Needs)**

**Human coordination & org governance**

* Approval workflows  
  * Role-based approvers  
  * Mandatory justification  
  * Expiry & scope  
* Decision history & audit log  
* Control-plane UI (not dashboards)  
* Environment governance (dev / stage / prod)  
* Org-wide policy inheritance  
* SSO, RBAC  
* Long-term retention & exports  
* Optional hosted enforcement (opt-in)

---

## **6\. Customer vs User**

### **Buyer (who pays)**

* Platform Engineering teams  
* ML Infra / AI Platform teams  
* Companies scaling AI into production  
* Org size:  
  * 10–500 engineers  
  * 1–10 AI teams

### **Daily Users**

* AI / ML engineers  
* Backend engineers touching prompts / agents

### **Occasional Users**

* Tech leads  
* Security / compliance reviewers  
* Engineering managers

**Key insight:**  
Most users never open Twotrim’s UI.  
They experience it as a **PR gate**.

---

## **7\. Pricing (Aligned with Helicone / Confident AI)**

Twotrim should price as **infra, not experimentation**.

### **Target pricing band**

Comparable to:

* Helicone  
* Confident AI  
* Arize GenAI tiers

### **Suggested structure**

**Free (OSS)**

* Unlimited local / CI use  
* No approvals  
* No audit retention

**Team**

* $50–$150 / month  
* Approval workflows  
* Basic decision history

**Business**

* $300–$800 / month  
* Full audit log  
* Org-level governance  
* Multiple environments

**Enterprise**

* Custom  
* SSO  
* Compliance exports  
* Dedicated support

Pricing justification:

* Prevents production regressions  
* Reduces incident cost  
* Replaces manual release reviews

---

## **Final Reality Check**

* This is **not** a random shot  
* This matches exactly what \#evals discourse is missing  
* This does **not** compete head-on with eval tools  
* This product is about **authority, not insight**

**Twotrim wins by being the thing that says “no” — and being trusted when it does.**

If you want, next I can:

* turn this into a polished PDF  
* rewrite it as a public README  
* or create a “Twotrim vs Confident vs Helicone” comparison table for your website

# feature details

Perfect — below is the **final, canonical feature list** you can copy into your docs and treat as the **single source of truth** while building.

This is **not aspirational**, not phased, not marketing.  
This is a **build checklist** aligned with everything we validated from LinkedIn \#evals threads, Reddit, and real engineering workflows.

If a feature is **not on this list**, do **not** build it.

---

# **Twotrim — Final Feature List (Locked)**

## **Product definition (for the doc header)**

**Twotrim is an open-core, eval-driven release enforcement system that turns evaluation results into deterministic, auditable go/no-go decisions inside CI/CD.**

---

# **🟢 OPEN SOURCE FEATURES (Core, Adoption-Critical)**

These features **must work end-to-end without any paid service**.

---

## **1\. Eval Contract System (OSS)**

**What it is**

* A declarative contract that defines when AI changes are allowed to ship.

**Features**

* Eval contract specification (YAML / JSON)  
* Required eval suites  
* Rule definitions (metric, baseline, operator, allowed delta)  
* Environment scoping (dev / staging / prod)  
* Deterministic outcomes:  
  * `PASS`  
  * `BLOCK`  
  * `REQUIRES_APPROVAL`  
* Contract validation  
* Contract versioning  
* Contract diffing

**What it does NOT do**

* Define eval metrics  
* Judge output quality  
* Run evals

---

## **2\. Eval Result Ingestion (OSS, Read-Only)**

**What it is**

* A normalization layer that consumes eval outputs from existing tools.

**Features**

* File-based ingestion (JSON)  
* CI artifact ingestion  
* Adapters for:  
  * OpenEvals  
  * Promptfoo  
  * LangSmith (export-based)  
  * Generic JSON  
* Schema validation  
* Versioned internal eval schema

**Hard guarantees**

* No API access to eval tools  
* No eval execution  
* No eval scheduling  
* No data mutation

---

## **3\. Deterministic Decision Engine (OSS)**

**What it is**

* A pure policy engine that evaluates contracts against eval facts.

**Features**

* Deterministic evaluation logic  
* No randomness  
* No heuristics  
* Stable decision semantics  
* Machine-readable decision output  
* Human-readable explanation structure

**Decision states**

* PASS  
* BLOCK  
* REQUIRES\_APPROVAL

---

## **4\. CLI (OSS)**

**What it is**

* The primary interface for developers and CI.

**Commands**

* `twotrim check` – enforce contracts  
* `twotrim diff` – show eval \+ contract diffs  
* `twotrim explain` – human-readable reasoning

**Features**

* Local execution  
* CI-safe execution  
* Exit codes for CI  
* JSON \+ text output  
* No auth required (OSS mode)

---

## **5\. CI / PR Integration (OSS)**

**What it is**

* CI-native enforcement surface.

**Features**

* GitHub Actions example  
* GitLab CI example  
* Required PR checks  
* Text-only PR annotations  
* Clear failure reasons  
* Clear next steps (fix or request approval)

**Explicitly excluded**

* No dashboards  
* No GitHub App  
* No webhooks in OSS

---

## **6\. Explanation & Diffing (OSS)**

**What it is**

* Trust infrastructure to prevent gate fatigue.

**Features**

* Eval result diffs (previous vs current)  
* Contract diffs  
* Violation-level explanations  
* Deterministic formatting  
* Stable ordering

---

## **7\. OSS Documentation & Templates**

**Features**

* “Bring Your Own Evals” docs  
* Eval contract templates  
* CI integration examples  
* Philosophy & non-goals  
* Security & trust guarantees

---

# **🔵 PAID FEATURES (Same Product, Organizational Layer)**

These features solve **human coordination, governance, and memory**.

---

## **8\. Approval Workflows (Paid)**

**What it is**

* Structured human override system.

**Features**

* Approval request creation  
* Role-based approvers  
* Mandatory justification  
* Scoped approvals (PR / commit / time)  
* Expiry handling  
* Slack / GitHub notifications  
* Approval tokens tied to decisions

---

## **9\. Decision History & Audit Log (Paid)**

**What it is**

* System of record for release decisions.

**Features**

* Immutable decision records  
* Full context capture:  
  * contracts  
  * eval inputs (hashed)  
  * decisions  
  * approvals  
* Searchable history  
* Export for audits  
* Long-term retention

---

## **10\. Control Plane UI (Paid)**

**What it is**

* Low-frequency governance UI (not analytics).

**Features**

* View active contracts  
* View recent decisions  
* Inspect diffs & explanations  
* Review approvals  
* Read-only by default

---

## **11\. Org & Environment Governance (Paid)**

**What it is**

* Scale control for multi-team orgs.

**Features**

* Org-level contracts  
* Repo-level overrides  
* Environment-specific enforcement  
* Policy inheritance  
* Admin controls

---

## **12\. Enterprise Integrations (Paid)**

**Features**

* SSO  
* RBAC  
* Compliance exports  
* Access logs

---

## **13\. Optional Hosted Enforcement / Proxy (Paid, Optional)**

**What it is**

* Hosted execution for teams that want it.

**Rules**

* Explicit opt-in  
* Contract-controlled  
* Not required for core product  
* Never default

---

# **❌ EXPLICITLY OUT OF SCOPE (DO NOT BUILD)**

These are **hard NOs**:

* Running evals  
* Scheduling evals  
* Defining eval metrics  
* Prompt editors / playgrounds  
* Observability dashboards  
* Model routing  
* Cost optimization  
* Agent orchestration  
* “AI insights”

---

# **One-line sanity check (keep this in your repo)**

**Every feature must answer:**  
**“Is this AI change allowed to ship under explicit, reviewable contracts?”**

If it doesn’t → it does not belong.

---

## **Final note (important)**

You now have:

* A **complete feature inventory**  
* Clear OSS vs paid boundaries  
* A buildable, defensible scope  
* No assumptions left unexamined

You can safely move forward with implementation.

If you want next, I can:

* map this list directly to a repo structure  
* turn it into a README / docs outline  
* or help you pick the **exact build order without changing scope**

Just tell me.

# day-to-day life usage pattern

**Developers “use” Twotrim the same way they use `eslint`, `pytest`, or `terraform plan` — not like a web app.**

They don’t log in.  
They don’t “open” Twotrim daily.  
They **feel it only when something goes wrong**.

That’s intentional.

---

# **The key mental model (lock this in)**

**Twotrim OSS is a compiler / linter / policy checker, not a product UI.**

Ask yourself:

* Who “uses” `eslint` day to day?  
* Who “uses” `unit tests`?  
* Who “uses” `terraform validate`?

Answer:

Nobody actively.  
They only notice it when it blocks them.

That is exactly the UX you want.

---

# **So who uses Twotrim day to day?**

## **1️⃣ AI / backend engineers (primary)**

**They don’t “open” Twotrim.**  
They interact with it **only through PRs and CI results**.

### **Their daily life looks like this**

#### **Normal day (most days)**

* Write code / prompts  
* Push PR  
* CI passes  
* Merge

👉 Twotrim is invisible.

#### **Bad day (important days)**

* Change causes eval regression  
* PR shows ❌ **Twotrim blocked**  
* Engineer reads explanation  
* Fixes or requests approval

👉 Twotrim becomes visible **only when it must**.

That’s perfect.

---

## **2️⃣ Platform / infra engineers (secondary)**

They interact with Twotrim **occasionally**, not daily.

### **Their interaction is:**

* Define or update `eval_contract.yaml`  
* Review contract diffs in PRs  
* Adjust rules when business changes

Again:

* No UI needed  
* Everything is code-reviewed  
* Stored in git

---

# **“If we don’t store anything, how does it work?”**

This is the crucial technical clarification.

## **OSS Twotrim is stateless, but not memoryless**

### **Where “memory” actually lives**

| Thing | Where it lives |
| ----- | ----- |
| Eval results | CI artifacts / files |
| Contracts | Git repo |
| Baselines | Previous CI artifacts |
| Decisions | CI logs |
| History | Git history |

Twotrim doesn’t store state —  
**Git \+ CI already do**.

This is not a weakness.  
It’s a design advantage.

---

# **Let’s walk through a full day-to-day flow (OSS only)**

### **Day 1: Setup (one-time)**

* Team adds:  
  * `eval_contract.yaml`

CI step:  
twotrim check \--eval results.json \--contract eval\_contract.yaml

*   
* Done.

No dashboard. No onboarding.

---

### **Day 5: Normal PR**

1. Engineer updates prompt  
2. CI runs evals  
3. Twotrim runs  
4. Decision \= PASS  
5. PR merges

**Developer experience:**

“Nothing happened.”

That’s success.

---

### **Day 12: Regression PR**

1. Engineer changes agent logic  
2. CI runs evals  
3. Twotrim runs  
4. Decision \= BLOCK

PR shows:  
❌ Twotrim: Eval contract violated  
Reason: hallucination\_rate \+3.1% (limit 0%)

5. 

**Developer experience:**

“Ah. I see exactly why.”

They:

* fix it, or  
* ask for approval (if paid)

---

### **Day 30: Contract update**

1. Platform engineer updates contract  
2. PR shows contract diff  
3. Team reviews:  
   “Are we okay relaxing this rule?”  
4. Merge

Again:

* No UI  
* No state  
* Git is the system of record

---

# **Why this works better than storing data**

From real \#evals discussions, teams complain that:

* dashboards get ignored  
* history gets fragmented  
* “truth” lives in too many places

Stateless \+ CI-native means:

* One source of truth (repo \+ CI)  
* No sync problems  
* No “what environment is this?”  
* No drift

This is why:

* linters  
* tests  
* policy checkers

work so well.

---

# **So when DO we need storage?**

Only when **humans need memory**, not machines.

That’s exactly why storage is **paid**.

---

## **OSS (no storage) covers:**

* Enforcement  
* Determinism  
* Immediate decisions

## **Paid (storage) covers:**

* Approvals  
* Audit trails  
* Organizational memory  
* Cross-repo visibility

This split is not arbitrary.  
It mirrors real pain emergence.

---

# **The mistake you must NOT make**

❌ Thinking:

“If users don’t log in, they won’t value it.”

Wrong.

Infra products are valued because:

* they stop bad things  
* they reduce risk  
* they remove arguments

Not because they’re opened daily.

---

# **Final, very direct answer to your question**

**“If we are not storing anything, who will use it day to day?”**

**Answer:**

* Developers use it *implicitly* through CI  
* Platform teams use it *occasionally* through code review  
* Nobody logs into it  
* Nobody babysits it  
* Nobody thinks about it unless it blocks them

That’s not a weakness.

That’s exactly how **real enforcement tools succeed**.

If you want next, I can:

* map Twotrim’s UX explicitly against ESLint / Terraform / unit tests  
* show how this stateless design converts naturally into paid features  
* or help you write the “How Twotrim fits into daily dev life” section for docs

Just tell me.

# how public will use

Yes — **but with a very specific meaning**.

**Twotrim is primarily a *library \+ CLI***, not a SaaS app, not a dashboard, not middleware.

Let me be precise so there’s zero confusion later.

---

## **The correct framing (lock this in)**

**Twotrim is a policy-enforcement library that ships as a CLI and runs inside CI/CD.**

That’s it.

Not:

* “a platform”  
* “a service”  
* “an app users log into”

---

## **What “library” means in your case (concretely)**

### **1️⃣ A core library**

This is the heart of Twotrim.

* Pure functions  
* Deterministic  
* No network calls  
* No storage  
* No auth

Example (conceptually):

import { evaluateContracts } from "twotrim-core"

const decision \= evaluateContracts({  
  contracts,  
  evalResults,  
  baselines  
})

This is:

* testable  
* forkable  
* auditable  
* OSS-friendly

This is what people **trust**.

---

### **2️⃣ A CLI wrapper (this is how it’s used)**

Most users will never import the library directly.

They will use:

twotrim check \\  
  \--contract eval\_contract.yaml \\  
  \--eval results.json

The CLI:

* reads files  
* calls the core library  
* prints results  
* exits with codes CI understands

This is how it becomes *real* in day-to-day work.

---

### **3️⃣ CI/CD integrations are just thin wrappers**

Your GitHub Action / GitLab CI step is literally:

\- run: twotrim check ...

No magic.  
No background services.  
No webhooks.

---

## **What it is NOT (important)**

Twotrim OSS is **not**:

❌ a hosted service  
❌ a UI-first product  
❌ an always-running daemon  
❌ middleware sitting in request paths  
❌ something engineers “open” daily

If you drift here, you break the product.

---

## **How this matches real, successful tools**

Twotrim should feel like:

* `eslint`  
* `pytest`  
* `terraform plan`  
* `opa eval`  
* `conftest`

All of these are:

* libraries  
* wrapped in CLIs  
* enforced in CI  
* invisible when things go well

That’s the category you’re in.

---

## **Where the paid part fits (later, cleanly)**

Even when you add paid features, **the core remains a library**.

Paid adds:

* a **remote approval service**  
* a **decision store**  
* a **governance UI**

But the flow stays:

CLI → core library → (optional) hosted services

The CLI is always the entry point.  
The library is always the authority.

This is critical for trust.

---

## **How you should describe Twotrim publicly**

You should say things like:

“Twotrim is an open-core policy enforcement library for AI evals that runs in CI/CD.”

or

“Twotrim is a CLI-first tool that blocks AI changes that violate eval contracts.”

Avoid:

* “platform”  
* “dashboard”  
* “service”

Those words attract the wrong expectations.

---

## **Final, very direct answer**

**Yes — Twotrim is a library.**

More precisely:

* an **OSS core library**  
* distributed via a **CLI**  
* enforced in **CI/CD**  
* optionally backed by **paid services**

That is the cleanest, safest, most credible shape for what you’re building.

If you want next, I can:

* help you choose language / packaging (npm vs binary)  
* design the exact public API of the core library  
* or sketch how the paid service integrates without contaminating the OSS core

Just say the word.

# depth of each feature

Alright. This is the **last-mile engineering spec**.  
I’ll go **feature by feature**, and for **each one** I’ll give you:

* **What exact problem it solves (from real eval discourse)**  
* **How we technically implement it (components, data, flow)**  
* **How deep we go (what “done” means)**  
* **What is explicitly out of scope — and why**

No assumptions. No hand-waving.  
Think of this as the doc you keep open while coding.

---

# **GLOBAL TECH PRINCIPLES (lock these first)**

Before features, these are **non-negotiable**:

1. **Pure, deterministic core**  
   * Same inputs → same outputs  
   * No clocks, randomness, network calls in OSS core  
2. **File-first, CI-first**  
   * Everything must work with files \+ CLI  
   * No service dependency for OSS  
3. **Eval neutrality**  
   * We never compute evals  
   * We never interpret “quality”  
   * We only evaluate *facts vs contracts*  
4. **Authority over insight**  
   * Binary decisions \> dashboards  
   * Explanations \> metrics

Keep these visible while building.

---

# **🟢 OPEN SOURCE FEATURES (DEEP TECH SPECS)**

---

## **1️⃣ Eval Contract System**

### **Problem it solves**

Teams argue about eval results because **intent is implicit** and **thresholds are scattered**.

---

### **What we build (artifacts)**

* `eval_contract.yaml`  
* Contract schema  
* Contract parser \+ validator  
* Contract evaluator

---

### **Contract schema (minimum viable, strict)**

version: 1  
environment: production

required\_evals:  
  \- name: safety\_v3  
    rules:  
      \- metric: hallucination\_rate  
        operator: "\<="  
        baseline: previous  
        max\_delta: 0.0

on\_violation:  
  action: block

---

### **Technical handling (step by step)**

1. **Parsing**  
   * Use JSON Schema / Zod  
   * Validate:  
     * required fields  
     * supported operators  
     * supported baselines  
2. **Baseline resolution**  
   * `previous` → last successful run artifact  
   * `main` → artifact from main branch  
   * Store only **hash references**, not raw data  
3. **Rule evaluation**  
   * For each rule:  
     * read metric from eval result  
     * compute delta vs baseline  
     * apply operator  
   * No aggregation magic — explicit rules only  
4. **Decision reduction**  
   * Any rule violation → violation list  
   * Reduce violations → decision:  
     * `BLOCK`  
     * `REQUIRES_APPROVAL`  
     * `PASS`

---

### **How deep we go (definition of done)**

* Can express “must not regress”  
* Can express “allowed small regression”  
* Can compare against previous runs  
* Deterministic output

---

### **Out of scope (intentionally)**

❌ Metric computation  
❌ Statistical analysis  
❌ Auto-threshold tuning  
❌ “Suggested” rules

**Why:**  
Those turn contracts into opinions. We enforce intent, we don’t invent it.

---

## **2️⃣ Eval Result Ingestion (Read-Only)**

### **Problem it solves**

Eval tools are bespoke and proprietary. Integration must be **low trust**.

---

### **What we build**

* Adapter interface  
* Concrete adapters  
* Normalized internal model

---

### **Adapter interface (example)**

interface EvalAdapter {  
  supports(file: unknown): boolean  
  parse(file: unknown): NormalizedEval  
}

---

### **Normalized model**

{  
  "eval\_name": "safety\_v3",  
  "run\_id": "abc123",  
  "metrics": {  
    "hallucination\_rate": 0.031  
  },  
  "metadata": {  
    "model": "gpt-4.1",  
    "commit": "a1b2c3"  
  }  
}

---

### **Ingestion flow**

1. User provides file(s)  
2. Adapter auto-detection  
3. Parse → normalize  
4. Schema validation  
5. Pass normalized facts to engine

---

### **How deep we go**

* File-based only  
* JSON only  
* Multiple eval files supported  
* Deterministic parsing

---

### **Out of scope**

❌ API integrations  
❌ Live polling  
❌ Eval execution  
❌ Data storage (OSS)

**Why:**  
Direct integrations increase trust surface and slow adoption.

---

## **3️⃣ Deterministic Decision Engine**

### **Problem it solves**

Scripts rot; humans improvise; decisions drift.

---

### **What we build**

Pure function:  
(contracts, evalFacts, baselines) → decision

* 

---

### **Internal model**

type Decision \=  
  | { status: "PASS" }  
  | { status: "BLOCK"; violations: Violation\[\] }  
  | { status: "REQUIRES\_APPROVAL"; violations: Violation\[\] }

---

### **Technical handling**

* No I/O  
* No clocks  
* No retries  
* No heuristics  
* Exhaustive switch handling

---

### **How deep we go**

* Fully testable  
* Snapshot-tested  
* Versioned behavior

---

### **Out of scope**

❌ ML models  
❌ Probabilistic logic  
❌ “Best guess” decisions

**Why:**  
Decision engines must be boring and predictable.

---

## **4️⃣ CLI**

### **Problem it solves**

CI needs **binary outcomes**, not dashboards.

---

### **Commands**

* `twotrim check`  
* `twotrim diff`  
* `twotrim explain`

---

### **Technical handling**

* Single static binary  
* Reads files from disk  
* Writes:  
  * stdout (human)  
  * JSON (machine)  
* Exit codes:  
  * `0` pass  
  * `1` block  
  * `2` approval required

---

### **How deep we go**

* Works locally  
* Works in CI  
* No config server  
* No auth

---

### **Out of scope**

❌ Interactive UI  
❌ Background daemon  
❌ Remote calls

**Why:**  
CLI must be frictionless.

---

## **5️⃣ CI / PR Integration**

### **Problem it solves**

Dashboards don’t block merges.

---

### **What we build**

* GitHub Actions example  
* GitLab CI example  
* PR annotations (text only)

---

### **Technical handling**

* Exit code drives PR status  
* Logs printed to CI output  
* Optional artifact upload

---

### **How deep we go**

* Required check compatible  
* Zero permissions escalation

---

### **Out of scope**

❌ GitHub App  
❌ Webhooks  
❌ SaaS dependency

**Why:**  
OSS must work everywhere.

---

## **6️⃣ Explanation & Diffing**

### **Problem it solves**

Blocked PRs get disabled if unexplained.

---

### **What we build**

* Eval diff engine  
* Contract diff engine  
* Violation formatter

---

### **Technical handling**

* Structural diffs  
* Stable ordering  
* Deterministic formatting

---

### **How deep we go**

* Explain *why* blocked  
* Show *what* changed  
* Nothing more

---

### **Out of scope**

❌ Charts  
❌ Trend analysis  
❌ Visual dashboards

**Why:**  
Clarity \> visualization.

---

# **🔵 PAID FEATURES (TECH SPECS)**

---

## **7️⃣ Approval Workflows**

### **Problem it solves**

Slack approvals are invisible and unscoped.

---

### **What we build**

* Hosted approval service  
* Approval tokens  
* Minimal UI \+ Slack bot

---

### **Technical handling**

1. Engine returns `REQUIRES_APPROVAL`  
2. CLI submits decision hash  
3. Approval record created  
4. Approver signs  
5. Signed token returned  
6. CLI re-runs with token

---

### **How deep we go**

* Scoped approvals  
* Expiry enforced  
* Immutable records

---

### **Out of scope**

❌ Free-form discussion  
❌ Chat-based decision making

**Why:**  
Approvals must be precise, not conversational.

---

## **8️⃣ Decision History & Audit Log**

### **Problem it solves**

Postmortems require answers, not archaeology.

---

### **What we build**

* Append-only log  
* Hash-based references  
* Search API

---

### **Technical handling**

* Store hashes, not raw evals  
* Link:  
  * commit → decision → approval

---

### **Out of scope**

❌ Analytics  
❌ KPI dashboards

**Why:**  
This is memory, not insight.

---

## **9️⃣ Control Plane UI**

### **Problem it solves**

Platform teams need oversight.

---

### **What we build**

* Read-only views  
* Approval management  
* Diff inspection

---

### **How deep we go**

* Low-frequency usage  
* Governance-first UX

---

### **Out of scope**

❌ Daily dev workflow  
❌ Visualization-heavy UI

---

## **🔟 Org & Environment Governance**

### **Problem it solves**

Policy drift at scale.

---

### **What we build**

* Policy inheritance  
* Environment scoping  
* Admin enforcement

---

### **How deep we go**

* Deterministic merge rules  
* Explicit precedence

---

### **Out of scope**

❌ Auto-policy generation  
❌ AI-driven governance

---

# **FINAL BUILD GUIDANCE (IMPORTANT)**

If you’re unsure whether to build something, ask:

**Does this reduce ambiguity in a release decision?**

If no → don’t build it.

---

## **TL;DR**

* We go **deep** on:  
  * contracts  
  * enforcement  
  * determinism  
  * auditability  
* We stay **shallow** on:  
  * eval mechanics  
  * UI  
  * analytics  
  * automation magic

That discipline is what makes this product real.

If you want next, I can:

* turn this into a **repo TODO checklist**  
* create a **technical architecture diagram**  
* or map this directly onto your existing TwoTrim codebase

Just tell me.

