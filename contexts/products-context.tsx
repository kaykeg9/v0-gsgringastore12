"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string
  featured?: boolean
  createdAt: string
}

interface ProductsContextType {
  products: Product[]
  loading: boolean
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>
  updateProduct: (id: number, product: Partial<Omit<Product, "id" | "createdAt">>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  refreshProducts: () => Promise<void>
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const refreshProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshProducts()
  }, [])

  const addProduct = async (product: Omit<Product, "id" | "createdAt">) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (response.ok) {
        await refreshProducts()
      }
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const updateProduct = async (id: number, updatedProduct: Partial<Omit<Product, "id" | "createdAt">>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })

      if (response.ok) {
        await refreshProducts()
      }
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await refreshProducts()
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
