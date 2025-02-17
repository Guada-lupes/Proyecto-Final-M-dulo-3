__Ejecutar el proyecto desde el archivo INDEX.HTML

El ProdMod3 está estructurado de la siguiente forma:

Archivos HTML **index.html: alojado en la carpeta principal, contiene el formulario de inicio de sesión. **register.html: alojado en la carpeta "public" contiene el formulario de registro. **welcome.html: alojado en la carpeta "public" contiene la tienda de productos.

Archivos Javascript correspondientes a cada archivo html. Se encuentran alojados en la carpeta "src" **register.js **index.js **welcome.js

Archivos para el estilado alojados en la carpeta "src" **resets.js: establece unos estilos básicos. **style.css: importa el archivo resets.js y contiene el estilado de todos los archivos html.

Diseño Responsive El proyecto se ha diseñado siguiendo la metodología Mobile First y estableciendo @media (min-width: 480px) y @media (min-width: 768px).

API´s Para el "inicio de sesión" y el "registro de usuario" se ha utilizado la API "https://reqres.in". **REGISTRO EXITOSO { "email": "eve.holt@reqres.in", "password": "pistol" } **LOGIN EXITOSO { "email": "eve.holt@reqres.in", "password": "cityslicka" }

Para la "tienda de productos" se ha utilizado la API "https://fakestoreapi.com".
