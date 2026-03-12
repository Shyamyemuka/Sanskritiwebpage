"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ShaderBackground from "@/components/ui/hero";

/* ───────────────────────── Animated Section Wrapper ───────────────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.section>
  );
}

/* ───────────────────────── Counter Animation ───────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-primary">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Shader background behind everything */}
      <ShaderBackground />

      {/* ────────── Navigation ────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 backdrop-blur-md bg-[#FFDAB9]/70">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-16 h-12 rounded-xl overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors shadow-md">
              <Image
                src="/culturallogo.jpeg"
                alt="Sanskriti Forum Logo"
                width={64}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-primary uppercase hidden sm:inline">
              Sanskriti Forum
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            <a
              className="text-sm font-semibold hover:text-primary transition-colors relative group"
              href="#about">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors relative group"
              href="#events">
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
            <a
              className="text-sm font-semibold hover:text-primary transition-colors relative group"
              href="#gallery">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu">
            <motion.span
              className="block w-6 h-0.5 bg-primary rounded"
              animate={
                mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
              }
            />
            <motion.span
              className="block w-6 h-0.5 bg-primary rounded"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-primary rounded"
              animate={
                mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
              }
            />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <motion.div
          className="md:hidden overflow-hidden border-t border-primary/10"
          initial={false}
          animate={
            mobileMenuOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}>
          <nav className="flex flex-col px-6 py-4 gap-4 bg-[#FFDAB9]/90 backdrop-blur-md">
            <a
              className="text-sm font-semibold hover:text-primary"
              href="#about"
              onClick={() => setMobileMenuOpen(false)}>
              About Us
            </a>
            <a
              className="text-sm font-semibold hover:text-primary"
              href="#events"
              onClick={() => setMobileMenuOpen(false)}>
              Events
            </a>
            <a
              className="text-sm font-semibold hover:text-primary"
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </a>
          </nav>
        </motion.div>
      </header>

      <main className="flex-1 relative z-10">
        {/* ────────── Hero Section ────────── */}
        <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 blur-3xl bg-primary" />
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="flex flex-col gap-8 max-w-2xl"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  Est. 2024 • Global Community
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
                Celebrating{" "}
                <span className="text-gradient-gold italic">Culture</span>,
                Inspiring{" "}
                <span className="text-primary underline decoration-2 underline-offset-8">
                  Innovation
                </span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-lg">
                A premier cultural club where heritage meets the future. Join us
                in preserving traditions through modern innovation and global
                connectivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  className="px-8 py-4 bg-primary text-peach-light font-bold rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}>
                  Join the Forum{" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </motion.button>
                <motion.button
                  className="px-8 py-4 bg-primary/10 text-primary border border-primary/20 font-bold rounded-xl hover:bg-primary/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}>
                  Explore Archive
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
              <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
                <Image
                  src="/culturalmascotstransparent.png"
                  alt="Cultural Mascot"
                  width={800}
                  height={800}
                  className="w-full h-auto max-w-full object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────── Stats Section (NEW) ────────── */}
        <AnimatedSection className="py-16">
          <div className="container mx-auto px-6">
            <div className="glass-card rounded-3xl p-10 md:p-14">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: 12000, suffix: "+", label: "Active Members" },
                  { value: 150, suffix: "+", label: "Events Hosted" },
                  { value: 35, suffix: "", label: "Cities Worldwide" },
                  { value: 50, suffix: "+", label: "Cultural Partners" },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ────────── Upcoming Events ────────── */}
        <AnimatedSection id="events" className="py-24">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  Upcoming Events
                </h2>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
              <a
                className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform"
                href="#">
                View all events{" "}
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Event Card 1 */}
              <motion.div
                className="group bg-peach/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="aspect-video relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDKapqsq0vnLnPXj9pUGl8Uo4STDNVfr_J4-ylML7FQx3ZqWeLoAT1zsTnfBtusLgUFccDnrCqzzeanusGBP3YnLEq4-ckmEE2A1-vxolxyPlCp8RiecEx9a1hBPCdu6E0mvxcYnPERRHtjzVYe5nYnU3Ek5YscRpPONwo2qNxoJ5nLnZEWuyBclz6f9I_JqbuKBm_GqyXGRDBQzWoMdNlVWTXdPvJPwG-5WRqrtLAQXNU3-rLKUvPdonRfkktlPa41Fr5BP2eCsHDk')",
                    }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-background-dark text-white rounded text-xs font-bold uppercase tracking-widest">
                    Dec 15
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    Sanskriti Nights 2024
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    Experience the harmony of sitar and synth as modern
                    electronic music blends with classical Indian strings.
                  </p>
                  <button className="w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-peach-light transition-all flex items-center justify-center gap-2 cursor-pointer">
                    Book Tickets{" "}
                    <span className="material-symbols-outlined text-sm">
                      confirmation_number
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Event Card 2 */}
              <motion.div
                className="group bg-peach/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="aspect-video relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5GmH-RA1Vd2bRfa-Q0juvGd07C4I6tBVc6hs1uICKbU0l2L-Ar4xlctA8KssmS7WcBmoEZZHi3NJjk3EQLtOva64ZLs-WLIFhBUegb8PfHEQUAZ9h3Y6Oqnjro3THyWIvQID5I-kAUNerBdpqoUSvyOP-71OECSt2kMFy-axZBtK8or8D1cR8yTmNPcuf-1_HnIXFyWaflTda88hMqP4szZPsHv874iCxq7Xz0g2Ag2CI-9go3qXpC8gpR7Flk96-8cRo96Gj3iQS')",
                    }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-background-dark text-white rounded text-xs font-bold uppercase tracking-widest">
                    Jan 12
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    Crafting Tomorrow
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    A workshop where traditional pottery meets 3D printing,
                    exploring the next era of artisanal craftsmanship.
                  </p>
                  <button className="w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-peach-light transition-all flex items-center justify-center gap-2 cursor-pointer">
                    Book Tickets{" "}
                    <span className="material-symbols-outlined text-sm">
                      confirmation_number
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Event Card 3 */}
              <motion.div
                className="group bg-peach/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-primary/10 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/10"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="aspect-video relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqsEkHa7hMKIc6AY1CNcRRXXvsL9OkahCL80K_6o197f6cQSuUNwDhclQyVkpIQ5csRPyi9pdG7jJ9bGr3x8VI_RgZpVEr7Rn7_9Y9vXNTGeU3r3xxHzi2xIn3Cv8CzLiZJ4MMYWc1Pzo5F2wqkRiaspJgMnB7B8RyIpRmSFyiWyUWc7vYFBuiLwnkdmGm8k-hUYO_sUU36kA7c8YqBF7KsiNGM1WT8SaYgpn0i6sa-SBnPLN2YOBk2uFm38cjsM19UyJpaE9Re1NU')",
                    }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-background-dark text-white rounded text-xs font-bold uppercase tracking-widest">
                    Feb 05
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    Virtual Vedika
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    A digital journey through ancient architecture using
                    immersive VR technology to rediscover lost heritage.
                  </p>
                  <button className="w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-peach-light transition-all flex items-center justify-center gap-2 cursor-pointer">
                    Book Tickets{" "}
                    <span className="material-symbols-outlined text-sm">
                      confirmation_number
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* ────────── Cultural Highlights (Gallery) ────────── */}
        <AnimatedSection id="gallery" className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Cultural Highlights
              </h2>
              <p className="text-foreground/60 text-lg">
                Spotlighting the fusion of ancient aesthetics and modern
                storytelling from our vibrant community.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
              {/* Large featured image */}
              <motion.div
                className="relative rounded-2xl overflow-hidden md:col-span-2 md:row-span-2 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBoh8P_DIRq7CDL2VbYolDHZ0D8K_9boQPGCCV_OnBDI-zP-Qr4xqqBJFPM6ZqowjWU5wbOIox0G9fwcUyRSoXKuyO31nX-J1Sz4W6B4fcIa6YS_MGYJlAUIU_ohmApKx1ZhOdoH2IlXxJB2qaUMbBQUcebGPwepkLcSZxmILSecTASzYr95_sJb5vZ-I3Wssmej5cNKSQYftglY8tA1jxFFnDk8S0q5dRbqLk0cMALxSRpq2zANqi6vkz8jcjw_YGsTPdSJ7GSlBpa')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                <div className="absolute bottom-8 left-8 p-4">
                  <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                    Architecture
                  </p>
                  <h4 className="text-2xl font-bold text-white">
                    Temple Metaphysics
                  </h4>
                </div>
              </motion.div>

              {/* Smaller cards */}
              <motion.div
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlg9Z_cmBgYlnZ0L-qEFd0PQ91VFPut4B4drQ32gA3u6j8jFb7Oe1ryT8iaeoOQfXrGbo5X9QRiRIKFNspdC5GKHuHO3x88rgAN35iLAxtbvlB-xXBKyGDXqkh9IFlhQQNwlQ16pK_ypovbNVtT2WM_p-DAGEY3YYA9V3Cr9LwtU7s72X8oTgY_4noQLorIiwZzvwYc1k9MQWCqSoQJtgEl7J3b7g-SmZ4KSxa1Ia_PlTyeSWl4HNSkZfEuMidwCaaxRnZ2fEcFAnp')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-bold text-white">Kinetic Roots</h4>
                </div>
              </motion.div>

              <motion.div
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlVMfJHVWw4lmqzxN3xJDPP0DeBNp26vdvmjUNrMDttquIKEkn9XoHlYcj2zVwMZFXSCGvD5e3DGpL4qPz7MP96X0cMHMlzXaUobguFIxOU8WHPFOVgD78ERNkzzuIb3aTE5Fs2Xo_RkhWGv3VKfjWGgY2L-TfcegnRfPfnG7KFSXEG9AuIC09fqtd8SmQA45vm_sBnFqOZPIGuBpoKz_74aFiMCCn-pFx4Iwt5y9IKN257rzY2ohZD58xEeq4g1DpsqsmU5WKZQRT')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-bold text-white">Pixelated Puranas</h4>
                </div>
              </motion.div>

              <motion.div
                className="relative rounded-2xl overflow-hidden md:col-span-2 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlBGwws35cveSLSqPtRjrqozF9eQ2Uf5NVSYaWjWIB4NoIvgEcSztovsnct0GsoXBVM7v2T0oCm2Mi_aJccxk2W0nreH1h55Tii8DCLAF0VuzK1a8iAdKiUSN0ZQzMdZS27eoVbfDYHUJKr902u931QkaEVHSrHhIdaKxaVMzMHOkIa1GB8qnRtv48avVup3HfVFZKBT_M6HcaJu8lhdStRmYffTelj4x9PyRxX9L8mePXrqBSCgNdHT2MO6lAEFhBkWWFI11XVlgP')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest">
                    Festivals
                  </p>
                  <h4 className="text-2xl font-bold text-white">
                    The Neon Kumbh
                  </h4>
                </div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* ────────── Our Vision ────────── */}
        <AnimatedSection
          id="about"
          className="py-24 bg-primary text-peach-light overflow-hidden relative">
          <div className="absolute top-0 right-0 p-20 opacity-10">
            <span className="material-symbols-outlined text-[300px]">
              diversity_3
            </span>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                  Our Vision
                </h2>
                <p className="text-xl md:text-3xl font-medium leading-tight text-peach/90">
                  To create a global ecosystem where Sanskriti (Culture)
                  isn&apos;t just a relic of the past, but a driving force for
                  the technologies of tomorrow.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <motion.div
                  className="space-y-4 border-l-4 border-peach/30 pl-6"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <h5 className="text-lg font-bold">Preserve</h5>
                  <p className="text-sm font-medium text-peach/80">
                    Archiving oral traditions and architectural wonders into
                    immutable digital ledgers.
                  </p>
                </motion.div>
                <motion.div
                  className="space-y-4 border-l-4 border-peach/30 pl-6"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <h5 className="text-lg font-bold">Pioneer</h5>
                  <p className="text-sm font-medium text-peach/80">
                    Fostering collaboration between traditional artisans and
                    Silicon Valley engineers.
                  </p>
                </motion.div>
                <motion.div
                  className="space-y-4 border-l-4 border-peach/30 pl-6"
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <h5 className="text-lg font-bold">Propagate</h5>
                  <p className="text-sm font-medium text-peach/80">
                    Sharing the essence of Indian ethos with a global audience
                    through modern storytelling.
                  </p>
                </motion.div>
              </div>
              <motion.button
                className="px-10 py-5 bg-background-dark text-primary font-black rounded-xl cursor-pointer"
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}>
                BECOME A VISIONARY PARTNER
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* ────────── Testimonials / Marquee (NEW) ────────── */}
        <AnimatedSection className="py-16 overflow-hidden">
          <div className="container mx-auto px-6 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              What Our Community Says
            </h2>
          </div>
          <div
            className="flex gap-6 animate-[scroll_30s_linear_infinite]"
            style={{ width: "max-content" }}>
            {[
              {
                quote:
                  "Sanskriti Forum single-handedly redefined how I look at cultural events. Absolutely mesmerizing!",
                author: "Priya Sharma",
                role: "Cultural Enthusiast",
              },
              {
                quote:
                  "The fusion of technology and tradition is what makes this forum stand apart from the rest.",
                author: "Rahul Menon",
                role: "Tech Designer",
              },
              {
                quote:
                  "From VR temples to fusion concerts — every event is a journey you don't want to miss.",
                author: "Ananya Desai",
                role: "Art Director",
              },
              {
                quote:
                  "Being part of this global community gave me a deeper appreciation for my own heritage.",
                author: "Vikram Patel",
                role: "Filmmaker",
              },
              {
                quote:
                  "I've attended 12 events so far and each one was more incredible than the last.",
                author: "Meera Joshi",
                role: "Architect",
              },
              {
                quote:
                  "The Sanskriti Forum is proof that culture and innovation can coexist beautifully.",
                author: "Aditya Rao",
                role: "Software Engineer",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-8 min-w-[340px] max-w-[340px] flex-shrink-0 space-y-4">
                <p className="text-sm leading-relaxed text-foreground/70 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-sm text-foreground">
                    {t.author}
                  </p>
                  <p className="text-xs text-foreground/50">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </AnimatedSection>
      </main>

      {/* ────────── Footer ────────── */}
      <footer className="bg-peach/40 backdrop-blur-sm border-t border-primary/10 py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex flex-col items-start gap-4">
                <div className="w-48 h-[108px] rounded-lg overflow-hidden border border-primary/30">
                  <Image
                    src="/culturallogo.jpeg"
                    alt="The Sanskriti Forum Logo"
                    width={192}
                    height={108}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-primary uppercase">
                  The Sanskriti Forum
                </span>
              </div>
              <p className="text-foreground/60 max-w-sm">
                Redefining cultural identity in the age of rapid technological
                evolution. Join the movement today.
              </p>
              <div className="flex gap-4">
                <a
                  className="p-2 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-peach-light transition-all"
                  href="#">
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a
                  className="p-2 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-peach-light transition-all"
                  href="#">
                  <span className="material-symbols-outlined">
                    alternate_email
                  </span>
                </a>
              </div>
            </div>
            <div className="space-y-6">
              <h6 className="font-bold uppercase tracking-widest text-primary text-sm">
                Navigation
              </h6>
              <ul className="space-y-3 text-foreground/60 text-sm">
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#about">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#events">
                    Events
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-primary transition-colors"
                    href="#gallery">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/5 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs font-bold text-foreground/50 uppercase tracking-widest">
            <p>© 2024 Sanskriti Forum. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Engagement
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ────────── Back to Top Button ────────── */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-peach-light rounded-full shadow-xl shadow-primary/30 cursor-pointer hover:brightness-110 transition-all"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          showBackToTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
        }
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top">
        <span className="material-symbols-outlined">arrow_upward</span>
      </motion.button>
    </div>
  );
}
