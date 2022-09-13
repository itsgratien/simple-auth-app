import { celebrate, Joi } from 'celebrate';

export const validateRegisterUser = celebrate({
  body: {
    name: Joi.string().required().min(3)
  }
});
