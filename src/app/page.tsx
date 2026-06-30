"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, ImagePlus, Layers3, Moon, MousePointer2, Move, Sun } from "lucide-react";
import { templates } from "@/data/templates";
import pelindoLogo from "@/assets/pelindo.png";

export default function Home() {
  const [theme,setTheme]=useState<"light"|"dark">("light");
  useEffect(()=>{const saved=localStorage.getItem("birthday-studio-theme");if(saved==="dark"||saved==="light")queueMicrotask(()=>setTheme(saved))},[]);
  const toggleTheme=()=>setTheme(current=>{const next=current==="light"?"dark":"light";localStorage.setItem("birthday-studio-theme",next);document.documentElement.dataset.theme=next;return next});
  return <main className={`clay-landing grid-bg min-h-screen overflow-hidden ${theme==="dark"?"clay-dark":""}`}>
    <nav className="clay-nav mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <div className="flex items-center gap-3"><span className="pelindo-brand-mark grid size-11 place-items-center rounded-xl"><Image src={pelindoLogo} alt="Logo Pelindo" className="size-8 object-contain" priority/></span><div><b className="landing-brand-title block tracking-wide">Pelindo TPK Ambon</b><span className="text-[10px] tracking-[.18em] text-[#168ed1]">BIRTHDAY STUDIO BY </span><motion.span animate={{y:[0,-1.5,0],textShadow:["0 0 0 rgba(0,194,255,0)","0 0 10px rgba(0,194,255,.8)","0 0 0 rgba(0,194,255,0)"]}} transition={{duration:2.4,repeat:Infinity,ease:"easeInOut"}} className="creator-credit inline-block text-[10px] font-bold tracking-[.16em]">CHAIRIL ALI</motion.span></div></div>
      <div className="flex items-center gap-3"><button onClick={toggleTheme} aria-label={theme==="light"?"Aktifkan dark mode":"Aktifkan light mode"} title={theme==="light"?"Dark mode":"Light mode"} className="clay-theme-toggle grid size-11 place-items-center rounded-2xl">{theme==="light"?<Moon size={18}/>:<Sun size={19}/>}</button><Link href="/editor" className="clay-pill rounded-full px-5 py-2.5 text-sm font-medium">Buka editor</Link></div>
    </nav>
    <section className="mx-auto grid min-h-[calc(100vh-108px)] max-w-7xl items-center gap-12 px-6 pb-14 pt-8 lg:grid-cols-[.92fr_1.08fr] lg:px-10">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.65}} className="relative z-10">
        <h1 className="clay-hero-title mt-4 max-w-2xl text-5xl font-bold leading-[1.04] tracking-[-.05em] sm:text-6xl xl:text-[4.35rem]">Momen mereka.<br/><span>Desain kebanggaan kita.</span></h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-[#476982] sm:text-lg">Dari foto sederhana menjadi ucapan yang layak dikenang. Susun, gerakkan, dan personalisasi setiap elemen langsung di kanvas.</p>
        <div className="mt-9 flex flex-wrap items-center gap-4"><Link href="/editor" className="clay-primary flex items-center gap-3 rounded-2xl px-7 py-4 font-semibold transition">Mulai berkreasi <ArrowRight size={19}/></Link><span className="flex items-center gap-2 px-2 text-sm text-[#56758d]"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70"/><span className="relative size-2 rounded-full bg-emerald-500"/></span>Gratis • tanpa login</span></div>
        <div className="mt-11 grid max-w-xl grid-cols-3 gap-4">{[[ImagePlus,"Foto & logo"],[Move,"Drag bebas"],[Download,"Export tajam"]].map(([Icon,label],index)=><motion.div whileHover={{y:-5,rotate:index===1?1:-1}} key={String(label)} className="clay-feature rounded-2xl p-4 text-sm"><Icon className="mb-3" size={20}/><b className="block text-sm">{String(label)}</b><span className="mt-1 block text-[10px] opacity-60">{["Miliki ceritanya","Atur sesukamu","Siap dibagikan"][index]}</span></motion.div>)}</div>
      </motion.div>
      <HeroShowcase/>
    </section>
  </main>;
}

function HeroShowcase(){
  const showcase=templates.filter(template=>template.image).slice(0,3);
  const [active,setActive]=useState(0);
  useEffect(()=>{const timer=window.setInterval(()=>setActive(value=>(value+1)%showcase.length),4200);return()=>window.clearInterval(timer)},[showcase.length]);
  const current=showcase[active];
  return <motion.div initial={{opacity:0,scale:.92,x:35}} animate={{opacity:1,scale:1,x:0}} transition={{duration:.8,delay:.1}} className="hero-showcase relative mx-auto w-full max-w-[620px] py-8">
    <div className="hero-orbit hero-orbit-one"/><div className="hero-orbit hero-orbit-two"/>
    <motion.div animate={{rotate:[-8,-6,-8],y:[0,-7,0]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}} className="hero-back-card hero-back-left"/>
    <motion.div animate={{rotate:[8,10,8],y:[0,8,0]}} transition={{duration:7,repeat:Infinity,ease:"easeInOut"}} className="hero-back-card hero-back-right"/>
    <div className="clay-preview hero-preview relative mx-auto w-[72%] max-w-[420px]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{opacity:0,scale:1.08,filter:"blur(8px)"}} animate={{opacity:1,scale:1,filter:"blur(0px)"}} exit={{opacity:0,scale:.96,filter:"blur(5px)"}} transition={{duration:.6}} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${current.image})`}}/>
        </AnimatePresence>
        <div className="hero-scan-line"/>
        <motion.div key={`copy-${active}`} initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{delay:.28}} className="absolute inset-x-[5%] top-[12%] text-center">
          <p style={{fontFamily:"Great Vibes",color:current.tone==="light"?"#005bac":"white"}} className="text-[clamp(25px,4vw,42px)] leading-tight drop-shadow-lg">Selamat Ulang Tahun</p>
          <h3 style={{color:current.tone==="light"?"#06335b":"#f6c453"}} className="mt-2 text-[clamp(11px,1.8vw,19px)] font-bold tracking-[.22em]">INSAN PELINDO</h3>
        </motion.div>
        <motion.div animate={{x:[-4,5,-4],y:[0,-5,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut"}} className="absolute left-1/2 top-[42%] h-[29%] w-[42%] -translate-x-1/2 overflow-hidden rounded-t-[50%] rounded-b-[16%] border-[3px] border-cyan-300 bg-[#0b3655]/85 shadow-[0_10px_30px_#001b33aa,0_0_20px_#00c2ff66]">
          <div className="grid h-full place-items-center"><div className="hero-avatar"><span/><span/></div></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="absolute bottom-[8%] left-[8%] right-[8%] rounded-xl border border-white/15 bg-[#03172d]/70 px-4 py-3 text-center text-[9px] leading-4 text-white/80 backdrop-blur-md">Sehat, bahagia, dan sukses dalam setiap langkah.</motion.div>
      </div>
    </div>
    <motion.div animate={{x:[0,12,0],y:[0,-7,0]}} transition={{duration:4.5,repeat:Infinity,ease:"easeInOut"}} className="hero-float-badge hero-badge-top"><MousePointer2 size={15}/><span><b>Live canvas</b><small>Drag every layer</small></span></motion.div>
    <motion.div animate={{y:[0,8,0]}} transition={{duration:3.8,repeat:Infinity,ease:"easeInOut"}} className="hero-float-badge hero-badge-bottom"><Layers3 size={16}/><span><b>{current.name}</b><small>{current.width} × {current.height} px</small></span></motion.div>
    <div className="hero-template-switcher">{showcase.map((template,index)=><button key={template.id} onClick={()=>setActive(index)} aria-label={`Lihat ${template.name}`} className={index===active?"active":""}><span style={{backgroundImage:`url(${template.image})`}}/><i/></button>)}</div>
  </motion.div>;
}
