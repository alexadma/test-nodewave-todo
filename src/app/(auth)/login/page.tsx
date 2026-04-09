import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0f]">
      {/* LEFT PANEL — Branding */}
      <div className="relative lg:w-[52%] flex flex-col justify-between p-8 lg:p-14 overflow-hidden bg-[#0d0d18] min-h-[280px] lg:min-h-screen">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[80px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: "var(--font-sora)" }}>
            NodeWave
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12 lg:py-0">
          {/* Floating task cards */}
          <div className="hidden lg:flex flex-col gap-3 mb-12">
            {[
              { text: "Design system update", done: true, tag: "Design" },
              { text: "API integration review", done: false, tag: "Dev" },
              { text: "Q2 planning meeting", done: false, tag: "Meeting" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 w-fit"
                style={{
                  transform: `translateX(${i * 20}px)`,
                  animationDelay: `${i * 200}ms`,
                }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${item.done ? "bg-violet-500 border-violet-500" : "border-white/30"}`}>
                  {item.done && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium ${item.done ? "line-through text-white/30" : "text-white/80"}`}>
                  {item.text}
                </span>
                <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50 font-medium">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-sora)" }}>
            Atur harimu,<br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              capai lebih banyak.
            </span>
          </h1>
          <p className="text-white/40 text-base lg:text-lg max-w-md leading-relaxed">
            Platform manajemen tugas yang membantu kamu tetap fokus dan produktif setiap hari.
          </p>

          {/* Stats */}
          <div className="hidden lg:flex gap-8 mt-10">
            {[["2.4k+", "Pengguna Aktif"], ["98%", "Kepuasan"], ["10x", "Lebih Produktif"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-sora)" }}>{num}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 hidden lg:block">
          <p className="text-white/20 text-xs">© 2025 NodeWave. All rights reserved.</p>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-[#0a0a0f]">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            </div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "var(--font-sora)" }}>NodeWave</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora)" }}>
              Selamat datang
            </h2>
            <p className="text-white/40 text-sm">
              Masuk ke akun kamu untuk melanjutkan
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-white/30 mt-8">
            Belum punya akun?{" "}
            <Link href="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}