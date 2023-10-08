import {
  Dispatch,
  FocusEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { ValidatedTextField, ValidationError } from "./ValidatedTextField";
import { RecipeData, RecipeIngredient } from "@/lib/db/recipes";
import { usePrevious } from "@/hooks/usePrevious";

export interface RecipeFormProps {
  recipe: RecipeData;
  setRecipe: Dispatch<SetStateAction<RecipeData>>;
}

export function RecipeForm({
  recipe: { name, description, ingredients },
  setRecipe,
}: RecipeFormProps) {
  const [nextId, setNextId] = useState(() => {
    return (
      ingredients.reduce(
        (currentMax, ingredient) =>
          currentMax < ingredient.id ? ingredient.id : currentMax,
        0,
      ) + 1
    );
  });
  const setName = useCallback(
    (newName: string) => {
      setRecipe(
        (oldRecipe: RecipeData): RecipeData => ({
          ...oldRecipe,
          name: newName,
        }),
      );
    },
    [setRecipe],
  );

  const setDescription = useCallback(
    (newDescription: string) => {
      setRecipe(
        (oldRecipe: RecipeData): RecipeData => ({
          ...oldRecipe,
          description: newDescription,
        }),
      );
    },
    [setRecipe],
  );

  const nameValidation = useCallback((newValue: string) => {
    if (newValue.length === 0) {
      throw new ValidationError("Name cannot be blank");
    }
  }, []);

  const addIngredient = useCallback(() => {
    setRecipe((oldRecipe: RecipeData): RecipeData => {
      const newIngredients = [
        ...oldRecipe.ingredients,
        { id: nextId, amount: 1, name: "" },
      ];
      setNextId((oldNextId) => oldNextId + 1);
      return {
        ...oldRecipe,
        ingredients: newIngredients,
      };
    });
  }, [nextId, setRecipe]);

  return (
    <Box>
      <Box marginTop={4}>
        <Typography variant="h6">Information</Typography>
        <ValidatedTextField
          value={name}
          setValue={setName}
          validation={nameValidation}
          label="Name"
        />
        <ValidatedTextField
          value={description}
          setValue={setDescription}
          label="Description"
          multiline
        />
      </Box>

      <Box marginTop={4}>
        <Typography variant="h6">Ingredients</Typography>
        <Grid container spacing={2}>
          {ingredients.map(({ id }, index) => (
            <IngredientField
              ingredients={ingredients}
              setRecipe={setRecipe}
              index={index}
              key={id}
            />
          ))}
        </Grid>
        <Button onClick={addIngredient}>Add Ingredeint</Button>
      </Box>
    </Box>
  );
}

export interface IngredientFieldProps {
  ingredients: RecipeIngredient[];
  setRecipe: Dispatch<SetStateAction<RecipeData>>;
  index: number;
}

export function IngredientField({
  ingredients,
  setRecipe,
  index,
}: IngredientFieldProps) {
  const [stringAmount, setStringAmount] = useState(
    ingredients[index].amount.toString(),
  );

  const prevIndex = usePrevious(index);

  const setAmount = useCallback(
    (newAmount: string) => {
      setStringAmount(newAmount);
      setRecipe((oldRecipe) => {
        const newIngredients = [...oldRecipe.ingredients];
        newIngredients[index].amount = isNaN(Number(newAmount))
          ? 0
          : Number(newAmount);
        return {
          ...oldRecipe,
          ingredients: newIngredients,
        };
      });
    },
    [index, setRecipe],
  );

  const setName = useCallback(
    (newName: string) => {
      setRecipe((oldRecipe) => {
        const newIngredients = [...oldRecipe.ingredients];
        newIngredients[index].name = newName;
        return {
          ...oldRecipe,
          ingredients: newIngredients,
        };
      });
    },
    [index, setRecipe],
  );

  const handleAmountBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((event) => {
    setStringAmount(
      isNaN(Number(event.target.value))
        ? "0"
        : Number(event.target.value).toString(),
    );
  }, []);

  const amountValidation = useCallback((newValue: string) => {
    if (isNaN(Number(newValue)) || Number(newValue) <= 0) {
      throw new ValidationError("Cannot be 0 or negative");
    }
  }, []);

  const nameValidation = useCallback((newValue: string) => {
    if (newValue.length === 0) {
      throw new ValidationError("Cannot be blank");
    }
  }, []);

  const deleteIngredient = useCallback(() => {
    setRecipe((oldRecipe) => {
      const newIngredients = [...oldRecipe.ingredients];
      newIngredients.splice(index, 1);
      return {
        ...oldRecipe,
        ingredients: newIngredients,
      };
    });
  }, [index, setRecipe]);

  useEffect(() => {
    if (prevIndex !== index) {
      setStringAmount(ingredients[index].amount.toString());
    }
  }, [index, ingredients, prevIndex]);

  return (
    <>
      <Grid xs={1}>
        <IconButton
          color="error"
          disabled={ingredients.length === 1}
          onClick={deleteIngredient}
          sx={{ marginTop: 1.5, marginLeft: 1, marginRight: 1 }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid xs={2}>
        <ValidatedTextField
          value={stringAmount}
          setValue={setAmount}
          validation={amountValidation}
          onBlur={handleAmountBlur}
          label="Amount"
        />
      </Grid>
      <Grid xs={9}>
        <ValidatedTextField
          value={ingredients[index].name}
          setValue={setName}
          validation={nameValidation}
          label="Description"
        />
      </Grid>
    </>
  );
}
