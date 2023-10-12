 /*eslint-disable*/
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Keycloak from 'keycloak-js';
Vue.config.productionTip = false;

import singleSpaVue from "single-spa-vue";

require('./style.css');

let initOptions = {
  url: `http://localhost:9090/`,
  realm: `master`,
  clientId: `master`,
  onLoad: `login-required`,
};

let keycloak = new Keycloak(initOptions);
let useKeycloak = false;
let vueLifecycles;

init();

function init() {
  keycloak.init({
    onLoad: initOptions.onLoad,
  }).then(auth => {
    const ONE_MINUTE = 60000;
  
    if (!auth) {
      window.location.reload();
    } else {
      console.info(`Auth ok`);
    }

    Vue.prototype.$OAuth = keycloak

    useKeycloak = true;
    
    window.setTimeout(refreshToken.bind(null, keycloak), ONE_MINUTE);

  }).catch(() => {
    console.error(`Auth Fail`);
  })
}

if (useKeycloak) {
  vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
      vuetify: vuetify,
      router,
      render: h => h(App, {
        props: {
          OAuth: keycloak,
        },
      }),
    }
  });
} else {
  vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
      vuetify: vuetify,
      router,
      render: h => h(App),
    }
  });
}

function refreshToken() {
  keycloak.updateToken(70).then(refreshed => {
    if (refreshed) {
      successRefresh(refreshed);
    } else {
      warnRefresh();
    }
  }).error(errorRefresh);
}

function successRefresh(refreshed) {
  console.debug(`Token refreshed ${refreshed}`);
}

function warnRefresh() {
  console.warn(`Token not refreshed, valid for 
  ${Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000)} seconds`);
}

function errorRefresh() {
  console.error('Failed to refresh token');
}

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

