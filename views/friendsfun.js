function accept(acceptlistbtn){

for(let k=0;k<acceptlistbtn.length;k++){
    let element=acceptlistbtn[k];console.log(k);
    element.addEventListener('click',(e)=>{
        e.preventDefault();
    let parent=element.parentElement;
    console.log(parent)
    let email=parent.id
    socket.emit("friend accept",({email:email,user:em}));
    socket.on("friend accepted",()=>{
    
        let pt=parent
        let bbtn=document.createElement('button');
        bbtn.className='block-btn'
        bbtn.textContent="Block"
        let mbtn=document.createElement('button');
        mbtn.className='message-btn'
        mbtn.textContent="Messages"
        let spn=pt.firstElementChild
        console.log(spn);
        setTimeout(()=>{
            pt.classList.add("hide");
        },200)
        setTimeout(()=>{
        pt.innerHTML=""
        pt.className="friend";
        pt.appendChild(spn);
        pt.appendChild(bbtn)
        pt.appendChild(mbtn)
            pt.classList.remove("hide");

        },450)
        
    })
    })}

}

function block(blocklistbtn){
    let blocklistbtn=document.getElementsByClassName('block-btn');
       
        
    for(let k=0 ;k<blocklistbtn.length;k++){
   
        let element=blocklistbtn[k];
        if(element.classList.length>1)continue;
        element.addEventListener('click',(e)=>{
            e.preventDefault();
        let parent=element.parentElement;
        
        let email=parent.id
        socket.emit("friend block",({email:email,user:em}));
        socket.on("friend blocked",()=>{
            let pt=parent
            let bbtn=document.createElement('button');
            bbtn.classList.add('block-btn')
            bbtn.classList.add('unblock-btn')
            bbtn.textContent="Unblock"
            let spn=pt.firstElementChild
            setTimeout(()=>{
                pt.classList.add("hide");
            },200)
            setTimeout(()=>{
            pt.innerHTML=""
            pt.classList.add('blocked');
            pt.appendChild(spn);
            pt.appendChild(bbtn)
                pt.classList.remove("hide");

            },450)
        })
        })
    }

}

function unblock(unblocklistbtn){
    

    let unblocklistbtn=document.getElementsByClassName('unblock-btn');
            
    if(unblocklistbtn.length>0){
for(let k =0;k<unblocklistbtn.length;k++){
    let element=unblocklistbtn[k];
    element.addEventListener('click',(e)=>{
        e.preventDefault();
    let parent=element.parentElement;
    let email=parent.id
    socket.emit("friend unblock",({email:email,user:em}));
    socket.on("friend unblocked",()=>{
        console.log("zad")
        let pt=parent
        let bbtn=document.createElement('button');
        bbtn.className='block-btn'
        bbtn.textContent="Block"
        let mbtn=document.createElement('button');
        mbtn.className='message-btn'
        mbtn.textContent="Messages"
        let spn=pt.firstElementChild
        setTimeout(()=>{
            pt.classList.add("hide");
        },200)
        setTimeout(()=>{
        pt.innerHTML=""
        pt.classList.remove('blocked');
        pt.appendChild(spn);
        pt.appendChild(bbtn)
        pt.appendChild(mbtn)
            pt.classList.remove("hide");


        },450)
    })
    })
}}



}