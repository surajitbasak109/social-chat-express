import Joi from 'joi';
import bcrypt from 'bcryptjs';

export default {
  encryptPassword(plainText) {
    const salt = bcrypt.genSaltSync(); // default is 10
    return bcrypt.hashSync(plainText, salt);
  },
  validateSignup(body) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    const { value, error } = schema.validate(body);

    if (error && error.details) {
      return { error };
    }

    return { value };
  },
  comparePassword(plainText, encryptedPassword) {
     return bcrypt.compareSync(plainText, encryptedPassword);
  },
  validateLogin(body) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    const { value, error } = schema.validate(body);

    if (error && error.details) {
      return { error };
    }

    return { value };
  }
}