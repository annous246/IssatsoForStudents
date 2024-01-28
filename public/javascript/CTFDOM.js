

let socket=io()
monday()



function monday(){
let ejs=document.getElementById('ejs');
let user=ejs.getAttribute('user')
let mfrm=document.getElementById('Monday');
let madder=document.getElementById('Monday-adder-btn');
let mseances=document.getElementsByClassName('mseance')

let generate=document.getElementById("Generate-btn")
let save=document.getElementById("Save-btn")
let gfrm=document.getElementById('Generate');
gfrm.addEventListener('submit',(e)=>{
    generate.disabled=true;
})

mfrm.addEventListener('submit',(e)=>{
    save.disabled=true;
    
})



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
    seancename.textContent="Seance Subject"
    

    
    let seancestatus=document.createElement('input')
    seancestatus.type="hidden"
    seancestatus.value="1"
    seancestatus.name="mss"+count


    let seancenamein=document.createElement('select')
    seancenamein.name="msn"+count

    
    let seancetype=document.createElement('label')
    seancetype.textContent="Seance Type"
    



    let seancetypein=document.createElement('select')
    seancetypein.name="mst"+count

    let tp=document.createElement('option')
    tp.value='3'
    tp.textContent='TP'
    
    let td=document.createElement('option')
    td.value='2'
    td.textContent='TD'
    
    let cours=document.createElement('option')
    cours.value='1'
    cours.textContent='Cours'



    

    let subject=['RESEAU','MATH','POO','GRAPHES','EXPLOITATION','CONCEPTION','FRANCAIS','GESTION','INTERNET','COMPILATION','ANGLAIS']//dont change order


    let ARCHI=document.createElement('option')
    ARCHI.value='1'
    ARCHI.textContent='RESEAU'
    
    let PROBA=document.createElement('option')
    PROBA.value='2'
    PROBA.textContent='MATH'
    
    let PARADIGME=document.createElement('option')
    PARADIGME.value='3'
    PARADIGME.textContent='POO'
    
    
    let RESEAU=document.createElement('option')
    RESEAU.value='4'
    RESEAU.textContent='GRAPHES'
    
    let ALGO=document.createElement('option')
    ALGO.value='5'
    ALGO.textContent='EXPLOITATION'
    
    let MATH=document.createElement('option')
    MATH.value='6'
    MATH.textContent='CONCEPTION'
    
    let GESTION=document.createElement('option')
    GESTION.value='7'
    GESTION.textContent='FRANCAIS'
    
    let BASE=document.createElement('option')
    BASE.value='8'
    BASE.textContent='GESTION'
    
    let EXP=document.createElement('option')
    EXP.value='9'
    EXP.textContent='INTERNET'
    
    let FR=document.createElement('option')
    FR.value='10'
    FR.textContent='COMPILATION'
    
    let EN=document.createElement('option')
    EN.value='11'
    EN.textContent='ANGLAIS'


    let mrmbtn=document.createElement('button');
    mrmbtn.className='mrm-btn rm-btn'
    mrmbtn.id='mrm-btn-'+count
    mrmbtn.textContent="x"

    let mdbbtn=document.createElement('button');
    mdbbtn.className='mdb-btn db-btn'
    mdbbtn.id='mdb-btn-'+count
    mdbbtn.textContent="Disable"


    seancetypein.appendChild(cours)
    seancetypein.appendChild(td)
    seancetypein.appendChild(tp)

    
    seancenamein.appendChild(ALGO)
    seancenamein.appendChild(PARADIGME)
    seancenamein.appendChild(RESEAU)
    seancenamein.appendChild(EN)
    seancenamein.appendChild(FR)
    seancenamein.appendChild(ARCHI)
    seancenamein.appendChild(BASE)
    seancenamein.appendChild(MATH)
    seancenamein.appendChild(GESTION)
    seancenamein.appendChild(PROBA)
    seancenamein.appendChild(EXP)












    seance.appendChild(seancestatus)
    seance.appendChild(seancename)
    seance.appendChild(seancenamein)
    
    seance.appendChild(seancetype)
    seance.appendChild(seancetypein)
    

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
            if(p.tagName=='INPUT'&& p.type=="hidden"){
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
        socket.emit("cfdbeb",{v,user})
        // console.log(el)
        //response from server
        socket.on("cfdbebo",()=>{ok=false;console.log(ok)

            socket.off("cfdbebo")
    
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
             if(p.tagName=='INPUT'&& p.type=="hidden"){console.log(" "+p.value)
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