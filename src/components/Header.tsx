// Importação de componentes e ícones
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import romaLogo from "@/assets/roma-logo.jpg";

const Header = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/5546976064925", "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/90 to-background/60 backdrop-blur-sm border-b border-border shadow-sm transition-all">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={romaLogo}
            alt="ROMA Gestão de Frotas"
            className="h-10 w-10 rounded-full object-cover shadow-elegant"
          />
          <span className="font-bold text-lg text-foreground"> </span>
        </div>

        {/* Navegação */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Início", id: "inicio" },
            { label: "Como Funciona", id: "como-funciona" },
            { label: "Benefícios", id: "beneficios" },
            { label: "Contato", id: "contato" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Botão de Atendimento */}
        <Button
          onClick={handleWhatsAppClick}
          className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-md transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline">Solicitar Atendimento</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
