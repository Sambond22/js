let model=document.querySelector(".modal");
let overlay=document.querySelector(".overlay");

function openModal(){
    console.log("Modal is open");
    model.classList.add("active");
    overlay.classList.add("overlayactive");
}

function closeModal(){
    console.log("Modal is open");
    model.classList.remove("active");
    overlay.classList.remove("overlayactive");
}








