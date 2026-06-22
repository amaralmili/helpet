# HelpPet

## Objetivo

HelpPet é um aplicativo móvel desenvolvido em React Native com Expo que funciona como uma plataforma para registrar animais perdidos/abandonados. O app permite que pessoas que encontraram animais abandonados, possam compartilhar informações com fotos e localização GPS.

## Funcionalidades

- **Registrar Animais**: Criar registros de pets com foto, descrição e localização GPS
- **Listar Animais**: Visualizar todos os animais perdidos/encontrados em uma lista
- **Marcar Status**: Alternar status entre "Perdido" e "Encontrado"
- **Editar Registros**: Atualizar informações de um animal
- **Excluir Registros**: Remover animais da lista

## Requisitos Técnicos

✅ **Componentização** - Componentes reutilizáveis (BotaoPrimario, CardPet)  
✅ **Navegação** - Stack Navigator com 2 telas (Home e Cadastro)  
✅ **Hooks** - useState e useEffect para gerenciamento de estado e efeitos colaterais  
✅ **SQLite** - Persistência local com operações CRUD completas  
✅ **Hardware** - Câmera (expo-image-picker) e GPS (expo-location)

## Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **SQLite** - Banco de dados local (expo-sqlite)
- **expo-image-picker** - Acesso à câmera
- **expo-location** - Acesso ao GPS

## Instalação

### Pré-requisitos

- Node.js v18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### Passos para instalar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/helpet.git
cd helpet
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o aplicativo:

```bash
npm expo start
```

4. Escaneie o QR Code com o Expo Go no seu celular ou escolha a opção desejada:
   - `a` - Abrir no Android Emulator
   - `i` - Abrir no iOS Simulator
   - `w` - Abrir no navegador
