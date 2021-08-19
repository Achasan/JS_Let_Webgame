const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');

const candidate = Array(45).fill().map((v, i) => i + 1);
// 45의 길이를 가진 배열 생성, 각 배열에는 undefined로 채워짐.
// map()은 for문이라고 생각하면 된다. 배열의 길이만큼 반복실행되며, i+1을 통해 각 공간에 1씩 증가하는 값을 넣어줌

const shuffle = [];
while(candidate.length > 0){ // candidate 배열의 길이가 0이 될 때 까지
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    // splice에서 없앤 데이터 값을 변수에 저장할 수 있다. (처음 안 내용)
    // splice는 제거한 데이터 값을 배열 안에 저장하고 있다. 따라서 제거한 값은 spliceArray[0]에 저장된다.
    const value = spliceArray[0]    // 제거한 값을 value 변수에 다시 저장
    shuffle.push(value);            // shuffle 배열에 넣기
}

const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
const bonusBall = shuffle[6];

function colorize(number, $tag){
    if(number >= 40){
        $tag.style.backgroundColor = 'green';
        $tag.style.color = 'white';
    } else if(number >= 30){
        $tag.style.backgroundColor = 'blue';
        $tag.style.color = 'white';
    } else if(number >= 20){
        $tag.style.backgroundColor = 'yellow';
        $tag.style.color = 'brown';
    } else if(number >= 10) {
        $tag.style.backgroundColor = 'orange';
        $tag.style.color = 'white'
    } else {
        $tag.style.backgroundColor = 'red';
        $tag.style.color = 'white';
    }
}

function drawBall(number, $parent){
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    $ball.textContent = number;
    colorize(number, $ball);
    $parent.appendChild($ball);
}

for(let i=0; i<=5; i++){
    setTimeout(() => {
        drawBall(winBalls[i], $result)
    }, 1000 * (i + 1));
};

setTimeout(() => {
    drawBall(bonusBall, $bonus)
}, 7000);

console.log(shuffle);
console.log(winBalls);