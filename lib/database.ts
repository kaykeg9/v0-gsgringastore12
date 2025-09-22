import fs from "fs/promises"
import path from "path"

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  featured?: boolean
  createdAt: string
}

export interface Offer {
  id: number
  productId: number
  discountPercentage: number
  active: boolean
  createdAt: string
}

interface ProductsData {
  products: Product[]
  nextId: number
  lastUpdated: string
}

interface OffersData {
  offers: Offer[]
  nextId: number
  lastUpdated: string
}

const DATA_DIR = path.join(process.cwd(), "data")

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

async function readJsonFile<T>(filename: string, defaultData: T): Promise<T> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)

  try {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2))
    return defaultData
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, filename)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await readJsonFile<ProductsData>("products.json", {
    products: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })
  return data.products
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await getAllProducts()
  return products.find((p) => p.id === id) || null
}

export async function createProduct(productData: Omit<Product, "id" | "createdAt">): Promise<Product> {
  const data = await readJsonFile<ProductsData>("products.json", {
    products: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })

  const newProduct: Product = {
    ...productData,
    id: data.nextId,
    createdAt: new Date().toISOString(),
  }

  data.products.push(newProduct)
  data.nextId += 1
  data.lastUpdated = new Date().toISOString()

  await writeJsonFile("products.json", data)
  return newProduct
}

export async function updateProduct(
  id: number,
  updates: Partial<Omit<Product, "id" | "createdAt">>,
): Promise<Product | null> {
  const data = await readJsonFile<ProductsData>("products.json", {
    products: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })

  const productIndex = data.products.findIndex((p) => p.id === id)
  if (productIndex === -1) return null

  data.products[productIndex] = { ...data.products[productIndex], ...updates }
  data.lastUpdated = new Date().toISOString()

  await writeJsonFile("products.json", data)
  return data.products[productIndex]
}

export async function deleteProduct(id: number): Promise<boolean> {
  const data = await readJsonFile<ProductsData>("products.json", {
    products: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })

  const initialLength = data.products.length
  data.products = data.products.filter((p) => p.id !== id)

  if (data.products.length < initialLength) {
    data.lastUpdated = new Date().toISOString()
    await writeJsonFile("products.json", data)
    return true
  }

  return false
}

export async function getAllOffers(): Promise<Offer[]> {
  const data = await readJsonFile<OffersData>("offers.json", {
    offers: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })
  return data.offers
}

export async function createOffer(offerData: Omit<Offer, "id" | "createdAt">): Promise<Offer> {
  const data = await readJsonFile<OffersData>("offers.json", {
    offers: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })

  const newOffer: Offer = {
    ...offerData,
    id: data.nextId,
    createdAt: new Date().toISOString(),
  }

  data.offers.push(newOffer)
  data.nextId += 1
  data.lastUpdated = new Date().toISOString()

  await writeJsonFile("offers.json", data)
  return newOffer
}

export async function deleteOffer(id: number): Promise<boolean> {
  const data = await readJsonFile<OffersData>("offers.json", {
    offers: [],
    nextId: 1,
    lastUpdated: new Date().toISOString(),
  })

  const initialLength = data.offers.length
  data.offers = data.offers.filter((o) => o.id !== id)

  if (data.offers.length < initialLength) {
    data.lastUpdated = new Date().toISOString()
    await writeJsonFile("offers.json", data)
    return true
  }

  return false
}
