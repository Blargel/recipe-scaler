"use client";

import { Suspense, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useAuth } from "@/contexts/auth/useAuth";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";
import { RecipeData } from "@/lib/db/recipes";
import { RecipeForm } from "@/components/RecipeForm";

export default function NewRecipe() {
  const [recipe, setRecipe] = useState<RecipeData>({
    name: "",
    description: "",
    ingredients: [
      {
        id: 1,
        amount: 1,
        name: "",
      },
    ],
  });

  const { firebaseUser, firebaseUserLoading } = useAuth();
  const loginRedirect = useLoginRedirect();

  const validRecipe =
    recipe.name.length > 0 &&
    recipe.ingredients.length > 0 &&
    recipe.ingredients.every(
      (ingredient) => ingredient.amount > 0 && ingredient.name.length > 0,
    );

  if (firebaseUserLoading) {
    return <Suspense />;
  } else if (firebaseUser === null) {
    loginRedirect();
  } else {
    return (
      <>
        <Typography variant="h3">New Recipe</Typography>
        <RecipeForm recipe={recipe} setRecipe={setRecipe} />
        <Box marginTop={4} marginBottom={10} justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            disabled={!validRecipe}
            sx={{ marginRight: 2 }}
          >
            Create
          </Button>
          <Button variant="outlined" size="large">
            Cancel
          </Button>
        </Box>
      </>
    );
  }
}
