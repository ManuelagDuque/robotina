/**
 * ROBOT.JS - Lógica del Robot de Cocina
 * 
 * Este archivo contiene:
 * 1. Configuración del robot (nombre, saludo, pregunta)
 * 2. Funciones genéricas para ejecutar cualquier receta
 * 
 * Los datos de las recetas (ingredientes, tiempo, utensilios)
 * se importan desde config/recipes-content.js
 */

/* ========================================
   IMPORTACIONES
   ======================================== */

import { recipes } from '../config/recipes-content.js';
import { cookFriedEgg, cookWhiteRice, cookSurpriseRecipe } from './cooking-programs.js';
import { robotConfig, studentSupplies } from './configuration.js';

/* ========================================
   FUNCIONES GENÉRICAS - Funcionan para cualquier receta
   ======================================== */

// Obtiene los datos de una receta por su ID desde recipes-content.js
function getRecipeData(recipeId) {
    return recipes.find(recipe => recipe.id === recipeId);
}

// Ejecuta el proceso de cocción según la receta seleccionada
// Devuelve una decisión estructurada para que index.js decida el mensaje a mostrar
function executeRecipe(recipeId, onComplete, supplies = studentSupplies) {
    console.log('🤖 Evaluando receta seleccionada para ejecutar:', recipeId);
    const recipe = getRecipeData(recipeId);
    
    if (!recipe) {
        const message = '❌ No encontramos la receta seleccionada.';
        console.error(message, recipeId);
        return { ok: false, code: 'NOT_FOUND', message };
    }
    
    if (recipe.includedInPlan === false) {
        const message = '⚠️ Esta receta no está incluida en tu plan. Aún no has comprado ese programa.';
        console.warn(message, recipeId);
        return { ok: false, code: 'NOT_IN_PLAN', message, recipe };
    }
    
    // Despachador directo por receta → método correspondiente
    const recipePrograms = {
        'fried-egg': cookFriedEgg,
        'white-rice': cookWhiteRice,
        'surprise-recipe': cookSurpriseRecipe
    };
    const program = recipePrograms[recipeId];
    
    if (!program) {
        const message = '⚠️ Esta receta aún no la hemos programado.';
        console.warn(message, recipeId);
        return { ok: false, code: 'NOT_IMPLEMENTED', message, recipe };
    }
    
    console.log('🧭 Ejecutando programa:', recipeId);
    // Cada programa decide su propio resultado/mensaje
    const decision = program(recipe, onComplete, supplies);
    return decision;
}

// Devuelve todas las recetas disponibles
function getAllRecipes() {
    return recipes;
}

/* ========================================
   EXPORTAR: Funciones disponibles
   ======================================== */

export {
    robotConfig,
    getRecipeData,
    executeRecipe,
    getAllRecipes
};


