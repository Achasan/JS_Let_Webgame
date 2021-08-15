const players = Number(prompt('인원 수를 입력해주세요.'));

const $order = document.querySelector('#order');
const $word = document.querySelector('#word');
const $input = document.querySelector('input');
const $button = document.querySelector('button');
let word = null;
let inputWord;

const inputReset = () => {
    $input.value = '';
    $input.focus();
};

const wordImport = (event) => {
    inputWord = event.target.value;
};

const onClicked = () => {
    if(word === null || ((word[word.length-1] === inputWord[0]) && (inputWord.length === 3))){
        word = inputWord;
        $word.textContent = word;
        const order = Number($order.textContent);
        if(order + 1 > players){
            $order.textContent = 1;
        } else {
            $order.textContent = order + 1;
        }
        inputReset();
    } else if(word[word.length-1] !== inputWord[0]) {
        alert('\'' + word[word.length-1]+ '\'' + '로 시작하는 단어를 입력해주세요.');
        inputReset();
    } else if(inputWord.length !== 3){
        alert('단어는 세 글자여야 합니다.');
        inputReset();
    } else {
        alert('단어를 입력해주세요');
        inputReset();  
    }
};

$input.addEventListener('input', wordImport);
$button.addEventListener('click', onClicked);