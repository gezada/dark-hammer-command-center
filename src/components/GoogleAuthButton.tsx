
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton = () => {
  const { setIsAuthenticated } = useStore();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    // Autenticação automática sem Google
    setIsAuthenticated(true);
    navigate("/dashboard");
    toast.success("Login realizado com sucesso");
  };

  return (
    <Button 
      onClick={handleLogin} 
      className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
    >
      <span>Entrar no Dashboard</span>
    </Button>
  );
};

export default GoogleAuthButton;
