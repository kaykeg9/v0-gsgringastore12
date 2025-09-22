"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Offer {
  id: number
  productId: number
  discountPercentage: number
  active: boolean
  createdAt: string
}

interface OffersContextType {
  offers: Offer[]
  loading: boolean
  addOffer: (offer: Omit<Offer, "id" | "createdAt">) => Promise<void>
  deleteOffer: (id: number) => Promise<void>
  refreshOffers: () => Promise<void>
}

const OffersContext = createContext<OffersContextType | undefined>(undefined)

export function OffersProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)

  const refreshOffers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/offers")
      if (response.ok) {
        const data = await response.json()
        setOffers(data.offers)
      }
    } catch (error) {
      console.error("Error loading offers:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshOffers()
  }, [])

  const addOffer = async (offer: Omit<Offer, "id" | "createdAt">) => {
    try {
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offer),
      })

      if (response.ok) {
        await refreshOffers()
      }
    } catch (error) {
      console.error("Error adding offer:", error)
    }
  }

  const deleteOffer = async (id: number) => {
    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await refreshOffers()
      }
    } catch (error) {
      console.error("Error deleting offer:", error)
    }
  }

  return (
    <OffersContext.Provider
      value={{
        offers,
        loading,
        addOffer,
        deleteOffer,
        refreshOffers,
      }}
    >
      {children}
    </OffersContext.Provider>
  )
}

export function useOffers() {
  const context = useContext(OffersContext)
  if (context === undefined) {
    throw new Error("useOffers must be used within an OffersProvider")
  }
  return context
}
