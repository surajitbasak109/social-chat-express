import Joi from 'joi';
import Tweet from './tweet.model';

export default {
  async create(req, res) {
    try {
      const schema = Joi.object({
        body: Joi.string().required(),
      });

      const { value, error } = schema.validate(req.body);
      if (error && error.details) {
        return res.status(400).json(error);
      }

      const tweet = await Tweet.create(value);
      return res.json(tweet);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  async findAll(req, res) {
    try {
      const tweets = await Tweet.find({});

      return res.json(tweets);
    } catch(err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
