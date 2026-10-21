# Hoja: historial de versiones

## Versión 1.1

Estado de la app antes de los cambios de la 1.2 (reconstruido a partir del código de esa versión).

### Registro diario (pestaña Hoy)
- Navegación por días, con acceso rápido a "Hoy".
- Calorías del día con una hoja que se llena según el progreso, y barras de proteína, carbohidratos y grasas frente al objetivo, con semáforo (en rango, cerca, fuera de rango).
- Comidas del día configurables (por defecto Desayuno, Almuerzo y Comida). Cada una muestra sus alimentos y el total de calorías, y permite guardarla como comida, copiar la de ayer, registrar macros directos o vaciarla.
- Agua con botones rápidos (+250, +500, −250) y entrada manual.
- Peso diario, con la diferencia frente al último registro.
- Ejercicio: las calorías gastadas se suman al objetivo del día y se reparten entre carbohidratos y grasas según un porcentaje configurable.
- Aviso para guardar una copia de seguridad cada cierto número de días.

### Alimentos
- Base incluida de 1.077 alimentos (USDA SR28 traducido y valores típicos de etiqueta en España).
- Buscador, alimentos frecuentes y botón rápido para repetir la última cantidad.
- Cantidad en × 100 g, gramos o unidades (por ejemplo "1 cda").
- Escáner de códigos de barras y búsqueda en Open Food Facts; los productos añadidos quedan guardados.
- Crear y editar alimentos propios (valores por 100 g y unidades opcionales).
- Macros directos, sin elegir alimento.
- "Mis comidas": combinaciones de alimentos guardadas para añadirlas con un toque.

### Resumen
- **Día:** cumplimiento por nutriente, reparto de calorías (real y objetivo), calorías por comida, agua y peso.
- **Semana:** media diaria y objetivo medio, días en rango, gráfico de calorías por día, semáforo semanal, promedios de macros, agua media y peso.
- **Historial:** últimas 12 semanas, con gráfico de medias, evolución del peso y tabla de semanas.

### Ajustes
- Objetivo diario de calorías y macros, en gramos o en porcentaje.
- Porcentaje de las calorías de ejercicio que va a carbohidratos y a grasas.
- Objetivo de agua.
- Editar, reordenar, añadir y eliminar las comidas del día.
- Copia de seguridad: guardar y recuperar un archivo `.json`, con recordatorio configurable.
- Borrar todos los datos.

### Técnico
- PWA de un solo archivo (`index.html`), con datos en el almacenamiento del navegador (clave `hoja.v1`).
- Formato de datos y de copia de seguridad: versión 1.
- Service worker con red primero para navegar y copia guardada si falla la red.

---

## Versión 1.2

### Novedades
- **Día de ayuno:** nueva tarjeta en Hoy para marcar el día como "Día de ayuno". Cuenta como día registrado con 0 kcal y 0 g, e incide en las medias semanales y mensuales. Si se añade un alimento, deja de ser día de ayuno. No cuenta como día "en rango" y se muestra con una "A" en el semáforo semanal.
- **Vista Mes:** nueva pestaña en Resumen, con navegación por meses, gráfico de calorías por día, promedios de macros y peso.
- **Calorías requeridas frente a consumidas:** en Semana y Mes se muestra la media de calorías que debías consumir (objetivo base más ejercicio) frente a la media realmente consumida, además de los días en rango y los días de ayuno.
- **Indicador de progreso:** "Esta semana progresaste X kilogramos hacia tu objetivo". Se calcula como (calorías requeridas − calorías consumidas) / 9.000, sobre los días registrados. La tasa metabólica basal es el objetivo diario de calorías antes del ejercicio. Si el resultado es negativo, indica que te alejaste del objetivo. Disponible en Semana y Mes.
- **Comidas en casa:** casilla "En casa" en cada comida con alimentos. El resumen de Día, Semana y Mes indica cuántas comidas fueron en casa y cuántas fuera, en número y en porcentaje. Las comidas sin la casilla marcada cuentan como "fuera". "Copiar de ayer" también copia la casilla.
- **Macros por comida:** en Hoy, cada comida muestra el total de proteína, carbohidratos y grasas, no solo las calorías.

### Correcciones y mejoras
- **Objetivo diario:** al cambiar los macros en gramos, las calorías objetivo se recalculan automáticamente (4 kcal por g de proteína y de carbohidratos, 9 por g de grasa). En modo porcentaje las calorías se mantienen.
- **Crear alimento:** nuevo campo "Los valores de abajo son para (gramos)". Los macros se convierten y se guardan siempre por 100 g. Antes se guardaban como si fueran por 100 g aunque se hubieran escrito para otra cantidad. Si no se indican unidades, se crea "1 porción" con esos gramos.
- **Uso sin conexión en iPhone:** `sw.js` se reescribió para evitar la pantalla en blanco sin internet:
  - guarda siempre una copia limpia de la página (Safari rechaza las que vienen de una redirección);
  - espera como máximo 3,5 s a la red antes de usar la copia guardada;
  - instala los archivos uno a uno, de modo que uno fallido no impide instalar el resto;
  - ofrece varias copias de respaldo de la página.
- **Copias de seguridad:** el formato de datos pasa a la versión 2. Las copias de la versión 1 se siguen recuperando sin problema, porque los campos nuevos (`fasting`, `home`) son opcionales y la migración rellena lo que falte. La clave de almacenamiento (`hoja.v1`) no cambia, para no perder datos.
- La pantalla de Ajustes muestra el número de versión.

### Para tener en cuenta
- Los alimentos creados antes de la 1.2 con el error de los 100 g siguen guardados con esos valores; hay que editarlos y volver a escribirlos con el campo de gramos.
- Tras publicar la 1.2, hay que abrir la app una vez con internet para que se instale el nuevo service worker.
