import {Fragment} from "react";
import {prisma} from "@/prismaClient";
import {Preparation} from "@/generated/prisma/enums";

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
    where: {
        NOT: {
            menuSection: null
        }
    }
});

export default function Home() {
    return (
        <>
            <h1>Recipes</h1>
            <dl>
            {cocktails.map((cocktail) =>
                    cocktail && <Fragment key={cocktail.id}>
                        <dt>{cocktail.name}</dt>
                        <dd>
                            <div>{formatPreparation(cocktail.preparation)}</div>
                            <ul>
                                {cocktail.cocktailIngredients.map(cocktailIngredient =>
                                    <li key={cocktailIngredient.ingredient.id}>{cocktailIngredient.amount} {cocktailIngredient.ingredient.recipeName}</li>
                                )}
                            </ul>
                            {cocktail.garnish && <div>Garnish: {cocktail.garnish}</div>}
                        </dd>
                    </Fragment>
            )}
            </dl>
        </>
    );
}

const formatPreparation = (preparation: Preparation) => {
    switch (preparation) {
        case Preparation.SHAKE:
            return 'Shake';
        case Preparation.STIR:
            return "Stir";
        case Preparation.DRY_SHAKE:
            return "Dry shake";
        case Preparation.CHURN:
            return "Churn";
        case Preparation.BUILD:
            return "Build";
    }
}
