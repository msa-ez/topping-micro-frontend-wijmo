# Microfrontend with Single-SPA + VueJS and Wijmo

### Benefits of Using Microfrontend

#### Independent Deployment and Updates: With a micro frontend approach, each module can be deployed and updated independently. This means you can make changes to specific modules without needing to redeploy the entire application, allowing for faster rollouts of updates.

#### Smaller Codebases: Each micro frontend module has its own codebase, making the code smaller and easier to manage. This is especially useful for large-scale projects where low coupling between modules improves maintenance and simplifies testing.

#### Faster Development and Better Team Collaboration: Multiple teams can work independently on different modules, which speeds up development. Since each team only needs to focus on their specific module, collaboration becomes more efficient with fewer dependencies.

#### Improved Scalability: Micro frontends allow new features to be added as separate modules without heavily impacting existing code, making scaling easier. SingleSPA supports easy registration and loading of new modules, making it easier to expand functionality.

#### Better User Experience: By loading only the required modules, initial load times can be reduced, which improves the user experience. Additionally, SingleSPA enables partial updates, allowing for a smoother experience by providing new functionality without reloading the entire page.

### Project Structure

- **microfrontend-root**
##### ![image](https://github.com/user-attachments/assets/dadbfb57-03a1-4e39-aa0c-4cf9a63d959f)
Root Application. This is the top-level application responsible for configuring SingleSPA and managing the routing across the entire application. It controls the loading of sub-applications and provides functionality for page transitions or module loading as needed.
- indes.ejs
```
<script type="systemjs-importmap">
  {
    "imports": {
      "@my-app/home": "//localhost:9090/js/app.js",
      "@my-app/sub-1": "//localhost:9001/js/app.js",
      "@my-app/sub-2": "//localhost:9002/js/app.js",
      "@my-app/root-config": "/root-config.js"
    }
  }
</script>
```
- root-config.js
```
const routes = constructRoutes(`
<single-spa-router mode="hash" base="/">
  <route default>
    <application name="@my-app/home"></application>
  </route>
  <route path="sub-1">
    <application name="@my-app/sub-1"></application>
  </route>
  <route path="sub-2">
    <application name="@my-app/sub-2"></application>
  </route>
</single-spa-router>
`);
```

- **microfrontend-home**
##### ![image](https://github.com/user-attachments/assets/85e6fa1c-8ee4-4ebb-915a-7071120881b8)
Navigation. This application provides a default navigation menu and main page that link to each sub-application route configured by the root application.

- **frontend**
##### ![image](https://github.com/user-attachments/assets/f4c50e9b-28c7-4671-a7d9-96ac93dae2e7)
Frontend of Sub Application. Each application, configured as an independent micro frontend module, manages its own state and view and is loaded independently on specific routes or pages.

### How to run
#### 1. Run the Microfrontend Root:
```
cd microfrontend-root
npm i
npm run start
```

#### 2. Run the Navigation Home:
```
cd microfrontend-home
npm i
npm run build
npm run serve:standalone
```

#### 3. Run the Frontend of Sub Application:
```
cd <sub-application-name>
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
