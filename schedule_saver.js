

let save_schedule=(app,timetablesmodel,errorChecker)=>{
  app.post('/mtimetable',async(req,res)=>{
    if(req.session.user){
      if(req.session.user!="admin@admin.admin"){
           res.redirect("/dashboard")
      }
      else{
    let ok=true
    let count=1;
    let classA=parseInt(req.body.sf[0]);
    let group=parseInt(req.body.sf[1]);
    if(!classA||!group||group>2||group<1||classA<1||classA>4){
      res.redirect("/admin_dashboard");
    }
    else{
      let olddata=await timetablesmodel.findOne({id:`A0${classA}G${group}`})
      .then((data)=>data)
      .catch(()=>console.log("error"))
  
     
     
      let monday=[];
      if(olddata!=null){ 
        let saver=olddata.table.monday
        monday=[]
      let len=count
      count=1
        while(req.body['msw'+count]){
  
          console.log(req.body['msw'+count]+" bro")
          
          let seance={};
          let sn=req.body['msn'+count];
          let st=req.body['mst'+count];
          let sc=req.body['msc'+count];
          let sw=req.body['msw'+count];
          let sp=req.body['msp'+count];
          let ss=req.body['mss'+count];
          console.log(ss)
   
          if(!errorChecker([sn,st,sc,sw,sp])&&ss==1){ok=false;break;}
          seance.seanceName=sn;
          seance.class=sc;
          seance.type=st;
          seance.period=sw;
          seance.prof=sp;
          seance.status=ss;
          monday.push(seance);
          count++;
          
  
  
        }
        if(ok){
          olddata.table.monday=monday;
          await timetablesmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
          .then((d)=>{console.log("schedule updated");return d})
          .catch(()=>console.log("error updating schedule"))
  
        }
  
      }
      else{ 
        while(req.body['msc'+count]){
          let seance={};
          let sn=req.body['msn'+count];
          let st=req.body['mst'+count];
          let sc=req.body['msc'+count];
          let sw=req.body['msw'+count];
          let sp=req.body['msp'+count];
          let ss=req.body['mss'+count];
   
         if(!errorChecker([sn,st,sc,sw,sp])){ok=false;break;}
  
          
          seance.seanceName=sn;
          seance.class=sc;
          seance.type=st;
          seance.period=sw;
          seance.prof=sp;
          seance.status=ss;
  
          monday.push(seance);
  
          count++;
          
  
  
        }
        if(ok){
        let table={monday:monday}
        let email=req.session.user
        let obj={id:`A0${classA}G${group}`,group:1,table:table}
        let tobesaved=new timetablesmodel(obj)
        tobesaved.save()
        .then(()=>console.log("saved"))
        .catch("error saving new table");
  
        }
  
      }
  
      
    //tuesday*****************************************
  
  
  
     ok=true
     count=1;
     olddata=await timetablesmodel.findOne({id:`A0${classA}G${group}`})
    .then((data)=>data)
    .catch(()=>console.log("error"))
  
   
   
     tuesday=[];
    if(olddata!=null){ 
      let saver=olddata.table.tuesday
      tuesday=[]
    let len=count
    count=1
      while(req.body['tsw'+count]){
  
        console.log(req.body['tsw'+count]+" bro")
        
        let seance={};
        let sn=req.body['tsn'+count];
        let st=req.body['tst'+count];
        let sc=req.body['tsc'+count];
        let sw=req.body['tsw'+count];
        let sp=req.body['tsp'+count];
        let ss=req.body['tss'+count];
        console.log(ss)
  
        if(!errorChecker([sn,st,sc,sw,sp])&&ss==1){ok=false;break;}
        seance.seanceName=sn;
        seance.class=sc;
        seance.type=st;
        seance.period=sw;
        seance.prof=sp;
        seance.status=ss;
        tuesday.push(seance);
        count++;
        
  
  
      }
      if(ok){
        olddata.table.tuesday=tuesday;
        await timetablesmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
        .then((d)=>{console.log("schedule updated");return d})
        .catch(()=>console.log("error updating schedule"))
  
      }
  
    }
    else{ 
      while(req.body['tsc'+count]){
        let seance={};
        let sn=req.body['tsn'+count];
        let st=req.body['tst'+count];
        let sc=req.body['tsc'+count];
        let sw=req.body['tsw'+count];
        let sp=req.body['tsp'+count];
        let ss=req.body['tss'+count];
  
       if(!errorChecker([sn,st,sc,sw,sp])){ok=false;break;}
  
        
        seance.seanceName=sn;
        seance.class=sc;
        seance.type=st;
        seance.period=sw;
        seance.prof=sp;
        seance.status=ss;
  
        tuesday.push(seance);
  
        count++;
        
  
  
      }
      if(ok){
      let table={tuesday:tuesday}
      let email=req.session.user
      let obj={id:`A0${classA}G${group}`,group:1,table:table}
      let tobesaved=new timetablesmodel(obj)
      tobesaved.save()
      .then(()=>console.log("saved"))
      .catch("error saving new table");
  
      }
  
    }
  
  
  
  
  
  
  
    //wednesday*****************************************
  
  
  
    ok=true
    count=1;
    olddata=await timetablesmodel.findOne({id:`A0${classA}G${group}`})
   .then((data)=>data)
   .catch(()=>console.log("error"))
  
  
  
    wednesday=[];
   if(olddata!=null){ 
     let saver=olddata.table.wednesday
     wednesday=[]
   let len=count
   count=1
     while(req.body['wsw'+count]){
  
       console.log(req.body['wsw'+count]+" bro")
       
       let seance={};
       let sn=req.body['wsn'+count];
       let st=req.body['wst'+count];
       let sc=req.body['wsc'+count];
       let sw=req.body['wsw'+count];
       let sp=req.body['wsp'+count];
       let ss=req.body['wss'+count];
       console.log(ss)
  
       if(!errorChecker([sn,st,sc,sw,sp])&&ss==1){ok=false;break;}
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
       wednesday.push(seance);
       count++;
       
  
  
     }
     if(ok){
       olddata.table.wednesday=wednesday;
       await timetablesmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
       .then((d)=>{console.log("schedule updated");return d})
       .catch(()=>console.log("error updating schedule"))
  
     }
  
   }
   else{ 
     while(req.body['wsc'+count]){
       let seance={};
       let sn=req.body['wsn'+count];
       let st=req.body['wst'+count];
       let sc=req.body['wsc'+count];
       let sw=req.body['wsw'+count];
       let sp=req.body['wsp'+count];
       let ss=req.body['wss'+count];
  
      if(!errorChecker([sn,st,sc,sw,sp])){ok=false;break;}
  
       
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
  
       wednesday.push(seance);
  
       count++;
       
  
  
     }
     if(ok){
     let table={wednesday:wednesday}
     let email=req.session.user
     let obj={id:`A0${classA}G${group}`,group:1,table:table}
     let tobesaved=new timetablesmodel(obj)
     tobesaved.save()
     .then(()=>console.log("saved"))
     .catch("error saving new table");
  
     }
  
   }
  
  
  
  
  
   
  
  
    //thursday*****************************************
  
  
  
    ok=true
    count=1;
    olddata=await timetablesmodel.findOne({id:`A0${classA}G${group}`})
   .then((data)=>data)
   .catch(()=>console.log("error"))
  
  
  
    thursday=[];
   if(olddata!=null){ 
     let saver=olddata.table.thursday
     thursday=[]
   let len=count
   count=1
     while(req.body['hsw'+count]){
  
       console.log(req.body['hsw'+count]+" bro")
       
       let seance={};
       let sn=req.body['hsn'+count];
       let st=req.body['hst'+count];
       let sc=req.body['hsc'+count];
       let sw=req.body['hsw'+count];
       let sp=req.body['hsp'+count];
       let ss=req.body['hss'+count];
       console.log(ss)
  
       if(!errorChecker([sn,st,sc,sw,sp])&&ss==1){ok=false;break;}
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
       thursday.push(seance);
       count++;
       
  
  
     }
     if(ok){
       olddata.table.thursday=thursday;
       await timetablesmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
       .then((d)=>{console.log("schedule updated");return d})
       .catch(()=>console.log("error updating schedule"))
  
     }
  
   }
   else{ 
     while(req.body['hsc'+count]){
       let seance={};
       let sn=req.body['hsn'+count];
       let st=req.body['hst'+count];
       let sc=req.body['hsc'+count];
       let sw=req.body['hsw'+count];
       let sp=req.body['hsp'+count];
       let ss=req.body['hss'+count];
  
      if(!errorChecker([sn,st,sc,sw,sp])){ok=false;break;}
  
       
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
  
       thursday.push(seance);
  
       count++;
       
  
  
     }
     if(ok){
     let table={thursday:thursday}
     let email=req.session.user
     let obj={id:`A0${classA}G${group}`,group:1,table:table}
     let tobesaved=new timetablesmodel(obj)
     tobesaved.save()
     .then(()=>console.log("saved"))
     .catch("error saving new table");
  
     }
  
   }
  
  
  
  
  
  
  
  
  
   
  
    //friday*****************************************
  
  
  
    ok=true
    count=1;
    olddata=await timetablesmodel.findOne({id:`A0${classA}G${group}`})
   .then((data)=>data)
   .catch(()=>console.log("error"))
  
  
  
    friday=[];
   if(olddata!=null){ 
     let saver=olddata.table.friday
     friday=[]
   let len=count
   count=1
     while(req.body['fsw'+count]){
  
       console.log(req.body['fsw'+count]+" bro")
       
       let seance={};
       let sn=req.body['fsn'+count];
       let st=req.body['fst'+count];
       let sc=req.body['fsc'+count];
       let sw=req.body['fsw'+count];
       let sp=req.body['fsp'+count];
       let ss=req.body['fss'+count];
       console.log(ss)
  
       if(!errorChecker([sn,st,sc,sw,sp])&&ss==1){ok=false;break;}
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
       friday.push(seance);
       count++;
       
  
  
     }
     if(ok){
       olddata.table.friday=friday;
       await timetablesmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
       .then((d)=>{console.log("schedule updated");return d})
       .catch(()=>console.log("error updating schedule"))
  
     }
  
   }
   else{ 
     while(req.body['fsc'+count]){
       let seance={};
       let sn=req.body['fsn'+count];
       let st=req.body['fst'+count];
       let sc=req.body['fsc'+count];
       let sw=req.body['fsw'+count];
       let sp=req.body['fsp'+count];
       let ss=req.body['fss'+count];
  
      if(!errorChecker([sn,st,sc,sw,sp])){ok=false;break;}
  
       
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
  
       friday.push(seance);
  
       count++;
       
  
  
     }
     if(ok){
     let table={friday:friday}
     let email=req.session.user
     let obj={id:`A0${classA}G${group}`,group:1,table:table}
     let tobesaved=new timetablesmodel(obj)
     tobesaved.save()
     .then(()=>console.log("saved"))
     .catch("error saving new table");
  
     }
  
   }
  
  
  
  
  
  
  
  
  
  
  
   
  
    //saturday*****************************************
  
  
  
    ok=true
    count=1;
    olddata=await timetablesmodel.findOne({id:`A0${classA}G${group}`})
   .then((data)=>data)
   .catch(()=>console.log("error"))
  
  
  
    saturday=[];
   if(olddata!=null){ 
     let saver=olddata.table.saturday
     saturday=[]
   let len=count
   count=1
     while(req.body['ssw'+count]){
  
       console.log(req.body['ssw'+count]+" bro")
       
       let seance={};
       let sn=req.body['ssn'+count];
       let st=req.body['sst'+count];
       let sc=req.body['ssc'+count];
       let sw=req.body['ssw'+count];
       let sp=req.body['ssp'+count];
       let ss=req.body['sss'+count];
       console.log(ss)
  
       if(!errorChecker([sn,st,sc,sw,sp])&&ss==1){ok=false;break;}
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
       saturday.push(seance);
       count++;
       
  
  
     }
     if(ok){
       olddata.table.saturday=saturday;
       await timetablesmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
       .then((d)=>{console.log("schedule updated");return d})
       .catch(()=>console.log("error updating schedule"))
  
     }
  
   }
   else{ 
     while(req.body['ssc'+count]){
       let seance={};
       let sn=req.body['ssn'+count];
       let st=req.body['sst'+count];
       let sc=req.body['ssc'+count];
       let sw=req.body['ssw'+count];
       let sp=req.body['ssp'+count];
       let ss=req.body['sss'+count];
  
      if(!errorChecker([sn,st,sc,sw,sp])){ok=false;break;}
  
       
       seance.seanceName=sn;
       seance.class=sc;
       seance.type=st;
       seance.period=sw;
       seance.prof=sp;
       seance.status=ss;
  
       saturday.push(seance);
  
       count++;
       
  
  
     }
     if(ok){
     let table={saturday:saturday}
     let email=req.session.user
     let obj={id:`A0${classA}G${group}`,group:1,table:table}
     let tobesaved=new timetablesmodel(obj)
     tobesaved.save()
     .then(()=>console.log("saved"))
     .catch("error saving new table");
  
     }
  
   }
  
  
  
  
  
  
  
  
  
  
  
      res.redirect(`/timetablesA0${classA}G${group}`)

    }


      }

    }
    else{
      res.redirect('/home');
    }
  })


  
}
module.exports={save_schedule}