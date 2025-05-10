import {sql} from "@/db";
import {Fragment} from "react";

type DbCocktail = {
    cocktailId: number;
    cocktailName: string;
    garnish: string;
    preparation: string;
    ingredientId: number;
    ingredientName: string;
    amount: string;
}

const data = await sql<DbCocktail>(`
    SELECT cocktail.id                as cocktailId,
           cocktail.name              as cocktailName,
           cocktail.garnish           as garnish,
           ingredient.id              as ingredientId,
           ingredient.recipe_name     as ingredientName,
           cocktail_ingredient.amount as amount,
           preparation.name           as preparation
    FROM cocktail
             JOIN cocktail_ingredient ON cocktail_ingredient.cocktail = cocktail.id
             JOIN ingredient ON ingredient.id = cocktail_ingredient.ingredient
             JOIN preparation ON cocktail.preparation = preparation.id
    ORDER BY cocktail.id, cocktail_ingredient."order";
`);

type Cocktail = {
    id: number;
    name: string;
    preparation: string;
    garnish: string;
    ingredients: Array<{
        id: number;
        name: string;
        amount: string;
    }>;
}

const cocktails: Array<Cocktail | undefined> = [];
for (const {cocktailId, cocktailName, preparation, garnish, ingredientId, ingredientName, amount} of data) {
    const cocktail = cocktails[cocktails.length - 1];
    const ingredient = {
        id: ingredientId,
        name: ingredientName,
        amount
    };
    
    if (cocktail?.id === cocktailId) {
        cocktail.ingredients.push(ingredient)
    } else {
        cocktails.push({
            id: cocktailId,
            name: cocktailName,
            preparation,
            garnish,
            ingredients: [ingredient]
        });
    }
}

export default function Home() {
    return (
        <>
            <h1>Recipes</h1>
            <dl>
            {cocktails.map((cocktail) =>
                    cocktail && <Fragment key={cocktail.id}>
                        <dt>{cocktail.name}</dt>
                        <dd>
                            <div>{cocktail.preparation}</div>
                            <ul>
                                {cocktail.ingredients.map(ingredient =>
                                    <li key={ingredient.id}>{ingredient.amount} {ingredient.name}</li>
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
