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

var f2 = add;
console.log(f2); // function add(a, b) { return a + b; }

function f3(f) {
  return f();
}

f3(function () {
  return 10;
});
```

함수 f3은 함수를 인자로 받아서 실행시키는 함수입니다. 함수 내부에서 인자 값을 평가한 다음 그 결과를 반환하는 함수입니다. (일급함수, 순수함수)

## add_maker

```js
// add_maker

function add_maker(a) {
  return function (b) {
    return a + b;
  };
}

var add10 = add_maker(10);

console.log(add10(20));
```

add_maker는 일급함수와 클로저 개념이 합쳐진 예시입니다. `function (b) { return a + b; };` 이 외부의 값 a를 기억하고 있기 때문에 클로저라고 할 수 있습니다. 또한 인자 a는 참조만 할 뿐 a의 값을 직접 수정할 수 없는 순수함수로 구성되어있습니다.

```js
function f4(f1, f2, f3) {
  return f3(f1() + f2());
}

f4(
  function () {
    return 2;
  },
  function () {
    return 1;
  },
  function (a) {
    return a * a;
  },
); // f3(3) => console.log(f4) => 9
```

# 함수형으로 전환하기

```js
var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 },
];
```

## 명령형 코드

1. 30세 이상인 users를 거른다.

```js
var temp_users = [];

for (var i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
```

2. 30세 이상인 users의 names를 수집한다.

```js
var names = [];

for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
```

3. 30세 미만인 users를 거른다.

```js
var temp_users = [];

for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
```

4. 30세 미만인 users를 ages를 수집한다.

```js
var ages = [];

for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].age);
}
```

1, 3의 코드는 조건부만 다르지 다른 부분은 모두 일치하지만 함수형 프로그래밍을 통해 중복을 해소할 수 있습니다.

## \_filter, \_map으로 리팩토링

```js
function _filter(users, predicate) {
  var new_list = [];

  for (var i = 0; i < users.length; i++) {
    if (predicate(users[i])) {
      new_list.push(users[i]);
    }
  }

  return new_list;
}

var over_30 = _filter(users, function (users) {
  return users.age >= 30;
});

var under_30 = _filter(users, function (users) {
  return users.age < 30;
});

function _map(list, mapper) {
  var new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

var names = _map(over_30, function (user) {
  return user.name;
});

var ages = _map(under_30, function (user) {
  return user.age;
});
```

\_filter함수가 한번 돌아갈때 users.length를 기준으로 predicate()함수가 반복 될 것입니다. 또한 이 \_filter함수는 user만을 위한 함수가 아닌 어떤 조건이라도 필터링 할 수 있는 함수가 되었습니다. 재활용성이 아주 높은 함수가 되었습니다. users를 list로 수정해 더 넓은 범위의 필터링을 진행할 수 있다고 표기할 수 있습니다.

\_map 함수도 mapper에게 어떤 인자값을 가져올지를 위임함으로써 코드의 중복을 줄이고 간결하게 작성할 수 있습니다.

함수형 프로그래밍에서는 대입문을 자주 사용하지 않는 경항이 있기 때문에 위 코드를 더 간결하게 만들어 봅시다. 함수형 프로그래밍은 함수를 통과해나가면서 한 번에 값을 새롭게 만들어 나가는 것이 핵심이기 때문입니다. 대입문을 줄이면 중간에 값이 변화할 여지를 줄일 수 있기 때문에 보다 안정성 높고 테스트하기 쉬운 코드가 될 수 있습니다.

```js
var names = _map(
  _filter(users, function (users) {
    return users.age >= 30;
  }),
  function (user) {
    return user.name;
  },
);

var ages = _map(
  _filter(users, function (users) {
    return users.age < 30;
  }),
  function (user) {
    return user.age;
  },
);
```
