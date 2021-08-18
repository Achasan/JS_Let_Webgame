const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

let numbers = [];
for(let i=1; i<=9; i++){
    numbers.push(i);
}

const answer = [];
for(let i=0; i<=3; i++){
    const index = Math.floor(Math.random() * numbers.length);
    answer.push(numbers[index])
    numbers.splice(index, 1);
}