
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer } from "lucide-react";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default function AuthPage() {
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-4 flex flex-col items-center">
            <Hammer className="h-12 w-12 text-primary" />
            <div className="text-center">
              <CardTitle className="text-2xl">Welcome to Dark Hammer</CardTitle>
              <CardDescription>
                Sign in with your Google account to connect your YouTube channels
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <GoogleAuthButton />
          </CardContent>
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
