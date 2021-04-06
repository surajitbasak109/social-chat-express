import Joi from 'joi';

export default {
  async create(req, res) {
    const schema = Joi.object({
      body: Joi.string().required()
    });

    const { value, error } = schema.validate(req.body);
    if(error && error.details) {
      return res.status(400).json(error);
    }

    return res.json(value);
  },
};
