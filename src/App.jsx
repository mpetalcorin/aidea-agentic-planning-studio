import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  ExternalLink,
  FlaskConical,
  GitBranch,
  Globe2,
  Layers,
  Lightbulb,
  LineChart,
  Moon,
  Network,
  PlayCircle,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Save,
  Download,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

const portfolioData = [
  { name: "Q1", revenue: 42, research: 31, operations: 26, cash: 38 },
  { name: "Q2", revenue: 55, research: 38, operations: 32, cash: 45 },
  { name: "Q3", revenue: 68, research: 46, operations: 39, cash: 59 },
  { name: "Q4", revenue: 84, research: 54, operations: 47, cash: 71 },
  { name: "Q5", revenue: 96, research: 66, operations: 58, cash: 78 },
  { name: "Q6", revenue: 118, research: 79, operations: 69, cash: 93 },
];

const scenarioData = [
  { name: "Base", value: 62 },
  { name: "Optimistic", value: 86 },
  { name: "Cost Shock", value: 44 },
  { name: "Grant Win", value: 91 },
  { name: "Hiring Delay", value: 53 },
];

const riskData = [
  { name: "Funding", value: 72 },
  { name: "Talent", value: 58 },
  { name: "Delivery", value: 64 },
  { name: "Data", value: 49 },
  { name: "Market", value: 77 },
];

const portfolioMap = [
  { name: "GenAI Document Studio", impact: 92, feasibility: 83, budget: 78 },
  { name: "MitoGatekeeper", impact: 88, feasibility: 72, budget: 62 },
  { name: "ALT Vulnerability Map", impact: 84, feasibility: 78, budget: 55 },
  { name: "Dynamic Protein Explorer", impact: 79, feasibility: 69, budget: 47 },
  { name: "SeedState Platform", impact: 86, feasibility: 81, budget: 52 },
  { name: "RepairMet Explorer", impact: 90, feasibility: 66, budget: 70 },
];

const moduleScores = [
  { name: "Finance", score: 88 },
  { name: "Science", score: 94 },
  { name: "Product", score: 81 },
  { name: "Operations", score: 76 },
  { name: "Governance", score: 91 },
];

const agents = [
  {
    icon: Bot,
    title: "Modeler Agent",
    subtitle: "Turn intent into a working plan",
    body:
      "Builds planning structures from natural language, including assumptions, dimensions, workflows, and decision logic.",
    tags: ["Model building", "Workflows", "Assumptions"],
  },
  {
    icon: BarChart3,
    title: "Analyst Agent",
    subtitle: "Explain drivers and anomalies",
    body:
      "Scans KPIs, milestones, budgets, and portfolio data to identify what changed, why it matters, and what to do next.",
    tags: ["KPI analysis", "Reports", "Anomalies"],
  },
  {
    icon: LineChart,
    title: "Planner Agent",
    subtitle: "Simulate possible futures",
    body:
      "Tests funding cuts, delayed hiring, higher costs, failed experiments, new customers, and market expansion cases.",
    tags: ["Forecasting", "Scenarios", "Recommendations"],
  },
  {
    icon: FlaskConical,
    title: "Scientific Strategy Agent",
    subtitle: "Plan research like a portfolio",
    body:
      "Prioritises research programmes using feasibility, biological rationale, cost, expected impact, and translational value.",
    tags: ["Biotech", "Grants", "Portfolio"],
  },
  {
    icon: ShieldCheck,
    title: "Governance Agent",
    subtitle: "Keep planning safe and auditable",
    body:
      "Tracks assumptions, confidence levels, data provenance, responsible AI controls, and approval gates.",
    tags: ["Audit", "Controls", "Trust"],
  },
  {
    icon: Rocket,
    title: "Launch Agent",
    subtitle: "Move from plan to execution",
    body:
      "Converts strategy into milestones, delivery sprints, launch sequences, and investor-ready operating plans.",
    tags: ["Execution", "Launch", "Roadmap"],
  },
];

const modules = [
  {
    id: "finance",
    icon: Wallet,
    title: "Financial Planning",
    description:
      "Budgets, runway, cash flow, revenue forecasts, grant budgets, pricing, hiring costs, and cost-control scenarios.",
  },
  {
    id: "science",
    icon: FlaskConical,
    title: "Scientific Portfolio",
    description:
      "Rank drug discovery, AI, bioinformatics, mitochondrial biology, cancer metabolism, and plant science projects.",
  },
  {
    id: "people",
    icon: Users,
    title: "People Capacity",
    description:
      "Model headcount, skills gaps, hiring delays, contractor needs, delivery load, and team bottlenecks.",
  },
  {
    id: "product",
    icon: Rocket,
    title: "Product Strategy",
    description:
      "Plan SaaS apps, customer segments, product launches, pricing, investor milestones, and growth experiments.",
  },
  {
    id: "risk",
    icon: Radar,
    title: "Risk Intelligence",
    description:
      "Identify funding, delivery, data, technical, governance, market, and adoption risks before they become problems.",
  },
  {
    id: "ecosystem",
    icon: Globe2,
    title: "aAidea Ecosystem",
    description:
      "Connect existing aAidea apps into one strategic layer for planning, prioritisation, reporting, and decisions.",
  },
];

const decisionMatrix = [
  ["GenAI Document Intelligence", "High", "High", "Scale now"],
  ["MitoGatekeeper Systems", "High", "Medium", "Validate with case studies"],
  ["ALT Vulnerability Map", "High", "High", "Package as oncology demo"],
  ["Dynamic Protein Explorer", "Medium", "Medium", "Add dataset upload"],
  ["SeedState Platform", "High", "High", "Use for grants and ARIA-style proposals"],
];

const apps = [
  {
    title: "aAidea",
    href: "https://a-aidea.com",
    description: "Main company website for AI, scientific software, and innovation services.",
  },
  {
    title: "GenAI Document Intelligence Studio",
    href: "https://aidea-genai-document-intelligence-s.vercel.app/",
    description: "Document intelligence and AI reporting platform.",
  },
  {
    title: "MitoGatekeeper Systems Studio",
    href: "https://mitogatekeeper-systems-studio.vercel.app",
    description: "Systems biology interface for mitochondrial energy regulation.",
  },
  {
    title: "ALT Vulnerability Map",
    href: "https://alt-vulnmap.vercel.app/",
    description: "Cancer ALT vulnerability exploration platform.",
  },
  {
    title: "Dynamic Protein Systems Explorer",
    href: "https://dynamic-protein-systems-explorer.vercel.app/",
    description: "Protein motion, structural state, and cryo-EM interpretation studio.",
  },
];

const integrations = [
  { name: "ChatGPT", href: "https://chatgpt.com" },
  { name: "Claude", href: "https://claude.ai" },
  { name: "Mistral", href: "https://mistral.ai" },
  { name: "Excel", href: "https://www.microsoft.com/en-gb/microsoft-365/excel" },
  { name: "Google Sheets", href: "https://www.google.com/sheets/about/" },
  { name: "Notion", href: "https://www.notion.so" },
  { name: "GitHub", href: "https://github.com/mpetalcorin" },
  { name: "Vercel", href: "https://vercel.com" },
  { name: "Airtable", href: "https://www.airtable.com" },
  { name: "Salesforce", href: "https://www.salesforce.com" },
  { name: "HubSpot", href: "https://www.hubspot.com" },
  { name: "BigQuery", href: "https://cloud.google.com/bigquery" },
  { name: "Azure SQL", href: "https://azure.microsoft.com/en-gb/products/azure-sql/database" },
  { name: "AWS S3", href: "https://aws.amazon.com/s3/" },
  { name: "PostgreSQL", href: "https://www.postgresql.org" },
  { name: "Streamlit", href: "https://streamlit.io" },
];

const defaultProjects = [
  {
    name: "GenAI Document Intelligence Studio",
    category: "AI product",
    impact: 92,
    feasibility: 83,
    budget: 78,
    stage: "Scale",
  },
  {
    name: "MitoGatekeeper Systems Studio",
    category: "Mitochondrial systems biology",
    impact: 88,
    feasibility: 72,
    budget: 62,
    stage: "Validate",
  },
  {
    name: "ALT Vulnerability Map",
    category: "Cancer biology",
    impact: 84,
    feasibility: 78,
    budget: 55,
    stage: "Package",
  },
];


function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ children, className = "", lightMode }) {
  return (
    <div
      className={cx(
        "rounded-3xl border p-6 shadow-2xl backdrop-blur",
        lightMode
          ? "border-slate-200 bg-white/80 shadow-slate-200/80"
          : "border-white/10 bg-slate-950/70 shadow-black/30",
        className
      )}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, text, lightMode }) {
  return (
    <div className="mb-12 max-w-4xl">
      <p className={cx("text-sm font-black uppercase tracking-[0.3em]", lightMode ? "text-cyan-700" : "text-cyan-200")}>
        {eyebrow}
      </p>
      <h2 className={cx("mt-4 text-4xl font-black tracking-tight md:text-5xl", lightMode ? "text-slate-950" : "text-white")}>
        {title}
      </h2>
      <p className={cx("mt-5 text-lg leading-8", lightMode ? "text-slate-700" : "text-slate-300")}>{text}</p>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, change, lightMode }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className={cx(
        "rounded-3xl border p-5 shadow-2xl",
        lightMode
          ? "border-slate-200 bg-white text-slate-950 shadow-slate-200"
          : "border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/50 text-white shadow-black/30"
      )}
    >
      <div className="flex items-center justify-between">
        <div className={cx("rounded-2xl p-3", lightMode ? "bg-cyan-50" : "bg-white/10")}>
          <Icon className={cx("h-6 w-6", lightMode ? "text-cyan-700" : "text-cyan-200")} />
        </div>
        <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", lightMode ? "bg-emerald-50 text-emerald-700" : "bg-emerald-400/15 text-emerald-200")}>
          {change}
        </span>
      </div>
      <p className={cx("mt-6 text-sm", lightMode ? "text-slate-600" : "text-slate-300")}>{label}</p>
      <h3 className="mt-2 text-3xl font-black">{value}</h3>
    </motion.div>
  );
}

function AgentCard({ agent, index, lightMode }) {
  const Icon = agent.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className={cx(
        "group relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur",
        lightMode
          ? "border-slate-200 bg-white shadow-slate-200"
          : "border-cyan-300/20 bg-slate-950/70 shadow-cyan-950/30"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition group-hover:opacity-100" />
      <div className="relative">
        <div className={cx("mb-5 inline-flex rounded-2xl p-4 ring-1", lightMode ? "bg-cyan-50 ring-cyan-100" : "bg-cyan-300/10 ring-cyan-300/20")}>
          <Icon className={cx("h-8 w-8", lightMode ? "text-cyan-700" : "text-cyan-200")} />
        </div>
        <h3 className={cx("text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>{agent.title}</h3>
        <p className={cx("mt-1 text-sm font-semibold", lightMode ? "text-cyan-700" : "text-cyan-200")}>{agent.subtitle}</p>
        <p className={cx("mt-4 text-sm leading-6", lightMode ? "text-slate-600" : "text-slate-300")}>{agent.body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {agent.tags.map((tag) => (
            <span
              key={tag}
              className={cx(
                "rounded-full border px-3 py-1 text-xs",
                lightMode ? "border-slate-200 bg-slate-50 text-slate-700" : "border-white/10 bg-white/5 text-slate-300"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ScenarioSimulator({ lightMode }) {
  const [funding, setFunding] = useState(70);
  const [team, setTeam] = useState(55);
  const [risk, setRisk] = useState(35);
  const [market, setMarket] = useState(65);

  const score = useMemo(() => {
    return Math.round(funding * 0.3 + team * 0.25 + (100 - risk) * 0.25 + market * 0.2);
  }, [funding, team, risk, market]);

  const recommendation =
    score >= 75
      ? "Accelerate investment, expand delivery capacity, and prepare a scale-up roadmap."
      : score >= 55
      ? "Proceed with controlled investment, reduce execution risk, and validate assumptions."
      : "Pause major expansion, protect cash, simplify the plan, and focus on critical evidence.";

  return (
    <section id="simulator" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <Card lightMode={lightMode}>
          <div className="mb-6 flex items-center gap-3">
            <div className={cx("rounded-2xl p-3", lightMode ? "bg-fuchsia-50" : "bg-fuchsia-400/10")}>
              <Workflow className={cx("h-7 w-7", lightMode ? "text-fuchsia-700" : "text-fuchsia-200")} />
            </div>
            <div>
              <p className={cx("text-sm font-bold uppercase tracking-[0.25em]", lightMode ? "text-fuchsia-700" : "text-fuchsia-200")}>
                Live scenario engine
              </p>
              <h2 className={cx("text-3xl font-black", lightMode ? "text-slate-950" : "text-white")}>Test a strategic plan in seconds</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              ["Funding confidence", funding, setFunding],
              ["Team capacity", team, setTeam],
              ["Execution risk", risk, setRisk],
              ["Market opportunity", market, setMarket],
            ].map(([label, value, setter]) => (
              <div key={label} className={cx("rounded-2xl border p-5", lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.03]")}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={cx("text-sm font-semibold", lightMode ? "text-slate-700" : "text-slate-200")}>{label}</span>
                  <span className={cx("text-sm font-black", lightMode ? "text-cyan-700" : "text-cyan-200")}>{value}%</span>
                </div>
                <input type="range" min="0" max="100" value={value} onChange={(e) => setter(Number(e.target.value))} className="w-full accent-cyan-400" />
              </div>
            ))}
          </div>
        </Card>

        <motion.div
          key={score}
          initial={{ scale: 0.95, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cx(
            "rounded-3xl border p-7 shadow-2xl",
            lightMode
              ? "border-cyan-100 bg-gradient-to-br from-white via-cyan-50 to-fuchsia-50 shadow-slate-200"
              : "border-cyan-300/20 bg-gradient-to-br from-cyan-950/80 via-slate-950 to-fuchsia-950/70 shadow-cyan-950/40"
          )}
        >
          <p className={cx("text-sm font-bold uppercase tracking-[0.25em]", lightMode ? "text-cyan-700" : "text-cyan-200")}>
            Agent recommendation
          </p>
          <div className="mt-6 flex items-end gap-4">
            <span className={cx("text-7xl font-black", lightMode ? "text-slate-950" : "text-white")}>{score}</span>
            <span className={cx("pb-3 text-lg font-bold", lightMode ? "text-slate-600" : "text-slate-300")}>/ 100</span>
          </div>

          <div className={cx("mt-6 h-3 overflow-hidden rounded-full", lightMode ? "bg-slate-200" : "bg-white/10")}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
          </div>

          <p className={cx("mt-7 text-lg leading-8", lightMode ? "text-slate-800" : "text-slate-100")}>{recommendation}</p>

          <div className={cx("mt-8 rounded-2xl border p-5", lightMode ? "border-slate-200 bg-white/70" : "border-white/10 bg-white/5")}>
            <p className={cx("text-sm font-semibold", lightMode ? "text-slate-700" : "text-slate-300")}>
              This score combines capital readiness, people capacity, operational risk, and market opportunity into one decision-support signal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AgentConsole({ lightMode }) {
  const [query, setQuery] = useState("Which aAidea project should be scaled first?");
  const answer = useMemo(() => {
    const q = query.toLowerCase();
    if (q.includes("grant") || q.includes("funding")) {
      return "Recommended focus: SeedState Platform and GenAI Document Intelligence Studio. They combine clear impact, fundability, and strong demonstration value for grant-style narratives.";
    }
    if (q.includes("cancer") || q.includes("oncology")) {
      return "Recommended focus: ALT Vulnerability Map, MitoGatekeeper Systems Studio, and RepairMet Explorer. Package them as a connected cancer systems biology and drug discovery portfolio.";
    }
    if (q.includes("scale") || q.includes("first")) {
      return "Recommended first scale-up: GenAI Document Intelligence Studio, because it has broad customer relevance, reusable document workflows, and a clear route to consulting, SaaS, and enterprise pilots.";
    }
    return "Recommended action: define the decision, rank options by impact, feasibility, time-to-value, and evidence strength, then run a scenario simulation before committing resources.";
  }, [query]);

  return (
    <section id="console" className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        lightMode={lightMode}
        eyebrow="Activated module"
        title="AI planning console"
        text="A front-end agent console that simulates how a planning assistant could reason over aAidea projects, budgets, priorities, and strategic decisions."
      />

      <Card lightMode={lightMode} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <label className={cx("text-sm font-black uppercase tracking-[0.2em]", lightMode ? "text-slate-600" : "text-slate-300")}>
            Ask the planning agent
          </label>
          <div className={cx("mt-4 flex items-center gap-3 rounded-2xl border px-4 py-3", lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/5")}>
            <Search className={cx("h-5 w-5", lightMode ? "text-slate-500" : "text-slate-400")} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cx("w-full bg-transparent text-sm outline-none", lightMode ? "text-slate-950 placeholder:text-slate-400" : "text-white placeholder:text-slate-500")}
              placeholder="Ask about funding, scaling, cancer, grants, hiring, or strategy..."
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Which project should scale first?",
              "What should I use for grant funding?",
              "What is the oncology strategy?",
              "How do I reduce delivery risk?",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setQuery(prompt)}
                className={cx("rounded-full border px-4 py-2 text-xs font-bold", lightMode ? "border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10")}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={answer}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={cx("rounded-3xl border p-6", lightMode ? "border-cyan-100 bg-cyan-50/80" : "border-cyan-300/20 bg-cyan-300/10")}
        >
          <div className="mb-4 flex items-center gap-3">
            <Sparkles className={cx("h-6 w-6", lightMode ? "text-cyan-700" : "text-cyan-200")} />
            <h3 className={cx("text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>Agent response</h3>
          </div>
          <p className={cx("text-lg leading-8", lightMode ? "text-slate-800" : "text-slate-100")}>{answer}</p>
        </motion.div>
      </Card>
    </section>
  );
}

function AdvancedModules({ lightMode }) {
  const [active, setActive] = useState("finance");
  const selected = modules.find((m) => m.id === active);

  return (
    <section id="modules" className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        lightMode={lightMode}
        eyebrow="Activated modules"
        title="A full planning operating system for aAidea"
        text="Each module is designed as a strategic control surface, helping convert scientific ideas, software products, budgets, and execution plans into measurable decisions."
      />

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = active === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActive(mod.id)}
                className={cx(
                  "flex items-center justify-between rounded-2xl border p-4 text-left transition",
                  isActive
                    ? "border-cyan-300 bg-cyan-400/15"
                    : lightMode
                    ? "border-slate-200 bg-white hover:bg-slate-50"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className={cx("h-5 w-5", isActive ? "text-cyan-500" : lightMode ? "text-slate-600" : "text-slate-300")} />
                  <span className={cx("font-black", lightMode ? "text-slate-950" : "text-white")}>{mod.title}</span>
                </span>
                <ChevronRight className={cx("h-5 w-5", lightMode ? "text-slate-400" : "text-slate-500")} />
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
          >
            <Card lightMode={lightMode} className="h-full">
              <div className="mb-5 flex items-center gap-4">
                <div className={cx("rounded-3xl p-5", lightMode ? "bg-cyan-50" : "bg-cyan-300/10")}>
                  <selected.icon className={cx("h-10 w-10", lightMode ? "text-cyan-700" : "text-cyan-200")} />
                </div>
                <div>
                  <p className={cx("text-sm font-black uppercase tracking-[0.2em]", lightMode ? "text-cyan-700" : "text-cyan-200")}>
                    Live workspace
                  </p>
                  <h3 className={cx("text-3xl font-black", lightMode ? "text-slate-950" : "text-white")}>{selected.title}</h3>
                </div>
              </div>
              <p className={cx("text-lg leading-8", lightMode ? "text-slate-700" : "text-slate-300")}>{selected.description}</p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {["Inputs", "Model", "Decision"].map((step, i) => (
                  <div key={step} className={cx("rounded-2xl border p-5", lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.03]")}>
                    <p className={cx("text-3xl font-black", lightMode ? "text-cyan-700" : "text-cyan-200")}>0{i + 1}</p>
                    <p className={cx("mt-3 font-black", lightMode ? "text-slate-950" : "text-white")}>{step}</p>
                    <p className={cx("mt-2 text-sm leading-6", lightMode ? "text-slate-600" : "text-slate-400")}>
                      {i === 0 && "Collect structured data, assumptions, constraints, and evidence."}
                      {i === 1 && "Run scenario logic, prioritisation rules, and confidence scoring."}
                      {i === 2 && "Generate a recommended action, risk note, and executive summary."}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function DecisionMatrix({ lightMode }) {
  return (
    <section id="matrix" className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        lightMode={lightMode}
        eyebrow="Activated module"
        title="Decision matrix and portfolio prioritisation"
        text="Rank aAidea products by strategic value, feasibility, and next action so the portfolio becomes easier to fund, explain, and execute."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card lightMode={lightMode} className="overflow-hidden p-0">
          <div className={cx("grid grid-cols-4 gap-0 border-b p-4 text-sm font-black", lightMode ? "border-slate-200 bg-slate-50 text-slate-700" : "border-white/10 bg-white/5 text-slate-200")}>
            <div>Project</div>
            <div>Impact</div>
            <div>Feasibility</div>
            <div>Next action</div>
          </div>
          {decisionMatrix.map((row) => (
            <div key={row[0]} className={cx("grid grid-cols-4 gap-0 border-b p-4 text-sm last:border-b-0", lightMode ? "border-slate-100 text-slate-700" : "border-white/10 text-slate-300")}>
              {row.map((cell, i) => (
                <div key={cell} className={i === 0 ? "font-black" : ""}>{cell}</div>
              ))}
            </div>
          ))}
        </Card>

        <Card lightMode={lightMode}>
          <h3 className={cx("mb-4 text-2xl font-black", lightMode ? "text-slate-950" : "text-white")}>Portfolio map</h3>
          <div className="h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke={lightMode ? "#e2e8f0" : "#1e293b"} />
                <XAxis dataKey="feasibility" name="Feasibility" stroke={lightMode ? "#475569" : "#94a3b8"} />
                <YAxis dataKey="impact" name="Impact" stroke={lightMode ? "#475569" : "#94a3b8"} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    background: lightMode ? "#ffffff" : "#020617",
                    border: "1px solid rgba(148,163,184,0.35)",
                    borderRadius: "16px",
                    color: lightMode ? "#020617" : "#fff",
                  }}
                />
                <Scatter data={portfolioMap} fill="#06b6d4" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}

function VisualAnalytics({ lightMode }) {
  const chartText = lightMode ? "#475569" : "#94a3b8";
  const grid = lightMode ? "#e2e8f0" : "#1e293b";

  return (
    <section id="analytics" className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        lightMode={lightMode}
        eyebrow="Advanced visuals"
        title="Executive-grade planning analytics"
        text="The upgraded dashboard includes portfolio growth, scenario impact, risk signals, module health, and planning confidence views."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card lightMode={lightMode}>
          <h3 className={cx("mb-4 text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>Growth and research capacity</h3>
          <div className="h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="res" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} />
                <XAxis dataKey="name" stroke={chartText} />
                <YAxis stroke={chartText} />
                <Tooltip
                  contentStyle={{
                    background: lightMode ? "#ffffff" : "#020617",
                    border: "1px solid rgba(148,163,184,0.35)",
                    borderRadius: "16px",
                    color: lightMode ? "#020617" : "#fff",
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#06b6d4" fill="url(#rev)" strokeWidth={3} />
                <Area type="monotone" dataKey="research" stroke="#d946ef" fill="url(#res)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card lightMode={lightMode}>
          <h3 className={cx("mb-4 text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>Scenario impact</h3>
          <div className="h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} />
                <XAxis dataKey="name" stroke={chartText} />
                <YAxis stroke={chartText} />
                <Tooltip
                  contentStyle={{
                    background: lightMode ? "#ffffff" : "#020617",
                    border: "1px solid rgba(148,163,184,0.35)",
                    borderRadius: "16px",
                    color: lightMode ? "#020617" : "#fff",
                  }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {scenarioData.map((entry, index) => (
                    <Cell key={entry.name} fill={["#06b6d4", "#22c55e", "#fb7185", "#d946ef", "#8b5cf6"][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card lightMode={lightMode}>
          <h3 className={cx("mb-4 text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>Risk intelligence</h3>
          <div className="h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReLineChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke={grid} />
                <XAxis dataKey="name" stroke={chartText} />
                <YAxis stroke={chartText} />
                <Tooltip
                  contentStyle={{
                    background: lightMode ? "#ffffff" : "#020617",
                    border: "1px solid rgba(148,163,184,0.35)",
                    borderRadius: "16px",
                    color: lightMode ? "#020617" : "#fff",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={4} dot={{ r: 6 }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card lightMode={lightMode}>
          <h3 className={cx("mb-4 text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>Module readiness</h3>
          <div className="h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={moduleScores} dataKey="score" nameKey="name" outerRadius={110} innerRadius={58} paddingAngle={4}>
                  {moduleScores.map((entry, index) => (
                    <Cell key={entry.name} fill={["#06b6d4", "#d946ef", "#22c55e", "#f59e0b", "#8b5cf6"][index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: lightMode ? "#ffffff" : "#020617",
                    border: "1px solid rgba(148,163,184,0.35)",
                    borderRadius: "16px",
                    color: lightMode ? "#020617" : "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
}


function DataWorkspace({ lightMode }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("aidea-planning-projects");
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  const [form, setForm] = useState({
    name: "",
    category: "AI product",
    impact: 75,
    feasibility: 70,
    budget: 50,
    stage: "Explore",
  });

  const scoredProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      readiness: Math.round(
        project.impact * 0.4 +
          project.feasibility * 0.35 +
          (100 - project.budget) * 0.15 +
          (project.stage === "Scale" ? 10 : project.stage === "Validate" ? 6 : 3)
      ),
    }));
  }, [projects]);

  const topProject = scoredProjects.slice().sort((a, b) => b.readiness - a.readiness)[0];

  function saveProjects() {
    localStorage.setItem("aidea-planning-projects", JSON.stringify(projects));
  }

  function resetProjects() {
    setProjects(defaultProjects);
    localStorage.setItem("aidea-planning-projects", JSON.stringify(defaultProjects));
  }

  function addProject(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    setProjects((prev) => [
      ...prev,
      {
        ...form,
        impact: Number(form.impact),
        feasibility: Number(form.feasibility),
        budget: Number(form.budget),
      },
    ]);

    setForm({
      name: "",
      category: "AI product",
      impact: 75,
      feasibility: 70,
      budget: 50,
      stage: "Explore",
    });
  }

  function exportJSON() {
    const payload = {
      exportedAt: new Date().toISOString(),
      platform: "aAidea Agentic Planning Studio",
      projects: scoredProjects,
      recommendedTopProject: topProject,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aidea-planning-portfolio.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section id="workspace" className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        lightMode={lightMode}
        eyebrow="Activated data layer"
        title="Editable planning workspace"
        text="Add real aAidea projects, score them by impact and feasibility, save them locally, and export the planning dataset as JSON."
      />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card lightMode={lightMode}>
          <h3 className={cx("text-2xl font-black", lightMode ? "text-slate-950" : "text-white")}>
            Add a new project
          </h3>

          <form onSubmit={addProject} className="mt-6 grid gap-4">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Project name"
              className={cx(
                "rounded-2xl border px-4 py-3 text-sm outline-none",
                lightMode
                  ? "border-slate-200 bg-white text-slate-950"
                  : "border-white/10 bg-white/5 text-white"
              )}
            />

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={cx(
                "rounded-2xl border px-4 py-3 text-sm outline-none",
                lightMode
                  ? "border-slate-200 bg-white text-slate-950"
                  : "border-white/10 bg-slate-950 text-white"
              )}
            >
              <option>AI product</option>
              <option>Drug discovery</option>
              <option>Cancer biology</option>
              <option>Mitochondrial systems biology</option>
              <option>Seed biology</option>
              <option>Enterprise planning</option>
              <option>Scientific publishing</option>
            </select>

            {[
              ["Impact", "impact"],
              ["Feasibility", "feasibility"],
              ["Budget intensity", "budget"],
            ].map(([label, key]) => (
              <div key={key}>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{label}</span>
                  <span className="text-cyan-500">{form[key]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                />
              </div>
            ))}

            <select
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
              className={cx(
                "rounded-2xl border px-4 py-3 text-sm outline-none",
                lightMode
                  ? "border-slate-200 bg-white text-slate-950"
                  : "border-white/10 bg-slate-950 text-white"
              )}
            >
              <option>Explore</option>
              <option>Validate</option>
              <option>Package</option>
              <option>Scale</option>
            </select>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-6 py-3 text-sm font-black text-slate-950"
            >
              <PlayCircle className="h-4 w-4" />
              Add project
            </button>
          </form>
        </Card>

        <Card lightMode={lightMode}>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className={cx("text-2xl font-black", lightMode ? "text-slate-950" : "text-white")}>
                Live project scores
              </h3>
              <p className={cx("mt-2 text-sm", lightMode ? "text-slate-600" : "text-slate-400")}>
                Top recommendation: {topProject?.name || "No projects yet"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={saveProjects}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold",
                  lightMode
                    ? "border-slate-200 bg-white text-slate-700"
                    : "border-white/10 bg-white/5 text-slate-200"
                )}
              >
                <Save className="h-4 w-4" />
                Save
              </button>

              <button
                onClick={exportJSON}
                className={cx(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold",
                  lightMode
                    ? "border-slate-200 bg-white text-slate-700"
                    : "border-white/10 bg-white/5 text-slate-200"
                )}
              >
                <Download className="h-4 w-4" />
                Export JSON
              </button>

              <button
                onClick={resetProjects}
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-bold text-white"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {scoredProjects
              .slice()
              .sort((a, b) => b.readiness - a.readiness)
              .map((project) => (
                <motion.div
                  layout
                  key={project.name}
                  className={cx(
                    "rounded-2xl border p-4",
                    lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.03]"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className={cx("font-black", lightMode ? "text-slate-950" : "text-white")}>
                        {project.name}
                      </p>
                      <p className={cx("mt-1 text-xs", lightMode ? "text-slate-600" : "text-slate-400")}>
                        {project.category} · {project.stage}
                      </p>
                    </div>

                    <span className="rounded-full bg-cyan-400 px-3 py-1 text-sm font-black text-slate-950">
                      {project.readiness}
                    </span>
                  </div>

                  <div className={cx("mt-4 h-2 overflow-hidden rounded-full", lightMode ? "bg-slate-200" : "bg-white/10")}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.readiness}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </Card>
      </div>
    </section>
  );
}


function App() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <main
      className={cx(
        "min-h-screen overflow-hidden transition-colors duration-500",
        lightMode ? "bg-slate-50 text-slate-950" : "bg-slate-950 text-white"
      )}
    >
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className={cx("absolute left-[-10%] top-[-10%] h-96 w-96 rounded-full blur-3xl", lightMode ? "bg-cyan-200/50" : "bg-cyan-500/20")} />
        <div className={cx("absolute right-[-10%] top-[20%] h-96 w-96 rounded-full blur-3xl", lightMode ? "bg-fuchsia-200/50" : "bg-fuchsia-500/20")} />
        <div className={cx("absolute bottom-[-20%] left-[30%] h-[30rem] w-[30rem] rounded-full blur-3xl", lightMode ? "bg-emerald-200/40" : "bg-emerald-500/10")} />
      </div>

      <header className={cx("sticky top-0 z-50 border-b backdrop-blur-xl", lightMode ? "border-slate-200 bg-white/80" : "border-white/10 bg-slate-950/80")}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-fuchsia-300 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <p className={cx("text-lg font-black tracking-tight", lightMode ? "text-slate-950" : "text-white")}>aAidea</p>
              <p className={cx("text-xs", lightMode ? "text-slate-500" : "text-slate-400")}>Agentic Planning Studio</p>
            </div>
          </a>

          <div className={cx("hidden items-center gap-5 text-sm font-semibold md:flex", lightMode ? "text-slate-700" : "text-slate-300")}>
            <a href="#modules" className="hover:text-cyan-500">Modules</a>
            <a href="#workspace" className="hover:text-cyan-500">Workspace</a>
            <a href="#console" className="hover:text-cyan-500">Console</a>
            <a href="#simulator" className="hover:text-cyan-500">Simulator</a>
            <a href="#analytics" className="hover:text-cyan-500">Analytics</a>
            <a href="#matrix" className="hover:text-cyan-500">Matrix</a>
            <a href="#ecosystem" className="hover:text-cyan-500">Ecosystem</a>
          </div>

          <button
            onClick={() => setLightMode((v) => !v)}
            className={cx(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition",
              lightMode ? "border-slate-200 bg-slate-950 text-white" : "border-white/10 bg-white text-slate-950"
            )}
          >
            {lightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {lightMode ? "Dark mode" : "Light mode"}
          </button>
        </nav>
      </header>

      <section id="home" className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className={cx(
              "mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold",
              lightMode ? "border-cyan-200 bg-cyan-50 text-cyan-800" : "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
            )}
          >
            <Sparkles className="h-4 w-4" />
            Agentic AI for scientific, startup, and enterprise planning
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className={cx("max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl", lightMode ? "text-slate-950" : "text-white")}
          >
            Run research, strategy, and business planning at the speed of change.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className={cx("mt-7 max-w-3xl text-lg leading-8", lightMode ? "text-slate-700" : "text-slate-300")}
          >
            aAidea Agentic Planning Studio is a decision-support command centre for AI agents, live planning models,
            research portfolio analytics, scenario simulation, and executive reporting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#console" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 px-6 py-3 text-sm font-black text-slate-950 shadow-xl shadow-cyan-950/20 transition hover:scale-105">
              Open AI console
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#modules" className={cx("inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition", lightMode ? "border-slate-200 bg-white text-slate-950 hover:bg-slate-50" : "border-white/15 bg-white/5 text-white hover:bg-white/10")}>
              View activated modules
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card lightMode={lightMode} className="relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative mb-6 flex items-center justify-between">
              <div>
                <p className={cx("text-sm font-bold", lightMode ? "text-cyan-700" : "text-cyan-200")}>Executive command centre</p>
                <h2 className={cx("text-2xl font-black", lightMode ? "text-slate-950" : "text-white")}>Live planning intelligence</h2>
              </div>
              <Activity className="h-7 w-7 text-emerald-400" />
            </div>

            <div className="grid gap-4">
              {[
                ["AI agent readiness", 94, Bot],
                ["Portfolio confidence", 86, Target],
                ["Execution capacity", 78, Zap],
                ["Governance strength", 91, ShieldCheck],
              ].map(([label, value, Icon]) => (
                <div key={label} className={cx("rounded-2xl border p-4", lightMode ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.03]")}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <Icon className="h-4 w-4 text-cyan-400" />
                      {label}
                    </span>
                    <span className="text-sm font-black text-cyan-400">{value}%</span>
                  </div>
                  <div className={cx("h-2 rounded-full", lightMode ? "bg-slate-200" : "bg-white/10")}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 0.2 }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-4">
        <MetricCard lightMode={lightMode} icon={Target} label="Portfolio readiness" value="86%" change="+14%" />
        <MetricCard lightMode={lightMode} icon={Zap} label="Scenario speed" value="12x" change="+240%" />
        <MetricCard lightMode={lightMode} icon={ShieldCheck} label="Governance score" value="94%" change="+9%" />
        <MetricCard lightMode={lightMode} icon={Rocket} label="Launch confidence" value="78%" change="+18%" />
      </section>

      <AdvancedModules lightMode={lightMode} />
      <DataWorkspace lightMode={lightMode} />
      <AgentConsole lightMode={lightMode} />

      <section id="agents" className="mx-auto max-w-7xl px-6 py-24">
        <SectionTitle
          lightMode={lightMode}
          eyebrow="Agents that plan with you"
          title="Embedded AI agents for real planning decisions"
          text="These agents connect assumptions, data, workflows, models, and decisions so teams can move from uncertainty to action."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <AgentCard key={agent.title} agent={agent} index={index} lightMode={lightMode} />
          ))}
        </div>
      </section>

      <ScenarioSimulator lightMode={lightMode} />
      <VisualAnalytics lightMode={lightMode} />
      <DecisionMatrix lightMode={lightMode} />

      <section id="ecosystem" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          lightMode={lightMode}
          eyebrow="aAidea ecosystem"
          title="Connected scientific AI products"
          text="The planning studio becomes the strategic layer above existing aAidea apps, helping decide what to build, fund, improve, publish, or commercialise next."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <motion.a
              whileHover={{ y: -6 }}
              key={app.title}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className={cx(
                "rounded-3xl border p-6 transition",
                lightMode ? "border-slate-200 bg-white hover:border-cyan-300" : "border-white/10 bg-slate-950/80 hover:border-cyan-300/40"
              )}
            >
              <div className="mb-5 flex items-center justify-between">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <ExternalLink className={cx("h-5 w-5", lightMode ? "text-slate-400" : "text-slate-500")} />
              </div>
              <h3 className={cx("text-xl font-black", lightMode ? "text-slate-950" : "text-white")}>{app.title}</h3>
              <p className={cx("mt-3 text-sm leading-6", lightMode ? "text-slate-600" : "text-slate-300")}>{app.description}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="integrations" className="mx-auto max-w-7xl px-6 py-20">
        <Card lightMode={lightMode} className="overflow-hidden">
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className={cx("text-sm font-black uppercase tracking-[0.3em]", lightMode ? "text-cyan-700" : "text-cyan-200")}>Integrate anything</p>
              <h2 className={cx("mt-4 text-4xl font-black", lightMode ? "text-slate-950" : "text-white")}>Connect AI, data, and planning logic</h2>
            </div>
            <Network className="h-12 w-12 text-cyan-400" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {integrations.map((item) => (
              <motion.a
                whileHover={{ y: -4, scale: 1.04 }}
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                title={`Open ${item.name}`}
                className={cx(
                  "group flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-center text-sm font-bold transition",
                  lightMode
                    ? "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
                    : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
                )}
              >
                <span>{item.name}</span>
                <ExternalLink
                  className={cx(
                    "h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100",
                    lightMode ? "text-cyan-700" : "text-cyan-200"
                  )}
                />
              </motion.a>
            ))}
          </div>
        </Card>
      </section>

      <footer className={cx("border-t px-6 py-12", lightMode ? "border-slate-200" : "border-white/10")}>
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className={cx("text-lg font-black", lightMode ? "text-slate-950" : "text-white")}>aAidea Agentic Planning Studio</p>
            <p className={cx("mt-2 text-sm", lightMode ? "text-slate-600" : "text-slate-400")}>
              AI-assisted planning, strategy, scientific portfolios, and business modelling.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="https://a-aidea.com" target="_blank" rel="noreferrer" className={cx("rounded-full border px-4 py-2 text-sm font-bold", lightMode ? "border-slate-200 bg-white text-slate-700" : "border-white/10 bg-white/5 text-slate-200")}>
              aAidea website
            </a>
            <a href="https://github.com/mpetalcorin" target="_blank" rel="noreferrer" className={cx("rounded-full border px-4 py-2 text-sm font-bold", lightMode ? "border-slate-200 bg-white text-slate-700" : "border-white/10 bg-white/5 text-slate-200")}>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
