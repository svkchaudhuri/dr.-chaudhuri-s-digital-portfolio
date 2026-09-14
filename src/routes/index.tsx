import { createFileRoute } from "@tanstack/react-router";
import {
  Award, BadgeCheck, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight, Clock3, Download,
  ExternalLink, FileImage, FileText, GraduationCap, Home, ImagePlus, Linkedin,
  Globe2, Mail, MapPin, Menu, Microscope, Search, ShieldCheck, SlidersHorizontal, Users, Wrench, X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";

import headshot from "@/assets/shouvik-headshot.png.asset.json";
import cvAsset from "@/assets/shouvik-cv.pdf.asset.json";
import pubListAsset from "@/assets/publication-list.pdf.asset.json";
import phdThesisAsset from "@/assets/phd-thesis.pdf.asset.json";
import mastersThesisAsset from "@/assets/masters-dissertation.pdf.asset.json";
import englishCertAsset from "@/assets/british-council-certificate.pdf.asset.json";
import danishCertAsset from "@/assets/danish-module-certificate.pdf.asset.json";
import teachingCertAsset from "@/assets/teaching-certificate.pdf.asset.json";
import orcidLogo from "@/assets/orcid-logo.png.asset.json";
import wosLogo from "@/assets/wos-logo.png.asset.json";
import ieeeLogo from "@/assets/ieee-logo.png.asset.json";
import scopusLogo from "@/assets/scopus-logo.png.asset.json";
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
  ["experience", "Theory to Implementation", BriefcaseBusiness], ["funding", "Funding", Award],
  ["education", "Education", GraduationCap], ["publications", "Publications", BookOpen],
  ["teaching", "Teaching", Users], ["skills", "Skills", Wrench], ["service", "Service", ShieldCheck],
  ["gallery", "Career Moments", FileImage],
  ["downloads", "Downloads", Download], ["contact", "Contact", Mail],
] as const;

type Brand = { label: string; value: string; url?: string; img?: string; Icon?: ComponentType<{ className?: string }> };
const brandLinks: Brand[] = [
  { label: "ORCID", value: "0000-0001-8957-5086", url: "https://orcid.org/0000-0001-8957-5086", img: orcidLogo.url },
  { label: "Web of Science", value: "ResearcherID S-9653-2019", url: "https://www.webofscience.com/wos/author/record/S-9653-2019", img: wosLogo.url },
  { label: "Google Scholar", value: "sXYaj-AAAAAJ", url: "https://scholar.google.com/citations?user=sXYaj-AAAAAJ", Icon: GraduationCap },
  { label: "Scopus", value: "Author ID 14062861300", url: "https://www.scopus.com/authid/detail.uri?authorId=14062861300", img: scopusLogo.url },
  { label: "LinkedIn", value: "drshouvikchaudhuri", url: "https://www.linkedin.com/in/drshouvikchaudhuri", Icon: Linkedin },
  { label: "IEEE", value: "Senior Member · ID 90902393", img: ieeeLogo.url },
];

function BrandMark({ link, className = "size-5" }: { link: Brand; className?: string }) {
  if (link.img) return <img src={link.img} alt="" className={cn("object-contain", className)} />;
  const Icon = link.Icon;
  return Icon ? <Icon className={className} /> : null;
}

function SidebarContent({ active, close, showNav = false }: { active: string; close?: () => void; showNav?: boolean }) {
  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    close?.();
  };
  return <div className={cn("flex h-full min-h-0 flex-col justify-between overflow-hidden px-5", showNav ? "gap-1.5 py-3" : "gap-3 py-6")}>
    <div className="shrink-0 text-center">
      <div className="relative mx-auto w-fit">
        <div aria-hidden="true" className="absolute -inset-1.5 rounded-full bg-sidebar-primary/10" />
        <img src={headshot.url} alt="Portrait of Dr. Shouvik Chaudhuri" className={cn("relative mx-auto aspect-square rounded-full border-4 border-sidebar-accent object-cover shadow-portrait", showNav ? "w-[104px]" : "w-[min(144px,42vw)]")} />
      </div>
      <h2 className={cn("font-display leading-tight text-sidebar-foreground", showNav ? "mt-2 text-lg" : "mt-3 text-[1.35rem]")}>Shouvik Chaudhuri, Ph.D.</h2>
      <p className="mt-1.5 text-[10.5px] font-bold leading-snug text-sidebar-primary">SMIEEE (US) · MIET (UK) · MIE (India)<br />Pursuing CEng status (IET)</p>
      <p className={cn("mt-1.5 font-semibold text-sidebar-foreground", showNav ? "text-[11px]" : "text-[13px]")}>Researcher in Dynamics and Control</p>
    </div>
    <div className="shrink-0">
      <p className="text-center text-[9.5px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/70">Academic profiles</p>
      <div className={cn("grid grid-cols-3", showNav ? "mt-1 gap-1.5" : "mt-2 gap-2")}>
        {brandLinks.map((link) => {
          const inner = <>
            <BrandMark link={link} className="size-5" />
            <span className="mt-1 text-[9px] font-bold leading-none text-sidebar-card-foreground/80">{link.label === "Web of Science" ? "WoS" : link.label === "Google Scholar" ? "Scholar" : link.label}</span>
          </>;
          return link.url
             ? <a key={link.label} href={link.url} target="_blank" rel="noreferrer" title={link.label} className={cn("flex flex-col items-center justify-center rounded-xl border border-sidebar-border/60 bg-sidebar-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-sidebar-primary hover:shadow-md", showNav ? "py-1" : "py-2")}>{inner}</a>
             : <span key={link.label} title={link.value} className={cn("flex flex-col items-center justify-center rounded-xl border border-sidebar-border/60 bg-sidebar-card shadow-sm", showNav ? "py-1" : "py-2")}>{inner}</span>;
        })}
      </div>
    </div>
    {showNav && <nav aria-label="Portfolio sections" className="min-h-0 shrink-0 space-y-0.5">
      {nav.map(([id, label, Icon]) => <button key={id} onClick={() => jump(id)} aria-current={active === id ? "true" : undefined} className={cn("grid w-full grid-cols-[20px_1fr] items-center gap-3 rounded-md px-3 py-1 text-left text-[12px] font-medium transition-colors", active === id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
        <Icon className="size-4 shrink-0" aria-hidden="true" /><span>{label}</span>
      </button>)}
    </nav>}
    <div className={cn("shrink-0", showNav && "hidden")}>
      <Button asChild className="w-full"><a href={cvAsset.url} download="Shouvik-Chaudhuri-CV.pdf"><Download className="size-4" />Download CV</a></Button>
      <div className="mt-3 space-y-1 border-t border-sidebar-border pt-3 text-[11.5px] text-sidebar-foreground/70">
        <a className="flex items-center gap-2 hover:text-sidebar-primary" href="mailto:svk.chaudhuri@gmail.com"><Mail className="size-3.5" />svk.chaudhuri@gmail.com</a>
        <p className="flex items-center gap-2"><MapPin className="size-3.5" />Kolkata, India</p>
      </div>
    </div>
  </div>;
}

function TopNav({ active }: { active: string }) {
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const rows = [nav.slice(0, 7), nav.slice(7)];
  return <div className="sticky top-0 z-20 hidden border-b border-border bg-background/90 backdrop-blur lg:block">
    <nav aria-label="Portfolio sections" className="overflow-hidden px-5 py-2 xl:px-8">
      {rows.map((row, rowIndex) => <div key={rowIndex} className={cn("flex flex-nowrap gap-1", rowIndex === 1 && "mt-1 justify-center")}>
        {row.map(([id, label, Icon]) => <Button key={id} variant="ghost" size="sm" onClick={() => jump(id)} aria-current={active === id ? "true" : undefined} className={cn("h-7 shrink min-w-0 gap-1 px-2 text-[11.5px] xl:px-2.5 xl:text-xs", active === id && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground")}>
          <Icon className="size-3.5 shrink-0" aria-hidden="true" /><span className="whitespace-nowrap">{label}</span>
        </Button>)}
      </div>)}
    </nav>
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
      <img src={sduBg.url} alt="" className="absolute inset-x-0 top-0 h-[62vh] w-full object-cover opacity-[0.3]" />
      <img src={heroBg.url} alt="" className="absolute inset-x-0 bottom-0 h-[55vh] w-full object-cover opacity-[0.22]" />
      <div className="absolute inset-0 bg-background/72 backdrop-blur-[2px]" />
    </div>
    <aside className="fixed inset-y-0 left-0 z-30 hidden h-screen w-[340px] overflow-hidden border-r border-sidebar-border bg-sidebar lg:block"><SidebarContent active={active} /></aside>
    <header className="sticky top-0 z-40 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
      <Button variant="ghost" size="icon" onClick={() => setDrawer(true)} aria-label="Open navigation"><Menu className="size-5" /></Button>
      <span className="truncate text-sm font-bold">Shouvik Chaudhuri, Ph.D.</span>
      <Button asChild variant="outline" size="sm"><a href={cvAsset.url} download><Download className="size-4" /><span className="hidden sm:inline">CV</span></a></Button>
    </header>
    {drawer && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close navigation" className="absolute inset-0 bg-overlay" onClick={() => setDrawer(false)} /><aside className="absolute inset-y-0 left-0 w-[min(88vw,340px)] bg-sidebar shadow-drawer"><Button variant="ghost" size="icon" className="absolute right-3 top-3 z-10" onClick={() => setDrawer(false)} aria-label="Close navigation"><X className="size-5" /></Button><SidebarContent active={active} close={() => setDrawer(false)} showNav /></aside></div>}
    <main className="relative z-10 lg:ml-[340px]">
      <TopNav active={active} />
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
      <CareerGallery />
      <Downloads />
      <Contact />
    </main>
  </div>;
}

function Section({ id, eyebrow, title, children, muted = false }: { id: string; eyebrow: string; title: string; children: React.ReactNode; muted?: boolean }) {
  return <section id={id} className={cn("scroll-mt-20 px-5 py-20 sm:px-10 lg:px-14 xl:px-20", muted && "bg-muted/60")}><div className="mx-auto max-w-6xl"><p className="section-kicker">{eyebrow}</p><h2 className="section-title">{title}</h2><div className="mt-10">{children}</div></div></section>;
}

const typedTerms = ["Fluid Power Systems", "Robotic Manipulators", "Maritime Systems"];
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
  return <section id="home" className="relative scroll-mt-20 overflow-hidden border-b border-border px-5 pb-16 pt-8 sm:px-10 lg:px-14 xl:px-20">
    <div className="hero-grid absolute inset-0 opacity-50" /><div className="relative mx-auto w-full max-w-6xl">
      <p className="section-kicker">Dynamics · Control · Real-time validation</p>
      <h1 className="mt-3 max-w-5xl font-display text-4xl leading-[1.08] text-foreground sm:text-5xl xl:text-6xl">Researcher in Dynamics and Control of <br className="hidden sm:block" /><TypedTerm /></h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">Control engineer with more than twelve years of experience in nonlinear and adaptive control of uncertain dynamical systems, taking ideas from mathematical formulation through MIL, SIL and HIL to purpose-built experimental rigs.</p>
      <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
        {[['7','h-index'],['170','Scholar citations'],['122','WoS citations'],['28','publications']].map(([n,l]) => <div key={l} className="bg-background p-5"><p className="font-display text-3xl text-primary">{n}</p><p className="mt-1 text-xs font-bold uppercase text-muted-foreground">{l}</p></div>)}
      </div>
      <div className="mt-10 grid gap-3 md:grid-cols-3">{["Nonlinear & Adaptive Control", "Safety-critical Control (CLF-CBF-QP)", "Maritime & Electrohydraulic Systems"].map((x) => <div className="flex items-center gap-3 border-l-2 border-highlight py-2 pl-4 text-sm font-bold" key={x}><CheckCircle2 className="size-4 shrink-0 text-primary" />{x}</div>)}</div>
    </div>
  </section>;
}

const profileHighlights = [
  { value: "12+", label: "Years in research", Icon: Clock3 },
  { value: "28", label: "Publications", Icon: BookOpen },
  { value: "1.689M", label: "DKK research grants", Icon: Award },
  { value: "3", label: "Countries represented", Icon: Globe2 },
] as const;


const researchInterests = [
  "Nonlinear control", "Adaptive control", "Optimal and robust control", "Safety-critical control",
  "CLF-CBF-QP filters", "Fluid power systems", "Electrohydraulic actuation",
  "Stewart platforms", "Marine roll stabilisation", "Robotics",
  "Energy systems", "Digital twins", "Real-time HIL", "Engineering and biology",
] as const;


function Profile() { return <Section id="profile" eyebrow="Profile" title="Rigorous research through-lines">
  <div className="max-w-4xl text-[1.03rem] leading-8 text-muted-foreground">
    <p>I am a control engineer with more than twelve years of experience in nonlinear and adaptive control of uncertain dynamical systems. My research connects rigorous mathematical formulation with simulation, MIL, SIL and HIL workflows, and real-time validation on purpose-built experimental rigs.</p>
  </div>
  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    {profileHighlights.map(({ value, label, Icon }) => <article key={label} className="group rounded-md border border-border bg-card/80 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait">
      <div className="flex items-center justify-between gap-3"><p className="font-display text-3xl text-primary">{value}</p><span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="size-4" aria-hidden="true" /></span></div>
      <p className="mt-2 text-xs font-bold uppercase text-muted-foreground">{label}</p>
    </article>)}
  </div>
  <div className="mt-14 grid gap-10 lg:grid-cols-2">
    <div>
      <p className="section-kicker">Core methods</p>
      <h3 className="mt-2 font-display text-3xl">Research Interests</h3>
      <div className="mt-7 flex flex-wrap gap-2">{researchInterests.map((interest) => <span key={interest} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"><Microscope className="size-3.5" aria-hidden="true" />{interest}</span>)}</div>
    </div>
    <div>
      <p className="section-kicker">Roles and responsibilities</p>
      <h3 className="mt-2 font-display text-3xl">Research Leadership</h3>
      <ul className="mt-7 space-y-4 text-sm leading-6 text-muted-foreground">{[
        "Project Manager of SAFEMARVEL, a three-partner consortium spanning SDU, Dacoma ApS and SDU Physics Odense.",
        "Research participant in AMCOSTAR, an international Eurostars / Eureka network project on active marine stabilisation.",
        "Principal Investigator on two competitive grants from the Fabrikant Mads Clausen Fond.",
        "Co-supervised six Master's dissertations and six Bachelor's projects in mechatronics and control.",
        "Internal co-examiner for Master's courses in adaptive and nonlinear control, fault-tolerant control and statistical signal processing.",
        "Grant writer and coordinator on proposals progressing through national and European funding schemes."
      ].map(x => <li key={x} className="flex gap-3"><ChevronRight className="mt-1 size-4 shrink-0 text-primary" />{x}</li>)}</ul>
    </div>
  </div>
</Section>; }

function Research() { return <Section id="research" eyebrow="Research" title="Connected research pillars" muted><div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2 xl:grid-cols-3">{researchPillars.map(([title, text], i) => { const Graphic = pillarGraphics[i]; return <article key={title} className={cn("flex flex-col bg-background p-7", i === 0 && "md:col-span-2 xl:col-span-1")}><span className="font-mono text-xs text-primary">0{i+1}</span><h3 className="mt-4 font-display text-2xl">{title}</h3>{Graphic && <div className="mt-5 overflow-hidden rounded-md border border-border bg-muted/40 p-3"><Graphic className="h-[124px] w-full text-primary" /></div>}<p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p></article>; })}</div><div className="mt-12 grid gap-4 md:grid-cols-2">{["Delivered safety-critical closed-loop control for active marine vessel motion stabilisation.","Specified and commissioned a marine vessel test rig with integrated wave generation.","Engineered a real-time, multi-actuator control architecture for an electrohydraulic quadruped.","Developed vision-based motion sensing on a 700 kg hydraulic Stewart platform.","Established two permanent teaching and research testbeds at SDU as Principal Investigator."].map(x=><p key={x} className="flex gap-3 text-sm leading-6"><CheckCircle2 className="mt-1 size-4 shrink-0 text-highlight" />{x}</p>)}</div></Section>; }

const experiences = [
  { date:"03/2022 - 02/2026", role:"Postdoctoral Researcher - Maritime Control Systems", org:"Centre for Industrial Mechanics, University of Southern Denmark · Sønderborg", projects:[{name:"SAFEMARVEL",url:"https://www.linkedin.com/in/project-safemarvel-4a5362304/",desc:"Safety-critical control framework for roll stabilisation of marine vessels. Project Manager and Research Lead; Den Danske Maritime Fond; SDU, Dacoma ApS and SDU Physics Odense."},{name:"AMCOSTAR",url:"https://www.dacoma.dk/amcostar",desc:"Dynamic Airkeel stabiliser for increasing the capacity of smaller boats through active control. Researcher and Project Participant; Eurostars/Eureka Network and Innovation Fund Denmark."}]},
  { date:"06/2023", role:"Visiting Researcher (Secondment) - PUREWATER", org:"Control Systems Group, TU Ilmenau · Germany", projects:[{name:"MSCA secondment",desc:"Collaborative automation and systems engineering research with Prof. Johann Reger and industry partner KOMPASS GmbH."}]},
  { date:"08/2013 - 02/2022", role:"Research Fellow - Robotics & Electrohydraulic Control", org:"Hydraulics Laboratory, Jadavpur University · Kolkata", projects:[{name:"CARS",desc:"Real-time multi-actuator control for an autonomous quadruped torso. Sponsored by CAIR, DRDO; 12/2015–02/2022."},{name:"DARO",desc:"High-frequency real-time tracking for linear servo actuation, including a 700 kg Stewart platform. Sponsored by AR&DB, DRDO; 08/2013–12/2015."}]},
  { date:"07/2012 - 06/2013", role:"Masters GATE Fellow", org:"Instrumentation & Control Division, BARC · Mumbai", projects:[{name:"Nuclear reactor modelling",desc:"First-principles pressurised water reactor and regulating-system models in MATLAB/Simulink, with Lyapunov stability analysis."}]},
];
function Experience() { return <Section id="experience" eyebrow="Experience" title="Theory to Implementation"><div className="relative space-y-12 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-border">{experiences.map(e=><article key={e.role} className="relative pl-10"><span className="absolute left-0 top-1.5 size-[15px] rounded-full border-4 border-background bg-primary" /><p className="font-mono text-xs font-bold text-primary">{e.date}</p><h3 className="mt-2 font-display text-2xl">{e.role}</h3><p className="mt-1 text-sm font-semibold text-muted-foreground">{e.org}</p><div className="mt-5 grid gap-3 md:grid-cols-2">{e.projects.map(p=>{const inner=<><p className="flex items-center gap-2 text-sm font-extrabold text-primary">{p.name}{"url" in p&&p.url?<ExternalLink className="size-3.5" aria-hidden="true" />:null}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{p.desc}</p></>;return "url" in p&&p.url?<a key={p.name} href={p.url} target="_blank" rel="noreferrer" className="block rounded-md border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait">{inner}</a>:<div key={p.name} className="rounded-md border border-border bg-card p-5">{inner}</div>;})}</div></article>)}</div></Section>; }

function Funding() {
  const funded = [
    ['SAFEMARVEL', 'Den Danske Maritime Fond · 2023-116 / 3410157 · 03/2024–02/2026', '1,489,000 DKK', 'Research Lead and Project Manager · Completed'],
    ['Advanced servo motor control system', 'Fabrikant Mads Clausen Fond · 3410254 · 01/2025–02/2026', '100,000 DKK', 'Principal Investigator · Completed'],
    ['RACHP training system', 'Fabrikant Mads Clausen Fond · 3410089 · 01/2024–12/2025', '100,000 DKK', 'Principal Investigator · Completed'],
    ['International mobility and travel', 'Otto Mønsteds Fond · INCOM 2026, India', '7,500 DKK', 'Main applicant'],
  ];
  const proposals = [
    ['MERLIN: Marine Environmental Remediation Learning Integrated Navigator', 'Lead applicant', 'Progressed to Phase 2'],
    ['Smart energy management and power flow optimisation for maritime energy hubs', 'Project participant', 'Under preparation'],
    ['Smart power flow optimisation for megawatt supercharging', 'Co-developer', 'Waitlisted'],
    ['Motion-stabilised safe room for reducing motion sickness', 'Co-developer', 'Not funded'],
  ];
  return <Section id="funding" eyebrow="Funding" title="Research Funding" muted>
    <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground"><BadgeCheck className="size-5" aria-hidden="true" /></span><div><h3 className="font-display text-2xl">Funded Research Grants</h3><p className="mt-1 text-sm text-muted-foreground">Awarded grants and mobility support.</p></div></div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{funded.map(([name, source, amount, role]) => <article className="rounded-md border border-primary/20 bg-background p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait" key={name}>
      <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-xs font-bold uppercase text-primary">{amount}</p><span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary"><CheckCircle2 className="size-3" aria-hidden="true" />Awarded</span></div>
      <h4 className="mt-3 font-display text-xl">{name}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{source}</p><p className="mt-4 text-xs font-semibold">{role}</p>
    </article>)}</div>
    <div className="mt-14 border-t border-border pt-9"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full border border-primary/30 bg-background text-primary"><Clock3 className="size-5" aria-hidden="true" /></span><div><h3 className="font-display text-2xl">Proposals in Pipeline / Not Funded</h3><p className="mt-1 text-sm text-muted-foreground">Submitted, developing, waitlisted, and concluded proposals.</p></div></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">{proposals.map(([name, role, status]) => <article key={name} className="rounded-md border border-border bg-card/60 p-6 transition-colors hover:border-primary/50"><div className="flex items-start justify-between gap-4"><Clock3 className="mt-1 size-4 shrink-0 text-highlight" aria-hidden="true" /><span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-bold text-muted-foreground">{status}</span></div><h4 className="mt-4 font-display text-xl leading-snug">{name}</h4><p className="mt-3 text-xs font-semibold text-primary">{role}</p></article>)}</div>
    </div>
  </Section>;
}

function Education() { const ed=[['Ph.D. (Engineering)','07/2015 - 11/2021','Jadavpur University · CGPA 10.00/10.00 · EQF 8','Developing Electrohydraulic System Solutions using Adaptive-Neuro-Sliding Mode Control and Vision Sensing.'],['M.E. in Nuclear Engineering','08/2011 - 07/2013','Jadavpur University · CGPA 9.02/10.00 (86.28%) · EQF 7','Compact Pressurized Water Reactor Modelling, carried out at BARC Mumbai.'],['B.Tech in Electrical Engineering','08/2007 - 06/2011','Seacom Engineering College, WBUT · DGPA 8.73/10.00 · EQF 6','Control Systems, electrical machines, electromagnetic field theory, microprocessors and digital signal processing.'],['Higher Secondary (Class XII), CBSE','April 2006','Kendriya Vidyalaya Ballygunge · 87.20%','Physics, Chemistry, Mathematics, Biology and English.'],['Secondary (Class X), CBSE','April 2004','Kendriya Vidyalaya Ballygunge · 90.60%','Science, Mathematics, Social Science, English and Hindi.']]; return <Section id="education" eyebrow="Education" title="Academic foundations"><div className="space-y-4">{ed.map(([degree,date,school,detail])=><article key={degree} className="grid gap-4 border-b border-border py-6 md:grid-cols-[180px_1fr]"><p className="font-mono text-xs font-bold text-primary">{date}</p><div><h3 className="font-display text-2xl">{degree}</h3><p className="mt-1 text-sm font-semibold">{school}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p></div></article>)}</div></Section>; }

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
  return <Section id="publications" eyebrow="Publications" title="Searchable body of work" muted><div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Publication category">{Object.entries(categoryCounts).map(([c,n])=><Button key={c} size="sm" variant={category===c?"default":"outline"} onClick={()=>setCategory(c)} role="tab" aria-selected={category===c}>{c} <span className="opacity-60">{n}</span></Button>)}</div>{category==="Theses & Dissertations"?<div className="mt-6"><Theses /></div>:<><div className="mt-5 grid gap-3 sm:grid-cols-[1fr_150px_auto]"><label className="relative"><span className="sr-only">Search publications</span><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search title, author, venue or DOI" /></label><label><span className="sr-only">Filter by year</span><select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={year} onChange={e=>setYear(e.target.value)}><option>All</option>{years.map(y=><option key={y}>{y}</option>)}</select></label><Button variant="ghost" onClick={()=>{setQuery("");setYear("All");setCategory("All")}}><SlidersHorizontal className="size-4" />Clear</Button></div><p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{filtered.length} result{filtered.length===1?"":"s"}</p><div className="mt-4 space-y-3">{filtered.map((p,i)=><article className="rounded-md border border-border bg-background p-5 sm:p-6" key={`${p.title}-${p.year}`}><div className="grid gap-4 sm:grid-cols-[48px_1fr_auto]"><span className="font-mono text-xs text-muted-foreground">{String(i+1).padStart(2,'0')}</span><div className="min-w-0"><p className="text-sm leading-6 text-muted-foreground"><HighlightAuthors text={p.authors} /></p><h3 className="mt-2 font-display text-xl leading-snug">“{p.title}”</h3><p className="mt-3 text-sm font-semibold italic">{p.venue}</p><p className="mt-1 text-xs text-muted-foreground">{p.details}</p></div><div className="flex items-start sm:justify-end">{p.doi?<a href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground">DOI <ExternalLink className="size-3" /></a>:<span className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">DOI not listed</span>}</div></div></article>)}{filtered.length===0&&<div className="border border-dashed border-border py-16 text-center text-muted-foreground">No publications match these filters.</div>}</div></>}</Section>;
}

const masters=[['Flow-Controlled Underfloor Heating Using PCM-Assisted Flow Wall Systems','Bragi Sigurjónsson · 2026'],['Amfitrack EMF Data Fusion','Frej Karlinsky Scherfig · 2025'],['Development of Trajectory Generation Algorithms for CNC Foam Cutting Machines','Arnas Serva · 2025'],['Autonomous Aerial Mapping and SLAM: A Drone-Based Approach for 3D Environmental Reconstruction','David Milošević · 2025'],['Design and Development of a Diesel Dosing Unit for Active Regeneration of DPF Filters in Exhaust After-Treatment Systems','Arfeen Ahmed Ali · 2025'],['Verification and Validation of Custom Code Generation from Model-Based Design using Simulink','Jacob Thomas Puthukeril · 2023']];
const bachelors=[['Development of a Simulation-Based Sales Tool: Quantifying Efficiency Gains of PVG Nova vs. PVG 32','Jana Aly and Jakub Edward Brodzinski · 2026'],['Modelling and Control of a Time-Pressure Membrane Valve System for Pharmaceutical Filling','Einar Benjamin Jensen · 2026'],['Modelling and Control of Propeller-Drive Systems with Nonlinear Dynamics for Marine Applications','Laura Zanón Barney · 2026'],['Orientation Estimation and Control for Thruster-Assisted Wind Turbine Installation','Henrik Maarten Bongers · 2026'],['Active Yaw Control for Vehicle Handling and Stability with Torque Vectoring','Zofia Roza Gniewosz · 2025'],['Design and Development of a Semi-Active Magnetorheological Suspension for Automotive and Motorsport Applications','Lucas Fernández Schelstraete · 2024']];
function ThesisList({title,items}:{title:string;items:string[][]}) { return <div><h3 className="font-display text-2xl">{title} <span className="font-sans text-sm text-primary">06</span></h3><ol className="mt-5 space-y-4">{items.map(([name,person],i)=><li key={name} className="grid grid-cols-[24px_1fr] gap-3 text-sm"><span className="font-mono text-xs text-primary">{i+1}.</span><span><strong>{name}</strong><span className="mt-1 block text-muted-foreground">{person}</span></span></li>)}</ol></div>; }
const courses: { code: string; text: string; url?: string }[] = [
  { code: 'XCOS', text: 'Experimental Control Systems · MSc Mechatronics · 5 ECTS · Spring 2023–2025 · Lecturer', url: 'https://odin.sdu.dk/sitecore/index.php?a=fagbesk&id=115633&lang=en' },
  { code: 'EXT', text: 'Expert in Teams · BSc · 10 ECTS · Fall 2023–2025 · Teacher and Supervisor' },
  { code: 'SPRO4ME', text: 'Mechanical Semester Project, Hydraulic Power Systems · BSc · 10 ECTS · Spring 2025 · Co-lecturer' },
  { code: 'CoE1', text: 'Control Engineering 1 · BSc · 5 ECTS · Spring 2024 · Co-lecturer' },
];
function Teaching() { return <Section id="teaching" eyebrow="Teaching" title="Teaching & Supervision"><div><h3 className="font-display text-2xl">Course Teaching</h3><div className="mt-5 grid gap-4 md:grid-cols-2">{courses.map(c=>{const inner=<><p className="flex items-center gap-1.5 font-mono text-xs font-bold text-primary">{c.code}{c.url&&<ExternalLink className="size-3.5" aria-hidden="true" />}</p><p className="mt-2 text-sm leading-6">{c.text}</p></>;return c.url?<a key={c.code} href={c.url} target="_blank" rel="noreferrer" className="block rounded-md border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait">{inner}</a>:<div className="rounded-md border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait" key={c.code}>{inner}</div>;})}</div><p className="mt-5 text-sm text-muted-foreground">Teaching assistant: Control of Autonomous Systems (Autumn 2022) and Construct Mechatronics (Spring 2022).</p></div><div className="mt-14 border-t border-border pt-8"><h3 className="font-display text-3xl">Student Supervision</h3><p className="mt-2 text-sm text-muted-foreground">Six Master's dissertations and six Bachelor's projects.</p><div className="mt-8 grid gap-12 lg:grid-cols-2"><ThesisList title="Master's dissertations" items={masters}/><ThesisList title="Bachelor's projects" items={bachelors}/></div></div><div className="mt-14 border-t border-border pt-8"><h3 className="font-display text-3xl">Examination &amp; Assessment</h3><article className="mt-5 rounded-md border border-border bg-card p-6"><p className="text-sm font-extrabold text-primary">Internal co-examiner · University of Southern Denmark</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Master's courses: Adaptive and Nonlinear Control, Fault-Tolerant Control, and Statistical Signal Processing.</p></article></div></Section>; }

function Skills() { return <Section id="skills" eyebrow="Technical skills" title="Technical Skills" muted>
  <div>
    <h3 className="font-display text-2xl">Engineering &amp; Technical Competencies</h3>
    <div className="mt-5 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">{skills.map(([t,d])=><article className="bg-background p-6" key={t}><h3 className="text-sm font-extrabold text-primary">{t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</div>
  </div>
  <div className="mt-12 border-t border-border pt-8">
    <h3 className="font-display text-2xl">Languages &amp; Communication</h3>
    <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">{languages.map((l)=>(<div key={l.name} className="group flex flex-col items-center rounded-xl border border-border bg-card/60 p-4 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-portrait"><div className="flex size-16 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/5 font-display text-xl text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">{l.level}</div><p className="mt-3 text-sm font-semibold"><span className="mr-1.5" aria-hidden="true">{l.flag}</span>{l.name}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{l.note}</p>{l.certUrl && <a href={l.certUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"><ExternalLink className="size-3" aria-hidden="true" /> View Certificate</a>}</div>))}</div>
  </div>
</Section>; }

const reviews: [string, string][] = [['IEEE/ASME Transactions on Mechatronics','14'],['IEEE Transactions on Instrumentation and Measurement','10'],['IEEE Transactions on Vehicular Technology','9'],['IEEE I2MTC','6'],['IEEE Sensors Journal','3'],['Control Engineering Practice','3'],['Proc. IMechE, Part C','2'],['Computers and Electronics in Agriculture','2'],['IEEE JESTIE','2'],['Sādhanā','1'],['Journal of the Brazilian Society of Mechanical Sciences and Engineering','1'],['IEEE Open Journal of Instrumentation and Measurement','1'],['IEEE IAS Publications','1']];

type Language = { level: string; flag: string; name: string; note: string; certUrl?: string; certFile?: string };
const languages: readonly Language[] = [
  { level: "C1", flag: "\u{1F1EC}\u{1F1E7}", name: "English", note: "Professional (British Council certified)", certUrl: englishCertAsset.url, certFile: "British_Council_Certificate_2020.pdf" },
  { level: "C2", flag: "\u{1F1EE}\u{1F1F3}", name: "Hindi", note: "Native" },
  { level: "C2", flag: "\u{1F1EE}\u{1F1F3}", name: "Bengali", note: "Native" },
  { level: "A1", flag: "\u{1F1E9}\u{1F1F0}", name: "Danish", note: "Basic", certUrl: danishCertAsset.url, certFile: "Shouvik_Chaudvik_modultestbevis_3.1.pdf" },
  { level: "A0", flag: "\u{1F1E9}\u{1F1EA}", name: "German", note: "Beginner (Just started / In progress)" },
];


function Service() { return <Section id="service" eyebrow="Service" title="Professional standing and peer review"><div className="grid gap-10 lg:grid-cols-2"><div><h3 className="font-display text-2xl">Memberships & honours</h3><div className="mt-5 space-y-4">{[['Senior Member, IEEE','Elevated 2026 · member since 2016 · ID 90902393'],['Member, IET','ID 1101020475 · pursuing CEng status'],['Member & Chartered Engineer (India), IE(I)','ID M-1848040'],['Associate Member, INAE','Application under review, 2026'],['IEEE COVID-19 App Development Contest','Winner, 2020 · CovCov mobile application']].map(([a,b])=><div key={a} className="border-l-2 border-highlight pl-4"><p className="font-semibold">{a}</p><p className="text-sm text-muted-foreground">{b}</p></div>)}</div></div><div><div className="flex items-end justify-between"><h3 className="font-display text-2xl">Verified peer review</h3><p className="font-display text-4xl text-primary">55</p></div><p className="mt-2 text-sm text-muted-foreground">Reviews of 42 manuscripts · September 2015–September 2026</p><div className="mt-5 divide-y divide-border border-y border-border">{reviews.map(([a,n])=><div key={a} className="grid grid-cols-[1fr_auto] gap-3 py-2.5 text-xs"><span>{a}</span><strong className="text-primary">{n}</strong></div>)}</div></div></div></Section>; }

type CareerMoment = { id: string; title: string; tag: string; src: string; alt: string; featured?: boolean };
const builtInCareerMoment: CareerMoment = {
  id: "sdu-sonderborg",
  title: "SDU Sønderborg",
  tag: "Campus and Als Fjord · Maritime control research",
  src: sduBg.url,
  alt: "University of Southern Denmark campus beside Als Fjord",
  featured: true,
};
const careerStorageKey = "shouvik-career-moments";

function CareerGallery() {
  const [moments, setMoments] = useState<CareerMoment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(careerStorageKey);
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setMoments(parsed.filter((item): item is CareerMoment => Boolean(item && typeof item === "object" && "id" in item && "src" in item && "title" in item && typeof item.id === "string" && typeof item.src === "string" && typeof item.title === "string")));
      }
    } catch {
      window.localStorage.removeItem(careerStorageKey);
    }
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setDialogOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [dialogOpen]);

  const addPhoto = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanTag = tag.trim();
    let cleanUrl = "";
    try {
      const parsedUrl = new URL(imageUrl.trim());
      if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") throw new Error();
      cleanUrl = parsedUrl.toString();
    } catch {
      setError("Enter a valid image URL beginning with http:// or https://.");
      return;
    }
    if (!cleanTitle) {
      setError("Add a title or caption for this photo.");
      return;
    }
    const next = [...moments, { id: `${Date.now()}-${cleanTitle.slice(0, 20)}`, title: cleanTitle, tag: cleanTag, src: cleanUrl, alt: cleanTitle }];
    setMoments(next);
    window.localStorage.setItem(careerStorageKey, JSON.stringify(next));
    setImageUrl(""); setTitle(""); setTag(""); setError(""); setDialogOpen(false);
  };

  const allMoments = [builtInCareerMoment, ...moments];
  return <Section id="gallery" eyebrow="Career Gallery" title="Career Moments" muted>
    <div className="mb-6 flex justify-end"><Button onClick={() => { setError(""); setDialogOpen(true); }}><ImagePlus className="size-4" aria-hidden="true" />Add Photo</Button></div>
    <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
      {allMoments.map((moment, index) => <figure key={moment.id} className={cn("group relative overflow-hidden rounded-2xl border border-border bg-card", moment.featured ? "md:col-span-2 md:row-span-2" : index % 3 === 1 ? "md:row-span-2" : "")}><img src={moment.src} alt={moment.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><figcaption className="absolute inset-x-0 bottom-0 bg-overlay px-5 py-4 text-primary-foreground backdrop-blur-sm"><p className="font-display text-xl">{moment.title}</p>{moment.tag && <p className="mt-1 text-xs opacity-80">{moment.tag}</p>}</figcaption></figure>)}
    </div>
    {dialogOpen && <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <Button variant="ghost" aria-label="Close add photo dialog" className="absolute inset-0 h-auto w-full rounded-none bg-overlay hover:bg-overlay" onClick={() => setDialogOpen(false)} />
      <div role="dialog" aria-modal="true" aria-labelledby="add-photo-title" className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-drawer">
        <div className="flex items-start justify-between gap-4"><div><h3 id="add-photo-title" className="font-display text-2xl">Add a career photo</h3><p className="mt-1 text-sm text-muted-foreground">Add a hosted image to this gallery.</p></div><Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)} aria-label="Close dialog"><X className="size-5" /></Button></div>
        <form className="mt-6 space-y-4" onSubmit={addPhoto}>
          <label className="block text-sm font-semibold">Image URL<input type="url" required maxLength={2048} value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://example.com/photo.jpg" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
          <label className="block text-sm font-semibold">Title or caption<input required maxLength={100} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Research testbed demonstration" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
          <label className="block text-sm font-semibold">Year or tag <span className="font-normal text-muted-foreground">(optional)</span><input maxLength={60} value={tag} onChange={(event) => setTag(event.target.value)} placeholder="2025 · SDU Laboratory" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
          {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
          <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit"><ImagePlus className="size-4" />Add Photo</Button></div>
        </form>
      </div>
    </div>}
  </Section>;
}

const downloadCards = [
  { title: "Academic CV", note: "Complete academic record · Version 2 · 13 September 2026 · PDF", url: cvAsset.url, file: "Shouvik_Chaudhuri_CV_Master_v2.pdf" },
  { title: "Complete List of Publications", note: "All journal, conference, book and chapter entries · Version 2 · PDF", url: pubListAsset.url, file: "Shouvik_Chaudhuri_Publication_List_v2.pdf" },
];
function Downloads() { return <Section id="downloads" eyebrow="Downloads" title="Documents" muted><div className="grid gap-4 md:grid-cols-2">{downloadCards.map(d=><article key={d.title} className="flex flex-col rounded-md border border-border bg-background p-7 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait"><FileText className="size-7 text-primary" aria-hidden="true" /><h3 className="mt-4 font-display text-2xl">{d.title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{d.note}</p><Button asChild className="mt-6 w-fit"><a href={d.url} download={d.file}><Download className="size-4" />Download PDF</a></Button></article>)}</div></Section>; }

function Contact() { return <Section id="contact" eyebrow="Contact" title="Connect and collaborate"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="max-w-md text-lg leading-8 text-muted-foreground">For research collaboration, academic opportunities and technical discussions in dynamics and control.</p><Button asChild className="mt-7"><a href="mailto:svk.chaudhuri@gmail.com"><Mail className="size-4" />Send an email</a></Button><div className="mt-7 space-y-2 text-sm"><p>+91 90380 43252</p><p>Kolkata, India</p></div></div><div className="grid gap-3 sm:grid-cols-2">{brandLinks.map(link=>{const inner=<><span className="grid size-11 shrink-0 place-items-center rounded-md border border-border bg-card"><BrandMark link={link} className="size-6" /></span><span className="min-w-0"><span className="flex items-center gap-1.5 text-sm font-bold">{link.label}{link.url&&<ExternalLink className="size-3.5 text-muted-foreground group-hover:text-primary" />}</span><span className="mt-0.5 block break-all text-xs text-muted-foreground">{link.value}</span></span></>;return link.url?<a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-md border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-portrait">{inner}</a>:<div key={link.label} className="flex items-center gap-3 rounded-md border border-border p-4">{inner}</div>;})}</div></div><footer className="mt-20 border-t border-border pt-6 text-xs text-muted-foreground">© 2026 Shouvik Chaudhuri, Ph.D. · Academic portfolio</footer></Section>; }