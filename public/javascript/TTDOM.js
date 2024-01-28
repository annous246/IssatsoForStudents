
let ejs=document.getElementById('ejs')
let grp=ejs.getAttribute('group')
let cls=ejs.getAttribute('class')
let socket=io()
monday()
tuesday()
wednesday()
thursday()
friday()
saturday()
doublesave()



function doublesave(){
const formed = document.getElementById('Monday');
const dbtn = document.getElementById('double');

dbtn.addEventListener('click', function(e) {
console.log("hi")
e.preventDefault();
const formData = new FormData(formed);
const payload = new URLSearchParams(formData);
fetch('http://localhost:3000/double_save', {
method: 'POST',
body: payload,
})
.then(res =>{
if(res.redirected){
window.location.href=res.url
}
})
.catch(() => console.log("error fetching"))
})

}
function monday(){

let mfrm=document.getElementById('Monday');
let madder=document.getElementById('Monday-adder-btn');
let mseances=document.getElementsByClassName('mseance')


madder.addEventListener('click',(e)=>{
    e.preventDefault();
    madder.disabled=true
    let container=madder.parentElement
    let seancecounter=container.children[container.children.length-3]
    console.log(seancecounter)
    let count
    if(seancecounter==undefined){
        count=0;
        count++;

    }
    else{
    let content=seancecounter.textContent
     count=parseInt(content.substring(1))+1;

    }
    let seance=document.createElement('div')
    seance.className="mseance seance"

    let seancecount=document.createElement('span')
    seancecount.textContent="S"+count;


    let seancename=document.createElement('label')
    seancename.textContent="Seance Name"
    

    let seancetype=document.createElement('label')
    seancetype.textContent="Seance Type"
    

    let seanceclass=document.createElement('label')
    seanceclass.textContent="Seance Classroom"
    

    let seancecadence=document.createElement('label')
    seancecadence.textContent="Seance Cadence"
    

    let seanceprof=document.createElement('label')
    seanceprof.textContent="Seance Professor"


    let seancenamein=document.createElement('input')
    seancenamein.type="text"
    seancenamein.placeholder="Web Dev"
    seancenamein.required=true
    seancenamein.name="msn"+count

    let seancetypein=document.createElement('input')
    seancetypein.type="text"
    seancetypein.placeholder="Lecture"
    seancetypein.required=true
    seancetypein.name="mst"+count

    let seancestatus=document.createElement('input')
    seancestatus.type="hidden"
    seancestatus.value="1"
    seancestatus.name="mss"+count

    let seanceclassin=document.createElement('input')
    seanceclassin.type="text"
    seanceclassin.placeholder="A04"
    seanceclassin.required=true
    seanceclassin.name="msc"+count

    let seancecadencein=document.createElement('select')
    seancecadencein.name="msw"+count


    let seanceprofin=document.createElement('input')
    seanceprofin.type="text"
    seanceprofin.placeholder="John Doe"
    seanceprofin.required=true
    seanceprofin.name="msp"+count

    let qa=document.createElement('option')
    qa.value='2'
    qa.textContent='QA'

    let qb=document.createElement('option')
    qb.value='3'
    qb.textContent='QB'

    let z3=document.createElement('option')
    z3.value='4'
    z3.textContent='Z3'

    let z4=document.createElement('option')
    z4.value='5'
    z4.textContent='Z4'

    let h=document.createElement('option')
    h.value='1'
    h.textContent='H (Weekly)'

    let mrmbtn=document.createElement('button');
    mrmbtn.className='mrm-btn rm-btn'
    mrmbtn.id='mrm-btn-'+count
    mrmbtn.textContent="x"

    let mdbbtn=document.createElement('button');
    mdbbtn.className='mdb-btn db-btn'
    mdbbtn.id='mdb-btn-'+count
    mdbbtn.textContent="Disable"


    seancecadencein.appendChild(h)
    seancecadencein.appendChild(qa)
    seancecadencein.appendChild(qb)
    seancecadencein.appendChild(z3)
    seancecadencein.appendChild(z4)


    seance.appendChild(seancestatus)

    seance.appendChild(seancename)
    seance.appendChild(seancenamein)
    
    seance.appendChild(seancetype)
    seance.appendChild(seancetypein)
    
    seance.appendChild(seanceclass)
    seance.appendChild(seanceclassin)
    
    seance.appendChild(seancecadence)
    seance.appendChild(seancecadencein)
    
    seance.appendChild(seanceprof)
    seance.appendChild(seanceprofin)

    seance.appendChild(mrmbtn)
    seance.appendChild(mdbbtn)
    mrmbtn.addEventListener('click',(e)=>{
        e.preventDefault()
        let id=mrmbtn.id
        let v=parseInt(id.split('-')[2])
           /*<span>SparseInt(v)</span>
           <div class="seance">*/
            let cnt=(mrmbtn.parentElement).parentElement
            let cnter=0
            let ok=false
            for(let el of mseances){
                
               cnter++;
               if(cnter==v){ok=true;continue;}

               if(ok){
                let spn=cnt.children[(cnter-1)*2]
                spn.textContent='S'+JSON.stringify(cnter-1)
                for(let ce of el.children){
                    
                  if(ce.name){
                    let s=ce.name
                    //console.log(s)
                    //console.log(ce)
                    ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                    console.log(ce.name+" name")
                  }
                  if(ce.id){
                    let s=ce.id
                    ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                    console.log(ce.id+" id")
                  }
                }
               }console.log(el)

            }cnt.removeChild(cnt.children[(v-1)*2])
            cnt.removeChild(cnt.children[(v-1)*2])

    })

    
    mdbbtn.addEventListener('click',(e)=>{
        e.preventDefault()
        let id=mdbbtn.id
        let v=parseInt(id.split('-')[2])
        let snc=mdbbtn.parentElement
        let ch=snc.children
        if(snc.classList.contains("smother")){
            mdbbtn.textContent="disable"
            mdbbtn.classList.remove('dbclass')
            snc.classList.remove("smother")
        }
    else{
            mdbbtn.textContent="enable"
            mdbbtn.classList.add('dbclass')
            snc.classList.add("smother")
    }
        for(let p of ch){
            if(p.tagName=='INPUT'&& p.type!="hidden"){
                p.required=!(p.required)
                
            }
            else if(p.tagName=='INPUT'&& p.type=="hidden"){
              let val=parseInt(p.value)
              p.value=1-(val)
            }
        }


    })




        container.classList.add('hide')
    setTimeout(()=>{
    container.removeChild(madder)
    container.appendChild(seancecount)
    container.appendChild(seance)
    container.appendChild(madder)
    },300)
    setTimeout(()=>{
        container.classList.remove('hide')
    madder.disabled=false
    },600)
    

    



})

let mrmbuttons=document.getElementsByClassName('mrm-btn')
let mdbbuttons=document.getElementsByClassName('mdb-btn')
for(let el of mdbbuttons){

    el.addEventListener('click',(e)=>{
        e.preventDefault()
        let id=el.id
        let v=parseInt(id.split('-')[2])
        
        //request to server
        socket.emit("mdbeb",{v:v,group:grp,class:cls})
        // console.log(el)
        //response from server
        socket.on("mdbebo",()=>{ok=false;console.log(ok)

            socket.off("mdbebo")
    
        let snc=el.parentElement
        let ch=snc.children
        if(snc.classList.contains("smother")){
            el.textContent="disable"
            el.classList.remove('dbclass')
            snc.classList.remove("smother")
        }
    else{
            el.textContent="enable"
            el.classList.add('dbclass')
            snc.classList.add("smother")
    }
         //console.log(el)
        for(let p of ch){
            if(p.tagName=='INPUT'&&p.type!='hidden'){console.log(p.required)
                p.required=!(p.required)
            }
            else if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
              let val=parseInt(p.value)
              p.value=1-val
            }
        }})
    
    })
        

}

for(let k of mrmbuttons){
    let mrmelement=k
    k.addEventListener('click',(e)=>{
        e.preventDefault()
        let id=k.id
        let v=parseInt(id.split('-')[2])
            let cnt=(k.parentElement).parentElement
            let cnter=0
            let ok=false
            for(let el of mseances){
                
               cnter++;
               if(cnter==v){ok=true;continue;}

               if(ok){
                let spn=cnt.children[(cnter-1)*2]
                spn.textContent='S'+JSON.stringify(cnter-1)
                for(let ce of el.children){
                    
                  if(ce.name){
                    let s=ce.name
                    //console.log(s)
                    //console.log(ce)
                    ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                  }
                  if(ce.id){
                    let s=ce.id
                    ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                    console.log(ce.id)
                  }
                }
               }console.log(el)

            }cnt.removeChild(cnt.children[(v-1)*2])//seance header removal
            cnt.removeChild(cnt.children[(v-1)*2])//seance content removal

    })
    //console.log(k);
}
}

function tuesday(){

let tfrm=document.getElementById('Tuesday');
let tadder=document.getElementById('Tuesday-adder-btn');
let tseances=document.getElementsByClassName('tseance')




tadder.addEventListener('click',(e)=>{
e.preventDefault();
tadder.disabled=true
let container=tadder.parentElement
let seancecounter=container.children[container.children.length-3]
console.log(seancecounter)
let count
if(seancecounter==undefined){
    count=0;
    count++;

}
else{
let content=seancecounter.textContent
 count=parseInt(content.substring(1))+1;

}
let seance=document.createElement('div')
seance.className="tseance seance"

let seancecount=document.createElement('span')
seancecount.textContent="S"+count;


let seancename=document.createElement('label')
seancename.textContent="Seance Name"


let seancetype=document.createElement('label')
seancetype.textContent="Seance Type"


let seanceclass=document.createElement('label')
seanceclass.textContent="Seance Classroom"


let seancecadence=document.createElement('label')
seancecadence.textContent="Seance Cadence"


let seanceprof=document.createElement('label')
seanceprof.textContent="Seance Professor"


let seancenamein=document.createElement('input')
seancenamein.type="text"
seancenamein.placeholder="Web Dev"
seancenamein.required=true
seancenamein.name="tsn"+count

let seancetypein=document.createElement('input')
seancetypein.type="text"
seancetypein.placeholder="Lecture"
seancetypein.required=true
seancetypein.name="tst"+count

let seancestatus=document.createElement('input')
seancestatus.type="hidden"
seancestatus.value="1"
seancestatus.name="tss"+count

let seanceclassin=document.createElement('input')
seanceclassin.type="text"
seanceclassin.placeholder="A04"
seanceclassin.required=true
seanceclassin.name="tsc"+count

let seancecadencein=document.createElement('select')
seancecadencein.name="tsw"+count


let seanceprofin=document.createElement('input')
seanceprofin.type="text"
seanceprofin.placeholder="John Doe"
seanceprofin.required=true
seanceprofin.name="tsp"+count

let qa=document.createElement('option')
qa.value='2'
qa.textContent='QA'

let qb=document.createElement('option')
qb.value='3'
qb.textContent='QB'

let z3=document.createElement('option')
z3.value='4'
z3.textContent='Z3'

let z4=document.createElement('option')
z4.value='5'
z4.textContent='Z4'

let h=document.createElement('option')
h.value='1'
h.textContent='H (Weekly)'

let trmbtn=document.createElement('button');
trmbtn.className='trm-btn rm-btn'
trmbtn.id='trm-btn-'+count
trmbtn.textContent="x"

let tdbbtn=document.createElement('button');
tdbbtn.className='tdb-btn db-btn'
tdbbtn.id='tdb-btn-'+count
tdbbtn.textContent="Disable"


seancecadencein.appendChild(h)
seancecadencein.appendChild(qa)
seancecadencein.appendChild(qb)
seancecadencein.appendChild(z3)
seancecadencein.appendChild(z4)


seance.appendChild(seancestatus)

seance.appendChild(seancename)
seance.appendChild(seancenamein)

seance.appendChild(seancetype)
seance.appendChild(seancetypein)

seance.appendChild(seanceclass)
seance.appendChild(seanceclassin)

seance.appendChild(seancecadence)
seance.appendChild(seancecadencein)

seance.appendChild(seanceprof)
seance.appendChild(seanceprofin)

seance.appendChild(trmbtn)
seance.appendChild(tdbbtn)
trmbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=trmbtn.id
    let v=parseInt(id.split('-')[2])
       /*<span>SparseInt(v)</span>
       <div class="seance">*/
        let cnt=(trmbtn.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of tseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                console.log(ce.name+" name")
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id+" id")
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])
        cnt.removeChild(cnt.children[(v-1)*2])

})


tdbbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=tdbbtn.id
    let v=parseInt(id.split('-')[2])
    let snc=tdbbtn.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        tdbbtn.textContent="disable"
        tdbbtn.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        tdbbtn.textContent="enable"
        tdbbtn.classList.add('dbclass')
        snc.classList.add("smother")
}
    for(let p of ch){
        if(p.tagName=='INPUT'&& p.type!="hidden"){
            p.required=!(p.required)
            
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){
          let val=parseInt(p.value)
          p.value=1-(val)
        }
    }


})




    container.classList.add('hide')
setTimeout(()=>{
container.removeChild(tadder)
container.appendChild(seancecount)
container.appendChild(seance)
container.appendChild(tadder)
},300)
setTimeout(()=>{
    container.classList.remove('hide')
tadder.disabled=false
},600)






})

let trmbuttons=document.getElementsByClassName('trm-btn')
let tdbbuttons=document.getElementsByClassName('tdb-btn')
for(let el of tdbbuttons){

el.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=el.id
    let v=parseInt(id.split('-')[2])
    //request to server
    socket.emit("tdbeb",{v:v,group:grp,class:cls})
    // console.log(el)
    //response from server
    socket.on("tdbebo",()=>{ok=false;console.log(ok)

        socket.off("tdbebo")

    let snc=el.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        el.textContent="disable"
        el.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        el.textContent="enable"
        el.classList.add('dbclass')
        snc.classList.add("smother")
}
     //console.log(el)
    for(let p of ch){
        if(p.tagName=='INPUT'&&p.type!='hidden'){console.log(p.required)
            p.required=!(p.required)
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
          let val=parseInt(p.value)
          p.value=1-val
        }
    }})

})
    

}

for(let k of trmbuttons){
let trmelement=k
k.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=k.id
    let v=parseInt(id.split('-')[2])
        let cnt=(k.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of tseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id)
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])//seance header removal
        cnt.removeChild(cnt.children[(v-1)*2])//seance content removal

})
//console.log(k);
}
}



// wednesday *************************************************************************************************


function wednesday(){

let wfrm=document.getElementById('Wednesday');
let wadder=document.getElementById('Wednesday-adder-btn');
let wseances=document.getElementsByClassName('wseance')




wadder.addEventListener('click',(e)=>{
e.preventDefault();
wadder.disabled=true
let container=wadder.parentElement
let seancecounter=container.children[container.children.length-3]
console.log(seancecounter)
let count
if(seancecounter==undefined){
    count=0;
    count++;

}
else{
let content=seancecounter.textContent
 count=parseInt(content.substring(1))+1;

}
let seance=document.createElement('div')
seance.className="wseance seance"

let seancecount=document.createElement('span')
seancecount.textContent="S"+count;


let seancename=document.createElement('label')
seancename.textContent="Seance Name"


let seancetype=document.createElement('label')
seancetype.textContent="Seance Type"


let seanceclass=document.createElement('label')
seanceclass.textContent="Seance Classroom"


let seancecadence=document.createElement('label')
seancecadence.textContent="Seance Cadence"


let seanceprof=document.createElement('label')
seanceprof.textContent="Seance Professor"


let seancenamein=document.createElement('input')
seancenamein.type="text"
seancenamein.placeholder="Web Dev"
seancenamein.required=true
seancenamein.name="wsn"+count

let seancetypein=document.createElement('input')
seancetypein.type="text"
seancetypein.placeholder="Lecture"
seancetypein.required=true
seancetypein.name="wst"+count

let seancestatus=document.createElement('input')
seancestatus.type="hidden"
seancestatus.value="1"
seancestatus.name="wss"+count

let seanceclassin=document.createElement('input')
seanceclassin.type="text"
seanceclassin.placeholder="A04"
seanceclassin.required=true
seanceclassin.name="wsc"+count

let seancecadencein=document.createElement('select')
seancecadencein.name="wsw"+count


let seanceprofin=document.createElement('input')
seanceprofin.type="text"
seanceprofin.placeholder="John Doe"
seanceprofin.required=true
seanceprofin.name="wsp"+count

let qa=document.createElement('option')
qa.value='2'
qa.textContent='QA'

let qb=document.createElement('option')
qb.value='3'
qb.textContent='QB'

let z3=document.createElement('option')
z3.value='4'
z3.textContent='Z3'

let z4=document.createElement('option')
z4.value='5'
z4.textContent='Z4'

let h=document.createElement('option')
h.value='1'
h.textContent='H (Weekly)'

let wrmbtn=document.createElement('button');
wrmbtn.className='wrm-btn rm-btn'
wrmbtn.id='wrm-btn-'+count
wrmbtn.textContent="x"

let wdbbtn=document.createElement('button');
wdbbtn.className='wdb-btn db-btn'
wdbbtn.id='wdb-btn-'+count
wdbbtn.textContent="Disable"


seancecadencein.appendChild(h)
seancecadencein.appendChild(qa)
seancecadencein.appendChild(qb)
seancecadencein.appendChild(z3)
seancecadencein.appendChild(z4)


seance.appendChild(seancestatus)

seance.appendChild(seancename)
seance.appendChild(seancenamein)

seance.appendChild(seancetype)
seance.appendChild(seancetypein)

seance.appendChild(seanceclass)
seance.appendChild(seanceclassin)

seance.appendChild(seancecadence)
seance.appendChild(seancecadencein)

seance.appendChild(seanceprof)
seance.appendChild(seanceprofin)

seance.appendChild(wrmbtn)
seance.appendChild(wdbbtn)
wrmbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=wrmbtn.id
    let v=parseInt(id.split('-')[2])
       /*<span>SparseInt(v)</span>
       <div class="seance">*/
        let cnt=(wrmbtn.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of wseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                console.log(ce.name+" name")
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id+" id")
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])
        cnt.removeChild(cnt.children[(v-1)*2])

})


wdbbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=wdbbtn.id
    let v=parseInt(id.split('-')[2])
    let snc=wdbbtn.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        wdbbtn.textContent="disable"
        wdbbtn.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        wdbbtn.textContent="enable"
        wdbbtn.classList.add('dbclass')
        snc.classList.add("smother")
}
    for(let p of ch){
        if(p.tagName=='INPUT'&& p.type!="hidden"){
            p.required=!(p.required)
            
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){
          let val=parseInt(p.value)
          p.value=1-(val)
        }
    }


})




    container.classList.add('hide')
setTimeout(()=>{
container.removeChild(wadder)
container.appendChild(seancecount)
container.appendChild(seance)
container.appendChild(wadder)
},300)
setTimeout(()=>{
    container.classList.remove('hide')
wadder.disabled=false
},600)






})

let wrmbuttons=document.getElementsByClassName('wrm-btn')
let wdbbuttons=document.getElementsByClassName('wdb-btn')
for(let el of wdbbuttons){

el.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=el.id
    let v=parseInt(id.split('-')[2])
    //request to server
    socket.emit("wdbeb",{v:v,group:grp,class:cls})
    // console.log(el)
    //response from server
    socket.on("wdbebo",()=>{ok=false;console.log(ok)

        socket.off("wdbebo")

    let snc=el.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        el.textContent="disable"
        el.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        el.textContent="enable"
        el.classList.add('dbclass')
        snc.classList.add("smother")
}
     //console.log(el)
    for(let p of ch){
        if(p.tagName=='INPUT'&&p.type!='hidden'){console.log(p.required)
            p.required=!(p.required)
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
          let val=parseInt(p.value)
          p.value=1-val
        }
    }})

})
    

}

for(let k of wrmbuttons){
let wrmelement=k
k.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=k.id
    let v=parseInt(id.split('-')[2])
        let cnt=(k.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of wseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id)
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])//seance header removal
        cnt.removeChild(cnt.children[(v-1)*2])//seance content removal

})
//console.log(k);
}
}









// thursday *************************************************************************************************


function thursday(){

let hfrm=document.getElementById('Thursday');
let hadder=document.getElementById('Thursday-adder-btn');
let hseances=document.getElementsByClassName('hseance')




hadder.addEventListener('click',(e)=>{
e.preventDefault();
hadder.disabled=true
let container=hadder.parentElement
let seancecounter=container.children[container.children.length-3]
console.log(seancecounter)
let count
if(seancecounter==undefined){
    count=0;
    count++;

}
else{
let content=seancecounter.textContent
 count=parseInt(content.substring(1))+1;

}
let seance=document.createElement('div')
seance.className="hseance seance"

let seancecount=document.createElement('span')
seancecount.textContent="S"+count;


let seancename=document.createElement('label')
seancename.textContent="Seance Name"


let seancetype=document.createElement('label')
seancetype.textContent="Seance Type"


let seanceclass=document.createElement('label')
seanceclass.textContent="Seance Classroom"


let seancecadence=document.createElement('label')
seancecadence.textContent="Seance Cadence"


let seanceprof=document.createElement('label')
seanceprof.textContent="Seance Professor"


let seancenamein=document.createElement('input')
seancenamein.type="text"
seancenamein.placeholder="Web Dev"
seancenamein.required=true
seancenamein.name="hsn"+count

let seancetypein=document.createElement('input')
seancetypein.type="text"
seancetypein.placeholder="Lecture"
seancetypein.required=true
seancetypein.name="hst"+count

let seancestatus=document.createElement('input')
seancestatus.type="hidden"
seancestatus.value="1"
seancestatus.name="hss"+count

let seanceclassin=document.createElement('input')
seanceclassin.type="text"
seanceclassin.placeholder="A04"
seanceclassin.required=true
seanceclassin.name="hsc"+count

let seancecadencein=document.createElement('select')
seancecadencein.name="hsw"+count


let seanceprofin=document.createElement('input')
seanceprofin.type="text"
seanceprofin.placeholder="John Doe"
seanceprofin.required=true
seanceprofin.name="hsp"+count

let qa=document.createElement('option')
qa.value='2'
qa.textContent='QA'

let qb=document.createElement('option')
qb.value='3'
qb.textContent='QB'

let z3=document.createElement('option')
z3.value='4'
z3.textContent='Z3'

let z4=document.createElement('option')
z4.value='5'
z4.textContent='Z4'

let h=document.createElement('option')
h.value='1'
h.textContent='H (Weekly)'

let hrmbtn=document.createElement('button');
hrmbtn.className='hrm-btn rm-btn'
hrmbtn.id='hrm-btn-'+count
hrmbtn.textContent="x"

let hdbbtn=document.createElement('button');
hdbbtn.className='hdb-btn db-btn'
hdbbtn.id='hdb-btn-'+count
hdbbtn.textContent="Disable"


seancecadencein.appendChild(h)
seancecadencein.appendChild(qa)
seancecadencein.appendChild(qb)
seancecadencein.appendChild(z3)
seancecadencein.appendChild(z4)


seance.appendChild(seancestatus)

seance.appendChild(seancename)
seance.appendChild(seancenamein)

seance.appendChild(seancetype)
seance.appendChild(seancetypein)

seance.appendChild(seanceclass)
seance.appendChild(seanceclassin)

seance.appendChild(seancecadence)
seance.appendChild(seancecadencein)

seance.appendChild(seanceprof)
seance.appendChild(seanceprofin)

seance.appendChild(hrmbtn)
seance.appendChild(hdbbtn)
hrmbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=hrmbtn.id
    let v=parseInt(id.split('-')[2])
       /*<span>SparseInt(v)</span>
       <div class="seance">*/
        let cnt=(hrmbtn.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of hseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                console.log(ce.name+" name")
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id+" id")
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])
        cnt.removeChild(cnt.children[(v-1)*2])

})


hdbbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=hdbbtn.id
    let v=parseInt(id.split('-')[2])
    let snc=hdbbtn.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        hdbbtn.textContent="disable"
        hdbbtn.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        hdbbtn.textContent="enable"
        hdbbtn.classList.add('dbclass')
        snc.classList.add("smother")
}
    for(let p of ch){
        if(p.tagName=='INPUT'&& p.type!="hidden"){
            p.required=!(p.required)
            
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){
          let val=parseInt(p.value)
          p.value=1-(val)
        }
    }


})




    container.classList.add('hide')
setTimeout(()=>{
container.removeChild(hadder)
container.appendChild(seancecount)
container.appendChild(seance)
container.appendChild(hadder)
},300)
setTimeout(()=>{
    container.classList.remove('hide')
hadder.disabled=false
},600)






})

let hrmbuttons=document.getElementsByClassName('hrm-btn')
let hdbbuttons=document.getElementsByClassName('hdb-btn')
for(let el of hdbbuttons){

el.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=el.id
    let v=parseInt(id.split('-')[2])
    //request to server
    socket.emit("hdbeb",{v:v,group:grp,class:cls})
    // console.log(el)
    //response from server
    socket.on("hdbebo",()=>{ok=false;console.log(ok)

        socket.off("hdbebo")

    let snc=el.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        el.textContent="disable"
        el.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        el.textContent="enable"
        el.classList.add('dbclass')
        snc.classList.add("smother")
}
     //console.log(el)
    for(let p of ch){
        if(p.tagName=='INPUT'&&p.type!='hidden'){console.log(p.required)
            p.required=!(p.required)
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
          let val=parseInt(p.value)
          p.value=1-val
        }
    }})

})
    

}

for(let k of hrmbuttons){
let wrmelement=k
k.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=k.id
    let v=parseInt(id.split('-')[2])
        let cnt=(k.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of hseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id)
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])//seance header removal
        cnt.removeChild(cnt.children[(v-1)*2])//seance content removal

})
//console.log(k);
}
}














// friday *************************************************************************************************


function friday(){

let ffrm=document.getElementById('Friday');
let fadder=document.getElementById('Friday-adder-btn');
let fseances=document.getElementsByClassName('fseance')




fadder.addEventListener('click',(e)=>{
e.preventDefault();
fadder.disabled=true
let container=fadder.parentElement
let seancecounter=container.children[container.children.length-3]
console.log(seancecounter)
let count
if(seancecounter==undefined){
    count=0;
    count++;

}
else{
let content=seancecounter.textContent
 count=parseInt(content.substring(1))+1;

}
let seance=document.createElement('div')
seance.className="fseance seance"

let seancecount=document.createElement('span')
seancecount.textContent="S"+count;


let seancename=document.createElement('label')
seancename.textContent="Seance Name"


let seancetype=document.createElement('label')
seancetype.textContent="Seance Type"


let seanceclass=document.createElement('label')
seanceclass.textContent="Seance Classroom"


let seancecadence=document.createElement('label')
seancecadence.textContent="Seance Cadence"


let seanceprof=document.createElement('label')
seanceprof.textContent="Seance Professor"


let seancenamein=document.createElement('input')
seancenamein.type="text"
seancenamein.placeholder="Web Dev"
seancenamein.required=true
seancenamein.name="fsn"+count

let seancetypein=document.createElement('input')
seancetypein.type="text"
seancetypein.placeholder="Lecture"
seancetypein.required=true
seancetypein.name="fst"+count

let seancestatus=document.createElement('input')
seancestatus.type="hidden"
seancestatus.value="1"
seancestatus.name="fss"+count

let seanceclassin=document.createElement('input')
seanceclassin.type="text"
seanceclassin.placeholder="A04"
seanceclassin.required=true
seanceclassin.name="fsc"+count

let seancecadencein=document.createElement('select')
seancecadencein.name="fsw"+count


let seanceprofin=document.createElement('input')
seanceprofin.type="text"
seanceprofin.placeholder="John Doe"
seanceprofin.required=true
seanceprofin.name="fsp"+count

let qa=document.createElement('option')
qa.value='2'
qa.textContent='QA'

let qb=document.createElement('option')
qb.value='3'
qb.textContent='QB'

let z3=document.createElement('option')
z3.value='4'
z3.textContent='Z3'

let z4=document.createElement('option')
z4.value='5'
z4.textContent='Z4'

let h=document.createElement('option')
h.value='1'
h.textContent='H (Weekly)'

let frmbtn=document.createElement('button');
frmbtn.className='frm-btn rm-btn'
frmbtn.id='frm-btn-'+count
frmbtn.textContent="x"

let fdbbtn=document.createElement('button');
fdbbtn.className='fdb-btn db-btn'
fdbbtn.id='fdb-btn-'+count
fdbbtn.textContent="Disable"


seancecadencein.appendChild(h)
seancecadencein.appendChild(qa)
seancecadencein.appendChild(qb)
seancecadencein.appendChild(z3)
seancecadencein.appendChild(z4)


seance.appendChild(seancestatus)

seance.appendChild(seancename)
seance.appendChild(seancenamein)

seance.appendChild(seancetype)
seance.appendChild(seancetypein)

seance.appendChild(seanceclass)
seance.appendChild(seanceclassin)

seance.appendChild(seancecadence)
seance.appendChild(seancecadencein)

seance.appendChild(seanceprof)
seance.appendChild(seanceprofin)

seance.appendChild(frmbtn)
seance.appendChild(fdbbtn)
frmbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=frmbtn.id
    let v=parseInt(id.split('-')[2])
       /*<span>SparseInt(v)</span>
       <div class="seance">*/
        let cnt=(frmbtn.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of fseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                console.log(ce.name+" name")
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id+" id")
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])
        cnt.removeChild(cnt.children[(v-1)*2])

})


fdbbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=fdbbtn.id
    let v=parseInt(id.split('-')[2])
    let snc=fdbbtn.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        fdbbtn.textContent="disable"
        fdbbtn.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        fdbbtn.textContent="enable"
        fdbbtn.classList.add('dbclass')
        snc.classList.add("smother")
}
    for(let p of ch){
        if(p.tagName=='INPUT'&& p.type!="hidden"){
            p.required=!(p.required)
            
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){
          let val=parseInt(p.value)
          p.value=1-(val)
        }
    }


})




    container.classList.add('hide')
setTimeout(()=>{
container.removeChild(fadder)
container.appendChild(seancecount)
container.appendChild(seance)
container.appendChild(fadder)
},300)
setTimeout(()=>{
    container.classList.remove('hide')
fadder.disabled=false
},600)






})

let frmbuttons=document.getElementsByClassName('frm-btn')
let fdbbuttons=document.getElementsByClassName('fdb-btn')
for(let el of fdbbuttons){

el.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=el.id
    let v=parseInt(id.split('-')[2])
    //request to server
    socket.emit("fdbeb",{v:v,group:grp,class:cls})
    // console.log(el)
    //response from server
    socket.on("fdbebo",()=>{ok=false;console.log(ok)

        socket.off("fdbebo")

    let snc=el.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        el.textContent="disable"
        el.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        el.textContent="enable"
        el.classList.add('dbclass')
        snc.classList.add("smother")
}
     //console.log(el)
    for(let p of ch){
        if(p.tagName=='INPUT'&&p.type!='hidden'){console.log(p.required)
            p.required=!(p.required)
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
          let val=parseInt(p.value)
          p.value=1-val
        }
    }})

})
    

}

for(let k of frmbuttons){
let wrmelement=k
k.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=k.id
    let v=parseInt(id.split('-')[2])
        let cnt=(k.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of fseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id)
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])//seance header removal
        cnt.removeChild(cnt.children[(v-1)*2])//seance content removal

})
//console.log(k);
}
}


















// saturday *************************************************************************************************


function saturday(){

let sfrm=document.getElementById('Saturday');
let sadder=document.getElementById('Saturday-adder-btn');
let sseances=document.getElementsByClassName('sseance')




sadder.addEventListener('click',(e)=>{
e.preventDefault();
sadder.disabled=true
let container=sadder.parentElement
let seancecounter=container.children[container.children.length-3]
console.log(seancecounter)
let count
if(seancecounter==undefined){
    count=0;
    count++;

}
else{
let content=seancecounter.textContent
 count=parseInt(content.substring(1))+1;

}
let seance=document.createElement('div')
seance.className="sseance seance"

let seancecount=document.createElement('span')
seancecount.textContent="S"+count;


let seancename=document.createElement('label')
seancename.textContent="Seance Name"


let seancetype=document.createElement('label')
seancetype.textContent="Seance Type"


let seanceclass=document.createElement('label')
seanceclass.textContent="Seance Classroom"


let seancecadence=document.createElement('label')
seancecadence.textContent="Seance Cadence"


let seanceprof=document.createElement('label')
seanceprof.textContent="Seance Professor"


let seancenamein=document.createElement('input')
seancenamein.type="text"
seancenamein.placeholder="Web Dev"
seancenamein.required=true
seancenamein.name="ssn"+count

let seancetypein=document.createElement('input')
seancetypein.type="text"
seancetypein.placeholder="Lecture"
seancetypein.required=true
seancetypein.name="sst"+count

let seancestatus=document.createElement('input')
seancestatus.type="hidden"
seancestatus.value="1"
seancestatus.name="sss"+count

let seanceclassin=document.createElement('input')
seanceclassin.type="text"
seanceclassin.placeholder="A04"
seanceclassin.required=true
seanceclassin.name="ssc"+count

let seancecadencein=document.createElement('select')
seancecadencein.name="ssw"+count


let seanceprofin=document.createElement('input')
seanceprofin.type="text"
seanceprofin.placeholder="John Doe"
seanceprofin.required=true
seanceprofin.name="ssp"+count

let qa=document.createElement('option')
qa.value='2'
qa.textContent='QA'

let qb=document.createElement('option')
qb.value='3'
qb.textContent='QB'

let z3=document.createElement('option')
z3.value='4'
z3.textContent='Z3'

let z4=document.createElement('option')
z4.value='5'
z4.textContent='Z4'

let h=document.createElement('option')
h.value='1'
h.textContent='H (Weekly)'

let srmbtn=document.createElement('button');
srmbtn.className='srm-btn rm-btn'
srmbtn.id='srm-btn-'+count
srmbtn.textContent="x"

let sdbbtn=document.createElement('button');
sdbbtn.className='sdb-btn db-btn'
sdbbtn.id='sdb-btn-'+count
sdbbtn.textContent="Disable"


seancecadencein.appendChild(h)
seancecadencein.appendChild(qa)
seancecadencein.appendChild(qb)
seancecadencein.appendChild(z3)
seancecadencein.appendChild(z4)


seance.appendChild(seancestatus)

seance.appendChild(seancename)
seance.appendChild(seancenamein)

seance.appendChild(seancetype)
seance.appendChild(seancetypein)

seance.appendChild(seanceclass)
seance.appendChild(seanceclassin)

seance.appendChild(seancecadence)
seance.appendChild(seancecadencein)

seance.appendChild(seanceprof)
seance.appendChild(seanceprofin)

seance.appendChild(srmbtn)
seance.appendChild(sdbbtn)
srmbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=srmbtn.id
    let v=parseInt(id.split('-')[2])
       /*<span>SparseInt(v)</span>
       <div class="seance">*/
        let cnt=(srmbtn.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of sseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
                console.log(ce.name+" name")
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id+" id")
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])
        cnt.removeChild(cnt.children[(v-1)*2])

})


sdbbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=sdbbtn.id
    let v=parseInt(id.split('-')[2])
    let snc=sdbbtn.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        sdbbtn.textContent="disable"
        sdbbtn.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        sdbbtn.textContent="enable"
        sdbbtn.classList.add('dbclass')
        snc.classList.add("smother")
}
    for(let p of ch){
        if(p.tagName=='INPUT'&& p.type!="hidden"){
            p.required=!(p.required)
            
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){
          let val=parseInt(p.value)
          p.value=1-(val)
        }
    }


})




    container.classList.add('hide')
setTimeout(()=>{
container.removeChild(sadder)
container.appendChild(seancecount)
container.appendChild(seance)
container.appendChild(sadder)
},300)
setTimeout(()=>{
    container.classList.remove('hide')
sadder.disabled=false
},600)






})

let srmbuttons=document.getElementsByClassName('srm-btn')
let sdbbuttons=document.getElementsByClassName('sdb-btn')
for(let el of sdbbuttons){

el.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=el.id
    let v=parseInt(id.split('-')[2])
    //request to server
    socket.emit("sdbeb",{v:v,group:grp,class:cls})
    // console.log(el)
    //response from server
    socket.on("sdbebo",()=>{ok=false;console.log(ok)

        socket.off("sdbebo")

    let snc=el.parentElement
    let ch=snc.children
    if(snc.classList.contains("smother")){
        el.textContent="disable"
        el.classList.remove('dbclass')
        snc.classList.remove("smother")
    }
else{
        el.textContent="enable"
        el.classList.add('dbclass')
        snc.classList.add("smother")
}
     //console.log(el)
    for(let p of ch){
        if(p.tagName=='INPUT'&&p.type!='hidden'){console.log(p.required)
            p.required=!(p.required)
        }
        else if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
          let val=parseInt(p.value)
          p.value=1-val
        }
    }})

})
    

}

for(let k of srmbuttons){
let wrmelement=k
k.addEventListener('click',(e)=>{
    e.preventDefault()
    let id=k.id
    let v=parseInt(id.split('-')[2])
        let cnt=(k.parentElement).parentElement
        let cnter=0
        let ok=false
        for(let el of sseances){
            
           cnter++;
           if(cnter==v){ok=true;continue;}

           if(ok){
            let spn=cnt.children[(cnter-1)*2]
            spn.textContent='S'+JSON.stringify(cnter-1)
            for(let ce of el.children){
                
              if(ce.name){
                let s=ce.name
                //console.log(s)
                //console.log(ce)
                ce.name=s.substring(0,3)+JSON.stringify(cnter-1);
              }
              if(ce.id){
                let s=ce.id
                ce.id=s.substring(0,8)+JSON.stringify(cnter-1);
                console.log(ce.id)
              }
            }
           }console.log(el)

        }cnt.removeChild(cnt.children[(v-1)*2])//seance header removal
        cnt.removeChild(cnt.children[(v-1)*2])//seance content removal

})
//console.log(k);
}
}




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