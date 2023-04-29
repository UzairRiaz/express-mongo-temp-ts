import joi from 'joi';

export const signUpValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const logInValidation = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().required(),
  },
};
