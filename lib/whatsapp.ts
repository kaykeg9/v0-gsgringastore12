export const WHATSAPP_NUMBER = "5581996630750" // Replace with actual WhatsApp number

export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string): void {
  window.open(createWhatsAppUrl(message), "_blank")
}

// Message templates for different scenarios
export const WhatsAppMessages = {
  productInquiry: (productName: string, price: number) =>
    `Olá! Tenho interesse no produto: ${productName} - R$ ${price.toFixed(2).replace(".", ",")}`,

  generalInquiry: () => "Olá! Gostaria de saber mais sobre os produtos da RV Store.",

  aboutInquiry: () => "Olá! Gostaria de conhecer mais sobre os produtos da RV Store.",

  supportRequest: () => "Olá! Preciso de ajuda com um produto da RV Store.",

  cartCheckout: (
    items: Array<{ nome: string; tamanho: string; cor: string; quantidade: number; preco: number }>,
    total: number,
  ) => {
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.nome}\n`
      message += `   Tamanho: ${item.tamanho}\n`
      message += `   Cor: ${item.cor}\n`
      message += `   Quantidade: ${item.quantidade}\n`
      message += `   Preço unitário: R$ ${item.preco.toFixed(2).replace(".", ",")}\n`
      message += `   Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}\n\n`
    })

    message += `TOTAL: R$ ${total.toFixed(2).replace(".", ",")}\n\n`
    message += "Aguardo confirmação e informações sobre entrega/pagamento."

    return message
  },
}
