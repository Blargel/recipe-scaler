import {
  FirestoreDataConverter,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase";

export interface RecipeIngredient {
  id: number;
  amount: number;
  name: string;
}

export interface RecipeData {
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
}

const recipeConverter: FirestoreDataConverter<RecipeData> = {
  toFirestore: (recipe) => recipe,
  fromFirestore: (recipeDoc) => recipeDoc.data() as RecipeData,
};

export function recipesCollection(userId: string) {
  return collection(db, `users/${userId}/recipes`).withConverter(
    recipeConverter,
  );
}

export function recipesDoc(userId: string, recipeId: string) {
  return doc(recipesCollection(userId), recipeId);
}

export async function addRecipe(userId: string, recipeData: RecipeData) {
  return addDoc(recipesCollection(userId), recipeData);
}

export async function getRecipes(userId: string) {
  return getDocs(recipesCollection(userId));
}

export async function getRecipe(userId: string, recipeId: string) {
  return getDoc(recipesDoc(userId, recipeId));
}
