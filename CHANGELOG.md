# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Não Lançado]

### Em Desenvolvimento
- Testes unitários com Jest + React Testing Library
- Modo escuro
- Sistema de notificações toast

---

## [2.1.0] - 2026-01-03

### ✨ Adicionado

#### Funcionalidade Pomodoro
- **Timer Pomodoro Completo**:
  - Timer visual circular com progresso animado
  - Três modos: Trabalho (25min), Pausa Curta (5min), Pausa Longa (15min)
  - Contadores de sessões e ciclos completos
  - Notificações visuais e sonoras ao completar cada fase
  
- **Componentes Pomodoro**:
  - `PomodoroTimer` - Timer principal com controles (iniciar, pausar, pular, resetar)
  - `PomodoroSettings` - Configurações personalizáveis (tempos de trabalho, pausas)
  - `PomodoroStats` - Estatísticas detalhadas (pomodoros totais, tempo de foco, ciclos)
  - `PomodoroPage` - Página dedicada ao Pomodoro

- **Hook Customizado**:
  - `usePomodoro` - Lógica completa do timer com estados, controles e cálculos
  - Notificações do navegador (Web Notifications API)
  - Notificações sonoras (Web Audio API)
  - Cálculo automático de progresso e estatísticas

- **Navegação**:
  - Sistema de navegação entre Operações e Pomodoro
  - Botões de navegação no header
  - Navegação por abas (Operações 📋 / Pomodoro 🍅)

### 🔄 Modificado
- **App.js**: Adicionado sistema de navegação por páginas
- **App.css**: Estilos para navegação e responsividade
- **Header**: Título e subtítulo atualizados para refletir as funcionalidades

### 📚 Features do Pomodoro
- ⏰ Timer visual com círculo de progresso animado
- 🎯 Três modos automáticos (Trabalho/Pausa Curta/Pausa Longa)
- 📊 Estatísticas em tempo real
- 🔔 Notificações do navegador
- 🔊 Alertas sonoros
- ⚙️ Configurações personalizáveis
- 📈 Contador de ciclos e progresso
- 💡 Dicas da Técnica Pomodoro

### 🎨 Design
- Interface moderna e intuitiva
- Cores específicas por modo (vermelho/verde/azul)
- Animações suaves e transições
- Cards de estatísticas com gradientes
- Responsivo para mobile e desktop

---

## [2.0.0] - 2026-01-02

### ✨ Adicionado

#### Frontend
- **Componentização completa do App.js** (527 → 95 linhas, redução de 82%)
- **Componentes UI reutilizáveis**:
  - `Button` - Botão com variantes (primary, secondary, danger, success)
  - `Input` - Input com label e validação de erro
  - `Card` - Container visual para conteúdo
  - `Loading` - Indicador de carregamento com spinner
  - `ErrorMessage` - Mensagem de erro elegante com opção de fechar
- **Componentes de Sessão/Domínio**:
  - `ConnectionStatus` - Indicador de status da API
  - `SessionForm` - Formulário para criar operações
  - `SessionCard` - Card individual de operação com edição inline
  - `SessionList` - Lista agrupada por data com tempo total
  - `SessionSearch` - Busca de operação por ID
- **Hooks Customizados**:
  - `useOperacoes` - Gerenciamento completo de operações (CRUD + estado)
  - `useConnectionStatus` - Monitoramento de conexão com API
- **Context API**:
  - `OperacoesContext` - Estado global da aplicação
  - Provider integrado no `index.js`
- **Utilitários Organizados**:
  - `formatters.js` - Formatação de datas, tempo, valores
  - `validators.js` - Validações de formulários e IDs
  - `groupers.js` - Agrupamento de dados por data
- **Configuração de Qualidade**:
  - ESLint configurado com regras React
  - Prettier configurado (single quotes, 100 chars)
  - `.prettierignore` e `.prettierrc`
  - `.eslintrc.json`
- **Variáveis de Ambiente**:
  - `.env` - Configuração padrão
  - `.env.local` - Desenvolvimento local
  - `.env.production` - Produção (Railway)
  - `.env.example` - Exemplo documentado
- **Documentação**:
  - `README.md` atualizado com nova estrutura
  - `QUICK_START.md` - Guia de início rápido
  - `MELHORIAS.md` - Documentação detalhada das melhorias

#### Backend
- **Paginação e Ordenação**:
  - Query params: `pageNumber`, `pageSize`, `sortBy`, `descending`
  - Resposta paginada com metadados (totalItems, totalPages)
- **Endpoint de Estatísticas**:
  - `GET /api/operacoes/stats` - Retorna totalOperacoes, tempoTotalHoras, mediaHorasPorOperacao
- **Logging Estruturado**:
  - `ILogger<OperacoesController>` injetado
  - Logs de informação, warning e erro
- **Validações Robustas**:
  - Validação de campos obrigatórios
  - Validação de datas (fim > início)
  - Mensagens de erro descritivas
- **Tratamento de Exceções**:
  - Try-catch em todos os endpoints
  - Retornos HTTP padronizados (400, 404, 500)
  - Mensagens JSON estruturadas
- **Documentação XML**:
  - Comentários `<summary>` em todos os endpoints
  - Melhora documentação do Swagger

### 🔄 Modificado

#### Frontend
- **Estrutura de Pastas**:
  - Organização em `components/`, `hooks/`, `utils/`, `contexts/`, `services/`
  - Separação clara entre componentes UI e de domínio
- **API Service**:
  - Suporte a resposta paginada do backend
  - Extração automática do array `data` quando necessário
  - Fallback para array vazio em caso de erro
  - Uso de variáveis de ambiente para URL base
- **Estilos**:
  - Design moderno com gradientes (roxo/azul)
  - Animações suaves e transições
  - Responsividade completa (mobile, tablet, desktop)
  - Hover effects em cards e botões

#### Backend
- **Migração PostgreSQL → SQL Server**:
  - Package `Npgsql.EntityFrameworkCore.PostgreSQL` → `Microsoft.EntityFrameworkCore.SqlServer`
  - `UseNpgsql()` → `UseSqlServer()`
  - Connection string atualizada
  - Migrations recriadas
- **Banco de Dados**:
  - Nome: `WorkSessionTracker`
  - Tabela `Operacoes` com IDENTITY em `Id`
  - Campo `TempoGasto` tipo `time` (otimizado para SQL Server)
- **Endpoint GET /api/operacoes**:
  - Retorna objeto paginado em vez de array direto
  - Suporta ordenação por múltiplos campos
  - Padrão: 100 itens por página, ordenado por HoraInicio DESC

### 🗑️ Removido
- Código duplicado e inline no App.js
- Migrations antigas do PostgreSQL
- Dependência `Npgsql.EntityFrameworkCore.PostgreSQL`
- Console.logs desnecessários (alguns mantidos para debug)

### 🐛 Corrigido
- **Erro "operacoes.forEach is not a function"**: API retornava objeto paginado, esperado array
- **Conexão com API**: Configuração de ambiente para desenvolvimento local vs produção
- **CORS**: Política "AllowAll" configurada no backend
- **Validações de formulário**: Mensagens de erro mais claras

### 📚 Documentação
- `CHANGELOG.md` - Este arquivo
- `README.md` - Atualizado com nova arquitetura e tecnologias
- `operacoes-frontend/README.md` - Documentação específica do frontend

---

## [1.0.0] - 2025-07-18

### ✨ Adicionado
- Versão inicial do projeto
- CRUD completo de operações
- Frontend React básico
- Backend ASP.NET Core com PostgreSQL
- Entity Framework Core
- Deploy no Railway e GitHub Pages

### 🎯 Funcionalidades Iniciais
- Criar sessões de trabalho
- Editar sessões existentes
- Excluir sessões
- Visualizar histórico
- Cálculo automático de tempo gasto
- Busca por ID

---

## Tipos de Mudanças

- `✨ Adicionado` - Para novas funcionalidades
- `🔄 Modificado` - Para mudanças em funcionalidades existentes
- `🗑️ Removido` - Para funcionalidades removidas
- `🐛 Corrigido` - Para correção de bugs
- `🔒 Segurança` - Para correções de vulnerabilidades
- `📚 Documentação` - Para mudanças na documentação
- `⚡ Performance` - Para melhorias de performance
- `♻️ Refatoração` - Para mudanças que não afetam funcionalidade

---

## Links Úteis

- [Repositório](https://github.com/ClaudioMatheusDev/work-session-tracker)
- [Issues](https://github.com/ClaudioMatheusDev/work-session-tracker/issues)
- [Pull Requests](https://github.com/ClaudioMatheusDev/work-session-tracker/pulls)
