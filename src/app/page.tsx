import {Fragment} from "react";
import {prisma} from "@/prismaClient";

const cocktails = await prisma.cocktail.findMany({
    include: {
        cocktailIngredients: {
            include: {
                ingredient: true
            },
            orderBy: {
                order: 'asc'
            }
        }
    },
});

export default function Home() {
    return (
        <>
            <h1>Menu</h1>
            <dl>
                {cocktails.map((cocktail) =>
                        cocktail && <Fragment key={cocktail.id}>
                            <dt>{cocktail.name}</dt>
                            <dd>{cocktail.cocktailIngredients
                                .map(i => `${i.ingredient.menuName}`)
                                .join(', ')
                            }</dd>
                        </Fragment>
                )}
            </dl>
        </>
    );
}
