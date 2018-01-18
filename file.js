var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let a = 0;
let b = 0;
let resultArray = [];
let stack = [];


function postfixCalc(expression) {
    stack = [];
    expression = expression.split(' ');
    for(let i = 0; i < expression.length; i++){
        switch(expression[i]) {
            case '+': // a-b
                b = stack.pop();
                a = stack.pop();
                stack.push(a-b);
                break;
            case '-': // a+b+8 
                b = stack.pop();
                a = stack.pop();
                stack.push(a+b+8);
            break;
            case '*': // a%b
                b = stack.pop();
                a = stack.pop();
                if(b == 0){stack.push(42);}
                else{stack.push(a%b);};
            break;
            case '/': // a/b
                b = stack.pop();
                a = stack.pop();
                if(b == 0){stack.push(42)}
                else{stack.push(a/b);};
            break;
            default:
                stack.push(parseInt(expression[i]));
        }
        // console.log(expression);
        // console.log(stack, a, b);
    };
    return stack[0];
};


var req = new XMLHttpRequest();
req.open("GET", "https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task", false);
req.send(null);
let task = JSON.parse(req.responseText);

for (let index = 0; index < task['expressions'].length; index++) {
    resultArray.push(postfixCalc(task['expressions'][index]));
};
// console.log('arr just after calcing',resultArray);

var res = new XMLHttpRequest();
res.open("POST", "https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task", false);
let sendingMessage = JSON.stringify({
                        id: task['id'],
                        results: resultArray,
                    });
// sendingMessage = '{ "id":"' + task['id'] + ',"results":"'+ resultArray.toString() +'"}' // \'
console.log(JSON.parse(sendingMessage)["results"].toString() === resultArray.toString());


res.setRequestHeader('Content-Type', 'json');
res.send(sendingMessage);

console.log('res status: ', res.status, res.statusText);
// console.log(typeof JSON.parse(res.responseText));
console.log('res.text: ', JSON.parse(res.responseText));
// https://u0byf5fk31.execute-api.eu-west-1.amazonaws.com/etschool/task
// https://www.eliftech.com/school-task

