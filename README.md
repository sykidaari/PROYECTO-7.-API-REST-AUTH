# Introducción

Esta base de datos sería para un servicio de streaming como por ejemplo Netflix. En un futuro me gustaría seguir trabajando en ella para aprender, y añadir elementos como ratings, comentarios, etc.

- En el repositorio de GitHub, en la raiz del proyecto, hay un archivo .yaml que contiene todas las peticiones de la aplicación. Pueden importarla en Insomnia/Postman y así probar las peticiones más rápidamente.

- La base de datos consta de 3 modelos y sus respectivas colecciones: Media (películas y series), Member (miembros de la producción de las medias (actores, directores, productores y escritores)) y User (usuarios y administradores).

- Se incluyen semillas para las medias y los miembros, los scripts están en el package.json.

# Documentación externa utilizada:

- https://github.com/expressjs/express/discussions/4977

- https://www.mongodb.com/docs/manual/reference/method/Date/

- https://mongoosejs.com/docs/validation.html

- https://mongoosejs.com/docs/tutorials/query_casting.html

# CREDENCIALES INICIALES

Aquí están los datos de los perfiles ya existentes en la base de datos. El primero, el administrador, es necesario, ya que sin recoger su token, no se podrá crear un administrador nuevo.

## Administrador principal: masterAdmin

```
username: masterAdmin
email_address: masteradmin@mail.com
password: masterAdmin123
role: admin
```

## Primer usuario: firstUser

```
username: firstUser
email_address: firstUser@mail.com
password: firstUser123
role: user
```

# ENDPOINTS

- Todos los endpoints exceptuando el _/register_ y el _/login_ (que pertenecen a users) requieren autorización, ya sea a nivel de usuario o a nivel de administrador. Decidí hacerlo así para imitar la estructura de Netflix, donde no puedes ver ningún contenido sin primero iniciar sesión.

- Los endpoints que contienen el middleware [isAuth] son accesibles tanto para usuarios como para administradores, en cambio, los que contienen el middleware [isAdmin] son accesibles únicamente para administradores.

## Medias

- Tanto en el POST como el PUT (que se explicarán más adelante) se pueden insertar members en las medias (ver mediasSchema), y al insertarlos se debe incluir tanto el miembro en sí (member.person) con su id, y el rol que cumple en dicha media (media.role). Esta estructura está para que un mismo member pueda tener varios distintos roles.

### GET

**ENDPOINT** mediasRouter.get('/', [isAuth], getMedias)

**USO** Recoge todas las medias de la base de datos

**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/
<br>
<br>

**ENDPOINT** mediasRouter.get('/member/:id', [isAuth], getMediasbyMember)

**USO** Recoge todas las medias que incluyan al miembro (member) cuyo ID (\_id de Mongo) se indica en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/ID-DEL-MEMBER
<br>
<br>

**ENDPOINT** mediasRouter.get('/:id', [isAuth], getMediaByID)

**USO** Recoge la media con el ID (\_id de Mongo) indicado en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/ID-DE-LA-MEDIA

#### Queries

Los dos primeros GETs (getMedias y getMediasbyMember) aceptan req.queries:

- _type=series_ y _type=movies_ : **type** nos permitirá filtrar las medias según su tipo.

- _order=asc_ y _order=desc_ : **order** nos permitirá ordenar las medias según su fecha de lanzamiento (release_date en mediaSchema). Si no se incluye este req.query en la petición, desc será usado por defecto.

**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/?order=asc&type=series

### POST

**ENDPOINT** mediasRouter.post('/', [isAdmin], postMedia);

**USO** Crea una nueva media insertando en el cuerpo de la petición (req.body) un objeto en formato .json según mediaSchema

- Si el media.type es "movie", será necesario indicar la duración de la película (length_minutes en mediaSchema).
- Si el media.type es "series", será necesario indicar la cantidad de temporadas que contiene la serie (seasons en mediaSchema)

**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/

**EJEMPLO DE req.body**

```
{
"title":"Breaking Bad",
"release_date":"2008-01-20",
"type":"series",
"seasons":5
}
```

### PUT

**ENDPOINT** mediasRouter.put('/:id', [isAdmin], putMedia);

**USO** Recoge la media con el ID (\_id de Mongo) indicado en la URL, y actualiza dicha media insertando en el cuerpo de la petición (req.body) un objeto en formato .json con los datos a actualizar

- Al insertar members durante el PUT, el controlador no permitirá insertar una combinación de member.person + member.role que ya exista en la media, tuve que añadir esta funcionalidad para evitar duplicados, porque aunque haya ya un member con el mismo id en su person, al crear un nuevo member, este tendrá un id distinto al member anterior, y por lo tanto se podrían duplicar. Así que evito los duplicados manualmente. Lo bueno es, que sí pueden haber varios members con el mismo member.person, si su member.role es distinto, es decir, una misma persona puede ser por ejemplo tanto actor como director.

  - NO ES POSIBLE:

```
"members": [{
"person": {"_id"":"A"},
"role": "actor" },
{
"person": {"_id"":"A"},
"role": "actor" }]
```

- SÍ ES POSIBLE:

```
"members": [{
"person": {"_id"":"A"},
"role": "actor" },
{
"person": {"_id"":"A"},
"role": "director" }]
```

**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/ID-DE-LA-MEDIA

**EJEMPLO DE req.body**

```
{"title":"BREAKING BAD",
"members":
[{"person":"ID-DEL-MEMBER",
"role":"actor"}]}
```

### DELETE

**ENDPOINT** mediasRouter.delete('/:id', [isAdmin], deleteMedia);
**USO** Recoge la media con el ID (\_id de Mongo) indicado en la URL, y lo elimina
**EJEMPLO DE URL** http://localhost:3000/api/v1/medias/ID-DE-LA-MEDIA

## Members

### GET

**ENDPOINT** membersRouter.get('/', [isAdmin], getMembers)

**USO** Recoge todos los members de la base de datos

**EJEMPLO DE URL** http://localhost:3000/api/v1/members/
<br>
<br>

**ENDPOINT** membersRouter.get('/:id', [isAuth], getMemberByID)

**USO** Recoge el member con el ID (\_id de Mongo) indicado en la URL

**EJEMPLO DE URL** http://localhost:3000/api/v1/members/ID-DEL-MEMBER

### POST

**ENDPOINT** membersRouter.post('/', [isAdmin], postMember)

**USO** Crea un nuevo member insertando en el cuerpo de la petición (req.body) un objeto en formato .json según memberSchema

**EJEMPLO DE URL** http://localhost:3000/api/v1/members/

**EJEMPLO DE req.body**

```
{"name": "Matt Damon",
"nationality": "American",
"bio": "Actor known for The Martian, Good Will Hunting, and the Bourne series"}
```

### PUT

**ENDPOINT** membersRouter.put('/:id', [isAdmin], putMember)

**USO** Recoge el member con el ID (\_id de Mongo) indicado en la URL, y actualiza dicho member insertando en el cuerpo de la petición (req.body) un objeto en formato .json con los datos a actualizar

**EJEMPLO DE URL** http://localhost:3000/api/v1/members/ID-DEL-MEMBER

### DELETE

**ENDPOINT** membersRouter.delete('/:id', [isAdmin], deleteMember)

**USO** Recoge el member con el ID (\_id de Mongo) indicado en la URL, y lo elimina

**EJEMPLO DE URL** http://localhost:3000/api/v1/members/ID-DEL-MEMBER

## Users

### GET

**ENDPOINT** usersRouter.get('/', [isAdmin], getUsers)

**USO** Recoge todos los users de la base de datos

**EJEMPLO DE URL** http://localhost:3000/api/v1/users/

### POST

#### Register

**ENDPOINT** usersRouter.post('/register', registerUser)

**USO** Crea un nuevo user insertando en el cuerpo de la petición (req.body) un objeto en formato .json según memberSchema

- El user.role solo podrá ser "user", no se podrán crear users con role:"admin".
- Tanto el nombre de usuario (username en userSchema) como el email (email_address en userSchema) tendrán que ser únicos.

**EJEMPLO DE URL** http://localhost:3000/api/v1/users/register

**EJEMPLO DE req.body**

```
{"username":"testuser",
"email_address":"testuser@mail.com",
"password":"testuser123",
"role":"user"
}
```

#### Login

**ENDPOINT** usersRouter.post('/login', loginUser)

**USO** Inicia sesión con un user ya existente

- Se podrá iniciar sesión indicando el nombre de usuario (username en userSchema) o el email (email_address en userSchema), junto a la contraseña (password en userSchema). Las apps modernas suelen permitir iniciar sesión con cualquiera de las dos opciones, por lo que quise añadir dicha funcionalidad.
- El inicio de sesión devolverá un token de usuario (role:"user") o de administrador (role:"admin").

**EJEMPLO DE req.body**

```
{ "email_address":"testuser@mail.com",
"password":"testuser123"
}
```

### PUT

**ENDPOINT** usersRouter.put('/:id', [isAuth], putUser)

**USO** Recoge el user con el ID (\_id de Mongo) indicado en la URL, y actualiza dicho user insertando en el cuerpo de la petición (req.body) un objeto en formato .json con los datos a actualizar

**EJEMPLO DE URL** http://localhost:3000/api/v1/users/ID-DEL-USER

- Los users con role:"admin" podrán, con su token, cambiar el rol de otros users, haciéndolos admins. Si un user con role:"user" intenta hacer esto, el controlador ignorará el cambio.

**EJEMPLO DE req.body**

```
{"role":"admin",
"favorite_media":["ID-DE-LA-MEDIA"]}
```

### DELETE

**ENDPOINT** usersRouter.delete('/:id', [isAuth], deleteUser)

**USO** Recoge el user con el ID (\_id de Mongo) indicado en la URL, y lo elimina

**EJEMPLO DE URL** http://localhost:3000/api/v1/users/ID-DEL-USER
