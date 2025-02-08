<h1><img src="https://img.shields.io/badge/GESTION ECOMMERCE-BACKEND-32286E?logo=null&logoColor=black&style=flat" width="320" height="32"/></h1>


## [VIDEO DEMOSTRATIVO Entrega FINAL](https://drive.google.com/file/d/1UgzdOO7vUKJJkgYh3kF8WI-6qFR0m7yb/view?usp=sharing)


> Curso: Programación Backend I: Desarrollo Avanzado de Backend

> Comisión: 76070
 
* Alumna: Tamara S. Canzobre
* Profesor: Emiliano Perez
* Tutor: Alan Sinicco
* Tutor Adjunto: Paola Silvina Coronel
* Tutor Regular: Victoria Rodriguez Mora


<h3> > ENTREGA FINAL</h3>

* Objetivos generales:

- [x] Uso de Mongo Atlas + MongoDB Compass + Mongoose como sistema de persistencia principal.
- [x] Nuevos endpoints para poder trabajar con productos y carritos.

* Objetivos específicos:

- [x] Consultas de productos con filtros query params por categoría, paginación y ordenamientos con sort ascendente y descendente por precio. 

Se puede buscar y ordenar tanto desde la url como desde la interfaz de usuario.
Ejemplos:

```
http://localhost:5000/products?sort=asc
```
http://localhost:5000/products?query=Stickers


- [x] Gestión de carrito con vista .hbs para implementar conceptos vistos como "populate" de Mongoose, ("poblar" con los productos del id del cart), se suma botón de agregar producto al carrito y botón para eliminar producto desde el carrito, y eliminar el cart completo.


<br>

> [!NOTE]
> Herramientas de desarrollo / dependencias:

- MongoDB Compass (GUI)
- Mongo Atlas (Cloud Database)
- Mongoose (MongoDB ODM)
- Node.js (JavaScript Runtime)
- Express (Web Framework)
- Handlebars (Template Engine)
- Materialize (CSS Framework)
- Bootstrap (CSS Framework)
- JS Vainilla / CSS / HTML

<br>

Entrega 1 y 2:
- Socket.io (WebSocket) 
- UUID (Universally Unique Identifier)
- fs (File System)
- Postman (API Testing)

<br>

> [!IMPORTANT]
> Instalación de dependencias y ejecución del servidor:

```
npm i -y
```
npm run dev

* Abrir en navegador http://localhost:5000

* Nota: Para por seguridad se quitó del código el acceso a la base de datos de MongoDB Atlas, pedir los datos de acceso y contraseña.


<br>

_____________________________________________________________________________
<br>


<h3> > Segunda Pre-Entrega</h3>

## [VIDEO DEMOSTRATIVO Pre-Entrega 2](https://drive.google.com/file/d/1mUXX-b_0Rim2-QIUeJ7QaIEyWkZuBZHp/view?usp=sharing)

Configuración del proyecto para que trabaje con Handlebars y Websocket.

- [x] Uso de motor de plantillas Handlebars, librería para renderizar las vistas: home.hbs y realTimeProducts.hbs.
- [x] Websocket para actualizar la lista de productos en tiempo real con la instalación de socket.io, tanto al agregar como al eliminar un producto.
- [x] Se utilizó Materialize, librería para darle estilos de página, más estilos propios.
- [x] Se utilizó Morgan, middleware para ver en consola las peticiones.


<br>

_____________________________________________________________________________
<br>

<h3> > Primer Pre-Entrega</h3>
Realización de un servidor que contiene los endpoints y servicios necesarios 
para gestionar los productos y carritos de compra en un e-commerce.

## [VIDEO DEMOSTRATIVO Pre-Entrega 1](https://drive.google.com/file/d/1_tWYToi5lvVw_qbifvqmMNDFHyXjmoup/view?usp=sharing)

- [x] Gestión de productos y carritos de compra con getAllProducts, 
getProductById, createProduct, updateProduct, deleteProduct. 
(GET / PUT / POST / DELETE)
- [x] Uso de **postman** para probar los endpoints.
- [x] Uso de la librería **Express** para crear un servidor web en Node **"SERVER.JS"**.
- [x] Uso de la librería **UUID** para generar un identificador único para cada producto.
- [x] Uso de la librería **fs** para leer y escribir archivos JSON.
- [x] Uso de la librería **path** para obtener la ruta del archivo JSON.
- [x] Uso de **Router** para crear rutas de API.

