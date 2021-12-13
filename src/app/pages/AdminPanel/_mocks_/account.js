// ----------------------------------------------------------------------

import { getUser } from 'user_info';

const account = {
  get displayName() {
    return getUser().name + ' ' + getUser().surname;
  },
  get email() {
    return getUser().email;
  },
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
