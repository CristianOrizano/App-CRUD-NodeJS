# Desarrollo NODE JS
- https://www.prisma.io/docs/getting-started/quickstart 
- Abrir Carpeta de proyecto en VS Code

## Iniciar Proyecto
Ambos comandos son esenciales al comenzar un nuevo proyecto Node.js con npm. npm init -y te proporciona una forma rápida de empezar sin configuraciones detalladas, mientras que npm init te ofrece flexibilidad para personalizar completamente la configuración inicial del proyecto según tus requisitos específicos

- Iniciar el proyecto:  npm init -y || npm init

## Comandos
Estos comandos configuran un proyecto Node.js para usar TypeScript, permitiendo escribir y ejecutar código TypeScript de manera eficiente durante el desarrollo.
ts-node: Instala ts-node, una herramienta que permite ejecutar código TypeScript directamente en Node.js sin necesidad de compilarlo a JavaScript primero.
- npm install typescript ts-node @types/node --save-dev
>packetes para el proyecto 
- npm install jsonwebtoken

- npm install express

- npm install bcrypt

- npm install dotenv
## Configuracion TS

>Inicializa TypeScript:
- npx tsc --init
> Un archivo tsconfig.json típico puede verse así: Es utilizado por el compilador de TypeScript (tsc) para definir cómo se debe compilar el código TypeScript a JavaScript.

{
  "compilerOptions": {
    "target": "ES6",                // Versión de JavaScript de salida
    "module": "commonjs",           // Sistema de módulos a utilizar
    "outDir": "./dist",             // Directorio de salida para los archivos compilados
    "rootDir": "./src",             // Directorio raíz de los archivos de entrada
    "strict": true,                 // Habilita todas las verificaciones de tipo estrictas
    "esModuleInterop": true         // Habilita la interoperabilidad con módulos ES
  },
  "include": ["src/**/*"]           // Archivos incluidos en la compilación
}

 outDir : Define el directorio de salida para los archivos JavaScript compilados.
 >Ejemplo: Si tienes un archivo TypeScript src/app.ts y defines "outDir": "./dist", después de compilar, tsc generará dist/app.js en lugar de sobrescribir el archivo fuente src/app.ts.
 
 rootDir : El directorio raíz donde se encuentran los archivos TypeScript que se van a compilar.
 >Ejemplo: Si defines "rootDir": "./src", tsc buscará archivos TypeScript dentro de src/ y sus subdirectorios según lo especificado en "include" (en este caso, "src/**/*").

en producción es recomendable compilar tu código TypeScript a JavaScript utilizando el compilador tsc en lugar de depender de ts-node-dev.
## TS-NODE 
> ¿Qué es ts-node-dev?

ts-node-dev es una herramienta que combina ts-node con nodemon. Proporciona una forma conveniente de ejecutar tu código TypeScript en Node.js con recarga automática, es decir, reinicia automáticamente el servidor cada vez que detecta cambios en el código.
- npm install ts-node-dev -D

Cuando se traja en JavaScript para poder ejecutar en el servidor se usaba node o nodemom, pero al trabajar ahora en TypeScript se compila con: npx tsc y luego ejecuta:  node dist/serve.js. 
Una mejor opcion a eso seria usar:

Usar ts-node para ejecutar directamente el archivo TypeScript
- npx ts-node src/serve.ts

 Para un desarrollo más eficiente, puedes usar ts-node-dev, que reinicia automáticamente el servidor cuando detecta cambios en tu código.
 Agregar un script de desarrollo en package.json:
 
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/serve.ts"
    }
}

- npm run dev
##  @types/ 
>¿Por qué instalar @types/?

Cuando instalas una biblioteca de JavaScript en un proyecto TypeScript, el compilador TypeScript necesita saber los tipos de las funciones, métodos y objetos que esa biblioteca proporciona. Esto es necesario para que pueda realizar verificaciones de tipos y proporcionar autocompletado en tu editor de código.

- npm install @types/express -D

- npm install @types/jsonwebtoken -D

- npm install @types/bcrypt -D

##  Prisma
- npx prisma studio
 >Descargar en desarrollo

- npm i prisma -D
> Configure Prisma ORM con el initcomando de la CLI de Prisma:

- npx prisma init --datasource-provider mysql

 Una vez que hayas verificado el schema.prisma, genera el cliente Prisma.
Este cliente se genera automáticamente cuando ejecutas las migraciones, pero puedes generarlo manualmente con:

- npx prisma generate

 En base ha tu BD Genera los schemas

- npx prisma db pull

Express validator
 
- npm i express-validator -D
