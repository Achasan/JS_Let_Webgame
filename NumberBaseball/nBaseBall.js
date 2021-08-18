const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

let numbers = [];                                                      // numbers 배열 선언
for(let i=1; i<=9; i++){                                               // 1부터 9까지의 정수를 배열값으로 push
    numbers.push(i);
}

const answer = [];                                                     // answer 배열을 선언
for(let i=0; i<=3; i++){                                               // answer 배열은 4개의 서로다른 정수를 가진 정답변수
    const index = Math.floor(Math.random() * numbers.length);          // 4개의 값을 numbers 배열에서 가져오기위해 for문 작성
    answer.push(numbers[index])                                        // 같은 값이 서로 겹치면 안되기 때문에 numbers 배열에서 무작위로 값을 하나 가져오고,
    numbers.splice(index, 1);                                          // 가져온 값을 numbers 배열에서 없앤다. 없애면 numbers.length가 줄어들기에
}                                                                      // undefined가 출력될 버그가 사라지게 된다.

// [!] splice(정수1, 정수2) : 배열에서 정수1과 일치하는 값 부터 정수2번째 값 까지의 element를 없앤다.

const tries = [];

function checkInput(input) {
    if(input.length !== 4){
        return alert('값을 4자리로 입력해주세요.');
    }
    if(new Set(input).size !== 4){
        return alert('입력하는 값은 한 번씩만 입력해주세요.');
    }
    if(tries.includes(input)){
        return alert('이전에 입력한 값입니다. 다시입력해주세요.');
    }
    return true;
};

$form.addEventListener('submit', (event)=> {
    event.preventDefault();                                            // addEventListener에 submit을 넣었다. submit의 기본동작은 홈페이지를 새로고침하기때문에
    const value = $input.value;                                        // preventDefault()를 통해서 새로고침되는 현상을 막는다.
    const valid = checkInput(value);
    if(!valid) return;           
    if(answer.join('') === value){
        alert('홈런입니다!');
        return;
    }                                                                   // form 내에 있는 input태그에 입력된 값을 변수에 저장하고 checkInput()을 통해 유효하게 
    if(tries.length >= 9){
        const message = document.createTextNode(`패배했습니다! 정답은 ${answer.join('')} 이었습니다!`);
        $logs.appendChild(message);
        return;
    }

    let strike = 0; // 값과 자리가 맞을 경우 strike
    let ball = 0;   // 값은 맞는데 자리가 다를경우 ball
    for(let i=0; i<answer.length; i++){
        const index = value.indexOf(answer[i]);
        if(index !== -1){
            if(index === i){
                strike++;
            } else {
                ball++;
            }
        }
    }

    $logs.append(`${value} : ${strike} 스트라이크 ${ball} 볼 // 시도 횟수 : ${(tries.length)+1} / 10`, document.createElement('br'));
    tries.push(value);

}); 