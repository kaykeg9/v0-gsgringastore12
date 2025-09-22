"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: number
  nome: string
  preco: number
  imagem: string
  categoria: string
  tamanho: string
  cor: string
  quantidade: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantidade"> }
  | { type: "REMOVE_ITEM"; payload: { id: number; tamanho: string; cor: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; tamanho: string; cor: string; quantidade: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.tamanho === action.payload.tamanho && item.cor === action.payload.cor,
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantidade += 1
        return { ...state, items: updatedItems }
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantidade: 1 }],
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.tamanho === action.payload.tamanho &&
              item.cor === action.payload.cor
            ),
        ),
      }
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantidade <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.tamanho === action.payload.tamanho &&
                item.cor === action.payload.cor
              ),
          ),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.tamanho === action.payload.tamanho && item.cor === action.payload.cor
            ? { ...item, quantidade: action.payload.quantidade }
            : item,
        ),
      }
    }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, "quantidade">) => void
  removeItem: (id: number, tamanho: string, cor: string) => void
  updateQuantity: (id: number, tamanho: string, cor: string, quantidade: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("rv-store-cart")
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      parsedCart.forEach((item: CartItem) => {
        dispatch({ type: "ADD_ITEM", payload: { ...item, quantidade: item.quantidade - 1 } })
        for (let i = 1; i < item.quantidade; i++) {
          dispatch({ type: "ADD_ITEM", payload: item })
        }
      })
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rv-store-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: Omit<CartItem, "quantidade">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: number, tamanho: string, cor: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, tamanho, cor } })
  }

  const updateQuantity = (id: number, tamanho: string, cor: string, quantidade: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, tamanho, cor, quantidade } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const openCart = () => {
    dispatch({ type: "OPEN_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantidade, 0)
  }

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.preco * item.quantidade, 0)
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
