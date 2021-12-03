# Kanban project

<p align="center">
 <a href="#about">Sobre</a> | <a href="#technologies">Tecnologias</a> | <a href="#features">Recursos</a> | <a href="#started">Instalação</a> | <a href="#license">Licença</a>
</p>

<p align="center"><img src="https://i.ibb.co/VSbZ2s8/1.gif"></p>
<p align="center"><img src="https://i.ibb.co/h7mpS2C/q.gif"></p>
<p align="center"><img src="https://i.ibb.co/YWDwRLb/Dec-02-2021-20-48-27.gif"></p>
<p align="center"><img src="https://i.ibb.co/4dJH78N/Nov-19-2021-00-11-15.gif"></p>
<p align="center"><img src="https://i.ibb.co/xMBPw4K/Nov-19-2021-00-09-34.gif"></p>

<h2 id="about">Sobre</h2>

Aplicação web de gerenciamento de tarefas utilizando o método organizacional com o quadro Kanban. Principais funcionalidades:

- Autenticação: Firebase Auth.
- Banco de dados: Firebase Firestore.
- Upload de imagem: Firebase Storage.
- Drag and drop: react-beautiful-dnd.
- Editor de Rich Text: Quill.
- Design: Chakra-ui

Projeto em desenvolvimento, faltando implementar resposividade, darktheme e melhorias de performace.

 <h2 id="technologies">Tecnologias</h2>

- [next](https://nextjs.org)
- [firebase](https://firebase.google.com/)
- [quill](https://quilljs.com/)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- [react-hook-form](https://react-hook-form.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [chakra-ui](https://chakra-ui.com/)

<h2 id="features">Recursos</h2>

- [x] Autenticação.
- [x] Notificações.
- [x] Upload de avatar.
- [x] Comentarios.
- [X] Resposividade.
- [X] Modo escuro.
- [X] Melhorias de UI design.
- [X] Login social.
- [ ] Performace.

<h2 id="started">Instalação</h2>

Clone o projeto e acesse a pasta:

```bash
git clone https://github.com/marchetti2/kanban-reactjs.git && cd kanban-reactjs
```

Instale as dependencias:

```bash
yarn
```

**Variaveis Ambiente**

Crie um novo projeto no [Firebase](https://firebase.google.com/). Ative a autenticação por _Email/Senha_ e o Firestore na regiao _southamerica-east1._
A partir do arquivo .env.local.example na raiz do projeto, crie outro arquivo chamado .env.local usando a mesma estrutura e preencha com suas variaveis ambiente do seu projeto no Firebase.

Rode o projeto:

```bash
yarn dev
```

**Tudo pronto!** Abra o projeto em [http://localhost:3000](http://localhost:3000).

<h2 id="license">Licença</h2>

Projeto desenvolvido por **Mário Luiz**.
