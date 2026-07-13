# Plan de trabajo Git — Raíz Familiar

Ejecuta estos bloques **en orden**, uno por uno. Después de cada bloque marcado
con 📸 toma una captura de pantalla (terminal y/o GitHub) para tu documento del
Producto 02.

> Antes de empezar: crea el repositorio vacío en GitHub (sin README, sin
> licencia, sin .gitignore — ya los trae el proyecto) y copia su URL.
> Ejemplo: `https://github.com/tuusuario/raiz-familiar.git`
https://github.com/ItzelRincoon/raiz-familiar.git
---

## 0. Configuración inicial (Sprint 0)

```bash
cd raiz-familiar
git init
git add .gitignore README.md package.json vite.config.ts postcss.config.mjs pnpm-workspace.yaml index.html
git commit -m "Sprint 0: configuracion inicial del repositorio y entorno de desarrollo"

git branch -M main
git remote add origin https://github.com/ItzelRincoon/raiz-familiar.git
git push -u origin main
```
📸 Captura: terminal con el push exitoso + la página del repo en GitHub ya creada.

---

## 1. Estructura base y navegación (Sprint 1)

```bash
git checkout -b feature/estructura-base
git add src/main.tsx src/app/App.tsx src/app/routes.tsx src/styles src/app/contexts src/app/components/ui src/app/components/figma src/app/components/MainLayout.tsx src/app/components/BottomNav.tsx src/app/components/ProtectedRoute.tsx src/app/components/MoreMenu.tsx
git commit -m "Sprint 1: estructura base, layout, navegacion y contexto de autenticacion"
git push -u origin feature/estructura-base
```
📸 Captura: `git status` antes del commit, y el commit ya en GitHub.

➡️ En GitHub: abre un **Pull Request** de `feature/estructura-base` hacia `main` → **Merge**.

```bash
git checkout main
git pull origin main
```
📸 Captura: pantalla del Pull Request y del merge realizado.

---

## 2. Módulo: Onboarding (registro / login)

```bash
git checkout -b feature/onboarding
git add src/app/components/OnboardingScreen.tsx
git commit -m "Sprint 2: pantalla de registro e inicio de sesion (Onboarding)"
git push -u origin feature/onboarding
```
➡️ Pull Request → Merge a `main` en GitHub.
```bash
git checkout main
git pull origin main
```
📸 Captura del PR + merge.

---

## 3. Módulo: Invitaciones / Grupo familiar ya no ya paso

```bash
git checkout -b feature/invitaciones
git add src/app/components/InvitationCreator.tsx
git commit -m "Sprint 3: creacion de grupo familiar y codigo de invitacion"
git push -u origin feature/invitaciones
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---

## 6. Módulo: Home Dashboard

```bash
git checkout -b feature/dashboard
git add src/app/components/HomeDashboard.tsx
git commit -m "Panel principal: Home Dashboard"
git push -u origin feature/dashboard
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---

## 5. Módulo: Árbol Familiar

```bash
git checkout -b feature/arbol-familiar
git add src/app/components/FamilyTree.tsx
git commit -m "Sprint 5: modulo de Arbol Familiar"
git push -u origin feature/arbol-familiar
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---

## 6. Módulo: Eventos

```bash
git checkout -b feature/eventos
git add src/app/components/EventHub.tsx
git commit -m "Sprint 5: modulo de Eventos (EventHub)"
git push -u origin feature/eventos
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---

## 7. Módulo: Recetas (Cookbook)

```bash
git checkout -b feature/recetas
git add src/app/components/Cookbook.tsx
git commit -m "Sprint 5: modulo de Recetas familiares (Cookbook)"
git push -u origin feature/recetas
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---

## 8. Módulo: Cápsulas del tiempo
git checkout main 
git pull origin main
git checkout -b feature/recetas
git checkout afb905e -- src/app/components/TimeCapsules.tsx
git status
```bash
git checkout -b feature/capsulas-tiempo
git add src/app/components/TimeCapsules.tsx
git commit -m "Modulo de Capsulas del tiempo"
git push -u origin feature/capsulas-tiempo
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---7

## 7. Módulo: Tablero SOS

```bash
git checkout -b feature/tablero-sos
git checkout afb905e -- src/app/components/SOSTablon.tsx
git status
git add src/app/components/SOSTablon.tsx
git commit -m " Sprint 7 Modulo de Tablero SOS para emergencias familiares"
git push -u origin feature/tablero-sos
```
➡️ Pull Request → Merge.
```bash
git checkout main
git pull origin main
```
📸 Captura.

---

## 8. Módulo: Configuración

```bash
git checkout -b feature/configuracion
git checkout afb905e -- src/app/components/SettingsScreen.tsx
git status
git add src/app/components/SettingsScreen.tsx
git commit -m "Sprint 8: pantalla de configuracion y ajustes finales"
git push -u origin feature/configuracion
```

```bash
git checkout main
git pull origin main
```

---

## 11. Evidencia final del historial completo

```bash
git log --oneline --graph --all
git branch -a
```
📸 Captura de este comando (muestra todas las ramas y el historial completo).

También entra a GitHub → pestaña **"Insights" → "Network"** y toma captura del
árbol de ramas y merges — es la evidencia visual más fuerte para la rúbrica.

---

## Explicación rápida de cada comando (para tu documento)

| Comando | Qué hace |
|---|---|
| `git init` | Inicializa un repositorio Git local en la carpeta del proyecto. |
| `git add <archivos>` | Agrega archivos al área de preparación (staging) antes del commit. |
| `git commit -m "mensaje"` | Guarda una "fotografía" de los cambios preparados, con un mensaje descriptivo. |
| `git branch -M main` | Renombra la rama principal a `main`. |
| `git remote add origin <url>` | Conecta el repositorio local con el repositorio remoto en GitHub. |
| `git push -u origin <rama>` | Sube los commits de una rama al remoto y la vincula para futuros push. |
| `git checkout -b <rama>` | Crea una nueva rama y se cambia a ella. |
| `git checkout main` | Cambia de vuelta a la rama principal. |
| `git pull origin main` | Descarga y fusiona los cambios más recientes de `main` desde GitHub. |
| `git merge` | Se ejecuta automáticamente al aceptar un Pull Request en GitHub, integrando los cambios de una rama en otra. |
| `git log --oneline --graph --all` | Muestra el historial de commits de todas las ramas en forma de árbol. |
