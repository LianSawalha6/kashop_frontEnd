import * as yup from "yup"

export const sendCodeSchema=yup.object({
    email:yup.string().required().email(),
})
