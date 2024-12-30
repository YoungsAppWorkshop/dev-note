# Professional React Native

## Ch 1. What is React Native?

A `prop` is a parameter that is transferred from a parent component to a child component. What makes React so efficient is the fact that any time the value of a `prop` changes, only those components that are affected by that change are rerendered. This massively reduces the rerendering costs, especially for large applications with many layers.

React Native is a framework that makes it possible to write React code and deploy it to multiple platforms. The most well known are iOS and Android, but you can use React Native to create apps for Windows, macOS, Oculus, Linux, tvOS, and much more. With React Native for Web, you can even deploy a mobile application as a web app using the same code.

React Native does not use web views to render the JavaScript code on the device like some other cross-platform solutions; instead, it converts the UI written in JavaScript into native UI elements.

React Native is powered by two threads – the JavaScript thread, where the JavaScript code is executed, and the native thread (or UI thread), where all device interaction such as user input and drawing screens happens. The communication between these two threads takes place over the so-called Bridge, which is a kind of interface between the JavaScript code and the native part of the app. But it also has some downsides. The serialization and deserialization of information, as well as being the only central point of communication between native and JS, makes the bridge a bottleneck that can cause performance issues in some situations.

Because of the architectural problems mentioned previously, the React Native core was rearchitectured and rewritten completely. The main goal was to get rid of the Bridge and the performance issues tied to it. This was done by introducing JSI, the JavaScript interface, which allows direct communication between native and JavaScript code without the need for serialization/deserialization. The JS part is truly aware of the native objects, which means you can directly call methods synchronously. Also, a new renderer was introduced during the rearchitecture, which is called Fabric.

While React Native is a very lean framework when it comes to core components and native functionality, Expo provides nearly every functionality that you can think of using in your app. Since everything comes with a downside, Expo adds some size to your final app bundle, because you add all the libraries to your app whether you use them or not. It also uses a somehow modified version of React Native, which is normally one or two versions behind the latest React Native version. So, when working with Expo, you have to wait for the latest React Native features a couple of months after they are released.

I would recommend using Expo if you want to achieve results at maximum speed and don’t have to optimize your bundle size.

If you choose the bare workflow, you have a plain React Native app and can add the Expo libraries you need. You can also add other third-party libraries, which is not possible in the managed workflow. Expo suggests that you start with a managed workflow for a new app because it is always possible to switch over to a bare workflow, if necessary, by using the expo eject command in the CLI.

## Ch 2. Understanding the Essentials of JavaScript and TypeScript

This is where transcompilers such as [Babel](https://babeljs.io) come into play. These transcompilers convert modern JavaScript into a backward-compatible version, which can build process in modern web applications as well as in React Native apps.

When writing modern JavaScript applications, it works like this:

1. You write your code in modern JavaScript.
2. A transcompiler converts your code to pre-ES6 JavaScript.
3. A JavaScript engine interprets your code and transforms it into bytecode, which is then executed on the machine.
4. Modern JavaScript engines optimize execution with features such as just-in-time compilation.

Primitives are assigned and passed by values, while objects are assigned and passed by references. This means for primitives, a real copy of the value is created and stored, while for objects, only a new reference to the same object is created and stored. This is important to keep in mind, because when you edit an assigned or passed object, you also edit the initial object.

As Robert C. Martin already wrote in the book Clean Code, functions should have no side effects, which means they should not change values outside of the function’s scope.

### Creating real copies of an object

```js
const car = {
  color: 'red',
  extras: {
    radio: "premium",
    ac: false
  },
  sellingDate: new Date(),
  writeColor: function() {
    console.log('This car is ' + this.color);
  }
};
const _car = {...car};
const _car2 = Object.assign({}, car);
const _car3 = JSON.parse(JSON.stringify(car));
car.extras.ac = true;

console.log(_car);  // extras: { ..., ac: true }, ...
console.log(_car2); // extras: { ..., ac: true }, ...
console.log(_car3); // sellingDate: '2024-08-31T06:01:27.202Z', no function
```

Spread operator and `Object.assign` work the same way. They create a **shallow clone**, which means they clone all property values of the object. This works great for values, but it doesn’t for complex data types, because objects are assigned by reference. So these ways of cloning objects work fine for objects with just one level. As soon as there is an object with multiple levels, cloning with the spread operator or `Object.assign` can create serious problems in your application.

`Stringify` and `parse` again forces a deepclone, which means even sub-objects are copied by value. The downside of this approach is that it only works for values that have an equivalent in JSON. So, you will lose all functions, properties that are undefined, and values such as infinity that do not exist in JSON. Other things such as date objects will be simplified as strings, resulting in a lost time zone.

When you want to create a **real deepclone** of an object, I would recommend using a well-tested and maintained library such as [Lodash](https://lodash.com/). It offers a simple `cloneDeep` function, which does the work for you.

### Destructuring & spread operator

When working with destructuring, you can also collect all the elements that weren’t specified during the destructuring. This is done with the spread operator, as described in the following section.

```js
const person = {
     firstName: '￼￼￼n',
     lastName: 'Doe',
     age: 33,
     height: 176
}
const {firstName, age, ...rest} = person;

console.log(firstName); // John
console.log(age); // 33
console.log(Object.keys(rest).length); // 2
```

### Understanding `this` in JavaScript

By default, `this` is bound to the global scope. This can be changed via implicit or explicit binding. **Implicit binding** means that if a function is called as part of an object, `this` always refers to the object. **Explicit binding** means that you can bind `this` to another context.

```js
class MyClass extends Component {
  constructor(props){
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(event){
    console.log(this);
  }

  render(){
    return (
      <Pressable type="button" onPress={this.handlePress}>
        <Text>Button</Text>
      </Pressable >
    );
  }
}
```

In the preceding code, we bind the this value of the class explicitly to the `handlePress` function. This is necessary, because if we don’t do it, `this` would be implicitly bound to the object where it is called, which in this case would be anywhere in the `Pressable` component.

The important thing here is that arrow functions always use the lexical scope of `this`, which means they won’t rebind `this` implicitly. The following example shows how to use arrow functions to make explicit binding statements redundant:

```js
class MyClass extends Component{
  handlePress = (event) => {
    console.log(this);
  }

  render(){
    return (
      <Pressable type="button" onPress={this.handlePress}>
        <Text>Button</Text>
      </Pressable >
    );
  }
}
```

### Patching callback libraries

When working with React Native, you will find some libraries that work with callbacks in their JavaScript. This is because the transfer between the JavaScript and React Native contexts relies on callbacks in most cases.

I would recommend patching these libraries and reworking them to provide a promise API, which you can then use with async/await in your project. This is quite simple and improves the code quality a lot. A very simple example is shown in the following code block:

```js
// libraryFunction(successCallback, errorCallback);
const libraryFunctionPromise = new Promise((resolve, reject) => {
  libraryFunction(resolve, reject);
}
```

## Ch 3. Hello React Native

One of the best things about React Native is that it is very flexible when it comes to how you use it.

1. You can choose Expo, which handles all the native part for you and allows you to complete your first app in hours. It also makes it possible to build iOS apps without having a Mac.
2. But you also can go with a bare React Native workflow, which gives you a lot of options in terms of how you integrate your React Native app into your whole development landscape.
3. You can also integrate or even write your own (native) libraries.
