// Importação dos ícones e imagens da seção de benefícios
import { CheckCircle, Users, TrendingUp, Shield } from "lucide-react";
import fleetImage from "@/assets/fleet-technology.jpg"; // Nova imagem de tecnologia de frota
import driverImage from "@/assets/professional-driver.jpg"; // Imagem de motorista profissional

// Lista dos principais benefícios oferecidos pela ROMA
const benefits = [
  {
    icon: CheckCircle,
    title: "A Roma cuida da parte chata",
    description: "Planilhas, despesas, rotas, abastecimento - tudo gerenciado para você",
  },
  {
    icon: Users,
    title: "Você foca no que importa",
    description: "Dirigir, fechar fretes, cuidar da sua equipe - seu negócio em primeiro lugar",
  },
  {
    icon: TrendingUp,
    title: "Equipe humanizada",
    description: "Atendimento individualizado e personalizado para cada cliente",
  },
  {
    icon: Shield,
    title: "Sem complicações técnicas",
    description: "Ideal para quem não gosta ou não entende de sistemas complexos",
  },
];

// Componente principal da seção de benefícios
const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Título da seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Por que escolher a Roma?
          </h2>
          <p className="text-lg text-muted-foreground">
            Gestão de frotas que realmente entende as necessidades do transportador
          </p>
        </div>

        {/* Cards com os benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-card to-card/50 rounded-2xl p-8 shadow-lg hover:shadow-elegant transition-all duration-300 border border-primary/20 hover:border-primary overflow-hidden"
            >
              {/* Círculo decorativo de fundo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />

              {/* Conteúdo do card */}
              <div className="relative z-10">
                {/* Ícone */}
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-elegant">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Título e descrição */}
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de depoimento */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Imagem do motorista */}
          <div className="relative rounded-2xl overflow-hidden h-[500px] shadow-elegant">
            <img src={driverImage} alt="Motorista profissional" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />
          </div>

          {/* Card com depoimento */}
          <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary/20 shadow-elegant">
            {/* Badge "Depoimento" */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-12 bg-primary rounded-full" />
              <span className="text-primary font-bold text-sm tracking-wider uppercase">Depoimento</span>
            </div>

            {/* Texto do depoimento */}
            <p className="text-2xl md:text-3xl text-foreground font-semibold mb-8 leading-relaxed">
              "Com a Roma, consegui organizar minha frota e aumentar minha rentabilidade. O atendimento é excelente e eles realmente entendem as necessidades do transportador."
            </p>

            {/* Informações do cliente */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-elegant">
                JM
              </div>
              <div>
                <p className="text-foreground font-bold text-lg">João Mendes</p>
                <p className="text-muted-foreground">Transportador Autônomo, Francisco Beltrão</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
