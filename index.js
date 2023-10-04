const display1 = document.querySelector('.dis1');
const display2 = document.querySelector('.dis2');
const display3 = document.querySelector('.dis3');
const number_cons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.oper');
const equal_btn = document.querySelector('.equal');
const clr = document.querySelector('.clear');
const ce_btn = document.querySelector('.ce_clear');

let dis1_num = '';
let dis2_num = '';
let result = null;
let last_oper = '';
let dot_btn = false;

display2.innerText = "0";         // Dispalying 0 on the screen initially

number_cons.forEach( number => {

    number.addEventListener('click', (e)=> {            // click handler to detect click event on number buttons       

        if (e.target.innerText === '.' && !dot_btn) {       // manipulating dot, in case of handling floating point literals.
            dot_btn = true;
        } else if (e.target.innerText == '.' && dot_btn){   // if a dot has already been included, it wont allow the next time
            return;
        }

        dis2_num += e.target.innerText;         // each time any number gets clicked, it is appended onto screen display
        display2.innerText = dis2_num;          // numbers clickedare dispalyed on screen
    })

})

// Click handler attaches when any of the operators has been clicked
operators.forEach( oper => {
    oper.addEventListener('click', (e)=> {
        if (!dis2_num) return;              // if no number is prsent in disaply, simply return
        dot_btn = false;

        const operation = e.target.innerText;

        if (dis1_num && dis2_num && last_oper) {
            calculation();                          // the math calculation is performed when the operands are available
        } else{
            result = parseFloat(dis2_num);          // otherwise simply it will display the number typed previously
        }
        clearDisplay(operation);                    // calling clearDisplay to reset the screen after calculation
        last_oper = operation;
    })

})


function clearDisplay(op = ''){
    dis1_num += dis2_num+ ' ' + op + ' ';
    display1.innerText = dis1_num;             // disaply1 would display on top, the first operand and operator typed as entire string 
    dis2_num = '';
    display2.innerText = '';                    // dispaly2 set to empty string for allowing next operand to be stored in it.
    display3.innerHTML = result;                // the result is displayed in answer panel i.e. display3
}

// Logic to perform basic math calcuclation
function calculation(){
    if (last_oper === 'x') {
        result = parseFloat(result) * parseFloat(dis2_num)
    } else if (last_oper === '+') {
        result = parseFloat(result) + parseFloat(dis2_num)
    } else if (last_oper === '-') {
        result = parseFloat(result) - parseFloat(dis2_num)
    } else if (last_oper === '/') {
        result = parseFloat(result) / parseFloat(dis2_num)
    } else if (last_oper === '%') {
        result = parseFloat(result) % parseFloat(dis2_num)
    }
}

// On click of "=" button will perform calculation and display on the screen, calculated result
equal_btn.addEventListener('click', (e)=>{
    if (!dis1_num || !dis2_num) return;
    dot_btn = false;
    calculation();
    clearDisplay();
    display2.innerText = result;
    display3.innerText = '';
    dis2_num = result;
    dis1_num = '';
})

// CLicking Clr btn will clear the display
clr.addEventListener('click', (e)=>{
    display1.innerText = '0';
    display2.innerText = '0';
    display3.innerText = '';
    dis2_num = '';
    dis1_num = '';
    result = '';
})

// Clicking CE button will clear last operand
ce_btn.addEventListener('click', (e)=>{             
    display2.innerText = '';
    dis2_num = '';
});



