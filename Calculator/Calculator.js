let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

const initialize = () => {
    numOne = $result.value;
    numTwo = '';
}

const onClickNumber = (event) => {
    if(!operator){
        numOne += event.target.textContent;
        $result.value += event.target.textContent;
        return;
    };
    
    if(!numTwo){
        $result.value = '';
    };
    numTwo += event.target.textContent;
    $result.value += event.target.textContent;
}

const onClickOperator = (oper) => (event) => { 
    if(numOne && numTwo){
        switch(oper){
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                initialize();
                break;
            case '-':
                $result.value = numOne - numTwo;
                initialize();
                break;
            case '*':
                $result.value = numOne * numTwo;
                initialize();
                break;
            case '/':
                $result.value = numOne / numTwo;
                initialize();
                break;
            default:
                break;
        };
    } else if(numOne || !numTwo){
        operator = oper;
        $operator.value = oper;
    } else {
        alert('숫자를 먼저 입력해주세요.')
    };
}

const onClickCal = () => {
    if(numTwo){
        switch(operator){
            case '+':
                $result.value = parseInt(numOne) + parseInt(numTwo);
                $operator.value = '=';
                initialize();
                break;
            case '-':
                $result.value = numOne - numTwo;
                $operator.value = '=';
                initialize();
                break;
            case '*':
                $result.value = numOne * numTwo;
                $operator.value = '=';
                initialize();
                break;
            case '/':
                $result.value = numOne / numTwo;
                $operator.value = '=';
                initialize();
                break;
            default:
                break;
        };  
    } else {
        alert('숫자를 먼저 입력해주세요.');
    };
}

const onClickClear = () => {
    numOne = '';
    operator = '';
    numTwo = '';
    $result.value = '';
    $operator.value = '';
}

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));

document.querySelector('#calculate').addEventListener('click', onClickCal );
document.querySelector('#clear').addEventListener('click', onClickClear );

