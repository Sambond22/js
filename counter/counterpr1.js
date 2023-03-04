let val=document.getElementById('data');

function decrementt(){
    let vv=parseInt(val.textContent);
    vv=vv-1;
    val.textContent=vv;
}
function incrementt(){
    let vv=parseInt(val.textContent);
    vv=vv+1;
    val.textContent=vv;
}
function ii()
{
     val.textContent=0;
}