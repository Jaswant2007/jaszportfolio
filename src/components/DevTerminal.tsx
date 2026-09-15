import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from "lucide-react";
import { profile, skillGroups, projects } from "@/data/portfolio";

type HistoryItem = {
  command: string;
  output: React.ReactNode;
};

export function DevTerminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-emerald-400 font-semibold">Jaswant Yuvarajan OS v2.0.0 [Interactive Terminal]</p>
          <p className="text-slate-400 mt-1">
            Type <span className="text-blue-400 font-semibold">help</span> to see available commands. Try{" "}
            <span className="text-blue-400 font-semibold font-mono">about</span>,{" "}
            <span className="text-blue-400 font-semibold font-mono">skills</span>, or{" "}
            <span className="text-blue-400 font-semibold font-mono">projects</span>.
          </p>
        </div>
      ),
    },
  ]);
  const [maximized, setMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-blue-400 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-emerald-400 font-mono">about</span>
              <span>Displays identity and education profile</span>
              <span className="text-emerald-400 font-mono">skills</span>
              <span>Lists technical skills & programming languages</span>
              <span className="text-emerald-400 font-mono">projects</span>
              <span>Shows built projects with live links</span>
              <span className="text-emerald-400 font-mono">github</span>
              <span>Prints GitHub profile URL (@Jaswant2007)</span>
              <span className="text-emerald-400 font-mono">leetcode</span>
              <span>Prints LeetCode profile URL (@Jas22wanty)</span>
              <span className="text-emerald-400 font-mono">contact</span>
              <span>Shows direct email & social handles</span>
              <span className="text-emerald-400 font-mono">theme</span>
              <span>Toggles light/dark theme</span>
              <span className="text-emerald-400 font-mono">clear</span>
              <span>Clears terminal history</span>
              <span className="text-emerald-400 font-mono">sudo</span>
              <span>Requests root privileges</span>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-blue-400 font-semibold">{profile.name}</p>
            <p>Role: B.Tech Computer Science & Engineering Student (2025–2029)</p>
            <p>College: Amrita Vishwa Vidyapeetham, Chennai</p>
            <p className="text-slate-400">{profile.intro}</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-blue-400 font-semibold">Technical Stack:</p>
            {skillGroups.map((g) => (
              <div key={g.group}>
                <span className="text-emerald-400 font-medium">{g.group}: </span>
                <span className="text-slate-300">{g.items.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-blue-400 font-semibold">Built Projects:</p>
            {projects.map((p, idx) => (
              <div key={p.title} className="border-l-2 border-blue-500/40 pl-3">
                <p className="font-semibold text-slate-100">
                  {idx + 1}. {p.title} <span className="text-xs text-blue-400 font-normal">[{p.category}]</span>
                </p>
                <p className="text-xs text-slate-400">{p.description}</p>
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-400 hover:underline inline-block mt-0.5"
                  >
                    Demo: {p.demo} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case "github":
        output = (
          <p className="text-xs sm:text-sm">
            GitHub:{" "}
            <a
              href="https://github.com/Jaswant2007"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              https://github.com/Jaswant2007 ↗
            </a>
          </p>
        );
        break;

      case "leetcode":
        output = (
          <p className="text-xs sm:text-sm">
            LeetCode:{" "}
            <a
              href="https://leetcode.com/u/Jas22wanty/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              https://leetcode.com/u/Jas22wanty/ ↗
            </a>
          </p>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs sm:text-sm space-y-1">
            <p>Email: <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline">{profile.email}</a></p>
            <p>Location: {profile.location}</p>
          </div>
        );
        break;

      case "theme":
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        output = <p className="text-emerald-400">Switched theme to {isDark ? "Dark Mode 🌙" : "Light Mode ☀️"}</p>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "sudo":
        output = <p className="text-amber-400 font-mono">Access Denied: Jaswant is already in total control of this site!</p>;
        break;

      default:
        output = (
          <p className="text-rose-400 font-mono text-xs sm:text-sm">
            Command not recognized: '<span className="font-semibold">{cmd}</span>'. Type 'help' for available commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#080D18] text-slate-100 shadow-2xl transition-all duration-300 ${
          maximized ? "h-[92vh] max-w-[96vw]" : "h-[500px] max-w-2xl"
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0B1220] px-4 py-3">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-4 w-4 text-blue-400" />
            <span className="font-mono text-xs font-semibold text-slate-300">jaswant@portfolio:~ (bash)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMaximized((m) => !m)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              title={maximized ? "Minimize" : "Maximize"}
            >
              {maximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-rose-400 transition-colors"
              title="Close Terminal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="h-[calc(100%-90px)] overflow-y-auto p-4 font-mono text-sm leading-relaxed space-y-4">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              {item.command !== "welcome" && (
                <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                  <span className="text-emerald-400">jaswant@dev:~$</span>
                  <span className="text-slate-100">{item.command}</span>
                </div>
              )}
              <div className="pl-1">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-slate-800 bg-[#0B1220] px-4 py-2.5">
          <span className="font-mono text-xs text-emerald-400">jaswant@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help'..."
            className="flex-1 bg-transparent font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600"
          />
          <button type="submit" className="text-slate-400 hover:text-blue-400 transition-colors">
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
