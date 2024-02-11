
function check(a){
    if(!a)return false;
    for(let k of a){
        if(!k&&k!=0)return false;
        else if(typeof k !="number")return false;
        else if(k>20.00||k<0.00)return false;
    }return true;
}
socket=io();
let form=document.getElementById('form');
let notif=document.getElementById('notif');
let btn=document.getElementById('btn');
let p=document.getElementById('field');
let dv=document.getElementById('result')
form.addEventListener('submit',(e)=>{
p.textContent=""
dv.style=""
notif.style=""
notif.textContent=""
    btn.disabled=true
  e.preventDefault();
  let bde=parseFloat(document.getElementById('bde').value);
  let bdtp=parseFloat( document.getElementById('bdtp').value);
  let bdds=parseFloat( document.getElementById('bdds').value);
  
  let ee=parseFloat(document.getElementById('ee').value);
  let etp=parseFloat( document.getElementById('etp').value);
  let eds=parseFloat( document.getElementById('eds').value);

  
  let mde=parseFloat(document.getElementById('mde').value);
  let mdds=parseFloat( document.getElementById('mdds').value);
  
  let tde=parseFloat(document.getElementById('tde').value);
  let tdds=parseFloat( document.getElementById('tdds').value);
  
  let asde=parseFloat(document.getElementById('asde').value);
  let asdds=parseFloat( document.getElementById('asdds').value);
  
  let fe=parseFloat(document.getElementById('fe').value);
  let fds=parseFloat( document.getElementById('fds').value);
  
  let ae=parseFloat(document.getElementById('ae').value);
  let ads=parseFloat( document.getElementById('ads').value);
  
  let pse=parseFloat(document.getElementById('pse').value);
  let psds=parseFloat( document.getElementById('psds').value);
  
  let ceie=parseFloat(document.getElementById('ceie').value);
  let ceids=parseFloat( document.getElementById('ceids').value);
  
  let ppe=parseFloat(document.getElementById('ppe').value);
  let pptp=parseFloat( document.getElementById('pptp').value);
  
  let aoe=parseFloat(document.getElementById('aoe').value);
  let aotp=parseFloat( document.getElementById('aotp').value);
  let body=document.querySelector('body')
  if(check([ee,eds,etp,bde,bdtp,bdds,pse,psds,mdds,mde,tde,tdds,asde,asdds,fe,fds,pse,psds,ceie,ceids,ppe,pptp,aoe,aotp])){
    
    let emoy=parseFloat((2*eds+2*etp+6*ee)/10);
    let bdmoy=parseFloat((2*bdds+2*bdtp+6*bde)/10);
    let tdmoy=parseFloat((tdds+2*tde)/3);
    let mdmoy=parseFloat((mdds+2*mde)/3);
    let psmoy=parseFloat((psds+2*pse)/3);
    let ppmoy=parseFloat((pptp+2*ppe)/3);
    let aomoy=parseFloat((aotp+2*aoe)/3);
    let ceimoy=parseFloat((ceids+2*ceie)/3);
    let asdmoy=parseFloat((asdds+2*asde)/3);
    let fmoy=parseFloat((2*fds+8*fe)/10);
    let amoy=parseFloat((2*ads+8*ae)/10);
    
   

    let mg=parseFloat((1.5*mdmoy+2*psmoy+1.5*tdmoy+3*ppmoy+2*asdmoy+3*bdmoy+2*aomoy+3*emoy+amoy+fmoy+ceimoy)/21);
   
     let total=parseFloat(mg.toFixed(2))
     if(total>=10.00){
        notif.textContent="Admis"
        notif.style="color:rgba(0, 253, 148, 0.753);"
        dv.style="border:0.08em solid rgba(0, 253, 148, 0.753)"
     }
     else{
        dv.style="border:0.08em solid rgba(253, 0, 0, 0.753)"

     }
     p.textContent=total
     

  }
  else{
    notif.textContent="Check For Input Errors";


  }
  
  btn.disabled=false
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