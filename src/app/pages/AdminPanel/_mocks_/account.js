// ----------------------------------------------------------------------

import { getUser } from 'axiosConfig';

const account = {
  displayName: getUser().name + ' ' + getUser().surname,
  email: 'demo@minimals.cc',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg',
};

export default account;
