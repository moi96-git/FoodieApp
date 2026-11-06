# Hoja

Registro sencillo de comidas, calorías y macronutrientes. Funciona en el navegador, sin cuentas y sin servidor: los datos se guardan solo en el dispositivo de cada persona.

## Instalar en el iPhone

1. Abre la dirección en **Safari**.
2. Toca **Compartir → Añadir a pantalla de inicio**. Aparecerá el icono de la hoja verde.
3. Abre Hoja desde ese icono. Así funciona a pantalla completa y sin conexión.

## Copias de seguridad

Los datos viven en el almacenamiento del navegador de cada teléfono. En **Ajustes → Copias de seguridad** puedes guardar un archivo `.json` (en Archivos, iCloud o el correo) y recuperarlo en el mismo teléfono o en otro. La app te recuerda guardar una copia cada cierto número de días.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `data/alimentos.csv` | Base de 1.077 alimentos |
| `manifest.webmanifest` | Nombre e iconos al instalarla |
| `sw.js` | Permite usarla sin conexión |
| `icons/` | Icono de la hoja verde (iPhone y Android) |
| `vendor/zxing.min.js` | Lector de códigos de barras para iPhone (ZXing, licencia Apache 2.0) |

## Fuentes de datos

- **USDA National Nutrient Database for Standard Reference, SR28** (dominio público): 1.059 alimentos con valores por 100 g en crudo, traducidos al español. Los carbohidratos se muestran sin fibra, como en las etiquetas europeas.
- **Valores típicos de etiqueta en España** (aproximados): 18 productos como jamón serrano, queso manchego o bebida de avena.
- **[Open Food Facts](https://world.openfoodfacts.org)** (licencia ODbL): productos envasados por código de barras o búsqueda. Cada producto que añades queda guardado en *Mis alimentos* y luego funciona sin conexión.

## Editar la base de alimentos

Edita `data/alimentos.csv` y haz push. Quien tenga la app instalada recibe el cambio la siguiente vez que la abra con conexión, normalmente en unos minutos y sin publicar una versión nueva.

- Guarda el archivo en UTF-8 y no cambies el `id` de un alimento existente. Los alimentos nuevos necesitan un `id` que no exista.
- Los valores son por 100 g. Las unidades se escriben así: `1 huevo M:50|1 huevo L:58`.
- Un archivo con errores se ignora y la app sigue con la copia anterior. **Ajustes** muestra la fila y el motivo.
- Los registros pasados conservan sus valores.

Para probar en local usa `python3 -m http.server`: abrir `index.html` con doble clic no carga la base.

## Actualizar la app

Sustituye los archivos en el repositorio. Los datos de las personas no se tocan, porque están en sus teléfonos y no en el repositorio.
