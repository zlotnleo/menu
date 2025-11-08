import {prisma} from "@/prismaClient";

const ingredients = await prisma.ingredient.findMany({
    select: {
        id: true,
        menuName: true
    },
    where: {
        cocktailIngredients: {
            some: {
                cocktail: {
                    NOT: {
                        menuSection: null
                    }
                }
            }
        }
    }
});

export default function IngredientList() {
    return <ul>
        {ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.menuName}</li>)}
    </ul>
}