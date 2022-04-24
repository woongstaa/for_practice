'use strict';

console.log(this);

function func() {
	console.log(this);
}

func();
window.func();
// 두 호출문의 기능은 같다

// 1. 그냥 쓰나 일반 함수 안에서 쓰면 {window} => 기본 함수들 수납공간
// strict mode + 일반 함수 => undefined

var obj = {
	data: 'Lee',
	func: function () {
		console.log('안녕');
		console.log(this);
		// 2. object안의 함수, 메서드에서 사용하면 그 함수를 가지고 있는 오브젝트를 뜻함
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
			// this값을 상위 요소에서 가져와 사용
		},
	},
};

// 자바스크립트 자체가 window라는 전역 객체안에 있는 것이기 때문에 1, 2는 같은 의미이다

function machine() {
	this.name = 'Kim';
}
