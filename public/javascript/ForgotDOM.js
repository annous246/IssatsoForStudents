
let socket=io()
let form=document.getElementById('v-container');
    let input=document.getElementById('email')
    let notif=document.getElementById('notif')
    let btn=document.getElementById('btn')
    let time=document.getElementById('timer')
form.addEventListener('submit',(e)=>{

    btn.disabled=true
      e.preventDefault()
      //socket to check validity of email and expiration
      socket.emit('forgot',input.value)
      socket.on('forgot check',(d)=>{
        if(!d){
            notif.textContent="Email Not Registered"
              btn.disabled=false
        }
        else if(d<0){
            notif.textContent="You Can Send Such A Request Every 5 Minutes"
            let timer=d+600;
            let int=setInterval(()=>{time.textContent=timer+" Seconds Left Until Next Attempt";timer--;},1000)

            
            
            setTimeout(()=>{
            btn.disabled=false
            clearInterval(int); time.textContent=""

            },timer*1000)

        }
        else{
            notif.textContent="A Reset Email Has Been Sent"
    let timer=300;
            let int=setInterval(()=>{time.textContent=timer+" Seconds Left Until Next Attempt";timer--;},1000)

            
            setTimeout(()=>{
            btn.disabled=false
            clearInterval(int); time.textContent=""

            },timer*1000)

        }
      })

})