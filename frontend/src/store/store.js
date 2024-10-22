import {configureStore} from "@reduxjs/toolkit";
import recipeSlice from "@/src/store/recipeSlice";


export const store = configureStore({
    reducer: {
        recipe: recipeSlice
    }
})
