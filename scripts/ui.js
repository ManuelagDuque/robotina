/**
 * UI.JS - Manipulación del DOM
 * 
 * Este archivo contiene todas las funciones para:
 * 1. Renderizar contenido en la pantalla
 * 2. Escuchar eventos del usuario
 * 3. Actualizar el DOM de forma dinámica
 * 
 * PRINCIPIO: Cada función hace UNA SOLA COSA bien
 */

/* ========================================
    IMPORTACIONES
    ======================================== */
// UI desacoplada: no importa lógica ni datos.
// Todos los datos llegan por parámetros desde index.js.

/* ========================================
   UTILIDAD: Obtener el contenedor raíz
   ======================================== */

// Obtiene el elemento raíz donde renderizamos la app
function getRoot() {
    return document.getElementById('root');
}

// Busca una receta por su ID en el array de recetas
// La UI no realiza búsquedas de datos; index.js se encarga.

/* ========================================
   RENDERIZAR: Saludo inicial del robot
   ======================================== */

// Renderiza el saludo del robot en la pantalla
// EXPLICACIÓN PARA ESTUDIANTES:
// - Usamos template literals (backticks) para facilidad
// - Incluimos clases CSS para estilos
// - Solo RENDERIZAMOS, no escuchamos eventos aquí
function showGreeting(robotConfig) {
    const root = getRoot();
    
    root.innerHTML = `
        <div class="greeting-container">
            <h1 class="greeting-title">${robotConfig.emoji} ${robotConfig.name} ${robotConfig.modelo}</h1>
            <p class="greeting-subtitle">${robotConfig.greeting}</p>
            <p class="greeting-subtitle">${robotConfig.question}</p>
        </div>
    `;
}

/* ========================================
   RENDERIZAR: Opciones de recetas
   ======================================== */

// Renderiza las opciones de recetas como tarjetas clickeables
// EXPLICACIÓN PARA ESTUDIANTES:
// - Creamos botones con data-recipe para identificarlos
// - Cada receta tiene un emoji, nombre y evento click
// - Los datos están en atributos data-* para acceder fácilmente
// - Las recetas se importan desde config/recipes-content.js
function showRecipeOptions(recipes) {
    const root = getRoot();
    
    // Generamos el HTML de las tarjetas
    const recipesHTML = recipes.map(recipe => `
        <button 
            class="recipe-card" 
            data-recipe="${recipe.id}"
            aria-label="Cocinar ${recipe.name}"
        >
            <span class="recipe-emoji">${recipe.emoji}</span>
            <span class="recipe-name">${recipe.name}</span>
        </button>
    `).join('');
    
    // Agregamos las opciones SIN reemplazar el saludo
    const recipesContainer = document.createElement('div');
    recipesContainer.className = 'recipes-container';
    recipesContainer.innerHTML = recipesHTML;
    
    root.appendChild(recipesContainer);
}

/* ========================================
   RENDERIZAR: Detalles de la receta seleccionada
   ======================================== */

// Muestra los detalles de la receta: tiempo, ingredientes y botón de inicio
function showRecipeDetails(recipe, onBack) {
    const root = getRoot();
    
    // Generamos el HTML de los ingredientes en grid (soporta objeto {quantity, unit})
    let ingredientsHTML = '';
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        ingredientsHTML = recipe.ingredients.map(ingredient => `
            <div class="ingredient-card">${ingredient}</div>
        `).join('');
    } else if (recipe.ingredients && typeof recipe.ingredients === 'object') {
        ingredientsHTML = Object.entries(recipe.ingredients).map(([name, info]) => {
            const qty = info?.quantity ?? '';
            const unit = info?.unit ? ` ${info.unit}` : '';
            const label = `${name.replace(/_/g, ' ')}: ${qty}${unit}`;
            return `<div class="ingredient-card">${label}</div>`;
        }).join('');
    }
    
    // Utensilios (si vienen como objeto booleano)
    let utensilsHTML = '';
    if (recipe.utensils && typeof recipe.utensils === 'object') {
        utensilsHTML = Object.entries(recipe.utensils)
            .filter(([, needed]) => !!needed)
            .map(([name]) => `<div class="ingredient-card">${name.replace(/_/g, ' ')}</div>`)
            .join('');
    }
    
    // Limpiamos el contenedor y mostramos detalles
    root.innerHTML = `
        <div class="main-container">
            <div class="header-with-back">
                <button class="back-button">← Volver</button>
            </div>
            
            <div class="greeting-container">
                <h1 class="greeting-title">${recipe.emoji} ${recipe.name}</h1>
            </div>
            
            <div class="recipe-details">
                <div class="detail-section">
                    <h3 class="detail-title">⏱️  Tiempo de cocción</h3>
                    <p class="detail-value">${recipe.cookTime} minutos</p>
                </div>
                
                <div class="detail-section">
                    <h3 class="detail-title">📋 Ingredientes</h3>
                    <div class="ingredients-grid">
                        ${ingredientsHTML}
                    </div>
                </div>
                
                ${utensilsHTML ? `
                <div class="detail-section">
                    <h3 class="detail-title">🧰 Utensilios</h3>
                    <div class="ingredients-grid">
                        ${utensilsHTML}
                    </div>
                </div>` : ''}
                
                <button class="start-cooking-btn" data-recipe-id="${recipe.id}">
                    ▶️  Iniciar Cocción
                </button>
            </div>
        </div>
    `;
    
    // Escuchar el botón de volver
    root.querySelector('.back-button').addEventListener('click', onBack);
}

/* ========================================
   RENDERIZAR: Proceso de cocción en marcha
   ======================================== */

// Muestra un mensaje mientras el robot está cocinando
function showCookingMessage(recipeName) {
    const root = getRoot();
    
    root.innerHTML = `
        <div class="cooking-message-container">
            <h2 class="cooking-title">🤖 Preparando ${recipeName}...</h2>
            <p class="cooking-subtitle">Espera a que termine, te lo haré saber</p>
            <div class="loading-spinner">⟳</div>
        </div>
    `;
}

/* ========================================
   ESCUCHAR: Eventos de recetas
   ======================================== */

// Configura los listeners para los botones de recetas, de forma idempotente
let recipeSelectCallback = null;
let recipeListenerAttached = false;
function setupRecipeListeners(onRecipeSelect) {
    const root = getRoot();
    recipeSelectCallback = onRecipeSelect;
    
    if (recipeListenerAttached) return;
    
    const handler = (event) => {
        const recipeCard = event.target.closest('.recipe-card');
        if (recipeCard && recipeSelectCallback) {
            const recipeId = recipeCard.dataset.recipe;
            recipeSelectCallback(recipeId);
        }
    };
    root.addEventListener('click', handler);
    recipeListenerAttached = true;
}

// Configura el listener para el botón de iniciar cocción, de forma idempotente
let startCookingCallback = null;
let startListenerAttached = false;
function setupStartCookingListener(onStartCooking) {
    const root = getRoot();
    startCookingCallback = onStartCooking;
    
    if (startListenerAttached) return;
    
    const handler = (event) => {
        const startBtn = event.target.closest('.start-cooking-btn');
        if (startBtn && startBtn.dataset && startBtn.dataset.recipeId && startCookingCallback) {
            const recipeId = startBtn.dataset.recipeId;
            startCookingCallback(recipeId);
        }
    };
    root.addEventListener('click', handler);
    startListenerAttached = true;
}

/* ========================================
   RENDERIZAR: Evaluación del plato
   ======================================== */

// Muestra la pregunta sobre cómo estuvo el plato
function showDishRating(recipeName, onRating) {
    const root = getRoot();
    
    root.innerHTML = `
        <div class="dish-rating-container">
            <h2 class="rating-question">¿Qué tal está el ${recipeName}?</h2>
            <div class="rating-buttons">
                <button class="rating-btn" data-rating="good">👍 Delicioso</button>
                <button class="rating-btn" data-rating="bad">👎 No estuvo bien</button>
            </div>
        </div>
    `;
    
    const buttons = root.querySelectorAll('.rating-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = btn.dataset.rating;
            onRating(rating);
        });
    });
}

// Muestra el mensaje de feedback después de la evaluación
function showRatingFeedback(rating, recipeName) {
    const root = getRoot();
    
    const feedbackMessage = rating === 'good' 
        ? `¡Me alegra que te haya gustado el ${recipeName}! 😊`
        : `Entiendo, mejoraré la receta del ${recipeName}. 🤖`;
    
    root.innerHTML = `
        <div class="dish-rating-container">
            <p class="rating-feedback">${feedbackMessage}</p>
            <p class="continue-message">Espera un momento...</p>
        </div>
    `;
}

// Muestra el mensaje final y da opción para continuar
function showContinueMessage(onContinue) {
    const root = getRoot();
    
    root.innerHTML = `
        <div class="dish-rating-container">
            <h2 class="rating-question">¡Vamos a seguir cocinando!</h2>
            <button class="start-cooking-btn" style="margin-top: var(--spacing-lg);">
                🍳 Hacer otra receta
            </button>
        </div>
    `;
    
    const btn = root.querySelector('.start-cooking-btn');
    if (btn) btn.addEventListener('click', onContinue);
}

/* ========================================
   INICIALIZAR: Mostrar saludo + opciones
   ======================================== */

// Inicializa la interfaz mostrando saludo y opciones de recetas
// Esta es la función principal que llama index.js
function initializeUI(onRecipeSelect, robotConfig, recipes) {
    // Mostramos el saludo (permanece visible)
    showGreeting(robotConfig);
    
    // Agregamos las opciones de recetas debajo del saludo
    setTimeout(() => {
        showRecipeOptions(recipes);
        setupRecipeListeners(onRecipeSelect);
    }, 3000);
}

/* ========================================
   EXPORTAR: Funciones disponibles
   ======================================== */

// Exportamos las funciones que index.js necesita
export { 
    initializeUI, 
    showRecipeDetails, 
    showCookingMessage,
    setupStartCookingListener,
    showDishRating,
    showRatingFeedback,
    showContinueMessage
};

