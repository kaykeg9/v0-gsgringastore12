"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CartDrawer } from "@/components/cart-drawer"
import { AddToCartDialog } from "@/components/add-to-cart-dialog"
import { openWhatsApp, WhatsAppMessages } from "@/lib/whatsapp"

// Mock data - será substituído pelos dados reais do usuário
const produtos = [
  {
    id: 1,
    nome: "Camisa Social Premium",
    categoria: "Camisas",
    preco: 89.9,
    imagem: "/elegant-mens-shirt.png?height=300&width=300&query=camisa social masculina premium",
    descricao: "Tecido de alta qualidade, corte moderno",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Branco", "Azul", "Preto"],
  },
  {
    id: 2,
    nome: "Polo Casual Fit",
    categoria: "Polos",
    preco: 65.9,
    imagem: "/elegant-mens-shirt.png?height=300&width=300&query=polo masculina casual",
    descricao: "Conforto e estilo para o dia a dia",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Marinho", "Branco", "Verde"],
  },
  {
    id: 3,
    nome: "Calça Jeans Slim",
    categoria: "Calças",
    preco: 129.9,
    imagem: "/elegant-mens-shirt.png?height=300&width=300&query=calça jeans masculina slim",
    descricao: "Jeans premium com elastano",
    tamanhos: ["38", "40", "42", "44"],
    cores: ["Azul Escuro", "Azul Claro", "Preto"],
  },
  {
    id: 4,
    nome: "Camiseta Básica",
    categoria: "Camisetas",
    preco: 39.9,
    imagem: "/elegant-mens-shirt.png?height=300&width=300&query=camiseta masculina básica",
    descricao: "100% algodão, várias cores",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Branco", "Preto", "Cinza", "Marinho"],
  },
  {
    id: 5,
    nome: "Bermuda Sarja",
    categoria: "Bermudas",
    preco: 79.9,
    imagem: "/elegant-mens-shirt.png?height=300&width=300&query=bermuda masculina sarja",
    descricao: "Sarja de qualidade, corte regular",
    tamanhos: ["38", "40", "42", "44"],
    cores: ["Bege", "Marinho", "Verde Militar"],
  },
  {
    id: 6,
    nome: "Jaqueta Jeans",
    categoria: "Jaquetas",
    preco: 159.9,
    imagem: "/elegant-mens-shirt.png?height=300&width=300&query=jaqueta jeans masculina",
    descricao: "Jeans resistente, estilo atemporal",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Azul Escuro", "Azul Desbotado"],
  },
]

const categorias = ["Todas", "Camisas", "Polos", "Calças", "Camisetas", "Bermudas", "Jaquetas"]

export default function ProdutosPageClient() {
  const [busca, setBusca] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas")
  const [ordenacao, setOrdenacao] = useState("nome")

  const produtosFiltrados = produtos
    .filter((produto) => {
      const matchBusca =
        produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(busca.toLowerCase())
      const matchCategoria = categoriaFiltro === "Todas" || produto.categoria === categoriaFiltro
      return matchBusca && matchCategoria
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case "preco-menor":
          return a.preco - b.preco
        case "preco-maior":
          return b.preco - a.preco
        case "nome":
        default:
          return a.nome.localeCompare(b.nome)
      }
    })

  const handleWhatsAppOrder = (produto: (typeof produtos)[0]) => {
    const message = WhatsAppMessages.productInquiry(produto.nome, produto.preco)
    openWhatsApp(message)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Link>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-serif font-black text-foreground">RV STORE</h1>
                <Badge variant="secondary" className="text-xs">
                  Produtos
                </Badge>
              </div>
            </div>
            <CartDrawer />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros e Busca */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Nossos Produtos</h2>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Busca */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filtro por Categoria */}
            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className="w-full lg:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nome">Nome A-Z</SelectItem>
                <SelectItem value="preco-menor">Menor Preço</SelectItem>
                <SelectItem value="preco-maior">Maior Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contador de Resultados */}
          <p className="text-muted-foreground">
            {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? "s" : ""} encontrado
            {produtosFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <Card key={produto.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={produto.imagem || "/placeholder.svg"}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {produto.categoria}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{produto.nome}</h3>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{produto.descricao}</p>

                  {/* Tamanhos Disponíveis */}
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Tamanhos:</p>
                    <div className="flex flex-wrap gap-1">
                      {produto.tamanhos.slice(0, 4).map((tamanho) => (
                        <Badge key={tamanho} variant="secondary" className="text-xs px-2 py-0">
                          {tamanho}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Cores Disponíveis */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Cores:</p>
                    <p className="text-xs text-foreground">
                      {produto.cores.slice(0, 2).join(", ")}
                      {produto.cores.length > 2 && ` +${produto.cores.length - 2}`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">
                        R$ {produto.preco.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <AddToCartDialog produto={produto} />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWhatsAppOrder(produto)}
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem quando não há produtos */}
        {produtosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
            <Button
              variant="outline"
              onClick={() => {
                setBusca("")
                setCategoriaFiltro("Todas")
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted rounded-lg p-8">
          <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Não encontrou o que procura?</h3>
          <p className="text-muted-foreground mb-6">
            Entre em contato conosco pelo WhatsApp e encontraremos o produto ideal para você!
          </p>
          <Button size="lg" onClick={() => openWhatsApp(WhatsAppMessages.generalInquiry())}>
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
