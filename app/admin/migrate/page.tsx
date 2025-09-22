import { MigrationTool } from "@/components/migration-tool"

export const metadata = {
  title: "Migração - RV Store Admin",
  description: "Ferramenta de migração de dados",
}

export default function MigratePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Migração de Dados</h1>
        <p className="text-muted-foreground">Migre seus dados do localStorage para o novo sistema de banco de dados</p>
      </div>

      <MigrationTool />
    </div>
  )
}
