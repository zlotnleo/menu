import {sql} from "@/db";
import {Fragment} from "react";

type DbCocktail = {
    cocktailId: number;
    cocktailName: string;
    ingredientMenuName: string;
}

const data = await sql<DbCocktail>(`
    SELECT cocktail.id          as cocktailId,
           cocktail.name        as cocktailName,
           ingredient.menu_name as ingredientMenuName
    FROM cocktail
             JOIN cocktail_ingredient ON cocktail_ingredient.cocktail = cocktail.id
             JOIN ingredient ON ingredient.id = cocktail_ingredient.ingredient
             JOIN preparation ON cocktail.preparation = preparation.id
    ORDER BY cocktail.id ASC, cocktail_ingredient."order" ASC;
`);

type Cocktail = {
    id: number;
    name: string;
    ingredients: Array<string>;
}

const cocktails: Array<Cocktail | undefined> = [];
for (const {cocktailId, cocktailName, ingredientMenuName} of data) {
    const cocktail = cocktails[cocktails.length - 1];

    if (cocktail?.id === cocktailId) {
        cocktail.ingredients.push(ingredientMenuName)
    } else {
        cocktails.push({
            id: cocktailId,
            name: cocktailName,
            ingredients: [ingredientMenuName]
        });
    }
}


export default function Home() {
    return (
        <>
            <h1>Menu</h1>
            <dl>
                {cocktails.map((cocktail) =>
                        cocktail && <Fragment key={cocktail.id}>
                            <dt>{cocktail.name}</dt>
                            <dd>{cocktail.ingredients.join(", ")}</dd>
                        </Fragment>
                )}
            </dl>
        </>
    );
}
