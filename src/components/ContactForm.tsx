import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    phone: "",
    truckCount: "",
    hasAdminStaff: undefined as boolean | undefined,
    triedSystem: undefined as boolean | undefined,
    triedSystemDetails: "",
    wantsFullRegistration: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.city || !formData.phone || !formData.truckCount) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Salvar no banco de dados
      const { error } = await supabase.from("form_submissions").insert({
        full_name: formData.fullName,
        city: formData.city,
        phone: formData.phone,
        truck_count: formData.truckCount,
        has_admin_staff: formData.hasAdminStaff,
        tried_system: formData.triedSystem,
        tried_system_details: formData.triedSystemDetails || null,
        wants_full_registration: formData.wantsFullRegistration,
      });

      if (error) throw error;

      // Criar mensagem para WhatsApp
      const message = `*Novo Contato - ROMA Gestão de Frotas*

📋 *Dados do Cliente:*
Nome: ${formData.fullName}
Cidade: ${formData.city}
WhatsApp: ${formData.phone}
Quantidade de caminhões: ${formData.truckCount}

${formData.hasAdminStaff !== undefined ? `Possui equipe administrativa: ${formData.hasAdminStaff ? "Sim" : "Não"}` : ""}
${formData.triedSystem !== undefined ? `Já tentou usar sistema: ${formData.triedSystem ? "Sim" : "Não"}` : ""}
${formData.triedSystemDetails ? `Sistemas utilizados: ${formData.triedSystemDetails}` : ""}

${formData.wantsFullRegistration ? "✅ *Cliente quer fazer cadastro completo e participar de eventos gratuitos*" : ""}`;

      // Redirecionar para WhatsApp
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5546976064925?text=${encodedMessage}`, "_blank");

      toast({
        title: "Enviado com sucesso!",
        description: "Você será redirecionado para o WhatsApp.",
      });

      // Limpar formulário
      setFormData({
        fullName: "",
        city: "",
        phone: "",
        truckCount: "",
        hasAdminStaff: undefined,
        triedSystem: undefined,
        triedSystemDetails: "",
        wantsFullRegistration: false,
      });
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Fale Conosco
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário e receba um contato personalizado via WhatsApp
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-xl border border-border space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome Completo *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Cidade/Região *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Ex: Francisco Beltrão/PR"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+55 46 99999-9999"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="truckCount">Quantidade de Caminhões *</Label>
              <select
                id="truckCount"
                value={formData.truckCount}
                onChange={(e) => setFormData({ ...formData, truckCount: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Selecione</option>
                <option value="1">1</option>
                <option value="2-5">2 a 5</option>
                <option value="6-10">6 a 10</option>
                <option value="+10">Mais de 10</option>
              </select>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="hasAdminStaff"
                  checked={formData.hasAdminStaff === true}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, hasAdminStaff: checked as boolean })
                  }
                />
                <Label htmlFor="hasAdminStaff" className="cursor-pointer leading-relaxed">
                  Já possui colaboradores administrativos?
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="triedSystem"
                  checked={formData.triedSystem === true}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, triedSystem: checked as boolean })
                  }
                />
                <Label htmlFor="triedSystem" className="cursor-pointer leading-relaxed">
                  Já tentou usar algum sistema de gestão?
                </Label>
              </div>

              {formData.triedSystem && (
                <div className="space-y-2 pl-7">
                  <Label htmlFor="triedSystemDetails">Quais sistemas você já utilizou?</Label>
                  <Input
                    id="triedSystemDetails"
                    value={formData.triedSystemDetails}
                    onChange={(e) =>
                      setFormData({ ...formData, triedSystemDetails: e.target.value })
                    }
                    placeholder="Ex: Sistema X, Sistema Y..."
                  />
                </div>
              )}

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="wantsFullRegistration"
                  checked={formData.wantsFullRegistration}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, wantsFullRegistration: checked as boolean })
                  }
                />
                <Label htmlFor="wantsFullRegistration" className="cursor-pointer leading-relaxed font-semibold">
                  Quero fazer o cadastro completo e participar de eventos gratuitos
                </Label>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
              <MessageCircle className="w-5 h-5" />
              {isSubmitting ? "Enviando..." : "Enviar para WhatsApp"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
