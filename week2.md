### Creating and nesting components

React는 컴포넌트로 구성된다. 컴포넌트는 UI의 조각으로 고유의 로직과 모습을 가지고 있다. 컴포넌트는 버튼 하나와 같은 작은 사이즈 부터 페이지 전체 같은 큰 사이즈까지 다양하다

### Writing markup with JSX

리액트에서 마크업은 JSX라는 것을 사용한다. 단순히 JS 객체로도 마크업이 가능하지만 편의성을 위해 대부분의 프로젝트에서는 JSX를 사용한다.

### Adding styles

컴포넌트에 attribute에 className를 사용하면 CSS의 클래스 처럼 사용할 수 있다.

```
<img className="avatar">

/* In your CSS */
.avatar {
  border-radius: 50%;
}

```

### Displaying data

JSX 내부에서 {}를 사용하면 변수를 넣을 수 있다.

```
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

### Conditional rendering

React에서 조건부로 컴포넌트를 사용하고 싶을 때는 if 문을 이용하면 된다

```JSX
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

혹은 물음표 연산자를 사용하여 아래와 같이도 사용 가능하다

```JSX
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

AND 연산자를 사용할 수도 있다

```JSX
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

### Rendering lists

React에서 컴포넌트를 리스트 형태로 나타낼 경우 다음과 같이 고유한 key값을 넣어준다. 해당 key를 기준으로 React가 수정, 생성, 삭제를 한다.

```JSX
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

### Responding to events

React에서 이벤트를 만들 경우는 아래와 같이 사용한다

```JSX
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### Updating the screen

React에서 컴포넌트 안에서 특정 상태 값을 저장하고 싶을 때는 useState라는 리액트에서 만든 함수를 사용한다. 사용법은 아래와 같이 count의 값을 바꾸고 싶을 때는 setCount 함수에 인자로 값을 넣어주면 된다

```JSX
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

### Using Hooks

위에서 본 useState와 같은 함수들은 React Hooks라고 한다. 여러가지 종류가 있으며 상황에 맞게 쓰임새가 나누어져 있다. 특징으로는 use로 시작하며 항상 컴포넌트의 최상단에 위치해야 한다

### Sharing data between components

서로 다른 컴포넌트가 특정 데이터를 공유하고 싶은 경우에는 가장 가까운 부모 컴포넌트의 값을 이용한다. 부모 컴포넌트는 props로 값과 해당 값을 수정할 수 있는 함수를 자식 컴포넌트로 내려 보낸다.

```JSX
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```
