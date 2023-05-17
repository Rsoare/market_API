# Mercado autônomo

## Endpoints da aplicação

| Método | Endpoint      | Responsabilidade                                                        |
| ------ | ------------- | ----------------------------------------------------------------------- |
| POST   | /products     | Criar e adicionar os produtos ao mercado                                |
| GET    | /products     | Listar todos os produtos do mercado, sendo possível listar pela section |
| GET    | /products/:id | Listar um produto específico através do seu id                          |
| PATCH  | /products/:id | Atualizar os dados de um produto através do seu id                      |
| DELETE | /products/:id | Deletar o produto a partir do seu id                                    |


## Regras da aplicação

### **POST /products**

### Envio:

-   É possível criar vários produtos de uma só vez, portanto, o envio dessa rota deve ser um array de objetos contendo todos os produtos que deverão ser cadastrados.
-   O **id** não deve ser enviado pois é criado de forma automática.
-   O **expirationDate** não deve ser enviado  pois é criado de forma automática pelo servidor. O valor é de 365 dias a partir da data de criação do produto.

## Exemplos de envio da requisição

| **Corpo de envio da requisição:** |
| --------------------------------- |
| **Formato Json**                  |

```json
[
    {
        "name": "Queijo",
        "price": 10,
        "weight": 30,
        "calories": 300,
        "section": "food"
    },
    {
        "name": "Presunto",
        "price": 100,
        "weight": 40,
        "calories": 1100,
        "section": "food"
    },
    {
        "name": "Detergente",
        "price": 10,
        "weight": 1000,
        "section": "cleaning"
    }
]
```

| **Resposta do servidor:**           |
| ----------------------------------- |
| **Formato Json**                    |
| **Status code:** **_201 CREATED._** |

```json
{
 "total": 120,
 "marketProducts": [
  {
   "id": 1,
   "name": "Queijo",
   "price": 10,
   "weight": 30,
   "calories": 300,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  },
  {
   "id": 2,
   "name": "Presunto",
   "price": 100,
   "weight": 40,
   "calories": 1100,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
  {
   "id": 3,
   "name": "Detergente",
   "price": 10,
   "weight": 1000,
   "section": "cleaning",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
 ]
}
```

### **GET /products**

-   É possível listar todos os produtos do mercado;

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: **/products**.
| Resposta do servidor: |
| - |
| **Formato Json** |
| **Status code:** **_200 OK._** |

```json
{
 "total": 120,
 "marketProducts": [
  {
   "id": 1,
   "name": "Queijo",
   "price": 10,
   "weight": 30,
   "calories": 300,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  },
  {
   "id": 2,
   "name": "Presunto",
   "price": 100,
   "weight": 40,
   "calories": 1100,
   "section": "food",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
  {
   "id": 3,
   "name": "Detergente",
   "price": 10,
   "weight": 1000,
   "section": "cleaning",
   "expirationDate": "2024-03-06T12:12:32.431Z"
  }
 ]
}
```

### **GET /products/:id**

-   É possível listar as informações de um produto com base em seu **_id_**;
-   
#### Sucesso:

O exemplo abaixo foi realizado na seguinte rota: **/products/1**.
| Resposta do servidor: |
| - |
| **Formato Json** |
| **Status code:** **_200 OK._** |

```json
{
    "id": 1,
    "name": "Queijo",
    "price": 10,
    "weight": 30,
    "calories": 300,
    "section": "food",
    "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

### **PATCH /products/:id**

-   É possível atualizar os dados de um produto de forma opcional.
-   Não e possível atualizar os valores de **_id_**, **_expirationDate_** e **_section_**.
    -   **Esses dados não devem ser enviados**

## Exemplos de envio da requisição

| **Corpo de envio da requisição:** |
| --------------------------------- |
| **Formato Json**                  |

```json
{
    "name": "Presunto defumado",
    "price": 100,
    "weight": 30,
    "calories": 300
}
```

| **Resposta do servidor:**      |
| ------------------------------ |
| **Formato Json**               |
| **Status code:** **_200 OK._** |

```json
{
    "id": 2,
    "name": "Presunto defumado",
    "price": 100,
    "weight": 30,
    "calories": 300,
    "section": "food",
    "expirationDate": "2024-03-06T12:12:32.431Z"
}
```

### **DELETE /products/:id**

-  E possível deletar um produto informando o seu **_id_**.

### Exemplo de retorno:

O exemplo abaixo foi realizado na seguinte rota: `/products/1`.
| Resposta do servidor: |
|-|
|**Status code:** **_204 NO CONTENT._**|

