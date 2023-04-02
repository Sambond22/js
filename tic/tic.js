let boxes=document.querySelectorAll(".box");
let players=document.querySelector(".player");
let newgame=document.querySelector(".btn");



let currentplayer;
let grid;
const winpos=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
intial();
// function for intialisation
function intial(){
   currentplayer='X';
   grid=["","","","","","","","",""];
 //UI pe empty krna pdega after win
   // after newgame click

   boxes.forEach((box,index)=>{
      box.textContent="";
      box.classList.remove('win');/*for removing green colour */
   });
   boxes.forEach((box)=>{
      box.style.pointerEvents='all';
   })
   newgame.classList.remove('active');
   players.textContent=`Current Player-${currentplayer}`;  

}

// boxes.forEach((box,index)=>{
//    box.addEventListener("click",()=>{
// handleclick(index);
//    })
// });

boxes.forEach((box,index)=>{
   box.addEventListener("click",()=>{
handleclick(index);
   })
});  

function handleclick(index){
   // check phle se to koi elemetn nhi he
   if(grid[index]===""){
      // UI update
      boxes[index].textContent=currentplayer;
    
   //   our grid status update
      grid[index]=currentplayer;
      // x to 0 or 0 to x
      swap();
      // check it win or not
      checkwin();

   }

}


 



function swap(){
if(currentplayer==='X'){
   currentplayer='0';
}
else{
   currentplayer='X';
}
// UI update
players.textContent=`Current Player -${currentplayer}`;
}


function checkwin(){
let ans='';
winpos.forEach((item,index)=>{
   if((grid[item[0]]!=""||grid[item[1]]!=""||
   grid[item[2]]!="")&&(grid[item[0]]==
      grid[item[1]]&&grid[item[1]]==grid[item[2]] )){

         if(grid[item[0]]==='X'){
            ans='X';
         }
         else{
            ans='0';
         }
         boxes.forEach((box)=>{
            box.style.pointerEvents='none';
         })

         boxes[item[0]].classList.add('win');
         boxes[item[1]].classList.add('win');
         boxes[item[2]].classList.add('win');
        
      }
      // disable pointer
    
   //  idk why prevedefalut notworking 
    // boxes.forEach((box)=>{
      //    box.addEventListener('click',function(e){
      //       e.preventDefault();
      //    });
      // });
      // so we use pointerevents
      
      
      
   
});

if(ans!=""){
   players.textContent=`Winner-${ans}`;
   newgame.classList.add("active");

}
else{
// if draw
let count=0;
grid.forEach((box)=>{
if(box!==""){
   count++;
}
});
if(count==9){
   players.textContent="Game-Teid !!";
   newgame.classList.add("active");
}
}
}
newgame.addEventListener("click",intial);