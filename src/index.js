const strSign = '+-*/()';
const messErrBrack = "ExpressionError: Brackets must be paired";
const messErrZero = "TypeError: Division by zero.";

function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let arr;
    let i = 0;
    let res;
    expr = expr.trim();

    // вставить пробелы между значениями разных типов
    let curSymb = ' ';
    while (i < expr.length) {
        if (expr[i] === ' ' || curSymb === ' ') {

        } else {
            if (isSign(expr[i]) !== isSign(curSymb)) {
                expr = expr.slice(0, i) + ' ' + expr.slice(i);
                i = i + 1;
            }
        }
        curSymb = expr[i];
        i = i + 1;
    }

    let lArr = [];
    lArr = expr.split(' '); //преобразование строки в массив
    arr = lArr.filter(element => element !== ''); //удаление пустых элементов

    arr = searchBrackets(arr); //ищем скобки
    if (arr === messErrBrack) {
        throw messErrBrack;
    }

    //ищем лишние непарные скобки
    if (arr.includes('(', 0) === true || arr.includes('((', 0) === true) {
        throw messErrBrack;
    }

    if (arr.indexOf('(', 0) !== -1) {
        throw messErrBrack;
    }
    if (arr.indexOf(')', 0) !== -1) {
        throw messErrBrack;
    }

    res = takeOper(arr);
    res = Math.round(res * 10000) / 10000; //окр.до 4 зн.после запятой
    return res;
}

function takeOper(arr) {

    let curExp;
    let i = 0;
    while (i < arr.length - 1) {
        switch (arr[i]) {
            case '*':
                curExp = Number(arr[i - 1]) * Number(arr[i + 1]);
                arr.splice(i - 1, 3, curExp);
                break;
            case '/':
                if (Number(arr[i + 1]) === 0) {
                    throw messErrZero;
                }
                curExp = Number(arr[i - 1]) / Number(arr[i + 1]);
                arr.splice(i - 1, 3, curExp);
                break;
            default:
                i = i + 1;
                break;
        }
    }

    i = 0;
    while (i < arr.length - 1) {
        switch (arr[i]) {
            case '+':
                curExp = Number(arr[i - 1]) + Number(arr[i + 1]);
                arr.splice(i - 1, 3, curExp);
                break;
            case '-':
                curExp = Number(arr[i - 1]) - Number(arr[i + 1]);
                arr.splice(i - 1, 3, curExp);
                break;
            default:
                i = i + 1;
                break;
        }
    }
    return arr[0];
}

function searchBrackets(arr) {

    let posLeftBrack = 0;
    let posRightBrack = 0;
    let shortArr = [];
    let exp = '';
    let signNoBrackets = 0;
    while (signNoBrackets === 0) {
        posRightBrack = arr.indexOf(')', 0); //ищем закрывающую скобку
        if (posRightBrack === -1) {
            return arr;
        }
        posLeftBrack = arr.lastIndexOf('(', posRightBrack); //ищем левую скобку справа налево
        if (posLeftBrack === -1) {
            throw messErrBrack;
        }
        shortArr = arr.slice(posLeftBrack + 1, posRightBrack);
        exp = takeOper(shortArr); //вычисляем выражение в скобках
        arr.splice(posLeftBrack, posRightBrack - posLeftBrack + 1, exp); //в массиве заменяем выражение в скобках вычисленным значением
        //signNoBrackets = 1;
    }
    return arr;
}

function isSign(x) {

    if (strSign.indexOf(x, 0) === -1) {
        return false;
    }
    return true;
}

module.exports = {
    expressionCalculator
}

// const expr1 = " 84 + 62 / 33 * 10 + 15 "; //117.7879
// const expr2 = " 34 * 18 * 55 - 50 "; //33610.0000;
// const expr3 = " 20   - 57 * 12 - (  58  + 84 * 32  / 27  ) "; // -821.5556
// const expr4 = " 58 * 85 * (  1 + 16 * 7 + (  82 * 31 * (  85 / 75 - 51 - 22  ) + 2 - 24  )  ) * 22 * (  27 + 67 + 0 + 93  ) "; //-3703376512014.6670;
// const expr5 = " (  (  60 - 42 - 16 / 100  ) * (  29 * 88 + 51 + 77  ) - 49 - 59  ) - 89 * 45 "; //43698.2000;
// const expr6 = " 1 + 2) * 3";
// console.log(expressionCalculator(expr1));
// console.log(expressionCalculator(expr2));
// console.log(expressionCalculator(expr3));
// console.log(expressionCalculator(expr4));
// console.log(expressionCalculator(expr5));
// console.log(expressionCalculator(expr6));