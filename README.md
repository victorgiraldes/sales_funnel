# Funil de vendas

Como um novo desenvolvedor na empresa Agenor, você foi encarregado de trabalhar
no projeto de funil de vendas da empresa. Nele, os usuários podem adicionar negócios
e evolui-los de etapa para organizar o seu processo comercial.

Sua tarefa é adicionar uma nova funcionalidade no projeto, de maneira que os usuários
possam ver a evolução de um determinado negócio.

## Tarefa

A sua tarefa está descrita na história abaixo:

```
Como um vendedor

Posso ver mais detalhes de um negócio no funil

Para analisar a sua evolução no meu processo comercial
```

Você deve implementar a história acima usando o seguinte layout:

![Layout](box.svg)

O projeto já está estruturado para a realização da tarefa. Porém, você está livre para
fazer as modificações que julgar necessárias.

## Projeto

O projeto já contém tanto o código para o front-end quanto para o back-end.

### Back-end

- O back-end da aplicação foi feito utilizando Ruby on Rails, e expõe duas APIs
utilizadas pelo front-end:
  - `POST /sales` para a criação de novos negócios
  - `PATCH /sales/{id}` para a alteração de etapa de um negócio.
- Os negócios podem ser movidos apenas para etapas *posteriores* do funil, pois
se trata de uma *evolução* no processo comercial. Note que ainda é possível
mover um negócio da etapa "Ganho" para a etapa "Perdido".

### Front-end

- Para o front-end, foi utilizado React com Redux para organizar o fluxo de dados.
([mais informações](https://redux.js.org));
- A aplicação está toda contida na pasta `app/webpacker`, incluindo CSS e imagens;
- Não há uso de frameworks CSS, mas o mesmo foi inspirado pela abordagem de CSS atômico
([mais informações](https://johnpolacek.github.io/the-case-for-atomic-css.));

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

## Dúvidas

Trabalhar no Agenor significa que você não trabalhará sozinho. Portanto, em caso de dúvidas,
sinta-se livre para falar conosco no email dev@agendor.com.br
