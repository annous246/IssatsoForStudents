
function clock(){
    let hourspan=document.getElementById('hour')
    let minutespan=document.getElementById('minute')
    let secondspan=document.getElementById('second')
    let date=new Date();
    let hour=date.getHours();
    let minute=date.getMinutes();
    let second=date.getSeconds();
    if(hour<10){
    hourspan.innerText="0"+hour;

    }
    else
    hourspan.innerText=hour;
    if(minute<10){
    minutespan.innerText="0"+minute;

    }
    else
    minutespan.innerText=minute;
    if(second<10){
    secondspan.innerText="0"+second;

    }
    else
    secondspan.innerText=second;

    }
    setInterval(clock,500);
    
document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });