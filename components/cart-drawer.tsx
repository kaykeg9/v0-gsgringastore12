"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { openWhatsApp, WhatsAppMessages } from "@/lib/whatsapp"

export function CartDrawer() {
  const { state, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCart()

  const handleWhatsAppOrder = () => {
    if (state.items.length === 0) return

    const message = WhatsAppMessages.cartCheckout(state.items, getTotalPrice())
    openWhatsApp(message)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          {getTotalItems() > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {getTotalItems()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Carrinho ({getTotalItems()} {getTotalItems() === 1 ? "item" : "itens"})
          </SheetTitle>
        </SheetHeader>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">Adicione produtos para começar</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.tamanho}-${item.cor}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.imagem || "/placeholder.svg"}
                        alt={item.nome}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.nome}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {item.tamanho}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {item.cor}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.tamanho, item.cor, item.quantidade - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantidade}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.tamanho, item.cor, item.quantidade + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">
                            R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.id, item.tamanho, item.cor)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold text-primary">
                  R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                </span>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={handleWhatsAppOrder} disabled={state.items.length === 0}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Finalizar Pedido no WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={clearCart}
                  disabled={state.items.length === 0}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
