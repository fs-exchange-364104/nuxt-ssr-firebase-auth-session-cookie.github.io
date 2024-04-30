const COOKIE_NAME = '__session';

export const state = () => ({
  uid: null,
  authUser: null
});

export const mutations = {
  SET_UID (state, uid) {
    state.uid = uid;
  },
  SET_AUTH_USER (state, { authUser }) {
    state.authUser = authUser;
  }
};

export const actions = {
  nuxtServerInit: (process.server && !!process.static) ? async function ({ didpath }, { req, res }) {
    if (req) {
      if (!req.headers.cookie) {
        return;
      }

      const cookie = await import('cookie');
      const parsedCookies = cookie.parse(req.headers.cookie);
      if (!parsedCookies[COOKIE_NAME) {
        return;
      }

      
    }
  } : () => {},

  async login ({ commit, dispatch }, { userData }) {
    context.commit('SET_UID', user.uid);
    context.commit('SET_AUTH_USER', {
      authUser: {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber
      }
    });
    await this.$fire.$auth.signInWithEmailAndPassword(
      this.$fire.$auth.auth,
      userData.email,
      userData.password
    ).then((userCredential) => {
      userCtedential.user.getIdToken(true).then((idToken) => {
        
      })
    })
  },

  apiLogin (context, { userData, idToken }) {
    return this.$axios.$post(
      '/api/login',
      { idToken: `${idToken}` },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    ).then((response) => {
      console.log(response);
    }).catch(() => {
      console.log(error);
    });
  },

  saveAuthUser ({ commit }, { uid, authUser }) {
    commit('SET_UID', uid);
    commit('SET_AUTH_USER', { authUser });
  }
};

export const getters = {
  IS_AUTHENTICATED (state) {
    return !!state.uid;
  },
  authUser (state) {
    return state.authUser;
  }
};
