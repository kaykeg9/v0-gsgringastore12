"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"

interface ProductCardProps {
  produto: {
    id: number
    nome: string
    categoria: string
    preco: number
    imagem: string
    descricao: string
    tamanhos: string[]
    cores: string[]
  }
  onWhatsAppOrder: (produto: any) => void
}

export function ProductCard({ produto, onWhatsAppOrder }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
              <span className="text-lg font-bold text-primary">R$ {produto.preco.toFixed(2).replace(".", ",")}</span>
            </div>
            <Button size="sm" onClick={() => onWhatsAppOrder(produto)} className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              Pedir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
