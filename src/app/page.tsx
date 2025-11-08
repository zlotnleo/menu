import {Fragment} from "react";
import {prisma} from "@/prismaClient";

const sections = await prisma.menuSection.findMany({
    include: {
        cocktails: {
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
        }
    }
})

export default function Home() {
    return (
        <>
            <h1>Menu</h1>
            {sections.map(section => section.cocktails.length > 0 && (
                <Fragment key={section.id}>
                    <h2>{section.name}</h2>
                    <dl>
                        {section.cocktails.map((cocktail) =>
                            cocktail && <Fragment key={cocktail.id}>
                                <dt>{cocktail.name}</dt>
                                <dd>{cocktail.cocktailIngredients
                                    .map(i => `${i.ingredient.menuName}`)
                                    .join(', ')
                                }</dd>
                            </Fragment>
                        )}
                    </dl>
                </Fragment>
            ))}
        </>
    );
}
