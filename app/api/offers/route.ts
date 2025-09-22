import { type NextRequest, NextResponse } from "next/server"
import { getAllOffers, createOffer } from "@/lib/database"

export async function GET() {
  try {
    const offers = await getAllOffers()
    return NextResponse.json({ offers })
  } catch (error) {
    console.error("Error fetching offers:", error)
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, discountPercentage, active } = body

    if (!productId || !discountPercentage) {
      return NextResponse.json({ error: "Product ID and discount percentage are required" }, { status: 400 })
    }

    const offer = await createOffer({
      productId: Number.parseInt(productId),
      discountPercentage: Number.parseInt(discountPercentage),
      active: active !== false,
    })

    return NextResponse.json({ offer }, { status: 201 })
  } catch (error) {
    console.error("Error creating offer:", error)
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 })
  }
}
