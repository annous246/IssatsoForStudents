
let sockets=(io,people,timetablesmodel,customttmodel,bc,pass,nm)=>{
    io.on('connection',(socket)=>{
  
      socket.on('/add_task',async(data)=>{
        let email= await data['email'];console.log("passed");
        let user=await people.findOne({email:email})
        .then((d)=>d)
        .catch("error looking for user to add task");
        
    
        let tasks=[];
        tasks=await user.tasks;
       await tasks.push(data.task);
        data=null;
        console.log(tasks)
        
        await people.findOneAndUpdate({email:email},{tasks:tasks})
        .then(()=>console.log("task added successfully"))
        .catch(()=>console.log("error adding task to db"));
        
    
    
    
    
        
      
      
       })
      
     socket.on('/remove_task',async(data)=>{
      let email=await data.email
    if(email){
      let user=await people.findOne({email:email})
      .then((d)=>d)
      .catch("error looking for user to remove task");
        let ok=false;
      let tasks=[]
      tasks=await user.tasks;
      
      let rest=[],map={};
      for(let k in data.tasks){
        map[data.tasks[k]]=true;
      }
      let removed_tasks=0;
      for(let k in tasks){
        if(map.hasOwnProperty(k)){removed_tasks++;continue;}
        await rest.push(tasks[k]);
      }
       data.tasks=await null;
       if(data.tasks!=[]){
      if(user.progress+removed_tasks*20>=100){
        let v=await people.findOneAndUpdate({email:user.email},{tasks:rest,progress:0})
       .then((d)=>{console.log("task (s) removed successfully"); return d;})
       .catch(()=>console.log("error removing task to db"));
  
      }
      else{
       let v=await people.findOneAndUpdate({email:user.email},{tasks:rest,progress:(user.progress+removed_tasks*20)})
      .then((d)=>{console.log("task (s) removed successfully"); return d;})
      .catch(()=>console.log("error removing task to db"));
  
      }
        
      socket.emit('progress',user.progress+removed_tasks*20);    
        
      }
  
  
      
    }
      
  
     })
  
  
  socket.on("mdbeb",async(data)=>{
    let v=data.v
    let olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let monday=olddata.table.monday
  
    if(v<=monday.length){
      monday[v-1].status=!(monday[v-1].status);
       olddata.table.monday=await monday
      await timetablesmodel.findOneAndUpdate({id:'A0'+data.class+"G"+data.group},{table:olddata.table})
      console.log("old");
      
     olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log("er"))
    for(let k of olddata.table.monday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("mdbebo");
  
  
    
  
  })
    
  
  
  
  socket.on("tdbeb",async(data)=>{
    let olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let tuesday=olddata.table.tuesday
  
    if(v<=tuesday.length){
      tuesday[v-1].status=!(tuesday[v-1].status);
       olddata.table.tuesday=await tuesday
      await timetablesmodel.findOneAndUpdate({id:'A0'+data.class+"G"+data.group},{table:olddata.table})
      console.log("old");
      
     olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log("er"))
    for(let k of olddata.table.tuesday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("tdbebo");
  
  
    
  
  })
  
  
  
  
  
  socket.on("wdbeb",async(data)=>{
    let olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let wednesday=olddata.table.wednesday
  
    if(v<=wednesday.length){
      wednesday[v-1].status=!(wednesday[v-1].status);
       olddata.table.wednesday=await wednesday
      await timetablesmodel.findOneAndUpdate({id:'A0'+data.class+"G"+data.group},{table:olddata.table})
      console.log("old");
      
     olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log("er"))
    for(let k of olddata.table.wednesday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("wdbebo");
  
  
    
  
  })
  
  
  
  
  socket.on("hdbeb",async(data)=>{
    let olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let thursday=olddata.table.thursday
  
    if(v<=thursday.length){
      thursday[v-1].status=!(thursday[v-1].status);
       olddata.table.thursday=await thursday
      await timetablesmodel.findOneAndUpdate({id:'A0'+data.class+"G"+data.group},{table:olddata.table})
      console.log("old");
      
     olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log("er"))
    for(let k of olddata.table.thursday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("hdbebo");
  
  
    
  
  })
    
  
  
  
  socket.on("fdbeb",async(data)=>{
    let olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let friday=olddata.table.friday
  
    if(v<=friday.length){
      friday[v-1].status=!(friday[v-1].status);
       olddata.table.friday=await friday
      await timetablesmodel.findOneAndUpdate({id:'A0'+data.class+"G"+data.group},{table:olddata.table})
      console.log("old");
      
     olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log("er"))
    for(let k of olddata.table.friday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("fdbebo");
  
  
    
  
  })
  
  
  
  
  socket.on("sdbeb",async(data)=>{
    let olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let saturday=olddata.table.saturday
  
    if(v<=saturday.length){
      saturday[v-1].status=!(saturday[v-1].status);
       olddata.table.saturday=await saturday
      await timetablesmodel.findOneAndUpdate({id:'A0'+data.class+"G"+data.group},{table:olddata.table})
      console.log("old");
      
     olddata=await timetablesmodel.findOne({id:'A0'+data.class+"G"+data.group})
    .then((d)=>d)
    .catch(()=>console.log("er"))
    for(let k of olddata.table.saturday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("sdbebo");
  
  
    
  
  })
  
  //custom tt sockets **************************************************
  
  
  
  socket.on("cmdbeb",async(data)=>{
  
    let v=data.v;
    let id=data.user 
     let olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let monday=olddata.table.monday
  
    if(v<=monday.length){
      monday[v-1].status=!(monday[v-1].status);
       olddata.table.monday=await monday
      await customttmodel.findOneAndUpdate({id:id},{table:olddata.table})
      console.log("old");
      
     olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log("eror"))
    for(let k of olddata.table.monday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("cmdbebo");
  
  
    
  
  })
  
  
  
  
  
  
  socket.on("ctdbeb",async(data)=>{
  
    let v=data.v;
    let id=data.user 
     let olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let tuesday=olddata.table.tuesday
  
    if(v<=tuesday.length){
      tuesday[v-1].status=!(tuesday[v-1].status);
       olddata.table.tuesday=await tuesday
      await customttmodel.findOneAndUpdate({id:id},{table:olddata.table})
      console.log("old");
      
     olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log("eror"))
    for(let k of olddata.table.tuesday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("ctdbebo");
  
  
    
  
  })
  
  socket.on("cwdbeb",async(data)=>{
  
    let v=data.v;
    let id=data.user 
     let olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let wednesday=olddata.table.wednesday
  
    if(v<=wednesday.length){
      wednesday[v-1].status=!(wednesday[v-1].status);
       olddata.table.wednesday=await wednesday
      await customttmodel.findOneAndUpdate({id:id},{table:olddata.table})
      console.log("old");
      
     olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log("eror"))
    for(let k of olddata.table.wednesday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("cwdbebo");
  
  
    
  
  })
  socket.on("cthdbeb",async(data)=>{
 
    let v=data.v;
    let id=data.user  
     let olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let thursday=olddata.table.thursday
  
    if(v<=thursday.length){
      thursday[v-1].status=!(thursday[v-1].status);
       olddata.table.thursday=await thursday
      await customttmodel.findOneAndUpdate({id:id},{table:olddata.table})
      console.log("old");
      
     olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log("eror"))
    for(let k of olddata.table.thursday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("cthdbebo");
  
  
    
  
  })
  socket.on("cfdbeb",async(data)=>{
    let v=data.v;
    let id=data.user
    let olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let friday=olddata.table.friday
  
    if(v<=friday.length){
      friday[v-1].status=!(friday[v-1].status);
       olddata.table.friday=await friday
      await customttmodel.findOneAndUpdate({id:id},{table:olddata.table})
      console.log("old");
      
     olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log("eror"))
    for(let k of olddata.table.friday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("cfdbebo");
  
  
    
  
  })
  socket.on("csdbeb",async(data)=>{
    let v=data.v;
    let id=data.user
    let olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log(zav))
    let saturday=olddata.table.saturday
  
    if(v<=saturday.length){
      saturday[v-1].status=!(saturday[v-1].status);
       olddata.table.saturday=await saturday
      await customttmodel.findOneAndUpdate({id:id},{table:olddata.table})
      console.log("old");
      
     olddata=await customttmodel.findOne({id:id})
    .then((d)=>d)
    .catch(()=>console.log("eror"))
    for(let k of olddata.table.saturday)
    console.log("status"+k.status+" "+k.seanceName)
  
    }
     socket.emit("csdbebo");
  
  
    
  
  })

  socket.on('verify',async (d)=>{
    let user=await people.findOne({email:d})
    .then((d)=>d)
    .catch(()=>console.log("error getting user for verification"))
    let now =parseInt(((new Date()).getTime()/1000))
    console.log(now)
    console.log(user.verification_delay)
    if(!user.verification && now-user.verification_delay>60){
    await people.findOneAndUpdate({email:d},{verification_delay:now})
    .then((d)=>d)
    .catch((e)=>console.log("error emitting verification"))
          socket.emit("delay_updated")
        let encryption=await bc.hash(d,10)
         encryption=encryption.replace(/\//g, "slash");//backend error and security reasons
        let link="http://localhost:3000/verified/"+encryption
        let lnkprep='<a src='+link+'>Verification Link</a>'
       // console.log(lnkprep)
        let html="<h2>Welcome To Issatso++</h2><p>Click the following link to verify your email: <br> <a href=" + link +">Verify My Account</a></p>"

        //console.log(html)


        
        let t=nm.createTransport({
          service:'gmail',
          port:3000,
          secure:true,
          auth:{
            user:'anasrabhi246@gmail.com ',
            pass:pass

          },
          tls:{
            rejectUnauthorized:false
          }

        })
        let mo={from:'<anasrabhi246@gmail.com>',
        to:d,
        subject:'verification',
        html:html,


        }
        t.sendMail(mo,(e,data)=>{
          if(e){
            console.log("error sending verification")
          }
          else{
            console.log("verification sent successfully")
            
          }
        })


    }


  })

  socket.on('forgot',async(email)=>{
    let user=await people.findOne({email:email})
    .then((d)=>d)
    .catch(()=>console.log("error getting user"))
    if(user ){
      let sendtime=parseInt(((new Date().getTime())/1000))
      if(sendtime<300+user.password_delay){
        socket.emit('forgot check',-600-sendtime+user.password_delay)
      }
      else {
        let encryption=await bc.hash(email,10)
        .then((d)=>d)
        .catch(()=>console.log("error hashing"))
        await people.findOneAndUpdate({email:email},{linker:encryption})
        .then((d)=>d)
        .catch(()=>console.log("erro setting mail"))
        encryption=encryption.replace(/\//g,'slash')
        let link="http://localhost:3000/forget/"+encryption+"mailed"+email
        let html="<h1>Password Recovery</h1><br><p>Click To Recover Your Account : <br> <a href="+link+">Link</a> </p>";
        let bus=nm.createTransport({
          service:'gmail',
          secure:true,
          port:3000,
          auth:{
            user:'anasrabhi246@gmail.com',
            pass:pass,
          },
          tls:{
            rejectUnauthorized:false
          }

        })
        let messageobject={
          from:'<anasrabhi246@gmail.com>',
          to:email,
          subject:'Password Reset',
          html:html

        }
        bus.sendMail(messageobject,(e,d)=>{
          if(e){
            console.log("error sending mail")
          }
          else console.log("mail sent successfully")
        })
        let user=await people.findOneAndUpdate({email:email},{password_delay:sendtime+300})
        .then((d)=>d)
        .catch(()=>console.log("error getting user"))
      socket.emit('forgot check',2)

      }
        
    }
    else{
      socket.emit('forgot check',0)
    }
  })
  
  
  
  
  
  
  
  
    
  
    
    })}
module.exports={sockets}  