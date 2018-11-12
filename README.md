# Funil de vendas

Esse projeto é minha solução do teste descrito abaixo. Ele é um funil de vendas 
em que os usuários podem adicionar negócios e evolui-los de etapa para organizar 
seu processo comercial.

Uma live demo do projeto está disponível em https://agendor-test-sales-funnel.herokuapp.com.

## Setup

### Pré-requisitos

- Docker: https://docs.docker.com/install
- Docker Compose: https://docs.docker.com/compose/install

### Instalação

Monte a imagem com:

```
docker-compose build
```

Instale as dependências:
```
docker-compose run app bundle install
docker-compose run app yarn install
```

Crie o banco e rode as migrações com:

```
docker-compose run app bundle exec rake db:create db:create
```

### Testes

Rode todos os testes com:

```
docker-compose run app bundle exec rspec
```

Para rodar verificando a cobertura, use:

```
docker-compose run -e COVERAGE=true app bundle exec rspec
```

### Servidor local

Inicie o servidor local com:

```
docker-compose up
```

Ele estará disponível em http://localhost:3000.

## Comentários

### Back-end

- O back-end foi feito com Ruby on Rails, expondo duas APIs para a aplicação do 
front:
  - `POST /sales` para criação de novos negócios
  - `PATCH /sales/{id}` para alteração de etapa de um negócio.

- Foi modelada uma entidade `Progression` que representa uma mudança de etapa e 
possibilita que seja calculado o tempo de permanência de um negócio numa etapa e 
a data de mudança de etapa;

- Foi considerado que os negócios podem ser movidos apenas para etapas *posteriores*
do funil, devido a ser uma "evolução", como mencionado na descrição; 
dessa forma, a validação feita para mudança de etapa é apenas verificar se a 
posição da coluna destino é maior que a posição da coluna de origem, o que 
também resolve o caso da coluna "Ganhos".

### Front-end

- Para o front-end, foi utilizado React com Redux para organizar o fluxo de dados. 
([mais informações](https://redux.js.org));

- A aplicação front está toda contida na pasta `app/webpacker`, incluindo CSS e 
imagens;

- A alteração de etapas foi implementada no front através de drag e drop;

- A validação do formulário de criação de negócio foi feita com validações 
nativas HTML5;

- Houve a duplicação de algumas validações no front-end (formulário e alteração 
de etapa do funil) para melhorar a usabilidade, evitando requests desnecessários 
e fornecendo feedback instantâneo para o usuário;

- O CSS foi escrito sem frameworks, mas inspirado pela abordagem de CSS atômico 
([mais informações](https://johnpolacek.github.io/the-case-for-atomic-css.))

- A página tem aparência responsiva, porém os eventos de drag e drop do HTML5 
não tem suporte para touch.

---

## Descrição do teste

Criar um projeto no Github para implementar um funil de vendas.

De preferência, criar uma live demo com o projeto rodando e nos passar a URL para testar.

Tecnologias obrigatórias: Ruby on Rails, Git, HTML, CSS e JavaScript

Tecnologias desejadas: React.js

Protótipo: https://sketch.cloud/s/djxJn

### Histórias

Como um vendedor

Posso criar um negócio no meu funil de vendas

Para organizar o meu processo comercial


Como um vendedor

Posso evoluir um negócio de etapa no funil

Para organizar o meu processo comercial

### Regras de negócio

- Quando um negócio for ganho, ele não pode mudar de etapa, mas pode ser perdido.
- Um negócio pode ser perdido em qualquer etapa
- Toda vez que uma ação inválida for executada, o usuário deve ser notificado
- É preciso gravar quando cada negócio foi ganho
- É preciso saber quanto tempo cada negócio durou em cada etapa

