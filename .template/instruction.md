# 

## Local development

### Run the root-config:

```
cd microfrontend-root
npm i
npm run start
```

In the browser console, run the following:
```
localStorage.setItem("devtools", true);
```

## Run the home project:

```
cd microfrontend-home
npm i
npm run build
npm run serve:standalone
```

Set an import map override to https://localhost:9090/js/app.js.
