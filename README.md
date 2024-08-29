
# Comanda Fácil Empresa

## Descrição

O **Comanda Fácil Empresa** é uma aplicação web desenvolvida com Angular que oferece uma solução completa para gerenciamento de empresas, mesas e reservas. A plataforma permite o cadastro e edição de empresas, gerenciamento de mesas, controle de reservas, e inclui um sistema de autenticação e autorização baseado em JWT. É ideal para empresas que desejam uma interface intuitiva e eficiente para administrar suas operações.

## Tecnologias Utilizadas

- **Angular**: Framework JavaScript para construção de aplicações web dinâmicas.
- **TypeScript**: Linguagem de programação usada para desenvolvimento do projeto.
- **HTML5 & CSS3**: Para estruturação e estilização das páginas.
- **Font Awesome**: Biblioteca de ícones para enriquecer a interface.
- **RxJS**: Biblioteca para programação reativa, utilizada no Angular.
- **JWT (JSON Web Token)**: Implementado para autenticação e autorização seguras.

## Funcionalidades

- **Autenticação e Autorização**:
  - Registro e login de usuários com controle de permissões.
  - Autenticação baseada em JWT.
  
- **Cadastro de Empresas**:
  - Cadastro, edição e exclusão de dados empresariais.
  - Upload de logotipos e outras imagens relacionadas.

- **Gerenciamento de Mesas**:
  - Adição, edição, exclusão e controle manual de ocupação de mesas.
  - Interface interativa para visualizar e gerenciar o status das mesas.

- **Controle de Reservas**:
  - Listagem de reservas com opção de filtragem por data.
  - Visualização detalhada de cada reserva, incluindo informações de clientes e mesas.

- **Uploads de Imagens**:
  - Suporte para upload de imagens para representar empresas e itens do menu.
  
- **Sistema de Cache**:
  - Cache implementado para melhorar o desempenho e reduzir o tempo de carregamento dos dados.

- **Interceptores HTTP**:
  - Manipulação de requisições HTTP para adicionar automaticamente tokens JWT e gerenciar o estado de carregamento da aplicação.

## Pré-requisitos

- **Node.js** e **npm** instalados na máquina.
- Angular CLI instalada globalmente (`npm install -g @angular/cli`).

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/paulaLopes2270/comandaFacilFrontEmpresa.git
 
Instale as dependências:
npm install

Configure as variáveis de ambiente:

Altere as URLs da API no serviço ApiService localizado em src/app/services/api.service.ts conforme necessário.

Inicie o servidor de desenvolvimento:
ng serve

Acesse a aplicação em http://localhost:4200/.

Uso
Após iniciar o servidor, você poderá acessar a aplicação e realizar as seguintes operações:

- Cadastro de novas empresas através da interface de administração.
- Gerenciamento de mesas, permitindo adicionar, editar e excluir mesas, além de controlar sua ocupação.
- Reserva de mesas com possibilidade de filtro por data e visualização de detalhes.
- Autenticação de usuários com controle de permissões baseado em JWT.
- Endpoints da API
- 
- **A aplicação se comunica com a API backend através dos seguintes endpoints**:
 - GET /empresas: Retorna a lista de empresas cadastradas.
 - POST /empresas: Cria uma nova empresa.
 - PUT /empresas/:id: Atualiza os dados de uma empresa existente.
 - DELETE /empresas/:id: Exclui uma empresa.
 - GET /mesas/empresa/:empresaId: Retorna a lista de mesas de uma empresa específica.
 - POST /mesas/empresa/:empresaId: Cria uma nova mesa para uma empresa.
 - PUT /mesas/:id: Atualiza os dados de uma mesa existente.
 - DELETE /mesas/:id: Exclui uma mesa.
 - GET /reservas/empresa/:empresaId: Retorna a lista de reservas de uma empresa, com possibilidade de filtragem por data.

![image](https://github.com/user-attachments/assets/80954e0d-73b2-493b-99df-a9de536ac3ee)


-


![image](https://github.com/user-attachments/assets/56f27119-82d7-4138-9ab6-59f329e371bd)


-


![image](https://github.com/user-attachments/assets/9fbc0e71-9ebd-49fb-9f31-931025b1594f)


-


![image](https://github.com/user-attachments/assets/b3e2632a-a059-4cc1-b608-6cde4306fae8)


-


![image](https://github.com/user-attachments/assets/838f5e94-73e8-4538-bc39-ddf2c8490991)


-


![image](https://github.com/user-attachments/assets/fc13ab17-2a6c-4417-8a88-7e5ef543f1b8)


-


![image](https://github.com/user-attachments/assets/b5406dfa-dc07-49d8-87b6-23c5a24407aa)


-


![image](https://github.com/user-attachments/assets/2b53b689-6cb5-47b2-88e3-0d7ac65164bb)


-


![image](https://github.com/user-attachments/assets/d900342d-1bdd-426e-9b7d-883af3979104)


-


![image](https://github.com/user-attachments/assets/64563e96-755e-4d01-9c00-86e8d81ca3be)


-


![image](https://github.com/user-attachments/assets/c1e84aa1-e495-4152-97fc-85a8d20296ed)

