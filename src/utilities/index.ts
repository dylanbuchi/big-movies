import axios from 'axios';

export const theMovieDatabaseApiInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.REACT_APP_THE_MOVIE_DATABASE_API_KEY,
  },
});

export const fetchAuthenticationToken = async () => {
  try {
    const { data } = await theMovieDatabaseApiInstance.get(
      'authentication/token/new',
    );

    const requestToken = data.request_token;

    const url = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/`;

    if (data.success) {
      window.location.href = url;
      localStorage.setItem('request_token', requestToken);
    }
  } catch (error) {
    console.log('Error! Could not create a new token...');
  }
};

export const createUserSessionId = async () => {
  const requestToken = localStorage.getItem('request_token');
  const url = 'authentication/session/new';

  if (requestToken) {
    try {
      const { data } = await theMovieDatabaseApiInstance.post(url, {
        request_token: requestToken,
      });

      const sessionId = data.session_id;

      localStorage.setItem('session_id', sessionId);
      return sessionId;
    } catch (error) {
      console.log('Error! Could not create a new user session...');
    }
  }
  return null;
};
