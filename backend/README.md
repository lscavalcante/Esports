1. npm init -y
2. npm install express
3. npm i typescript -D
4. npx tsc --init (cria o arquivo de configuração typescript) o npx acessa as opções do bin do plugin (tsc == typescript)
5. npm i @types/express -D
6. npm i ts-node-dev -D
7. npm i prisma -D
7. npx i prisma init
8. npm i @prisma/client


- Dicas
    Como saber se a biblioteca tem suporte nativo ao typescript?
        no site do NPM se estiver com o DT é pq precisa baixar o suporte se estiver com TS pintado de azul é pq a biblioteca é feita com typescript


- Utils
    Adicionando watch -> npm i ts-node-dev -D
    Dentro de package.json criar a configuração: "dev": "tsnd src/server.ts"


- Database
    - configurando o prisma
        npx prisma init --datasource-provider SQLite
    - npm i @prisma/client 


- Prisma

    Criando migration -> npx prisma migrate dev
    Abrindo o studio web do prisma -> npx prisma studio -p 9999

    utilizando o tsnd para atualizar automaticamente é necessario colocar a flag:
        "dev": tsnd --exit-child src/server.ts