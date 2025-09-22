"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Instagram, MessageCircle, Clock, ArrowLeft, Users, Award, Heart } from "lucide-react"
import Link from "next/link"
import { CartDrawer } from "@/components/cart-drawer"
import { openWhatsApp, WhatsAppMessages } from "@/lib/whatsapp"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 md:h-5 w-4 md:w-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Voltar</span>
              </Link>
              <div className="flex items-center space-x-2">
                <img src="/rv-store-logo.jpeg" alt="RV Store Logo" className="h-6 md:h-8 w-auto" />
                <h1 className="text-xl md:text-2xl font-serif font-black text-foreground">RV STORE</h1>
                <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
                  Sobre Nós
                </Badge>
              </div>
            </div>
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-foreground mb-4 md:mb-6">
            Conheça a
            <br />
            <span className="text-primary">RV Store</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Uma loja especializada em moda masculina, comprometida em oferecer qualidade, estilo e atendimento
            excepcional para homens que valorizam o bom vestir.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 md:mb-6">Nossa História</h3>
              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                A RV Store nasceu da paixão por moda masculina e do desejo de oferecer peças de qualidade com
                atendimento personalizado. Fundada com o objetivo de democratizar o acesso ao estilo autêntico,
                começamos nossa jornada focando na curadoria de produtos que combinam qualidade, conforto e design.
              </p>
              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Desde o início, nossa missão tem sido clara: proporcionar uma experiência de compra única, onde cada
                cliente recebe atenção individualizada e encontra exatamente o que precisa para expressar seu estilo
                pessoal.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Hoje, continuamos crescendo e evoluindo, sempre mantendo nossos valores fundamentais de qualidade,
                autenticidade e excelência no atendimento.
              </p>
            </div>
            <div className="aspect-square bg-card rounded-lg overflow-hidden">
              <img src="/placeholder-0tfzn.png" alt="História da RV Store" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">Nossos Valores</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Os princípios que guiam nosso trabalho todos os dias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center p-6 md:p-8 bg-background">
              <Award className="h-12 md:h-16 w-12 md:w-16 text-primary mx-auto mb-4 md:mb-6" />
              <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-3 md:mb-4">Qualidade</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Selecionamos cuidadosamente cada peça, priorizando materiais de alta qualidade e acabamentos impecáveis
                que garantem durabilidade e conforto.
              </p>
            </Card>

            <Card className="text-center p-6 md:p-8 bg-background">
              <Heart className="h-12 md:h-16 w-12 md:w-16 text-primary mx-auto mb-4 md:mb-6" />
              <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-3 md:mb-4">Atendimento</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Cada cliente é único e merece atenção personalizada. Nosso atendimento via WhatsApp garante que você
                tenha toda a assistência necessária.
              </p>
            </Card>

            <Card className="text-center p-6 md:p-8 bg-background">
              <Users className="h-12 md:h-16 w-12 md:w-16 text-primary mx-auto mb-4 md:mb-6" />
              <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-3 md:mb-4">Autenticidade</h4>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Acreditamos que o estilo verdadeiro vem de dentro. Oferecemos peças que permitem a cada homem expressar
                sua personalidade única.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossos Produtos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold text-foreground mb-4">O Que Oferecemos</h3>
            <p className="text-muted-foreground">Uma curadoria especial de moda masculina</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                categoria: "Camisas Sociais",
                descricao: "Peças elegantes para ocasiões formais e profissionais",
                icone: "👔",
              },
              {
                categoria: "Casual Wear",
                descricao: "Polos, camisetas e peças para o dia a dia",
                icone: "👕",
              },
              {
                categoria: "Calças & Jeans",
                descricao: "Modelagens modernas em diversos tecidos",
                icone: "👖",
              },
              {
                categoria: "Outerwear",
                descricao: "Jaquetas e casacos para completar o look",
                icone: "🧥",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icone}</div>
                <h4 className="font-semibold text-foreground mb-2">{item.categoria}</h4>
                <p className="text-sm text-muted-foreground">{item.descricao}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/produtos">Ver Todos os Produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Informações de Contato Detalhadas */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">Entre em Contato</h3>
            <p className="text-muted-foreground text-sm md:text-base">
              Estamos aqui para ajudar você a encontrar o look perfeito
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Informações de Contato */}
            <div className="space-y-4 md:space-y-6">
              <Card className="p-4 md:p-6 bg-background">
                <div className="flex items-start gap-3 md:gap-4">
                  <MessageCircle className="h-5 md:h-6 w-5 md:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">WhatsApp</h4>
                    <p className="text-muted-foreground mb-3 text-xs md:text-sm">
                      Nosso canal principal de atendimento. Tire dúvidas, faça pedidos e receba suporte personalizado.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => openWhatsApp(WhatsAppMessages.aboutInquiry())}
                      className="text-xs md:text-sm"
                    >
                      Chamar no WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-background">
                <div className="flex items-start gap-3 md:gap-4">
                  <Instagram className="h-5 md:h-6 w-5 md:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">Instagram</h4>
                    <p className="text-muted-foreground mb-3 text-xs md:text-sm">
                      Acompanhe nossas novidades, looks inspiradores e bastidores da loja.
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3">@rvstore.1</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-xs md:text-sm"
                      onClick={() => window.open("https://instagram.com/rvstore.1", "_blank")}
                    >
                      Seguir no Instagram
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6 bg-background">
                <div className="flex items-start gap-3 md:gap-4">
                  <Clock className="h-5 md:h-6 w-5 md:w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-sm md:text-base">Horário de Atendimento</h4>
                    <div className="space-y-1 text-muted-foreground text-xs md:text-sm">
                      <p>Segunda a Sábado: 9h às 18h</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* FAQ */}
            <div>
              <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-4 md:mb-6">
                Perguntas Frequentes
              </h4>
              <div className="space-y-3 md:space-y-4">
                {[
                  {
                    pergunta: "Como faço um pedido?",
                    resposta:
                      "Você pode fazer pedidos diretamente pelo WhatsApp ou adicionar produtos ao carrinho no site e finalizar via WhatsApp.",
                  },
                  {
                    pergunta: "Vocês fazem entrega?",
                    resposta:
                      "Sim! Fazemos entregas na região. Entre em contato pelo WhatsApp para consultar disponibilidade e valores.",
                  },
                  {
                    pergunta: "Posso trocar um produto?",
                    resposta:
                      "Sim, aceitamos trocas em até 7 dias corridos, desde que o produto esteja em perfeitas condições.",
                  },
                  {
                    pergunta: "Como sei qual tamanho escolher?",
                    resposta:
                      "Nossa equipe pode ajudar com orientações de tamanho pelo WhatsApp. Também temos tabela de medidas disponível.",
                  },
                ].map((item, index) => (
                  <Card key={index} className="p-3 md:p-4 bg-background">
                    <h5 className="font-semibold text-foreground mb-2 text-sm md:text-base">{item.pergunta}</h5>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.resposta}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              Pronto para Renovar seu Guarda-Roupa?
            </h3>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
              Descubra nossa coleção completa e encontre as peças perfeitas para o seu estilo. Nossa equipe está pronta
              para ajudar você a fazer as melhores escolhas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/produtos">Ver Produtos</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent"
                onClick={() => openWhatsApp(WhatsAppMessages.aboutInquiry())}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar Conosco
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <h5 className="text-lg md:text-xl font-serif font-black text-foreground">RV STORE</h5>
              <Badge variant="secondary" className="text-xs">
                Moda Masculina
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm text-center">
              © 2024 RV Store. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
