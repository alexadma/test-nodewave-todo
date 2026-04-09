import { RegisterForm } from "@/features/auth/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0f]">
      {/* LEFT PANEL */}
      <div className="relative lg:w-[52%] flex flex-col justify-between p-8 lg:p-14 overflow-hidden bg-[#0d0d18] min-h-[280px] lg:min-h-screen">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/15 blur-[100px] animate-pulse delay-700" />
          <div className="absolute top-[50%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

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

        <div className="relative z-10 flex-1 flex flex-col justify-center py-12 lg:py-0">
          {/* Feature list */}
          <div className="hidden lg:flex flex-col gap-4 mb-12">
            {[
              { icon: "✦", text: "Buat & kelola todo dengan mudah" },
              { icon: "◈", text: "Filter & cari tugas secara instan" },
              { icon: "⬡", text: "Tampilan kalender visual" },
              { icon: "◉", text: "Sinkronisasi real-time" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-violet-400 text-lg">{item.icon}</span>
                <span className="text-white/50 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "var(--font-sora)" }}>
            Mulai perjalanan<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              produktifitasmu.
            </span>
          </h1>
          <p className="text-white/40 text-base lg:text-lg max-w-md leading-relaxed">
            Bergabung dengan ribuan pengguna yang sudah meningkatkan produktivitas mereka bersama NodeWave.
          </p>

          <div className="hidden lg:flex items-center gap-3 mt-10">
            <div className="flex -space-x-2">
              {["#7C3AED", "#2563EB", "#0891B2", "#059669"].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d0d18]" style={{ backgroundColor: color }} />
              ))}
            </div>
            <p className="text-white/40 text-sm">+2,400 pengguna bergabung bulan ini</p>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <p className="text-white/20 text-xs">© 2025 NodeWave. All rights reserved.</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-[#0a0a0f]">
        <div className="w-full max-w-[420px]">
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
              Buat akun gratis
            </h2>
            <p className="text-white/40 text-sm">
              Daftar dalam 30 detik, tanpa kartu kredit
            </p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-white/30 mt-8">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}