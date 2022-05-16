# 함수형 프로그래밍 개요

함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수효과를 미워하고 조합성을 강조하는 프로그래밍 패러다임이다.

- 부수효과를 미워한다 => 순수함수를 만든다
- 조합성을 강조한다 => 모듈화 수준을 높인다
- 순수 함수 => 오류를 줄이고 안정성을 높인다
- 모듈화 수준이 높다 => 생산성을 높인다

## 순수 함수

```js
function add(a, b) {
  return a + b;
}

console.log(add(10, 5)); // 15
```

순수 함수란

1. 동일한 인자를 넣으면 동일한 값이 반환되는 것을 의미
2. 부수효과가 없다
3. 순수 함수는 평가 시점이 중요하지 않습니다

- 동일한 값을 넣었는데 상황에 따라 다른 값을 반환하는 함수는 무엇일까?

```js
var c = 10;
function add2(a, b) {
  return a + b + c;
}

console.log(add2(10, 2)); // 22
console.log(add2(10, 3)); // 23
console.log(add2(10, 4)); // 24
c = 20;
console.log(add2(10, 2)); // 32
console.log(add2(10, 3)); // 33
console.log(add2(10, 4)); // 34
```

이후에 c가 바뀔 수 있기 때문에 순수 함수가 아닙니다.
하지만 상수로 활용한다면 순수 함수라고 할 수 있습니다.

- 부수효과란 상태를 직접 변경하는 것을 의미합니다.

```js
var c = 20;
function add3(a, b) {
  c = b;
  return a + b;
}

console.log(c); // 20
console.log(add(10, 5)); // 15
console.log(c); // 30
```

리턴 값을 제외한 나머지 부분에서 외부의 값을 변경한다면 순수 함수가 아니게 됩니다.

- 순수 함수가 아닌 또 다른 함수

```js
var obj1 = { val: 10 };
function add4(obj, b) {
  obj.val += b;
}

console.log(obj1.val); // 10
add4(obj1, 20);
console.log(obj1.val); // 30
```

add4는 obj1의 값을 직접 수정하는 함수입니다.

우리는 주로 객체를 다루게 되는데 순수 함수로는 객체의 상태를 변경 할 수 없는걸까요?

기존의 값을 그대로 두고 복사해 새로운 값을 만들어내면 됩니다.

```js
var obj1 = { val: 10 };
function add5(obj, b) {
  return { val: obj1.val + b };
}

console.log(obj1.val); // 10
add5(obj1, 20);
console.log(obj1.val); // 10
var obj2 = add5(obj1, 20);
console.log(obj2.val); // 30
```

위 예시는 인자로 받은 값을 수정도 하지 않을 뿐더러, 그 값을 변경시키지도 않는 순수함수입니다.

- 순수 함수가 아닌 함수는 평가 시점이 중요하지만, 순수함수는 평가시점이 중요하지 않습니다.
  그렇기 때문에 아주 안전한 함수라고 할 수 있습니다.
  이를 통해 다양한 로직을 구성할 수 있습니다.

## 일급 함수

함수를 값(인자, 변수, 원할 때 평가할 수 있는)으로 다룰 수 있다는 것을 의미합니다.

```js
function add(a, b) {
  return a + b;
}

var f1 = function (a) {
  return a * a;
};

console.log(f1); // function (a) { return a * a; }

var f2;
```
