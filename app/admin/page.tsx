"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Package, Tag, Star, DollarSign, Activity } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Oferta {
  id: string
  titulo: string
  descricao: string
  desconto: number
  categoria: string
  dataInicio: string
  dataFim: string
  ativa: boolean
  produtos: string[]
}

interface Produto {
  id: string
  nome: string
  preco: number
  descricao: string
  categoria: string
  imagem: string
  ativo: boolean
  destaque: boolean
}

export default function AdminPage() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [editingOferta, setEditingOferta] = useState<Oferta | null>(null)
  const [editingProduto, setEditingProduto] = useState<Produto | null>(null)
  const [isOfertaDialogOpen, setIsOfertaDialogOpen] = useState(false)
  const [isProdutoDialogOpen, setIsProdutoDialogOpen] = useState(false)

  const adminPassword = "rvstore2024"

  useEffect(() => {
    const savedOfertas = localStorage.getItem("rv-store-ofertas")
    if (savedOfertas) {
      setOfertas(JSON.parse(savedOfertas))
    }

    const savedProdutos = localStorage.getItem("rv-store-produtos")
    if (savedProdutos) {
      setProdutos(JSON.parse(savedProdutos))
    } else {
      const defaultProdutos: Produto[] = [
        {
          id: "1",
          nome: "Camisa Polo Premium",
          preco: 89.9,
          descricao: "Camisa polo de alta qualidade, 100% algodão",
          categoria: "camisas",
          imagem: "/placeholder-6mwlo.png",
          ativo: true,
          destaque: true,
        },
        {
          id: "2",
          nome: "Calça Jeans Slim",
          preco: 129.9,
          descricao: "Calça jeans slim fit, corte moderno",
          categoria: "calcas",
          imagem: "/calca-jeans-slim-masculina.png",
          ativo: true,
          destaque: true,
        },
        {
          id: "3",
          nome: "Bermuda Cargo",
          preco: 69.9,
          descricao: "Bermuda cargo com múltiplos bolsos",
          categoria: "bermudas",
          imagem: "/bermuda-cargo-masculina.png",
          ativo: true,
          destaque: true,
        },
      ]
      setProdutos(defaultProdutos)
      localStorage.setItem("rv-store-produtos", JSON.stringify(defaultProdutos))
    }
  }, [])

  const saveOfertas = (newOfertas: Oferta[]) => {
    setOfertas(newOfertas)
    localStorage.setItem("rv-store-ofertas", JSON.stringify(newOfertas))
  }

  const saveProdutos = (newProdutos: Produto[]) => {
    setProdutos(newProdutos)
    localStorage.setItem("rv-store-produtos", JSON.stringify(newProdutos))
  }

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true)
    } else {
      alert("Senha incorreta!")
    }
  }

  const stats = {
    totalProdutos: produtos.length,
    produtosAtivos: produtos.filter((p) => p.ativo).length,
    produtosDestaque: produtos.filter((p) => p.destaque).length,
    totalOfertas: ofertas.length,
    ofertasAtivas: ofertas.filter((o) => o.ativa).length,
    valorMedioProducts: produtos.length > 0 ? produtos.reduce((acc, p) => acc + p.preco, 0) / produtos.length : 0,
  }

  const handleCreateOferta = (formData: FormData) => {
    const newOferta: Oferta = {
      id: Date.now().toString(),
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      desconto: Number(formData.get("desconto")),
      categoria: formData.get("categoria") as string,
      dataInicio: formData.get("dataInicio") as string,
      dataFim: formData.get("dataFim") as string,
      ativa: true,
      produtos: (formData.get("produtos") as string)
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
    }

    const newOfertas = [...ofertas, newOferta]
    saveOfertas(newOfertas)
    setIsOfertaDialogOpen(false)
  }

  const handleEditOferta = (formData: FormData) => {
    if (!editingOferta) return

    const updatedOferta: Oferta = {
      ...editingOferta,
      titulo: formData.get("titulo") as string,
      descricao: formData.get("descricao") as string,
      desconto: Number(formData.get("desconto")),
      categoria: formData.get("categoria") as string,
      dataInicio: formData.get("dataInicio") as string,
      dataFim: formData.get("dataFim") as string,
      produtos: (formData.get("produtos") as string)
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p),
    }

    const newOfertas = ofertas.map((o) => (o.id === editingOferta.id ? updatedOferta : o))
    saveOfertas(newOfertas)
    setEditingOferta(null)
    setIsOfertaDialogOpen(false)
  }

  const handleDeleteOferta = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta oferta?")) {
      const newOfertas = ofertas.filter((o) => o.id !== id)
      saveOfertas(newOfertas)
    }
  }

  const toggleOfertaStatus = (id: string) => {
    const newOfertas = ofertas.map((o) => (o.id === id ? { ...o, ativa: !o.ativa } : o))
    saveOfertas(newOfertas)
  }

  const handleCreateProduto = (formData: FormData) => {
    const newProduto: Produto = {
      id: Date.now().toString(),
      nome: formData.get("nome") as string,
      preco: Number(formData.get("preco")),
      descricao: formData.get("descricao") as string,
      categoria: formData.get("categoria") as string,
      imagem: (formData.get("imagem") as string) || "/masculine-product.png",
      ativo: true,
      destaque: formData.get("destaque") === "on",
    }

    const newProdutos = [...produtos, newProduto]
    saveProdutos(newProdutos)
    setIsProdutoDialogOpen(false)
  }

  const handleEditProduto = (formData: FormData) => {
    if (!editingProduto) return

    const updatedProduto: Produto = {
      ...editingProduto,
      nome: formData.get("nome") as string,
      preco: Number(formData.get("preco")),
      descricao: formData.get("descricao") as string,
      categoria: formData.get("categoria") as string,
      imagem: (formData.get("imagem") as string) || editingProduto.imagem,
      destaque: formData.get("destaque") === "on",
    }

    const newProdutos = produtos.map((p) => (p.id === editingProduto.id ? updatedProduto : p))
    saveProdutos(newProdutos)
    setEditingProduto(null)
    setIsProdutoDialogOpen(false)
  }

  const handleDeleteProduto = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      const newProdutos = produtos.filter((p) => p.id !== id)
      saveProdutos(newProdutos)
    }
  }

  const toggleProdutoStatus = (id: string) => {
    const newProdutos = produtos.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p))
    saveProdutos(newProdutos)
  }

  const toggleProdutoDestaque = (id: string) => {
    const newProdutos = produtos.map((p) => (p.id === id ? { ...p, destaque: !p.destaque } : p))
    saveProdutos(newProdutos)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-800/90 backdrop-blur-sm relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <img src="/rv-store-logo.jpeg" alt="RV Store" className="w-12 h-12 rounded-full object-cover" />
            </div>
            <CardTitle className="text-white text-3xl font-bold">RV Store Admin</CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Digite a senha para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="password" className="text-slate-300 text-base">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="bg-slate-700 border-slate-600 text-white text-lg py-3 mt-2"
                placeholder="Digite sua senha..."
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Entrar no Painel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <img src="/rv-store-logo.jpeg" alt="RV Store" className="w-10 h-10 rounded-lg object-cover" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                RV Store Admin
              </h1>
              <p className="text-slate-600 text-lg">Painel de Controle Administrativo</p>
            </div>
          </div>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Sair do Painel
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total de Produtos</p>
                  <p className="text-3xl font-bold">{stats.totalProdutos}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Produtos Ativos</p>
                  <p className="text-3xl font-bold">{stats.produtosAtivos}</p>
                </div>
                <Activity className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Ofertas Ativas</p>
                  <p className="text-3xl font-bold">{stats.ofertasAtivas}</p>
                </div>
                <Tag className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Preço Médio</p>
                  <p className="text-3xl font-bold">R$ {stats.valorMedioProducts.toFixed(0)}</p>
                </div>
                <DollarSign className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="produtos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl p-2 border border-slate-200">
            <TabsTrigger
              value="produtos"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-lg py-3 rounded-lg transition-all duration-300"
            >
              <Package className="w-5 h-5 mr-2" />
              Produtos ({produtos.length})
            </TabsTrigger>
            <TabsTrigger
              value="ofertas"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-lg py-3 rounded-lg transition-all duration-300"
            >
              <Tag className="w-5 h-5 mr-2" />
              Ofertas ({ofertas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="produtos" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center">
                <Package className="w-8 h-8 mr-3 text-blue-600" />
                Gerenciar Produtos
              </h2>
              <Dialog open={isProdutoDialogOpen} onOpenChange={setIsProdutoDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingProduto(null)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingProduto ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                    <DialogDescription>Preencha os dados do produto abaixo</DialogDescription>
                  </DialogHeader>
                  <form action={editingProduto ? handleEditProduto : handleCreateProduto} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nome">Nome do Produto</Label>
                        <Input id="nome" name="nome" defaultValue={editingProduto?.nome} required />
                      </div>
                      <div>
                        <Label htmlFor="preco">Preço (R$)</Label>
                        <Input
                          id="preco"
                          name="preco"
                          type="number"
                          step="0.01"
                          min="0"
                          defaultValue={editingProduto?.preco}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea id="descricao" name="descricao" defaultValue={editingProduto?.descricao} required />
                    </div>
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select name="categoria" defaultValue={editingProduto?.categoria}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="camisas">Camisas</SelectItem>
                          <SelectItem value="calcas">Calças</SelectItem>
                          <SelectItem value="bermudas">Bermudas</SelectItem>
                          <SelectItem value="acessorios">Acessórios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="imagem">URL da Imagem</Label>
                      <Input
                        id="imagem"
                        name="imagem"
                        type="url"
                        placeholder="https://exemplo.com/imagem.jpg"
                        defaultValue={editingProduto?.imagem}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="destaque"
                        name="destaque"
                        defaultChecked={editingProduto?.destaque}
                        className="rounded"
                      />
                      <Label htmlFor="destaque">Produto em Destaque</Label>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsProdutoDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                        {editingProduto ? "Salvar Alterações" : "Criar Produto"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-8">
              {produtos.length === 0 ? (
                <Card className="bg-white shadow-xl rounded-2xl border border-slate-200">
                  <CardContent className="text-center py-16">
                    <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 text-xl font-medium">Nenhum produto cadastrado ainda.</p>
                    <p className="text-slate-400 text-lg">Clique em "Novo Produto" para começar.</p>
                  </CardContent>
                </Card>
              ) : (
                produtos.map((produto) => (
                  <Card
                    key={produto.id}
                    className={`bg-white shadow-xl rounded-2xl border border-slate-200 hover:shadow-2xl transition-all duration-300 ${!produto.ativo ? "opacity-60" : ""}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-6">
                          <div className="relative">
                            <img
                              src={produto.imagem || "/placeholder.svg"}
                              alt={produto.nome}
                              className="w-24 h-24 object-cover rounded-xl shadow-lg"
                            />
                            {produto.destaque && (
                              <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                                <Star className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-3 text-xl">
                              {produto.nome}
                              <Badge variant={produto.ativo ? "default" : "secondary"} className="text-sm">
                                {produto.ativo ? "Ativo" : "Inativo"}
                              </Badge>
                              {produto.destaque && (
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                  <Star className="w-3 h-3 mr-1" />
                                  Destaque
                                </Badge>
                              )}
                            </CardTitle>
                            <CardDescription className="text-base mt-2">{produto.descricao}</CardDescription>
                            <p className="text-2xl font-bold text-green-600 mt-3">R$ {produto.preco.toFixed(2)}</p>
                            <Badge variant="outline" className="mt-2 capitalize">
                              {produto.categoria}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleProdutoDestaque(produto.id)}
                            className={`${produto.destaque ? "bg-yellow-50 border-yellow-200 text-yellow-700" : ""} hover:scale-105 transition-transform duration-200`}
                          >
                            {produto.destaque ? (
                              <Star className="w-4 h-4 fill-current" />
                            ) : (
                              <Star className="w-4 h-4" />
                            )}
                          </Button>
                          <Switch
                            checked={produto.ativo}
                            onCheckedChange={() => toggleProdutoStatus(produto.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingProduto(produto)
                              setIsProdutoDialogOpen(true)
                            }}
                            className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-200"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduto(produto.id)}
                            className="hover:bg-red-50 hover:border-red-300 hover:scale-105 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="ofertas" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center">
                <Tag className="w-8 h-8 mr-3 text-purple-600" />
                Gerenciar Ofertas
              </h2>
              <Dialog open={isOfertaDialogOpen} onOpenChange={setIsOfertaDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setEditingOferta(null)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nova Oferta
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingOferta ? "Editar Oferta" : "Nova Oferta"}</DialogTitle>
                    <DialogDescription>Preencha os dados da oferta abaixo</DialogDescription>
                  </DialogHeader>
                  <form action={editingOferta ? handleEditOferta : handleCreateOferta} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="titulo">Título</Label>
                        <Input id="titulo" name="titulo" defaultValue={editingOferta?.titulo} required />
                      </div>
                      <div>
                        <Label htmlFor="desconto">Desconto (%)</Label>
                        <Input
                          id="desconto"
                          name="desconto"
                          type="number"
                          min="1"
                          max="100"
                          defaultValue={editingOferta?.desconto}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea id="descricao" name="descricao" defaultValue={editingOferta?.descricao} required />
                    </div>
                    <div>
                      <Label htmlFor="categoria">Categoria</Label>
                      <Select name="categoria" defaultValue={editingOferta?.categoria}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="camisas">Camisas</SelectItem>
                          <SelectItem value="calcas">Calças</SelectItem>
                          <SelectItem value="bermudas">Bermudas</SelectItem>
                          <SelectItem value="acessorios">Acessórios</SelectItem>
                          <SelectItem value="todos">Todos os Produtos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dataInicio">Data de Início</Label>
                        <Input
                          id="dataInicio"
                          name="dataInicio"
                          type="date"
                          defaultValue={editingOferta?.dataInicio}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dataFim">Data de Fim</Label>
                        <Input id="dataFim" name="dataFim" type="date" defaultValue={editingOferta?.dataFim} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="produtos">Produtos Específicos (opcional)</Label>
                      <Input
                        id="produtos"
                        name="produtos"
                        placeholder="Ex: Camisa Polo Azul, Calça Jeans Slim"
                        defaultValue={editingOferta?.produtos.join(", ")}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Separe os produtos por vírgula. Deixe vazio para aplicar a toda categoria.
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsOfertaDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-purple-500 hover:bg-purple-600">
                        {editingOferta ? "Salvar Alterações" : "Criar Oferta"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-8">
              {ofertas.length === 0 ? (
                <Card className="bg-white shadow-xl rounded-2xl border border-slate-200">
                  <CardContent className="text-center py-16">
                    <Tag className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 text-xl font-medium">Nenhuma oferta cadastrada ainda.</p>
                    <p className="text-slate-400 text-lg">Clique em "Nova Oferta" para começar.</p>
                  </CardContent>
                </Card>
              ) : (
                ofertas.map((oferta) => (
                  <Card
                    key={oferta.id}
                    className={`bg-white shadow-xl rounded-2xl border border-slate-200 hover:shadow-2xl transition-all duration-300 ${!oferta.ativa ? "opacity-60" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-3 text-xl">
                            {oferta.titulo}
                            <Badge variant={oferta.ativa ? "default" : "secondary"} className="text-sm">
                              {oferta.ativa ? "Ativa" : "Inativa"}
                            </Badge>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {oferta.desconto}% OFF
                            </Badge>
                          </CardTitle>
                          <CardDescription>{oferta.descricao}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Switch checked={oferta.ativa} onCheckedChange={() => toggleOfertaStatus(oferta.id)} />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingOferta(oferta)
                              setIsOfertaDialogOpen(true)
                            }}
                            className="hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-200"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteOferta(oferta.id)}
                            className="hover:bg-red-50 hover:border-red-300 hover:scale-105 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Categoria</p>
                          <p className="capitalize">{oferta.categoria}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Período</p>
                          <p>
                            {new Date(oferta.dataInicio).toLocaleDateString()} -{" "}
                            {new Date(oferta.dataFim).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Desconto</p>
                          <p className="text-green-600 font-semibold">{oferta.desconto}%</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Status</p>
                          <p className={oferta.ativa ? "text-green-600" : "text-gray-500"}>
                            {oferta.ativa ? "Ativa" : "Inativa"}
                          </p>
                        </div>
                      </div>
                      {oferta.produtos.length > 0 && (
                        <div className="mt-4">
                          <p className="font-medium text-gray-700 mb-2">Produtos Específicos:</p>
                          <div className="flex flex-wrap gap-2">
                            {oferta.produtos.map((produto, index) => (
                              <Badge key={index} variant="outline">
                                {produto}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
