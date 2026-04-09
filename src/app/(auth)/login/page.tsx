import { LoginForm } from "@/features/auth/components/LoginForm";
import { Waves } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-xl">NodeWave</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Selamat Datang 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Masuk ke akun kamu untuk melanjutkan
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-violet-600 font-medium hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}