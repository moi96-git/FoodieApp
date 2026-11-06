# Hoja: historial de versiones

## Versión 1.8 · Base de alimentos latinoamericana e internacional

Objetivo: que la base sirva para lo que se come en Colombia, México y el resto de Latinoamérica, y para la comida rápida y las cocinas que se encuentran en cualquier ciudad. Cada alimento se encuentra por los nombres que usa cada país.

### Base de datos (`data/alimentos.csv`)
- **De 1.077 a 3.968 filas** (unos 2.200 alimentos distintos). Los 1.077 `id` anteriores se conservan con los mismos valores, así que los registros, las comidas guardadas y los frecuentes no cambian.
- **Otros nombres como filas propias:** cada nombre regional es una fila con los mismos valores (Papas fritas, Patatas fritas, Papas a la francesa; Frijoles, Fríjoles, Caraotas, Porotos; Banano, Cambur, Guineo…). Así quien busca "papas fritas" ve "Papas fritas" y no un nombre que no reconoce. Se quitaron los sinónimos que el buscador ya encontraba con otro nombre del mismo alimento (por ejemplo, "Frijol rojo cocido", que aparece al buscar "Frijoles rojos cocidos").
- **Alimentos cocinados:** arroz, pasta, granos, legumbres, verduras, papa, yuca, plátano, carnes, aves, pescados y huevos, con sus valores ya cocinados (hervido, a la plancha, frito, al horno…). Las carnes, aves y pescados frescos que ya estaban ahora dicen "(en crudo)" para no confundirlos.
- **Categorías nuevas:** Sopas y cremas; Comida rápida; Arepas, empanadas y fritos; Jugos y bebidas preparadas. Platos preparados pasa de 1 a casi 600 filas.
- **Colombia:** bandeja paisa, ajiaco, sancocho, frijoles, arepas, empanadas, buñuelos, pandebono, patacón, tamal, lechona, quesos, jugos en agua y en leche, aguapanela, dulces y postres.
- **México y otros países:** tacos, burritos, quesadillas, enchiladas, chilaquiles, pozole, tamales; ceviche, lomo saltado, pabellón, empanadas argentinas, feijoada, pupusas y más.
- **Comida rápida y cocinas del mundo:** hamburguesas, pizzas, perros calientes, nuggets, alitas; productos insignia de McDonald's, Burger King, KFC, Subway, Domino's, Taco Bell y Starbucks; sushi, ramen, comida china, tailandesa, india, árabe, italiana y española.
- **Porciones:** casi todos los platos tienen unidades (1 empanada, 1 hamburguesa, 1 porción de pizza, 1 plato, 1 vaso…).
- **Columna `origen`:** `est` para valores estimados a partir de una receta típica y `cadena` para información publicada por una cadena. Se mantienen `es` y el vacío (USDA).

### Cambios en la app
- La ficha de un alimento de la base indica su origen: tablas de referencia (USDA), etiqueta típica en España, receta típica o información de la cadena. Antes decía "en crudo" para todo lo que no venía de España, aunque fuera un plato.
- La categoría Jugos y bebidas preparadas se muestra en ml, como Bebidas.
- La pestaña Base de Alimentos describe las nuevas fuentes.

## Versión 1.7 · Base de alimentos en un archivo CSV

Objetivo: separar los alimentos del código. La base ya no es una línea de `index.html`, y cada cambio en los datos llega a quien tiene la app instalada, sin publicar una versión nueva.

### Base de datos
- **Archivo nuevo `data/alimentos.csv`:** los 1.077 alimentos, uno por fila y en UTF-8. Columnas: `id`, `nombre`, `categoria`, `kcal`, `proteina`, `carbohidratos`, `grasa`, `unidades`, `origen`.
- **Unidades:** van en una sola columna, con el formato `1 huevo M:50|1 huevo L:58`.
- **`index.html`** baja de 322 KB a 209 KB. La regla de líquidos y las categorías se calculan al cargar los datos, igual que antes.

### Cómo se actualiza
- La app abre al instante con la copia guardada en el teléfono y consulta el CSV en segundo plano, al abrir y al volver a la app tras 15 minutos o más.
- Si el archivo no cambió, el servidor responde sin volver a enviarlo. Si cambió y es válido, se guarda y el buscador y las listas se actualizan sin recargar.
- La actualización no interrumpe: con una hoja abierta o escribiendo, la pantalla no se repinta.
- Sin conexión se usa la última copia. La copia vive en su propia caché (`hoja-datos`), que sobrevive a las versiones nuevas de la app.
- **Editar el CSV no sube la versión de la app.**

### Validación
- Un archivo con errores se rechaza entero y se sigue con la copia buena: columnas que faltan, ids repetidos o vacíos, números fuera de rango, unidades mal escritas, comillas sin cerrar, codificación distinta de UTF-8, menos de 100 alimentos o una caída de más del 30 % respecto a la copia anterior.
- **Ajustes** muestra cuántos alimentos tiene la base y su fecha. Si la última actualización se rechazó, indica la fila y el motivo.
- Se aceptan los CSV de Excel y Google Sheets: separador `;` o `,`, decimal con punto o coma, BOM, saltos de línea de Windows, comillas, filas vacías y columnas extra.

### Datos del usuario
- Los alimentos propios, los registros, las comidas guardadas y las copias de seguridad no cambian de formato.
- Un alimento del usuario tiene prioridad sobre uno de la base con el mismo id, y ahora aparece una sola vez en el buscador.
- Corregir o quitar un alimento del CSV no altera los registros pasados, porque cada uno guarda su propia copia de los valores.
- Si la base no se puede descargar la primera vez, la app funciona con los datos del usuario, lo avisa y reintenta sola al volver la conexión.
- El editor de alimentos conserva la categoría de un alimento propio aunque ya no exista en la base.

## Versión 1.6 · Hábitos y mejoras de uso

Objetivo: que registrar y corregir cueste menos toques, que la pantalla de Hoy muestre solo lo que cada persona usa y que los días fuera de plan enseñen algo sin juzgar.

### A. Agua y ayuno, a elección
- **Quitar agua:** vuelve el botón −250. Orden: −250, +250, +500, ml. No baja de 0. A 375 px los botones pasan juntos a una segunda línea, sin cortarse, y la barra sigue siendo delgada.
- **Ajustes > Pantalla de Hoy:** casillas "Mostrar el registro de agua" (activada por defecto) y "Mostrar el botón de día de ayuno" (desactivada por defecto).
- Ocultarlos no borra nada. Un día ya marcado como ayuno siempre muestra su tarjeta, para poder quitarlo.

### B. Fecha del encabezado de Hoy
- `headerTitle(k)` decide el encabezado; `dayName` no cambia porque también lo usan el menú de comida y Resumen > Día.
- Hoy, Ayer y Mañana, y cualquier día de la semana en curso: nombre grande y fecha pequeña debajo.
- Fuera de la semana en curso: la fecha en grande ("16 oct", o "16 oct 2025" si es de otro año), sin línea pequeña. La altura del encabezado no cambia al navegar.

### C. Deslizar para eliminar
- En las filas de Hoy (alimentos y macros directos), deslizar a la izquierda revela "Eliminar". Pasado el 40 % del ancho, o al tocar el botón, se elimina.
- **Deshacer:** el toast "Eliminado" devuelve la entrada a su comida y posición, con su marca "En casa" y el cierre del día tal como estaban.
- **Gesto:** `swipeable()` amplía sus opciones (`item`, `part`, `reveal`, `skip`) y funciona por delegación sobre `.entries`. Una sola fila abierta a la vez; tocar fuera la cierra sin activar lo que se tocó; deslizar no abre la edición; `touch-action: pan-y` mantiene el scroll; respeta `prefers-reduced-motion`.
- **Bordes:** el gesto no empieza a menos de 20 px del borde izquierdo ni del derecho, donde están los gestos de atrás y adelante de Safari.
- **Sin gestos:** Supr o Retroceso sobre la fila enfocada. "Eliminar" sigue en la hoja de edición y ahora también permite deshacer.
- **Todas las vías de borrado** pasan por `deleteEntry()`, salvo "Vaciar" y los "Deshacer" de añadir, que usan el aviso de `cleanDay()`. Si un día estimado se queda sin alimentos, pasa a marcado y el toast lo avisa. Deshacer recupera la estimación.

### D. Líquidos en ml
- Los alimentos líquidos muestran su cantidad en ml, con equivalencia 1:1 y sin convertir densidades. Los macros siguen en gramos, y el líquido no suma a la meta de agua.
- **Datos:** campo opcional `liq` en alimentos. La cantidad sigue en `e.q`.
- **Historial:** cada entrada nueva con alimento copia `e.liq` (1 o 0), para que su unidad no cambie si luego se edita el alimento. Se guarda también el 0, porque con solo el 1 un sólido pasaría a ml al marcar el alimento como líquido. Las entradas antiguas, sin el campo, consultan el alimento.
- **Base:** regla `baseLiquid()`: categoría Bebidas; nombres que empiezan por Leche, Zumo, Jugo, Bebida de, Caldo, Aceite y Agua de coco; sin Dulce de leche, sin "en su jugo" y sin productos en polvo. Son 93 de 1.077: Bebidas 49, Aceites 14, Lácteos 10, Frutas 10, Caldos 4, Bebidas de soja 3, y Leche y agua de coco 3.
- **Open Food Facts:** `offLiquid()`: líquido si la cantidad viene en ml, cl, dl o l, o si es de categoría bebidas y no viene en g o kg ni es en polvo o instantánea.
- **Alimentos propios:** casilla "Es líquido" en el editor; sus textos cambian al marcarla. "Copiar a mis alimentos" la conserva.
- **Textos:** lista de comidas, hoja de cantidad, búsquedas y listas, ficha de la base, editor de alimentos, editor de comidas guardadas y hojas de copiar.

### E. Días fuera de plan
- Tarjeta nueva en Resumen > Mes y > Historial (últimas 12 semanas), y en Semana cuando ese periodo tiene algún día fuera de plan. También aparece si el periodo no tiene días que cuenten.
- Cuenta los días marcados o estimados, cerrados como "me faltó algo" o "fuera de plan", y con causa.
- En orden: volver al día siguiente, cuántos días (estimados y marcados), hasta 3 causas, fin de semana, y kcal extra promedio en días estimados.
- Con menos de 3 días: "Con unos días más de cierre verás patrones aquí."

### F. Hora al registrar
- `timeControl()` entra en la hoja de cantidad y en macros directos: hora nativa, −15, +15, "Ahora" y "Quitar hora".
- **Hora del toque:** si no se toca el control, se guarda la hora de pulsar "Añadir", no la de abrir la hoja.
- Corregido: una hora escrita a mano se perdía al cambiar la cantidad con las fichas o los botones.
- Solo se pone hora automática en el día de hoy; ni en días pasados ni en futuros.
- **Toast:** al añadir muestra la hora y "Cambiar hora", y ahora también "Deshacer". `toast()` acepta varias acciones. Vale para añadir desde la hoja, añadir rápido, varios alimentos, comidas guardadas y macros directos.

### Datos y publicación
- Sigue el formato v4. Campos nuevos, todos opcionales: `settings.homeWater`, `settings.homeFast`, `food.liq`, `e.liq` y `item.liq` en comidas guardadas. Las copias de la 1.5 se importan sin problema.
- `sw.js`: nueva versión de caché.

### Para tener en cuenta
- **Ayuno:** al actualizar, la tarjeta deja de verse en Hoy hasta activarla en Ajustes. Marcar ayuno al cerrar un día sigue disponible.
- **ml y g no son lo mismo:** la equivalencia 1:1 es deliberada. 100 ml de aceite pesan unos 92 g, pero la app los cuenta como 100 g, igual que antes.
- **Aceite de coco y aceite de palma** cuentan como líquidos por la regla, aunque suelen estar semisólidos a temperatura ambiente.
- **No son líquidos por la regla:** nata, kéfir, salsas, vinagres, siropes y miel siguen en g.
- **Productos de Open Food Facts ya guardados** no tienen `liq` y siguen en g; se puede marcar "Es líquido" al editarlos.
- **Copias de comida:** "Copiar de ayer" y "Copiar de otro día" conservan la hora original.
- **Falta probar en iPhone:** el gesto se probó con eventos simulados en Chrome, no con el dedo ni con el retroceso real de Safari.

---

## Versión 1.5 · Estimar y contrastar con la báscula

Objetivo: que lo más fácil al cerrar un día incompleto o fuera de plan sea estimar cuánto fue, en 2 o 3 toques y sin culpa, y que el impacto de los días que no cuentan sea explícito.

### Estimar
- **Paso 3 de la hoja de cierre:** "Estimar" es la primera opción, con la etiqueta "Recomendado". "Marcar y seguir" queda como secundaria y "Completar el registro" como terciaria.
- **Preguntas por causa** (una sección por cada causa elegida; el total es la suma):
  - Comí de más, Celebración u Otro: "Un poco", "Bastante" o "Mucho" (15 %, 35 % y 60 % de las calorías objetivo del día, redondeadas a 50).
  - Tomé alcohol: de 0 a 12 copas por las kcal de cada copa.
  - Comí fuera, Se me olvidó o Viaje: "¿Qué comidas faltan?". Cada comida usa su promedio de los últimos 14 días que cuentan (mínimo 3 muestras); si no hay datos, el objetivo dividido entre las comidas.
  - Comí muy poco: sin cifra; "Contar el día tal como está".
- **Total visible** ("≈ 700 kcal"), con − y + de 50 en 50, "Escribir otra cantidad" y un tope de 3.000 kcal.
- **Mensaje final:** "Listo. Ayer cuenta con unas 700 kcal estimadas. Mañana empieza en limpio." con "Planear mañana".
- **Reglas:** un día estimado cuenta en promedios, progreso y Constancia. Exige al menos un alimento: si se eliminan todos, pasa a marcado, se descarta la estimación y se avisa. Si se añaden alimentos después, nada se ajusta solo: aparece "Revisar estimación".
- **Pantallas:** Hoy muestra "incluye 700 kcal estimadas" y la fila "Ajuste estimado: +700 kcal" con "Cambiar". La tarjeta de cierre dice "Cerrado: fuera de plan · alcohol · +450 kcal estimadas" y permite cambiar entre estimar, marcar o completar. Días pendientes ofrece "Estimar" en cada día con alimentos.
- **Cobertura:** "Calculado con 23 de 30 días: 4 con estimación (+3.200 kcal), 3 sin contar."

### Calorías frente a báscula
- Tarjeta nueva en Mes y en Semana: "Por calorías: −0,5 kg. Por báscula: −0,2 kg."
- La báscula usa el peso suavizado al final del periodo menos el del inicio (la lectura más cercana previa, hasta 7 días antes). Solo aparece con al menos 2 lecturas separadas 5 días o más, y nunca cuando el progreso está en 0 por el límite de días grises.
- Si la báscula muestra 0,3 kg menos de progreso que las calorías en Mes (0,2 en Semana), lo dice sin alarma y menciona los días sin contar.

### Aviso de días sin cerrar más discreto
- `nagDays()`: el aviso solo cubre días abiertos hace 1 o 2 días, solo aparece al mirar hoy y es una línea compacta con "Cerrar" y "×".
- Se descarta deslizando hacia cualquier lado o con la "×", y no vuelve para ese día (`settings.closeHidden`). El gesto es el helper reutilizable `swipeable(el, opciones)`.
- Siempre se puede cerrar desde: el día gris (también tocándolo en el semáforo o en las barras), Constancia, la tarjeta de progreso en 0 y la nueva fila "Días sin cerrar: N · Ver" en Ajustes.
- **Promedios del mes:** texto discreto si hay días sin cerrar o marcados.
- **Rachas de 20 días o más:** sin ese texto; progreso con mensaje neutro y enlace discreto; "Empezar de nuevo hoy" en Días pendientes cierra los días vacíos como marcados; y una sola vez, "Qué bueno verte de nuevo. Hoy empieza en limpio."

### Hora para toda una comida
- `timeControl()` y `openTimeSheet()`: hora nativa, −15, +15, "Ahora" y "Quitar hora", reutilizables.
- "Cambiar hora de la comida" en el menú de cada comida y etiqueta tocable junto al total ("13:15" o "13:10–13:40"). Se aplica a alimentos y macros directos del día que se está viendo, y se puede deshacer.

### Semáforo
- Sin ✕ en toda la app: el punto rojo queda sin glifo, con su etiqueta accesible.
- Nuevo estado "En curso" (`live`) para hoy sin cerrar y días futuros: anillo neutro mientras no se llega al 90 % del objetivo (100 % en proteína). Al entrar en rango o superarlo se evalúa como siempre. Un hoy cerrado se evalúa completo.
- Corregido: exactamente +10 % daba ámbar por redondeo de coma flotante.

### Ajustes y datos
- Sección "Estimaciones" con "kcal por copa" (150 por defecto).
- Sigue el formato v4. Campos nuevos, todos opcionales: `close.mode = 'est'`, `close.adj`, `close.parts`, `close.n`, `settings.estDrink`, `settings.closeHidden`, `settings.welcomeFor`. Exportar e importar los incluyen; las copias anteriores se importan sin problema.
- `close.s = 'est'`, reservado en la 1.4, ya no existe: la estimación va en `close.mode`.
- `sw.js`: nueva versión de caché.

### Para tener en cuenta
- **Macros sin días estimados:** las kcal estimadas no traen macros. La media de kcal incluye esos días, pero las de proteína, carbohidratos y grasas no. Las barras de macros del día y los análisis por alimento (de dónde vienen tus calorías, NOVA, horario) usan solo lo registrado.
- **Diferencia con la báscula:** las calorías son una estimación y el peso varía por agua y sal. Una diferencia no prueba que falten registros; es una señal para revisar. Por dentro, positivo significa acercarse al objetivo; en pantalla se muestra el cambio de peso (−0,5 kg = bajó).
- Un día estimado usa el color neutro en Hoy, en las barras y en el semáforo (≈), aunque quede fuera de rango. Sí cuenta en "Días en rango" si lo está.
- El aviso desaparece a los 2 días, pero el día sigue en gris hasta que se cierre.
- Hoy cuenta en las medias aunque esté a medias, así que por la mañana las baja y el progreso sale más alto de lo real. No se cambió en esta versión.

---

## Versión 1.4 · Cierre del día

Objetivo: que cada día se cierre, salga bien o mal, y que volver a registrar sea fácil y sin culpa. La constancia importa más que el número exacto.

### Reglas
1. **Días en gris:** un día pasado (anterior a hoy), igual o posterior a la fecha en que empieza la regla (`closeFrom`), que no esté cerrado ni sea de ayuno, queda **abierto** y se muestra en gris, tenga o no alimentos. Hoy nunca es gris.
2. **Los días grises no cuentan** en ninguna estadística: promedios, días en rango, progreso, hábitos, horario, ultraprocesados, comidas en casa ni Constancia.
3. **Cerrado como completo** cuenta igual que antes. **Marcado** (fuera de plan o incompleto) no entra en promedios ni progreso, pero sigue visible y cuenta en Constancia si tiene alimentos.
4. Un día gris o marcado **siempre se puede terminar**: se edita y se cierra como completo.
5. **Límite:** si un mes acumula más de 5 días grises, el progreso en kg de ese mes, y el de las semanas que lo tocan, se muestra en 0, con el motivo y el botón "Cerrar días pendientes". Al cerrar días se recalcula.
6. **Transparencia:** debajo del progreso y de las medias aparece "Calculado con X de Y días" y cuántos días quedan sin contar (sin cerrar y marcados). Un día sin contar suma 0 kg; si fue de exceso, el progreso real es algo menor.
7. **Migración:** los datos existentes no cambian. La regla empieza el día en que se instala la 1.4; los días anteriores con alimentos o ayuno quedan cerrados como completos (`legacy`), y los días en blanco anteriores nunca salen en gris.

### Hoy
- **Aviso de días pendientes:** "Ayer quedó abierto. Ciérralo en 10 segundos." o "Tienes N días sin cerrar.", con botón "Cerrar".
- **Hoja "Días pendientes":** lista de días sin cerrar, cada uno con su botón "Cerrar", y "Marcar como completos los que tienen alimentos" para cerrar de una vez los que tienen registros. Los días vacíos piden elegir uno a uno.
- **Tarjeta "Cierre del día":** al final de Hoy. Para el día de hoy aparece a partir de la hora configurada (antes, un botón discreto "Cerrar el día"). Un día pasado abierto la muestra arriba con el aviso gris "Este día sigue abierto: no cuenta en tus promedios hasta que lo cierres." Un día cerrado muestra su estado ("Cerrado: completo", "Cerrado: fuera de plan · alcohol") con el botón "Cambiar". Los días futuros no se cierran.
- **Colores:** un día abierto se ve en gris neutro y sin semáforo, con el texto "Día sin cerrar". Un día marcado usa un color neutro suave, nunca rojo. Un día completo conserva el semáforo.
- Añadir alimentos a un día ya cerrado no lo reabre: cerrar es decisión de la persona.

### Hoja "Cerrar el día"
1. "¿Tu registro de ayer / ese día / hoy refleja lo que comiste?": **Sí, está completo** (cierra al instante), **Más o menos, me faltó algo** o **Fue un día fuera de plan**. Si el día no tiene alimentos, ofrece marcarlo como día de ayuno.
2. "¿Qué pasó?": fichas de selección múltiple (comí de más, tomé alcohol, celebración o evento, comí fuera y no pude registrar, se me olvidó registrar, viaje, comí muy poco, otro). "Sin juicios. Esto solo ayuda a que el día cuente."
3. "¿Qué hacemos con este día?": **Marcar y seguir** (queda registrado, fuera de promedios) o **Completar el registro** (vuelve al día, que sigue abierto, para añadir lo que faltó). La lista de opciones está preparada para que la V1.5 añada "Estimar".
4. Cierre: "Listo. Mañana empieza en limpio." con el botón **Planear mañana**.

### Resumen
- **Semáforo semanal y barras diarias:** día sin cerrar en gris ("Día sin cerrar"), día marcado en un tono neutro distinto ("Marcado, no cuenta en promedios"); el ayuno sigue con la "A". La leyenda añade "Sin cerrar" y "Marcado" cuando aparecen.
- **Constancia:** "Registraste 26 de 30 días (3 marcados como fuera de plan)", y "N días sin cerrar" con enlace a Días pendientes.
- **Medias y progreso:** línea de cobertura (regla 6) y progreso en 0 cuando se supera el límite (regla 5).
- **Resumen > Día** de un día abierto: aviso gris y botón "Cerrar el día".
- Una semana o un mes sin días que cuenten, pero con días pendientes, lo explica y ofrece cerrarlos.

### Ajustes
- Nueva sección **Cierre del día**: "Preguntarme al final del día" y la hora (por defecto 20:00). Aunque se desactive la pregunta, los días sin cerrar siguen en gris: la regla se mantiene.
- Nota final: "Utilizando Version 1.4 de la app".

### Datos y copias de seguridad
- Formato v4. Campos nuevos, todos opcionales: `settings.closeFrom`, `settings.closeHour`, `settings.closeAsk` y `day.close = {s, why, mode, at, legacy}` (`s`: ok, partial, off; `est` queda reservado para la V1.5).
- `dayState()` es el único sitio que decide qué día cuenta (future, today, open, ok, marked, fast); `dayTotals()` añade `state`, `counts` y `registered`.
- `cleanDay()` no borra un día cerrado aunque esté vacío. "Copiar de ayer" y "Copiar de otro día" no copian el cierre.
- Exportar e importar incluyen los cierres y `closeFrom`. Las copias v1 a v3 se siguen recuperando y se migran como en el punto 7.
- `sw.js`: nueva versión de caché.

### Para tener en cuenta
- Desde el día en que se instala la 1.4, todo día que pase sin cerrarse queda en gris, también los días en que no se abrió la app. Por eso conviene cerrar cada noche o usar "Días pendientes".
- "Constancia" cuenta los días transcurridos del periodo completo, como en la 1.3, para no mostrar cifras como "25 de 1" en el mes en que empieza la regla.
- Un día cerrado como completo sin alimentos no entra en promedios (no hay nada que contar). Si ese día no comiste nada, márcalo como día de ayuno.
- Al recuperar una copia v1 a v3, la regla empieza el día en que se recupera.

---

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

