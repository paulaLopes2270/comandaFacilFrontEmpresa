## Sistema de Gerenciamento

Este projeto é um sistema de gerenciamento desenvolvido com Angular e Java. Ele inclui funcionalidades para a gestão de usuários, mesas e reservas em um ambiente empresarial.

## Estrutura do Projeto

O projeto é composto pelas seguintes partes principais:

- **Registro de Usuários**: Permite o cadastro de novos usuários.
- **Gerenciamento de Mesas**: Permite a criação, edição e exclusão de mesas.
- **Gerenciamento de Reservas**: Permite visualizar e filtrar reservas por data.

## Tecnologias Utilizadas

- **Frontend**: Angular
- **Backend**: Java
- **Estilos**: CSS
- **Serviços de API**: HTTP Client para comunicação com o backend

## Funcionalidades

### Registro de Usuários

O componente `RegisterUserCompanyComponent` permite o registro de novos usuários. A interface inclui campos para nome de usuário, e-mail, telefone, senha e tipo de usuário.

- **Componente**: `register-user-company.component.ts`
- **Template**: `register-user-company.component.html`
- **Estilos**: `register-user-company.component.css`

### Gerenciamento de Mesas

O componente `TableManagementComponent` é responsável pela gestão das mesas. Inclui funcionalidades para adicionar, editar e excluir mesas, além de alternar o estado de ocupação das mesas.

- **Componente**: `table-management.component.ts`
- **Template**: `table-management.component.html`
- **Estilos**: `table-management.component.css`

### Gerenciamento de Reservas

O componente `ReservationManagementComponent` permite visualizar e filtrar reservas por data.

- **Componente**: `reservation-management.component.ts`
- **Template**: `reservation-management.component.html`
- **Estilos**: `reservation-management.component.css`

## Configuração do Ambiente

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/paulaLopes2270/comandaFacilFrontEmpresa.git

## instalar dependências
 `npm install`

## Configurar o Ambiente 
Edite o arquivo `src/environments/environment.ts` para configurar as URLs da API e outras variáveis de ambiente.

## Executar o Servidor de Desenvolvimento
Para iniciar o servidor de desenvolvimento, execute:
`ng serve`
