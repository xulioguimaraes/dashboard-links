# Rooms to.Do
* **Front-end**: ReactJs 
* **Database**: Firebase

# Descrição

Aplicação tem como objetivo salvar as tarefas a fazer de cada usuario, podendo marca como concluida e remover, faz login com a conta Google cada usuario.

# Instalação

## Instalação das dependências
```
yarn install
```

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
```
>Habilite a opção de login com o Google no seu console do firebase

Iniciar a aplicação em `http://localhost:3000/`
```
yarn dev
```
# Tecnologias utilizadas
* [TypeScript](https://www.typescriptlang.org/);
* [ReactJs](https://pt-br.reactjs.org/);
* [Sass](https://sass-lang.com/);
* [Firebase](https://firebase.google.com/);

# Demostração 

https://rooms-to-do.vercel.app/