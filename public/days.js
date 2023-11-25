
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
            socket.emit("tdbeb",v)
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
