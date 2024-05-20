# App cliente

Este proyecto pretende ser un blog con temática de Rick and Morty, cumpliendo con los requerimientos de la prueba técnica tanto a nivel tecnológico como con un poco de mi estilo.

### Teconologias empleadas:
* Vite.
* React.
* React Router Dom.
* Zustand.
* Shadcn.
* Tailwind Css.
* API de Rick and Morty.

# Set up

El proyecto corre en el puerto por defecto de Vite `localhost://5173`. Es importante respetar este detalle ya que la autorización de CORS del lado del servidor está aceptando esa ruta.

### Requisitos Previos
- Node.js
- npm

### Instalación
> Recomiendo primero iniciar el proyecto del servidor [gttBlogApi](https://github.com/AngelMagaquian/gttBlogApi).
1. Clonar el repositorio:
    ```sh
    git clone https://github.com/AngelMagaquian/gttBlogClient.git
    ```
2. Navegar al directorio del proyecto:
    ```sh
    cd gttBlogClient
    ```
3. Instalar las dependencias:
    ```sh
    npm install
    ```

### Ejecución
1. Ejecutar el comando para iniciar el servidor de desarrollo:
    ```sh
    npm run dev
    ```

## Usabilidad
1. Se debe crear una cuenta para poder ingresar. Dicha cuenta puede ser un email ficticio pero debe tener el formato de uno. Por ejemplo `rickSanchez@gmail.com`
2. Creación de contraseña segura. Debe tener al menos:
- 8 caracteres.
- 1 mayúscula.
- 1 minúscula.
- 1 número.
- 1 símbolo.
- Por ejemplo `Rick&MortyC137`
3. Iniciar sesión con el email registrado.

# Caracteristicas del proyecto

Mis objetivos personales con este proyecto fueron:

### Autenticación
- [x] Registro de usuarios.
- [x] Inicio de sesión de usuarios.
- [x] Finalización de sesión.
- [x] Validación de contraseña segura.
- [ ] Validación de email.

### Posteos
- [x] Crear un posteo.
- [x] Poder eliminar un posteo propio
- [x] Timeline a tiempo real
- [x] Dar y quitar "Me gusta"
- [x] Visualización de los "Me gusta" del usuario
- [ ] Posibilidad de comentar posteos y abrir hilos
- [ ] Paginación del timeline

### Usuarios
- [x] Perfil o "Feed"
- [x] Personalización de avatar acorde a la tematica
- [x] Personalización de biografía del perfil
- [ ] Cambio de contraseña
- [ ] Posibilidad de seguir o ser seguido por otros usuarios

### Aplicación
- [x] Control de páginas erroneas
- [x] Control de formularios
- [x] Modo claro, oscuro y preferencias del sistema
- [x] Diseño mobile first

