import TextField from "@mui/material/TextField";
import { ChangeEventHandler, useCallback, useState } from "react";

export class ValidationError extends Error {
  public __isValidationError = true;
}

export function isValidationError(e: unknown): e is ValidationError {
  return (e as ValidationError).__isValidationError === true;
}

type TextFieldProps = Parameters<typeof TextField>[0];

export interface ValidatedTextFieldProps extends TextFieldProps {
  value: string;
  setValue: (newValue: string) => void;
  validation?: (value: string) => void;
}

export function ValidatedTextField({
  value,
  setValue,
  validation,
  ...rest
}: ValidatedTextFieldProps) {
  const [error, setError] = useState<string | undefined>();

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value);

      if (validation !== undefined) {
        try {
          validation(event.target.value);
          setError(undefined);
        } catch (e: unknown) {
          if (isValidationError(e)) {
            setError(e.message);
          } else {
            throw e;
          }
        }
      }
    },
    [setValue, validation],
  );

  return (
    <TextField
      value={value}
      onChange={handleOnChange}
      error={error !== undefined}
      helperText={error ?? " "}
      variant="outlined"
      margin="dense"
      fullWidth
      {...rest}
    />
  );
}
