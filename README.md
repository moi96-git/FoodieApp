# Hoja

Registro sencillo de comidas, calorías y macronutrientes. Funciona en el navegador, sin cuentas y sin servidor: los datos se guardan solo en el dispositivo de cada persona.

## Publicar con GitHub Pages

1. Sube todo el contenido de esta carpeta a la raíz de un repositorio (por ejemplo `hoja`).
2. En el repositorio: **Settings → Pages → Build and deployment**, elige *Deploy from a branch*, rama `main` y carpeta `/ (root)`.
3. En un par de minutos la app estará en `https://TU-USUARIO.github.io/hoja/`.

## Instalar en el iPhone

1. Abre la dirección en **Safari**.
2. Toca **Compartir → Añadir a pantalla de inicio**. Aparecerá el icono de la hoja verde.
3. Abre Hoja desde ese icono. Así funciona a pantalla completa y sin conexión.

## Copias de seguridad

Los datos viven en el almacenamiento del navegador de cada teléfono. En **Ajustes → Copias de seguridad** puedes guardar un archivo `.json` (en Archivos, iCloud o el correo) y recuperarlo en el mismo teléfono o en otro. La app te recuerda guardar una copia cada cierto número de días.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa, con la base de 1.077 alimentos incluida |
| `manifest.webmanifest` | Nombre e iconos al instalarla |
| `sw.js` | Permite usarla sin conexión |
| `icons/` | Icono de la hoja verde (iPhone y Android) |
| `vendor/zxing.min.js` | Lector de códigos de barras para iPhone (ZXing, licencia Apache 2.0) |

## Fuentes de datos

- **USDA National Nutrient Database for Standard Reference, SR28** (dominio público): 1.059 alimentos con valores por 100 g en crudo, traducidos al español. Los carbohidratos se muestran sin fibra, como en las etiquetas europeas.
- **Valores típicos de etiqueta en España** (aproximados): 18 productos como jamón serrano, queso manchego o bebida de avena.
- **[Open Food Facts](https://world.openfoodfacts.org)** (licencia ODbL): productos envasados por código de barras o búsqueda. Cada producto que añades queda guardado en *Mis alimentos* y luego funciona sin conexión.

## Actualizar la app

Sustituye los archivos en el repositorio. Los datos de las personas no se tocan, porque están en sus teléfonos y no en el repositorio.
