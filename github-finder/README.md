# Github Finder

Esse projeto foi desenvolvido utilizando os recursos nativos do framework **React**. Ao inserir um nome de usuário na barra de pesquisa e apertar "Enter" ou clicar no ícone de lupa é feita uma requisição para a **API** do **Github**, mais precisamente no endpoint **"/users"**. Caso o usuário exista, são renderizadas na tela informações como **foto do avatar, número de seguidores, número de usuários seguind**o e **localização** (caso definida). Se, pelo contrário, o usuário não existir, será renderizada uma mensagem de erro.

## Instalação

O projeto foi feito utilizando a versão **18.16.0** do [Node](https://nodejs.org/en), sendo necessária a instalação do mesmo. Após instalado, clone o repositório e instale as dependências do projeto.

```sh
git clone https://github.com/m3m0o/react-projects.git
cd react-projects/github-finder
npm install
```

Finalmente, inicie a aplicação.

```sh
npm run dev
```

## Melhorias

O projeto está totalmente aberto a melhorias e implementações! Ficarei feliz em poder compartilhar e receber dicas.
