import { type NextRequest, NextResponse } from "next/server"
import { getAllProducts, createProduct } from "@/lib/database"

export async function GET() {
  try {
    const products = await getAllProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, image, category, featured } = body

    if (!name || !price || !image) {
      return NextResponse.json({ error: "Name, price, and image are required" }, { status: 400 })
    }

    const product = await createProduct({
      name,
      price: Number.parseFloat(price),
      image,
      category,
      featured: featured || false,
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
