#ng-cash Backend

Este projeto pretende seguir as seguintes demandas: Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

## Como rodar a aplicação

Nota: ao clonar este projeto você precisa criar manualmente o arquivo `.env`, conforme explica o tutorial a seguir.

### Ambiente e Ferramentas:

- Yarn: https://yarnpkg.com/
- NPM: https://www.npmjs.com/
- Docker: https://www.docker.com/

### Passo a passo:

1. No seu terminal, clone a aplicação com o seguinte comando: `git clone git@github.com:hiquebarros/ng-cash-backend.git`
2. Baixe as dependêncas do projeto utilizando o gerenciador de pacotes que preferir.
   Por exemplo:
   `yarn install`
   ou
   `npm install`
3. Crie um arquivo .env na raiz do projeto e cole o conteúdo do .env.example.
4. Agora, com as variáveis de ambiente já configuradas, e com o Docker aberto, rode o comando `docker-compose up`
5. Com os containers buildados e já rodando, é necessário rodar as migrations e perpetualas no banco de dados. Rode o comando `docker exec -it "numero do container da api" bash` para a acessar o terminal do container da sua api.
6. Dentro do terminal do container, rode o comando `yarn typeorm migration:run -d src/data-source`. Agora sua api ja deve estar funcionando corretamente.
