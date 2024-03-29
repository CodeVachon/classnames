# @codevachon/classnames

A Library Used for managing ClassNames in Javascript.

-   [TypeDoc](https://codevachon.github.io/classnames/)
-   [GitHub](https://github.com/CodeVachon/classnames)
-   [npm](https://www.npmjs.com/package/@codevachon/classnames)

## Install

```sh
pnpm add @codevachon/classnames
```

```sh
yarn add @codevachon/classnames
```

```sh
npm install @codevachon/classnames
```

## Usage

```tsx
import { ClassNames } from "@codevachon/classnames";

export default function Homepage() {
    return (
        <div
            className={new ClassNames([
                "bg-slate-900 text-white",
                "flex justify-center items-center",
                "h-screen w-full"
            ]).list()}
        >
            <h1 className={new ClassNames(["text-6xl"]).list()}>Hello World</h1>
        </div>
    );
}
```

## API

### .add()

Adds a class to the instance

```js
import { ClassNames } from "@44north/classnames";

const list = new ClassNames("a", "b", "c").list();
// list => "a b c"
```

```js
const list = new ClassNames().add("a", "b", "c").list();
// list => "a b c"
```

```js
const list = new ClassNames().add(["a", "b", "c"]).list();
// list => "a b c"
```

```js
const list = new ClassNames().add("a b c").list();
// list => "a b c"
```

```js
const list = new ClassNames().add(["a b c"]).list();
// list => "a b c"
```

```js
const list = new ClassNames("a").add(new ClassNames(["b", "c"])).list();
// list => "a b c"
```

### .remove()

removes a class from the instance

```js
const list = new ClassNames().add(["a", "b", "c"]).remove("a").list();
// list => "b c"
```

```js
const list = new ClassNames().add(["a", "b", "c"]).remove(["a", "c"]).list();
// list => "b"
```

```js
const list = new ClassNames().add(["a", "b", "c"]).remove("a", "c").list();
// list => "b"
```

```js
const list = new ClassNames().add(["mt-3", "mb-4", "pt-8"]).remove(new RegExp("t-")).list();
// list => "mb-4"
```

### .list() / .toString()

returns this instance as a class formated string.

```js
const list = new ClassNames().add(["a", "b", "c"]).list();
// list => "b c"
```

```jsx
<h1 classNames={new ClassNames("text-xl").list()}>Hello World!</h1>
```

### .find()

allows you to search the instance for a particular class

```js
const list = new ClassNames().add(["a", "b", "c"]).find("b");
// list => ["b"]
```

```js
const list = new ClassNames().add(["mt-3", "mb-4", "pt-8"]).find(new RegExp("b"));
// list => "mb-4"
```

### .isEmpty()

returns if the instance has any classes

```js
const value = new ClassNames(["a", "b", "c"]).isEmpty();
// value => false
```

### .has()

returns if the instance has the provided value

```js
const value = new ClassNames(["a", "b", "c"]).has("b");
// value => true
```

```js
const value = new ClassNames(["mt-3", "mb-4", "pt-8"]).has(new RegExp("z-"));
// value => false
```

### .isClassNames()

returns if the provided value is an instance of ClassName

```js
const value = new ClassNames().isClassName(["a"]);
// value => false
```

### .length

returns the number of classes added to the instance

```js
const value = new ClassNames(["a", "b", "c"]).length;
// value => 3
```

## Conditionals

You can pass an object as part of add with the classname as a key and value as a boolean.

```js
const values = {
    a: true,
    b: false,
    c: a !== b
};

const list = new ClassNames(values).list();
// list => "a c"
```

## Switch

as of `1.1.0` you use a Switch like statement to change between values and set a default if the value is not found

```js
const size = "xs";

const list = new ClassNames()
    .switch(
        size,
        {
            xs: "p-1",
            sm: "p-2",
            lg: "p-8",
            xl: "p-12"
        },
        "p-4"
    )
    .list();
// list => "p-1"
```

as of `1.3.0` you can pass a `UNION` generic to help populate the options object

```ts
const size = "xs";
type Size = "xs" | "sm" | "lg" | "xl" | "default";

const list = new ClassNames()
    .switch<Size>(
        size,
        {
            xs: "p-1",
            sm: "p-2",
            lg: "p-8",
            xl: "p-12"
        },
        "p-4"
    )
    .list();
// list => "p-1"
```

## If Condition

as of `1.2.0` you use add an If Conditions

```js
const size = "xs";

const list = new ClassNames().if(size === "xs", "rounded-sm", "rounded").list();
// list => "rounded-sm"
```

## Static Methods

-   .add() - Alias of `new ClassNames().add()`
-   .isClassNames() - Alias of `new ClassNames().isClassNames()`
