/**
 * INDEX.JS - Orquestador de la Aplicación
 * 
 * Este archivo es el DIRECTOR DE ORQUESTA:
 * 1. Inicializa la aplicación
 * 2. Conecta los eventos de UI con la lógica del robot
 * 3. Gestiona el flujo de la aplicación
 * 
 * EXPLICACIÓN PARA ESTUDIANTES:
 * El index.js es el punto de entrada. Aquí no hacemos ni:
 * - Manipulación de DOM (eso es ui.js)
 * - Lógica de recetas (eso es robot.js)
 * 
 * Solo conectamos los dos mundos.
 * 
 * IMPORTANTE: Este archivo usa módulos ES6 (import/export)
 * para cargar los demás scripts de forma organizada.
 */

/* ========================================
   IMPORTACIONES
   ======================================== */

// Importamos las funciones que necesitamos de ui.js
import { 
    initializeUI, 
    showRecipeDetails, 
    showCookingMessage,
    setupStartCookingListener,
    showDishRating,
    showRatingFeedback,
    showContinueMessage
} from './scripts/ui.js';

// Importamos configuración y funciones del robot
import {
    robotConfig,
    getRecipeData,
    executeRecipe,
    getAllRecipes
} from './scripts/robot.js';

/* ========================================
   MANEJO DEL FLUJO DE LA APP
   ======================================== */

// Manejador: Usuario selecciona una receta
function handleRecipeSelection(recipeId) {
    console.log('Receta seleccionada:', recipeId);
    
    // Obtenemos los datos completos de la receta
    const recipe = getRecipeData(recipeId);
    if (!recipe) return;
    
    // Mostramos los detalles en la UI con callback de volver atrás
    showRecipeDetails(recipe, handleBackToMenu);
    
    // Configuramos el botón de iniciar cocción
    setupStartCookingListener(handleStartCooking);
}

// Manejador: Usuario hace click en el botón volver atrás
function handleBackToMenu() {
    console.log('Volviendo al menú');
    initializeApp();
}

// Manejador: Usuario hace click en "Iniciar Cocción"
function handleStartCooking(recipeId) {
    console.log('Iniciando cocción de:', recipeId);
    
    // Obtenemos la receta
    const recipe = getRecipeData(recipeId);
    const recipeName = recipe ? recipe.name : 'receta';
    
    // Pedimos al robot que decida y devuelva el mensaje apropiado
    const decision = executeRecipe(
        recipeId,
        (recipe) => {
            // onComplete callback - cuando termina la cocción
            handleCookingComplete(recipe);
        }
    );
    
    // Si el robot indica error, mostramos el mensaje y mantenemos la vista actual
    if (!decision || decision.ok === false) {
        const message = decision && decision.message ? decision.message : '⚠️ No se pudo iniciar esta receta.';
        alert(message);
        return;
    }
    
    // Si está corriendo, mostramos el mensaje de cocción
    const runningName = (decision.recipe && decision.recipe.name) || recipeName;
    showCookingMessage(runningName);
}

// Manejador: La cocción ha terminado
function handleCookingComplete(recipe) {
    alert('✅ ¡Tu ' + recipe.name + ' ya está lista para servir!\n\nEspero que te guste 🤖');
    
    // Mostrar evaluación del plato
    showDishRating(recipe.name, (rating) => {
        handleDishRating(rating, recipe.name);
    });
}

// Manejador: Usuario evalúa el plato
function handleDishRating(rating, recipeName) {
    // Mostrar feedback
    showRatingFeedback(rating, recipeName);
    
    // Después de 2 segundos, mostrar mensaje de continuación
    setTimeout(() => {
        showContinueMessage(() => {
            // Reiniciar la app
            initializeApp();
        });
    }, 3000);
}

/* ========================================
   INICIALIZAR LA APP
   ======================================== */

// Inicializa la aplicación cuando el DOM está listo
function initializeApp() {
    console.log('🤖 Robot de Cocina iniciado');
    
    // Mostramos la UI inicial: nombre del robot, saludo y menú de recetas
    // Pasamos handleRecipeSelection como callback
    initializeUI(handleRecipeSelection, robotConfig, getAllRecipes());
}

/**
 * PUNTO DE ENTRADA
 * Espera a que el DOM esté cargado antes de ejecutar
 */
document.addEventListener('DOMContentLoaded', initializeApp);

