import { createFileRoute } from "@tanstack/react-router";
import {
  Award, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight, Download,
  Database, ExternalLink, FileText, GraduationCap, Home, Linkedin,
  Mail, MapPin, Menu, Microscope, Search, ShieldCheck, SlidersHorizontal, Users, Wrench, X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";

import headshot from "@/assets/shouvik-headshot.png.asset.json";
import cvAsset from "@/assets/shouvik-cv.pdf.asset.json";
import pubListAsset from "@/assets/publication-list.pdf.asset.json";
import phdThesisAsset from "@/assets/phd-thesis.pdf.asset.json";
import mastersThesisAsset from "@/assets/masters-dissertation.pdf.asset.json";
import orcidLogo from "@/assets/orcid-logo.png.asset.json";
import wosLogo from "@/assets/wos-logo.png.asset.json";
import ieeeLogo from "@/assets/ieee-logo.png.asset.json";
import sduBg from "@/assets/sdu-sonderborg.jpeg.asset.json";
import heroBg from "@/assets/hero-bg.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { pillarGraphics } from "@/components/pillar-graphics";
import { publications, researchPillars, skills } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Shouvik Chaudhuri, Ph.D. | Dynamics & Control" },
    { name: "description", content: "Academic portfolio of Dr. Shouvik Chaudhuri, researcher in nonlinear, safety-critical, maritime and electrohydraulic control." },
    { property: "og:title", content: "Shouvik Chaudhuri, Ph.D. | Academic Portfolio" },
    { property: "og:description", content: "Research, publications, experience and teaching in dynamics and control." },
    { property: "og:type", content: "profile" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Portfolio,
});

const nav = [
  ["home", "Home", Home], ["profile", "Profile", Users], ["research", "Research", Microscope],
  ["experience", "Experience", BriefcaseBusiness], ["funding", "Funding", Award],
  ["education", "Education", GraduationCap], ["publications", "Publications", BookOpen],
  ["teaching", "Teaching", Users], ["skills", "Skills", Wrench], ["service", "Service", ShieldCheck],
  ["downloads", "Downloads", Download], ["contact", "Contact", Mail],
] as const;

const profileLinks = [
  ["ORCID", "0000-0001-8957-5086", "https://orcid.org/0000-0001-8957-5086"],
  ["Web of Science", "ResearcherID S-9653-2019", "https://www.webofscience.com/wos/author/record/S-9653-2019"],
  ["Google Scholar", "sXYaj-AAAAAJ", "https://scholar.google.com/citations?user=sXYaj-AAAAAJ"],
  ["Scopus", "Author ID 14062861300", "https://www.scopus.com/authid/detail.uri?authorId=14062861300"],
  ["LinkedIn", "drshouvikchaudhuri", "https://www.linkedin.com/in/drshouvikchaudhuri"],
] as const;

type SideLink = { label: string; url: string; Icon?: ComponentType<{ className?: string }>; img?: string };
const sidebarLinks: SideLink[] = [
  { label: "ORCID", url: "https://orcid.org/0000-0001-8957-5086", img: orcidLogo.url },
  { label: "Web of Science", url: "https://www.webofscience.com/wos/author/record/S-9653-2019", img: wosLogo.url },
  { label: "Google Scholar", url: "https://scholar.google.com/citations?user=sXYaj-AAAAAJ", Icon: GraduationCap },
  { label: "Scopus", url: "https://www.scopus.com/authid/detail.uri?authorId=14062861300", Icon: Database },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/drshouvikchaudhuri", Icon: Linkedin },
];

function SidebarContent({ active, close }: { active: string; close?: () => void }) {
  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    close?.();
  };
  return <div className="flex h-full min-h-0 flex-col px-5 py-5">
    <div className="shrink-0 text-center">
      <img src={headshot.url} alt="Portrait of Dr. Shouvik Chaudhuri" className="mx-auto size-[104px] rounded-full border-4 border-sidebar-border object-cover shadow-portrait" />
      <h2 className="mt-3 font-display text-[1.4rem] leading-tight text-sidebar-foreground">Shouvik Chaudhuri, Ph.D.</h2>
      <p className="mt-1.5 text-[10px] font-bold leading-snug text-sidebar-primary">SMIEEE (US) · MIET (UK) · MIE (India)<br />Pursuing CEng status (IET)</p>
      <p className="mt-1.5 text-[13px] font-semibold text-sidebar-foreground">Researcher in Dynamics and Control</p>
      <div className="mt-3 flex justify-center gap-1.5">
        {sidebarLinks.map(({ label, url, Icon, img }) => <a key={label} href={url} target="_blank" rel="noreferrer" title={label} aria-label={label} className="grid size-8 place-items-center rounded-full border border-sidebar-border bg-card text-sidebar-foreground/70 transition-colors hover:border-sidebar-primary hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">{img ? <img src={img} alt="" className="size-4 object-contain" /> : Icon ? <Icon className="size-3.5" /> : null}</a>)}
      </div>
      <p className="mt-2 text-[10px] font-semibold text-sidebar-foreground/60">IEEE Senior Member · ID 90902393</p>
    </div>
    <nav aria-label="Portfolio sections" className="mt-4 min-h-0 flex-1 space-y-0.5 overflow-y-auto">
      {nav.map(([id, label, Icon]) => <button key={id} onClick={() => jump(id)} aria-current={active === id ? "true" : undefined} className={cn("grid w-full grid-cols-[20px_1fr] items-center gap-3 rounded-md px-3 py-[7px] text-left text-[13px] font-medium transition-colors", active === id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
        <Icon className="size-4 shrink-0" aria-hidden="true" /><span>{label}</span>
      </button>)}
    </nav>
    <div className="shrink-0">
      <Button asChild className="mt-3 w-full"><a href={cvAsset.url} download="Shouvik-Chaudhuri-CV.pdf"><Download className="size-4" />Download CV</a></Button>
      <div className="mt-3 space-y-1.5 border-t border-sidebar-border pt-3 text-xs text-sidebar-foreground/70">
        <a className="flex items-center gap-2 hover:text-sidebar-primary" href="mailto:svk.chaudhuri@gmail.com"><Mail className="size-3.5" />svk.chaudhuri@gmail.com</a>
        <p className="flex items-center gap-2"><MapPin className="size-3.5" />Kolkata, India</p>
      </div>
    </div>
  </div>;
}

function Portfolio() {
  const [active, setActive] = useState("home");
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-15% 0px -65%", threshold: [0, .25, .5] });
    nav.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = drawer ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawer]);

  return <div className="relative min-h-screen bg-background">
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <img src={sduBg.url} alt="" className="absolute inset-x-0 top-0 h-[62vh] w-full object-cover opacity-[0.09]" />
      <img src={heroBg.url} alt="" className="absolute inset-x-0 bottom-0 h-[55vh] w-full object-cover opacity-[0.06]" />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[3px]" />
    </div>
    <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-[300px] overflow-hidden border-r border-sidebar-border bg-sidebar lg:block"><SidebarContent active={active} /></aside>
    <header className="sticky top-0 z-40 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
      <Button variant="ghost" size="icon" onClick={() => setDrawer(true)} aria-label="Open navigation"><Menu className="size-5" /></Button>
      <span className="truncate text-sm font-bold">Shouvik Chaudhuri, Ph.D.</span>
      <Button asChild variant="outline" size="sm"><a href={cvAsset.url} download><Download className="size-4" /><span className="hidden sm:inline">CV</span></a></Button>
    </header>
    {drawer && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-overlay" onClick={() => setDrawer(false)} /><aside className="absolute inset-y-0 left-0 w-[min(88vw,340px)] bg-sidebar shadow-drawer"><Button variant="ghost" size="icon" className="absolute right-3 top-3 z-10" onClick={() => setDrawer(false)} aria-label="Close navigation"><X className="size-5" /></Button><SidebarContent active={active} close={() => setDrawer(false)} /></aside></div>}
    <main className="relative z-10 lg:ml-[300px]">
      <Hero />
      <Profile />
      <Research />
      <Experience />
      <Funding />
      <Education />
      <Publications />
      <Teaching />
      <Skills />
      <Service />
      <Downloads />
      <Contact />
    </main>
  </div>;
}

function Section({ id, eyebrow, title, children, muted = false }: { id: string; eyebrow: string; title: string; children: React.ReactNode; muted?: boolean }) {
  return <section id={id} className={cn("scroll-mt-20 px-5 py-20 sm:px-10 lg:px-14 xl:px-20", muted && "bg-muted/60")}><div className="mx-auto max-w-6xl"><p className="section-kicker">{eyebrow}</p><h2 className="section-title">{title}</h2><div className="mt-10">{children}</div></div></section>;
}

const typedTerms = ["Fluid Power Systems", "Robotic Manipulators", "Maritime Control"];
function TypedTerm() {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = typedTerms[index] ?? "";
    if (!deleting && len === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && len === 0) {
      const t = setTimeout(() => { setDeleting(false); setIndex((i) => (i + 1) % typedTerms.length); }, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLen((l) => l + (deleting ? -1 : 1)), deleting ? 38 : 72);
    return () => clearTimeout(t);
  }, [len, deleting, index]);
  return <span className="text-primary">
    {(typedTerms[index] ?? "").slice(0, len)}
    <span aria-hidden="true" className="ml-1 inline-block h-[0.82em] w-[3px] animate-pulse bg-primary align-baseline" />
    <span className="sr-only">{typedTerms.join(", ")}</span>
  </span>;
}

function Hero() {
  return <section id="home" className="relative flex min-h-[700px] scroll-mt-20 items-center overflow-hidden border-b border-border px-5 py-24 sm:px-10 lg:px-14 xl:px-20">
    <div className="hero-grid absolute inset-0 opacity-50" /><div className="relative mx-auto w-full max-w-6xl">
      <p className="section-kicker">Dynamics · Control · Real-time validation</p>
      <h1 className="mt-5 max-w-5xl font-display text-4xl leading-[1.08] text-foreground sm:text-5xl xl:text-6xl">Researcher in Nonlinear Control of <br className="hidden sm:block" /><TypedTerm /></h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">Control engineer with more than twelve years of experience in nonlinear and adaptive control of uncertain dynamical systems—taking ideas from mathematical formulation through MIL, SIL and HIL to purpose-built experimental rigs.</p>
      <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
        {[['7','h-index'],['170','Scholar citations'],['122','WoS citations'],['28','publications']].map(([n,l]) => <div key={l} className="bg-background p-5"><p className="font-display text-3xl text-primary">{n}</p><p className="mt-1 text-xs font-bold uppercase text-muted-foreground">{l}</p></div>)}
      </div>
      <div className="mt-10 grid gap-3 md:grid-cols-3">{["Nonlinear & Adaptive Control", "Safety-Critical Control / CBF-QP", "Maritime & Electrohydraulic Systems"].map((x) => <div className="flex items-center gap-3 border-l-2 border-highlight py-2 pl-4 text-sm font-bold" key={x}><CheckCircle2 className="size-4 shrink-0 text-primary" />{x}</div>)}</div>
    </div>
  </section>;
}

function Profile() { return <Section id="profile" eyebrow="Profile" title="Research with a rigorous through-line"><div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]"><div className="space-y-5 text-[1.03rem] leading-8 text-muted-foreground"><p>I am a control engineer with more than twelve years of experience in the nonlinear and adaptive control of uncertain dynamical systems, and in the mathematical modelling that supports it. My work spans learning-based control, in which the learned component sits inside the loop under an adaptation law designed to preserve stability; safety-critical formulations built on control barrier functions and quadratic programming; and maritime motion control.</p><p>The common thread is closed-loop behaviour that can be certified rather than only tuned, on plants that are uncertain and only partly modelled. I take that work from mathematical formulation through simulation and MIL/SIL/HIL pipelines to real-time experimental validation on purpose-built rigs.</p></div><div className="border-l border-border pl-7"><p className="font-display text-2xl">Research leadership</p><ul className="mt-5 space-y-4 text-sm text-muted-foreground">{["Led a three-partner consortium as Project Manager", "Principal Investigator on two competitive grants", "Supervised twelve Master's and Bachelor's projects", "Research spanning control, energy and engineering–biology"].map(x => <li key={x} className="flex gap-3"><ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />{x}</li>)}</ul></div></div></Section>; }

function Research() { return <Section id="research" eyebrow="Research" title="Five connected research pillars" muted><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 xl:grid-cols-3">{researchPillars.map(([title, text], i) => <article key={title} className={cn("bg-background p-7", i === 0 && "md:col-span-2 xl:col-span-1")}><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-4 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div><div className="mt-12 grid gap-4 md:grid-cols-2">{["Delivered safety-critical closed-loop control for active marine vessel motion stabilisation.","Specified and commissioned a marine vessel test rig with integrated wave generation.","Engineered a real-time, multi-actuator control architecture for an electrohydraulic quadruped.","Developed vision-based motion sensing on a 700 kg hydraulic Stewart platform.","Established two permanent teaching and research testbeds at SDU as Principal Investigator."].map(x=><p key={x} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-1 size-4 shrink-0 text-highlight" />{x}</p>)}</div></Section>; }

const experiences = [
  { date:"03/2022 — 02/2026", role:"Postdoctoral Researcher — Maritime Control Systems", org:"Centre for Industrial Mechanics, University of Southern Denmark · Sønderborg", projects:[{name:"SAFEMARVEL",url:"https://www.linkedin.com/in/project-safemarvel-4a5362304/",desc:"Safety-critical control framework for roll stabilisation of marine vessels. Project Manager and Research Lead; Den Danske Maritime Fond; SDU, Dacoma ApS and SDU Physics Odense."},{name:"AMCOSTAR",url:"https://www.dacoma.dk/amcostar",desc:"Dynamic Airkeel stabiliser for increasing the capacity of smaller boats through active control. Researcher and Project Participant; Eurostars/Eureka Network and Innovation Fund Denmark."}]},
  { date:"06/2023", role:"Visiting Researcher (Secondment) — PUREWATER", org:"Control Systems Group, TU Ilmenau · Germany", projects:[{name:"MSCA secondment",desc:"Collaborative automation and systems engineering research with Prof. Johann Reger and industry partner KOMPASS GmbH."}]},
  { date:"08/2013 — 02/2022", role:"Research Fellow — Robotics & Electrohydraulic Control", org:"Hydraulics Laboratory, Jadavpur University · Kolkata", projects:[{name:"CARS",desc:"Real-time multi-actuator control for an autonomous quadruped torso. Sponsored by CAIR, DRDO; 12/2015–02/2022."},{name:"DARO",desc:"High-frequency real-time tracking for linear servo actuation, including a 700 kg Stewart platform. Sponsored by AR&DB, DRDO; 08/2013–12/2015."}]},
  { date:"07/2012 — 06/2013", role:"Masters GATE Fellow", org:"Instrumentation & Control Division, BARC · Mumbai", projects:[{name:"Nuclear reactor modelling",desc:"First-principles pressurised water reactor and regulating-system models in MATLAB/Simulink, with Lyapunov stability analysis."}]},
];
function Experience() { return <Section id="experience" eyebrow="Experience" title="From theory to operating hardware"><div className="relative space-y-12 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-border">{experiences.map(e=><article key={e.role} className="relative pl-10"><span className="absolute left-0 top-1.5 size-[15px] rounded-full border-4 border-background bg-primary" /><p className="font-mono text-xs font-bold text-primary">{e.date}</p><h3 className="mt-2 font-display text-2xl">{e.role}</h3><p className="mt-1 text-sm font-semibold text-muted-foreground">{e.org}</p><div className="mt-5 grid gap-3 md:grid-cols-2">{e.projects.map(p=>{const inner=<><p className="flex items-center gap-2 text-sm font-extrabold text-primary">{p.name}{"url" in p&&p.url?<ExternalLink className="size-3.5" aria-hidden="true" />:null}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{p.desc}</p></>;return "url" in p&&p.url?<a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="block rounded-md border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait">{inner}</a>:<div key={p.name} className="rounded-md border border-border bg-card p-5">{inner}</div>;})}</div></article>)}</div></Section>; }

function Funding() { const funded=[['SAFEMARVEL','Den Danske Maritime Fond · 2023-116 / 3410157 · 03/2024–02/2026','1,489,000 DKK','Research Lead and Project Manager · Completed'],['Advanced servo motor control system','Fabrikant Mads Clausen Fond · 3410254 · 01/2025–02/2026','100,000 DKK','Principal Investigator · Completed'],['RACHP training system','Fabrikant Mads Clausen Fond · 3410089 · 01/2024–12/2025','100,000 DKK','Principal Investigator · Completed'],['International mobility and travel','Otto Mønsteds Fond · INCOM 2026, India','7,500 DKK','Main applicant']]; return <Section id="funding" eyebrow="Funding" title="Research funding and grants" muted><div className="grid gap-4 md:grid-cols-2">{funded.map(([n,s,a,r])=><article className="rounded-md border border-border bg-background p-6" key={n}><p className="text-xs font-bold uppercase text-primary">{a}</p><h3 className="mt-2 font-display text-xl">{n}</h3><p className="mt-2 text-sm text-muted-foreground">{s}</p><p className="mt-4 text-xs font-semibold">{r}</p></article>)}</div><h3 className="mt-12 font-display text-2xl">Proposals</h3><div className="mt-5 divide-y divide-border border-y border-border">{[['MERLIN: Marine Environmental Remediation Learning Integrated Navigator','Lead applicant · Progressed to Phase 2'],['Smart energy management and power flow optimisation for maritime energy hubs','Project participant · Under preparation'],['Smart power flow optimisation for megawatt supercharging','Co-developer · Waitlisted'],['Motion-stabilised safe room for reducing motion sickness','Co-developer · Not funded']].map(([a,b])=><div key={a} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto]"><p className="font-semibold">{a}</p><p className="text-sm text-muted-foreground">{b}</p></div>)}</div></Section>; }

function Education() { const ed=[['Ph.D. (Engineering)','07/2015 — 11/2021','Jadavpur University · CGPA 10.00/10.00 · EQF 8','Developing Electrohydraulic System Solutions using Adaptive-Neuro-Sliding Mode Control and Vision Sensing.'],['M.E. in Nuclear Engineering','08/2011 — 07/2013','Jadavpur University · CGPA 9.02/10.00 (86.28%) · EQF 7','Compact Pressurized Water Reactor Modelling, carried out at BARC Mumbai.'],['B.Tech in Electrical Engineering','08/2007 — 06/2011','Seacom Engineering College, WBUT · DGPA 8.73/10.00 · EQF 6','Control Systems, electrical machines, electromagnetic field theory, microprocessors and digital signal processing.'],['Higher Secondary (Class XII), CBSE','April 2006','Kendriya Vidyalaya Ballygunge · 87.20%','Physics, Chemistry, Mathematics, Biology and English.'],['Secondary (Class X), CBSE','April 2004','Kendriya Vidyalaya Ballygunge · 90.60%','Science, Mathematics, Social Science, English and Hindi.']]; return <Section id="education" eyebrow="Education" title="Academic foundations"><div className="space-y-4">{ed.map(([degree,date,school,detail])=><article key={degree} className="grid gap-4 border-b border-border py-6 md:grid-cols-[180px_1fr]"><p className="font-mono text-xs font-bold text-primary">{date}</p><div><h3 className="font-display text-2xl">{degree}</h3><p className="mt-1 text-sm font-semibold">{school}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p></div></article>)}</div></Section>; }

const categoryCounts: Record<string, number> = { All: 28, Journals: 14, "Conference Proceedings": 11, Books: 1, "Book Chapters": 2, "Theses & Dissertations": 2 };
const theses = [
  { title: "Developing Electrohydraulic System Solutions using Adaptive-Neuro-Sliding Mode Control and Vision Sensing", kind: "Ph.D. Dissertation · Jadavpur University", year: "2021", url: phdThesisAsset.url, file: "PhD_Thesis_ShouvikChaudhuri_2021.pdf" },
  { title: "Compact Pressurized Water Reactor Modelling", kind: "Master's Dissertation · Jadavpur University, carried out at BARC Mumbai", year: "2013", url: mastersThesisAsset.url, file: "Compact_Reactor_Modeling_2013_ShouvikChaudhuri.pdf" },
];
function Theses() { return <div className="grid gap-4 md:grid-cols-2">{theses.map(t=><article key={t.year} className="flex flex-col rounded-md border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait"><p className="font-mono text-xs font-bold text-primary">{t.year}</p><h3 className="mt-3 font-display text-xl leading-snug">“{t.title}”</h3><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{t.kind}</p><div className="mt-5 flex flex-wrap gap-2"><Button asChild size="sm"><a href={t.url} download={t.file}><Download className="size-4" />Download</a></Button><Button asChild size="sm" variant="outline"><a href={t.url} target="_blank" rel="noreferrer"><ExternalLink className="size-4" />View</a></Button></div></article>)}</div>; }
function HighlightAuthors({ text }: { text: string }) { const parts=text.split("S. Chaudhuri"); return <>{parts.map((p,i)=><span key={`${p}-${i}`}>{p}{i<parts.length-1&&<strong className="text-primary">S. Chaudhuri</strong>}</span>)}</>; }
function Publications() {
  const [category,setCategory]=useState("All"); const [query,setQuery]=useState(""); const [year,setYear]=useState("All");
  const years=useMemo(()=>Array.from(new Set(publications.map(p=>p.year))).sort((a,b)=>b-a),[]);
  const filtered=useMemo(()=>publications.filter(p=>(category==="All"||p.category===category)&&(year==="All"||p.year===Number(year))&&`${p.authors} ${p.title} ${p.venue} ${p.doi??""} ${p.year}`.toLowerCase().includes(query.toLowerCase())),[category,query,year]);
  return <Section id="publications" eyebrow="Publications" title="A searchable body of work" muted><div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Publication category">{Object.entries(categoryCounts).map(([c,n])=><Button key={c} size="sm" variant={category===c?"default":"outline"} onClick={()=>setCategory(c)} role="tab" aria-selected={category===c}>{c} <span className="opacity-60">{n}</span></Button>)}</div>{category==="Theses & Dissertations"?<div className="mt-6"><Theses /></div>:<><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_150px_auto]"><label className="relative"><span className="sr-only">Search publications</span><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, author, venue or DOI" /></label><label><span className="sr-only">Filter by year</span><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={year} onChange={e=>setYear(e.target.value)}><option>All</option>{years.map(y=><option key={y}>{y}</option>)}</select></label><Button variant="ghost" onClick={()=>{setQuery("");setYear("All");setCategory("All")}}><SlidersHorizontal className="size-4" />Clear</Button></div><p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{filtered.length} result{filtered.length===1?"":"s"}</p><div className="mt-4 space-y-3">{filtered.map((p,i)=><article className="rounded-md border border-border bg-background p-5 sm:p-6" key={`${p.title}-${p.year}`}><div className="grid gap-4 sm:grid-cols-[48px_1fr_auto]"><span className="font-mono text-xs text-muted-foreground">{String(i+1).padStart(2,'0')}</span><div className="min-w-0"><p className="text-sm leading-6 text-muted-foreground"><HighlightAuthors text={p.authors} /></p><h3 className="mt-2 font-display text-xl leading-snug">“{p.title}”</h3><p className="mt-3 text-sm font-semibold italic">{p.venue}</p><p className="mt-1 text-xs text-muted-foreground">{p.details}</p></div><div className="flex items-start sm:justify-end">{p.doi?<a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground">DOI <ExternalLink className="size-3" /></a>:<span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">DOI not listed</span>}</div></div></article>)}{filtered.length===0&&<div className="border border-dashed border-border py-16 text-center text-muted-foreground">No publications match these filters.</div>}</div></>}</Section>;
}

const masters=[['Flow-Controlled Underfloor Heating Using PCM-Assisted Flow Wall Systems','Bragi Sigurjónsson · 2026'],['Amfitrack EMF Data Fusion','Frej Karlinsky Scherfig · 2025'],['Development of Trajectory Generation Algorithms for CNC Foam Cutting Machines','Arnas Serva · 2025'],['Autonomous Aerial Mapping and SLAM: A Drone-Based Approach for 3D Environmental Reconstruction','David Milošević · 2025'],['Design and Development of a Diesel Dosing Unit for Active Regeneration of DPF Filters in Exhaust After-Treatment Systems','Arfeen Ahmed Ali · 2025'],['Verification and Validation of Custom Code Generation from Model-Based Design using Simulink','Jacob Thomas Puthukeril · 2023']];
const bachelors=[['Development of a Simulation-Based Sales Tool: Quantifying Efficiency Gains of PVG Nova vs. PVG 32','Jana Aly and Jakub Edward Brodzinski · 2026'],['Modelling and Control of a Time-Pressure Membrane Valve System for Pharmaceutical Filling','Einar Benjamin Jensen · 2026'],['Modelling and Control of Propeller-Drive Systems with Nonlinear Dynamics for Marine Applications','Laura Zanón Barney · 2026'],['Orientation Estimation and Control for Thruster-Assisted Wind Turbine Installation','Henrik Maarten Bongers · 2026'],['Active Yaw Control for Vehicle Handling and Stability with Torque Vectoring','Zofia Roza Gniewosz · 2025'],['Design and Development of a Semi-Active Magnetorheological Suspension for Automotive and Motorsport Applications','Lucas Fernández Schelstraete · 2024']];
function ThesisList({title,items}:{title:string;items:string[][]}) { return <div><h3 className="font-display text-2xl">{title} <span className="font-sans text-sm text-primary">06</span></h3><ol className="mt-5 space-y-4">{items.map(([name,person],i)=><li key={name} className="grid grid-cols-[24px_1fr] gap-3 text-sm"><span className="font-mono text-xs text-primary">{i+1}.</span><span><strong>{name}</strong><span className="mt-1 block text-muted-foreground">{person}</span></span></li>)}</ol></div>; }
function Teaching() { return <Section id="teaching" eyebrow="Teaching" title="Teaching and supervision"><div className="grid gap-4 md:grid-cols-2">{[['XCOS','Experimental Control Systems · MSc Mechatronics · 5 ECTS · Spring 2023–2025 · Lecturer'],['EXT','Expert in Teams · BSc · 10 ECTS · Fall 2023–2025 · Teacher and Supervisor'],['SPRO4ME','Mechanical Semester Project, Hydraulic Power Systems · BSc · 10 ECTS · Spring 2025 · Co-lecturer'],['CoE1','Control Engineering 1 · BSc · 5 ECTS · Spring 2024 · Co-lecturer']].map(([code,text])=><div className="rounded-md border border-border p-5" key={code}><p className="font-mono text-xs font-bold text-primary">{code}</p><p className="mt-2 text-sm leading-6">{text}</p></div>)}</div><p className="mt-6 text-sm text-muted-foreground">Teaching assistant: Control of Autonomous Systems (Autumn 2022) and Construct Mechatronics (Spring 2022). Internal co-examiner for Adaptive and Nonlinear Control, Fault-Tolerant Control, and Statistical Signal Processing.</p><div className="mt-14 grid gap-12 lg:grid-cols-2"><ThesisList title="Master's dissertations" items={masters}/><ThesisList title="Bachelor's projects" items={bachelors}/></div></Section>; }

function Skills() { return <Section id="skills" eyebrow="Technical skills" title="Methods, platforms and tools" muted><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">{skills.map(([t,d])=><article className="bg-background p-6" key={t}><h3 className="text-sm font-extrabold text-primary">{t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</div></Section>; }

const reviews=[['IEEE/ASME Transactions on Mechatronics','14'],['IEEE Transactions on Instrumentation and Measurement','10'],['IEEE Transactions on Vehicular Technology','9'],['IEEE I2MTC','6'],['IEEE Sensors Journal','3'],['Control Engineering Practice','3'],['Proc. IMechE, Part C','2'],['Computers and Electronics in Agriculture','2'],['IEEE JESTIE','2'],['Sādhanā','1'],['Journal of the Brazilian Society of Mechanical Sciences and Engineering','1'],['IEEE Open Journal of Instrumentation and Measurement','1'],['IEEE IAS Publications','1']];
function Service() { return <Section id="service" eyebrow="Service" title="Professional standing and peer review"><div className="grid gap-10 lg:grid-cols-2"><div><h3 className="font-display text-2xl">Memberships & honours</h3><div className="mt-5 space-y-4">{[['Senior Member, IEEE','Elevated 2026 · member since 2016 · ID 90902393'],['Member, IET','ID 1101020475 · pursuing CEng status'],['Member & Chartered Engineer (India), IE(I)','ID M-1848040'],['Associate Member, INAE','Application under review, 2026'],['IEEE COVID-19 App Development Contest','Winner, 2020 · CovCov mobile application']].map(([a,b])=><div key={a} className="border-l-2 border-highlight pl-4"><p className="font-semibold">{a}</p><p className="text-sm text-muted-foreground">{b}</p></div>)}</div></div><div><div className="flex items-end justify-between"><h3 className="font-display text-2xl">Verified peer review</h3><p className="font-display text-4xl text-primary">55</p></div><p className="mt-2 text-sm text-muted-foreground">Reviews of 42 manuscripts · September 2015–September 2026</p><div className="mt-5 divide-y divide-border border-y border-border">{reviews.map(([a,n])=><div key={a} className="grid grid-cols-[1fr_auto] gap-3 py-2.5 text-xs"><span>{a}</span><strong className="text-primary">{n}</strong></div>)}</div></div></div><div className="mt-12 border-t border-border pt-8"><h3 className="font-display text-2xl">Languages</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">English (Professional, C1; British Council) · Hindi (Native, C2) · Bengali (Native, C2) · Danish (Basic, A1) · German (Beginner)</p></div></Section>; }

const downloadCards = [
  { title: "Academic CV", note: "Complete academic record · Version 2 · 13 September 2026 · PDF", url: cvAsset.url, file: "Shouvik_Chaudhuri_CV_Master_v2.pdf" },
  { title: "Complete List of Publications", note: "All journal, conference, book and chapter entries · Version 2 · PDF", url: pubListAsset.url, file: "Shouvik_Chaudhuri_Publication_List_v2.pdf" },
];
function Downloads() { return <Section id="downloads" eyebrow="Downloads" title="Documents" muted><div className="grid gap-4 md:grid-cols-2">{downloadCards.map(d=><article key={d.title} className="flex flex-col rounded-md border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait"><FileText className="size-7 text-primary" aria-hidden="true" /><h3 className="mt-4 font-display text-2xl">{d.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{d.note}</p><Button asChild className="mt-6 w-fit"><a href={d.url} download={d.file}><Download className="size-4" />Download PDF</a></Button></article>)}</div></Section>; }

function Contact() { return <Section id="contact" eyebrow="Contact" title="Connect and collaborate"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="max-w-md text-lg leading-8 text-muted-foreground">For research collaboration, academic opportunities and technical discussions in dynamics and control.</p><Button asChild className="mt-7"><a href="mailto:svk.chaudhuri@gmail.com"><Mail className="size-4" />Send an email</a></Button><div className="mt-7 space-y-2 text-sm"><p>+91 90380 43252</p><p>Kolkata, India</p></div></div><div className="grid gap-3 sm:grid-cols-2">{profileLinks.map(([label,value,url])=><a key={label} href={url} target="_blank" rel="noreferrer" className="group rounded-md border border-border p-4 transition-colors hover:border-primary"><span className="flex items-center justify-between text-sm font-bold">{label}<ExternalLink className="size-4 text-muted-foreground group-hover:text-primary" /></span><span className="mt-1 block break-all text-xs text-muted-foreground">{value}</span></a>)}<div className="rounded-md border border-border p-4"><span className="text-sm font-bold">IEEE</span><span className="mt-1 block text-xs text-muted-foreground">Senior Member · ID 90902393</span></div></div></div><footer className="mt-20 border-t border-border pt-6 text-xs text-muted-foreground">© 2026 Shouvik Chaudhuri, Ph.D. · Academic portfolio</footer></Section>; }