"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useAuth";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export function RegisterForm() {
    const { mutate: register, isPending } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = (values: RegisterInput) => {
        const { confirmPassword, ...payload } = values;
        register(payload);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white/60 text-xs font-medium uppercase tracking-widest">
                                Nama Lengkap
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <Input
                                        placeholder="John Doe"
                                        className="pl-11 h-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-white/60 text-xs font-medium uppercase tracking-widest">
                                Email
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <Input
                                        type="email"
                                        placeholder="nama@email.com"
                                        className="pl-11 h-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/60 text-xs font-medium uppercase tracking-widest">
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-11 pr-10 h-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
                                            {...field}
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors">
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white/60 text-xs font-medium uppercase tracking-widest">
                                    Konfirmasi
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <Input
                                            type={showConfirm ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="pl-11 pr-10 h-12 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
                                            {...field}
                                        />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors">
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-400 text-xs" />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold text-base shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 border-0 mt-2"
                >
                    {isPending ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Mendaftar...</>
                    ) : "Buat akun gratis →"}
                </Button>

                <p className="text-center text-white/20 text-xs pt-2">
                    Dengan mendaftar, kamu menyetujui{" "}
                    <span className="text-white/40 underline cursor-pointer">Syarat & Ketentuan</span>
                </p>
            </form>
        </Form>
    );
}