import Joi from 'joi';
import Tweet from './tweet.model.js';

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

      const tweet = await Tweet.create(Object.assign({}, value, { artist: req.user._id }));
      return res.json(tweet);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  async findAll(req, res) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        populate: {
          path: 'artist',
          select: 'firstName lastName'
        }
      };
      const tweets = await Tweet.paginate({}, options);

      return res.json(tweets);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  async findOne(req, res) {
    try {
      let { id } = req.params;
      const tweet = await Tweet.findById(id).populate('artist', 'firstName lastName');
      if (!tweet) {
        return res.status(404).json({ error: 'Could not find tweet' });
      }
      return res.json(tweet);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  async delete(req, res) {
    try {
      let { id } = req.params;
      const tweet = await Tweet.findOneAndRemove({ _id: id });
      if (!tweet) {
        res.status(400).json({ error: 'could not find tweet' });
      }
      return res.json(tweet);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  async update(req, res) {
    try {
      let { id } = req.params;

      const schema = Joi.object({
        body: Joi.string().optional(),
      });

      const { value, error } = schema.validate(req.body);
      if (error && error.details) {
        return res.status(400).json(error);
      }

      const tweet = await Tweet.findOneAndUpdate({ _id: id }, value, { new: true });
      if (!tweet) {
        res.status(400).json({ error: 'could not find tweet' });
      }
      return res.json(tweet);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
