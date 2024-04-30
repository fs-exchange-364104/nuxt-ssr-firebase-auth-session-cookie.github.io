import Vue from 'vue';
import Vuetify from 'vuetify';
import colors from 'vuetify/es6/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.pink.darken1,
        secondary: colors.grey.darken3,
        info: colors.teal.darken4,
        error: colors.deeporange.accent3,
        warning: colors.yellow.darken3,
        success: colors.green.darken4
      }
    }
  }
});
