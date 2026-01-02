# 🗄️ Configuração SQL Server

## ✅ Mudanças Implementadas

O projeto foi configurado para usar **SQL Server** em vez de PostgreSQL.

### Alterações Realizadas:

1. **Package atualizado** (`OperacoesService.csproj`):
   - ❌ Removido: `Npgsql.EntityFrameworkCore.PostgreSQL`
   - ✅ Adicionado: `Microsoft.EntityFrameworkCore.SqlServer`

2. **Program.cs atualizado**:
   - Trocado `UseNpgsql()` por `UseSqlServer()`

3. **Connection String atualizada** (`appsettings.json`):
   ```json
   "DefaultConnection": "Server=localhost;Database=WorkSessionTracker;User Id=sa;Password=91398608Ma*;TrustServerCertificate=True;MultipleActiveResultSets=true"
   ```

4. **Migrations recriadas**:
   - Migrations antigas do PostgreSQL foram removidas
   - Nova migration criada para SQL Server: `InitialCreateSqlServer`
   - Banco de dados criado: `WorkSessionTracker`

## 🚀 Como Usar

### Pré-requisitos

- SQL Server 2019+ ou SQL Server Express
- Credenciais válidas (ajuste em `appsettings.json`)

### Configuração Inicial

1. **Ajustar Connection String** (se necessário):

Edite `appsettings.json` e `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SEU_SERVIDOR;Database=WorkSessionTracker;User Id=SEU_USUARIO;Password=SUA_SENHA;TrustServerCertificate=True;MultipleActiveResultSets=true"
  }
}
```

**Exemplos de Connection Strings:**

```bash
# SQL Server local com autenticação Windows
"Server=localhost;Database=WorkSessionTracker;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"

# SQL Server com autenticação SQL
"Server=localhost;Database=WorkSessionTracker;User Id=sa;Password=SuaSenha;TrustServerCertificate=True;MultipleActiveResultSets=true"

# SQL Server Express
"Server=localhost\\SQLEXPRESS;Database=WorkSessionTracker;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"

# Azure SQL Database
"Server=tcp:seuservidor.database.windows.net,1433;Database=WorkSessionTracker;User Id=usuario@seuservidor;Password=senha;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
```

2. **Executar Migrations** (já feito):

```bash
cd OperacoesService
dotnet ef database update
```

3. **Executar o Projeto**:

```bash
dotnet run
```

Acesse: `https://localhost:5001/swagger`

## 🔧 Comandos Úteis

### Criar nova migration

```bash
dotnet ef migrations add NomeDaMigracao
```

### Aplicar migrations

```bash
dotnet ef database update
```

### Reverter última migration

```bash
dotnet ef migrations remove
```

### Reverter para migration específica

```bash
dotnet ef database update NomeDaMigracaoAnterior
```

### Gerar script SQL

```bash
dotnet ef migrations script
```

### Dropar banco de dados

```bash
dotnet ef database drop
```

## 📊 Estrutura do Banco

### Tabela: Operacoes

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| Id | int (IDENTITY) | Chave primária |
| Descricao | nvarchar(max) | Descrição da operação |
| HoraInicio | datetime2 | Data/hora de início |
| HoraFim | datetime2 | Data/hora de fim |
| TempoGasto | time | Tempo calculado automaticamente |

## 🔐 Segurança

**⚠️ IMPORTANTE:** Em produção:

1. **Não comite senhas** no código
2. Use **User Secrets** para desenvolvimento:

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "sua-connection-string"
```

3. Use **Azure Key Vault** ou variáveis de ambiente em produção:

```csharp
// Program.cs
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") 
    ?? builder.Configuration.GetConnectionString("DefaultConnection");
```

## 🌐 Deploy

### Railway / Azure / AWS

Configure a variável de ambiente `ConnectionStrings__DefaultConnection`:

```
Server=seu-servidor-producao;Database=WorkSessionTracker;User Id=usuario;Password=senha;Encrypt=True;
```

## 🐛 Troubleshooting

### Erro: "Login failed for user"

Verifique:
- Usuário e senha estão corretos
- SQL Server está rodando
- Autenticação SQL está habilitada

### Erro: "A network-related or instance-specific error"

Verifique:
- SQL Server está rodando
- Nome do servidor está correto
- Firewall não está bloqueando

### Erro: "Cannot open database"

Execute:
```bash
dotnet ef database update
```

## 📝 Notas

- Banco de dados: `WorkSessionTracker`
- Tipo de campo `TempoGasto`: `time` (mais eficiente que `TimeSpan` serializado)
- IDENTITY em `Id`: auto-incremento gerenciado pelo SQL Server
- `MultipleActiveResultSets=true`: permite múltiplas queries simultâneas

## ✅ Status Atual

- ✅ SQL Server configurado
- ✅ Migrations criadas
- ✅ Banco de dados criado
- ✅ Tabela Operacoes criada
- ✅ Pronto para uso
