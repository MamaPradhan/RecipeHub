import { createContext, useState } from "react";

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {

  // Search
  const [search, setSearch] = useState("");

  // Categories
  const [categories, setCategories] = useState([]);

  // Category Recipes
  const [categoryRecipes, setCategoryRecipes] = useState([]);

  // Selected Recipe
  const [recipeDetails, setRecipeDetails] = useState(null);

  // Loading
  const [loading, setLoading] = useState(false);

  // Selected Category
  const [selectedCategory, setSelectedCategory] = useState("");

  return (

    <RecipeContext.Provider
      value={{

        search,
        setSearch,

        categories,
        setCategories,

        categoryRecipes,
        setCategoryRecipes,

        recipeDetails,
        setRecipeDetails,

        loading,
        setLoading,

        selectedCategory,
        setSelectedCategory

      }}
    >

      {children}

    </RecipeContext.Provider>

  );

};

export default RecipeProvider;