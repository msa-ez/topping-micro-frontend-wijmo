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

{{#viewes}}
    {{#ifEquals dataProjection "cqrs"}}
import {{namePascalCase}}View from "./components/{{namePascalCase}}View"
    {{/ifEquals}}
{{/viewes}}

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {{#aggregates}}
        { 
            path: '/{{../nameCamelCase}}/{{namePlural}}',
            name: '{{namePascalCase}}Manager',
            component: {{namePascalCase}}Manager,
        },
    {{/aggregates}}
    {{#views}}
        {{#ifEquals dataProjection "cqrs"}}
        {
            path: '/{{namePlural}}',
            name: '{{namePascalCase}}View',
            component: {{namePascalCase}}View,
        },
        {{/ifEquals}}
    {{/views}}
    ]
})
