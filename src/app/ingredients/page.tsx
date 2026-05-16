import {prisma} from "@/prismaClient";

const getIngredients = () => prisma.ingredient.findMany({
    select: {
        id: true,
        menuName: true
    },
    where: {
        cocktailIngredients: {
            some: {
                cocktail: {
                    menuSection: {isHidden: false}
                }
            }
        }
    }
});

export default async function IngredientList() {
    const ingredients = await getIngredients();
    return <ul>
        {ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.menuName}</li>)}
    </ul>
}