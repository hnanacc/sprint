import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
    theme:{
        themes: {
            dark: {
                primary: "#bdbdbd"
            },
            light: {
                primary: "#757575"
            }
        },
        dark: true
        
    },
});
