import { ValidationError } from "../types/validation-error";

export const getApiErrorsText = (errors: ValidationError[]) => {
  return errors.map((err) => err.msg).concat(", ");
};
