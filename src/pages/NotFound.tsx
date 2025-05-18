
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Hammer className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
      <Button onClick={() => navigate("/")}>Voltar para a Home</Button>
    </div>
  );
}
