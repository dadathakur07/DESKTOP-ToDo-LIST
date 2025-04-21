
import { useState, useEffect } from "react";
import { Github, Monitor, Cpu, Terminal, Code, Wrench, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Typewriter({ text, delay = 70 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let idx = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, idx));
      idx++;
      if (idx > text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  return (
    <span className="text-gradient-primary font-mono animate-pulse">
      {displayed}
      <span className="blink">█</span>
      <style>
        {`.blink{animation:blink 1s steps(2, start) infinite;}
          @keyframes blink{to{opacity:0;}}`}
      </style>
    </span>
  );
}

const skills = [
  { icon: Code, label: "Fullstack Dev" },
  { icon: Cpu, label: "Reverse Engineering" },
  { icon: Terminal, label: "Linux & Shell" },
  { icon: Wrench, label: "Toolsmith" },
  { icon: Monitor, label: "C/C++/Rust" },
  { icon: Layers, label: "Cybersecurity" },
];

const projects = [
  {
    title: "NetScanX",
    desc: "Network scanner CLI tool with stealth fingerprinting and live map UI.",
    icon: Terminal,
    link: "#",
  },
  {
    title: "CipherSuite",
    desc: "Custom cryptography suite for secure communications.",
    icon: Cpu,
    link: "#",
  },
  {
    title: "GhostPanel",
    desc: "Dark web admin panel, react + node, stealth/obfuscation focused.",
    icon: Monitor,
    link: "#",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1A1F2C] to-[#202844] dark:bg-gradient-to-tr dark:from-[#16181F] dark:to-[#0A0B14] transition-colors font-sans">
      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-16">
        {/* HERO */}
        <section className="flex flex-col items-center justify-center text-center pt-4">
          <div className="text-4xl md:text-6xl font-black text-gradient-primary tracking-tight animate-fade-in drop-shadow-lg mb-4">
            <Typewriter text="ROHIT: The Hacker." />
          </div>
          <p className="text-lg md:text-2xl text-cyan-400/90 mb-8 max-w-xl animate-fade-in delay-100">
            🛡️ Cybersecurity Enthusiast & Code Magician. Building, breaking, and owning the network—one byte at a time.
          </p>
          <Button asChild className="glass-morphism px-8 py-4 text-lg font-mono font-bold shadow-2xl animate-scale-in hover:shadow-cyan-500/20">
            <a href="#projects">
              <span className="flex items-center gap-2 text-cyan-400">
                <Code className="w-6 h-6" />
                View Projects
              </span>
            </a>
          </Button>
        </section>

        <Separator className="my-0 opacity-10" />

        {/* ABOUT */}
        <section id="about" className="glass-morphism rounded-2xl p-8 animate-fade-in flex flex-col gap-2 shadow-cyan-400/10 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-cyan-400 mb-2 flex items-center gap-2">
            <Terminal className="w-6 h-6 animate-enter" /> About "ROHIT"
          </h2>
          <p className="font-mono text-gray-200/80 md:text-lg animate-fade-in">
            I'm Rohit, a hacker and developer passionate about building creative software, exploiting security holes, and automating everything.
            <br />
            <span className="text-cyan-300">
              My playground: CTFs, networks, servers, and code editors in the dark 🌑.
            </span>
          </p>
        </section>

        {/* SKILLS */}
        <section id="skills" className="rounded-2xl glass-morphism p-8 mt-2 animate-slide-in-right">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
            <Cpu className="w-5 h-5" /> Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {skills.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center glass-morphism hover-scale p-4 rounded-lg shadow-md shadow-cyan-900/10 bg-white/5"
              >
                <Icon className="w-8 h-8 mb-2 text-cyan-300 animate-fade-in" />
                <span className="font-mono text-gray-200/80 text-lg">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="rounded-2xl glass-morphism p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
            <Layers className="w-5 h-5" /> Projects
          </h2>
          <div className="grid gap-6">
            {projects.map(({ title, desc, icon: Icon, link }) => (
              <Card key={title} className="glass-morphism border border-cyan-500/10 flex flex-col md:flex-row items-center md:items-start gap-5 p-6 animate-scale-in hover-scale hover:shadow-cyan-400/50">
                <Icon className="w-10 h-10 text-cyan-400 drop-shadow-lg" />
                <div>
                  <div className="font-bold text-xl text-white/90">{title}</div>
                  <p className="text-cyan-200/80">{desc}</p>
                  <Button asChild size="sm" className="mt-2 bg-cyan-800/30 hover:bg-cyan-700/50 font-mono">
                    <a href={link} target="_blank" rel="noopener noreferrer">View Repo</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-8 flex flex-col items-center animate-fade-in">
          <p className="mb-3 text-lg text-gray-300 font-mono">Let's connect:</p>
          <Button asChild variant="outline" className="border-cyan-600/50 text-cyan-400 hover:bg-cyan-950/30 bg-transparent font-mono">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-2" /> github.com/ROHIT
            </a>
          </Button>
        </section>
      </main>
    </div>
  );
}

