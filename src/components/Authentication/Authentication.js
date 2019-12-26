import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');
export const getRefreshToken = () => Cookies.get('refresh_token');
export const isAuthenticated = () => !!getAccessToken();

const redirectToLogin = () => {
  console.log('redirect to login');

  // window.location.replace(
  //   `${getConfig().LOGIN_URL}?next=${window.location.href}`,
  // );
  // or history.push('/login') if your Login page is inside the same app
};

export const authenticate = async () => {
  if (getRefreshToken()) {
    console.log('step1');

    try {
      const tokens = await getAccessToken(); // call an API, returns tokens

      const expires = (tokens.expires_in || 60 * 60) * 1000;
      const inOneHour = new Date(new Date().getTime() + expires);

      // you will have the exact same setters in your Login page/app too
      console.log('-> acces_token', tokens.access_token);
      console.log('-> refresh_token', tokens.refresh_token);

      Cookies.set('access_token', tokens.access_token, { expires: inOneHour });
      Cookies.set('refresh_token', tokens.refresh_token);

      return true;
    } catch (error) {
      redirectToLogin();
      return false;
    }
  }
  console.log('step2');


  redirectToLogin();
  return false;
};
