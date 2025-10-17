// Importação dos ícones e logo
import { MessageCircle, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import romaLogo from "@/assets/roma-logo.jpg"; // Certifique-se que esse caminho está correto

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary/95 via-secondary/90 to-background text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo e Descrição */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={romaLogo}
                alt="ROMA Gestão de Frotas"
                className="h-14 w-14 rounded-full object-cover shadow-elegant"
              />
              <span className="text-xl font-bold">ROMA Gestão de Frotas</span>
            </div>
            <p className="text-secondary-foreground/80">
              Gestão de Frotas humanizada para transportadores de todo o Brasil.
            </p>

            {/* Redes sociais */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/roma_gestao_de_frotas/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5546976064925"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold mb-2">Contato</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <a
                href="https://wa.me/5546976064925"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Numero de telefone
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@roma.com.br
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                 Paraná
              </div>
            </div>
          </div>

          {/* Links úteis */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold mb-2">Acessos Úteis</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="block hover:text-primary transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block hover:text-primary transition-colors">
                Central do Cliente
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 mt-12 pt-6 text-center text-sm text-secondary-foreground/60 relative">
          <div className="absolute left-1/2 top-[-1px] -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
          <p>&copy; {new Date().getFullYear()} ROMA Gestão de Frotas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
