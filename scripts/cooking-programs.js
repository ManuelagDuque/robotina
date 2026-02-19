/**
 * COOKING-PROGRAMS.JS - Programas de Cocina
 * 
 * Este archivo contiene todas las funciones específicas de cocinar
 * cada tipo de receta. Cada función recibe:
 * - recipe: datos de la receta
 * - onComplete: callback para cuando termina
 * - supplies: ingredientes y utensilios disponibles
 */

/* ========================================
   IMPORTACIONES
   ======================================== */

import { studentSupplies } from './configuration.js';

/* ========================================
   UTILIDAD
   ======================================== */

// Utilidad: esperar cierta cantidad de milisegundos
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ========================================
   FUNCIONES DE COCINA
   ======================================== */

// Programa: Huevo Frito
function cookFriedEgg(recipe, onComplete, supplies = studentSupplies) {
    console.log('🤖 Decisión: preparar huevo frito');
    console.log('🔎 Receta seleccionada:', recipe.name);

    if (typeof onComplete !== 'function') {
        const message = '⚠️ No se pudo iniciar esta receta (callback de finalización no disponible).';
        console.error('onComplete no es una función.');
        return { ok: false, code: 'MISSING_CALLBACK', message, recipe };
    }
    
    
}

// Programa: Arroz Blanco
// TODO: estudiantes deben implementar de manera individual
function cookWhiteRice(recipe, onComplete) {
    console.log('🍚 Programa de Arroz blanco aún no implementado');
    const message = '⚠️ Esta receta está en tu plan pero aún no la hemos programado.';
    return { ok: false, code: 'NOT_IMPLEMENTED', message, recipe };
}

// Programa: Receta Sorpresa
// TODO: estudiantes deben implementar de manera grupal
function cookSurpriseRecipe(recipe, onComplete) {
    console.log('❓ Programa de Receta Sorpresa aún no implementado');
    const message = '⚠️ Esta receta está en tu plan pero aún no la hemos programado.';
    return { ok: false, code: 'NOT_IMPLEMENTED', message, recipe };
}

/* ========================================
   EXPORTAR
   ======================================== */

export {
    cookFriedEgg,
    cookWhiteRice,
    cookSurpriseRecipe
};
