const yup = require("yup");

export const formSchema = yup.object({
  body: yup.object({
    username: yup.string().required("Campo obrigatório!").min(3, "Username deve ter no mímino 3 caracteres"),
    password: yup.string().required("Campo obrigatório!")
    .min(8, "Sua senha deve conter ao menos 8 caracteres")
    .matches(/.*\d/, "Sua senha deve conter ao menos um dígito")
    .matches(/.*[A-Z]/, "Sua senha deve conter ao menos uma letra maiúscula")
  })
});