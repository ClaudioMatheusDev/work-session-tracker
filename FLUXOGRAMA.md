# 📊 Fluxograma do Sistema Work Session Tracker

## 🏗️ Arquitetura Geral do Sistema

```mermaid
graph TB
    subgraph "Frontend - React App"
        A[Usuario] --> B[Interface React]
        B --> C[Formulario de Operacao]
        B --> D[Lista de Operacoes]
        B --> E[Busca por ID]
        B --> F[Status da Conexao]
    end
    
    subgraph "Servicos Frontend"
        G[api.js - Axios Service]
        H[operacoesService]
    end
    
    subgraph "Backend - .NET API"
        I[OperacoesController]
        J[AppDbContext]
        K[Operacao Model]
    end
    
    subgraph "Banco de Dados"
        L[(PostgreSQL Database)]
    end
    
    subgraph "Deploy & Hosting"
        M[GitHub Pages - Frontend]
        N[Railway - Backend API]
    end
    
    B --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    
    I --> N
    B --> M
    
    classDef frontend fill:#e1f5fe
    classDef backend fill:#f3e5f5
    classDef database fill:#e8f5e8
    classDef deploy fill:#fff3e0
    
    class A,B,C,D,E,F frontend
    class G,H frontend
    class I,J,K backend
    class L database
    class M,N deploy
```

## 🔄 Fluxo de Dados - Criar Nova Operação

```mermaid
sequenceDiagram
    participant U as Usuario
    participant R as React App
    participant A as API Service
    participant C as Controller
    participant D as Database
    
    U->>R: Preenche formulario
    U->>R: Clica "Adicionar Operacao"
    
    R->>R: validarFormulario()
    alt Validacao OK
        R->>A: operacoesService.create(operacao)
        A->>A: Formatar datas para ISO
        A->>C: POST /api/operacoes
        C->>C: Calcular TempoGasto
        C->>D: Salvar no banco
        D-->>C: Retorna operacao salva
        C-->>A: HTTP 201 + operacao
        A-->>R: Retorna dados
        R->>R: Atualiza lista de operacoes
        R->>R: Limpa formulario
    else Validacao Falha
        R->>R: Exibe mensagem de erro
    end
```

## 🔍 Fluxo de Dados - Buscar Operações

```mermaid
sequenceDiagram
    participant U as Usuario
    participant R as React App
    participant A as API Service
    participant C as Controller
    participant D as Database
    
    Note over U,D: Buscar Todas as Operações
    
    U->>R: Acessa aplicacao / Clica Atualizar
    R->>A: operacoesService.getAll()
    A->>C: GET /api/operacoes
    C->>D: Query todas operacoes
    D-->>C: Lista de operacoes
    C-->>A: HTTP 200 + lista
    A-->>R: Retorna dados
    R->>R: agruparPorData(operacoes)
    R->>R: Renderiza por dia
    
    Note over U,D: Buscar por ID
    
    U->>R: Digite ID + Clica Buscar
    R->>A: operacoesService.getById(id)
    A->>C: GET /api/operacoes/{id}
    C->>D: Query por ID
    alt Operacao Encontrada
        D-->>C: Retorna operacao
        C-->>A: HTTP 200 + operacao
        A-->>R: Retorna dados
        R->>R: Exibe resultado da busca
    else Operacao Nao Encontrada
        D-->>C: Nenhum resultado
        C-->>A: HTTP 404
        A-->>R: Erro "não encontrada"
        R->>R: Exibe mensagem de erro
    end
```

## 🎨 Estrutura de Componentes Frontend

```mermaid
graph TB
    subgraph "App.js - Componente Principal"
        A1[Estado da Aplicacao]
        A2[useEffect - Inicializacao]
        A3[Funcoes de Validacao]
        A4[Funcoes de Calculos]
    end
    
    subgraph "Secoes da Interface"
        B1[Status da Conexao]
        B2[Busca por ID]
        B3[Formulario de Adicao]
        B4[Lista de Operacoes por Dia]
    end
    
    subgraph "Funcoes Utilitarias"
        C1[testarConexao]
        C2[carregarOperacoes]
        C3[validarFormulario]
        C4[calcularTempoGasto]
        C5[formatarTempo]
        C6[exibirTempoGasto]
        C7[agruparPorData]
        C8[calcularTempoTotalDia]
    end
    
    A1 --> B1
    A1 --> B2
    A1 --> B3
    A1 --> B4
    
    A2 --> C1
    A2 --> C2
    A3 --> C3
    A4 --> C4
    A4 --> C5
    A4 --> C6
    A4 --> C7
    A4 --> C8
    
    classDef component fill:#e3f2fd
    classDef function fill:#f1f8e9
    classDef section fill:#fce4ec
    
    class A1,A2,A3,A4 component
    class C1,C2,C3,C4,C5,C6,C7,C8 function
    class B1,B2,B3,B4 section
```

## 🗄️ Modelo de Dados

```mermaid
erDiagram
    OPERACAO {
        int Id PK
        string Descricao
        DateTime HoraInicio
        DateTime HoraFim
        TimeSpan TempoGasto
    }
    
    OPERACAO ||--o{ OPERACAO_POR_DIA : "agrupadas_por"
    
    OPERACAO_POR_DIA {
        string Data
        List_Operacao Operacoes
        string TempoTotalDia
    }
```

## 🚀 Fluxo de Deploy

```mermaid
graph LR
    subgraph "Desenvolvimento"
        A[Codigo Local]
        B[Git Commit]
    end
    
    subgraph "Repositorio GitHub"
        C[Branch main]
        D[Branch gh-pages]
    end
    
    subgraph "Deploy Backend"
        E[Railway]
        F[PostgreSQL DB]
    end
    
    subgraph "Deploy Frontend"
        G[GitHub Pages]
        H[Build React]
    end
    
    A --> B
    B --> C
    C --> E
    C --> D
    D --> G
    
    E --> F
    G --> H
    
    classDef dev fill:#e8f5e8
    classDef repo fill:#e3f2fd
    classDef backend fill:#f3e5f5
    classDef frontend fill:#fff3e0
    
    class A,B dev
    class C,D repo
    class E,F backend
    class G,H frontend
```

## 🔧 Estados da Aplicação

```mermaid
stateDiagram-v2
    [*] --> Inicializando
    
    Inicializando --> VerificandoConexao: useEffect
    VerificandoConexao --> Conectado: API responde
    VerificandoConexao --> Desconectado: API falha
    
    Conectado --> CarregandoDados: Buscar operacoes
    CarregandoDados --> DadosCarregados: Sucesso
    CarregandoDados --> ErroCarregamento: Falha
    
    DadosCarregados --> AdicionandoOperacao: Usuario submete form
    AdicionandoOperacao --> ValidandoForm: Processar dados
    ValidandoForm --> DadosCarregados: Validacao OK + Salvo
    ValidandoForm --> ErroValidacao: Validacao falha
    
    DadosCarregados --> BuscandoPorId: Usuario busca ID
    BuscandoPorId --> ResultadoBusca: Operacao encontrada
    BuscandoPorId --> ErroNaoEncontrado: ID nao existe
    
    ErroValidacao --> DadosCarregados: Usuario corrige
    ErroNaoEncontrado --> DadosCarregados: Usuario tenta novamente
    ErroCarregamento --> VerificandoConexao: Testar conexao
    
    Desconectado --> VerificandoConexao: Usuario testa conexao
```

## 📱 Estrutura de Interface (Mobile/Desktop)

```mermaid
graph TB
    subgraph "Layout Principal"
        A[Header - Sistema de Operacoes]
        B[Status da Conexao]
        C[Secao de Busca]
        D[Secao de Formulario]
        E[Secao de Lista por Dias]
    end
    
    subgraph "Lista por Dias"
        F[Dia Container]
        G[Dia Header - Data + Total]
        H[Operacoes do Dia]
        I[Operacao Linha]
    end
    
    subgraph "Operacao Linha"
        J[Horario: 08:00 → 08:32]
        K[Descricao + ID]
        L[Tempo Gasto]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    I --> K
    I --> L
    
    classDef layout fill:#e1f5fe
    classDef section fill:#f3e5f5
    classDef item fill:#e8f5e8
    
    class A,B,C,D,E layout
    class F,G,H section
    class I,J,K,L item
```

## 🔄 Ciclo de Vida de uma Operação

```mermaid
graph LR
    A[Usuario preenche dados] --> B[Validacao frontend]
    B --> C[Envio para API]
    C --> D[Validacao backend]
    D --> E[Calculo automatico TempoGasto]
    E --> F[Salvamento no banco]
    F --> G[Retorno para frontend]
    G --> H[Atualizacao da lista]
    H --> I[Reagrupamento por data]
    I --> J[Renderizacao da interface]
    J --> K[Operacao visivel ao usuario]
    
    classDef process fill:#e8f5e8
    classDef validation fill:#fff3e0
    classDef data fill:#f3e5f5
    
    class A,C,G,H,I,J,K process
    class B,D validation
    class E,F data
```

---

## 📋 Resumo dos Componentes

### Frontend (React)
- **App.js**: Componente principal com toda lógica
- **api.js**: Serviço de comunicação com backend
- **index.css**: Estilos responsivos e organizados

### Backend (.NET)
- **OperacoesController**: API REST com CRUD
- **Operacao Model**: Entidade de dados
- **AppDbContext**: Contexto do Entity Framework

### Database
- **PostgreSQL**: Banco relacional na Railway

### Deploy
- **Frontend**: GitHub Pages (branch gh-pages)
- **Backend**: Railway (branch main)
