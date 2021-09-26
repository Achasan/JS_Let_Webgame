const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');

const IMG_URL = './rsp.png';                                  
// IMG_URL 변수에 rsp.png 이미지를 저장한다. 가위바위보 이미지가 하나로 합쳐져있다.
// 하나로 합쳐지지 않으면 이미지를 불러올 때 서버에 3번 요청해야하지만, 하나로 해놓으면 한번 만 요청해놓으면 된다.
// 단 css를 사용하여 사진을 적절히 잘라서 사용해야한다.

$computer.style.background = `url(${IMG_URL}) 0 0`;  // 가위의 위치 (IMG_URL 변수의 사진에 x좌표, y좌표 기준으로 html에서 style 태그에 작성한 사이즈로 자름)
$computer.style.background = `url(${IMG_URL}) -220px 0` // 바위
$computer.style.background = `url(${IMG_URL}) -440px 0` // 보
$computer.style.backgroundSize = 'auto 200px'; // 사진의 크기가 크기 때문에 가로는 자동, 세로는 200px로 고정하였음
                                               // backgroundSize는 background 속성과 항상 같이나와야 한다.

const rspX = {
    scissors: '-0',
    rock: '-220px',
    paper: '-440px'    
};

let computerChoice = 'scissors';
const changeComputerHand = () => {
    if(computerChoice === 'rock'){
        computerChoice = 'scissors';
    } else if (computerChoice === 'scissors'){
        computerChoice = 'paper';
    } else if (computerChoice === 'paper'){
        computerChoice = 'rock';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
};

let intervalId = setInterval(changeComputerHand, 50);            // 함수를 50밀리초마다 실행하는 함수 : setInterval
                                                                 // setInterval은 타이머에 대한 id를 리턴한다. 임의값이다.

let clickable = true;
let userScores = 0;
let computerScores = 0;
const score = {
    rock: 0,
    scissors: 1,
    paper: -1
};


const clickBtn = () => {
    if(clickable){
        clearInterval(intervalId);  //  clearInterval : 실행중인 Interval을 종료한다. 매개값은 setInterval 실행시 반환하는 타이머 ID를 넣어주어야한다.
        clickable = false;
        const userChoice = event.target.textContent === '바위' 
        ? 'rock' 
        : event.target.textContent === '가위' 
            ? 'scissors' 
            : 'paper';
        
        const userScore = score[userChoice];
        const computerScore = score[computerChoice];
        const value = userScore - computerScore;
        let message;
        if(value === -1 || value === 2){        // score 배열에 가위바위보 각 점수를 빼는 값에 따라 승,패,무승부 판별
            message = '승리';
            userScores += 1;
        } else if(value === -2 || value === 1){
            message = '패배'
            computerScores += 1;
        } else {
            message = '무승부';
        }
        $score.textContent = `${message}, 나:${userScores}점, 컴퓨터 : ${computerScores}점`;
    }

    if(userScores === 3){
        $score.textContent = `컴퓨터보다 3점을 먼저 획득했습니다. 승리!`
        clearInterval(intervalId);
        clickable = false;
    } else if(computerScores === 3){
        $score.textContent = `컴퓨터가 먼저 3점을 획득했습니다. 패배!`;
        clearInterval(intervalId);
        clickable = false;
    } else {
        
        setTimeout(() => {
            clickable = true;
            intervalId = setInterval(changeComputerHand, 50);
        }, 1000);
    }
}



$scissors.addEventListener('click', clickBtn);
$rock.addEventListener('click', clickBtn);
$paper.addEventListener('click', clickBtn);

