# Robotina — Cooking Programs (Vanilla JS)

## 1. Descripción

**Robotina** es un proyecto desarrollado con **HTML, CSS y JavaScript (vanilla)** cuyo objetivo es servir como base para implementar y extender un conjunto de **funciones de “cooking programs”** (programas/recetas de cocina) definidas en el script del proyecto.

La idea es que cualquier persona que use este repositorio pueda:
- Revisar el flujo general de la app (interfaz + lógica).
- **Implementar, completar o reemplazar** las funciones del script de *cooking programs*.
- Probar rápidamente cambios en un entorno simple, sin frameworks.

> Nota: Este proyecto está pensado para ser didáctico y fácil de modificar.

---

## 2. Enlace de despliegue / Preview

- **Deploy / Demo:** *(agrega aquí tu URL de GitHub Pages, Netlify, Vercel, etc.)*  
  Ejemplo: `https://tu-usuario.github.io/robotina/`

- **Preview local:** abre `index.html` en el navegador o usa un servidor local (ver sección 5).

---

## 3. Estructura del proyecto

Estructura esperada:

- `scripts/`  
  - Contiene la lógica en JavaScript.
- `config/`  
  - Configuración del proyecto (constantes, datos de ejemplo, parámetros).
- `styles/`  
  - Estilos CSS del proyecto.

Archivos principales:
- `index.html` — punto de entrada (UI).
- `index.js` — punto de entrada JavaScript (inicialización/enganche de eventos).

Ejemplo (referencial):

```text
robotina/
├─ index.html
├─ index.js
├─ scripts/
│  └─ cooking-programs.js
├─ config/
│  └─ config.js
└─ styles/
   └─ styles.css
```

---

## 4. Tecnologías usadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**

Opcional (si lo usas para desarrollo local):
- **Live Server** (extensión de VS Code) o cualquier servidor estático simple.

---

## 5. Guía de instalación, configuración y ejecución

### 5.1. Requisitos
- Tener instalado **Git** (opcional, si clonas el repo).
- Tener un navegador moderno (Chrome, Firefox, Edge, etc.).
- *(Recomendado)* VS Code + extensión **Live Server** o similar.

### 5.2. Instalación (clonar)
Clona el repositorio:

```bash
git clone https://github.com/ManuelagDuque/robotina.git
cd robotina
```

Si no vas a usar Git, también puedes descargarlo como `.zip` desde GitHub y descomprimirlo.

### 5.3. Configuración
1. Revisa el contenido de la carpeta `config/` (si aplica).
2. Identifica el archivo en `scripts/` donde están las funciones de **cooking programs** (por ejemplo `scripts/cooking-programs.js`).
3. Implementa o completa las funciones indicadas allí.

Sugerencias:
- Mantén la lógica de negocio en `scripts/` y evita mezclarla con el DOM en exceso.
- Si el proyecto tiene datos de prueba, colócalos en `config/` para separarlos de la lógica.

### 5.4. Ejecución

#### Opción A: Abrir el HTML directamente
- Abre `index.html` con doble clic o desde el navegador.

> Si estás usando `fetch()` o módulos ES (`type="module"`), puede que necesites un servidor local para evitar bloqueos por CORS.

## 6. Agradecimientos y contribuciones

### Agradecimientos
Gracias a todas las personas que usen este proyecto como base para practicar y mejorar su lógica con JavaScript.

### Contribuciones
Las contribuciones son bienvenidas. Si quieres aportar:

1. Haz un fork del repositorio.
2. Crea una rama con tu cambio:
   ```bash
   git checkout -b feature/mi-mejora
   ```
3. Haz commit de tus cambios:
   ```bash
   git commit -m "Agrega mejora X"
   ```
4. Sube tu rama:
   ```bash
   git push origin feature/mi-mejora
   ```
5. Abre un Pull Request describiendo:
   - Qué cambiaste
   - Por qué
   - Cómo probarlo

Si vas a proponer cambios grandes (nuevas features o refactor), idealmente abre primero un issue para discutirlo.

---

### Contacto
Si quieres dejar tu contacto o redes, agrega aquí:
- Autor/a: **ManuelagDuque**
- GitHub: https://github.com/ManuelagDuque