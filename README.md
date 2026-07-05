# Gastos — Prototipo funcional

Prototipo navegable de la aplicación de control de gastos: login, dashboard, carga de gastos y gestión de usuarios. Todos los datos son de ejemplo (mock) — todavía no está conectado a una base de datos real.

## Requisitos

- Node.js 18 o superior instalado (https://nodejs.org)

## Cómo correrlo

1. Descomprimí este archivo.
2. Abrí una terminal en la carpeta `gastos-app`.
3. Instalá las dependencias:

   ```
   npm install
   ```

4. Iniciá la app:

   ```
   npm run dev
   ```

5. Se va a abrir automáticamente en el navegador en `http://localhost:5173`. Si no se abre solo, entrá a esa dirección manualmente.

## Acceso de prueba

- **Usuario:** admin
- **Contraseña:** admin123

## Qué podés probar

- **Dashboard**: totales del período, gasto por categoría, presupuesto de publicidad, comisiones por líder, pólizas de seguro, costo por vehículo, últimos movimientos.
- **Cargar gasto**: subí (o simulá subir) una factura/ticket, mirá cómo se autocompletan los datos (simulación de OCR) y completá el resto antes de guardar. La lista de gastos del período se actualiza al instante.
- **Usuarios**: alta de usuarios, perfiles (Administrador / Operativo), historial de acciones. Usá el selector "Ver como Admin / Operativo" en la barra superior para ver cómo cambian los permisos.

## Notas

- Todo lo que ves es un prototipo de interfaz: los datos no se guardan en un servidor ni en una base de datos real, viven solo en la memoria del navegador mientras la página esté abierta.
- El siguiente paso natural es conectar estas pantallas a un backend real (API + base de datos), como se describe en la propuesta técnica.
