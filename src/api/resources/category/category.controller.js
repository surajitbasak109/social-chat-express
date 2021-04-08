import categoryService from './category.service.js';
import Category from './category.model.js';

export default {
  async create(req, res) {
    try {
      const { value, error } = categoryService.validateBody(req.body);

      if (error && error.details) {
        return res.status(400).json(error);
      }

      const category = await Category.create(Object.assign({}, value, { user: req.user._id }));

      return res.json(category);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
