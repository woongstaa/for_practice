// 가장 큰 수

// 문제 설명
// 0 또는 양의 정수가 주어졌을 때, 정수를 이어 붙여 만들 수 있는 가장 큰 수를 알아내 주세요.
// 예를 들어, 주어진 정수가 [6, 10, 2]라면 [6102, 6210, 1062, 1026, 2610, 2106]를 만들 수 있고, 이중 가장 큰 수는 6210입니다.
// 0 또는 양의 정수가 담긴 배열 numbers가 매개변수로 주어질 때, 순서를 재배치하여 만들 수 있는 가장 큰 수를 문자열로 바꾸어 return 하도록 solution 함수를 작성해주세요.

// 제한 사항
// numbers의 길이는 1 이상 100,000 이하입니다.
// numbers의 원소는 0 이상 1,000 이하입니다.
// 정답이 너무 클 수 있으니 문자열로 바꾸어 return 합니다.

// 입출력 예
// numbers	return
// [6, 10, 2]	"6210"
// [3, 30, 34, 5, 9] ""9534330""

function solution(numbers) {
	var answer = '';

	// let sortedNum = numbers.sort();
	// let reversedNum = sortedNum.reverse();
	// console.log(reversedNum.indexOf('0'));

	// for (i = 0; i < reversedNum.length; i++) {
	// 	if (reversedNum[i].includes('0')) {
	// 		reversedNum.push(reversedNum[reversedNum.indexOf(0)]);
	// 		reversedNum.splice(0, 1);
	// 	}
	// }

	answer = numbers
		.map((number) => number + '')
		.sort((a, b) => b + a - (a + b))
		.join('');

	if (answer[0] === '0') return '0';

	return answer;
}

// 1. 우선 map 을 통해 number값에 string인 ""값을 붙여 string값으로 타입 변환을 시켜준다.
// 2. sort 를 사용해서 string값이 된 숫자들을 정렬 기준에 맞게 정렬시킨다.
//      - string이 되었기 때문에, 입출력 예 첫번째 기준으로는 a + b = 610, b + a = 106이 되며
//      - (b + a) - (a + b)는 내림차순을 의미한다.
// 3. join 을 통해 배열을 stirng으로 변환시켜준다.
// 4. answer의 값이 000 ... 000일 경우 0을 리턴하도록 해준다.
