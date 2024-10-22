import {getRecipes} from "@/src/store/recipeSlice";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

const Recipes = () => {
    const dispatch = useDispatch();
    const {recipes, loadingRecipes, error} = useSelector(state => state.recipe);
console.table(recipes)
    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);
    return (
        <div>
            <h1>Recipes</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.description}</p>
                    <p>{recipe.author}</p>
                </div>
            ))}
        </div>
    )
}

export default Recipes
