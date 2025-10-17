import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { LogOut, Users, Settings } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Verificar se o usuário é admin
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (userRole?.role === "admin") {
        setIsAuthenticated(true);
        loadSubmissions();
      } else {
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Login simples apenas para demonstração
    // Em produção, você deve usar o Supabase Auth adequadamente
    if (email === "admin" && password === "123*") {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: "admin@roma.com.br",
          password: "admin123",
        });

        if (error) throw error;

        setIsAuthenticated(true);
        loadSubmissions();
        toast({
          title: "Login realizado",
          description: "Bem-vindo ao painel administrativo!",
        });
      } catch (error) {
        toast({
          title: "Erro no login",
          description: "Verifique suas credenciais.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Credenciais inválidas",
        description: "Use admin / 123*",
        variant: "destructive",
      });
    }
  };

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar submissões:", error);
      return;
    }

    setSubmissions(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              <span className="text-primary">ROMA</span> Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Usuário</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123*"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">ROMA</span> Admin
          </h1>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submissions" className="gap-2">
              <Users className="w-4 h-4" />
              Contatos ({submissions.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions" className="space-y-4">
            {submissions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Nenhum contato recebido ainda.
                </CardContent>
              </Card>
            ) : (
              submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{submission.full_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Cidade:</strong> {submission.city}</p>
                    <p><strong>WhatsApp:</strong> {submission.phone}</p>
                    <p><strong>Caminhões:</strong> {submission.truck_count}</p>
                    {submission.has_admin_staff !== null && (
                      <p><strong>Possui equipe administrativa:</strong> {submission.has_admin_staff ? "Sim" : "Não"}</p>
                    )}
                    {submission.tried_system !== null && (
                      <p><strong>Já tentou sistema:</strong> {submission.tried_system ? "Sim" : "Não"}</p>
                    )}
                    {submission.tried_system_details && (
                      <p><strong>Sistemas utilizados:</strong> {submission.tried_system_details}</p>
                    )}
                    {submission.wants_full_registration && (
                      <p className="text-primary font-semibold">✅ Quer cadastro completo e eventos</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      <strong>Recebido em:</strong> {new Date(submission.created_at).toLocaleString("pt-BR")}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Site</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidade de edição de conteúdo em desenvolvimento.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
