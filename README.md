<div id="top"></div>

# Aplicación de Star Wars

Una aplicación que muestra los personajes, los planetas y las películas de Star Wars, desarrollada con React, Node, Express y MongoDB.


## Tabla of Contenidos
- [Features](#features)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
  - [Prerrequisitos](#prerrequisitos)
  - [Setup del proyecto](#setup-del-proyecto)
  - [Configuración de entorno](#configuración-de-entorno)
- [Uso](#uso)
- [Testing](#testing)
- [Reflexiones](#reflexiones)
- [Carpetas del proyecto](#carpetas-del-proyecto)
- [Contribuciones](#contribuciones)
- [Contacto](#contacto)

## Features:
  - Acceso a información detallada de personajes, planetas y películas pertenecientes a la trilogía original y las precuelas.
  - La información se consume asincrónicamente desde la api desarrollada en el backend.
  - Logueo inicial donde el usuario debe proveer las credenciales correspondientes para acceder a la aplicación
  - Barra de búsqueda para que el usuario pueda acceder a la información de personajes.
  - Cada usuario puede guardar sus propios personajes favoritos.
  - Paginación para gran cantidad de datos.

## Estructura del proyecto
  ```
  star-wars-app
   |__ client/ (React Frontend)
      |__ public/
      |__ cypress/
          |__ fixtures
          |__ integration
          |__ plugins
          |__ support
      |__ src/
          |__ helpers
          |__ testing
          |__ components
          |__ pages
          |__ App.js
          |__ index.js
      |__ package.json
      |__ cypress.json
   |__ server (Express Backend)
      |__ auth
      |__ models
      |__ routes
      |__ server.js
   |__ package.json
   |__ .gitignore
   |__ readme.md
  
  ```
Para información más detallada de la estructura: [Carpetas del proyecto](#carpetas-del-proyecto)
<p align="right"><a href="#top">Volver arriba</a></p>

## Instalación

### Prerrequisitos
* [Node.js 14 o mayor](https://nodejs.org/es/)
* npm


### Setup del proyecto
Comienza por clonar el repositorio
   ```
   git clone https://github.com/felipebertocchi/star-wars-app.git
   ```
   
Luego instala las dependencias para ambos Express y React
  ```
  cd star-wars-app/
  npm install
  cd client/
  npm install
  ```

Para arrancar el servidor de React ejecutamos lo siguiente
  ```
  npm start
  ```

El navegador abrirá la dirección http://localhost:3000, que tendrá nuestra aplicación página de login.
  
Si intentamos alguna acción, vemos que la API no funciona bien porque todavía no estamos ejecutando nuestro backend, asi que ahora debemos configurar e iniciar nuestro servidor de Express en el siguiente paso
  
### Configuración de entorno
Incluí un archivo llamado `.env.example` que contiene las variables de entorno para poder conectarse a un cluster de MongoDB que ya contiene usuarios registrados. **Es importante que este archivo se renombre a `.env` y este presente dentro de la carpeta del server de Express.**
Claro no es la mejor práctica pero quería ahorrar el tener que configurar una base de datos cada vez que se clone el repositorio, además de requerir que se registre un usuario propio. 

Por último, abre otra terminal y ejecuta lo siguiente (asegúrate de estar en la carpeta principal del proyecto, `star-wars-app/`)
  ```
  npm start
  ```

Ahora si, ya puedes visitar la App y loguearte desde:
  ```
  http://localhost:3000
  ```

Si lo deseas, también puedes ingresar a los endpoints del backend desde:
  ```
  http://localhost:8080
  ```
> Para esto último recomiendo la aplicación [Postman](https://www.postman.com/) para realizar distintos tipos de request con un body, esto será necesario para acceder a la mayoría ya que requiere un login. Puedes ver los distintos endpoint (aquí)
<p align="right"><a href="#top">Volver arriba</a></p>

## Uso

Cuando accedas a la aplicación por primera vez te pedirá iniciar sesión.
Puedes usar los siguientes datos para entrar:
```
    Email: luke@jedi.com
    Contraseña: admin123
```

Una vez se ingresa a la aplicación, se puede seleccionar entre las 3 categorías mostradas en la página principal: Personajes, Planetas o Películas.

Cuando se ingrese a cada uno, se desplegarán tarjetas con el nombre o título de los recursos accedidos. Si fueran más de 12, la aplicación hará una paginación de los mismos, mostrando la página actual debajo de las tarjetas.

Si el usuario hace click en alguna de las tarjetas, será mostrado la información detallada de la misma. En el caso de un personaje, verá información como su nombre, fecha de nacimiento, planeta natal y películas donde aparece. Sucede de forma similar con distintas características para un planeta o una película.

> Cada vez que se acceda a alguna de las categorias se mostrará el componente de breadcrumbs arriba a la izquierda. Consideré utilizarlo ya que permite una mejor navegación y el usuario puede leer donde se encuentra parado.

En la esquina superior de la aplicación, el usuario puede acceder al menu de usuario haciendo click en su nombre o el avatar. De aqui se despliegan 2 opciones: una para cerrar la sesión, y otra para acceder a los favoritos del usuario.

Haciendo click en la última (Favoritos) nos dirige a la lista de personajes favoritos del usuario. Si todavía no ha seleccionado favoritos, aparecerá un mensaje notificando lo mismo con un botón que lo dirigirá a la pagina de personajes. Si se vuelve a una carta de personaje, dentro de la información detallada verá un icono de corazón. Dependiendo de si está lleno o no, esto dirá al usuario si lo agregó a su lista de favoritos. Si hace click podrá agregarlo o quitarlo según corresponda.

Finalmente, se puede hacer la busqueda de un personaje particular, haciendo click y escribiendo en la barra de busqueda, arriba a la derecha de la aplicación. Veremos que a medida que escribimos va mostrando una lista de personajes que coinciden con el texto escrito. Si hacemos click en cualquiera, nos llevará a su página de detalles.

Recuerden también que se pueden acceder tanto a los favoritos como a las 3 secciones mediante el menu del appbar, haciendo click en el botón en la esquina superior izquierda.
<p align="right"><a href="#top">Volver arriba</a></p>

## Testing

Para el testing opté por usar el framework [Cypress](https://www.cypress.io/). Es muy util para realizar pruebas de integración, y provee las siguientes características:

- Excelente capacidad de debugging. El ejecutor de pruebas de Cypress puede volver a cualquier estado de la aplicación a través de instantáneas. Entonces, se pueden ver directamente los errores y cada paso anterior. Además, hay acceso completo a las herramientas de desarrollo de Chrome (DevTools) y los clics se registran por completo.
- Mejores formas de esperar acciones, modificaciones de la interfaz de usuario o las respuestas de la API. Cypress trae una espera implícita, por lo que no es necesario realizar comprobaciones adecuadas. También puede hacer que la prueba espere animaciones y respuestas de API.
- Los tests están escritos en JavaScript. Esto aplana la curva de aprendizaje para escribir pruebas. Además, el ejecutor de pruebas de Cypress es de código abierto.


> Asegúrate de que la aplicación este funcionando, teniendo encendidos ambos servidores de React y Express
> 
Para abrir el Test Suite de Cypress:  
  ```
  npm test
  ```
> Esta acción puede tardar un par de minutos en concretarse

Debería abrirse una nueva ventana de cypress que muestre todos los archivos de testeo. Si hacemos click en `run 7 integration specs` en la esquina superior derecha, abrirá una ventana de chrome donde se podrá ver como ejecuta cada paso de los tests, y muestra como se actualiza la página con cada acción. Como mencioné previamente, esto es muy útil a la hora de querer hacer debugging.
<p align="right"><a href="#top">Volver arriba</a></p>

## Reflexiones
Este fue un proyecto de casi 3 semanas realizado como challenge para una etapa de postulación. Los objetivos del proyecto se detallan [aquí](https://treggo.notion.site/Treggo-Challenge-421bcf37b384456684fccd4a46570158)

Comencé el proyecto desde la parte de backend, configurando las rutas de acceso a los distintos endpoints que luego solicitaría el frontend. 

Al principio utilicé una base de datos de MongoDB local, pero para esta instancia quise usar una feature de MongoDB llamada Atlas, que permite conectarse a un cluster de base de datos desde determinadas o cualquier IP. 

Un obstaculo con el me topé fue el de obtener datos particulares de algun personaje, planeta o pelicula. La documentación de la API sugerida muestra cómo se podría acceder a datos que, en realidad no son posibles de obtener en la misma API. [Aqui](https://www.swapi.tech/documentation#people) por ejemplo se muestra que dentro de la información de un personaje, se podría acceder a un array llamado _"films"_ donde se guardan las películas donde apareció ese personaje específico. Si accedemos a los datos de [Algún personaje](https://www.swapi.tech/api/people/34) se puede ver que no existe tal array. Tampoco aparecen otros arrays como "species" y "vehicles".

Pude realizar la mayoría de las consignas especificadas en el Test de Frontend relacionadas con los datos, haciendo un entrecruce de datos de un recurso particular con otros, por ejemplo:

Si necesito las películas donde apareció cierto personaje, puedo recorrer la información de cada películas (que contiene los personajes que aparecen), y con un id de personaje puedo agregar a una lista de películas donde ese personaje apareció.
Sin embargo, para el punto de "Seleccionar el planeta para mostrar todos los personajes que nacieron allí", no fue posible lograrlo ya que debería iterar sobre la lista de personajes y planetas, y al tener que recorrer todos los personajes, el servidor de la API externa nos rechazaría con un error de status 429 "Too many requests".

[Aqui en la documentación referida a planetas](https://www.swapi.tech/documentation#planets) se muestra que dentro de la API para un planeta, debería existir un array llamado _"residents"_ que muestre los personajes que nacieron en dicho planeta. Pero vemos [aquí](https://www.swapi.tech/api/planets/2/) por ejemplo que no es el caso.

En cuanto al frontend, el desarrollo fue de prueba y error, intentando poder mostrar los datos correspondientes utilizando componentes de Material UI. Luego se implementaron otras cuestiones para permitir una mejor navegación, por ejemplo: El drawer de la appbar, los breadcrumbs y la barra de busqueda.

Para la barra de busqueda en particular, estuve un tiempo tratando de desarrollar la lógica, pero obtuve resultados satisfactorios. Lo mismo sucedió con el componente para agregar a favoritos un personaje.

Las tecnologías implementadas en este proyecto fueron React, React-Router, Axios, Joi y brcypt.js entre otros, utilizando también la librería de componentes de Material UI y una cantidad significativa de VanillaJS, JSX y CSS. Elegí usar el boilerplate create-react-app para minimizar la configuración inicial del proyecto.
<p align="right"><a href="#top">Volver arriba</a></p>

## Roadmap
Las siguientes son implementaciones a futuro para mejorar tanto la experiencia de usuario como la seguridad y el testeo

- [ ] Guardar información de las API en cache
- [ ] Añadir notificaciones del estilo snackbar, por ej. cuando un usuario agregar un favorito
- [ ] Añadir imágenes de personajes, planetas y películas
- [ ] Añadir página para el registro de usuario (el backend ya se encuentra armado)
- [ ] Mejorar la estética general de la página 
- [ ] Permitir al usuario subir una foto de perfil
- [ ] Añadir secciones adicionales como vehículos y especies
- [ ] Soporte para diferentes idiomas

## Carpetas del proyecto
#### `client` - Contiene apliación del client
- #### `public` - Contiene los archivos estáticos de la app
- #### `cypress` - Esta carpeta contiene los archivos relacionados a Cypress
    - #### `fixtures` - Esta carpeta contiene los archivos de mock para probar en los tests
    - #### `integration` - Esta carpeta contiene los tests de integración de Cypress
    - #### `plugins` - Esta carpeta que contiene todos los diferentes plugins de Cypress
    - #### `support` - Esta carpeta que contiene un archivo para definir comandos propios dentro de Cypress, y otro para definir la configuración global de Cypress.
- #### `src`
    - #### `helpers` - Esta carpeta solo contiene el archivo de ruteo de páginas
    - #### `testing` - Esta carpeta contiene los tests de cypress
    - #### `components` - Contiene todos los diferentes componentes que utiliza la app
    - #### `pages` - Contiene las paginas que se acceden en el navegador.
    - #### `App.js` - Este archivo renderiza todas las rutas y las diferentes páginas de nuestra app
    - #### `index.js` - Este archivo renderiza la aplicación de React renderizando App.js
- #### `package.json` - Define los comandos npm y los paquetes npm del client
- #### `cypress.json` - Define la configuración de archivos de cypress
#### `server` - Contiene aplicación del server
- #### `auth` - Esta carpeta contiene los endpoints asociados al login y registro de usuarios
- #### `models` - Contiene el modelo de usuario
- #### `routes` - Contiene todas las rutas asociadas a los endpoints para obtener información
- #### `server.js` - Define la configuración del server, base de datos y rutas de acceso a la API
#### `package.json` - Define los comandos npm y los paquetes npm del server
#### `.gitignore` - Informa a Git que archivos ignoran
#### `README` - Este archivo mismo
<p align="right"><a href="#top">Volver arriba</a></p>

## Contribuciones

Las contribuciones son lo que hacen que la comunidad open source sea un lugar increíble para aprender, inspirar, crear y desarrollar. Cualquier contribución que hagas será ** muy apreciada **.

Si tienes una sugerencia para mejorar este proyecto, haz un fork del repositorio y crea un pull request. También puedes simplemente abrir un issue con la etiqueta "mejora" o "enhancement". 
No te olvides darle una estrella al proyecto! Gracias!

1. Haz un fork del proyecto
2. Crea una branch de Feature (`git checkout -b feature/AmazingFeature`)
3. Haz un commit con los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push del branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## Contacto

Felipe Bertocchi - fabertocchi@gmail.com
<p align="right"><a href="#top">Volver arriba</a></p>
