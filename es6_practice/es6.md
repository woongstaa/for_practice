# This

## This의 특징

1. 그냥 쓰나 일반 함수 안에서 쓰면 {window} => 기본 함수들 수납공간

- strict mode + 일반 함수 => undefined

```js
console.log(this); // window{...}

function func() {
  console.log(this); // window{...}
}

func();
window.func(); // 두 호출문의 기능은 같다
```

```js
'use strict';

function func() {
  console.log(this); // undefined
}
```

2. object안의 함수, 메서드에서 사용하면 그 함수를 가지고 있는 오브젝트를 뜻함

```js
var obj = {
  data: 'Lee',
  func: function () {
    console.log('안녕');
    console.log(this);
  },
};

obj.data;
obj.func();

var obj2 = {
  data: {
    func: function () {
      console.log(this); // data
    },
    func2: () => {
      console.log(this); // window
      // arrow function은 this값을 상위 요소에서 가져와 사용
    },
  },
};
```

하지만 자바스크립트 자체가 window라는 전역 객체안에 있는 것이기 때문에 1, 2는 같은 의미이다

3. 생성될 인스턴스 객체

```jsx
function machine() {
  this.name = 'Lee';
}

var obj = new machine(); // {name: "Lee"}
```

4. eventListener 안에서는 `event.currentTarget`

```js
document.getElementById('button').addEventListener('click', function (event) {
  this; // event.currentTarget

  var array = [1, 2, 3];
  array.forEach(data => {
    console.log(data); // 1 2 3 각각 순차적으로 return
    console.log(this); // window, 콜백 함수는 일반 함수에 해당
  });
});
```

```js
let obj = {
  names: ['kim', 'lee', 'park'],
  function: function () {
    console.log(this); // obj
    obj.names.forEach(function () {
      console.log(this); // window, 근본없는 일반함수
    });

    obj.names.forEach(() => {
      console.log(this); // obj, 내부의 this값을 변화시키지 않기 때문에 상위의 this값을 가져옴
    });
  },
};
```

5. **콜백 함수는 일반함수 취급하기 때문에 this를 사용하고 싶다면 arrow function을 활용해 상위 this를 가져와 사용하는 것이 추천됨**

# Arrow function

```js
let func = a => a + 10;

func(5); // 15
```

함수는 **코드들을 기능 단위로 묶고 싶을 때** 혹은 **입출력 기계를 만들고 싶을 때** 사용한다

## Arrow function의 장점

1. 가독성이 좋다
2. 파라미터 1개면 소괄호 생략가능
3. 코드 한 줄이면 중괄호도 생략 가능
4. **상위 this값을 내부에서 그대로 사용**

```js
// before
[1, 2, 3, 4].forEach(function (array) {
  console.log(array);
});

// after
[1, 2, 3, 4].forEach(array => console.log(array));

document.getElementById('button').addEventListener('click', event => {
  this; // window
});

var obj = {
  function: () => {
    console.log(this); // window
  },
};
```

### this & arrow function 예제

```js
// question
var people = {
  name: 'Sonny',
};

people.sayHi(); // "안녕 나는 Sonny야"가 출력되게 해보자
```

```js
// answer
var people = {
  name: 'Sonny',
  sayHi: function () {
    console.log(`안녕 나는 ${this.name}야`);
  },
};
```

```js
// question
var data = {
  arrayData: [1, 2, 3, 4, 5],
};

data.getSumAll(); // 배열의 모든 합계가 출력되게 but 객체 내부는 수정 금지
```

```js
// answer
var data = {
  arrayData: [1, 2, 3, 4, 5],
};

data.getSumAll = function () {
  let sum = 0;

  this.arrayData.forEach(num => {
    sum += num;
  });

  console.log(sum);
};

data.getSumAll(); // 15
```

```js
// question
document.getElementById('button').addEventListener('click', function () {
  console.log(this.innerHTML); // 1초 뒤에 출력되게
});
```

```js
// answer
document.getElementById('button').addEventListener('click', function () {
  setTimeout(() => {
    console.log(this.innerHTML);
  }, 1000);
});
```

# 객체지향

## constructor

객체를 생성할때 일일이 생성하는 것은 너무 불편하기 때문에 constructor를 활용해 쉽게 만들 수 있습니다.
또한 복사를 하는 것은 참조에 의한 전달이 일어나기 때문에 불편함이 발생할 수도 있어 기피되는 방법입니다.

```js
var student1 = {
  name: 'Lee',
  age: 22,
  sayHi: function () {
    console.log(`안녕하세요 ${this.name}입니다.`);
  },
};

function machine(name, age) {
  this.name = name; // this는 새로 생성될 인스턴스를 의미함
  this.age = age;
  this.sayHi = function () {
    console.log(`안녕하세요 ${this.name}입니다.`);
  };
}

let student2 = new machine('Lee', 22); // machine이 가진 속성들을 "상속"받았다고 합니다.
console.log(student2); // { name: "Lee", age: 22, sayHi: f()}
let student3 = new machine();
console.log(student3); // { name: undefined, age: undefined, sayHi: f()}
```

```js
// question 1. 아래 예시를 생성할 수 있는 constructor를 만들어 봅시다
var product1 = { name: 'shirts', price: 50000 };
var product2 = { name: 'pants', price: 60000 };

function Product(name, price) {
  this.name = name;
  this.price = price;
}

var product1 = new Product('shirts', 50000);
var product2 = new Product('pants', 60000);
```

```js
// question 2. 상품마다 tax()라는 내부 함수를 실행하면 콘솔창에 10%의 부가세가 출력되게 해봅시다.
function Product(name, price) {
  this.name = name;
  this.price = price;
  this.tax = function () {
    console.log(this.price * 0.1);
  };
}
```

## prototype

상속을 구현할 수 있는 또 하나의 문법, 유전자라고 이해하면 쉽습니다.
constructor를 만들면 prototype이라는 공간이 자동적으로 생깁니다.
prototype에 값을 추가하면 모든 자식들이 물려받기 가능합니다.

```js
function machine(name, age) {
  this.name = name; // this는 새로 생성될 인스턴스를 의미함
  this.age = age;
  this.sayHi = function () {
    console.log(`안녕하세요 ${this.name}입니다.`);
  };
}

machine.prototype.gender = 'Male';

console.log(student1.gender); // "Male"
var student1 = new machine('park', 22); // {name: "park", age: 22, sayHi: f()} gender 값은 존재하지 않음
```

### 동작원리

1. 해당 스코프에 변수를 가지고 있는지?
2. 없다면, 부모의 prototype이 가지고 있는지?

```js
student1.toString(); // 왜 작동하는걸까? 부모 유전자에서 찾아봄 -> 부모의 부모의 유전자에서 찾아봄 -> 있으면 작동!

var arr = [1, 2, 3];
var arr = new Array(1, 2, 3); // 위 코드를 컴퓨터에선 아래와 같이 작동됨 (Array의 prototype을 상속 받을 수 있다!)

arr.sort();
arr.prototype.sort(); // Array.prototype.sort()가 있기 때문에 가능
```

이런 원리 덕분에 내장함수가 동작할 수 있습니다.

### 특징

1. 함수에만 몰래 생성됩니다.
2. 내 부모의 프로토타입을 검사하고 싶다면 `__proto__`를 사용하면 됩니다.

```js
var parents = { name: 'Kim' };
var child = {};
child.__proto__ = parents;
child.name; // "Kim"
```

### practice

```js
function Student(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log(`안녕 나는 ${this.name}이야`);
  };
}
```

## ES5 문법으로 상속 구현하기

### Object.create()

ES5에서는 `Object.create()`메서드를 사용해 상속 기능을 구현할 수 있었습니다.
해당 메서드를 사용한다면 인자로 받은 값이 prototype이 된다는 의미입니다.

```js
var parents = { name: 'KDB', age: 28 };
var child = Object.create(parents); // child의 prototype을 parents로 설정
console.log(child); // {} child 객체엔 아무 값도 존재하지 않는다.
console.log(child.age); // 28 child.age가 없기 때문에 부모 유전자(프로토타입)에서 값을 가져온다.

child.age = 17;
console.log(child.age); // 17 이제 child에 age란 값이 선언됐기 때문에 그 값을 가져온다.

var grand = Object.create(child);
console.log(grand); // {}
console.log(grand.name); // 'KDB'
console.log(grand.age); // 17
```

## ES6 문법으로 상속 구현하기

### Class

기존의 constructor를 만드는 새로운 문법

```js
class Parents {
  constructor(name) {
    this.name = name;
    // 여기에 함수를 추가하면 자식에게 상속됩니다.
    this.sayHi = function () {
      console.log('hello');
    };
  }
  // 여기에 함수를 추가하면 프로토타입에만 추가됩니다.
  // 모든 자식들이 같은 함수를 공유 할 수 있으며, 관리도 편할 수 있습니다.
  sayHi() {
    console.log('hello');
  }
}

var child = new Parents();
child.__proto__; // {constructor: {...}, sayHi: f()} 부모의 프로토타입이 출력됩니다.
Object.getPrototypeOf(child); // __proto__와 같은 의미 좀 더 의미전달이 잘 됨;

Parents.prototype.sayHello = function () {...}; // 클래스 내부에서 추가할 수도 있으나 이런 방법으로도 메서드를 추가 할 수 있습니다.
```

### extends, super

extends는 class를 상속할 때 사용하는 방법입니다.
extends해서 만든 class는 this를 그냥 사용하지 못하기 때문에 super()를 이용해서 부모의 this를 가져옵니다. 가져올 때는 constructor를 그대로 사용해줍니다.

super는 부모의 constructor나 프로토타입 메서드를 의미합니다.

```js
class GrandParents {
  constructor(name) {
    this.lastName = 'Kim';
    this.firstame = name;
  }
  sayHi() {
    console.log('hi');
  }
}

class Parents extends GrandParents {
  constructor(name) {
    super(name); // super: 부모 constructor를 의미
    // super();
    // name을 입력 안했기 때문에 name을 넣었어도 firstName이 undefined가 됩니다.
    this.age = 50;
  }
  sayHi() {
    console.log('hello');
    super.sayHi(); // super: 부모 프로토타입을 의미
  }
}

var parents = new parents(); // {lastName: "Kim", firstName: undefined, age: 50}
parents.sayHi(); // 'hello', 'hi'
```
