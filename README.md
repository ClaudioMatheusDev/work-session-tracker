# Work Session Tracker

Este projeto é um **Work Session Tracker**: uma aplicação para registrar, acompanhar e analisar sessões de trabalho. Ideal para quem busca melhorar a produtividade, monitorar hábitos de trabalho ou gerar relatórios de atividades.

## Funcionalidades

- **Iniciar e encerrar sessões de trabalho**
- **Registrar duração, data e descrição da sessão**
- **Visualizar histórico de sessões**
- **Relatórios e estatísticas de produtividade**
- **Exportação/importação de dados**

## Tecnologias Utilizadas

### Backend
- **Framework:** ASP.NET Core 8.0
- **Banco de Dados:** SQL Server
- **ORM:** Entity Framework Core
- **API:** RESTful API com Swagger/OpenAPI

### Frontend
- **Framework:** React 19
- **Biblioteca HTTP:** Axios
- **Gerenciamento de Estado:** Context API + Custom Hooks
- **Estilização:** CSS Modules + Gradientes modernos
- **Ferramentas:** ESLint, Prettier

## Como Usar

### Pré-requisitos

- Node.js 14+ e npm
- .NET 8.0 SDK
- SQL Server 2019+ ou SQL Server Express

### 1. Clone o repositório

```bash
git clone https://github.com/ClaudioMatheusDev/work-session-tracker.git
cd work-session-tracker
```

### 2. Configure o Backend

```bash
cd OperacoesService
## Estrutura do Projeto

```
work-session-tracker/
├── OperacoesService/           # Backend ASP.NET Core
│   ├── Controllers/            # Controllers da API
│   ├── Data/                   # DbContext
│   ├── Models/                 # Modelos de dados
│   ├── Migrations/             # Migrations EF Core
│   └── Program.cs              # Configuração principal
├── operacoes-frontend/         # Frontend React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── Session/        # Componentes de sessão
│   │   │   └── UI/             # Componentes UI reutilizáveis
│   │   ├── hooks/              # Hooks customizados
│   │   ├── contexts/           # Context API
│   │   ├── services/           # Serviços de API
│   │   └── utils/              # Funções utilitárias
│   ├── public/                 # Arquivos estáticos
│   └── package.json            # Dependências npm
├── MELHORIAS.md                # Documentação de melhorias
├── SQL_SERVER_SETUP.md         # Configuração SQL Server
└── README.md                   # Este arquivo
```

Backend rodando em: `http://localhost:5062`  
Swagger UI: `http://localhost:5062/swagger`

### 3. Configure o Frontend

```bash
cd operacoes-frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Executar frontend
npm start
```

Frontend rodando em: `http://localhost:3000`

### 4. Acesse a Aplicação

Abra `http://localhost:3000` no navegador!

## Estrutura do Projeto

```
work-session-tracker/
├── src/                # Código-fonte principal
├── public/             # Arquivos públicos e estáticos
├── tests/              # Testes automatizados
├── README.md           # Documentação
└── package.json        # Dependências e scripts (se aplicável)
```

## Contribuição

1. Fork este repositório
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Commit suas alterações: `git commit -m 'Minha contribuição'`
4. Push para o branch: `git push origin feature/nome-da-feature`
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Autor

- [ClaudioMatheusDev](https://github.com/ClaudioMatheusDev)

---

> Sinta-se livre para abrir issues com sugestões, dúvidas ou reportar bugs!
