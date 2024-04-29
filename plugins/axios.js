const COOKIE_NAME = '__session';

export default function ({ $axios, req, app, redirect }) {
  const getToken = () => {
    if (process.server) {
      if (!req.headers.cookie) {
        return;
      }
      if (req.headers.cookie) {
        return import('cookie').then((cookie) => {
          const parsed = cookie.parse(req.headers.cookie);
          if (!parsed[COOKIE_NAME]) {
            return;
          }
          return parsed[COOKIE_NAME];
        });
      }
    }
    if (process.client) {
      return new Promise((resolve, reject) => {
        const unsubscrobe = app.$fire.auth.onIdTokenChanged((user) => {
          if (user) {
            user.getIdToken(true).then((idToken) => {
              resolve(idToken);
            }, () => {
              resolve(null);
            });
          } else {
            resolve(null);
          }
        });
      });
    }
    return null;
  };

  $axios.onError((error) => {
    if (error && error.response && error.response.status === 401) {
      return redirect('/auth/login');
    }
  });

  $axios.onRequest(async (config) => {
    if (config.url.startsWidth('/api/')) {
      config.baseURL = process.env.API_BASE_URL;
    }

    const idToken = await getToken();
    if (idToken && !config.headers.Authorization) {
      config.headers = {
        Authorization: `Bearer ${idToken}`,
        ...config.headers
      };
    }

    if (!config.headers['Access-Control-Allow-Origin']) {
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        ...config.headers
      };
    }

    return config;
  });

  $axios.onResponse((response) => {
    console.log('Response headers: ', response.headers.toJSON(true));
    return response;
  });
}
