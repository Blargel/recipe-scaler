"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { useAuth } from "@/contexts/auth/useAuth";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";
import { RecipeData, getRecipes } from "@/lib/db/recipes";
import { useRouter } from "next/navigation";

export default function Recipes() {
  const [recipes, setRecipes] = useState<
    QueryDocumentSnapshot<RecipeData, DocumentData>[]
  >([]);
  const { firebaseUser, firebaseUserLoading } = useAuth();
  const loginRedirect = useLoginRedirect();
  const router = useRouter();

  const navToNewRecipe = useCallback(() => {
    router.push("/new-recipe");
  }, [router]);

  useEffect(() => {
    async function fetchRecipes() {
      if (!firebaseUserLoading && firebaseUser !== null) {
        const recipes = await getRecipes(firebaseUser.uid);
        setRecipes(recipes.docs);
      }
    }

    fetchRecipes();
  }, [firebaseUser, firebaseUserLoading]);

  if (firebaseUserLoading) {
    return <Suspense />;
  } else if (firebaseUser === null) {
    loginRedirect();
  } else {
    return (
      <>
        <Typography variant="h3">Recipes</Typography>
        <Box marginTop={4}>
          <Button variant="contained" onClick={navToNewRecipe}>
            New Recipe
          </Button>
        </Box>

        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id}>{recipe.data().name}</div>
          ))}
        </div>
      </>
    );
  }
}
