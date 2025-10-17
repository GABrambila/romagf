import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import heroImage from "@/assets/web-banner-wide.jpg";
const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />

      <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/70 to-primary/30" />

      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Você dirige, a Roma gerencia.
            <br />
            <span className="text-primary">Simples assim.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Gestão de frotas humanizada para transportadores autônomos e pequenos frotistas do Sudoeste do Paraná
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="text-lg px-8 py-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              Peça um orçamento gratuito
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
