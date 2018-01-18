let fetch = require("node-fetch")


let a = 0;
let b = 0;
let i = 0;
let id = '';
let resultArray = [];
let stack = [];


function postfixCalc(expression) {
    stack = [];
    expression = expression.split(' ');
    for (i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case '+': // a-b
                b = stack.pop();
                a = stack.pop();
                stack.push(parseInt(a - b));
                break;
            case '-': // a+b+8 
                b = stack.pop();
                a = stack.pop();
                stack.push(parseInt(a + b + 8));
                break;
            case '*': // a%b
                b = stack.pop();
                a = stack.pop();
                if (b == 0) { stack.push(42); }
                else { stack.push(parseInt(a % b)); };
                break;
            case '/': // a/b
                b = stack.pop();
                a = stack.pop();
                if (b == 0) { stack.push(42) }
                else { stack.push(parseInt(a / b)); };
                break;
            default:
                stack.push(parseInt(expression[i]));
        };
    };
    return stack[0];
};


fetch('https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task')
    .then(function (response) {
        return response.json();
    })
    .then(function (task) {
/*recieved expr*/ console.log(task['expressions']);
        for (let index = 0; index < task['expressions'].length; index++) {
            resultArray.push(postfixCalc(task['expressions'][index]));
        };
        id = task['id']
/*sending body*/  console.log(JSON.stringify({ id: task['id'], results: resultArray }));
        return JSON.stringify({ id: task['id'], results: resultArray })
    })
    .then(function (calc) {
        fetch('https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task', { method: 'POST', body: calc })
            .then(response => response.json())
            .then(function (x) {
                if (x.passed == true) {
                    console.log('Hold on, ElifTech School, I\'m coming ')
                } else { console.log('Hold on, ElifTech School, I almost there') }
            })
    })
