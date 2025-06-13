"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Crown,
  Eye,
  EyeOff,
  Heart,
  Lock,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import GoogleIcon from "./GoogleIcon";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "pl";
}
type AuthMode = "login" | "register" | "forgot";

export default function AuthModal({
  isOpen,
  onClose,
  language,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  interface LoginContent {
    welcomeTitle: string;
    welcomeSubtitle: string;
    loginTitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    rememberMeText: string;
    forgotPasswordText: string;
    signInButtonText: string;
    orContinueText: string;
    signInWithGoogleText: string;
    noAccountText: string;
    signUpText: string;
  }
  interface ResetPasswordContent {
    leftTitle: string;
    leftDescription: string;
    formTitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    infoText: string;
    buttonText: string;
    rememberYourPassword: string;
    backToLoginLinkText: string;
  }
  interface RegisterPageContent {
    leftTitle: string;
    leftDescription: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    formTitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    termsText: string;
    submitButtonText: string;
    orContinueWithText: string;
    googleButtonText: string;
    haveAccountText: string;
    signInLinkText: string;
  }

  const [loginContent, setLoginContent] = useState<LoginContent | null>(null);
  const [registerContent, setRegisterContent] =
    useState<RegisterPageContent | null>(null);

  useEffect(() => {
    const fetchLoginContent = async () => {
      try {
        const res = await axios.get<{ data: LoginContent }>(
          `http://localhost:1337/api/login-content?locale=${language}`
        );

        const data = res.data?.data;

        if (data) setLoginContent(data);
      } catch (error) {
        console.error("Erro ao buscar dados de login-content:", error);
      }
    };

    fetchLoginContent();
  }, [language]);
  useEffect(() => {
    const fetchRegisterContent = async () => {
      try {
        const res = await axios.get<{ data: RegisterPageContent }>(
          `http://localhost:1337/api/register-page-content?populate=*&locale=${language}`
        );

        const data = res.data?.data;
        if (data) setRegisterContent(data);
      } catch (error) {
        console.error("Erro ao buscar dados de register-page-content:", error);
      }
    };

    fetchRegisterContent();
  }, [language]);

  const [resetContent, setResetContent] = useState<ResetPasswordContent | null>(
    null
  );

  useEffect(() => {
    const fetchResetContent = async () => {
      try {
        const res = await axios.get<{ data: ResetPasswordContent }>(
          `http://localhost:1337/api/reset-password-content?locale=${language}`
        );

        const data = res.data?.data;
        if (data) setResetContent(data);
      } catch (error) {
        console.error("Erro ao buscar dados de reset-password-content:", error);
      }
    };

    fetchResetContent();
  }, [language]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { mode, formData });
    onClose();
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    });
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-5xl bg-slate-900/95 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-[600px]">
              <div className="w-2/5 bg-gradient-to-br from-rose-900/50 to-pink-900/50 p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-500 rounded-full filter blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center mb-6">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {mode === "forgot"
                      ? resetContent?.leftTitle || "Reset Password"
                      : mode === "register"
                      ? registerContent?.leftTitle || "Join Our Community"
                      : loginContent?.welcomeTitle || "Welcome Back"}
                  </h2>

                  <p className="text-slate-300 mb-8 leading-relaxed">
                    {mode === "forgot"
                      ? resetContent?.leftDescription ||
                        "Enter your email to receive reset instructions."
                      : mode === "register"
                      ? registerContent?.leftDescription ||
                        "Create your account and become part of our exclusive platform."
                      : loginContent?.welcomeSubtitle ||
                        "Sign in to access your account and continue your Le Privê experience."}
                  </p>

                  {mode === "register" && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Heart className="w-4 h-4 text-rose-400" />
                        <span className="text-sm">
                          {registerContent?.benefit1 || "Premium Experience"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm">
                          {registerContent?.benefit2 || "Exclusive Access"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <User className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">
                          {registerContent?.benefit3 || "Verified Profiles"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    {(mode === "register" || mode === "forgot") && (
                      <motion.button
                        onClick={() => switchMode("login")}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </motion.button>
                    )}
                    <h3 className="text-2xl font-bold text-white">
                      {loginContent?.loginTitle || "Sign In"}
                      {mode === "register" && "Create Account"}
                      {mode === "forgot" && "Forgot Password"}
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {mode === "login" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-slate-300 text-sm mb-2">
                          {loginContent?.emailLabel || "Email"}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                            placeholder={
                              loginContent?.emailPlaceholder || "your@email.com"
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 text-sm mb-2">
                          {loginContent?.passwordLabel || "Password"}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-12 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                            placeholder={
                              loginContent?.passwordPlaceholder ||
                              "Enter your password"
                            }
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-slate-300">
                          <input
                            type="checkbox"
                            className="rounded border-white/20 bg-white/10"
                          />
                          <span className="text-sm">
                            {loginContent?.rememberMeText || "Remember me"}
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => switchMode("forgot")}
                          className="text-rose-400 hover:text-rose-300 text-sm transition-colors"
                        >
                          {loginContent?.forgotPasswordText ||
                            "Forgot password?"}
                        </button>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-rose-500/25 transition-all"
                      >
                        {loginContent?.signInButtonText || "Sign In"}
                      </motion.button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-slate-900 text-slate-400">
                            {loginContent?.orContinueText || "Or continue with"}
                          </span>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium border border-gray-300 transition-all duration-300"
                      >
                        <GoogleIcon />
                        <span>
                          {loginContent?.signInWithGoogleText ||
                            "Sign in with Google"}
                        </span>
                      </motion.button>

                      <div className="text-center">
                        <span className="text-slate-400">
                          {loginContent?.noAccountText ||
                            "Don't have an account?"}{" "}
                        </span>
                        <button
                          type="button"
                          onClick={() => switchMode("register")}
                          className="text-rose-400 hover:text-rose-300 font-medium transition-colors"
                        >
                          {loginContent?.signUpText || "Sign up"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-300 text-sm mb-2">
                            {registerContent?.fullNameLabel || "Full Name"}
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                              placeholder={
                                registerContent?.fullNamePlaceholder ||
                                "Enter your name"
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-300 text-sm mb-2">
                            {registerContent?.phoneLabel || "Phone"}
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                              placeholder={
                                registerContent?.phonePlaceholder ||
                                "+55 11 99999-9999"
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-300 text-sm mb-2">
                          {loginContent?.emailLabel || "Email"}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                            placeholder={
                              registerContent?.emailPlaceholder ||
                              "your@email.com"
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-300 text-sm mb-2">
                            {registerContent?.passwordLabel || "Password"}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                              placeholder={
                                registerContent?.passwordPlaceholder ||
                                "Create password"
                              }
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-300 text-sm mb-2">
                            {registerContent?.confirmPasswordLabel ||
                              "Confirm Password"}
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                              placeholder={
                                registerContent?.confirmPasswordPlaceholder ||
                                "Confirm password"
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-white/10"
                          required
                        />
                        <span className="text-slate-300 text-sm">
                          {registerContent?.termsText ||
                            "I agree to the Terms of Service and Privacy Policy"}
                          <span className="text-rose-400">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-rose-400">Privacy Policy</span>
                        </span>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-rose-500/25 transition-all"
                      >
                        {registerContent?.submitButtonText || "Create Account"}
                      </motion.button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-slate-900 text-slate-400">
                            {registerContent?.orContinueWithText ||
                              "Or continue with"}
                          </span>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium border border-gray-300 transition-all duration-300"
                      >
                        <GoogleIcon />
                        <span>
                          {registerContent?.googleButtonText ||
                            "Sign up with Google"}
                        </span>
                      </motion.button>

                      <div className="text-center">
                        <span className="text-slate-400">
                          {registerContent?.haveAccountText ||
                            "Already have an account?"}
                        </span>
                        <button
                          type="button"
                          onClick={() => switchMode("login")}
                          className="text-rose-400 hover:text-rose-300 font-medium transition-colors"
                        >
                          {registerContent?.signInLinkText || "Sign in"}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {mode === "forgot" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-slate-300 text-sm mb-2">
                          {resetContent?.emailLabel || "Email Address"}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-rose-500 focus:outline-none transition-all"
                            placeholder={
                              resetContent?.emailPlaceholder ||
                              "Enter your email"
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                        <p className="text-blue-300 text-sm">
                          {resetContent?.infoText ||
                            "We'll send you a secure link to reset your password. Check your email inbox and spam folder."}
                        </p>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-rose-500/25 transition-all"
                      >
                        {resetContent?.buttonText || "Send Reset Link"}
                      </motion.button>

                      <div className="text-center">
                        <span className="text-slate-400">
                          {resetContent?.rememberYourPassword ||
                            "Remember your password?"}{" "}
                        </span>
                        <button
                          type="button"
                          onClick={() => switchMode("login")}
                          className="text-rose-400 hover:text-rose-300 font-medium transition-colors"
                        >
                          Back to login
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
