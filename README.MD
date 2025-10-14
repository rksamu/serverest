# ServerRest E2E Testing

This project is designed to run End To End (E2E)  automated tests using **Cypress (14.5.4)** with **JavaScript**.
The automated test suite is designed to cover 3 scenarios of frontend testing and 3 scenarios of API testing.

## Test Environments:
 - **Frontend:** https://front.serverest.dev/
 - **Swagger API:** https://serverest.dev/


### Prerequisites
- Node.js (version compatible with Cypress 14.5.4)
- npm or yarn

### Local Setup

To run the same ServeRest version used in this project locally:

```bash
npx serverest@2.29.7
```
# Test Suite

## [FRONTEND-1] Create and use Accounts
### Description:
Creates an account of each type, logs in and out and checks if the pages are loading according to both correct and incorrect inputs.

### Preconditions:
- Must be in *Login* page.

### Test Steps:
| # | Action | Expected Result |
|--|--|--|
| 1 | Without filling any fields, click on **Entrar** | Messages saying *"Email é obrigatório"* and saying *"Password é obrigatório"* are displayed.|
| 2 | Click on **Cadastre-se** | Page *Cadastro* opens, with URL ending with `/cadastrarusuarios`. Input fields **nome**, **email**, **password** *"checkbox"* and buttons **Cadastrar** and **Entrar** are visible. |
| 3 | Without filling any fields, click on **Cadastrar** | Messages *"Nome é obrigatório", "Email não pode ficar em branco" and "Password não pode ficar em branco"* are visible on page *"Cadastro"*.|
| 4 | Fill the field **nome** with *"NormalUser"* and click on **Cadastrar**| Messages *"Email não pode ficar em branco" and "Password é obrigatório"* are visible on page *"Cadastro"*.|
| 5 | Fill the field **email** with *"aaa*" and click on **Cadastrar**| Messages *"Email é obrigatório" and "Password é obrigatório"* are visible on page *"Cadastro"*. Form is not submitted. |
| 6 | Fill the field **email** with *"aaa@"* and click on **Cadastrar**| Messages *"Email não pode ficar em branco" and "Password é obrigatório"* are visible on page *"Cadastro"*. Form is not submitted.|
| 7 | Fill the field **email** with *"aaa@a"* and click on **Cadastrar**| Messages *"Email deve ser um email válido" and "Password é obrigatório"* are visible.|
| 8 | Fill the field **email** with a valid email address and click on **Cadastrar** | Message *"Password é obrigatório"* is visible. |
| 9 | Fill the field **password** and click on **Cadastrar** | Message *"Cadastro realizado com sucesso"* appears and then page changes to  *Serverest Store*, with URL ending with `/home`, buttons **Home**, **Lista de Compras**, **Carrinho** and **Logout** on the header menu, product list, search bar, button **Pesquisar** and text *"Serverest Store*" visible.|
| 10 | Click on button **Logout** | Login page loads with entry fields **email** and **password**, buttons **Entrar** and **Cadastre-se** and text *"Login"*. |
| 11 | Fill the **email** field with the email used to create an account and click on **Entrar**| Message *"Password é obrigatório"* is visible on *"Login"* page. |
| 12 | Fill the **password** field with a wrong password and click on **Entrar**| Message *"Email e/ou senha inválidos"* is visible on *"Login"* page. |
| 13 | Fill the **password** field with the correct password and click on **Entrar** | *"Serverest Store"* page loads, with url ending in **/home** and all of its elements loaded. |
| 14 | Click on button **Logout** | Login page loads with all of its components. |
| 15 | Click on **Cadastrar** | *"Cadastro"* page opens with all of its components. |
| 16 | Click on the **checkbox** for *"Cadastrar como administrador"*, fill field **nome** with *"AdminUser"*, **password** with *"admin123"* and place the same valid email used before on **email** field, then press **Cadastrar**| Message *"Este email já está sendo usado*" is visible on page *"Cadastro"*. |
| 17 | Replace the email with a new one and click on **Cadastrar** | Message *"Cadastro realizado com sucesso"* appears and then page changes to  Admin Home page, with URL ending with `/admin/home`, buttons **Home**, **Cadastrar Usuários**, **Listar Usuários**, **Cadastrar Produtos**, **Listar Produtos**, **Relatórios** and **Logout** visible on the header menu, texts *"Bem Vindo AdminUser"* and *"Este é seu sistema para administrar seu ecommerce."*, and shortcuts for *"Cadastrar Usuários"*, *"Listar Usuários"*, *"Cadastrar Produtos"*, *"Listar Produtos"* and *"Relatórios"* are visible.|
| 18 | Click on button **Logout** | Login page loads with all of its components. |
| 19 | Fill the **email** field with the AdminUser's email and click on **Entrar**  | Message *"Password é obrigatório"* is visible on *"Login"* page. |
| 20 | Fill the **password** field with an incorrect password instead of AdminUser's password and click on **Entrar**| Message *"Email e/ou senha inválidos"* is visible on *"Login"* page. |
| 21 | Fill the **password** field with the correct password for AdminUser and click on **Entrar**| Admin Home page opens with all of it's components. |


## [FRONTEND-2] Normal User on Serverest Store
### Description:
Tests the actions of a normal user logged and using the existent features of the Serverest Store.

### Preconditions:

 - Must be logged into an normal (non-admin) account;
 - Start at Home Page.

### Test Steps:
| # | Action | Expected Result |
|--|--|--|
| 1 | On the search bar, type *"prod"* and click on **Pesquisar** | Product List must displays only products that contains the term *prod* within its name. |
| 2 | Empty the search bar content and click on **Pesquisar** | Product List displays every product again. |
| 3 | On the search bar, type *"wrong"* and click on **Pesquisar** | Product List must be empty with the message *"Nenhum produto foi encontrado"* visible |
| 4 | Empty the search bar content and click on **Pesquisar** | Product List displays every product again. |
| 5 | On the first displayed product, click on **Detalhes**  | Page changes to *Detalhes do produto*, with product name and *"Descrição: "* followed by the product description, and the button **Adicionar a lista** visible.|
| 6 | Click on **Voltar** | Page changes to *Serverest Store*, with URL ending with `/home`, and both the complete product list and search bar visible.|
| 7 | On the search bar, type *"sa"* and click on **Pesquisar** | Product List must displays only products that contains the substring *sa*. |
| 8 | On the last displayed product, click on **Detalhes** | Page changes to *Detalhes do produto*, with product name and *"Descrição: "* followed by the product description, and the button **Adicionar a lista** visible.|
| 9 | Click on **Voltar** | Page changes to *Serverest Store*, with all of its components.|
| 10 | Click on the **Shopping Cart** icon in the title, right after *Serverest Store*| Page changes to *Lista de Compras*, with URL ending with `/minhaListaDeProdutos` and both the message *"Seu carrinho está vazio"* and button **Página Inicial** visible.|
| 11 | Click on **Página Inicial** | Page changes to *Serverest Store*, with all of its components.|
| 12 | On the first displayed product, click on **Adicionar a lista** | Page changes to *Lista de Compras*, with new buttons **Adicionar no carrinho** and **Limpar Lista**, the product name is visible, with price appearing and total amount as *Total: 1*.|
| 13 | In the same product, on the current page, click on **+** button 2 times | Product price is increased to the original multiplied by 3 and total amount to *3*|
| 14 | Click on **Página Inicial** | Page changes to *Serverest Store*, with all of its components.|
| 15 | On the same displayed product as before, click on *"Adicionar a lista"* | Page changes to *Lista de Compras*, the product is visible, with price as the original multiplied by 4 and total amount as *Total: 4*|
| 16 | Click on **Página Inicial** | Page changes to *Serverest Store*, with all of its components.|
| 17 | On the product in the middle of the product list, click on *"Adicionar a lista"* | Page changes to *Lista de Compras*, the product placed before is visible, with total amount as *Total: 4* and new product is visible with total amount as *Total: 1*|
| 18 | Click on **Limpar Lista**| Shopping list must be empty and message *"Seu carrinho está vazio"* should be visible. Except for the header, the only button available is **Página Inicial**.
| 19 | Click on **Página Inicial** | Page changes to *Serverest Store*, with all of its components.|
| 20 | By Clicking on **Adicionar a lista** and then on **Página Inicial**, add one of each product on the shopping list. | Page *Lista de Compras* must be open and every product displayed on *Serverest Store* should be visible. |

## [FRONTEND-3] Admin User on ServeRest
### Description:
Tests most admin account actions, by accessing each page on the header and, when applicable, use the page function and check its results.

### Preconditions:
- Must be logged into an admin account;
- Start at Admin Home page.

### Test Steps:
| # | Action | Expected Result |
|--|--|--|
| 1 | Click on the button **Home**, located on the header | Page does not change. |
| 2 | Click on the button **Cadastrar Usuários**, located on the header | Page **Cadastro de usuários** opens with url ending in `/admin/cadastrarusuarios`, admin home header and its elements, entry fields **nome**, **email** and **password**, *Cadastrar como administrador* **checkbox** and button **Cadastrar**. |
| 3 | Fill the field **nome** with *"UserTest3223"*, **email** with a valid email address and **password** and click on **Cadastrar** | Page *"Lista dos usuários"* opens with url ending in `admin/listarusuarios`, admin header and its elements and a list of users, containing the  user *"UserTest3223"* with the correct email and password set and false for *"Administrador"*. |
| 4 | On the row of the created user, click on *"Excluir"* | Page reloads and the "UserTest3223" no longer exists. |
| 5 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |
| 6 | Click on **Listar Usuários**, located on the header | Page *"Lista dos usuários"* opens with all of its elements. |
| 7 | Click on **Cadastrar Produtos**, located on the header | Page *"Cadastro de Produtos"* opens, url ending with `/admin/cadastrarprodutos`, with admin header, text *"Cadastro de Produtos"*, entry fields **nome**, **preco**, **descricao**, **quantity**, **imagem** and button **Cadastrar** visible.|
| 8 | Click on button **Cadastrar** | Messages *"Nome é obrigatório", "Preco é obrigatório", "Descricao é obrigatório", "Quantidade é obrigatório"* are visible. |
| 9 | Fill **nome** with "Prodtest-07", **preco** with "1", **descricao** with "Desctest-07", **quantity** with 10 and click on button **Cadastrar** | Page *"Lista dos Produtos"* opens with url ending with `/admin/listarprodutos`, admin header and a list with all the products. *"ProdTest-07"* should be listed with the correct price (1) and quantity (10). |
| 10 | On the *"Prodtest-07"* row, click in button **Excluir** | Page must reload, with "Prodtest-01" no longer listed. |
| 11 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |
| 12 | Click on the button **Listar Produtos**, located on the header | Page *"Lista dos Produtos"* opens, with all of its components. |
| 13 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |
| 14 | Click on the button **Cadastrar**, on the *"Cadastrar Usuários"* container in home screen. | Page *"Cadastro de usuários"* opens with all of its components. |
| 15 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |
| 16 | Click on the button **Listar**, on the *"Listar Usuários"* container in home screen. | Page *"Lista dos usuários"* opens with all of its components. |
| 17 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |
| 18 | Click on the button **Cadastrar**, on the *"Cadastrar Produtos"* container in home screen. | Page *"Cadastro de Produtos"* opens with all of its components. |
| 19 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |
| 20 | Click on the button **Listar**, on the *"Listar Produtos"* container in home screen. | Page *"Lista dos produtos"* opens with all of its components. |
| 21 | Click on the button **Home**, located on the header | Page Admin Home opens, with all of its components. |


## [API-1] Mass User Creation
### Description
Creates a large amount of users, checks if each user appears on the users list and tests its credentials.

### Preconditions
- File *fixtures/users.json* must have a large list of user infos, each containing an user name, email and password. Generative AI can be used to generate the data.

### Test Steps
| # | Action | Expected Result |
|--|--|--|
| 1 | Send POST request to `/usuarios` endpoint with first user data from fixture | Response status 201 with success message and user ID |
| 2 | Verify user appears in GET `/usuarios` response | User data is present in the users list with correct information |
| 3 | Test user credentials by sending POST `/login` with user email and password | Login successful with authentication token received |
| 4 | User is deleted by sending a DELETE `/usuarios/_id` | Response status 200 with success message of user deleted and user information no longer available |
| 5 | Repeat steps 1-3 for all users in the fixture file | All users are created successfully and credentials work |
| 6 | Send GET `/usuarios` to verify total user count | Total user count matches expected number (initial count + newly created users |
| 7 | Delete all users created | A GET `/usuarios/_id` response status must be 400 |

## [API-2] Using Product endpoints
### Description
Using both account types through bearer token,  this test aims to test product endpoints.

### Preconditions
- File *fixtures/products.json* must have a large list of product infos, each containing a product name, price, description and quantity. Generative AI can be used to generate the data.


### Test Steps
| # | Action | Expected Result |
|--|--|--|
| 1 | Send POST request to `/produtos` endpoint with first product data from fixture using admin token | Response status 201 with success message and product ID |
| 2 | Verify product appears in GET `/produtos` response | Product data is present in the products list with correct information |
| 3 | Send GET request to `/produtos/_id` for the created product | Response status 200 with complete product details |
| 4 | Attempt to create product with regular user token via POST `/produtos` | Response status 403 with message *""Rota exclusiva para administradores""* |
| 5 | Repeat steps 1-4 for all products in the fixture file | All products are created and processed successfully |
| 6 | Admin user updates product via PUT `/produtos/_id` with modified data | Admin user updates product via PUT `/produtos/_id` with modified data |
| 7 | Admin user updates product via PUT `/produtos/_id` with modified data | Admin user updates product via PUT `/produtos/_id` with modified data |
| 8 | Admin user deletes product via DELETE `/produtos/_id` | Response status 200 with success message of product deleted |
| 9 | Verify product deletion via GET `/produtos/_id` | Response status 400 with product not found message |


## [API-3] Using Shoppping Cart
### Description
Using a normal user  account,  this test aims to test shopping cart endpoints.

### Test Steps
| # | Action | Expected Result |
|--|--|--|
| 1 | Get the list of Producs via GET `/products` | Product data is present in the products list, response status 200 |
| 2 | User adds first product to cart via POST `/carrinhos` | Response status 201 with cart updated successfully, message *"Cadastro realizado com sucesso"* and cart *"_id"*|
| 3 | Verify cart contents via GET `/carrinhos/_id` with regular user token | Product is present in cart with correct quantity and details |
| 4 | Get the list of Cards via GET `/carrinhos` | Response status 200, Shoppping Cart list appears, the cart created is in the list |
| 5 | Clear the cart via GET `/carrinhos/concluir-compra` | Response Status 200, success message and the Cart no longer exists |
| 6 | Repeat step 2 and clear the cart via GET `/carrinhos/cancelar-compra` | Response Status 200, success message and the Cart no longer exists |
| 7 | Repeat step 1-4 for all the existent products (up to 100) | All products should be added to the cart |
| 8 | Clear the cart via GET `/carrinhos/concluir-compra` | Response Status 200, success message and the Cart no longer exists |
| 9 | Repeat step 2 and send DELETE `/usuarios/_id` | Response Status 400, message *"Não é permitido excluir usuário com carrinho cadastrado"* |
