# Frontend Development Projects with Vue.js 3

## Ch 01. Starting Your First Vue Project

### Option API vs Composition API

```vue
<!-- Option API -->
<template>
  <Exercise />
</template>

<script>
import Exercise from './components/Exercise1-01'

export default {
  components: {
    Exercise,
  },
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<!-- Composition API -->
<script setup>
import logo from 'components/logo.vue'

const color = 'red';
</script>

<template>
  <header>
    <a href="mywebsite.com">
      <logo />
    </a>
  </header>

  <div>{{color}}</div>
</template>
```

### Understanding Vue directives

#### `v-text`

The `v-text` directive has the same reactivity as with interpolation. Interpolation with `{{ }}` is more performant than the v-text directive. However, you may find yourself in situations where you have pre-rendered text from a server and want to override it once your Vue application has finished loading.

```vue
<template>
  <div v-text="msg">My placeholder</div>
</template>
<script setup>
const msg = "My message"
</script>
```

#### `v-once`

When used, it indicates the starting point of static content. The Vue engine will render the component with this attribute and its children exactly once. It also ignores all data updates for this component or element after the initial render.

#### `v-html`

Vue will parse the value passed to this directive and render your text data as a valid HTML code into the target element. We don't recommend using this directive, especially on the client side, due to its performance impact and the potential security leak. The script tag can be embedded and triggered using this directive.

#### `v-bind`

This directive is one of the most popular Vue features. You can use this directive to enable one-way binding for a data variable or an expression to an HTML attribute, as shown in the following example:

```vue
<script setup>
const logo = '../assets/logo.png';
</script>

<template>
  <img v-bind:src="logo" />

  <!-- A shorter way is using the :attr syntax instead of v-bind:attr  -->
  <img :src="logo" />
</template>
```

#### `v-if`

This is a powerful directive you can use to conditionally control how elements render inside a component.

```vue
<template>
  <div v-if="count === 2">Two</div>
  <div v-else-if="count === 4">Four</div>
  <div v-else-if="count === 6">Six</div>
  <div v-else>Others</div>
</template>
```

#### `v-show`

You can also control the visible state of HTML elements by using `v-show`. If `v-show` results in a `true` Boolean, it will leave the DOM element as is. If it resolves as `false`, it will apply the `display: none` style to the element.

#### `v-for`

We use the `v-for` directive to accomplish the goal of list rendering based on a data source.

### Enabling two-way binding using `v-model`

Vue achieves two-way data binding by creating a dedicated directive that watches a data property within your Vue component. The `v-model` directive triggers data updates when the target data property is modified on the UI. This directive is usually useful for HTML form elements that need to both display the data and modify it reactively.

```vue
<template>
    <input v-model="name" />
</template>
<script>
  export default {
    data() {
      return {
        name: ''
      }
    }
  }
</script>
```

- Binding a huge amount of data using v-model can affect the performance of your application.
- Vue data in the local state is not immutable and can be redefined anywhere in the template.

### Basic iteration using `v-for`

The basic syntax of `v-for` is as follows:

`v-for="(item, index) in items" :key="index"`

```vue
<template>
<div v-for="n in 5" :key="`loop-2-${n}`">
    {{ n }}
</div>

<!-- Iterating through an array of objects -->
<ul>
  <li v-for="(item, index) in items" :key="item.id">
    <h2>{{ item.title }}</h2>
    <span>{{ item.description }}</span>
  </li>
</ul>
</template>

<!-- Iterating through the properties of Object -->
<script setup>
const information = {
  title: "My list component information",
    subtitle: "Vue JS basics",
    items: ["Looping", "Data", "Methods"],
  }
</script>
<template>
  <div>
    <div v-for="(value, key) in information" :key="key">
      {{key}}: {{ value }}
    </div>
  </div>
</template>
```

### Exploring methods

In Vue 2.0, Vue defines component methods inside the methods object as part of a Vue instance. You compose each component method as a normal JavaScript function. The Vue method is scoped to your Vue component and can be run from anywhere inside the component it belongs to. It also has access to the `this` instance, which indicates the instance of the component:

```vue
<script>
export default {
  methods: {
    myMethod() { console.log('my first method'); }
  }
}
</script>

<!-- From Vue 3.0 -->
<script setup>
const myMethod = () => { console.log('my first method'); }
</script>

<template>
  <button id="click-me" v-on:click="myMethod">Click me</button>
  <button id="click-me" @click="myMethod">Click me shorter</button>
</template>
```

When binding events to HTML elements in Vue, you would use the `@` symbol. For example, `v-on:click` is equivalent to `@click`.

### Understanding component lifecycle hooks

The Vue component lifecycle events happen during a component's lifecycle, from creation to deletion. They allow us to add callbacks and side effects at each stage of the component's life when necessary. Vue executes the events in order, as follows:

1. `setup`: This event runs before all other hooks, including `beforeCreate`. It doesn't have access to this instance since the instance has not yet been created at this point. It is mainly for using Composition API and is treated in the same way Vue treats script setup.
2. `beforeCreate`: This runs when your component has been initialized. data has not been made reactive and events are not set up in your DOM.
3. `created`: You will be able to access reactive data and events, but the templates and DOM are not mounted or rendered. This hook is generally good to use when requesting asynchronous data from a server since you will more than likely want this information as early as possible before the virtual DOM is mounted.
4. `beforeMount`: A very uncommon hook, as it runs directly before the first render of your component and is not called Server-Side Rendering.
5. `mounted`: Mounting hooks are among the most common hooks you will use since they allow you to access your DOM elements so that non-Vue libraries can be integrated.
6. `beforeUpdate`: This runs immediately after a change to your component occurs and before it has been re-rendered. It's useful for acquiring the state of reactive data before it has been rendered.
7. `updated`: It runs immediately after the `beforeUpdate` hook and re-renders your component with new data changes.
8. `beforeUnMount`: This is fired directly before unmounting your component instance. The component will still be functional until the unmounted hook is called, allowing you to stop event listeners and subscriptions to data to avoid memory leaks. Note this event is called `beforeDestroy` in Vue 2.x.
9. `unmounted`: All the virtual DOM elements and event listeners have been cleaned up from your Vue instance. This hook allows you to communicate that to anyone or any element that needs to know this has been done. This event in Vue 2.x is called `destroyed`.

### Styling components

When using Vue components, the Vite compiler allows you to use almost any frontend templating language style.

Another benefit of using Vue is scoping the style with the scoped attribute. This is a useful way to create isolated and component-specific CSS stylings. It also overrides any other CSS global rules, according to the CSS rule of specificity.

It is not recommended to scope global styles. A common method for defining global styling is to separate these styles into another style sheet and import them into your App.vue file.

### Understanding CSS modules

A recent pattern that has become popular in the reactive framework world is CSS modules. Vue components help to solve this by being modular and allowing you to compose CSS that will generate unique class names for the specific component at compile time.

Using CSS modules in Vue exports CSS styles from the style section into JavaScript modules and uses those styles in the template and logic computing. To enable this feature in Vue, you will need to add the module attribute to the style block, and reference as classes using the `:class` and `$style.<class name>` syntax, as shown here:

```vue
<template>
  <div :class="$style.container">CSS modules</div>
</template>

<style module>
.container {
  width: 100px;
  margin: 0 auto;
  background: green;
}
</style>
```

## Ch 02. Working with Data

### Understanding computed properties

Computed properties are unique data types that will reactively update only when the source data used within the property is updated.

```vue
<script>
export default {
  data() {
    return {
      yourData: "your data"
    }
  },
  computed: {
    yourComputedProperty() {
      return `${this.yourData}-computed`;
    }
  }
}
</script>
```

Let’s look at some examples of where you should consider using a computed property:

- Form validation
- Combining data props
- Calculating and displaying complex information: Sometimes there is a need to perform an extra calculation or to extract specific information from one large data object source.

### Understanding computed setters

By default, computed data is a getter only, which means it will only output the outcome of your expression. In some practical scenarios, when a computed property is mutated, you may need to trigger an external API or mutate the original data elsewhere in the project. The function performing this feature is called a **setter**.

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  method: {
    callAnotherApi() { /* do something */ }
  },
  computed: {
    myComputedDataProp: {
      get() {
        return this.count + 1
      },
      set(value) {
        this.count = value - 1
        this.callAnotherApi(this.count)
      },
    },
  },
}
</script>
```

### Exploring watchers

Vue watchers programmatically observe component data and run whenever a particular property changes. Watched data can contain two arguments: `oldVal` and `newVal`. This can help you when writing expressions to compare data before writing or binding new values. Watchers can observe objects as well as other types, such as `string`, `number`, and `array` types.

If the `immediate` key is set to `true` on a watcher, then when this component initializes, it will run this watcher on creation. You can watch all keys inside any given object by including the key and value `deep: true` (the default is `false`).

To clean up your watcher code, you can assign a `handler` argument to a defined component’s method, which is considered best practice for large projects. Watchers complement the usage of computed data since they passively observe values and cannot be used as normal Vue data variables, while computed data must always return a value and can be looked up. Remember *not* to use arrow functions if you need the Vue context of `this`.


```vue
<script>
export default {
  watch: {
    myDataProperty: {
      handler: function(newVal, oldVal) {
        console.log('myDataProperty changed:', newVal, oldVal)
      },
      immediate: true,
      deep: true
    },
  }
}
</script>
```

If you do not need to observe every key inside an object, it is more performant to assign a watcher to a specific key by specifying it following the syntax <object>.<key> string.

```vue
<script>
export default {
  data() {
    return {
      organization: {
        name: 'ABC',
        employees: ['Jack', 'Jill']
      }
    }
  },
  watch: {
    'organization.name': {
      handler: function(v) {
        this.sendIntercomData()
      },
      immediate: true,
    },
  },
}
</script>
```

### Comparing methods, watchers, and computed properties

Methods are best used as a handler to an event occurring in the DOM, and in situations where you need to call a function or perform an API call, for example, `Date.now()`. All values returned by methods are not cached.

Methods should not be used to display computed data, since the return value of the method, unlike computed props, is not cached, potentially generating a performance impact on your application if misused.

As mentioned, computed props are best used when reacting to data updates or for composing complicated expressions in your template. Computed properties also help increase the readability of your Vue component’s template and logic.

However, in many cases, using computed props can be overkill, such as when you only want to watch a specific data’s nested property rather than the whole data object. Or when you need to listen and perform an action upon any changes of a data property or a specific property key nested inside a data property object, and then perform an action. In this case, data watchers should be used.
