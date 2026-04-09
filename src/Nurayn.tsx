import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
// OR if not using alias:
import logo from "./assets/NURAYN.png";

export default function Nurayn() {
  const [success, setSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    website: "",
  });
  const validate = () => {
    if (!formData.name || !formData.email) {
      return "Name and email are required";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return "Invalid email";
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      return "Invalid phone number";
    }

    return "";
  };
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isSending) return;

    if (formData.website) return; // honeypot

    if (!captchaValue) {
      setError("Please verify you are not a robot");
      return;
    }

    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setSuccess(true);
        setError(""); // ✅ add this
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          website: "",
        });
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };
  const features = [
    {
      title: "HR Core",
      text: "Manage employee records, contracts, onboarding, documents, and organizational structure from one clean system.",
      stat: "Single source of truth",
    },
    {
      title: "Attendance",
      text: "Track shifts, working hours, leave, overtime, and daily workforce activity with better visibility.",
      stat: "Real-time control",
    },
    {
      title: "Payroll & WPS",
      text: "Run payroll with structured workflows, payslips, validations, and UAE-ready WPS processing.",
      stat: "Payroll made practical",
    },
    {
      title: "Approvals",
      text: "Handle requests, escalations, notifications, and approvals with flexible workflows that fit your business.",
      stat: "Faster decisions",
    },
    {
      title: "Reporting",
      text: "Get clear insights on headcount, payroll summaries, attendance trends, and workforce performance.",
      stat: "Decision-ready insights",
    },
    {
      title: "Integrations",
      text: "Connect HR with finance, operations, and external systems to build a more unified employee lifecycle.",
      stat: "Built to connect",
    },
  ];

  const modules = [
    "Employee Management",
    "Attendance",
    "Leave",
    "Payroll",
    "WPS",
    "Approvals",
    "Analytics",
  ];

  const valuePoints = [
    "0 manual entries",
    "Real-time posting to finance",
    "Audit-ready by design",
  ];

  const flowSteps = [
    { label: "Employee", desc: "HR Core" },
    { label: "Attendance", desc: "Time & Activity" },
    { label: "Payroll", desc: "Calculation & WPS" },
    { label: "Finance", desc: "GL & Cost Allocation" },
    { label: "Reporting", desc: "Insights & Control" },
  ];

  const whyItems = [
    "Premium interface with a clean modern layout",
    "Strong fit for UAE payroll and WPS needs",
    "Flexible enough for tailored business processes",
    "Scalable foundation for future integrations and growth",
  ];

  const erpIntegrations = [
    {
      name: "NetSuite",
      title: "Complete the HR gap in NetSuite",
      points: [
        "Add full HR, Payroll, Attendance, and WPS capabilities",
        "Post payroll results and employee-related costs into NetSuite finance",
        "Provide a stronger workforce layer where native HR capabilities are limited",
      ],
      tag: "ERP extension",
    },
    {
      name: "Oracle Fusion Finance",
      title: "A flexible HCM layer connected to Fusion Finance",
      points: [
        "Integrate NURAYN with Oracle Fusion financial modules",
        "Offer more flexibility and tailored workflows than standard HCM setups",
        "Keep finance in Fusion while modernizing HR and payroll operations",
      ],
      tag: "Finance-led integration",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(10,132,255,0.10),_transparent_35%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.12),_transparent_28%),linear-gradient(to_bottom,_#ffffff,_#f5f8fc)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 lg:px-10">
          <header className="flex items-center justify-between rounded-md border border-white/70 bg-white/85 px-5 py-3 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            {showMobileMenu && (
              <div className="mt-3 flex flex-col gap-4 rounded-md bg-white p-4 shadow md:hidden">
                <a href="#features">Features</a>
                <a href="#platform">Platform</a>
                <a href="#why">Why NURAYN</a>
                <a href="#contact">Contact</a>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-lg shadow-cyan-500/10 overflow-hidden">
                <img
                  src={logo}
                  alt="NURAYN logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-2xl font-semibold tracking-[0.10em] text-slate-900">
                  NURAYN
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileMenu((prev) => !prev)}
                  className="text-xl"
                >
                  ☰
                </button>
              </div>
              <a href="#features" className="transition hover:text-slate-900">
                Features
              </a>
              <a href="#platform" className="transition hover:text-slate-900">
                Platform
              </a>
              <a href="#why" className="transition hover:text-slate-900">
                Why NURAYN
              </a>
              <a href="#contact" className="transition hover:text-slate-900">
                Contact
              </a>
            </nav>

            <button
              onClick={() => {
                setShowModal(true);
                setSuccess(false); // reset
                setError("");
              }}
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02]"
            >
              Request Demo
            </button>
          </header>

          <div className="grid items-start gap-8 py-16 grid-cols-1 lg:grid-cols-[0.78fr_1.22fr]  lg:py-20">
            <div>
              <h1 className="max-w-2xl break-words text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold leading-[1.1] tracking-tight text-slate-950">
                HR, Payroll & WPS platform
                <span className="block bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent">
                  integrated with finance &amp; operations.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                NURAYN connects HR, payroll, and finance into one unified
                platform; eliminating manual work and enabling real-time
                financial impact.
              </p>

              {/* <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setSuccess(false); // reset
                    setError("");
                  }}
                  className="rounded-md bg-slate-950 px-4 sm:px-6 lg:px-10 py-3 font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)] transition hover:scale-[1.02]"
                >
                  Book a Demo
                </button>
                <button className="rounded-md border border-slate-200 bg-white px-4 sm:px-6 lg:px-10 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
                  Explore Platform
                </button>
              </div> */}
              <div className="mt-8">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Proven outcomes
                </div>
                <div className=" flex flex-wrap gap-3">
                  {valuePoints.map((item) => (
                    <div
                      key={item}
                      className="rounded-md bg-gradient-to-r from-cyan-600 to-blue-700 px-4 py-2 text-sm text-white shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Core modules
                </div>
                <div className=" flex flex-wrap gap-3">
                  {modules.map((module) => (
                    <div
                      key={module}
                      className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                    >
                      {module}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative self-start w-full">
              <div className="absolute -inset-6 rounded-lg bg-gradient-to-br from-cyan-200/40 via-white to-blue-200/40 blur-2xl" />

              <div className="relative w-full rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl">
                <div className="rounded-xl border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5">
                  {/* HEADER */}
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-sm text-slate-500">
                        NURAYN Platform
                      </div>

                      <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-950 leading-tight">
                        Executive Workforce Overview
                      </div>
                    </div>

                    <div className="flex flex-wrap items-start gap-2 sm:flex-col sm:items-end">
                      <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        Live Data
                      </div>

                      <div className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-800">
                        Total Salaries: AED 2,004,560
                      </div>
                    </div>
                  </div>

                  {/* TOP SECTION */}
                  <div className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* EMPLOYEE CARD */}
                      <div className="rounded-xl bg-slate-900/90 p-5 text-white shadow-md">
                        <div className="text-sm text-slate-300">
                          Total Employees
                        </div>

                        <div className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                          1,248
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                              Growth
                            </div>
                            <div className="mt-1 text-sm text-emerald-300">
                              +8.4% this quarter
                            </div>
                          </div>

                          <div className="rounded-lg bg-white/10 px-3 py-2 text-xs sm:text-sm text-slate-200 text-center">
                            4 active branches
                          </div>
                        </div>
                      </div>

                      {/* PAYROLL */}
                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="text-sm text-slate-600">
                          Payroll Status
                        </div>

                        <div className="mt-3 text-base sm:text-lg md:text-xl font-semibold text-slate-950 leading-tight">
                          Ready for Processing
                        </div>

                        <div className="mt-4 h-2 rounded-md bg-slate-200">
                          <div className="h-2 w-[82%] rounded-md bg-gradient-to-r from-cyan-500 to-blue-600" />
                        </div>

                        <div className="mt-3 flex justify-between text-xs sm:text-sm">
                          <span className="text-slate-500">
                            Validation progress
                          </span>
                          <span className="font-medium text-slate-900">
                            82%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* APPROVALS */}
                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <div className="text-sm text-slate-500">
                              Approvals
                            </div>
                            <div className="text-lg sm:text-xl font-semibold text-slate-950">
                              Pending Actions
                            </div>
                          </div>

                          <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs sm:text-sm font-medium text-amber-700">
                            24 open
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          {[
                            { label: "Leave requests", value: "09" },
                            { label: "Payroll exceptions", value: "06" },
                            { label: "HR approvals", value: "09" },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="rounded-lg bg-slate-50 p-4"
                            >
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-500">
                                  {item.label}
                                </span>
                                <span className="font-semibold text-slate-900">
                                  {item.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ATTENDANCE */}
                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div>
                          <div className="text-sm text-slate-500">
                            Attendance Snapshot
                          </div>

                          <div className="text-lg sm:text-xl font-semibold text-slate-950">
                            Today’s Workforce Activity
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                          {[
                            { label: "Present", value: "1,132" },
                            { label: "On Leave", value: "57" },
                            { label: "Late", value: "19" },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="rounded-lg bg-slate-50 p-3 text-center"
                            >
                              <div className="text-xs sm:text-sm text-slate-500">
                                {item.label}
                              </div>

                              <div className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-slate-950">
                                {item.value}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 rounded-xl bg-[linear-gradient(135deg,#ecfeff_0%,#eff6ff_100%)] p-4">
                          <div className="flex items-end justify-between gap-3">
                            {[38, 58, 48, 73, 67, 84, 76].map((h, i) => (
                              <div
                                key={i}
                                className="flex flex-1 flex-col items-center gap-2"
                              >
                                <div
                                  className="w-full max-w-[32px] rounded-md bg-gradient-to-t from-cyan-500 to-blue-600"
                                  style={{ height: `${h}px` }}
                                />
                                <span className="text-xs text-slate-500">
                                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 lg:px-10">
        <div className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
          ERP Integrations
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Built to extend NetSuite and Oracle Fusion Finance.
            </h2>
            <p className="mt-5  text-lg leading-7 text-slate-600">
              NURAYN acts as the HR, Payroll, and WPS layer on top of your
              existing finance systems.
            </p>

            <div className="mt-8 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-800">
              Keep your finance. Upgrade your people operations.
            </div>
          </div>
          <div className="space-y-4">
            {erpIntegrations.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all hover:shadow-md"
              >
                {/* HEADER */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs sm:text-sm font-semibold text-cyan-700">
                    {item.name}
                  </div>

                  <div className="text-[10px] sm:text-xs text-slate-500 sm:whitespace-nowrap">
                    {item.tag}
                  </div>
                </div>

                {/* TITLE */}
                <div className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-slate-900 leading-tight">
                  {item.title}
                </div>

                {/* POINTS */}
                <div className="mt-3 sm:mt-4 space-y-2 text-xs sm:text-sm text-slate-600">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-2">
                      <span className="mt-[2px] text-cyan-500">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 lg:px-10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Features
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Clean enough for users, structured enough for management.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The experience is designed to feel modern and intuitive while
              keeping the depth that growing organizations need.
            </p>
          </div>

          {/* <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm">
            Modern SaaS feel • Premium corporate credibility
          </div> */}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-white/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div />
                <div className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {feature.stat}
                </div>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="platform" className="border-y border-slate-200 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-10 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Core Strength
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Where HR meets finance and operations.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              NURAYN is not just an HR system. Its real strength is connecting
              people operations with financial and operational processes,
              creating a unified business platform instead of disconnected
              tools.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
                <div className="text-sm font-semibold text-slate-900">
                  Finance Integration
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Payroll entries, cost allocation, and employee-related
                  expenses flow directly into finance with full traceability.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
                <div className="text-sm font-semibold text-slate-900">
                  Operational Alignment
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Attendance, approvals, and workforce activities are directly
                  linked to operational workflows and performance.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-[#f8fbff] p-5">
                <div className="text-sm font-semibold text-slate-900">
                  End-to-End Visibility
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  From employee action to financial impact, everything is
                  connected and visible in real time.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Top row: Flow + Use Case side by side */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-700">
                  Integration Flow
                </div>
                <div className="mt-4 space-y-3">
                  {flowSteps.map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-xs font-semibold text-cyan-700">
                        {idx + 1}
                      </div>
                      <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                          {step.desc}
                        </div>
                        <div className="text-sm font-semibold text-slate-950">
                          {step.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-cyan-700">
                      Real Use Case
                    </div>
                    <div className="mt-1 text-lg font-semibold text-slate-950">
                      From Salary to Finance Posting
                    </div>
                  </div>
                  {/* <div className="rounded-md border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800">
                    Live
                  </div> */}
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div>• Employee attendance and overtime are captured</div>
                  <div>• Payroll calculates salary, bonuses, deductions</div>
                  <div>• Costs are automatically allocated to cost centers</div>
                  <div>
                    • Accounting entries are generated and posted to finance
                    (GL)
                  </div>
                  <div>
                    • Management gets real-time reporting and visibility
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-[#f8fbff] p-2 text-sm text-slate-700">
                  0 manual entries. Real-time posting to finance. Fully
                  audit-ready end-to-end.
                </div>
              </div>
            </div>

            {/* Bottom row: Value points full width */}
            <div className="grid gap-4 sm:grid-cols-3">
              {valuePoints.map((point) => (
                <div
                  key={point}
                  className="rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-5 text-center text-base font-semibold text-slate-800 shadow-sm"
                >
                  {point}
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm text-cyan-800">
              End-to-end integration: from employee action to financial impact
            </div>
          </div>
        </div>
      </section>

      <section
        id="why"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 lg:px-10"
      >
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                Why NURAYN
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Enterprise confidence, without the heavy experience.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Built for organizations that want control, visibility, and
                operational maturity while keeping the interface clear, modern,
                and approachable.
              </p>
            </div>

            <div className="grid gap-4">
              {whyItems.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white p-5 text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pb-20 lg:px-10"
      >
        <div className="rounded-2xl border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff_0%,#eff6ff_50%,#ffffff_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-12">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Get Started
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Ready to modernize HR, attendance, payroll, and WPS?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Bring your people operations into one premium, structured platform
              with NURAYN.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  setShowModal(true);
                  setSuccess(false); // reset
                  setError("");
                }}
                className="rounded-md bg-slate-950 px-4 sm:px-6 lg:px-10 py-3 font-semibold text-white"
              >
                Schedule a Demo
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setSuccess(false); // reset
                  setError("");
                }}
                className="rounded-md border border-slate-200 bg-white px-4 sm:px-6 lg:px-10 py-3 font-semibold text-slate-900"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="w-full max-w-md mx-4 rounded-xl bg-white p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Request a Demo</h2>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            {success ? (
              <div className="text-center space-y-4">
                <p>
                  Request sent successfully! We will reach out to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSuccess(false);
                    setCaptchaValue(null);
                  }}
                  className="w-full rounded-md bg-slate-950 py-2 text-white font-semibold transition hover:scale-[1.02]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                />
                <input
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border p-2"
                />
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(value: string | null) => setCaptchaValue(value)}
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full rounded-md bg-slate-950 py-2 text-white disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "Submit Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
