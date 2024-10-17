# Projeto API Shirt Store

## Descrição

O **Projeto API Shirt Store** é uma aplicação completa desenvolvida com **Node.js** e **Express**, que oferece uma série de funcionalidades para gerenciar uma loja de camisetas. Esta API é projetada para facilitar a interação entre o front-end e o back-end, proporcionando uma experiência de compra fluida para os usuários.

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no lado do servidor.
- **Express**: Framework web para Node.js que simplifica o desenvolvimento de APIs.
- **Knex**: Query builder para SQL, utilizado para gerenciar a comunicação com o banco de dados.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **API do Mercado Pago**: Para processamento de pagamentos de forma segura e eficiente.
- **Webhook**: Implementado para receber notificações sobre o status dos pagamentos.
- **Multer**: Middleware para lidar com upload de arquivos, permitindo que os usuários enviem imagens para o perfil e de camisetas.
- **Nodemailer**: Para envio de e-mails, especificamente utilizado na recuperação de senha.
- **Middleware de Autenticação**: Implementado para proteger as rotas e garantir que apenas usuários autenticados tenham acesso a funcionalidades sensíveis.
- **Cookies**: Utilizados para armazenar dados de autenticação e sessão do usuário, garantindo uma experiência segura.
- **Test-Driven Development (TDD) com Jest**: TDD foi adotado para garantir que o código fosse testado desde o início do desenvolvimento. O **Jest** foi utilizado para escrever testes automatizados que validam a integridade e funcionamento de diversas funcionalidades da API, como autenticação, validação de dados, rotas e manipulação de pagamentos.

### Funcionalidades

- **Cadastro e Login de Usuários**: Permite que os usuários criem contas e acessem a loja.
- **Gerenciamento de Produtos**: Adição, edição e remoção de camisetas no catálogo.
- **Processamento de Pagamentos**: Integração com a API do Mercado Pago para facilitar pagamentos online.
- **Sistema de Carrinho**: Permite que os usuários adicionem produtos ao carrinho, gerenciem itens e realizem a compra.
- **Notificações por E-mail**: Confirmações de pedidos enviadas automaticamente para os usuários e recuperação de senha.
- **Gerenciamento de Pedidos**: Os usuários podem visualizar o status dos seus pedidos e receber atualizações em tempo real.
- **Upload de Imagens**: Permite que os usuários façam upload de imagens para usuários e produtos.

- ## Aviso Importante Antes dos Endpoints

Não é necessário passar nenhum token JWT pelo corpo da requisição da aplicação. Esta aplicação foi trabalhada com cookies, ou seja, ao logar ou se registrar, você automaticamente terá acesso às rotas permitidas para o usuário por um período de 24 horas.

Para que a API funcione corretamente, é **necessário** criar uma conta no [Mercado Pago](https://www.mercadopago.com.br) e gerar uma aplicação para obter acesso às chaves que possibilitarão o processamento dos pagamentos.

### Configuração do Projeto

A base do projeto já está feita. Você precisará **configurar os dados necessários**, e todos os dados sensíveis devem ser armazenados em variáveis de ambiente no arquivo `.env`. **Quais são esses dados?** Seguem abaixo:

### Configuração do Banco de Dados (Knex)

Aqui você coloca as informações do seu banco de dados para estabelecer a conexão:

SERVER_USER="*******"

SERVER_PASSWORD="*******" 

SERVER_HOST="*************" 

SERVER_DATABASE="*****"

### Chave JWT

Para aumentar a segurança dos tokens JWT, é necessário criar uma chave secreta:

JWT_SECRET="**********"


### Configuração do Nodemailer (usando Gmail)
EMAIL_MAILER="*******@gmail.com"
PASS_MAILER="**********"



### Token do Mercado Pago

Este é o token que você receberá ao configurar o Mercado Pago. **Atenção!** O Mercado Pago nunca envia o token final diretamente. Primeiro, ele envia um **token de teste** para que você possa testar a aplicação. Lembre-se de **configurar o token de teste** antes de usar o token principal. 

⚠️ **Nunca compartilhe seu token com ninguém**. Ele é exclusivamente seu e deve ser mantido em segredo.

MP_TOKEN="**************************************************"


### Webhook

O Webhook permite a comunicação entre duas aplicações, enviando notificações. Isso é **primordial para este projeto**, pois, quando o pagamento é finalizado, o webhook é responsável por marcar o pedido como pago, garantindo que o usuário seja notificado de que o pagamento foi concluído é necessário configurá-lo na aba Webhook do Mercado Pago e colocar a URL da sua aplicação lá. Obs: localhost não é possível; se for testar em ambiente de teste, utilize o ngrok para simular o ambiente de produção..

### Controle de Status

Cada pedido possui uma representação numérica para seu status:
- **0**: Pedido criado, aguardando pagamento
- **1**: Pedido pago
- **2**: Pedido cancelado

Esses valores permitem que você controle o status de cada pagamento de maneira eficiente.

---

⚠️ **Lembre-se:** Mantenha todos os dados sensíveis seguros e nunca compartilhe suas chaves ou tokens publicamente.




## Endpoints

### Home

#### `GET /`
- **Descrição**: Retorna uma mensagem de boas-vindas à API da Shirt Store.
- **Resposta**:
  - **200 OK**:
    ```text
    Olá e Bem-vindo à API da Shirt Store! 🎉 Estou empolgado em tê-lo aqui!
    Esta API foi projetada para oferecer uma experiência suave e intuitiva.
    Se você encontrar algum bug ou tiver dúvidas sobre como integrar ou consumir
    a API no front-end, não hesite em entrar em contato comigo. Estou aqui para ajudar!
    Explore os recursos disponíveis e aproveite a experiência de criar algo incrível com a Shirt Store!
    GITHUB DOC: https://github.com/Zdvictor/PROJETO-API-STORE
    ```


### Usuário

#### `GET /my_profile`
- **Descrição**: Retorna as informações do perfil do usuário autenticado.
- **Middleware**: `AuthMiddleware`
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "id": 1,
      "name": "Nome do Usuário",
      "cpf": "12345678900",
      "email": "usuario@example.com",
      "endereco_id": 2,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "image": "caminho/da/imagem.jpg"
    }
    ```
  - **401 Unauthorized**: 
    ```json
    {
      "err": "Usuário não autenticado."
    }
    ```

---

#### `POST /login`
- **Descrição**: Realiza o login do usuário.
- **Body**:
  - `email`: String, e-mail do usuário.
  - `password`: String, senha do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Usuário autenticado com sucesso.",
    }
    ```
  - **401 Unauthorized**: 
    ```json
    {
      "err": "Usuário não cadastrado."
    }
    ```

---

#### `POST /register`
- **Descrição**: Cadastra um novo usuário.
- **Body**:
  - `name`: String, nome do usuário.
  - `cpf`: String, CPF do usuário.
  - `email`: String, e-mail do usuário.
  - `password`: String, senha do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Usuário cadastrado com sucesso."
    }
    ```
  - **400 Bad Request**: 
    ```json
    {
      "err": "Erro de validação: CPF já cadastrado."
    }
    ```
  - **401 Unauthorized**: 
    ```json
    {
      "err": "Erro ao cadastrar o usuário."
    }
    ```

---

#### `POST /upload_user/:id`
- **Descrição**: Faz o upload de uma imagem de perfil para o usuário.
- **Middleware**: `AuthMiddleware`
- **Parâmetros**:
  - `id`: ID do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Imagem salva com sucesso.",
      "file": "imagem.jpg"
    }
    ```
  - **403 Forbidden**: 
    ```json
    {
      "err": "Usuário não pode atualizar foto de outro usuário."
    }
    ```
  - **500 Internal Server Error**: 
    ```json
    {
      "err": "Falha em salvar a imagem."
    }
    ```

---

#### `PUT /user`
- **Descrição**: Atualiza as informações do usuário autenticado.
- **Middleware**: `AuthMiddleware`
- **Body**:
  - `emailAtual`: String, e-mail atual do usuário.
  - `name`: String, novo nome do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Usuário atualizado com sucesso."
    }
    ```
  - **400 Bad Request**: 
    ```json
    {
      "err": "Erro de validação: Nome inválido."
    }
    ```
  - **403 Forbidden**: 
    ```json
    {
      "err": "Usuário não pode atualizar outro usuário."
    }
    ```
  - **500 Internal Server Error**: 
    ```json
    {
      "err": "Problema na atualização."
    }
    ```

---

#### `DELETE /user`
- **Descrição**: Deleta o usuário autenticado.
- **Middleware**: `AuthMiddleware`
- **Body**:
  - `email`: String, e-mail do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Usuário deletado."
    }
    ```
  - **403 Forbidden**: 
    ```json
    {
      "err": "Usuário não pode deletar outro usuário."
    }
    ```
  - **500 Internal Server Error**: 
    ```json
    {
      "err": "Problema na deleção."
    }
    ```

---

### Recuperação de Senha

#### `POST /recovery`
- **Descrição**: Inicia o processo de recuperação de senha enviando um código para o e-mail do usuário.
- **Body**:
  - `email`: String, e-mail do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Código enviado para o e-mail com sucesso.",
      "code": "codigo_gerado"
    }
    ```
  - **400 Bad Request**: 
    ```json
    {
      "err": "E-mail não cadastrado."
    }
    ```
  - **500 Internal Server Error**: 
    ```json
    {
      "err": "Problema no envio de recuperação de e-mail."
    }
    ```

---

#### `POST /verify_code`
- **Descrição**: Verifica se o código de recuperação enviado é válido.
- **Body**:
  - `code`: String, código de verificação.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Código válido."
    }
    ```
  - **500 Internal Server Error**: 
    ```json
    {
      "err": "Código inválido."
    }
    ```

---

#### `PUT /change_password`
- **Descrição**: Altera a senha do usuário após a verificação do código.
- **Body**:
  - `code`: String, código de verificação.
  - `newPassword`: String, nova senha do usuário.
- **Resposta**:
  - **200 OK**: 
    ```json
    {
      "msg": "Senha alterada com sucesso."
    }
    ```
  - **400 Bad Request**: 
    ```json
    {
      "err": "A nova senha é fraca."
    }
    ```
  - **500 Internal Server Error**: 
    ```json
    {
      "err": "Problema na troca de senha."
    }
    ```

---

### Produtos

#### `GET /products`
- **Descrição**: Retorna todos os produtos cadastrados.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "products": [
        {
          "id": 1,
          "name": "Produto A",
          "description": "Descrição do Produto A",
          "price": 100.00,
          "image": "imagem_a.jpg"
        },
        ...
      ]
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha ao listar produtos."
    }
    ```

---

#### `POST /products`
- **Descrição**: Cadastra um novo produto. Apenas administradores podem realizar essa ação.
- **Middleware**: `AuthMiddleware && IdAdm`
- **Body**:
  - `name`: String, nome do produto.
  - `description`: String, descrição do produto.
  - `price`: Number, preço do produto.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Produto cadastrado com sucesso.",
      "id": 1
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Somente Administradores Podem Registrar Novos Produtos!"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "err": "Erro de validação."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha no cadastro."
    }
    ```

---

#### `PUT /products/:id`
- **Descrição**: Atualiza um produto existente. Apenas administradores podem realizar essa ação.
- **Middleware**: `AuthMiddleware && IdAdm`
- **Body**:
  - `name`: String, nome do produto.
  - `description`: String, descrição do produto.
  - `price`: Number, preço do produto.
  - `image`: String, caminho da nova imagem (opcional).
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Produto atualizado com sucesso."
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Somente Administradores Podem Atualizar Produtos!"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "err": "Id inválido."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha na atualização."
    }
    ```

---

#### `DELETE /products/:id`
- **Descrição**: Remove um produto existente. Apenas administradores podem realizar essa ação.
- **Middleware**: `AuthMiddleware && IdAdm`
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Produto deletado com sucesso."
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Somente Administradores Podem Apagar Produtos!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha na remoção."
    }
    ```

---

#### `POST /upload_product/:id`
- **Descrição**: Faz o upload da imagem de um produto. Apenas administradores podem realizar essa ação.
- **Middleware**: `AuthMiddleware && IdAdm`
- **Body**: Form-data com o campo `image`.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Imagem salva com sucesso.",
      "file": "imagem_a.jpg"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Somente Administradores Podem Alterar Fotos de Produtos!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha em salvar a imagem."
    }
    ```

---

### Endereço

#### `POST /adress`
- **Descrição**: Adiciona um novo endereço para um usuário.
- **Middleware**: `AuthMiddleware`
- **Body**:
  - `idUser`: ID do usuário.
  - `number`: Número do endereço.
  - `neighborhood`: Bairro.
  - `street`: Rua.
  - `city`: Cidade.
  - `state`: Estado.
  - `cep`: CEP.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Endereço Adicionado Com Sucesso",
      "idAdress": 1
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível adicionar endereço para outro usuário!"
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "err": "Dados Inválidos. Verifique se não tem campo vazio ou CEP inválidos."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Erro ao Adicionar Endereço"
    }
    ```

---

#### `PUT /adress`
- **Descrição**: Atualiza um endereço existente de um usuário.
- **Middleware**: `AuthMiddleware`
- **Autenticação**: Necessário token JWT.
- **Body**:
  - `idUser`: ID do usuário.
  - `number`: Número do endereço.
  - `neighborhood`: Bairro.
  - `street`: Rua.
  - `city`: Cidade.
  - `state`: Estado.
  - `cep`: CEP.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Endereço Atualizado Com Sucesso",
      "idAdress": 1
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível atualizar endereço de outro usuário!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Erro ao Atualizar Endereço"
    }
    ```

---

#### `DELETE /adress/:id`
- **Descrição**: Remove um endereço de um usuário.
- **Middleware**: `AuthMiddleware`
- **Parâmetros**:
  - `id`: ID do usuário.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Endereço Removido com Sucesso"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível remover endereço de outro usuário!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Erro ao Remover Endereço"
    }
    ```


### Carrinho

#### `GET /cart/:id`
- **Descrição**: Retorna os produtos no carrinho de um usuário.
-- **Middleware**: `AuthMiddleware`
- **Parâmetros**:
  - `id`: ID do usuário.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Lista De Produtos No Carrinho",
      "products": [
        {
          "id": 1,
          "nome_produto": "Produto A",
          "preço_produto": 100.00,
          "descrição_produto": "Descrição do Produto A",
          "image": "imagem_a.jpg"
        },
        ...
      ]
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível ver carrinho de outra pessoa!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha em listar produtos do carrinho"
    }
    ```

---

#### `POST /cart`
- **Descrição**: Adiciona um produto ao carrinho de um usuário.
- **Middleware**: `AuthMiddleware`
- **Body**:
  - `idUser`: ID do usuário.
  - `idProduct`: ID do produto.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Produto Adicionado No Carrinho"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível inserir produtos no carrinho para outros usuários!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha em adicionar o produto no carrinho"
    }
    ```

---

#### `DELETE /cart`
- **Descrição**: Remove um produto do carrinho de um usuário.
- **Middleware**: `AuthMiddleware`
- **Body**:
  - `idUser`: ID do usuário.
  - `idProduct`: ID do produto.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Produto Deletado Do Carrinho"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível remover produtos do carrinho de outros usuários!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha em remover produto do carrinho"
    }
    ```


## Pagamentos

### `GET /orders/:id`
- **Descrição**: Encontra os pedidos feitos por um usuário específico.
- **Middleware**: `AuthMiddleware`
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "orders": [
        {
          "id": 1,
          "status": {
            "id": 1,
            "paid": 1,
            "date": "22/09/2024 14:30:00"
          },
          "user": {
            "id": 1,
            "name": "Usuário A",
            "cpf": "123.456.789-00",
            "email": "usuario@exemplo.com"
          },
          "address": {
            "id": 1,
            "number": 123,
            "neighborhood": "Centro",
            "street": "Rua A",
            "city": "Cidade A",
            "state": "Estado A",
            "cep": "00000-000"
          },
          "product": {
            "id": 1,
            "name": "Produto A",
            "price": 100.00,
            "description": "Descrição do Produto A",
            "img": "imagem_a.jpg"
          },
          "link": {
            "url": "link_do_pagamento"
          }
        }
      ]
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível procurar pedidos de outros usuários!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Falha na busca dos pedidos."
    }
    ```

---

### `POST /create_payment`
- **Descrição**: Cria um novo pedido de pagamento.
- **Middleware**: `AuthMiddleware`
- **Body**:
  - `idUser`: Number, ID do usuário que está criando o pedido.
  - `idProduct`: Number, ID do produto a ser comprado.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Pedido criado com sucesso.",
      "id": "123456",
      "result": "link_do_pagamento"
    }
    ```
  - **403 Forbidden**:
    ```json
    {
      "err": "Não é possível criar pedidos para outros usuários!"
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Erro ao criar o pagamento."
    }
    ```

---

### `POST /cancel_payment/:id`
- **Descrição**: Cancela um pagamento existente.
- **Middleware**: `AuthMiddleware`
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Pagamento cancelado com sucesso."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Pagamento não encontrado para ser cancelado."
    }
    ```

---

### `DELETE /delete_payment/:id`
- **Descrição**: Remove um pedido do sistema.
- **Middleware**: `AuthMiddleware`
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Pedido deletado com sucesso."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Erro ao deletar o pedido."
    }
    ```

---

### `POST /notification`
- **Descrição**: Recebe notificações do Mercado Pago(Webhook) sobre o status dos pagamentos.
- **Resposta**:
  - **200 OK**:
    ```json
    {
      "msg": "Notificação recebida com sucesso."
    }
    ```
  - **500 Internal Server Error**:
    ```json
    {
      "err": "Erro ao processar a notificação."
    }
    ```




