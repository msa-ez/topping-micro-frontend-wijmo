

forEach: BoundedContext
fileName: router.js
path: {{nameCamelCase}}/frontend/src
---

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


{{#aggregates}}
import {{namePascalCase}}Manager from "./components/ui/{{namePascalCase}}Grid"
{{/aggregates}}

{{#views}}
    {{#ifEquals dataProjection "cqrs"}}
import {{namePascalCase}}View from "./components/{{namePascalCase}}View"
    {{/ifEquals}}
{{/views}}

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {{#aggregates}}
            {
                path: '/{{namePlural}}',
                name: '{{namePascalCase}}Manager',
                component: {{namePascalCase}}Manager
            },
        {{/aggregates}}

        {{#views}}
        {{#ifEquals dataProjection "cqrs"}}

            {
                path: '/{{namePlural}}',
                name: '{{namePascalCase}}View',
                component: {{namePascalCase}}View
            },
        {{/ifEquals}}
        {{/views}}
    ]
})
