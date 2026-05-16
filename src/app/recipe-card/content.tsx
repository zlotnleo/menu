"use client";

import type {RecipeCardCocktails} from "@/app/recipe-card/page";
import {Fragment, useState} from "react";
import {Preparation} from "@/generated/prisma/enums";

type RecipeCardContentProps = {
    cocktails: RecipeCardCocktails
};

export default function RecipeCardContent({ cocktails }: RecipeCardContentProps) {
    const [search, setSearch] = useState("");
    return (
        <>
            <h1>Recipes</h1>
            <input type="search" onChange={e => setSearch(e.target.value)} value={search} />
            <dl>
                {cocktails.map((cocktail) =>
                        cocktail && isSearchMatch(cocktail.normalisedName, search) && <Fragment key={cocktail.id}>
                            <dt>{cocktail.name}</dt>
                            <dd>
                                <div>{formatPreparation(cocktail.preparation)}</div>
                                <ul>
                                    {cocktail.cocktailIngredients.map(cocktailIngredient =>
                                        <li key={cocktailIngredient.ingredient.id}>
                                            {cocktailIngredient.amount}
                                            {' '}
                                            {cocktailIngredient.ingredient.recipeName}
                                        </li>
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

const isSearchMatch = (normalisedName: string, search: string) => {
    return normalisedName.includes(search.toLowerCase());
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
