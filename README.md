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

Posso clicar em um negócio no meu funil

Para analisar a evolução do mesmo no meu processo comercial
```

Você deve implementar a história acima usando o layout encotrado [aqui](link_do_layout).

O projeto já está estruturado para a realização da tarefa. Porém, você está livre para
fazer as modificações que julgar necessárias para completar a sua tarefa.

## Projeto

O projeto já contém tanto o código para o front-end quanto para o back-end.

### Back-end

- O back-end da aplicação foi feito utilizando Ruby on Rails, e expõe duas APIs
utilizadas pelo front-end:
  - `POST /sales` para a criação de novos negócios
  - `PATCH /sales/{id}` para a alteração de etapa de um negócio.
- Foi modelada uma entidade `Progression` que representa uma mudança de etapa
no funil. Ela possibilita que seja calculado o tempo de permanência de um
negócio em um determinada etapa e a data de mudança de etapa.
- Os negócios podem ser movidos apenas para etapas *posteriores* do funil, pois
se trata de uma *evolução* no processo comercial. Logo, a validação feita para
mudança de etapa é apenas verificar se a posição da coluna destino é maior que
a posição da coluna de origem. Note que ainda é possível mover um negócio da
etapa "Ganho" para a etapa "Perdido".

### Front-end

- Para o front-end, foi utilizado React com Redux para organizar o fluxo de dados.
([mais informações](https://redux.js.org));
- A aplicação está toda contida na pasta `app/webpacker`, incluindo CSS e imagens;
- A alteração de etapas foi implementada através de drag e drop;
- A validação do formulário de criação de negócio foi feita com validações nativas HTML5;
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
