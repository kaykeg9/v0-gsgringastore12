import type { Metadata } from "next"
import ProdutosClient from "./ProdutosClient"

export const metadata: Metadata = {
  title: "Produtos - RV Store",
  description: "Confira nossa coleção completa de roupas masculinas na RV Store",
}

export default function ProdutosPage() {
  return <ProdutosClient />
}
