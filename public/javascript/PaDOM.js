
function empty(s){
    let n=s.length
    for(let i=0;i<n;i++){
        if(s[i]!=' ')return false;
    }return true;
}
//empty check
let ul=document.getElementById('u');
let frm2=document.getElementById('f');
let done_btn=document.getElementById('finish');
let frm1=document.getElementById('adder-form');
let task_toAdd=document.getElementById('task-input');
let socket=io();
let email=document.getElementById('userid').value
let progress=document.getElementById('progress');
let ejs=document.getElementById('ejs');
let uprogress=parseInt(ejs.getAttribute('progress'));
progress.value=uprogress;
progress.textContent=uprogress+'%';
progress.style.width=uprogress+'%'

frm1.addEventListener('submit',(e)=>{
e.preventDefault();
if(!empty(task_toAdd.value)&&task_toAdd.value.length<=150){
let inp=document.createElement('input');
let li=document.createElement('li');
let span=document.createElement('span');
let tta=JSON.parse(JSON.stringify(task_toAdd.value))
let words=[]
let str=""
for(let i=0;i<tta.length;i++){
if(tta[i]==' '){
    words.push(str)
    str=''
}
    str+=tta[i]
}
words.push(str)
console.log(words+" hi")
let result=''
let sentence=""
let prev=""
for(let k of words){
    sentence+=k;
    if(sentence.length>36){
   if(prev.length){
    result+=prev+' \n';
    sentence=sentence.slice(prev.length)
   }
   //safe split
   for(let i=0;i<sentence.length;i++){
    if(i&&!(i%36))sentence=sentence.slice(0,i)+' \n'+sentence.slice(i+1)
   }
console.log(sentence)
console.log(result)
   result+=sentence+' \n'
   sentence=''

    }
    else if(sentence.length==36){
        result+=sentence+' \n'
        sentence=''
    }
    prev=sentence


}

result+=sentence

span.innerText=result;
inp.type="checkbox";
inp.className="task-check";
li.appendChild(inp);
li.appendChild(span);
console.log(email);
socket.emit("/add_task",{task:result,email:email});
task_toAdd.value='';
ul.className='listanimate';
setTimeout(()=>
ul.appendChild(li),200)
setTimeout(()=>{ul.className=''},300);

    setTimeout(() => {li.classList.add('animate');
        
    }, 500);
}
else if(task_toAdd.value.length>150){
let container=document.getElementById("add");
let message=document.createElement('div');
message.innerText="Tasks Cannot Exceed 150 caracters in Total";
container.appendChild(message);

}
task_toAdd.value='';
})
    let toberemoved=[]
frm2.addEventListener('submit',(e)=>{
e.preventDefault();
done_btn.disabled=true;
let checked= document.getElementsByClassName('task-check');
    console.log(checked.length);
    let el=0;
while(el<checked.length){
    let element= checked[el];
    if(element.checked){
         toberemoved.push(el);
    let listitem= element.parentElement
   setTimeout(async() => {
     listitem.classList.remove('animate')
   
   }, 100);
   setTimeout(async() => {
       listitem.remove()
   
   }, 500);  
        
    }
       checked[el].checked= false;
        el++;
}console.log(toberemoved);

socket.emit('/remove_task',{tasks:toberemoved,email:email})
toberemoved= []
socket.on('progress',(data)=>{
if(data>=100){
   // startConfetti()
    progress.className='fadeout';
    setTimeout(()=>{progress.textContent='Congratulations';
    progress.style.width='100%';},200);
    setTimeout(()=>{progress.className=''},300);

    setTimeout(()=>{
    progress.className='fadeout';},2000)

    setTimeout(()=>{progress.textContent='0%';progress.style.width='0%';
    progress.value=0;},2200);
    setTimeout(()=>{progress.className=''},2300);
    //stopConfetti()

}
else{
    let total=data
    progress.style.width=total+'%';
    progress.textContent=total+'%'
    progress.value=total

}

done_btn.disabled=false;
})
})

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