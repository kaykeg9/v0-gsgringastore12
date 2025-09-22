"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Database, Upload } from "lucide-react"

export function MigrationTool() {
  const [migrationStatus, setMigrationStatus] = useState<"idle" | "migrating" | "success" | "error">("idle")
  const [migrationResult, setMigrationResult] = useState<{
    migratedProducts: number
    migratedOffers: number
  } | null>(null)

  const handleMigration = async () => {
    setMigrationStatus("migrating")

    try {
      const productsData = localStorage.getItem("rv-store-products")
      const offersData = localStorage.getItem("rv-store-offers")

      const products = productsData ? JSON.parse(productsData) : []
      const offers = offersData ? JSON.parse(offersData) : []

      console.log("[v0] Starting migration with:", { products: products.length, offers: offers.length })

      const response = await fetch("/api/migrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products, offers }),
      })

      if (!response.ok) {
        throw new Error("Migration failed")
      }

      const result = await response.json()
      console.log("[v0] Migration completed:", result)

      setMigrationResult({
        migratedProducts: result.migratedProducts,
        migratedOffers: result.migratedOffers,
      })
      setMigrationStatus("success")

      localStorage.removeItem("rv-store-products")
      localStorage.removeItem("rv-store-offers")
    } catch (error) {
      console.error("[v0] Migration error:", error)
      setMigrationStatus("error")
    }
  }

  const checkLocalStorageData = () => {
    const productsData = localStorage.getItem("rv-store-products")
    const offersData = localStorage.getItem("rv-store-offers")

    const products = productsData ? JSON.parse(productsData) : []
    const offers = offersData ? JSON.parse(offersData) : []

    return { products: products.length, offers: offers.length }
  }

  const localData = checkLocalStorageData()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Migração para Banco de Dados
        </CardTitle>
        <CardDescription>Migre seus dados do localStorage para o novo sistema de banco de dados JSON</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{localData.products}</div>
            <div className="text-sm text-muted-foreground">Produtos no localStorage</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{localData.offers}</div>
            <div className="text-sm text-muted-foreground">Ofertas no localStorage</div>
          </div>
        </div>

        {migrationStatus === "idle" && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Esta migração irá transferir todos os seus dados do localStorage para o novo sistema de banco de dados.
              Após a migração, os dados do localStorage serão removidos.
            </AlertDescription>
          </Alert>
        )}

        {migrationStatus === "success" && migrationResult && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Migração concluída com sucesso!
              {migrationResult.migratedProducts} produtos e {migrationResult.migratedOffers} ofertas foram migrados.
            </AlertDescription>
          </Alert>
        )}

        {migrationStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro durante a migração. Tente novamente ou verifique os logs do console.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleMigration}
          disabled={
            migrationStatus === "migrating" ||
            migrationStatus === "success" ||
            (localData.products === 0 && localData.offers === 0)
          }
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {migrationStatus === "migrating" ? "Migrando..." : "Iniciar Migração"}
        </Button>

        {localData.products === 0 && localData.offers === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Nenhum dado encontrado no localStorage para migrar.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
