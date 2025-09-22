"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Instagram,
  MessageCircle,
  Clock,
  ShoppingBag,
  Star,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Truck,
  Heart,
} from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { useAdmin } from "@/contexts/admin-context"
import { useProducts } from "@/contexts/products-context"
import { ProductEditModal } from "@/components/admin/product-edit-modal"

export default function HomePage() {
  const { isAdmin } = useAdmin()
  const { products, updateProduct, deleteProduct, toggleProductStatus } = useProducts()
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const displayProducts = isAdmin ? products : products.filter((p) => p.isActive)
  const featuredProducts = displayProducts.slice(0, 3)

  const handleAddToCart = (productName: string, price: string) => {
    console.log(`Adding ${productName} (${price}) to cart`)
    window.open(
      `https://wa.me/5581996630750?text=Olá! Gostaria de adicionar ao carrinho: ${productName} - ${price}`,
      "_blank",
    )
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setIsEditModalOpen(true)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(productId)
    }
  }

  const handleToggleProductStatus = (productId: number) => {
    toggleProductStatus(productId)
  }

  const handleSaveProduct = (product: any) => {
    updateProduct(product.id, product)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src="/rv-store-logo.jpeg" alt="RV Store Logo" className="h-12 w-auto rounded-md shadow-sm" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-serif font-black text-foreground tracking-tight">RV STORE</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/produtos"
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Produtos
              </a>
              <a
                href="/sobre"
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Sobre
              </a>
              <a
                href="#contato"
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium hover:scale-105"
              >
                Contato
              </a>
              {isAdmin && <Badge className="bg-red-100 text-red-800 border-red-200 animate-pulse">Modo Admin</Badge>}
              <CartDrawer />
            </nav>
            <div className="flex md:hidden items-center space-x-2">
              <CartDrawer />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base animate-bounce">
              <Star className="w-4 md:w-5 h-4 md:h-5 mr-2 text-amber-500" />
              Moda Masculina Premium
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-black text-foreground mb-6 md:mb-8 leading-tight">
            Estilo Masculino
            <br />
            <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Autêntico
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Descubra as melhores peças de moda masculina na RV Store. Qualidade excepcional, estilo único e atendimento
            personalizado via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 md:px-10 py-3 md:py-4 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="/produtos">
                <ShoppingBag className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6" />
                Ver Produtos
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base md:text-lg px-8 md:px-10 py-3 md:py-4 border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() =>
                window.open(
                  "https://wa.me/5581996630750?text=Olá! Gostaria de saber mais sobre os produtos da RV Store.",
                  "_blank",
                )
              }
            >
              <MessageCircle className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6 text-green-500" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="bg-primary/10 rounded-full p-3 md:p-4 w-14 md:w-16 h-14 md:h-16 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 md:w-8 h-6 md:h-8 text-primary mx-auto" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-base md:text-lg">Qualidade Garantida</h3>
              <p className="text-muted-foreground text-sm">Produtos selecionados com os melhores materiais</p>
            </div>
            <div className="text-center group">
              <div className="bg-green-100 rounded-full p-3 md:p-4 w-14 md:w-16 h-14 md:h-16 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-6 md:w-8 h-6 md:h-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-base md:text-lg">Entrega Rápida</h3>
              <p className="text-muted-foreground text-sm">Receba seus produtos com agilidade e segurança</p>
            </div>
            <div className="text-center group">
              <div className="bg-red-100 rounded-full p-3 md:p-4 w-14 md:w-16 h-14 md:h-16 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 md:w-8 h-6 md:h-8 text-red-600 mx-auto" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-base md:text-lg">Atendimento Personalizado</h3>
              <p className="text-muted-foreground text-sm">Suporte dedicado via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section id="produtos" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="bg-secondary/20 text-secondary-foreground mb-4">Destaques</Badge>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 md:mb-6">
              Produtos em Destaque
            </h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
              Confira alguns dos nossos produtos mais procurados e apaixone-se pelo estilo autêntico
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg relative overflow-hidden hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {isAdmin && (
                  <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-blue-100/90 hover:bg-blue-200 border-blue-300 backdrop-blur-sm"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className={`h-8 w-8 p-0 backdrop-blur-sm ${product.isActive ? "bg-orange-100/90 hover:bg-orange-200 border-orange-300" : "bg-green-100/90 hover:bg-green-200 border-green-300"}`}
                      onClick={() => handleToggleProductStatus(product.id)}
                    >
                      {product.isActive ? (
                        <EyeOff className="h-4 w-4 text-orange-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-green-600" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-red-100/90 hover:bg-red-200 border-red-300 backdrop-blur-sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg mb-6 overflow-hidden relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {product.isOffer && (
                        <Badge className="bg-red-500 text-white shadow-lg animate-pulse">Oferta</Badge>
                      )}
                      {!product.isActive && isAdmin && (
                        <Badge className="bg-gray-500 text-white shadow-lg">Inativo</Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-foreground mb-3 text-lg md:text-xl">{product.name}</h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        {product.isOffer && product.originalPrice && (
                          <span className="text-xs md:text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-lg md:text-xl font-bold text-primary">{product.price}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs md:text-sm px-3 md:px-4"
                        onClick={() => handleAddToCart(product.name, product.price)}
                        disabled={!product.isActive}
                      >
                        <Plus className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary/10 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
              asChild
            >
              <a href="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-16 md:py-20 bg-gradient-to-br from-muted/30 to-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="flex items-center mb-6 md:mb-8">
                <div className="bg-primary/10 rounded-full p-2 md:p-3 mr-3 md:mr-4">
                  <Users className="w-6 md:w-8 h-6 md:h-8 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Sobre a RV Store</h3>
              </div>
              <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                A RV Store é uma loja especializada em moda masculina, oferecendo peças de qualidade excepcional com
                estilo autêntico. Nosso compromisso é proporcionar a melhor experiência de compra através do atendimento
                personalizado via WhatsApp.
              </p>
              <p className="text-muted-foreground mb-8 md:mb-10 leading-relaxed text-base md:text-lg">
                Trabalhamos com marcas selecionadas e peças exclusivas para homens que valorizam qualidade e bom gosto
                no vestir. Cada produto é cuidadosamente escolhido para garantir satisfação total.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <Button
                  className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                  onClick={() => window.open("https://instagram.com/rvstore.1", "_blank")}
                >
                  <Instagram className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
                  Seguir no Instagram
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center border-2 border-primary text-primary hover:bg-primary/10 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                  asChild
                >
                  <a href="/sobre">
                    Saiba Mais
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="aspect-square bg-card rounded-2xl overflow-hidden shadow-2xl relative group">
              <img
                src="/placeholder-oskiz.png"
                alt="Loja RV Store"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contato" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">Contato</Badge>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 md:mb-6">Entre em Contato</h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Estamos prontos para atender você com excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group hover:-translate-y-2">
              <div className="bg-green-100 rounded-full p-3 md:p-4 w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 md:h-12 w-8 md:w-12 text-green-600 mx-auto" />
              </div>
              <h4 className="font-bold text-foreground mb-2 md:mb-3 text-lg md:text-xl">WhatsApp</h4>
              <p className="text-muted-foreground text-sm mb-4 md:mb-6">Atendimento personalizado e rápido</p>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                onClick={() =>
                  window.open(
                    "https://wa.me/5581996630750?text=Olá! Preciso de ajuda com um produto da RV Store.",
                    "_blank",
                  )
                }
              >
                Chamar no WhatsApp
              </Button>
            </Card>

            <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-3 md:p-4 w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Instagram className="h-8 md:h-12 w-8 md:w-12 text-purple-600 mx-auto" />
              </div>
              <h4 className="font-bold text-foreground mb-2 md:mb-3 text-lg md:text-xl">Instagram</h4>
              <p className="text-muted-foreground text-sm mb-4 md:mb-6">@rvstore.1</p>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-xs md:text-sm"
                onClick={() => window.open("https://instagram.com/rvstore.1", "_blank")}
              >
                Seguir
              </Button>
            </Card>

            <Card className="text-center p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group hover:-translate-y-2">
              <div className="bg-blue-100 rounded-full p-3 md:p-4 w-16 md:w-20 h-16 md:h-20 mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 md:h-12 w-8 md:w-12 text-blue-600 mx-auto" />
              </div>
              <h4 className="font-bold text-foreground mb-2 md:mb-3 text-lg md:text-xl">Horário</h4>
              <p className="text-muted-foreground text-sm">Seg-Sáb: 9h às 18h</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-0">
              <img src="/rv-store-logo.jpeg" alt="RV Store Logo" className="h-8 md:h-10 w-auto rounded shadow-sm" />
              <div className="flex flex-col">
                <h5 className="text-xl md:text-2xl font-serif font-black text-foreground">RV STORE</h5>
              </div>
            </div>
            <p className="text-muted-foreground text-sm md:text-base text-center">
              © 2024 RV Store. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Product Edit Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingProduct(null)
        }}
        onSave={handleSaveProduct}
      />
    </div>
  )
}
