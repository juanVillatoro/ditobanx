#Iniciar

##Paso 1: Instalar dependencias de ambos proyectos

Primero se debe entrar a la carpeta ./backend, con el siguiente comando:

```sh
cd .\backend\
```

Luego, proceda a instalar las dependencias:
```sh
# Usando npm
npm install

# O usando Yarn
yarn install
```


Ahora lo mismo con el frontend, entramos a la carpeta con el siguiente comando (Debes estar en raíz):

```sh
cd .\frontend\
```

E igual se procede a instalar las dependencias:
```sh
# Usando npm
npm install

# O usando Yarn
yarn install
```

##Paso 2: Ejecución
Primero, entramos nuevamente al proyecto backend con el comando anteriormente mencionado, y luego ejecutamos este comando:

```sh
# Usando npm
npm run dev

# O usando Yarn
yarn dev
```

Hacemos lo mismo con el frontend, entramos al proyecto y ejecutamos el comando:

```sh
# Usando npm
npm run dev

# O usando Yarn
yarn dev
```


##Paso 3: Seeder
Ahora vamos a ejecutar el seeder para crear la base de datos, tienes que tener la base creada anteriormente, e incluir las variables en un .env, ejemplo de las variables:

DB_NAME=postgre
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres

Ahora, con eso hecho, vamos a ejecutar el seeder de una vez con el comando:

```sh
# Usando npm
npm run seed

# O usando Yarn
yarn seed
```