"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, X } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  isOffer: boolean
  originalPrice?: string
}

interface ProductEditModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
}

export function ProductEditModal({ product, isOpen, onClose, onSave }: ProductEditModalProps) {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || 0,
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    image: product?.image || "",
    isOffer: product?.isOffer || false,
    originalPrice: product?.originalPrice || "",
  })

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData({ ...formData, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {product ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Imagem do Produto
            </Label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <div className="relative">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={() => setFormData({ ...formData, image: "" })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex-1">
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {formData.image ? "Trocar Imagem" : "Adicionar Imagem"}
                </Button>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nome do Produto
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Camisa Social Premium"
              className="w-full"
            />
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o produto..."
              rows={3}
              className="w-full"
            />
          </div>

          {/* Price and Offer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Preço
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="R$ 89,90"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={!formData.isOffer ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, isOffer: false, originalPrice: "" })}
                >
                  Produto Normal
                </Button>
                <Button
                  type="button"
                  variant={formData.isOffer ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, isOffer: true })}
                >
                  Oferta
                </Button>
              </div>
            </div>
          </div>

          {/* Original Price (only for offers) */}
          {formData.isOffer && (
            <div className="space-y-2">
              <Label htmlFor="originalPrice" className="text-sm font-medium">
                Preço Original (para mostrar desconto)
              </Label>
              <Input
                id="originalPrice"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="R$ 120,00"
                className="w-full"
              />
            </div>
          )}

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-muted/50">
            <Label className="text-sm font-medium mb-2 block">Preview</Label>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-4">
                {formData.image && (
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{formData.name || "Nome do Produto"}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{formData.description || "Descrição do produto"}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {formData.isOffer && formData.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{formData.originalPrice}</span>
                    )}
                    <span className="font-bold text-primary">{formData.price || "R$ 0,00"}</span>
                    {formData.isOffer && <Badge className="bg-red-100 text-red-800 border-red-200">Oferta</Badge>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {product ? "Salvar Alterações" : "Criar Produto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
