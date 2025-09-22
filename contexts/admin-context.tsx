"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem("rv-store-admin")
    if (adminStatus === "true") {
      setIsAdmin(true)
    }
  }, [])

  const login = (password: string): boolean => {
    if (password === "rvstore2024") {
      setIsAdmin(true)
      localStorage.setItem("rv-store-admin", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem("rv-store-admin")
  }

  return <AdminContext.Provider value={{ isAdmin, login, logout }}>{children}</AdminContext.Provider>
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
