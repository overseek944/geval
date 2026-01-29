"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, 
  XCircle, 
  Github,
  FileCode,
  Zap,
  Eye,
  Loader2,
  Mail,
  Star,
  Copy,
  Check,
  AlertCircle,
  Lock,
  Terminal,
  GitBranch
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

const GITHUB_REPO = "geval-labs/geval"

// ============================================================================
// GitHub Stars Component
// ============================================================================

function GitHubStars({ variant = "default" }: { variant?: "default" | "minimal" }) {
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
      .catch(() => setLoading(false))
  }, [])

  if (variant === "minimal") {
    return (
      <Link
        href={`https://github.com/${GITHUB_REPO}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="w-4 h-4" />
        <span>{loading ? "—" : stars ?? "0"} stars</span>
      </Link>
    )
  }

  return (
    <Link
      href={`https://github.com/${GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 px-4 py-2 text-sm bg-secondary/50 border border-border rounded-full hover:border-primary/30 hover:bg-secondary transition-all duration-300"
    >
      <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">Star on GitHub</span>
      <span className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full text-xs font-medium text-primary">
        <Star className="w-3 h-3" />
        {loading ? "—" : stars ?? "0"}
      </span>
    </Link>
  )
}

// Simple star count for navbar (no link, just the number)
function NavStarCount() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {})
  }, [])

  return <span>{stars ?? "0"}</span>
}

// ============================================================================
// Waitlist Form
// ============================================================================

function WaitlistForm({ size = "default" }: { size?: "default" | "large" }) {
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
    
    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email.toLowerCase().trim())
        .single()

      if (existing) {
        setStatus("success")
        setMessage("You're already on the list!")
        setEmail("")
        return
      }

      // Insert new email
      const { error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: email.toLowerCase().trim(),
            source: 'landing_page'
          }
        ])

      if (error) throw error

      setStatus("success")
      setMessage("You're on the list!")
      setEmail("")
    } catch (err) {
      console.error('Waitlist submission error:', err)
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border border-primary/20"
      >
        <CheckCircle2 className="w-5 h-5 text-primary" />
        <span className="text-primary font-medium">{message}</span>
      </motion.div>
    )
  }

  const inputClass = size === "large" 
    ? "w-full pl-12 pr-4 py-4 text-base" 
    : "w-full pl-10 pr-4 py-3 text-sm"
  
  const buttonClass = size === "large"
    ? "px-8 py-4 text-base"
    : "px-6 py-3 text-sm"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <div className="relative flex-1">
        <Mail className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground",
          size === "large" ? "w-5 h-5" : "w-4 h-4"
        )} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={cn(
            inputClass,
            "bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60",
            "focus:outline-none focus:border-primary/40 focus:bg-secondary transition-all duration-300"
          )}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          buttonClass,
          "bg-primary text-primary-foreground rounded-xl font-medium",
          "hover:bg-primary/90 active:scale-[0.98] transition-all duration-200",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "flex items-center justify-center gap-2 whitespace-nowrap"
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Get Early Access"
        )}
      </button>
      {status === "error" && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-6 left-0 text-red-400 text-xs"
        >
          {message}
        </motion.p>
      )}
    </form>
  )
}

// ============================================================================
// Terminal Demo
// ============================================================================

function TerminalDemo() {
  const [currentLine, setCurrentLine] = useState(0)
  const [copied, setCopied] = useState(false)
  
  const lines = [
    { type: "command", text: "$ geval check --contract safety.yaml" },
    { type: "info", text: "" },
    { type: "info", text: "Loading contract..." },
    { type: "info", text: "Evaluating 3 rules against 847 samples" },
    { type: "info", text: "" },
    { type: "pass", text: "✓ toxicity      0.02  (threshold < 0.1)" },
    { type: "pass", text: "✓ accuracy      0.94  (threshold ≥ 0.9)" },
    { type: "fail", text: "✗ hallucination 0.12  (threshold < 0.05)" },
    { type: "info", text: "" },
    { type: "result", text: "BLOCKED · Contract violation detected" },
    { type: "info", text: "Run `geval explain` for details" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % (lines.length + 4))
    }, 600)
    return () => clearInterval(timer)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText("geval check --contract safety.yaml")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">terminal</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
        </div>
        
        <div className="p-5 font-mono text-sm min-h-[320px] bg-[#050807]">
          <AnimatePresence mode="popLayout">
            {lines.slice(0, Math.min(currentLine, lines.length)).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "leading-relaxed py-0.5",
                  line.type === "command" && "text-foreground font-medium",
                  line.type === "info" && "text-muted-foreground/70",
                  line.type === "pass" && "text-primary",
                  line.type === "fail" && "text-red-400",
                  line.type === "result" && "text-red-400 font-semibold pt-1"
                )}
              >
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
          {currentLine <= lines.length && (
            <span className="inline-block w-2 h-5 bg-primary/80 animate-pulse rounded-sm" />
          )}
        </div>
      </div>
    </div>
  )
}


// ============================================================================
// 3D Flip Card for Features
// ============================================================================

function FlipCard({ 
  icon: Icon, 
  title, 
  teaser,
  details,
  index
}: { 
  icon: React.ElementType
  title: string
  teaser: string
  details: string
  index: number
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="h-[300px] perspective-1000 cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-6 flex flex-col group-hover:border-primary/20 transition-colors duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-primary/15 transition-all duration-300">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed flex-1">
            {teaser}
          </p>
        </div>
        
        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {details}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ============================================================================
// Interactive Solution Section
// ============================================================================

function InteractiveSolutionSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [animationKey, setAnimationKey] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const steps = [
    {
      id: "define",
      title: "Define",
      subtitle: "Write the rules",
      description: "Express what 'acceptable' means in simple YAML. Version it. Review it. Commit it.",
      code: `name: production-contract
version: 1.0

rules:
  - metric: toxicity
    threshold: "< 0.1"
    
  - metric: accuracy  
    threshold: ">= 0.90"
    
  - metric: hallucination
    threshold: "< 0.05"

on_violation: block`,
      color: "primary"
    },
    {
      id: "integrate",
      title: "Integrate",
      subtitle: "Add to your pipeline",
      description: "One line in your CI config. Works everywhere shell commands work.",
      code: `# .github/workflows/ai-release.yml
name: AI Release Gate

on: [pull_request]

jobs:
  geval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Geval
        run: |
          npm i -g geval
          geval check --contract safety.yaml`,
      color: "accent"
    },
    {
      id: "enforce",
      title: "Enforce",
      subtitle: "Block bad releases",
      description: "Every PR gets a deterministic verdict. Pass, fail, or review automatically.",
      code: `$ geval check --contract safety.yaml

Loading contract...
Evaluating 3 rules against 847 samples

✓ toxicity      0.02  (threshold < 0.1)
✓ accuracy      0.94  (threshold >= 0.9)
✗ hallucination 0.12  (threshold < 0.05)

BLOCKED · Contract violation detected
PR #421 cannot be merged`,
      color: "primary"
    }
  ]

  // Auto-advance steps - simple cycling through 1→2→3→1...
  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isInView, steps.length])

  // Update animation key when activeStep changes to force progress bar re-render
  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [activeStep])

  return (
    <div ref={ref} className="relative">
      {/* Progress Bar */}
      <div className="flex gap-3 mb-12">
        {steps.map((step, i) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(i)}
            className="flex-1 group"
          >
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              {i === activeStep ? (
                <motion.div
                  key={`progress-${i}-${animationKey}`}
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              ) : (
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: i < activeStep ? "100%" : "0%" }}
                />
              )}
            </div>
            <div className={cn(
              "mt-3 text-sm font-medium transition-colors",
              i === activeStep ? "text-primary" : "text-muted-foreground"
            )}>
              {step.title}
            </div>
          </button>
        ))}
      </div>

      {/* Content - Fixed height container to prevent layout shift */}
      <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[420px]">
        {/* Left - Description */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Large Step Number */}
              <div className="flex items-start gap-6 mb-6">
                <div className={cn(
                  "relative flex items-center justify-center",
                  "w-24 h-24 rounded-3xl",
                  "bg-gradient-to-br border-2 shadow-lg",
                  steps[activeStep].color === "primary" 
                    ? "from-primary/20 via-primary/10 to-transparent border-primary/40 shadow-primary/20"
                    : "from-accent/20 via-accent/10 to-transparent border-accent/40 shadow-accent/20"
                )}>
                  <span className={cn(
                    "text-5xl font-black tracking-tighter",
                    steps[activeStep].color === "primary" ? "text-primary" : "text-accent"
                  )}>
                    {String(activeStep + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="text-3xl font-bold text-foreground mb-1">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {steps[activeStep].subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {steps[activeStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right - Code Block - Fixed height */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-border bg-card overflow-hidden h-full"
            >
            <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border">
              <span className="text-xs text-muted-foreground font-mono">
                {activeStep === 0 ? "safety.yaml" : activeStep === 1 ? ".github/workflows/ai-release.yml" : "terminal"}
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className={cn(
                "font-mono",
                activeStep === 2 ? "text-muted-foreground" : "text-muted-foreground"
              )}>
                {steps[activeStep].code.split('\n').map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                    className={cn(
                      line.includes('✓') && "text-primary",
                      line.includes('✗') && "text-red-400",
                      line.includes('BLOCKED') && "text-red-400 font-semibold",
                      line.startsWith('#') && "text-muted-foreground/60"
                    )}
                  >
                    {line}
                  </motion.div>
                ))}
              </code>
            </pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}



// ============================================================================
// Floating Particles Background (Client-only to avoid hydration mismatch)
// ============================================================================

function FloatingParticles() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function HomePage() {
  const features = [
    {
      icon: FileCode,
      title: "YAML Contracts",
      teaser: "Define quality thresholds in simple, version-controlled files.",
      details: "Express your quality gates in declarative YAML. Define metrics, thresholds, operators, and failure behaviors. Review changes like code. No hidden configs, no magic just clear, auditable rules that your whole team can understand."
    },
    {
      icon: GitBranch,
      title: "CI/CD Native",
      teaser: "Required checks that block PRs. Native support for all major CI systems.",
      details: "Designed from day one to be a CI primitive. Set Geval as a required status check, and no PR merges without explicit contract compliance. Works with GitHub Actions, GitLab CI, CircleCI, Jenkins, or any system that runs shell commands."
    },
    {
      icon: Terminal,
      title: "CLI First",
      teaser: "Simple commands for local development and CI. No web UI required.",
      details: "Everything happens in your terminal. Run locally before pushing. Integrate in CI with a single command. Inspect failures with detailed explanations. No dashboards to log into, no tabs to switch just fast feedback in your existing workflow."
    },
    {
      icon: Zap,
      title: "Any Eval Source",
      teaser: "Ingest from Promptfoo, LangSmith, Braintrust, or any JSON output.",
      details: "Geval is eval-agnostic. Point it at JSON results from your favorite eval framework like Promptfoo, LangSmith, Braintrust, Ragas, or custom scripts. We consume the metrics; you keep your eval stack."
    },
    {
      icon: Lock,
      title: "Open Source Core",
      teaser: "Inspect, audit, and fork. No black-box decisions on your pipeline.",
      details: "The core engine is MIT-licensed and fully open. Audit every decision. Fork and customize. Run air-gapped. Your release pipeline is too critical for vendor lock-in or opaque black boxes."
    },
    {
      icon: Eye,
      title: "Audit Trail",
      teaser: "Every decision logged. Every override tracked. Compliance-ready.",
      details: "Immutable logs of every contract evaluation. When compliance asks 'why did this ship?', you have the answer in seconds. Track who overrode what, when, and why. SOC2 and ISO evidence collection built-in."
    },
  ]

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between px-4 py-2.5 glass border border-border/50 rounded-2xl">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 group-hover:scale-100 transition-transform">
                <Image 
                  src="/white_bg_greenlogo.svg" 
                  alt="Geval Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-2xl font-semibold gradient-text text-glow">Geval</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 mr-2">
                <Link
                  // href="/docs"
                  href="https://docs.geval.io"
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
                >
                  Docs
                </Link>
                <Link
                  href="https://twitter.com/geval_labs"
                  target="_blank"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com/company/geval-labs"
                  target="_blank"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>

              <Link
                href={`https://github.com/${GITHUB_REPO}`}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary/30 transition-all"
              >
                <Github className="w-4 h-4" />
                <span className="text-border">|</span>
                <Star className="w-3.5 h-3.5" />
                <NavStarCount />
              </Link>

              <Link
                href="#waitlist"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-all"
              >
                <span>Get Early Access</span>
              </Link>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="max-w-xl">
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium bg-primary/10 border border-primary/20 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                <span className="text-primary">Open Source · Coming Q2 2026</span>
              </motion.div> */}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] mb-6"
              >
                Evals are not reports.
                <br />
                <span className="text-glow gradient-text">They are release contracts.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                The open-source release enforcement engine that turns your eval results 
                into deterministic go/no-go decisions. Block unverified AI changes before they reach production.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link
                  href="#waitlist"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  Get Early Access
                </Link>
                {/* <GitHubStars /> */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  GitHub Actions
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  GitLab CI
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Any CI/CD
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TerminalDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Evals exist. Enforcement doesn&apos;t.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: Eye, 
                title: "Dashboards don't block PRs",
                description: "Metrics are measured, then ignored. There's no enforcement between eval results and merge buttons."
              },
              { 
                icon: AlertCircle, 
                title: "Regressions ship silently",
                description: "Without automated gates, AI quality can degrade with every deployment. No one notices until production."
              },
              { 
                icon: XCircle, 
                title: "No audit trail",
                description: "When compliance asks 'why did this ship?', teams dig through Slack and hope someone remembers."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="relative p-6 rounded-2xl border border-red-500/10 bg-gradient-to-b from-red-500/5 to-transparent group cursor-default hover:border-red-500/20 transition-colors"
              >
                <item.icon className="w-6 h-6 text-red-400 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Interactive */}
      <section className="py-24 px-4 sm:px-6 border-t border-border/50 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
              The Solution
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              A gate, not a graph.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Geval consumes your existing eval results and applies explicit contracts. Every PR is deterministically allowed, blocked, or flagged for review.
            </p>
          </div>

          <InteractiveSolutionSection />
        </div>
      </section>

      {/* Features Section - Flip Cards */}
      <section className="py-24 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Built for enforcement, not observation.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FlipCard key={i} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 sm:px-6 border-t border-border/50 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
              Why Geval
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Authority, not insight.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-border bg-card/50">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">Eval Tools</h3>
              <ul className="space-y-4">
                {[
                  "Dashboards & metrics",
                  "Score tracking",
                  "Manual review",
                  "Post-hoc analysis"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">Geval</h3>
              <ul className="space-y-4 relative">
                {[
                  "PR blocking",
                  "CI/CD authority",
                  "Release contracts",
                  "Audit-grade history"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "100%", label: "Open Source" },
              { value: "0", label: "Vendor Lock-in" },
              { value: "<1s", label: "Decision Time" },
              { value: "MIT", label: "License" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2 gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="waitlist" className="py-24 px-4 sm:px-6 border-t border-border/50 scroll-mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Be first to know
            </span>

            <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-4">
              Join the waitlist
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              Get early access when we launch. We're building in public and would love your feedback.
            </p>

            <div className="max-w-md mx-auto mb-8">
              <WaitlistForm size="large" />
            </div>

            <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
              <GitHubStars variant="minimal" />
              <span className="text-muted-foreground">·</span>
              <Link 
                href="https://twitter.com/geval_labs" 
                target="_blank"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Follow on Twitter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                <Image 
                  src="/white_bg_greenlogo.svg" 
                  alt="Geval Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-semibold gradient-text text-glow">Geval</span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 Geval. Open source under MIT License.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link 
                href="/docs"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </Link>
              <Link 
                href={`https://github.com/${GITHUB_REPO}`}
                target="_blank"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </Link>
              <Link 
                href="https://twitter.com/geval_labs"
                target="_blank"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </Link>
              <Link 
                href="https://linkedin.com/company/geval-labs"
                target="_blank"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
