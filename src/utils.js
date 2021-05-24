import * as Yup from "yup";
import {makeRequired, makeValidate} from "mui-rff";

const schema = Yup.object().shape({
    planet_one: Yup.string().required(),
    planet: Yup.array().of(Yup.string().required()).min(1).required(),
    best: Yup.array().of(Yup.string().required()).min(1).required(),
    available: Yup.boolean().oneOf([true], 'We are not available!').required(),
    switch: Yup.array().of(Yup.string().required()).min(1).required(),
    terms: Yup.boolean().oneOf([true], 'Please accept the terms').required(),
    date: Yup.date().required(),
    hello: Yup.string().required(),
    cities: Yup.array().of(Yup.string().required()).min(1).required(),
    gender: Yup.string().required(),
    birthday: Yup.date().required(),
    break: Yup.date().required(),
    hidden: Yup.string().required(),
    keyboardDateTime: Yup.date().required(),
    dateTime: Yup.date().required(),
    dateTimeLocale: Yup.date().required(),
});

export const validate = makeValidate(schema);

export const required = makeRequired(schema);
