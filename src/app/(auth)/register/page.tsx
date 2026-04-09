import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Waves } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-800 text-xl">NodeWave</span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Buat Akun 🚀</h1>
            <p className="text-slate-500 text-sm mt-1">
              Mulai kelola produktivitasmu hari ini
            </p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-violet-600 font-medium hover:underline"
            >
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}