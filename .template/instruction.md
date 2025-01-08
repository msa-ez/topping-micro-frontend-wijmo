# Microfrontend with Single-SPA + VueJS and Wijmo

### Benefits of Using Microfrontend

#### Independent Deployment and Updates: With a micro frontend approach, each module can be deployed and updated independently. This means you can make changes to specific modules without needing to redeploy the entire application, allowing for faster rollouts of updates.

#### Smaller Codebases: Each micro frontend module has its own codebase, making the code smaller and easier to manage. This is especially useful for large-scale projects where low coupling between modules improves maintenance and simplifies testing.

#### Faster Development and Better Team Collaboration: Multiple teams can work independently on different modules, which speeds up development. Since each team only needs to focus on their specific module, collaboration becomes more efficient with fewer dependencies.

#### Improved Scalability: Micro frontends allow new features to be added as separate modules without heavily impacting existing code, making scaling easier. SingleSPA supports easy registration and loading of new modules, making it easier to expand functionality.

#### Better User Experience: By loading only the required modules, initial load times can be reduced, which improves the user experience. Additionally, SingleSPA enables partial updates, allowing for a smoother experience by providing new functionality without reloading the entire page.

### Project Structure
```
├── microfrontend-root (Root Application)
├── microfrontend-home (Navigation Application)
├── microfrontend-1 
│ └── frontend (Microfrontend Application)
├── microfrontend-2 
│ └── frontend (Microfrontend Application)
```
### microfrontend-root
#### This is the root application that manages all micro frontend applications. It configures Single-SPA and determines which micro frontend application to activate based on the URL path.

- microfrontend-root/src/index.ejs

It serves as a template to manage the load and settings of each module.
``` 
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- existing code -->
    <script type="systemjs-importmap">
      {
        "imports": {
          "@my-app/home": "//localhost:9090/js/app.js", // Navigation Application Module
          "@my-app/microfrontend-1": "//localhost:9002/js/app.js", // Microfrontend Application Module
          "@my-app/microfrontend-2": "//localhost:9003/js/app.js", // Microfrontend Application Module
          <!-- add more micro frontend modules here -->
          <!-- "@my-app/microfrontend3": "//localhost:9004/js/app.js", -->
          "@my-app/root-config": "/root-config.js" // Root Configuration
        }
      }
    </script>
    <!-- existing code -->
  </head>
<body>
  <script>
    System.import('@my-app/root-config'); // Load the root configuration
  </script>
  <import-map-overrides-full show-when-local-storage="devtools" dev-libs></import-map-overrides-full>
</body>
</html>
```
- microfrontend-root/src/root-config.js

Manage the overall structure of the application by defining the path and activation conditions of each micro frontend.
```
import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(`
<single-spa-router mode="hash" base="/">
  <route default>
    <application name="@my-app/home"></application>
  </route>
  <!-- This path attribute specifies the URL path that activates the micro frontend application. 
    Any URL starting with "/microfrontend-1" will load the microfrontend-1 application. -->
  <route path="microfrontend-1">
    <application name="@my-app/microfrontend-1"></application>
  </route>
  <route path="microfrontend-2">
    <application name="@my-app/microfrontend-2"></application>
  </route>
  <!-- add more micro frontend modules here -->
  <!-- <route path="microfrontend-3">
    <application name="@my-app/microfrontend-3"></application>
  </route> -->
</single-spa-router>
`);

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
```


### microfrontend-home
#### A Vue.js-based micro frontend application that serves as navigation. It is injected into the single-SPA environment through the adapter library, Single-SPA-Vue. And it provides the main page with the basic navigation menu and links to the paths of each micro frontend application configured in the root application.

- microfrontend-home/package.json
```
// ... existing code ...

"dependencies": {
  "single-spa-vue": "^2.1.0", // Single-SPA adapter library
  "vue": "^2.6.11",
  "vue-router": "^3.4.3",
  "vuetify": "^2.6.0"
},

// ... existing code ...
```
- microfrontend-home/src/main.js
```
import Vue from 'vue';
import App from './App.vue';
import singleSpaVue from "single-spa-vue";

/** ... existing code ... */

let vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    vuetify: vuetify,
    router,
    render: h => h(App),
  }
});

// The 'singleSpaVue' function converts the Vue.js application to a single spa application and stores the result in 'vueLifecycle'.

/** ... existing code ... */

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;

// The 'bootstrap', 'mount', and 'unmount' methods are exported from 'vueLifecycles' to manage the startup, mounting, and unmount processes of the application in a single-spa architecture.
```

### microfrontend-1/frontend

#### Independent Micro frontend application. It has its own lifecycle for managing state independently, making it easier to maintain due to its low coupling with other modules. It is registered in the Single-SPA environment through an adapter library like Single-SPA-Vue. For example, [microfrontend-home](#microfrontend-home).

## How to run
#### 1. Run the Microfrontend Root:
```
cd microfrontend-root
npm i
npm run start
```

#### 2. Run the Navigation:
```
cd microfrontend-home
npm i
npm run build
npm run serve:standalone
```

#### 3. Run the Microfrontend Application:
```
cd microfrontend-1/frontend  // enter the micro frontend directory that was created.
npm i
npm run serve
```

#### 4. Set an Import Map Override.
##### 1. Connect to http://localhost:8080. Press f12 to open the DevTools. In the browser console, run the following:
```
localStorage.setItem("devtools", true);
```
##### 2. Press f5 to refresh and click on the "{…}" button in the browser.
![image](https://github.com/user-attachments/assets/be6a1e51-2c74-45a5-a5c8-588cb165f5f9)
##### 3. In Import Map Override, check the status of each module.
![image](https://github.com/user-attachments/assets/bfcc7dd4-68bb-497f-bcca-15892ad8f50e)
##### 4. If the domain address is different, click the module to open the Edit URL popup and type the actual valid URL in the Override URL.
![image](https://github.com/user-attachments/assets/db16be36-0aa6-4d15-8738-6eecb396324f)

The default URL for "@my-app/home" is "//localhost:9090/js/app.js".

### Example : Fish ERP
#### EventStorming Model
![image](https://github.com/user-attachments/assets/aba48b93-a131-455e-9dfd-e9f8bd46e241)

#### Source Tree
![image](https://github.com/user-attachments/assets/468f4266-9e64-4c49-a271-1c6a486fdd01)

microfrontend-root: Root Configuration <br>
microfrontend-home: Navigation <br>
master: Microfrontend Application responsible for registering and managing accounts and items. <br>
purchase: Microfrontend Application focused on the creation and management of purchases. <br>

```
// microfrontend-root/src/index.ejs

<!-- existing code -->
    <script type="systemjs-importmap">
      {
        "imports": {
          "@my-app/home": "//localhost:9090/js/app.js",
          "@my-app/master": "//localhost:9002/js/app.js",
          "@my-app/purchase": "//localhost:9003/js/app.js",
          "@my-app/root-config": "/root-config.js"
        }
      }
    </script>
<!-- existing code -->


// microfrontend-root/src/root-config.js

import { registerApplication, start } from 'single-spa';
import { constructApplications, constructRoutes, constructLayoutEngine } from 'single-spa-layout';

const routes = constructRoutes(`
<single-spa-router mode="hash" base="/">
  <route default>
    <application name="@my-app/home"></application>
  </route>
  <route path="master">
    <application name="@my-app/master"></application>
  </route>
  <route path="purchase">
    <application name="@my-app/purchase"></application>
  </route>
</single-spa-router>
`);

// ... existing code ...

```

Implemented Screen (url: http://localhost:8080/#/)
![image](https://github.com/user-attachments/assets/66423840-f7b9-4c51-9974-245a85cc64d2)
