## CRUD TypeOrm
Projeto realizado no quarto módulo do curso de **Formação em Desenvolvimento Full Stack da Kenzie Academy Brasil**

O objetivo desse projeto é desenvolver um serviço de back-end responsável por gerenciar um CRUD de usuário utilizando **TypeORM**


Rotas e suas funcionalidades:
- **POST /users**

Rota para criação de usuário com os seguintes dados:
1. name: string;
2. email: string;
3. password: uma string que armazena uma hash gerada com a biblioteca bcrypt;
4. isAdm: boolean;
5. isActive: é gerado no momento da validação dos dados no formato boolean com o valor default igual a true;
6. createdAt: é gerado apenas no momento da validação dos dados ;
7. updatedAt: é gerado apenas no momento da validação dos dados, na qual o usuário é atualizado, e inicia com o valor de criação;
8. id: um uuidv4 gerado no momento da validação dos dados.

A rota de criação retorna todos os dados, com exceção da hash de senha.
Não é possível cadastrar dois usuário com o mesmo e-mail.

- **POST /login** 

Rota de login recebendo email e password. 
O login valida se o usuário existe e se a senha está correta. 

A rota de login retorna um token JWT válido por 24h caso todas as validações passem.

- **GET /users** 

A rota de listagem de usuários retorna todos os dados dos usuários, com exceção dos hashs de senha. 
Está rota está protegida por um middleware de validação do token JWT e um middleware para checar se o usuário logado é um administrador. Ela só pode ser acessada por usuários que sejam administradores.


- **PATCH	/users/<id>** 

A rota de atualização de usuário é capaz de atualizar tanto um quanto todos os dados de um usuário. Está rota está protegida por um middleware de validação do token JWT e um middleware para checar se o usuário logado é um administrador. Apenas administradores podem atualizar qualquer usuário, usuários não-administradores podem apenas atualizar seu próprio perfil.

Os campos id, isAdm e isActive não podem ser atualizados.
 
Essa rota retorna os dados atualizados do usuário.

- **DELETE /users/<id>** 

A rota realiza um soft delete do usuário, alterando isActive para false. Está rota está protegida por um middleware de validação do token JWT e um middleware para checar se o usuário logado é um administrador. Apenas administradores podem excluir qualquer usuário, usuários não-administradores podem apenas excluir seu próprio usuário.

Não é possível realizar um soft delete um usuário inativo.
