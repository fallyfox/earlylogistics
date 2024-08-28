import * as yup from "yup";

export const validation = yup.object().shape({
    title: yup.string().required().min(8),
    description: yup.string().required(),
    origin: yup.string().required(),
    destination: yup.string().required(),
    senderFullName: yup.string().required().min(5),
    senderPhone: yup.string().required().min(11),
    weight: yup.number().required().moreThan(0),
    length: yup.number().required().moreThan(0),
    breadth: yup.number().required().moreThan(0),
    height: yup.number().required().moreThan(0),
    value: yup.number().required()
})