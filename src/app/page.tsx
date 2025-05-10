import {sql} from "@/db";
import {Fragment} from "react";

type DbCocktail = {
    cocktailId: number;
    cocktailName: string;
    garnish: string;
    preparation: string;
    ingredientId: number;
    ingredientName: string;
    ingredientMenuName: string;
    amount: string;
}

console.log(JSON.stringify(await sql('SELECT cocktail.name FROM cocktail JOIN cocktail_ingredient ON cocktail_ingredient.cocktail = cocktail.id ORDER BY cocktail.id DESC;')));

const data = await sql<DbCocktail>(`
    SELECT cocktail.id                as cocktailId,
           cocktail.name              as cocktailName,
           cocktail.garnish           as garnish,
           ingredient.id              as ingredientId,
           ingredient.recipe_name     as ingredientName,
           ingredient.menu_name       as ingredientMenuName,
           cocktail_ingredient.amount as amount,
           preparation.name           as preparation
    FROM cocktail
             JOIN cocktail_ingredient ON cocktail_ingredient.cocktail = cocktail.id
             JOIN ingredient ON ingredient.id = cocktail_ingredient.ingredient
             JOIN preparation ON cocktail.preparation = preparation.id
    ORDER BY cocktail.id ASC, cocktail_ingredient."order" ASC;
`);

const cocktails = Object.entries(
    Object.groupBy(data, row => row.cocktailId));

export default function Home() {
    return (
        <>
            <h1>Menu</h1>
            {cocktails.map(([cocktailId, cocktail]) =>
                    cocktail && <Fragment key={cocktailId}>
                        <h2>{cocktail[0].cocktailName}</h2>
                        <div>{cocktail[0].preparation}</div>
                        <ul>
                            {cocktail.map(ingredient =>
                                <li key={ingredient.ingredientId}>{ingredient.amount} {ingredient.ingredientName} ({ingredient.ingredientMenuName})</li>
                            )}
                        </ul>
                        {cocktail[0].garnish && <div>Garnish: {cocktail[0].garnish}</div>}
                    </Fragment>
            )}
        </>
    );
}
