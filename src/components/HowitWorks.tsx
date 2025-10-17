// Importação dos ícones usados nos passos
import { FileText, Upload, Settings, BarChart } from "lucide-react";

// Array com os 4 passos de como funciona o serviço ROMA
const steps = [
  {
    icon: FileText, // Ícone de documento
    title: "Cadastro Simples",
    description: "Preencha um formulário rápido com suas informações básicas",
  },
  {
    icon: Upload, // Ícone de upload
    title: "Envio de Documentos",
    description: "Envie os documentos necessários de forma fácil e segura",
  },
  {
    icon: Settings, // Ícone de engrenagem
    title: "Roma Assume o Controle",
    description: "Nossa equipe cuida de toda a gestão da sua frota",
  },
  {
    icon: BarChart, // Ícone de gráfico
    title: "Relatórios Humanizados",
    description: "Receba informações claras e acionáveis sobre sua operação",
  },
];

// Componente da seção "Como Funciona"
const HowItWorks = () => {
  return (
    // Seção explicando o processo em 4 passos
    <section id="como-funciona" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Título e descrição da seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Como Funciona?
          </h2>
          <p className="text-lg text-muted-foreground">
            Um processo simples e direto para você começar a economizar tempo e dinheiro
          </p>
        </div>

        {/* Grid com os 4 cards de passos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Card de cada passo com ícone circular */}
              <div className="flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br from-card to-card/50 border border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-glow h-full overflow-hidden">
                
                {/* Barra animada no topo do card ao passar o mouse */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                
                {/* Ícone do passo dentro de um círculo */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  {/* Número do passo no canto superior direito */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-elegant">
                    {index + 1}
                  </div>
                </div>
                
                {/* Título do passo */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                
                {/* Descrição do passo */}
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Linha conectando os passos (visível apenas em desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
