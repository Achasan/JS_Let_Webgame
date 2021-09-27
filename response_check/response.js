$screen = document.querySelector('#screen');
$result = document.querySelector('#result');
$ranking = document.querySelector('#ranking');

let startTime;
let endTime;
let timeoutId;
const records = [];

const check = () => {
    if($screen.classList.contains('waiting')){
        $screen.classList.replace('waiting', 'ready');
        $screen.textContent = '초록색이 되면 클릭';
        timeoutId = setTimeout(() => {
            $screen.classList.replace('ready', 'now');
            $screen.textContent = '클릭하세요!';
            startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000);

    } else if($screen.classList.contains('ready')){
        clearTimeout(timeoutId);
        $screen.classList.replace('ready', 'waiting');
        $screen.textContent = '너무 빨리눌렀습니다! 다시 시도해주세요.';

    } else if($screen.classList.contains('now')){
        endTime = new Date();
        const time = endTime - startTime;
        records.push(time);
        const average = records.reduce((a, b) => a + b) / records.length;
        $result.textContent = `${time}ms, 평균반응속도 : ${average}ms`;
        startTime = null; endTime = null;
        records.sort();
        $ranking.textContent = `제일 빠른 반응속도 5개 : ${records[0]}ms ${records[1]}ms ${records[2]}ms ${records[3]}ms ${records[4]}ms`        
        $screen.classList.remove('now');
        $screen.classList.add('waiting');
        $screen.textContent = '클릭하여 시작하세요.';
    }
};

// 태그.classList.contains('클래스')
// 태그가 해당 클래스를 포함한다면 true, 아니면 false를 리턴한다.

// 태그.classList.add('클래스') : 해당 태그에 클래스를 추가한다.
// 태그.classList.replace('기존클래스', '바꿀클래스') : 해당 태그의 기존클래스를 바꿀클래스로 바꾼다.
// 태그.classList.remove('클래스') : 해당 태그의 클래스를 삭제한다.

// new Date() : 시간, 날짜 객체를 얻을 수 있다.
// Date(년, 월, 일, 시, 분, 초) : 해당 매개값을 넣어주면 그 시간으로 설정할 수 있다.
//                                단, 월은 0부터 시작하기 때문에 넣으려는 달-1 을 해주어야 한다.
// new Date() 끼리 연산을 하면 밀리초단위로 계산결과가 나오게 되는데, 1000(밀리초)/60(초)/60(분)/24(시간) 순으로 나누어주면 
// 며칠 차이가 나는지 알 수 있다.

$screen.addEventListener('click', check);