# JSX到浏览器dom的过程



JSX 是一种JS和HTML混合的语法,将组件的结构、数据甚至样式都聚合在一起定义组件。



### 1. jsx 到 js 结构

```js
import React from './react';
import ReactDOM from './react-dom';

let element = (
  <h1 id="id1">
    <span>hello</span>
    <span>world</span>
  </h1>
);

ReactDOM.render(element, document.getElementById('root'));
```

比如我们想把一组最简单的 jsx 元素渲染到页面上 `<h1 id="id1"><span>hello</span><span>world</span></h1>`，[bable](https://www.babeljs.cn/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwCwjABAlgJgvAIlmBA-AUBLFgGcAOAhgHaogCmANpQPbAD0BJG2OTpA7jQE6UwPsWOeuFRA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.11.6&externalPlugins=)会帮我们把 jsx 转成 js 语法结构

```js
React.createElement(
  "h1",
  {id: "id1"}, 
	React.createElement("span", null, "hello"),
	React.createElement("span", null, "world")
);
```

### 2.js 结构到 vdom

我们按照这个编写出 React 的 createElement 方法，createElement 方法会按照结构创建 vdom

```js
// react.js

const hasSymbol = typeof Symbol === 'function' && Symbol.for
export const REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
}
function createElement(type, config, children) {
  // 保存 props
  const props = {}
  for (const propName in config) {
    if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  // 保存 children
  const childrenLength = arguments.length - 2
  if (childrenLength === 1) { // 如果 childer 只有一个，可以是 string、对象、ReactNode
    props.children = children
  } else if (childrenLength > 1) { // 如果 childer 有一个以上，外面包一层数组
    const childArray = Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2]
    }
    props.children = childArray
  }

  return { $$typeof: REACT_ELEMENT_TYPE, type, props } // REACT_ELEMENT_TYPE 标记React元素 

}

export default {
  createElement,
}
```



创建出来的 vdom 是这样的

```js
{
  "type":"h1",
   "props":{
     "id":"id1",
      "children":[
        {"type":"span", "props":{"children":"hello"}},
        {"type":"span","props":{"children":"world"}}
      ]
   }
}
```



### 3.渲染 vdom

编写 ReactDOM 的 render 方法把 vdom 渲染到页面上

```js
// react-dom.js

function render(node, parent) {
    if (typeof node === 'string') { // 中止条件，如果节点为 string ，则为最小元素
        return parent.appendChild(document.createTextNode(node))
    }
    let type = node.type
    let props = node.props
    let domElement = document.createElement(type)
    for (const propName in props) {
        if (propName === 'children') {
            let children = props.children // 可能是一个数组、对象、string
            if (!Array.isArray(children)) {
                children = [children]
            }
            // children 需要递归渲染
            children.forEach(child => render(child, domElement))
        } else if (propName === 'className') {
            domElement.className = props.className
        } else if (propName === 'style') {
            let styles = props.style
            for (const key in styles) {
                domElement.style[key] = styles[key]
            }
        } else {
            domElement.setAttribute(propName, props[propName]) // id、title 等属性
        }
    }
    parent.appendChild(domElement)
}

export default {
    render
}

```

![image-20201008110217199](http://qiniu.zwhid.online/uPic/19-18-59-yamCC9.png)

### 4.拓展，渲染函数组件

如果我们想渲染下面这种函数组件

```js
import React from './react';
import ReactDOM from './react-dom';

function Welcome(props) {
  return (
    <h1 id={props.id}>
      <span>hello</span>
      <span>world</span>
    </h1>
  )
}

ReactDOM.render(<Welcome id="id1" />, document.getElementById('root'));
```

函数运行后返回的也是 JSX，所以只需要判断一下如果 type 为函数时，运行并传参 props，得到 JSX 就可以了

```js
// react-dom.js

// ....
let props = node.props
if (typeof type === 'function'){
  let element = type(props)
  type = element.type
  props = element.props
}
let domElement = document.createElement(type)
// ....
```

![image-20201008110300912](http://qiniu.zwhid.online/uPic/19-19-09-8HHbGp.png)

### 5.渲染类组件

如果我们想渲染下面这种类组件

```js
import React from './react'
import ReactDOM from './react-dom'

class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <h1 id={this.props.id}>
        <span>hello</span>
        <span>world</span>
      </h1>
    )
  }
}

ReactDOM.render(<Welcome id="id1" />, document.getElementById('root'));
```

类组件的渲染时也是函数，这样会和函数组件混淆。不过类组件继承 React.Component，我们可以在React.Component 中定义一个静态变量 isReactComponent，标识这是一个类组件

```js
// react.js

class Component {
  constructor(props) {
    this.props = props
  }
  static isReactComponent = {} // 标识 类组件
}

export default {
  createElement,
  Component
}
```

```js
// react-dom.js

// ... 
let props = node.props
 if (type.isReactComponent){ // 类组件
   let element = new type(props).render()
   type = element.type;
   props = element.props;
 } else if (typeof type === 'function'){ // 函数组件
   let element = type(props)
   type = element.type
   props = element.props
 }
let domElement = document.createElement(type)
// ...
```

![image-20201008112514954](http://qiniu.zwhid.online/uPic/19-19-16-sLyTHz.png)