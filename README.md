# 네이버 웹툰 베스트 댓글 검색기

## 1주차 - Typescript 학습

### Typescript를 왜 사용할까?

기존 Javascript는 타입을 표현하는게 불가능 함.  
Javascript에서는 문자열 10과 숫자 10을 더하면 다음과 같이 결과가 나온다.  
"10" + 10 = "1010"  
반면에 타입이 지정되어 있는 Java, C와 같은 언어에서는 위와 같은 입력을 할 경우 에러가 발생한다. 즉 에러가 필요한 상황에 에러가 발생하지 않는 경우가 있다. 이러한 문제를 고치기 위해서 나온 것이 "형"을 명확하게 명시하는 Typescript이다. Typescript를 사용하면 위와 같은 상황에서 에러를 발생시킨다. 즉, 잘못된 입력이 들어왔을 때 사전에 어플리케이션 측에서 알 수 있다.
<br/>
<br/>
<br/>

### 기본 타입

number 숫자형 타입

```typescript
let age: number = 30;
```

<br/>
boolean 참/거짓

```typescript
let isAdult: boolean = true;
```

<br/>
string 문자열 타입

```typescript
let name: string = "James";
```

<br/>
Array 배열 타입

```typescript
let a:number[] = [1,2,3] or let a:Array<number> = [1,2,3]
let people: string = ["James", "Jack", "john"] or let people: Array<string> = ["James", "Jack", "john"]
```

<br/>
Tuple 서로 다른 타입의 값들을 하나에 배열에 넣을 수 있다

```typescript
let b: [string: number];
b = ["z", 1];
```

<br/>
void 함수에서 반환 값이 없는 경우

```typescript
function sayHello() {
  console.log("hello");
}
```

<br/>
never 절대 발생하지 않는 값을 가르키는 경우

```typescript
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function keepProcessing(): never {
  while (true) {
    console.log("I always does something and never ends.");
  }
}
```

<br/>
enum 상수값의 집합을 나타낼 수 있다

```typescript
enum PrintMedia {
  Newspaper,
  Newsletter,
  Magazine,
  Book,
}
// PrintMeida == {
//   "0": "Newspaper",
//   "1": "Newsletter",
//   "2": "Magazine",
//   "3": "Book",
//   "Newspaper": 0,
//   "Newsletter": 1,
//   "Magazine": 2,
//   "Book": 3
// }
```

<br/>

### Interface

주로 오브젝트를 나타내는데 사용된다

```typescript
type Score = "A" | "B" | "C" | "D"; // literal type

interface User {
  name: string;
  age: number;
  gender?: string; // optional 있어도 되고 없어도 됨
  readonly birthday: number;
  [grade: number]: Score; // Index Signatures / key가 숫자 value가 Score
}

let user: User = {
  name: "xx",
  age: 30,
  birthday: 2000,
  1: "A",
  2: "B",
};

// 함수도 나타낼 수 있다
interface Add {
  (num1: number, num2: number): number;
}

const add: Add = (x, y) => {
  return x + y;
};

// 클래스에서도 사용 가능하다
interface Car {
  color: string;
  wheels: number;
  start(): void;
}

interface SportsCar extends Car {
  door: number;
  stop(): void;
}

class McLaren implements SportsCar {
  color;
  wheels = 30;
  door = 20;

  constructor(c: string) {
    this.color = c;
  }

  start() {
    console.log("start");
  }

  stop() {
    console.log("stop");
  }
}

const myCar = new McLaren("red");
console.log(myCar.color);
myCar.start();
```

<br/>

### 함수

```typescript
// 일반적인 형태의 함수
function hello(name: string, age?: number): string {
  if (age !== undefined) {
    return `Hello, ${name}. You are ${age}`;
  } else {
    return `Hello, ${name}`;
  }
}

console.log(hello("Sam"));
console.log(hello("Sam", 30));

// 함수에서 this를 이용할 때
interface User {
  name: string;
}

const Sam: User = { name: "Sam" };

function showName(this: User, age: number, gender: "m" | "f") {
  console.log(this.name, age, gender);
}

const a = showName.bind(Sam);
a(30, "m");

// 함수 Overloading을 하는 경우
interface User {
  name: string;
  age: number;
}

function join(name: string, age: string): string;
function join(name: string, age: number): User;
function join(name: string, age: number | string): User | string {
  if (typeof age === "number") {
    return {
      name,
      age,
    };
  } else {
    return "나이는 숫자로 입력해주세요.";
  }
}

const sam: User = join("Sam", 30);
const jane: string = join("Jane", "30");
```

## 2주차

## 3주차

## 4주차

## 5주차
