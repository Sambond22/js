let inputslider=document.querySelector("[data-lenSlider]");
let displaylength=document.querySelector("[data-psdlength]");
let lighttt=document.querySelector("[data-redlight]");

let lengthh=10;
handlelength();
function handlelength(){
    displaylength.textContent=lengthh;
    inputslider.value=lengthh;
    // for background of slidder
    // min and max length of our slider inputslider.min/max;
    // let minnnn=inputslider.min;
    // let maxxxx=inputslider.max;
    let minnnn=0;let maxxxx=20;
    inputslider.style.backgroundSize=((lengthh-minnnn)*100)/(maxxxx-minnnn)+ "% 100%";
    
    // for width ((lengthh-minnnn)*100)/(maxxxx-minnnn)+ "% 
    // for height 100%
}
// method 1
// function inputslide(e){
//     inputslider.value=e.target.value;
//     displaylength.textContent=e.target.value;
// }
// method 2
function inputslide(event){
    lengthh=event.target.value;
    handlelength();
}
inputslider.addEventListener('input',inputslide);

function providerange(minn , maxx)
{
    return Math.floor(Math.random()*(maxx-minn))+minn;
}

// fromCharCode => it can covert unicode to string 
function provideuppercase(){
    return String.fromCharCode(providerange(65,90));

}

function providelowercase(){
    return String.fromCharCode(providerange(97,122));
    
}

function providenumber(){
    return providerange(0,9);
    
}

// for symbol
let allsymbol="`~@#$%^&*()_+-=[]{}\|:<>?,./;''";
function providesymbol(){
// charAt => it pick that character at given index
    let numberr= providerange(0,allsymbol.length);
   return  allsymbol.charAt(numberr);
}
lightt("white");
function lightt(colorr)
{
   lighttt.style.backgroundColor=colorr;
}

let uppercaseCheck = document.querySelector("#uppercase");
let lowercaseCheck = document.querySelector("#lowercase");
let numbersCheck = document.querySelector("#number");
let symbolsCheck = document.querySelector("#symbol");



function calcStrength() 
{
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && lengthh >= 8) {
      lightt("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNum || hasSym) &&lengthh >= 6) {
      lightt("#ff0");
    } 
    else {
      lightt("#f00");
    }
}

let copybtn=document.querySelector("[data-copyy]");
let passwordDisplay =document.querySelector("[data-pswdislplay ");
let copyMsg=document.querySelector("[data-cpymsg]")
async function copyContent() {
    
    //  navigator.clipboard.writeText(passwordDisplay.value);
    /*above line is use to copy the text which is on your clipboard 
    this line give promise that why async funciton use if they resolve thats ok if reject than it 
    give error so erro handling is done in this (below) way*/
    
    
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    {
        copyContent();
    }
    
})


let checkbtncount=0;
password = "";
uppercaseCheck.addEventListener('click',()=>{
    if(uppercaseCheck.checked)
    checkbtncount=checkbtncount+1;
})
lowercaseCheck.addEventListener('click',()=>{
     if(uppercaseCheck.checked)
    checkbtncount=checkbtncount+1;
})
numbersCheck.addEventListener('click',()=>{
    if(uppercaseCheck.checked)
    checkbtncount=checkbtncount+1;
})
symbolsCheck.addEventListener('click',()=>{
    if(uppercaseCheck.checked)
    checkbtncount=checkbtncount+1;
})
// if(lengthh<checkbtncount)
// {
//     lengthh=checkbtncount;
//     handlelength();
// }
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        // random index for swapping
        const j = Math.floor(Math.random() * (i + 1));
        // swapping method
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((e) => (str += e));
    return str;
}

let gnrbtn=document.querySelector(".generatebutn");
gnrbtn.addEventListener('click',()=>{
    if(checkbtncount == 0) return;

if(lengthh < checkbtncount) {
   
    lengthh = 4;
    handlelength();
}
console.log("Starting the Journey");
//remove old password
password = "";

//let's put the stuff mentioned by checkboxes

// if(uppercaseCheck.checked) {
//     password += generateUpperCase();
// }

// if(lowercaseCheck.checked) {
//     password += generateLowerCase();
// }

// if(numbersCheck.checked) {
//     password += generateRandomNumber();
// }

// if(symbolsCheck.checked) {
//     password += generateSymbol();
// }

let funcArr = [];

if(uppercaseCheck.checked)
    funcArr.push(provideuppercase);

if(lowercaseCheck.checked)
    funcArr.push(providelowercase);

if(numbersCheck.checked)
    funcArr.push(providenumber);

if(symbolsCheck.checked)
    funcArr.push(providesymbol);

//compulsory addition
for(let i=0; i<funcArr.length; i++) {
    console.log("aadding funciton")
    password += funcArr[i]();
}
console.log(lengthh);
console.log(funcArr.length);
console.log("llll");
//remaining adddition
for(let i=0; i<lengthh-funcArr.length; i++) {
    let randIndex = providerange(0 , funcArr.length);
    console.log(randIndex+"jhuh");
    console.log("first");
  console.log("reamaing add")
    password += funcArr[randIndex]();
}

//shuffle the password
password = shufflePassword(Array.from(password));

//show in UI
passwordDisplay.value = password;

//calculate strength
calcStrength();
});

