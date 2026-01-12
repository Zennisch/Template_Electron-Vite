import { useState } from "react"
import electronLogo from "./assets/electron.svg"

function App(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  const ipcHandle = (): void => window.api.ping()

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] font-sans text-slate-200 selection:bg-cyan-500/30">
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] mix-blend-screen opacity-50"></div>
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen opacity-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bW9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+')] opacity-40 pointer-events-none z-0"></div>

      <div className="z-10 flex flex-col items-center gap-8 px-4 text-center">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img
            alt="Electron logo"
            src={electronLogo}
            className="relative h-32 w-32 transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium uppercase tracking-widest text-slate-500">Powered by electron-vite</div>

          <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Build an Electron app with <br className="hidden sm:block" />
            <span className="bg-linear-to-br from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              React
            </span>
            <span className="mx-2 font-light text-slate-600">&</span>
            <span className="bg-linear-to-br from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              TypeScript
            </span>
          </h1>
        </div>

        <p className="text-base font-medium text-slate-400/80">
          Please try pressing{" "}
          <code className="rounded-md border border-slate-700/50 bg-slate-800/50 px-2 py-1 font-mono text-sm font-bold text-slate-200 shadow-inner">
            F12
          </code>{" "}
          to open the devTool
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="https://electron-vite.org/"
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-center gap-2 rounded-full bg-slate-100 px-6 py-2.5 text-sm font-bold text-slate-900 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-white hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)]"
          >
            Documentation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          <button
            onClick={ipcHandle}
            className="group relative flex items-center justify-center rounded-full border border-slate-700/50 bg-slate-900/40 px-6 py-2.5 text-sm font-bold text-slate-200 backdrop-blur-md transition-all hover:bg-slate-800/60 hover:border-slate-600 hover:text-white cursor-pointer"
          >
            Send IPC
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 z-10 hidden sm:block">
        <div className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/5 px-6 py-3 text-xs font-semibold tracking-wide text-slate-400 backdrop-blur-xl shadow-2xl transition-colors hover:border-white/10 hover:bg-white/10">
          <span className="hover:text-cyan-300 cursor-default transition-colors">Electron v{versions.electron}</span>
          <span className="h-3 w-px bg-white/10" />
          <span className="hover:text-blue-300 cursor-default transition-colors">Chromium v{versions.chrome}</span>
          <span className="h-3 w-px bg-white/10" />
          <span className="hover:text-green-300 cursor-default transition-colors">Node v{versions.node}</span>
        </div>
      </div>
    </div>
  )
}

export default App
