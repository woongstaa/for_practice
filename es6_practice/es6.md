# This

## This의 특징

1. 그냥 쓰나 일반 함수 안에서 쓰면 {window} => 기본 함수들 수납공간
   1. strict mode + 일반 함수 => undefined

```jsx
console.log(this); // window{...}

function func() {
	console.log(this); // window{...}
}

func();
window.func(); // 두 호출문의 기능은 같다
```

```jsx
'use strict';

function func() {
	console.log(this); // undefined
}
```

2. object안의 함수, 메서드에서 사용하면 그 함수를 가지고 있는 오브젝트를 뜻함

```jsx
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

```jsx
document.getElementById('button').addEventListener('click', function (event) {
	this; // event.currentTarget

	var array = [1, 2, 3];
	array.forEach((data) => {
		console.log(data); // 1 2 3 각각 순차적으로 return
		console.log(this); // window, 콜백 함수는 일반 함수에 해당
	});
});
```

```jsx
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
