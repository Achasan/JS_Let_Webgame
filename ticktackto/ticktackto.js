const {body} = document;
const $table = document.createElement('table');
const $result = document.createElement('div');

let turn = 'O';
let rows = [];


// td태그를 누를때 발생할 함수 만들기
const callback = (event) => {
    if(!event.target.textContent){
        event.target.textContent = turn;
    } else {
        alert("이미 칸이 채워져있습니다!")
    }
    // 이벤트가 발생한 대상의 text가 없다면 turn 함수에 있는 문자열을 추가한다.

    const check = checkWin(event.target);
    if(check){
        $result.textContent = `${turn}의 승리입니다!`
        $table.removeEventListener('click', callback);
    }

    if(rows.flat().every((cell) => cell.textContent) && check === false){
        $result.textContent = `승부가 결정되지 않았습니다. 무승부입니다!`
        $table.removeEventListener('click', callback);
    };

    turn = 'X'; // 삼항연산자 : turn 값이 'O'이면 'X', 'X'면 'O'로 변경

    let canInput = [];
    rows.forEach((row, rowsIndex) => {
        row.forEach((cells, cellIndex) => {
            let loc = [];
            if(!cells.textContent){
                loc.push(rowsIndex);
                loc.push(cellIndex);
                canInput.push(loc);
            }
        });
    });
    
    if(canInput.length !== 0){
        const value = Math.floor(Math.random()*canInput.length);
        const com_loc = rows[canInput[value][0]][canInput[value][1]];
        com_loc.textContent = turn;

        const check = checkWin(com_loc);
        if(check){
            $result.textContent = `${turn}의 승리입니다!`;
            $table.removeEventListener('click', callback);
        }
    }
    
    turn = 'O';
};

const checkWin = (target) => {
    let isWin = false;
    let rIndex;
    let cIndex;
    rows.forEach((row, rowIndex) => {
        row.forEach((cells, cellIndex) => {
            if(target === cells){
               rIndex = rowIndex;
               cIndex = cellIndex;
               console.log(`클릭한 위치 : ${rIndex}, ${cIndex}`); 
            }
        });
    });

    if(rows[rIndex][0].textContent === turn &&
       rows[rIndex][1].textContent === turn &&
       rows[rIndex][2].textContent === turn){
        isWin = true;
    }
    
    if(rows[0][cIndex].textContent === turn &&
       rows[1][cIndex].textContent === turn &&
       rows[2][cIndex].textContent === turn){
        isWin = true;
    }

    if(rows[0][0].textContent === turn &&
       rows[1][1].textContent === turn &&
       rows[2][2].textContent === turn){
        isWin = true;
    }

    if(rows[0][2].textContent === turn &&
       rows[1][1].textContent === turn &&
       rows[2][0].textContent === turn){
        isWin = true;
    }

    return isWin;
}

// 3x3 2차원 배열 생성
for(let i=0; i<3; i++){
    const $tr = document.createElement('tr'); // tr 태그 생성
    const cells = [] // cells 배열 생성
    for(let j=0; j<3; j++){
        const $td = document.createElement('td'); // td 태그 생성
        cells.push($td); // cells 배열에 td태그 추가
        $tr.appendChild($td); // tr태그의 자식태그로 td태그 추가
    }
    rows.push(cells); // td태그는 총 3개가 생성됨, 생성된 값들을 rows 배열에 추가
    $table.appendChild($tr); // td태그 3개가 포함된 tr 태그를 table 태그에 자식태그로 넣음
    $table.addEventListener('click', callback);
}

body.appendChild($table);
body.appendChild($result);


