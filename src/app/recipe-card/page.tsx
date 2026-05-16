import {prisma} from "@/prismaClient";
import RecipeCardContent from "@/app/recipe-card/content";

const getCocktails = () => prisma.cocktail.findMany({
    include: {
        cocktailIngredients: {
            include: {
                ingredient: true
            },
            orderBy: {order: 'asc'}
        }
    },
    where: {
        menuSection: {isHidden: false}
    }
}).then(cocktails => cocktails.map(c => ({
    ...c,
    normalisedName: normaliseName(c.name)
})));

export type RecipeCardCocktails = Awaited<ReturnType<typeof getCocktails>>;

export default async function RecipeCard() {
    const cocktails = await getCocktails();
    return <RecipeCardContent cocktails={cocktails} />
}

const normaliseName = (name: string): string => {
    return name.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}
