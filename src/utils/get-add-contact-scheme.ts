import { object, string } from "yup";

export const getAddContactScheme = () =>
  object({
    phone: string()
      .matches(
        /(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/i,
        "Неверный формат телефона"
      )
      .required("Обязательное поле"),
    name: string()
      .min(2, "Минимальная длина имени - 2 символа")
      .max(30, "Максимальная длина имени - 30 символов")
      .required("Обязательное поле"),
  });
