import * as yup from "yup"

export const registerSchema=yup.object({
    userName:yup.string().required().min(3).max(20),
    fullName:yup.string().required().min(3).max(20),
    email:yup.string().required().email(),
    password:yup.string().required(),
    phoneNumber:yup.string().required()
  })