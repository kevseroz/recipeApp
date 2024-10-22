import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    recipes: [],
    loadingRecipes: false,
    error: null
}

export const getRecipes = createAsyncThunk(
    'recipe/getRecipes',
    async () => {
        const response = await axios.get('http://localhost:4242/api/recipes')
        return response.data
    }
)

export const getRecipe = createAsyncThunk(
    'recipe/getRecipe',
    async (id) => {
        const response = await axios.get(`http://localhost:4242/api/get-recipe/${id}`)
        return response.data
    }
)


const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(getRecipes.pending, (state, action) => {
            state.loadingRecipes = true
        })
        builder.addCase(getRecipes.fulfilled, (state, action) => {
            state.loadingRecipes = false
            state.recipes = action.payload
        })
        builder.addCase(getRecipes.rejected, (state, action) => {
            state.loadingRecipes = false
            state.error = action.payload
        })
        builder.addCase(getRecipe.pending, (state, action) => {
            state.loadingRecipes = true
        })
        builder.addCase(getRecipe.fulfilled, (state, action) => {
            state.loadingRecipes = false
            state.recipes = action.payload
        })
        builder.addCase(getRecipe.rejected, (state, action) => {
            state.loadingRecipes = false
            state.error = action.payload
        })
    }
})

export default recipeSlice.reducer
