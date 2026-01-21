"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  GitBranch, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Github,
  FileCode,
  Lock,
  Zap,
  Eye,
  Check,
  Copy,
  Loader2,
  Mail,
  Sparkles,
  Star
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "overseek944/Geval"

// GitHub Stars Component
function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Link
      href={`https://github.com/${GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:border-primary/50 hover:bg-secondary/50 transition-all group"
    >
      <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">Star</span>
      <span className="flex items-center gap-1 px-2 py-0.5 bg-secondary rounded text-xs font-medium text-foreground">
        <Star className="w-3 h-3 fill-accent text-accent" />
        {loading ? "—" : stars ?? "0"}
      </span>
    </Link>
  )
}

// Waitlist Form Component
function WaitlistForm({ variant = "default" }: { variant?: "default" | "inline" }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email")
      return
    }

    setStatus("loading")
    
    // Simulate API call - replace with your actual waitlist API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For now, just show success - you'll want to connect this to your backend
    setStatus("success")
    setMessage("You're on the list! We'll be in touch soon.")
    setEmail("")
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/30",
          variant === "inline" && "justify-center"
        )}
      >
        <CheckCircle2 className="w-5 h-5 text-primary" />
        <span className="text-primary font-medium">{message}</span>
      </motion.div>
    )
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full pl-11 pr-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Join Waitlist
            </>
          )}
        </button>
        {status === "error" && (
          <p className="text-red-400 text-sm absolute -bottom-6 left-0">{message}</p>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email"
          className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-lg"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 glow-primary transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Join the Waitlist
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm">{message}</p>
      )}
      <p className="text-xs text-muted-foreground text-center">
        No spam. We'll only email you when we launch.
      </p>
    </form>
  )
}

// Terminal Animation Component
function TerminalDemo() {
  const [currentLine, setCurrentLine] = useState(0)
  
  const lines = [
    { type: "command", text: "$ geval check" },
    { type: "output", text: "→ Loading contract: .geval/contracts/safety.yaml" },
    { type: "output", text: "→ Fetching eval results from promptfoo..." },
    { type: "output", text: "" },
    { type: "success", text: "✓ toxicity_score: 0.02 (threshold: < 0.1)" },
    { type: "success", text: "✓ accuracy: 0.94 (threshold: ≥ 0.90)" },
    { type: "error", text: "✗ hallucination_rate: 0.15 (threshold: < 0.05)" },
    { type: "output", text: "" },
    { type: "blocked", text: "BLOCKED: 1 contract violation detected" },
    { type: "output", text: "→ PR #247 cannot be merged" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % (lines.length + 3))
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative">
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">geval — ci/cd pipeline</span>
        </div>
        
        <div className="p-4 font-mono text-sm min-h-[280px] bg-[#0d1512]">
          {lines.slice(0, Math.min(currentLine, lines.length)).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "leading-relaxed",
                line.type === "command" && "text-foreground",
                line.type === "output" && "text-muted-foreground",
                line.type === "success" && "text-primary",
                line.type === "error" && "text-red-400",
                line.type === "blocked" && "text-red-400 font-semibold mt-2"
              )}
            >
              {line.text}
            </motion.div>
          ))}
          {currentLine < lines.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
          )}
        </div>
      </div>
      
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
    </div>
  )
}

// Feature Explorer Component - Interactive left-right layout
const featureData = [
  {
    id: "yaml",
    title: "YAML Contracts",
    icon: FileCode,
    description: "Define quality thresholds in simple, version-controlled YAML files. Specify what 'acceptable' means for every metric that matters to your team.",
    visual: "code",
    code: `# .geval/contracts/safety.yaml
name: safety-contract
version: 1.0

rules:
  - metric: toxicity_score
    operator: "<"
    threshold: 0.1
    action: block
    
  - metric: accuracy
    operator: ">="
    threshold: 0.90
    action: block
    
  - metric: latency_p99
    operator: "<"
    threshold: 500
    action: warn`,
  },
  {
    id: "cicd",
    title: "CI/CD Integration",
    icon: GitBranch,
    description: "Required checks that block PRs when contracts fail. Native support for GitHub Actions, GitLab CI, and any CI system that can run commands.",
    visual: "code",
    code: `# .github/workflows/ai-release.yml
name: AI Release Gate

on: [pull_request]

jobs:
  geval-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Evals
        run: npx promptfoo eval
        
      - name: Geval Contract Check
        uses: geval-ai/action@v1
        with:
          contract: .geval/contracts/safety.yaml
          results: ./eval-results.json`,
  },
  {
    id: "cli",
    title: "CLI Tools",
    icon: Terminal,
    description: "Simple, powerful commands for local development and CI. Check contracts, diff between runs, and get clear explanations of why checks pass or fail.",
    visual: "terminal",
    code: `$ geval check --contract safety.yaml

Loading contract: safety.yaml
Fetching results: ./eval-results.json

Checking 3 rules against 847 eval samples...

✓ toxicity_score: 0.03 (< 0.1)      PASS
✓ accuracy:       0.94 (≥ 0.90)     PASS  
✓ latency_p99:    312ms (< 500ms)   PASS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTRACT PASSED - Ready to ship
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
  },
  {
    id: "sources",
    title: "Any Eval Source",
    icon: Zap,
    description: "We don't run evals—we enforce them. Ingest results from Promptfoo, LangSmith, Braintrust, OpenEvals, or any tool that outputs JSON.",
    visual: "image",
    imagePlaceholder: "A diagram showing multiple eval tool logos (Promptfoo, LangSmith, Braintrust, OpenAI Evals) on the left, with arrows flowing into a central Geval box, which outputs to GitHub/GitLab PR checks on the right. Dark theme, minimal, with green accent color.",
  },
  {
    id: "oss",
    title: "Open Source Core",
    icon: Lock,
    description: "Core enforcement logic is fully open source. Inspect, audit, fork, and contribute. No black-box decisions on your release pipeline.",
    visual: "code",
    code: `// Core contract evaluation - MIT Licensed
// github.com/geval-ai/geval

export function evaluateContract(
  contract: Contract,
  results: EvalResults
): Decision {
  const violations: Violation[] = []
  
  for (const rule of contract.rules) {
    const value = results.metrics[rule.metric]
    const passed = compare(value, rule.operator, rule.threshold)
    
    if (!passed) {
      violations.push({
        rule: rule.metric,
        expected: \`\${rule.operator} \${rule.threshold}\`,
        actual: value,
        action: rule.action
      })
    }
  }
  
  return {
    passed: violations.length === 0,
    violations,
    timestamp: Date.now()
  }
}`,
  },
  {
    id: "audit",
    title: "Audit Trail",
    icon: Eye,
    description: "Every decision logged. Every override tracked. When compliance asks 'why did this ship?', you have the answer in seconds.",
    visual: "image",
    imagePlaceholder: "A clean audit log interface showing a timeline of release decisions. Each entry shows: timestamp, PR number, decision (PASSED/BLOCKED), contract version, and who approved overrides. Dark theme, table/list format, with green checkmarks and red X marks for decisions.",
  },
]

function FeatureExplorer() {
  const [activeFeature, setActiveFeature] = useState("yaml")
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const feature = featureData.find(f => f.id === activeFeature) || featureData[0]
  const Icon = feature.icon
  const DURATION = 5000 // 5 seconds per feature

  // Auto-advance progress
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next feature
          const currentIndex = featureData.findIndex(f => f.id === activeFeature)
          const nextIndex = (currentIndex + 1) % featureData.length
          setActiveFeature(featureData[nextIndex].id)
          return 0
        }
        return prev + (100 / (DURATION / 50)) // Update every 50ms
      })
    }, 50)

    return () => clearInterval(interval)
  }, [activeFeature, isPaused])

  // Reset progress when manually selecting a feature
  const handleFeatureClick = (id: string) => {
    setActiveFeature(id)
    setProgress(0)
  }

  return (
    <div className="rounded-2xl border border-border bg-card/20 overflow-hidden">
      <div className="grid lg:grid-cols-5">
        {/* Left - Feature List */}
        <div className="lg:col-span-2 bg-secondary/20 border-b lg:border-b-0 lg:border-r border-border relative">
          <div className="p-2 lg:p-3">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Features</p>
            <div className="space-y-0">
              {featureData.map((item) => {
                const ItemIcon = item.icon
                const isActive = activeFeature === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleFeatureClick(item.id)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 text-left transition-all duration-200 relative group",
                      isActive 
                        ? "bg-primary/10 lg:rounded-l-xl lg:rounded-r-none lg:mr-[-1px] lg:border-r lg:border-primary/30" 
                        : "hover:bg-secondary/30"
                    )}
                  >
                    {/* Progress indicator line - animates while active */}
                    <div 
                      className={cn(
                        "absolute top-0 left-0 h-[2px] bg-primary transition-none",
                        !isActive && "bg-transparent group-hover:bg-primary/30"
                      )}
                      style={{ 
                        width: isActive ? `${progress}%` : '0%',
                        transition: isActive ? 'none' : 'width 0.3s ease-out'
                      }}
                    />
                    {/* Background track for non-active items on hover */}
                    <div 
                      className={cn(
                        "absolute top-0 left-0 w-full h-[2px] bg-border/30 opacity-0 group-hover:opacity-100 transition-opacity",
                        isActive && "opacity-100 bg-border/20"
                      )}
                    />
                    
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      isActive ? "bg-primary/20 border border-primary/30" : "bg-secondary/50"
                    )}>
                      <ItemIcon className={cn(
                        "w-4 h-4",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className={cn(
                      "font-medium transition-colors text-sm flex-1",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {item.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right - Feature Detail */}
        <div className="lg:col-span-3">
          <div className="p-4 lg:p-6">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">Core Feature</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Visual Content */}
              {(feature.visual === "code" || feature.visual === "terminal") && feature.code && (
                <div className="rounded-xl border border-border bg-[#0a0f0d] overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/20 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">
                      {feature.id === "yaml" && ".geval/contracts/safety.yaml"}
                      {feature.id === "cicd" && ".github/workflows/ai-release.yml"}
                      {feature.id === "cli" && "geval — terminal"}
                      {feature.id === "oss" && "geval/core/evaluate.ts"}
                    </span>
                  </div>
                  <pre className="p-4 text-xs overflow-x-auto whitespace-pre max-h-[280px]">
                    <code className={cn(
                      "font-mono",
                      feature.visual === "terminal" ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {feature.code}
                    </code>
                  </pre>
                </div>
              )}

              {feature.visual === "image" && (
                <div className="rounded-xl border border-dashed border-border bg-secondary/10 p-6 min-h-[200px] flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary/40" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground/60 font-medium mb-1">Image Placeholder</p>
                    <p className="text-xs text-muted-foreground/40 max-w-xs leading-relaxed">
                      {feature.imagePlaceholder}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen grid-bg">
      {/* Floating Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <nav className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border border-border rounded-2xl shadow-lg">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center group-hover:glow-primary transition-all">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">geval</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Social Links */}
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="https://twitter.com/geval_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/company/geval"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
            
            <GitHubStars />
            
            {/* Join Waitlist Button - Enterprise OSS Style */}
            <Link
              href="#waitlist"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Get Early Access</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-primary font-medium">Open Source • Launching Q2 2026</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Evals are not reports.{" "}
                <span className="text-primary text-glow">They are release contracts.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Geval is the open-source release enforcement engine that turns eval results into 
                deterministic go/no-go decisions inside CI/CD. Block unverified AI changes before production.
              </p>

              {/* Social proof */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>GitHub Actions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>GitLab CI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Any eval tool</span>
                </div>
              </div>

              {/* GitHub stars highlight */}
              {/* <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Follow our progress on GitHub</p>
                <GitHubStars />
              </div> */}
            </motion.div>

            <div>
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              The problem we&apos;re solving
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Teams run LLM evals, but shipping decisions are still manual. Results are reviewed via 
              dashboards, Slack messages, and &quot;vibe checks.&quot; Regressions ship because nothing blocks the PR.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Eye, text: "Evals exist, but shipping is manual" },
              { icon: AlertTriangle, text: "Regressions ship unblocked" },
              { icon: XCircle, text: "No one can answer: \"Why did this ship?\"" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-red-400/20 bg-red-400/5"
              >
                <item.icon className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-sm text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We're Building - Interactive Feature Explorer */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              What we&apos;re building
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A decision authority, not a dashboard. A gate, not a graph.
            </p>
          </motion.div>

          <FeatureExplorer />
        </div>
      </section>

      {/* How It Will Work - Flow Diagram Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How it will work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From code change to production in three deterministic steps
            </p>
          </motion.div>

          {/* Flow Steps */}
          <div className="relative">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
              {[
                {
                  step: "01",
                  title: "Define",
                  subtitle: "Set your release criteria",
                  description: "Create YAML contracts that define what 'acceptable' means for your AI system",
                  visual: "contract",
                  accent: "from-primary/20 to-primary/5",
                },
                {
                  step: "02", 
                  title: "Integrate",
                  subtitle: "Add to your pipeline",
                  description: "One line in your CI config. Geval runs on every PR automatically",
                  visual: "pipeline",
                  accent: "from-accent/20 to-accent/5",
                },
                {
                  step: "03",
                  title: "Enforce",
                  subtitle: "Ship with confidence",
                  description: "PRs are blocked until contracts pass. No exceptions without explicit override",
                  visual: "result",
                  accent: "from-primary/20 to-primary/5",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div className="flex justify-center mb-8">
                    <span className={cn(
                      "text-5xl sm:text-6xl font-black tracking-tighter",
                      i === 0 && "text-primary/70",
                      i === 1 && "text-accent/70",
                      i === 2 && "text-primary/70",
                    )} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      {item.step}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="p-6 rounded-2xl border border-border bg-card/30 h-full">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    </div>
                    
                    <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Visual */}
                    <div className="rounded-xl border border-border bg-[#0a0f0d] overflow-hidden">
                      {item.visual === "contract" && (
                        <pre className="p-3 text-xs overflow-x-auto">
                          <code className="text-muted-foreground">
{`rules:
  - metric: toxicity
    threshold: < 0.1
  - metric: accuracy  
    threshold: ≥ 0.90`}
                          </code>
                        </pre>
                      )}
                      {item.visual === "pipeline" && (
                        <pre className="p-3 text-xs overflow-x-auto">
                          <code className="text-muted-foreground">
{`- name: Geval Check
  uses: geval/action@v1
  with:
    contract: safety.yaml`}
                          </code>
                        </pre>
                      )}
                      {item.visual === "result" && (
                        <div className="p-3 text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span className="text-primary">toxicity: PASS</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            <span className="text-primary">accuracy: PASS</span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-border text-primary font-medium">
                            → PR #247 approved
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/10 mt-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Geval vs. Eval Tools
            </h2>
            <p className="text-muted-foreground">
              Eval tools answer &quot;What happened?&quot;<br />
              Geval answers &quot;Was this <span className="text-primary">allowed</span> to ship?&quot;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-6 rounded-xl border border-border bg-card/50">
              <h3 className="font-semibold text-muted-foreground mb-4 text-sm uppercase tracking-wider">Eval Tools</h3>
              <ul className="space-y-3 text-sm">
                {["Dashboards & metrics", "Score tracking", "Manual review", "Post-hoc analysis"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-4 h-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
              <h3 className="font-semibold text-primary mb-4 text-sm uppercase tracking-wider">Geval</h3>
              <ul className="space-y-3 text-sm">
                {["PR blocking", "CI/CD authority", "Release contracts", "Audit-grade history"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border scroll-mt-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-6">
              {/* <Sparkles className="w-4 h-4 text-accent" /> */}
              <span className="text-sm text-accent font-medium">Be first to know</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Join the waitlist
            </h2>
            <p className="text-muted-foreground mb-8">
              Get early access when we launch. We&apos;re building in public and would love your feedback.
            </p>

            <div className="max-w-md mx-auto">
              <WaitlistForm variant="inline" />
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Want to follow our progress?</p>
              <GitHubStars />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary/20 border border-primary/50 flex items-center justify-center">
                <Shield className="w-3 h-3 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">geval</span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 Geval. Open source under MIT.
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href={`https://github.com/${GITHUB_REPO}`} className="hover:text-primary transition-colors">GitHub</Link>
              <Link href="https://twitter.com/geval_dev" className="hover:text-primary transition-colors">Twitter</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
