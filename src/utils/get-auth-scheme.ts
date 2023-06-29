import { object, string } from "yup";

export const getValidationSchema = () =>
  object({
    username: string()
      .min(3, "Минимальная длина - 3 символа")
      .max(20, "Максимальная длина - 20 символов")
      .required("Обязательное поле"),
    password: string()
      .min(8, "Минимальная длина пароля - 8 символов")
      .max(50, "Максимальная длина пароля - 50 символов")
      .required("Обязательное поле"),
  });
