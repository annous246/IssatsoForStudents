
function clocked(){
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
    setInterval(clocked,500);





    //****** */
    
let defaultbutton=1,ok=0;;
let socket=io()
let daycnt=(new Date()).getDay();
if(daycnt){
    let cadency=['h','qa','qb','z3','z4'];
    let z='z4',q='qb';
    let day=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    let timing={
        's1':{begin:'8:30',end:'10:00'},//change them to pure seconds at once
        's2':{begin:'10:10',end:'11:40'},
        's3':{begin:'11:50',end:'13:20'},
        's4':{begin:'13:50',end:'15:20'},
        's5':{begin:'15:30',end:'17:00'},
        's6':{begin:'17:10',end:'18:40'},
    }
    let beginnings=[30600,36600,42600,49800,55800,61800,70000];
    let seancelength=5400//in seconds
    let g11,g12;
    let buttonscroll=1;
    let fbtn=document.getElementById('sg1');
    let sbtn=document.getElementById('sg2');
    let lbtn=document.getElementById('left');
    let rbtn=document.getElementById('right');
    let group=document.getElementById('group');
    let subject=document.getElementById('subject');
    let room=document.getElementById('room');
    let timer=document.getElementById('timevalue');
    let minutes=document.getElementById('minutes');
    let seconds=document.getElementById('seconds');
    let tl=document.getElementById('tl');
    let clock=document.getElementById('tl');
    let livetracker=document.getElementById('live-tracker');
    let currentinterval=null;
    let animationintervall=null;
    socket.emit("getscheddata",day[daycnt]);
    socket.on("schedreveived",(d)=>{
        //d is specific day
         g11=d['g11'];
         g12=d['g12'];
         g21=d['g21'];
         g22=d['g22'];
         g31=d['g31'];
         g32=d['g32'];
         g41=d['g41'];
         g42=d['g42'];
         let groups=[g11,g12,g21,g22,g31,g32,g41,g42];
    
        //TODO EXPAND
        //loop through seances with settimeout inside and setinterval
        //*****************
    
    //*initialize
    if(defaultbutton==1){
        currentinterval=dogroup(g11,ok)
    
    }
    else{
       currentinterval= dogroup(g12,ok)
    }
    //*************
    
    fbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        fbtn.disabled=true
        if(defaultbutton==2){//switch
            clearInterval(currentinterval)
            defaultbutton=1;
            subject.textContent="Matiere : Pending..."
            room.textContent="Salle : Pending..."
            minutes.textContent="00"
            seconds.textContent="00"
            group.firstChild.textContent="Group"+buttonscroll+":1"
            currentinterval=dogroup(groups[(buttonscroll-1)*2],ok);
            minutes.className="blur"        //animate loading
            setTimeout(()=>{
            minutes.className=""},1000)
            
            seconds.className="blur"        //animate loading
            setTimeout(()=>{
            seconds.className=""},1000)
        }
        fbtn.disabled=false
      })
    
      sbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        sbtn.disabled=true
        if(defaultbutton==1){
            clearInterval(currentinterval)
            defaultbutton=2;
            group.firstChild.textContent="Group"+buttonscroll+":2"
            room.textContent="Salle : Pending..."
            minutes.textContent="00"
            seconds.textContent="00"
            subject.textContent="Matiere : Pending..."
           
            currentinterval=dogroup(groups[(buttonscroll-1)*2+1],ok);
            
            minutes.className="blur"        //animate loading
            setTimeout(()=>{
            minutes.className=""},1000)
            
            seconds.className="blur"        //animate loading
            setTimeout(()=>{
            seconds.className=""},1000)
    
        }
        sbtn.disabled=false
      })
    
    
      lbtn.addEventListener('click',async (e)=>{
        lbtn.disabled=true;
        e.preventDefault();
         clearInterval(currentinterval)
         clearInterval(animationintervall)
        defaultbutton=1//reset sous groupe button
        if(buttonscroll>1){
            buttonscroll--;
        }
        else buttonscroll=4;
            group.firstChild.textContent="Group"+buttonscroll+":1"
            room.textContent="Salle : Pending..."
            minutes.textContent="00"
            seconds.textContent="00"
            subject.textContent="Matiere : Pending..."
            currentinterval=dogroup(groups[(buttonscroll-1)*2],ok)
        //await building
         animationintervall=setInterval(()=>{
            if(room.textContent=="Salle : Pending..."){
                if(room.className==""){ subject.className="hide";
                    room.className="hide";}
                else {
                    subject.className="";
                    room.className="";
                }
                
            }
            else{subject.className="";
                    room.className="";
            clearInterval(animationintervall);
            }
        },800)
        
        lbtn.disabled=false;
      })
    
      
      rbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        rbtn.disabled=true;
        defaultbutton=1//reset sous groupe button
        clearInterval(currentinterval)
        clearInterval(animationintervall)
        buttonscroll=(buttonscroll)%4+1
        room.textContent="Salle : Pending..."
        minutes.textContent="00"
        seconds.textContent="00"
        subject.textContent="Matiere : Pending..."
        group.firstChild.textContent="Group"+buttonscroll+":1"
            
        currentinterval=dogroup(groups[(buttonscroll-1)*2],ok)
        //await building
        animationintervall=setInterval(()=>{
            if(room.textContent=="Salle : Pending..."){
                if(room.className==""){ subject.className="hide";
                    room.className="hide";}
                else {
                    subject.className="";
                    room.className="";
                }
                
            }
            else{subject.className="";
                    room.className="";
            clearInterval(animationintervall);
            }
        },800)
        rbtn.disabled=false;
    
      })
    })
    
    function dogroup(g,ok){
        //************************** sg1
        let livetracker=document.getElementById('live-tracker');
        let subject=document.getElementById('subject');
        let room=document.getElementById('room');
        let group=document.getElementById('group');
        let timer=document.getElementById('timevalue');
        let minutes=document.getElementById('minutes');
        let seconds=document.getElementById('seconds');
        let tl=document.getElementById('tl');
        let clock=document.getElementById('tl');
        let lastseancecount=0;
        let seancecount=0;
        for(let k=0;k<g.length;k++){
            let cad=cadency[parseInt(g[k].period)-1];
            if((g[k].status=="1")&&(cad=='h'||cad==q||cad==z)){
                console.log(g[k]);
                if(!seancecount)seancecount=k+1;
                lastseancecount=k+1;
            }
        }
    
let beginnings=[30600,36600,42600,49800,55800,61800,70000];
let firstbegin=beginnings[seancecount-1];
            let today=new Date();//now time
            //pause
    
    
    
    
            
            let interval=setInterval(()=>{
                
           let cdn='p';
           if(g[seancecount-1])cdn=cadency[parseInt(g[seancecount-1].period)-1]
          // console.log(seancecount)
                if(lastseancecount<seancecount){
               
               clearInterval(interval);//clearing interval
            minutes.textContent="00"
            seconds.textContent="00"
            subject.textContent="Done For The Day"
            tl.textContent="";
            room.textContent="";
    
            }
                else if(((g[seancecount-1].status=="0")||(cdn!='h'&&cdn!=z&&cdn!=q))&&seancecount<=lastseancecount){seancecount++;ok=0}//skips empty seances
              
             else{//all in here
            let end=beginnings[seancecount-1]+seancelength;
            let begin=beginnings[seancecount-1];
            
            tl.textContent="Time Left";
                
    
            let currenttime=parseInt((parseInt((new Date()).getHours())*3600+parseInt(new Date().getMinutes())*60+parseInt(new Date().getSeconds())));
            
                if( currenttime>end){
                //seance eneded
                ok=1;
                seancecount++;
            }
            else if(currenttime<begin){
                //Still no class or  pause
                
                if(begin==firstbegin){
                    //beginning of the day
                let timeleft=begin-currenttime;
                room.textContent="";
                subject.textContent="Classes are yet to begin"
                let mins=parseInt(timeleft/60),secs=timeleft-(mins)*60;
                        //input time left;00:00
                        let filler1='',filler2='';
                        if(mins<10)filler1='0'
                        if(secs<10)filler2='0'
                        minutes.textContent=filler1+JSON.stringify(mins)
                        seconds.textContent=filler2+JSON.stringify(secs)
                        
                        mins=timeleft/60,secs=timeleft-(mins)*60;
                }
                else{
                    //a pause
                    
                let timeleft=begin-currenttime;
                room.textContent="";
                subject.textContent="Pause"
                let mins=parseInt(timeleft/60),secs=timeleft-(mins)*60;
                        //input time left;00:00
                        let filler1='',filler2='';
                        if(mins<10)filler1='0'
                        if(secs<10)filler2='0'
                        minutes.textContent=filler1+JSON.stringify(mins)
                        seconds.textContent=filler2+JSON.stringify(secs)
                        
                        mins=timeleft/60,secs=timeleft-(mins)*60;
                }
    
    
    
            }
            else if(begin<=currenttime&&end>=currenttime){
                //included in a seance
               
                let timeleft=end-currenttime;
                
                room.textContent=g[seancecount-1].class;
                subject.textContent=g[seancecount-1].seanceName;
                let mins=parseInt(timeleft/60),secs=timeleft-(mins)*60;
                let filler1='',filler2='';
                //input time left;00:00
                if(secs<10)filler2='0'
                if(mins<10)filler1='0'
                seconds.textContent=filler2+JSON.stringify(secs)
                minutes.textContent=filler1+JSON.stringify(mins)
                        
    
                
    
            }
            }
    
    
            },1000)
            return interval
    
    
    }

}
else{//sunday
    let group=document.getElementById('group');
    let subject=document.getElementById('subject');
    group.textContent="Chill"
    subject.textContent="Its Sunday"


}
//**************************************************************************** */
    
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