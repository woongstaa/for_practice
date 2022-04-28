# This

## This의 특징

1. 그냥 쓰나 일반 함수 안에서 쓰면 {window} => 기본 함수들 수납공간
   1. strict mode + 일반 함수 => undefined

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
	array.forEach((data) => {
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
let func = (a) => a + 10;

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
[1, 2, 3, 4].forEach((array) => console.log(array));

document.getElementById('button').addEventListener('click', (event) => {
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

	this.arrayData.forEach((num) => {
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
indent modify
