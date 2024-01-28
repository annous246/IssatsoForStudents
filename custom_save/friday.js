


let custom_save_fri=(app,customttmodel,errorChecker)=>{
    app.post('/customsavefri',async(req,res)=>{
      let ok=true
      let count=1;
      let olddata=await customttmodel.findOne({id:req.session.user})
      .then((data)=>data)
      .catch(()=>console.log("error"))
     
     
      let friday=[];
      if(olddata!=null){ 
        let saver=olddata.table.friday
        friday=[]
      let len=count
      count=1
        while(req.body['msn'+count]){
  
          
          let seance={};
          let sn=req.body['msn'+count];
          let st=req.body['mst'+count];
          let ss=req.body['mss'+count];
          console.log(ss)
   
          if(!errorChecker([sn,st])&&ss==1){ok=false;break;}
          seance.seanceName=sn;
          seance.type=st;
          seance.status=ss;
          friday.push(seance);
          count++;
          
  
  
        }
        if(ok){
          olddata.table.friday=friday;
          await customttmodel.findOneAndUpdate({_id:olddata['_id']},{table:olddata.table})
          .then((d)=>{console.log("schedule updated");return d})
          .catch(()=>console.log("error updating schedule"))
  
        }
  
      }
      else{ 
        while(req.body['msn'+count]){
          let seance={};
          let sn=req.body['msn'+count];
          let st=req.body['mst'+count];
          let ss=req.body['mss'+count];
          console.log(sn+" seance type"+st+[st,sn])
          
   
         if(!errorChecker([sn,st]&&ss==1)){ok=false;break;}
  
          
          seance.seanceName=sn;
          seance.type=st;
          seance.status=ss;
  
          friday.push(seance);
  
          count++;
          
  
  
        }
        if(ok){
        let table={friday:friday}
        let email=req.session.user
        let obj={id:email,table:table}
        console.log(obj)
        let tobesaved=new customttmodel(obj)
        tobesaved.save()
        .then(()=>console.log("saved"))
        .catch("error saving new table");
  
        }
  
      }
      res.redirect("/customtimetablefri");
    })
  
  }
module.exports={custom_save_fri}  
  