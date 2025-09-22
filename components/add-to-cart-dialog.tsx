"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: number
  nome: string
  categoria: string
  preco: number
  imagem: string
  descricao: string
  tamanhos: string[]
  cores: string[]
}

interface AddToCartDialogProps {
  produto: Product
  trigger?: React.ReactNode
}

export function AddToCartDialog({ produto, trigger }: AddToCartDialogProps) {
  const [selectedTamanho, setSelectedTamanho] = useState<string>("")
  const [selectedCor, setSelectedCor] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const { addItem, openCart } = useCart()

  const handleAddToCart = () => {
    if (!selectedTamanho || !selectedCor) return

    addItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      categoria: produto.categoria,
      tamanho: selectedTamanho,
      cor: selectedCor,
    })

    setIsOpen(false)
    setSelectedTamanho("")
    setSelectedCor("")

    // Open cart drawer to show the added item
    setTimeout(() => openCart(), 100)
  }

  const canAddToCart = selectedTamanho && selectedCor

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar ao Carrinho</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
              <img
                src={produto.imagem || "/placeholder.svg"}
                alt={produto.nome}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{produto.nome}</h3>
              <Badge variant="outline" className="text-xs mt-1">
                {produto.categoria}
              </Badge>
              <p className="text-lg font-bold text-primary mt-2">R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tamanho *</label>
            <Select value={selectedTamanho} onValueChange={setSelectedTamanho}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                {produto.tamanhos.map((tamanho) => (
                  <SelectItem key={tamanho} value={tamanho}>
                    {tamanho}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Cor *</label>
            <Select value={selectedCor} onValueChange={setSelectedCor}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cor" />
              </SelectTrigger>
              <SelectContent>
                {produto.cores.map((cor) => (
                  <SelectItem key={cor} value={cor}>
                    {cor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full" onClick={handleAddToCart} disabled={!canAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
