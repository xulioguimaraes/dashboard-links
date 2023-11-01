<p align="center">
<img src="src/link.png" alt="logo" width="100">
</p>

# Links - Dashboard

Bem-vindo ao repositório do projeto Links - Dashboard. Neste projeto, todas as informações a serem exibidas no [Links - Site](https://github.com/xulioguimaraes/site-links) são cadastradas, com o objetivo de fornecer uma página única (ou mesmo uma landing page) onde pessoas ou empresas possam disponibilizar seus diversos links, seja para suas redes sociais ou qualquer outro endereço de destino. Este projeto foi inspirado no site [Linktree](https://linktr.ee/) e não possui fins lucrativos.

## Principais Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [Chakra UI](https://chakra-ui.com/)
- [Firebase](https://firebase.google.com/?hl=pt)

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado o seguinte:

- [Node.js](https://nodejs.org/en/download/current) (versão 16x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (gerenciador de pacotes do Node.js)

## Configução das variveis ambientes

Crie um arquivo `.env` na raiz do projeto e adicione as variaveis do seu firebase:

```
VITE_API_API_KEY=
VITE_API_AUTH_DOMAIN=
VITE_API_DATABASE_URL=
VITE_API_PROJECT_ID=
VITE_API_STORAGE_BUCKET=
VITE_API_MESSAGING_SENDER_ID=
VITE_API_APP_ID=
VITE_API_MEASURENT_ID=
VITE_API_SITE_URL=
```

> Habilite a opção de login com o Google no seu console do firebase

## Instalação

Siga os passos abaixo para instalar as dependências e executar o projeto:

1. Clone este repositório em sua máquina local.
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Navegue até o diretório do projeto.
   ```bash
   cd nome-do-repositorio
   ```
3. Instale as dependências do projeto.
   ```bash
   npm install
   ```
4. Inicie o projeto.
   ```bash
   npm run dev
   ```
5. Acesse a aplicação em seu navegador, através do endereço http://localhost:3000/.

Necessário ressaltar que, para que este projeto funcione perfeitamente, é necessário ter o projeto [Links - Site](https://github.com/xulioguimaraes/site-links) em execução.
