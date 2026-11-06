# Hoja: contexto del proyecto

Léelo primero. Resume lo necesario para trabajar sin releer todo el código. El detalle de cada versión está en `version.md`; las reglas de trabajo, en `claude.md`.

## Qué es
PWA de registro de comidas, calorías y macros, en español y pensada para iPhone. Sin servidor ni cuentas: los datos viven en el `localStorage` de cada dispositivo. Se publica con GitHub Pages desde `main` (raíz). Versión actual: **1.6**. La carpeta se llama FoodieApp, pero la app se llama **Hoja**.

## Archivos
| Archivo | Función |
|---|---|
| `index.html` | Toda la app: CSS, HTML y JS en un archivo (unas 2.400 líneas) |
| `sw.js` | Service worker para uso sin conexión |
| `version.md` | Historial, de la versión más reciente a la más antigua |
| `claude.md` | Reglas del proyecto |
| `manifest.webmanifest`, `icons/` | Instalación como PWA |
| `vendor/zxing.min.js` | Lector de códigos de barras |

## Leer index.html sin gastar tokens
- La línea `const BASE = [...]` (hacia la 360) ocupa unos 120 KB. Nunca la leas ni dejes que aparezca entera: usa `Read` con `offset` y `limit`, y en `grep` añade `| cut -c1-150`.
- Localiza el código con `grep -n "^function \|^/\* -----" index.html | cut -c1-100`. Las secciones están marcadas con `/* ---------- nombre ---------- */`.
- Orden del script: utilidades, fechas, estado, alimentos, días y objetivos, TDEE, navegación, Hoy, cierre del día, registrar, hojas, toast, buscador, cantidad, macros directos, editor de alimentos, Open Food Facts, escáner, recetas, acciones de comida, Resumen, Alimentos, Ajustes, copias de seguridad, `ACT`, inicio.

## Reglas al hacer cambios
1. Todo cambio de funcionalidad o programación de `index.html` sube la versión (V1.X, hasta que se decida pasar a la 2).
2. Por cada versión: actualizar `VERSION` y `BUILD` en `index.html` (la nota final de Ajustes "Utilizando Version X de la app" sale de `VERSION`), poner el mismo valor de `BUILD` en `CACHE` de `sw.js`, y añadir `## Versión X` al principio de `version.md`.
3. Si cambia el formato de datos: subir `v` en `defaultState()` y en `migrate()`, y `version` en `exportData()`. Los campos nuevos son opcionales y las copias antiguas deben seguir importándose.
4. No cambiar nunca `KEY = 'hoja.v1'`: se perderían los datos. Importar pasa por `migrate()`.
5. No hacer commit salvo que se pida; lo suele hacer la persona usuaria.
6. Toda la interfaz va en español, con los componentes existentes: `card`, `pill`, `banner`, `hint`, `st`, `openSheet`.

## Modelo de datos (`S`, formato v4)
- `S.settings`: `meals`, `goals {kcal,p,c,f}`, `macroMode`, `exCarb`, `water`, `profile {sex,height,age,weight,activity}`, `backupDays`, `lastBackup`, `closeFrom`, `closeHour`, `closeAsk`, `closeHidden`, `welcomeFor`, `estDrink`, `homeWater`, `homeFast`.
- `S.days['YYYY-MM-DD']`: `entries[]`, `ex[]`, `water`, `weight`, y opcionales `fasting`, `home {mealId:true}`, `close {s,why,mode,at,legacy,adj,parts,n}` (`mode`: `mark` o `est`).
- Entrada: `{id,m,fid,n,k,p,h,g,q}` y opcionales `u` (unidad), `t` ('HH:MM'), `nova`, `ns`, `liq` (1 o 0, copia del alimento), `x:'q'` (macros directos). **`k,p,h,g` son por 100 g** y `h` = carbohidratos, `g` = grasa. Se calcula con `etot(e)`.
- `S.foods`, `S.recipes`, `S.usage`. Todos los alimentos se guardan por 100 g; con `liq`, esos valores se muestran por 100 ml (1:1, sin densidades). Usa `isLiq(x)` y `qUnit(x)`, y nunca escribas "g" a mano para la cantidad de un alimento.

## Lógica central
- `dayState(k)` es el **único** sitio que decide qué día cuenta: `future | today | open | ok | marked | est | fast`. No repitas esas condiciones en las vistas.
- `dayTotals(k)` añade `state`, `counts` (entra en promedios), `registered` (entra en Constancia), `kLogged` y `adj`. `t.k` = registradas + `adj`; las kcal estimadas no traen macros.
- `periodStats(keys)` alimenta Semana y Mes, y parte de Día: `st.days` (solo los que cuentan), `gray`, `marked`, `est`, `estKcal`, `registered`, `elapsed`, `blocked`, `longRun`, `kg`, `kgRaw`, `avg()`, `avgT()`. `avg` de p, c y f excluye los días estimados.
- Objetivo del día: `targets(k)` = `goals` + ejercicio.
- Progreso: (TDEE + ejercicio − consumido) / `KCAL_PER_KG` (7.700), solo con días que cuentan. TDEE = TMB Mifflin-St Jeor × actividad (1,1 a 1,6), con el último peso registrado hasta ese día. Son cosas distintas: "debías consumir" usa el objetivo; el progreso usa el mantenimiento.
- Cierre del día: un día pasado desde `closeFrom`, sin cierre ni ayuno, queda en gris y no cuenta. Con más de `GRAY_LIMIT` (5) días grises en un mes, el progreso de ese mes y de las semanas que lo tocan se muestra en 0.
- Semáforo: `status(v, t, protein, live)`; `live` = `isLive(state)` (hoy sin cerrar y futuros). Sin ✕: el rojo va sin glifo.
- Reutilizables: `swipeable(el, opciones)` (también por delegación, con `item`, `part`, `reveal` y `skip`), `timeControl(caja, valor, onChange)`, `openTimeSheet()`, `deleteEntry(k, id)` (borrar con Deshacer), `addedToast(msg, entradas, deshacer)`. `toast()` acepta una acción o una lista. El aviso de Hoy usa `nagDays()`; `pendingDays()` es la lista completa.
- Interfaz: las acciones globales usan `data-a` y el objeto `ACT`; dentro de las hojas se usa `data-s` con delegación de clics. `render()` repinta la pestaña actual. Estado de navegación: `TAB`, `CUR`, `SUMMODE`, `SUMD`, `SUMW`, `SUMM`.

## Decisiones ya tomadas
- El progreso supone que el objetivo es perder peso. Las comidas sin la casilla "En casa" cuentan como fuera.
- `st.elapsed` cuenta todos los días transcurridos del periodo, no desde `closeFrom` como pedía la especificación de la 1.4, para evitar cifras como "25 de 1".
- "Calculado con X de Y días": Y = días que cuentan + grises + marcados.
- Un día marcado no reabre al añadir alimentos. "Completar el registro" borra el cierre y deja el día abierto.
- Un día estimado usa color neutro (≈) en Hoy, barras y semáforo, aunque quede fuera de rango.
- Tarjeta de báscula: positivo = acercarse al objetivo por dentro; en pantalla se muestra el cambio de peso (−0,5 kg = bajó). El texto "se mueve menos" solo sale si la báscula muestra menos progreso que las calorías.
- Dos causas de comidas faltantes no pueden contar la misma comida.
- Sin tocar el control, la hora de un alimento nuevo es la del toque, no la de abrir la hoja. Hora automática solo en el día de hoy.
- El ayuno se muestra en Hoy solo si está activado en Ajustes o si el día ya es de ayuno.
- Tono del cierre del día: sin culpa, sin rojo y sin palabras como "fallaste" o "compensa".

## Pruebas
- No hay Node. Para JS usa `/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc`, con el script extraído de `index.html` y stubs de `document`, `localStorage`, etc. Comenta `render();` y el registro del service worker.
- Comparar con la versión anterior: `git show HEAD:index.html`, el mismo conjunto de datos en ambas y diff de `periodStats`.
- Chrome: usa `--headless=old --no-sandbox --user-data-dir=<dir> --virtual-time-budget=5000` (`--headless=new` se cuelga). El primer arranque de un perfil suele colgarse: lanza con timeout de 15 s y reintenta sin borrar `--user-data-dir`. No baja de 500 px de ventana: para 375 px, fuerza por CSS `html,body` y `.sheet-wrap,.tabbar` a 375 px, y desactiva la transición de `.sheet` para las capturas. Los iframes con `file://` se cuelgan.
- Las pruebas no están en el repositorio; se crean en el scratchpad de cada sesión.

## Pendiente
- Probar en iPhone la apertura sin conexión de `sw.js`: el arreglo de la 1.2 nunca se verificó en un teléfono, ni los deslizamientos táctiles de la 1.5 y la 1.6.
- Sin decidir: hoy cuenta en las medias aunque esté a medias, lo que las baja por la mañana e infla el progreso.
