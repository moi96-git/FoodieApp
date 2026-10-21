# Hoja: historial de versiones

## Versión 1.3

### Hoy
- **Ayuno y peso al final:** las tarjetas "Peso" y "Día de ayuno" pasan al final de la página, debajo de las comidas.
- **Agua más compacta:** una sola fila con la cantidad, los botones +250, +500 y ml, y una barra delgada. Se quita el botón −250; para corregir se usa "ml".
- **Calendario:** el día y la fecha de la parte de arriba son ahora un botón que abre un selector de fecha. Permite ir a cualquier día, también uno futuro, y tiene un botón "Hoy".
- **Hora en cada alimento:** campo de hora opcional al añadir o editar (y en macros directos). Se rellena con la hora actual si estás en el día de hoy. En días futuros, o con una hora posterior a la actual, la comida aparece como "previsto". Así se pueden planear comidas.
- **Tendencia de peso:** la tarjeta de peso muestra "Tendencia: −0,4 kg/semana".

### Progreso y mantenimiento (TDEE)
- **Perfil y mantenimiento (Ajustes):** sexo, estatura, edad y nivel de actividad. El peso es el último registrado en Hoy; solo se pide a mano si aún no hay ninguno.
- **Fórmula:** TMB de Mifflin-St Jeor (hombre: 10 × peso + 6,25 × estatura − 5 × edad + 5; mujer: … − 161), multiplicada por el nivel de actividad. El nivel se elige con una barra de 1,1 a 1,6, con descripción: 1,2 sedentario, 1,3–1,4 ligeramente activo, 1,5 trabajo físicamente exigente.
- **Indicador de progreso corregido:** ahora se mide contra el mantenimiento (TDEE) más el ejercicio de cada día, no contra el objetivo. Si el objetivo ya es un déficit, comer justo el objetivo muestra progreso. El peso de cada día es el último registrado hasta esa fecha.
- **7.700 kcal por kg** en lugar de 9.000, porque el tejido que se pierde no es grasa pura.
- Si falta el perfil, el indicador pide completarlo (con un botón que lleva a Ajustes).
- Los días futuros no cuentan en las medias ni en el progreso.

### Resumen (Día, Semana y Mes)
- **Tendencia de peso:** línea de media móvil de 7 días sobre las lecturas, y tendencia en kg por semana (últimas 4 semanas).
- **De dónde vienen tus calorías:** "Esta semana, el 32 % de tus calorías vino de pan, queso y aceite de oliva". Incluye el reparto por categorías de alimento, la principal fuente de proteína, carbohidratos y grasa, y avisos (una categoría que concentra mucho, dulces y snacks, bebidas, carnes y embutidos).
- **Hábitos:** diferencia de calorías entre comidas fuera y dentro de casa, entre semana frente a fin de semana, y qué comida es la más grande en los días que te pasas del objetivo.
- **Horario de comidas:** ventana de alimentación (primera a última comida), ayuno nocturno y días con cena tardía (después de las 21:00). Sirve como seguimiento de ayuno intermitente sin temporizador.
- **Ultraprocesados:** porcentaje de las calorías con dato de procesamiento que viene de NOVA 4, con el reparto NOVA 1 a 4 y qué parte de tus calorías tiene ese dato.
- **Constancia:** "Registraste 26 de 30 días", sin medallas. Los días de ayuno cuentan como registrados.

### Alimentos
- **Nutri-Score y NOVA:** los productos de Open Food Facts traen ambos datos, que se muestran como etiquetas en las listas y en la hoja de cantidad, y se guardan al añadir el producto. Al crear o editar un alimento propio se pueden indicar a mano.
- **Seleccionar varios:** en el buscador, el botón "Seleccionar varios" permite marcar varios alimentos y añadirlos de una vez con su cantidad habitual (o 100 g). Se puede deshacer.
- **Copiar de otro día:** en el menú de cada comida, elige cualquier fecha y marca qué alimentos copiar, de cualquier comida. "Copiar de ayer" sigue disponible.

### Copias de seguridad y datos
- El formato pasa a la versión 3. Los campos nuevos (perfil, hora `t`, `nova`, `ns`) son opcionales, así que las copias de las versiones 1 y 2 se recuperan sin problema. La clave de almacenamiento no cambia.
- Ajustes termina con la nota "Utilizando Version 1.3 de la app".
- `sw.js`: nueva versión de caché para que la actualización se instale.

### Para tener en cuenta
- El progreso asume que tu objetivo es perder peso: un valor positivo es déficit frente al mantenimiento.
- Los datos de procesamiento solo existen en productos de Open Food Facts y en lo que indiques tú; los alimentos de la base incluida no lo tienen, por eso se muestra qué parte de tus calorías tiene dato.
- Las comidas antiguas no tienen hora, así que no entran en el horario.

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

---

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

