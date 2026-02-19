/**
 * CONFIGURATION.JS - Configuración del Robot y Suministros
 * 
 * Este archivo contiene:
 * 1. Configuración del robot (nombre, saludo, pregunta, modelo)
 * 2. Suministros disponibles (ingredientes y utensilios)
 */

/* ========================================
   CONFIGURACIÓN DEL ROBOT
   ======================================== */

const robotConfig = {
    name: 'Chefcito',
    emoji: '🤖',
    greeting: 'Soy tu robot cocinero',
    question: '¿Qué deseas cocinar hoy?',
    modelo: 2024
};

/* ========================================
   SUMINISTROS DE LA ESTUDIANTE
   ======================================== */

// Valores por defecto para la demo didáctica
const studentSupplies = {
    ingredients: {
        huevo: { quantity: 1, unit: 'unidad' },
        mantequilla: { quantity: 1, unit: 'cucharada' }
    },
    utensils: {
        sarten: true,
        espatula: true,
        plato: true
    }
};

/* ========================================
   EXPORTAR
   ======================================== */

export {
    robotConfig,
    studentSupplies
};
