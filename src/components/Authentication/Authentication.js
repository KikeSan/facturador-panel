import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
// console.log('getToken', Cookies.get('refresh_token'));

export const getRefreshToken = () => Cookies.get('refresh_token');
export const isAuthenticated = () => !!getAccessToken();

const redirectToLogin = () => {
  console.log('redirect to login');

  // window.location.replace(
  //   `${getConfig().LOGIN_URL}?next=${window.location.href}`,
  // );
  // or history.push('/login') if your Login page is inside the same app
};

// Create tokens
export const authenticate = async () => {
  const tokens = {
    access_token: 'true',
  };
  const inOneHour = 1 / 24;

  // you will have the exact same setters in your Login page/app too
  Cookies.set('access_token', tokens.access_token, { expires: inOneHour });
  return true;
};
