Introdução

No backend foram construídas 6 rotas.

Uma para registrar usuários para terem acesso a tabela de clientes
- localhost:8000/registrar/
Uma rota para fazer login
- localhost:8000/login/

E um crud completo para a rota de clientes inadimplentes
Rota GET localhost:8000/clientes-inadimplentes/
Rota PUT localhost:8000/clientes-inadimplentes/id do item que quer editar/
Rota POST localhost:8000/clientes-inadimplentes/ 
- Exemplo de body da requisição {

            "nome": "Osvaldo",
            "valor_inadimplencia": "1000.00",
            "data_inadimplencia": "2023-07-13"
      }
Rota delete localhost:8000/clientes-inadimplentes/id do item que quer excluir/

Credenciais para acesso ao banco de dados está no docker-compose.ym, mais caso precise:

      - POSTGRES_USER=usuario_constancia
      - POSTGRES_PASSWORD=constancia

Obs: Tive que configurar o banco para rodar na porta 5433 e não a usual 5432 para não ter conflitos com o projeto que atuo.

No projeto rodando como está funcionando a ordenação.

Após acessar a tabela de clietes você terá uma lista com todos os registros, adicionei um click no nome de cada registro para que seja ordenado.

Clicou no nome ele listará por ordem alfabética, clicando no valor listará do menor para o maior e na data da menor para a maior.
Também tem o campo de busca que é só escrever o nome do cliente para ter em tela somente os dados do mesmo.

No mais espero ter feito um bom trabalho, esse projeto apesar de simples é bem legal e com uma vasta possibilidade se usado de evolução de serviço tanto no Back quanto no Front.

Qualquer dúvida estarei a disposição.
