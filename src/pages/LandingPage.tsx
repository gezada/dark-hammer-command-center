
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Youtube, LayoutDashboard, Upload, MessageSquare, Hammer, Calendar, UploadCloud, Trophy, Zap, Star, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Hammer className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-bold">Dark Hammer</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link to="#roadmap" className="text-sm font-medium hover:text-primary transition-colors">Roadmap</Link>
          </nav>
          <ThemeToggle />
          <Button asChild>
            <Link to="/dashboard">Login</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
        <div className="flex items-center justify-center mb-6">
          <Hammer className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
          Dark Hammer: seu cockpit definitivo para YouTube multi-canal.
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl">
          Conecte todos os seus canais, envie vídeos, agende publicações e responda comentários em um só lugar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button asChild size="lg" className="text-lg">
            <Link to="/dashboard">Comece grátis</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link to="#features">Saiba mais</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 lg:px-24 bg-secondary/50">
        <h2 className="text-3xl font-bold mb-12 text-center">Recursos principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Youtube className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Conexão OAuth Google</h3>
            <p className="text-muted-foreground">
              Conecte e gerencie ilimitados canais do YouTube através de uma autenticação segura OAuth.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Dashboard unificado</h3>
            <p className="text-muted-foreground">
              Visualize métricas essenciais: Views Today, Subscribers, Watch Time, Revenue Estimate, Avg. CTR.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload & Schedule</h3>
            <p className="text-muted-foreground">
              Sistema drag-and-drop para upload de vídeos com calendário interativo para agendamento.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Inbox Comments</h3>
            <p className="text-muted-foreground">
              Responda, curta, oculte ou exclua comentários em massa, com filtros inteligentes para organizar.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold mb-12 text-center">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* V1 */}
          <div className="bg-card rounded-lg p-8 shadow-md border border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-bl">
              CURRENT
            </div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4">
                <Hammer className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">V1</h3>
            </div>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <Youtube className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>OAuth Google e gerenciamento de canais</span>
              </li>
              <li className="flex items-start">
                <LayoutDashboard className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Dashboard unificado com métricas principais</span>
              </li>
              <li className="flex items-start">
                <Upload className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Upload & schedule com drag-and-drop</span>
              </li>
              <li className="flex items-start">
                <Calendar className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Calendário interativo para agendamento</span>
              </li>
              <li className="flex items-start">
                <MessageSquare className="h-5 w-5 text-primary shrink-0 mr-2" />
                <span>Inbox de comentários com bulk actions</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link to="/dashboard">Comece Agora</Link>
            </Button>
          </div>

          {/* V2 */}
          <div className="bg-card rounded-lg p-8 shadow-md border border-border relative opacity-90">
            <div className="absolute top-0 right-0 px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-bl">
              COMING SOON
            </div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center mr-4">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">V2</h3>
            </div>
            <p className="text-xl mb-6">
              "Forge your content with AI – ideias, headlines, thumbnails, scripts e TTS automáticos."
            </p>
            <ul className="space-y-4 opacity-70 mb-6">
              <li className="flex items-start">
                <Star className="h-5 w-5 shrink-0 mr-2" />
                <span>AI para geração de ideias e headlines</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 shrink-0 mr-2" />
                <span>Criação automática de thumbnails</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 shrink-0 mr-2" />
                <span>Scripts otimizados por inteligência artificial</span>
              </li>
              <li className="flex items-start">
                <Star className="h-5 w-5 shrink-0 mr-2" />
                <span>Text-to-Speech avançado em múltiplos idiomas</span>
              </li>
            </ul>
            <Button disabled variant="outline" className="w-full">
              Em desenvolvimento
            </Button>
          </div>

          {/* V3 */}
          <div className="bg-card rounded-lg p-8 shadow-md border border-border relative opacity-80">
            <div className="absolute top-0 right-0 px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-bl">
              FUTURE VISION
            </div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center mr-4">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-semibold">V3</h3>
            </div>
            <p className="text-xl mb-6">
              "Autopilot Mode – vídeos completos gerados e publicados sem medo de errar."
            </p>
            <ul className="space-y-4 opacity-70">
              <li className="flex items-start">
                <Rocket className="h-5 w-5 shrink-0 mr-2" />
                <span>Geração completa de vídeos automatizada</span>
              </li>
              <li className="flex items-start">
                <Rocket className="h-5 w-5 shrink-0 mr-2" />
                <span>Agendamento inteligente baseado em dados</span>
              </li>
              <li className="flex items-start">
                <Rocket className="h-5 w-5 shrink-0 mr-2" />
                <span>Análise preditiva de performance</span>
              </li>
              <li className="flex items-start">
                <Trophy className="h-5 w-5 shrink-0 mr-2" />
                <span>Otimização contínua de conteúdo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-primary/5 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para dominar o YouTube?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
          Comece agora mesmo a gerenciar todos os seus canais em um único lugar e economize tempo valioso.
        </p>
        <Button asChild size="lg" className="text-lg">
          <Link to="/dashboard">Comece grátis</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Hammer className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-bold">Dark Hammer</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link to="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
            <Link to="#roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link>
            <Link to="/contato" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contato</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          &copy;2025 Dark Hammer. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
