# Artisan Market

![logo](assets/logo.png)

**Artisan Market Mobile App** es un proyecto desarrollado con React Native y Expo, diseñado para impulsar una tienda en línea especializada en la venta de productos artesanales. Este repositorio alberga el código fuente del front-end mobile de la aplicación, proporcionando las capacidades esenciales para gestionar productos, usuarios, órdenes y más en la plataforma, con un diseño increíble basado en un diseño realizado por nosotros mismos en Figma.

## Funcionalidades Clave

- **Gestión de Productos**: Administra una amplia variedad de productos artesanales, incluyendo detalles como nombre, descripción, precio y cantidad en stock.

- **Control de Usuarios**: Permite a los vendedores y administradores registrarse, autenticarse y gestionar sus cuentas.

- **Órdenes y Compras**: Facilita la creación, seguimiento y finalización de órdenes de compra, incluyendo estados como "pagado", "pendiente" y "cancelado".

- **Revisiones y Calificaciones**: Los clientes pueden dejar revisiones y calificaciones para los productos, proporcionando retroalimentación valiosa.

- **Estadísticas de Venta**: Ofrece estadísticas detalladas sobre las ventas, incluyendo el número de órdenes pagadas, pendientes, canceladas y más.

## Configuración del Proyecto 🚧

**Clona este repositorio:**

```bash
git clone https://github.com/chicho69-cesar/artisan-market-mobile.git
```

**Navega al directorio del proyecto:**

```bash
cd artisan-market-mobile
```

**Instala las dependencias:**

```bash
npm install
ó
yarn
```

## Iniciar la Aplicación 🚀

```bash
npm run start
ó
yarn start
ó
expo start
```

Escanea el código QR generado con la aplicación Expo Go en tu dispositivo móvil o utiliza un emulador para ver la aplicación.

## Crear la configuración del tema 💅

Para crear la configuración del tema de la aplicación, lo que debes hacer es lo siguiente:

1. Copiar el contenido del archivo `config/gluestack-ui.config.ts`
2. Guardar el contenido de ese archivo para utilizarlo después.
3. Ejecuta el siguiente comando para generar la configuración de GlueStack de forma local:

```bash
npx gluestack-ui-scripts eject-theme
```

## Scripts Disponibles 📜

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run android`: Compila y ejecuta la aplicación en un emulador o dispositivo Android.
- `npm run ios`: Compila y ejecuta la aplicación en un emulador o dispositivo iOS.
- `npm run test`: Ejecuta las pruebas.
