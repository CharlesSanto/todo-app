# Imagem base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

# Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# --- CORREÇÃO AQUI ---
# Ajustamos o caminho para descer dois níveis de pasta: TodoApp/TodoApp/
COPY ["TodoApp/TodoApp/TodoApp.csproj", "TodoApp/TodoApp/"]

# Ajustamos o restore para o caminho correto
RUN dotnet restore "TodoApp/TodoApp/TodoApp.csproj"

# Copia todo o resto
COPY . .

# Entramos na pasta correta para rodar o build
WORKDIR "/src/TodoApp/TodoApp"

RUN dotnet build "TodoApp.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TodoApp.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoApp.dll"]