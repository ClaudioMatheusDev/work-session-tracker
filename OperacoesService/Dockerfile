FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia somente o arquivo .csproj da pasta OperacoesService
COPY OperacoesService/*.csproj ./OperacoesService/

# Roda restore passando o caminho do projeto
RUN dotnet restore ./OperacoesService/OperacoesService.csproj

# Copia o restante dos arquivos
COPY . .

WORKDIR /app/OperacoesService

# Build/publish
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/OperacoesService/out ./

EXPOSE 80
ENTRYPOINT ["dotnet", "OperacoesService.dll"]
