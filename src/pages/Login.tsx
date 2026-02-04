import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/common/Button";
import { Loader } from "@/components/common/Loader";
import { Music2, Mail, Lock, User } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, signup, isLoading, error, clearError } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await signup(formData.email, formData.password, formData.name);
      } else {
        await login(formData.email, formData.password);
      }
      navigate("/");
    } catch (err) {
      // Error is handled by context
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg">
            <Music2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Soundify</h1>
          <p className="text-muted-foreground mt-2">Your music, your way</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-foreground text-center mb-6">
            {isSignup ? "Create an account" : "Welcome back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={isSignup}
                  className="w-full h-12 pl-11 pr-4 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full h-12 pl-11 pr-4 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full h-12 pl-11 pr-4 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              type="submit"
              variant="gradient"
              className="w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size="sm" />
              ) : isSignup ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  clearError();
                }}
                className="ml-1 text-primary hover:underline font-medium"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>

        {/* TODO: Remove demo bypass before production */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue without signing in →
          </button>
        </div>
      </div>
    </div>
  );
}
