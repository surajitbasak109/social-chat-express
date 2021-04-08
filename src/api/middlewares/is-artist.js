import { ARTIST_ROLE } from '../resources/user/user.model.js';
export const isArtist = (req, res, next) => {
  if (req.user.role !== ARTIST_ROLE) {
    /*
    |403: This status is similar to 401, but in this case,
    |re-authenticating will make no difference. The access
    |is permanently forbidden and tied to the application logic,
    |such as insufficient rights to a resource.
    |
    */
    return res.status(403).json({ error: 'Unauthorized, not an artist' });
  }

  next();
};
