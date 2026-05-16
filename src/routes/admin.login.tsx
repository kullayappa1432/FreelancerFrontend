import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — RKS Tech Solutions" },
      { name: "description", content: "Admin login page" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@rkstechsolutions.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in - use useEffect to avoid setState during render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdmin = localStorage.getItem("admin_token");
      if (isAdmin) {
        navigate({ to: "/admin/dashboard" });
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      if (response.access_token) {
        // Store tokens and admin info
        localStorage.setItem("admin_token", response.access_token);
        localStorage.setItem("admin_refresh_token", response.refresh_token || "");
        localStorage.setItem("admin_user", JSON.stringify(response.admin));

        toast.success("Login successful!");
        navigate({ to: "/admin/dashboard" });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow group-hover:scale-110 transition-smooth">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-lg">RKS Tech</div>
              <div className="text-xs text-muted-foreground tracking-widest uppercase">Admin</div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-card border-border/50">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access the admin dashboard and manage your website content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="admin@rkstechsolutions.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-background/50"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-primary hover:opacity-90 shadow-glow h-10 gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                <span className="font-medium">Email:</span> admin@rkstechsolutions.com
              </p>
              <p>
                <span className="font-medium">Password:</span> ChangeMe123!
              </p>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Back to{" "}
            <a href="/" className="text-primary hover:underline">
              website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
