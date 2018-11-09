# Funil de vendas

## Histórias

Como um vendedor

Posso criar um negócio no meu funil de vendas

Para organizar o meu processo comercial


Como um vendedor

Posso evoluir um negócio de etapa no funil

Para organizar o meu processo comercial

## Regras de negócio

- Quando um negócio for ganho, ele não pode mudar de etapa, mas pode ser perdido.
- Um negócio pode ser perdido em qualquer etapa
- Toda vez que uma ação inválida for executada, o usuário deve ser notificado
- É preciso gravar quando cada negócio foi ganho
- É preciso saber quanto tempo cada negócio durou em cada etapa

## Protótipo

[Sketch Cloud](https://sketch.cloud/s/djxJn)


o que falta:
- refatorar a parte do fetch que está zuada
- extrair notificação para um componente
- transformar form num componente classe para controlar melhor os inputs
- ver como impedir de mover pra colunas anteriores
- organizar o CSS***
- arrumar os testes capybara
- testes de request - talvez
- testes de jss
- push no github
- deploy no heroku
