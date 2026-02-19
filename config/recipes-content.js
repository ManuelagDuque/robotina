// RECIPES CONTENT CONFIG
// Configuración de las recetas disponibles en el menú

export const recipes = [
    {
        id: 'fried-egg',
        emoji: '🍳',
        name: 'Huevo Frito',
        cookTime: 5,  // minutos
        includedInPlan: true,
        ingredients: {
            huevo: { quantity: 1, unit: 'unidad' },
            mantequilla: { quantity: 1, unit: 'cucharada' },
            sal: { quantity: 1, unit: 'cucharadita' },
            aceite: { quantity: 1, unit: 'cucharada' },
        },
        utensils: {
            sarten: true,
            espatula: true,
            plato: true
        }
    },
    {
        id: 'white-rice',
        emoji: '🍚',
        name: 'Arroz Blanco',
        cookTime: 15,  // minutos
        includedInPlan: true,
        ingredients: {
            arroz: { quantity: 1, unit: 'taza' },
            agua: { quantity: 2, unit: 'tazas' },
            sal: { quantity: 1, unit: 'cucharadita' },
            aceite: { quantity: 1, unit: 'cucharada' }
        },
        utensils: {
            olla: true,
            cuchara_madera: true,
            plato: true
        }
    },
    {
        id: 'surprise-recipe',
        emoji: '❓',
        name: 'Receta Sorpresa',
        cookTime: 10,  // minutos
        includedInPlan: false,
        ingredients: {},
        utensils: {}
    }
];
