import userService from './user.service.js';
import User from './user.model.js';
import jwt from '../../helpers/jwt.js';

export default {
  async signup(req, res) {
    try {
      const { value, error } = userService.validateSignup(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      // Check for existing user
      const user = await User.findOne({ email: value.email });

      if (user) {
        return res.status(400).json({error: 'Email is already taken'});
      }

      const encryptedPassword = userService.encryptPassword(value.password);
      value.password = encryptedPassword;

      const newUser = await User.create(value);
      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async login(req, res) {
    try {
      const { value, error } = userService.validateLogin(req.body);

      if (error) {
        return res.status(400).json(error);
      }

      const user = await User.findOne({ email: value.email });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const authenticated = userService.comparePassword(value.password, user.password);

      if (!authenticated) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // TODO: Send JWT Token
      const token = jwt.issue({ id: user._id }, '1d');
      return res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  authenticate(req, res) {
    return res.json(req.user);
  },
};
