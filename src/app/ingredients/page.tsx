import {sql} from "@/db";

const ingredients = await sql<{ id: number, name: string }>(`
    SELECT ingredient.id, ingredient.menu_name as name
    FROM ingredient
`);

export default function IngredientList() {
    return <ul>
        {ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.name}</li>)}
    </ul>
}