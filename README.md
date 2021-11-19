# Kanban project

<p align="center">
 <a href="#about">Sobre</a> | <a href="#screens">Telas</a> | <a href="#technologies">Tecnologias</a> | <a href="#features">Recursos</a> | <a href="#started">Instalação</a> | <a href="#license">Licença</a>
</p>

<h2 id="about">Sobre</h2>

Aplicação web de gerenciamento de tarefas utilizando o modelo Kanban. Autenticação, armazenamento e banco de dados usando Firebase. .

<h2 id="screens">Screens</h2>

<ul>
  <li>Cadastro
    <p align="center"><img width="100%" src="https://i.ibb.co/sFvDFy4/Nov-19-2021-00-11-34.gif"></p>
  </li>
  <li>Autenticação
    <p align="center"><img src="https://i.ibb.co/NNLHn4y/Nov-19-2021-00-12-20.gif"></p>
  </li>
    <li>Upload de avatar
    <p align="center"><img width="100%" src="https://i.ibb.co/4dJH78N/Nov-19-2021-00-11-15.gif"></p>
  </li>
    <li>Quadro kanban
    <p align="center"><img width="100%" src="https://i.ibb.co/xMBPw4K/Nov-19-2021-00-09-34.gif"></p>
  </li>
</ul>
 
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
- [ ] Resposividade.
- [ ] Melhorias de UI design.
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

Crie um novo projeto no [Firebase](https://firebase.google.com/). Ative a autenticação por *Email/Senha* e o Firestore na regiao *southamerica-east1.*
A partir do arquivo .env.local.example na raiz do projeto, crie outro arquivo chamado .env.local usando a mesma estrutura e preencha com suas variaveis ambiente do seu projeto no Firebase.

Rode o projeto:

```bash
yarn dev
```

**Tudo pronto!** Abra o projeto em [http://localhost:3000](http://localhost:3000).

<h2 id="license">Licença</h2>

Projeto desenvolvido por **Mário Luiz**.
