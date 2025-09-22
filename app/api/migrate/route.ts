import { type NextRequest, NextResponse } from "next/server"
import { createProduct, createOffer } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { products, offers } = body

    const migratedProducts = []
    const migratedOffers = []

    if (products && Array.isArray(products)) {
      for (const product of products) {
        try {
          const migratedProduct = await createProduct({
            name: product.name,
            price: Number.parseFloat(product.price),
            image: product.image,
            category: product.category,
            featured: product.featured || false,
          })
          migratedProducts.push(migratedProduct)
        } catch (error) {
          console.error("Error migrating product:", product, error)
        }
      }
    }

    if (offers && Array.isArray(offers)) {
      for (const offer of offers) {
        try {
          const migratedOffer = await createOffer({
            productId: offer.productId,
            discountPercentage: offer.discountPercentage,
            active: offer.active !== false,
          })
          migratedOffers.push(migratedOffer)
        } catch (error) {
          console.error("Error migrating offer:", offer, error)
        }
      }
    }

    return NextResponse.json({
      message: "Migration completed successfully",
      migratedProducts: migratedProducts.length,
      migratedOffers: migratedOffers.length,
    })
  } catch (error) {
    console.error("Error during migration:", error)
    return NextResponse.json({ error: "Migration failed" }, { status: 500 })
  }
}
