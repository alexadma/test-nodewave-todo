import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type { LoginPayload, RegisterPayload } from "@/types/auth.types";

export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Login berhasil! Selamat datang 👋");
      router.push("/todos");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Login gagal. Coba lagi.";
      toast.error(message);
    },
  });
}

export function useRegister() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success("Registrasi berhasil! Selamat datang 🎉");
      router.push("/todos");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Registrasi gagal. Coba lagi.";
      toast.error(message);
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const router = useRouter();

  return () => {
    logout();
    toast.success("Logout berhasil");
    router.push("/login");
  };
}