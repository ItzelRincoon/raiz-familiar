# Cómo conectar Firebase (5-10 min)

## 1. Crea el proyecto
1. Ve a https://console.firebase.google.com
2. "Agregar proyecto" → dale un nombre (ej. `raiz-familiar`) → sigue los pasos.

## 2. Registra tu app web
1. En el panel del proyecto, clic en el ícono `</>` (Web).
2. Ponle un apodo, NO marques Hosting (ya usas Netlify).
3. Copia el objeto `firebaseConfig` que te muestra.

## 3. Configura las variables de entorno
1. Copia `.env.example` a un archivo nuevo llamado `.env` en la raíz del proyecto.
2. Rellena cada valor con lo que copiaste en el paso 2 (apiKey, authDomain, etc.)
3. **No subas `.env` a GitHub** (ya está en `.gitignore`).

## 4. Activa Authentication (modo anónimo)
1. En la consola de Firebase → Build → Authentication → "Get started".
2. Pestaña "Sign-in method" → habilita **Anonymous**.
   (No pedimos email/contraseña, solo entra con el código familiar, como ya tenías.)

## 5. Activa Firestore
1. Build → Firestore Database → "Create database".
2. Modo: producción (usaremos las reglas de `firestore.rules`).
3. Región: elige la más cercana (ej. `us-central` o `southamerica-east1`).

## 6. Sube las reglas de seguridad
En la consola: Firestore → pestaña "Rules" → pega el contenido de `firestore.rules` (en la raíz del proyecto) → Publicar.

## 7. Variables de entorno en Netlify (para producción)
Como ya tienes el deploy en Netlify vía GitHub:
1. Netlify → tu sitio → Site configuration → Environment variables.
2. Agrega las mismas 6 variables que pusiste en `.env` (con el prefijo `VITE_`).
3. Vuelve a hacer deploy (trigger deploy) para que las tome.

## Qué quedó funcionando
- El código familiar ya no es decorativo: crea/usa un documento real en Firestore (`families/{codigo}`).
- Cada persona que entra con ese código queda autenticada de verdad en Firebase Auth (anónimo) y su `uid` se agrega a la lista de miembros de esa familia.
- Cerrar sesión (en el menú "Más") ahora sí cierra la sesión de Firebase.

## Qué falta si luego quieres crecerlo
- Guardar datos reales (eventos, árbol familiar, recetas) en Firestore dentro de cada `families/{codigo}` — ahora mismo esas pantallas siguen usando datos de ejemplo/locales.
- Si más adelante quieres login con email/contraseña en vez de solo código, es un cambio pequeño sobre esta misma base.
