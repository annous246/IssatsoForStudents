
function sametime(d1,d2){
  if(!d1||!d2)return false;
if(d1.length>d2.length){
  for(let k=0;k<d2.length;k++){
    if(d1[k].status!=d2[k].status)return false
      }
      
  for(let k=d2.length;k<d1.length;k++){
    if(d1[k].status==1)return false
      }
      return true;

}
else{
  for(let k=0;k<d1.length;k++){
    if(d2[k].status!=d1.status)return false
      }
      
  for(let k=d1.length;k<d2.length;k++){
    if(d2[k].status==1)return false
      }
      return true;

}
}
function goodparse(goodays,cadency){
  
  for(let day =0;day<goodays.length;day++){
      
    for(let seance=0 ;seance<goodays[day].length; seance++){
     
    if(goodays[day][seance].period){
      goodays[day][seance].period=cadency[parseInt(goodays[day][seance].period)-1]
    }
    //console.log(seance.period)
      
    }

    }
}
function seanceCompare(s1,s2){
    return (
    s1.seanceName==s2.seanceName&&
    s1.prof==s2.prof &&
    s1.type==s2.type && 
    s1.class==s2.class &&
    s1.period==s2.period &&
    s1.status==s2.status )
  }
  function compare(d1,d2){
    if(!d1||!d2||d1.length!=d2.length)return false
    for(let k=0;k<d1.length;k++){
        if(!seanceCompare(d1[k],d2[k]))return false
    }return true
  }
  function inArray(day,a){
    for(let el of a){
      if(compare(day,el))return true
    }return false
  }
  function sameseance(s1,s2){
    return (
    s1.seanceName==s2.seanceName&&
    s1.type==s2.type && 
    s1.status==s2.status )}
  
  

let schedule_builder_mon=async(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache)=>{
    app.get('/generatemon',async(req,res)=>{
      if(req.session.user && req.session.user!="admin@admin.admin"){
           let user=await people.findOne({email:req.session.user})
           .then((d)=>d)
           .catch(()=>console.log("error getting user"))
           if(user.verification){
            
      let q=(req.query['cadencyq'])
      let z=(req.query['cadencyz']) 
      let ctt=await customttmodel.findOne({id:req.session.user})
      .then((d)=>d)
      .catch(()=>console.log("error pulling custom"))
  
      if(!ctt || ctt.length<1)res.redirect("/customtimetable")
      else{
        //console.log(q)
        //check cache
   let cdays= await cache.findOne({id:'monday'})
   .then((d)=>d)
   .catch(()=>console.log("error finding cache"))

   
   let days=[]
   let result=[]

   let emptyseance={
     
     seanceName:"",
     class:"",
     type:"",
     period:"",
     prof:"",
     status:0
   }

   let sday=ctt.table.monday
   //parsing****************************************
   for(let k of sday){
   k.seanceName=subject[ parseInt(k.seanceName)-1]
   k.type=type[ parseInt(k.type)-1]
  
 
   } 
   //produce****************************************
   
        
    if(!cdays){
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting data"))
  
     
    //pull data 
    let allseances=[g11.table.monday,g12.table.monday,g21.table.monday,g22.table.monday,g31.table.monday,g32.table.monday,g41.table.monday,g42.table.monday]
    
    //***************************** */
    for(let grouptable of allseances){
    let tpcount=1;
      for(let seance of grouptable){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    }
    //order of TP seances (exactly 2!)
    
      for(let a=0;a<8; a++){
      for(let b=0;b<8; b++){
        for(let c=0;c<8; c++){
          for(let d=0;d<8; d++){
            for(let e=0;e<8; e++){
              for(let f=0;f<8; f++){
      let day=[]
      let vt=[a,b,c,d,e,f]
      for(let it=0;it<6;it++){
         if(allseances[vt[it]][it]&&allseances[vt[it]][it].status!=0)
          day.push(allseances[vt[it]][it])
              else
          day.push(emptyseance)
      
         
      }
      if(inArray(day,days))continue
      days.push(day)
      }
      }
      }
      }
      }
      }
      let saver=await new cache({id:'monday',days:days})
      await saver.save()
      .then((d)=>d)
      .catch(()=>console.log("error caching"))

    }
    else{
      days=cdays.days
    for(let day of days){
    let tpcount=1;
      for(let seance of day){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    };//get cache

    }
  
    //debug
    /*
    let cpt=0;
    for(let day of days){cpt++
       if(cpt<700)continue
       if(cpt>800)break
    console.log("******************************")
      for(let k of day){
        if(k.status==0){
          console.log("empty");
          continue
        }
         console.log(k.seanceName+" "+k.type+" pdc"+k.period)
      }
    console.log("******************************")
    console.log("")
    console.log("")
  
    }
    //********************************* */
    console.log(days.length)
    
    let goodays=[]
    let gooday=[]
    let simgoodays=[]
    console.log(sday)
    //get exact day ********************************************************
    for(let day of days){let ok=1;
      //console.log(day)
    for(let  k=0;k<Math.min(sday.length,day.length);k++){
    if(sday[k].status==0)continue;
    if(sameseance(day[k],sday[k])==false){ok=0;break;}
    if(day[k].period!=1){
      if(day[k].period!=z&&day[k].period!=q){
       // console.log(day[k].period+" perioooooooooood"+day[k].seanceName)
        //console.log(z+" "+q)
        ok=0;break;//cadency check
      }
    }
   // console.log(sameseance(day[k],sday[k])+' '+day[k]+' '+sday[k])
    }//checking day cmp
    if(ok==1){let cn=0;
       gooday=JSON.parse(JSON.stringify((day)))
       break;
    }
    }
  //counting unique seances
  let seancescounter={}
  for (let k of sday){
   if(k.status==1){
    if(seancescounter.hasOwnProperty(k.seanceName+" "+k.type))
    seancescounter[k.seanceName+" "+k.type]++
  else 
  seancescounter[k.seanceName+" "+k.type]=1
   }
  }
  console.log(seancescounter)
  
    for(let day of days){let ok=1;
  let cpsc=JSON.parse(JSON.stringify(seancescounter))
  let checker =1
  let cnt=-1
      //console.log(day)
      
      for(let seance of day){
            cnt++
            
        if(seance.status=='0'||(seance.period!=q&&seance.period!=z&&seance.period!=1)){
         /* console.log("**********************************")
          console.log(seance)
          console.log(cnt)
          console.log(day[cnt])
          console.log(cpsc)*/
          day[cnt]=emptyseance
          //console.log(day[cnt])
          //console.log("**********************************")
          continue;
  
          
        }
            if(cpsc.hasOwnProperty(seance.seanceName+" "+seance.type)){
              if(cpsc[seance.seanceName+" "+seance.type]--<1){checker=0;break;}
            }
            else{
          /*    
          console.log("cn2**********************************")
          console.log(day[cnt])*/
          day[cnt]=emptyseance
          /*console.log(day[cnt])
          console.log("**********************************")*/
            }
      }
      for(let s in cpsc){
        if(cpsc[s]!=0){checker=0;break;}
        //console.log("accepted day")
        //console.log(day)
      }
      if(checker==1){//console.log("checked")
        if(inArray(day,goodays)==false){
        goodays.push(JSON.parse(JSON.stringify(day)))
        }
  
  
  
      }
    }
  
  
    
  
  //*********************************************************************************************************** */
  
  
  
    
  
  for(let k =0;k<Math.min(gooday.length,sday.length);k++){
    if(sday[k].status==0)gooday[k]=emptyseance
} 



//*********************************************************************************************************** */
//gooday seance removal
let k=0
if( goodays.length&&gooday.length){
  
    for(let k =Math.min(gooday.length,sday.length);k<6;k++){
     gooday[k]=emptyseance
   } 
for(let day of goodays){//console.log("iterate")

for(let seance in day){
//console.log("this"+day[seance].seanceName)
}
if(compare(day,gooday)){
goodays.splice(k,1)
}k++
}

}


//*********************************************************************************************************** */
if(goodays.length){
k=0
  for(let day of goodays){
          if(sametime(day,sday) ){
            if(!inArray(day,simgoodays)){
     simgoodays.push(JSON.parse(JSON.stringify(day)))
    goodays.splice(k,1)
            
            }
   
    }k++
  }
  //getting sim goodays
    //******************** */

}
  if(gooday.length){
    
    
    for(let seance of gooday)
    seance.period=cadency[parseInt(seance.period)-1]

    
  }
  
    /********************/
  if(goodays.length){
     goodparse(goodays,cadency)

    //cleaning gooddays
  }
  if(simgoodays.length){
     goodparse(simgoodays,cadency)

    //cleaning simgoodays
  }

    if(gooday.length>0){
  

  
    
  
    res.render("result.ejs",{result:goodays,gooday:gooday,simgoodays:simgoodays,timestamps:timestamps})
  
    }
    else if(goodays.length>0){
      res.render("result.ejs",{result:goodays,gooday:[],simgoodays:simgoodays,timestamps:timestamps})
  
    }
    else if(simgoodays.length>0){
  res.render("result.ejs",{result:[],gooday:[],simgoodays:simgoodays,timestamps:timestamps})
      
    }
    else 
    res.render("result.ejs",{result:[],gooday:[],simgoodays:[],timestamps:timestamps})
    //filter *************************************
    
    
    
    }
    

           }
           else{
            res.redirect('/dashboard')
           }

      }
      
    else{
      res.redirect('/home')
    } 
  
  
    })
  }


  //************************************************************************************************* */


  
let schedule_builder_tues=async(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache)=>{
  app.get('/generatetues',async(req,res)=>{
    if(req.session.user && req.session.user!="admin@admin.admin"){
         let user=await people.findOne({email:req.session.user})
         .then((d)=>d)
         .catch(()=>console.log("error getting user"))
         if(user.verification){
          
    let q=(req.query['cadencyq'])
    let z=(req.query['cadencyz']) 
    let ctt=await customttmodel.findOne({id:req.session.user})
    .then((d)=>d)
    .catch(()=>console.log("error pulling custom"))

    if(!ctt || ctt.length<1)res.redirect("/customtimetable")
    else{
      //console.log(q)
      //check cache
 let cdays= await cache.findOne({id:'tuesday'})
 .then((d)=>d)
 .catch(()=>console.log("error finding cache"))

 
 let days=[]
 let result=[]

 let emptyseance={
   
   seanceName:"",
   class:"",
   type:"",
   period:"",
   prof:"",
   status:0
 }

 let sday=ctt.table.tuesday
 //parsing****************************************
 for(let k of sday){
 k.seanceName=subject[ parseInt(k.seanceName)-1]
 k.type=type[ parseInt(k.type)-1]


 } 
 //produce****************************************
 
      
  if(!cdays){
    let g11=await timetablesmodel.findOne({id:"A01G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g12=await timetablesmodel.findOne({id:"A01G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g21=await timetablesmodel.findOne({id:"A02G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g22=await timetablesmodel.findOne({id:"A02G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g31=await timetablesmodel.findOne({id:"A03G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g32=await timetablesmodel.findOne({id:"A03G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g41=await timetablesmodel.findOne({id:"A04G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g42=await timetablesmodel.findOne({id:"A04G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))

   
  //pull data 
  let allseances=[g11.table.tuesday,g12.table.tuesday,g21.table.tuesday,g22.table.tuesday,g31.table.tuesday,g32.table.tuesday,g41.table.tuesday,g42.table.tuesday]
  
  //***************************** */
  for(let grouptable of allseances){
  let tpcount=1;
    for(let seance of grouptable){
               if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                seance.count=((tpcount-1)%2)+1;
                tpcount++;
               }
    }
  }
  //order of TP seances (exactly 2!)
  
    for(let a=0;a<8; a++){
    for(let b=0;b<8; b++){
      for(let c=0;c<8; c++){
        for(let d=0;d<8; d++){
          for(let e=0;e<8; e++){
            for(let f=0;f<8; f++){
    let day=[]
    let vt=[a,b,c,d,e,f]
    for(let it=0;it<6;it++){
       if(allseances[vt[it]][it]&&allseances[vt[it]][it].status!=0)
        day.push(allseances[vt[it]][it])
            else
        day.push(emptyseance)
    
       
    }
    if(inArray(day,days))continue
    days.push(day)
    }
    }
    }
    }
    }
    }
    let saver=await new cache({id:'tuesday',days:days})
    await saver.save()
    .then((d)=>d)
    .catch(()=>console.log("error caching"))

  }
  else{
    days=cdays.days
    for(let day of days){
    let tpcount=1;
      for(let seance of day){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    };//get cache

  }

  //debug
  /*
  let cpt=0;
  for(let day of days){cpt++
     if(cpt<700)continue
     if(cpt>800)break
  console.log("******************************")
    for(let k of day){
      if(k.status==0){
        console.log("empty");
        continue
      }
       console.log(k.seanceName+" "+k.type+" pdc"+k.period)
    }
  console.log("******************************")
  console.log("")
  console.log("")

  }
  //********************************* */
  console.log(days.length)
  
  let goodays=[]
  let gooday=[]
  let simgoodays=[]
  console.log(sday)
  //get exact day ********************************************************
  for(let day of days){let ok=1;
    //console.log(day)
  for(let  k=0;k<Math.min(sday.length,day.length);k++){
  if(sday[k].status==0)continue;
  if(sameseance(day[k],sday[k])==false){ok=0;break;}
  if(day[k].period!=1){
    if(day[k].period!=z&&day[k].period!=q){
     // console.log(day[k].period+" perioooooooooood"+day[k].seanceName)
      //console.log(z+" "+q)
      ok=0;break;//cadency check
    }
  }
 // console.log(sameseance(day[k],sday[k])+' '+day[k]+' '+sday[k])
  }//checking day cmp
  if(ok==1){let cn=0;
     gooday=JSON.parse(JSON.stringify((day)))
     break;
  }
  }
//counting unique seances
let seancescounter={}
for (let k of sday){
 if(k.status==1){
  if(seancescounter.hasOwnProperty(k.seanceName+" "+k.type))
  seancescounter[k.seanceName+" "+k.type]++
else 
seancescounter[k.seanceName+" "+k.type]=1
 }
}
console.log(seancescounter)

  for(let day of days){let ok=1;
let cpsc=JSON.parse(JSON.stringify(seancescounter))
let checker =1
let cnt=-1
    //console.log(day)
    
    for(let seance of day){
          cnt++
          
      if(seance.status=='0'||(seance.period!=q&&seance.period!=z&&seance.period!=1)){
       /* console.log("**********************************")
        console.log(seance)
        console.log(cnt)
        console.log(day[cnt])
        console.log(cpsc)*/
        day[cnt]=emptyseance
        //console.log(day[cnt])
        //console.log("**********************************")
        continue;

        
      }
          if(cpsc.hasOwnProperty(seance.seanceName+" "+seance.type)){
            if(cpsc[seance.seanceName+" "+seance.type]--<1){checker=0;break;}
          }
          else{
        /*    
        console.log("cn2**********************************")
        console.log(day[cnt])*/
        day[cnt]=emptyseance
        /*console.log(day[cnt])
        console.log("**********************************")*/
          }
    }
    for(let s in cpsc){
      if(cpsc[s]!=0){checker=0;break;}
      //console.log("accepted day")
      //console.log(day)
    }
    if(checker==1){//console.log("checked")
      if(inArray(day,goodays)==false){
      goodays.push(JSON.parse(JSON.stringify(day)))
      }



    }
  }


  

//*********************************************************************************************************** */



  

for(let k =0;k<Math.min(gooday.length,sday.length);k++){
  if(sday[k].status==0)gooday[k]=emptyseance
} 



//*********************************************************************************************************** */
//gooday seance removal
let k=0
if( goodays.length&&gooday.length){

  for(let k =Math.min(gooday.length,sday.length);k<6;k++){
   gooday[k]=emptyseance
 } 
for(let day of goodays){//console.log("iterate")

for(let seance in day){
//console.log("this"+day[seance].seanceName)
}
if(compare(day,gooday)){
goodays.splice(k,1)
}k++
}

}


//*********************************************************************************************************** */
if(goodays.length){
k=0
for(let day of goodays){
        if(sametime(day,sday) ){
          if(!inArray(day,simgoodays)){
   simgoodays.push(JSON.parse(JSON.stringify(day)))
  goodays.splice(k,1)
          
          }
 
  }k++
}
//getting sim goodays
  //******************** */

}
if(gooday.length){
  
  
  for(let seance of gooday)
  seance.period=cadency[parseInt(seance.period)-1]

  
}

  /********************/
if(goodays.length){
   goodparse(goodays,cadency)

  //cleaning gooddays
}
if(simgoodays.length){
   goodparse(simgoodays,cadency)

  //cleaning simgoodays
}

  if(gooday.length>0){



  

  res.render("result.ejs",{result:goodays,gooday:gooday,simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(goodays.length>0){
    res.render("result.ejs",{result:goodays,gooday:[],simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(simgoodays.length>0){
res.render("result.ejs",{result:[],gooday:[],simgoodays:simgoodays,timestamps:timestamps})
    
  }
  else 
  res.render("result.ejs",{result:[],gooday:[],simgoodays:[],timestamps:timestamps})
  //filter *************************************
  
  
  
  }
  

         }
         else{
          res.redirect('/dashboard')
         }

    }
    
  else{
    res.redirect('/home')
  } 


  })
}
  
  
  //************************************************************************************************************************************ */









  
let schedule_builder_wed=async(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache)=>{
  app.get('/generatewed',async(req,res)=>{
    if(req.session.user && req.session.user!="admin@admin.admin"){
         let user=await people.findOne({email:req.session.user})
         .then((d)=>d)
         .catch(()=>console.log("error getting user"))
         if(user.verification){
          
    let q=(req.query['cadencyq'])
    let z=(req.query['cadencyz']) 
    let ctt=await customttmodel.findOne({id:req.session.user})
    .then((d)=>d)
    .catch(()=>console.log("error pulling custom"))

    if(!ctt || ctt.length<1)res.redirect("/customtimetable")
    else{
      //console.log(q)
      //check cache
 let cdays= await cache.findOne({id:'wednesday'})
 .then((d)=>d)
 .catch(()=>console.log("error finding cache"))

 
 let days=[]
 let result=[]

 let emptyseance={
   
   seanceName:"",
   class:"",
   type:"",
   period:"",
   prof:"",
   status:0
 }

 let sday=ctt.table.wednesday
 //parsing****************************************
 for(let k of sday){
 k.seanceName=subject[ parseInt(k.seanceName)-1]
 k.type=type[ parseInt(k.type)-1]


 } 
 //produce****************************************
 
      
  if(!cdays){
    let g11=await timetablesmodel.findOne({id:"A01G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g12=await timetablesmodel.findOne({id:"A01G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g21=await timetablesmodel.findOne({id:"A02G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g22=await timetablesmodel.findOne({id:"A02G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g31=await timetablesmodel.findOne({id:"A03G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g32=await timetablesmodel.findOne({id:"A03G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g41=await timetablesmodel.findOne({id:"A04G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g42=await timetablesmodel.findOne({id:"A04G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))

   
  //pull data 
  let allseances=[g11.table.wednesday,g12.table.wednesday,g21.table.wednesday,g22.table.wednesday,g31.table.wednesday,g32.table.wednesday,g41.table.wednesday,g42.table.wednesday]
  
  //***************************** */
  for(let grouptable of allseances){
  let tpcount=1;
    for(let seance of grouptable){
               if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                seance.count=((tpcount-1)%2)+1;
                tpcount++;
               }
    }
  }
  //order of TP seances (exactly 2!)
  
    for(let a=0;a<8; a++){
    for(let b=0;b<8; b++){
      for(let c=0;c<8; c++){
        for(let d=0;d<8; d++){
          for(let e=0;e<8; e++){
            for(let f=0;f<8; f++){
    let day=[]
    let vt=[a,b,c,d,e,f]
    for(let it=0;it<6;it++){
       if(allseances[vt[it]][it]&&allseances[vt[it]][it].status!=0)
        day.push(allseances[vt[it]][it])
            else
        day.push(emptyseance)
    
       
    }
    if(inArray(day,days))continue
    days.push(day)
    }
    }
    }
    }
    }
    }
    let saver=await new cache({id:'wednesday',days:days})
    await saver.save()
    .then((d)=>d)
    .catch(()=>console.log("error caching"))

  }
  else{
    days=cdays.days
    for(let day of days){
    let tpcount=1;
      for(let seance of day){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    };//get cache

  }

  //debug
  /*
  let cpt=0;
  for(let day of days){cpt++
     if(cpt<700)continue
     if(cpt>800)break
  console.log("******************************")
    for(let k of day){
      if(k.status==0){
        console.log("empty");
        continue
      }
       console.log(k.seanceName+" "+k.type+" pdc"+k.period)
    }
  console.log("******************************")
  console.log("")
  console.log("")

  }
  //********************************* */
  console.log(days.length)
  
  let goodays=[]
  let gooday=[]
  let simgoodays=[]
  console.log(sday)
  //get exact day ********************************************************
  for(let day of days){let ok=1;
    //console.log(day)
  for(let  k=0;k<Math.min(sday.length,day.length);k++){
  if(sday[k].status==0)continue;
  if(sameseance(day[k],sday[k])==false){ok=0;break;}
  if(day[k].period!=1){
    if(day[k].period!=z&&day[k].period!=q){
     // console.log(day[k].period+" perioooooooooood"+day[k].seanceName)
      //console.log(z+" "+q)
      ok=0;break;//cadency check
    }
  }
 // console.log(sameseance(day[k],sday[k])+' '+day[k]+' '+sday[k])
  }//checking day cmp
  if(ok==1){let cn=0;
     gooday=JSON.parse(JSON.stringify((day)))
     break;
  }
  }
//counting unique seances
let seancescounter={}
for (let k of sday){
 if(k.status==1){
  if(seancescounter.hasOwnProperty(k.seanceName+" "+k.type))
  seancescounter[k.seanceName+" "+k.type]++
else 
seancescounter[k.seanceName+" "+k.type]=1
 }
}
console.log(seancescounter)

  for(let day of days){let ok=1;
let cpsc=JSON.parse(JSON.stringify(seancescounter))
let checker =1
let cnt=-1
    //console.log(day)
    
    for(let seance of day){
          cnt++
          
      if(seance.status=='0'||(seance.period!=q&&seance.period!=z&&seance.period!=1)){
       /* console.log("**********************************")
        console.log(seance)
        console.log(cnt)
        console.log(day[cnt])
        console.log(cpsc)*/
        day[cnt]=emptyseance
        //console.log(day[cnt])
        //console.log("**********************************")
        continue;

        
      }
          if(cpsc.hasOwnProperty(seance.seanceName+" "+seance.type)){
            if(cpsc[seance.seanceName+" "+seance.type]--<1){checker=0;break;}
          }
          else{
        /*    
        console.log("cn2**********************************")
        console.log(day[cnt])*/
        day[cnt]=emptyseance
        /*console.log(day[cnt])
        console.log("**********************************")*/
          }
    }
    for(let s in cpsc){
      if(cpsc[s]!=0){checker=0;break;}
      //console.log("accepted day")
      //console.log(day)
    }
    if(checker==1){//console.log("checked")
      if(inArray(day,goodays)==false){
      goodays.push(JSON.parse(JSON.stringify(day)))
      }



    }
  }


  

//*********************************************************************************************************** */



  

for(let k =0;k<Math.min(gooday.length,sday.length);k++){
  if(sday[k].status==0)gooday[k]=emptyseance
} 



//*********************************************************************************************************** */
//gooday seance removal
let k=0
if( goodays.length&&gooday.length){

  for(let k =Math.min(gooday.length,sday.length);k<6;k++){
   gooday[k]=emptyseance
 } 
for(let day of goodays){//console.log("iterate")

for(let seance in day){
//console.log("this"+day[seance].seanceName)
}
if(compare(day,gooday)){
goodays.splice(k,1)
}k++
}

}


//*********************************************************************************************************** */
if(goodays.length){
k=0
for(let day of goodays){
        if(sametime(day,sday) ){
          if(!inArray(day,simgoodays)){
   simgoodays.push(JSON.parse(JSON.stringify(day)))
  goodays.splice(k,1)
          
          }
 
  }k++
}
//getting sim goodays
  //******************** */

}
if(gooday.length){
  
  
  for(let seance of gooday)
  seance.period=cadency[parseInt(seance.period)-1]

  
}

  /********************/
if(goodays.length){
   goodparse(goodays,cadency)

  //cleaning gooddays
}
if(simgoodays.length){
   goodparse(simgoodays,cadency)

  //cleaning simgoodays
}

  if(gooday.length>0){



  

  res.render("result.ejs",{result:goodays,gooday:gooday,simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(goodays.length>0){
    res.render("result.ejs",{result:goodays,gooday:[],simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(simgoodays.length>0){
res.render("result.ejs",{result:[],gooday:[],simgoodays:simgoodays,timestamps:timestamps})
    
  }
  else 
  res.render("result.ejs",{result:[],gooday:[],simgoodays:[],timestamps:timestamps})
  //filter *************************************
  
  
  
  }
  

         }
         else{
          res.redirect('/dashboard')
         }

    }
    
  else{
    res.redirect('/home')
  } 


  })
}
  
  //************************************************************************************************************************************************************** */

  
let schedule_builder_thu=async(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache)=>{
  app.get('/generatethu',async(req,res)=>{
    if(req.session.user && req.session.user!="admin@admin.admin"){
         let user=await people.findOne({email:req.session.user})
         .then((d)=>d)
         .catch(()=>console.log("error getting user"))
         if(user.verification){
          
    let q=(req.query['cadencyq'])
    let z=(req.query['cadencyz']) 
    let ctt=await customttmodel.findOne({id:req.session.user})
    .then((d)=>d)
    .catch(()=>console.log("error pulling custom"))

    if(!ctt || ctt.length<1)res.redirect("/customtimetable")
    else{
      //console.log(q)
      //check cache
 let cdays= await cache.findOne({id:'thursday'})
 .then((d)=>d)
 .catch(()=>console.log("error finding cache"))

 
 let days=[]
 let result=[]

 let emptyseance={
   
   seanceName:"",
   class:"",
   type:"",
   period:"",
   prof:"",
   status:0
 }

 let sday=ctt.table.thursday
 //parsing****************************************
 for(let k of sday){
 k.seanceName=subject[ parseInt(k.seanceName)-1]
 k.type=type[ parseInt(k.type)-1]


 } 
 //produce****************************************
 
      
  if(!cdays){
    let g11=await timetablesmodel.findOne({id:"A01G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g12=await timetablesmodel.findOne({id:"A01G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g21=await timetablesmodel.findOne({id:"A02G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g22=await timetablesmodel.findOne({id:"A02G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g31=await timetablesmodel.findOne({id:"A03G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g32=await timetablesmodel.findOne({id:"A03G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g41=await timetablesmodel.findOne({id:"A04G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g42=await timetablesmodel.findOne({id:"A04G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))

   
  //pull data 
  let allseances=[g11.table.thursday,g12.table.thursday,g21.table.thursday,g22.table.thursday,g31.table.thursday,g32.table.thursday,g41.table.thursday,g42.table.thursday]
  
  //***************************** */
  for(let grouptable of allseances){
  let tpcount=1;
    for(let seance of grouptable){
               if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                seance.count=((tpcount-1)%2)+1;
                tpcount++;
               }
    }
  }
  //order of TP seances (exactly 2!)
  
    for(let a=0;a<8; a++){
    for(let b=0;b<8; b++){
      for(let c=0;c<8; c++){
        for(let d=0;d<8; d++){
          for(let e=0;e<8; e++){
            for(let f=0;f<8; f++){
    let day=[]
    let vt=[a,b,c,d,e,f]
    for(let it=0;it<6;it++){
       if(allseances[vt[it]][it]&&allseances[vt[it]][it].status!=0)
        day.push(allseances[vt[it]][it])
            else
        day.push(emptyseance)
    
       
    }
    if(inArray(day,days))continue
    days.push(day)
    }
    }
    }
    }
    }
    }
    let saver=await new cache({id:'thursday',days:days})
    await saver.save()
    .then((d)=>d)
    .catch(()=>console.log("error caching"))

  }
  else{
    days=cdays.days//get cache
    for(let day of days){
    let tpcount=1;
      for(let seance of day){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    }

  }

  //debug
  /*
  let cpt=0;
  for(let day of days){cpt++
     if(cpt<700)continue
     if(cpt>800)break
  console.log("******************************")
    for(let k of day){
      if(k.status==0){
        console.log("empty");
        continue
      }
       console.log(k.seanceName+" "+k.type+" pdc"+k.period)
    }
  console.log("******************************")
  console.log("")
  console.log("")

  }
  //********************************* */
  console.log(days.length)
  
  let goodays=[]
  let gooday=[]
  let simgoodays=[]
  console.log(sday)
  //get exact day ********************************************************
  for(let day of days){let ok=1;
    //console.log(day)
  for(let  k=0;k<Math.min(sday.length,day.length);k++){
  if(sday[k].status==0)continue;
  if(sameseance(day[k],sday[k])==false){ok=0;break;}
  if(day[k].period!=1){
    if(day[k].period!=z&&day[k].period!=q){
     // console.log(day[k].period+" perioooooooooood"+day[k].seanceName)
      //console.log(z+" "+q)
      ok=0;break;//cadency check
    }
  }
 // console.log(sameseance(day[k],sday[k])+' '+day[k]+' '+sday[k])
  }//checking day cmp
  if(ok==1){let cn=0;
     gooday=JSON.parse(JSON.stringify((day)))
     break;
  }
  }
//counting unique seances
let seancescounter={}
for (let k of sday){
 if(k.status==1){
  if(seancescounter.hasOwnProperty(k.seanceName+" "+k.type))
  seancescounter[k.seanceName+" "+k.type]++
else 
seancescounter[k.seanceName+" "+k.type]=1
 }
}
console.log(seancescounter)

  for(let day of days){let ok=1;
let cpsc=JSON.parse(JSON.stringify(seancescounter))
let checker =1
let cnt=-1
    //console.log(day)
    
    for(let seance of day){
          cnt++
          
      if(seance.status=='0'||(seance.period!=q&&seance.period!=z&&seance.period!=1)){
       /* console.log("**********************************")
        console.log(seance)
        console.log(cnt)
        console.log(day[cnt])
        console.log(cpsc)*/
        day[cnt]=emptyseance
        //console.log(day[cnt])
        //console.log("**********************************")
        continue;

        
      }
          if(cpsc.hasOwnProperty(seance.seanceName+" "+seance.type)){
            if(cpsc[seance.seanceName+" "+seance.type]--<1){checker=0;break;}
          }
          else{
        /*    
        console.log("cn2**********************************")
        console.log(day[cnt])*/
        day[cnt]=emptyseance
        /*console.log(day[cnt])
        console.log("**********************************")*/
          }
    }
    for(let s in cpsc){
      if(cpsc[s]!=0){checker=0;break;}
      //console.log("accepted day")
      //console.log(day)
    }
    if(checker==1){//console.log("checked")
      if(inArray(day,goodays)==false){
      goodays.push(JSON.parse(JSON.stringify(day)))
      }



    }
  }


  

//*********************************************************************************************************** */



  

for(let k =0;k<Math.min(gooday.length,sday.length);k++){
  if(sday[k].status==0)gooday[k]=emptyseance
} 



//*********************************************************************************************************** */
//gooday seance removal
let k=0
if( goodays.length&&gooday.length){

  for(let k =Math.min(gooday.length,sday.length);k<6;k++){
   gooday[k]=emptyseance
 } 
for(let day of goodays){//console.log("iterate")

for(let seance in day){
//console.log("this"+day[seance].seanceName)
}
if(compare(day,gooday)){
goodays.splice(k,1)
}k++
}

}


//*********************************************************************************************************** */
if(goodays.length){
k=0
for(let day of goodays){
        if(sametime(day,sday) ){
          if(!inArray(day,simgoodays)){
   simgoodays.push(JSON.parse(JSON.stringify(day)))
  goodays.splice(k,1)
          
          }
 
  }k++
}
//getting sim goodays
  //******************** */

}
if(gooday.length){
  
  
  for(let seance of gooday)
  seance.period=cadency[parseInt(seance.period)-1]

  
}

  /********************/
if(goodays.length){
   goodparse(goodays,cadency)

  //cleaning gooddays
}
if(simgoodays.length){
   goodparse(simgoodays,cadency)

  //cleaning simgoodays
}

  if(gooday.length>0){



  

  res.render("result.ejs",{result:goodays,gooday:gooday,simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(goodays.length>0){
    res.render("result.ejs",{result:goodays,gooday:[],simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(simgoodays.length>0){
res.render("result.ejs",{result:[],gooday:[],simgoodays:simgoodays,timestamps:timestamps})
    
  }
  else 
  res.render("result.ejs",{result:[],gooday:[],simgoodays:[],timestamps:timestamps})
  //filter *************************************
  
  
  
  }
  

         }
         else{
          res.redirect('/dashboard')
         }

    }
    
  else{
    res.redirect('/home')
  } 


  })
}
 
//********************************************************************************************************************* */







let schedule_builder_fri=async(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache)=>{
  app.get('/generatefri',async(req,res)=>{
    if(req.session.user && req.session.user!="admin@admin.admin"){
         let user=await people.findOne({email:req.session.user})
         .then((d)=>d)
         .catch(()=>console.log("error getting user"))
         if(user.verification){
          
    let q=(req.query['cadencyq'])
    let z=(req.query['cadencyz']) 
    let ctt=await customttmodel.findOne({id:req.session.user})
    .then((d)=>d)
    .catch(()=>console.log("error pulling custom"))

    if(!ctt || ctt.length<1)res.redirect("/customtimetable")
    else{
      //console.log(q)
      //check cache
 let cdays= await cache.findOne({id:'friday'})
 .then((d)=>d)
 .catch(()=>console.log("error finding cache"))

 
 let days=[]
 let result=[]

 let emptyseance={
   
   seanceName:"",
   class:"",
   type:"",
   period:"",
   prof:"",
   status:0
 }

 let sday=ctt.table.friday
 //parsing****************************************
 for(let k of sday){
 k.seanceName=subject[ parseInt(k.seanceName)-1]
 k.type=type[ parseInt(k.type)-1]


 } 
 //produce****************************************
 
      
  if(!cdays){
    let g11=await timetablesmodel.findOne({id:"A01G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g12=await timetablesmodel.findOne({id:"A01G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g21=await timetablesmodel.findOne({id:"A02G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g22=await timetablesmodel.findOne({id:"A02G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g31=await timetablesmodel.findOne({id:"A03G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g32=await timetablesmodel.findOne({id:"A03G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g41=await timetablesmodel.findOne({id:"A04G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g42=await timetablesmodel.findOne({id:"A04G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))

   
  //pull data 
  let allseances=[g11.table.friday,g12.table.friday,g21.table.friday,g22.table.friday,g31.table.friday,g32.table.friday,g41.table.friday,g42.table.friday]
  
  //***************************** */
  for(let grouptable of allseances){
  let tpcount=1;
    for(let seance of grouptable){
               if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                seance.count=((tpcount-1)%2)+1;
                tpcount++;
               }
    }
  }
  //order of TP seances (exactly 2!)
  
    for(let a=0;a<8; a++){
    for(let b=0;b<8; b++){
      for(let c=0;c<8; c++){
        for(let d=0;d<8; d++){
          for(let e=0;e<8; e++){
            for(let f=0;f<8; f++){
    let day=[]
    let vt=[a,b,c,d,e,f]
    for(let it=0;it<6;it++){
       if(allseances[vt[it]][it]&&allseances[vt[it]][it].status!=0)
        day.push(allseances[vt[it]][it])
            else
        day.push(emptyseance)
    
       
    }
    if(inArray(day,days))continue
    days.push(day)
    }
    }
    }
    }
    }
    }
    let saver=await new cache({id:'friday',days:days})
    await saver.save()
    .then((d)=>d)
    .catch(()=>console.log("error caching"))

  }
  else{
    days=cdays.days
    for(let day of days){
    let tpcount=1;
      for(let seance of day){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    };//get cache

  }

  //debug
  /*
  let cpt=0;
  for(let day of days){cpt++
     if(cpt<700)continue
     if(cpt>800)break
  console.log("******************************")
    for(let k of day){
      if(k.status==0){
        console.log("empty");
        continue
      }
       console.log(k.seanceName+" "+k.type+" pdc"+k.period)
    }
  console.log("******************************")
  console.log("")
  console.log("")

  }
  //********************************* */
  console.log(days.length)
  
  let goodays=[]
  let gooday=[]
  let simgoodays=[]
  console.log(sday)
  //get exact day ********************************************************
  for(let day of days){let ok=1;
    //console.log(day)
  for(let  k=0;k<Math.min(sday.length,day.length);k++){
  if(sday[k].status==0)continue;
  if(sameseance(day[k],sday[k])==false){ok=0;break;}
  if(day[k].period!=1){
    if(day[k].period!=z&&day[k].period!=q){
     // console.log(day[k].period+" perioooooooooood"+day[k].seanceName)
      //console.log(z+" "+q)
      ok=0;break;//cadency check
    }
  }
 // console.log(sameseance(day[k],sday[k])+' '+day[k]+' '+sday[k])
  }//checking day cmp
  if(ok==1){let cn=0;
     gooday=JSON.parse(JSON.stringify((day)))
     break;
  }
  }
//counting unique seances
let seancescounter={}
for (let k of sday){
 if(k.status==1){
  if(seancescounter.hasOwnProperty(k.seanceName+" "+k.type))
  seancescounter[k.seanceName+" "+k.type]++
else 
seancescounter[k.seanceName+" "+k.type]=1
 }
}
console.log(seancescounter)

  for(let day of days){let ok=1;
let cpsc=JSON.parse(JSON.stringify(seancescounter))
let checker =1
let cnt=-1
    //console.log(day)
    
    for(let seance of day){
          cnt++
          
      if(seance.status=='0'||(seance.period!=q&&seance.period!=z&&seance.period!=1)){
       /* console.log("**********************************")
        console.log(seance)
        console.log(cnt)
        console.log(day[cnt])
        console.log(cpsc)*/
        day[cnt]=emptyseance
        //console.log(day[cnt])
        //console.log("**********************************")
        continue;

        
      }
          if(cpsc.hasOwnProperty(seance.seanceName+" "+seance.type)){
            if(cpsc[seance.seanceName+" "+seance.type]--<1){checker=0;break;}
          }
          else{
        /*    
        console.log("cn2**********************************")
        console.log(day[cnt])*/
        day[cnt]=emptyseance
        /*console.log(day[cnt])
        console.log("**********************************")*/
          }
    }
    for(let s in cpsc){
      if(cpsc[s]!=0){checker=0;break;}
      //console.log("accepted day")
      //console.log(day)
    }
    if(checker==1){//console.log("checked")
      if(inArray(day,goodays)==false){
      goodays.push(JSON.parse(JSON.stringify(day)))
      }



    }
  }


  

//*********************************************************************************************************** */



  

for(let k =0;k<Math.min(gooday.length,sday.length);k++){
  if(sday[k].status==0)gooday[k]=emptyseance
} 



//*********************************************************************************************************** */
//gooday seance removal
let k=0
if( goodays.length&&gooday.length){

  for(let k =Math.min(gooday.length,sday.length);k<6;k++){
   gooday[k]=emptyseance
 } 
for(let day of goodays){//console.log("iterate")

for(let seance in day){
//console.log("this"+day[seance].seanceName)
}
if(compare(day,gooday)){
goodays.splice(k,1)
}k++
}

}


//*********************************************************************************************************** */
if(goodays.length){
k=0
for(let day of goodays){
        if(sametime(day,sday) ){
          if(!inArray(day,simgoodays)){
   simgoodays.push(JSON.parse(JSON.stringify(day)))
  goodays.splice(k,1)
          
          }
 
  }k++
}
//getting sim goodays
  //******************** */

}
if(gooday.length){
  
  
  for(let seance of gooday)
  seance.period=cadency[parseInt(seance.period)-1]

  
}

  /********************/
if(goodays.length){
   goodparse(goodays,cadency)

  //cleaning gooddays
}
if(simgoodays.length){
   goodparse(simgoodays,cadency)

  //cleaning simgoodays
}

  if(gooday.length>0){



  

  res.render("result.ejs",{result:goodays,gooday:gooday,simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(goodays.length>0){
    res.render("result.ejs",{result:goodays,gooday:[],simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(simgoodays.length>0){
res.render("result.ejs",{result:[],gooday:[],simgoodays:simgoodays,timestamps:timestamps})
    
  }
  else 
  res.render("result.ejs",{result:[],gooday:[],simgoodays:[],timestamps:timestamps})
  //filter *************************************
  
  
  
  }
  

         }
         else{
          res.redirect('/dashboard')
         }

    }
    
  else{
    res.redirect('/home')
  } 


  })
}

//***************************************************************************************************************************** */











let schedule_builder_sat=async(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache)=>{
  app.get('/generatesat',async(req,res)=>{
    if(req.session.user && req.session.user!="admin@admin.admin"){
         let user=await people.findOne({email:req.session.user})
         .then((d)=>d)
         .catch(()=>console.log("error getting user"))
         if(user.verification){
          
    let q=(req.query['cadencyq'])
    let z=(req.query['cadencyz']) 
    let ctt=await customttmodel.findOne({id:req.session.user})
    .then((d)=>d)
    .catch(()=>console.log("error pulling custom"))

    if(!ctt || ctt.length<1)res.redirect("/customtimetable")
    else{
      //console.log(q)
      //check cache
 let cdays= await cache.findOne({id:'saturday'})
 .then((d)=>d)
 .catch(()=>console.log("error finding cache"))

 
 let days=[]
 let result=[]

 let emptyseance={
   
   seanceName:"",
   class:"",
   type:"",
   period:"",
   prof:"",
   status:0
 }

 let sday=ctt.table.saturday
 //parsing****************************************
 for(let k of sday){
 k.seanceName=subject[ parseInt(k.seanceName)-1]
 k.type=type[ parseInt(k.type)-1]


 } 
 //produce****************************************
 
      
  if(!cdays){
    let g11=await timetablesmodel.findOne({id:"A01G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g12=await timetablesmodel.findOne({id:"A01G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g21=await timetablesmodel.findOne({id:"A02G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g22=await timetablesmodel.findOne({id:"A02G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g31=await timetablesmodel.findOne({id:"A03G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g32=await timetablesmodel.findOne({id:"A03G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g41=await timetablesmodel.findOne({id:"A04G1"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))
    let g42=await timetablesmodel.findOne({id:"A04G2"})
    .then((d)=>d)
    .catch(()=>console.log("error getting data"))

   
  //pull data 
  let allseances=[g11.table.saturday,g12.table.saturday,g21.table.saturday,g22.table.saturday,g31.table.saturday,g32.table.saturday,g41.table.saturday,g42.table.saturday]
  
  //***************************** */
  for(let grouptable of allseances){
  let tpcount=1;
    for(let seance of grouptable){
               if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                seance.count=((tpcount-1)%2)+1;
                tpcount++;
               }
    }
  }
  //order of TP seances (exactly 2!)
  
    for(let a=0;a<8; a++){
    for(let b=0;b<8; b++){
      for(let c=0;c<8; c++){
        for(let d=0;d<8; d++){
          for(let e=0;e<8; e++){
            for(let f=0;f<8; f++){
    let day=[]
    let vt=[a,b,c,d,e,f]
    for(let it=0;it<6;it++){
       if(allseances[vt[it]][it]&&allseances[vt[it]][it].status!=0)
        day.push(allseances[vt[it]][it])
            else
        day.push(emptyseance)
    
       
    }
    if(inArray(day,days))continue
    days.push(day)
    }
    }
    }
    }
    }
    }
    let saver=await new cache({id:'saturday',days:days})
    await saver.save()
    .then((d)=>d)
    .catch(()=>console.log("error caching"))

  }
  else{
    days=cdays.days
    for(let day of days){
    let tpcount=1;
      for(let seance of day){
                 if(seance.status&&seance.type=="TP"&&(seance.period==q||seance.period==z||seance.period==1)){
                  seance.count=((tpcount-1)%2)+1;
                  tpcount++;
                 }
      }
    };//get cache

  }

  //debug
  /*
  let cpt=0;
  for(let day of days){cpt++
     if(cpt<700)continue
     if(cpt>800)break
  console.log("******************************")
    for(let k of day){
      if(k.status==0){
        console.log("empty");
        continue
      }
       console.log(k.seanceName+" "+k.type+" pdc"+k.period)
    }
  console.log("******************************")
  console.log("")
  console.log("")

  }
  //********************************* */
  console.log(days.length)
  
  let goodays=[]
  let gooday=[]
  let simgoodays=[]
  console.log(sday)
  //get exact day ********************************************************
  for(let day of days){let ok=1;
    //console.log(day)
  for(let  k=0;k<Math.min(sday.length,day.length);k++){
  if(sday[k].status==0)continue;
  if(sameseance(day[k],sday[k])==false){ok=0;break;}
  if(day[k].period!=1){
    if(day[k].period!=z&&day[k].period!=q){
     // console.log(day[k].period+" perioooooooooood"+day[k].seanceName)
      //console.log(z+" "+q)
      ok=0;break;//cadency check
    }
  }
 // console.log(sameseance(day[k],sday[k])+' '+day[k]+' '+sday[k])
  }//checking day cmp
  if(ok==1){let cn=0;
     gooday=JSON.parse(JSON.stringify((day)))
     break;
  }
  }
//counting unique seances
let seancescounter={}
for (let k of sday){
 if(k.status==1){
  if(seancescounter.hasOwnProperty(k.seanceName+" "+k.type))
  seancescounter[k.seanceName+" "+k.type]++
else 
seancescounter[k.seanceName+" "+k.type]=1
 }
}
console.log(seancescounter)

  for(let day of days){let ok=1;
let cpsc=JSON.parse(JSON.stringify(seancescounter))
let checker =1
let cnt=-1
    //console.log(day)
    
    for(let seance of day){
          cnt++
          
      if(seance.status=='0'||(seance.period!=q&&seance.period!=z&&seance.period!=1)){
       /* console.log("**********************************")
        console.log(seance)
        console.log(cnt)
        console.log(day[cnt])
        console.log(cpsc)*/
        day[cnt]=emptyseance
        //console.log(day[cnt])
        //console.log("**********************************")
        continue;

        
      }
          if(cpsc.hasOwnProperty(seance.seanceName+" "+seance.type)){
            if(cpsc[seance.seanceName+" "+seance.type]--<1){checker=0;break;}
          }
          else{
        /*    
        console.log("cn2**********************************")
        console.log(day[cnt])*/
        day[cnt]=emptyseance
        /*console.log(day[cnt])
        console.log("**********************************")*/
          }
    }
    for(let s in cpsc){
      if(cpsc[s]!=0){checker=0;break;}
      //console.log("accepted day")
      //console.log(day)
    }
    if(checker==1){//console.log("checked")
      if(inArray(day,goodays)==false){
      goodays.push(JSON.parse(JSON.stringify(day)))
      }



    }
  }


  

//*********************************************************************************************************** */



  

for(let k =0;k<Math.min(gooday.length,sday.length);k++){
  if(sday[k].status==0)gooday[k]=emptyseance
} 



//*********************************************************************************************************** */
//gooday seance removal
let k=0
if( goodays.length&&gooday.length){

  for(let k =Math.min(gooday.length,sday.length);k<6;k++){
   gooday[k]=emptyseance
 } 
for(let day of goodays){//console.log("iterate")

for(let seance in day){
//console.log("this"+day[seance].seanceName)
}
if(compare(day,gooday)){
goodays.splice(k,1)
}k++
}

}


//*********************************************************************************************************** */
if(goodays.length){
k=0
for(let day of goodays){
        if(sametime(day,sday) ){
          if(!inArray(day,simgoodays)){
   simgoodays.push(JSON.parse(JSON.stringify(day)))
  goodays.splice(k,1)
          
          }
 
  }k++
}
//getting sim goodays
  //******************** */

}
if(gooday.length){
  
  
  for(let seance of gooday)
  seance.period=cadency[parseInt(seance.period)-1]

  
}

  /********************/
if(goodays.length){
   goodparse(goodays,cadency)

  //cleaning gooddays
}
if(simgoodays.length){
   goodparse(simgoodays,cadency)

  //cleaning simgoodays
}

  if(gooday.length>0){



  

  res.render("result.ejs",{result:goodays,gooday:gooday,simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(goodays.length>0){
    res.render("result.ejs",{result:goodays,gooday:[],simgoodays:simgoodays,timestamps:timestamps})

  }
  else if(simgoodays.length>0){
res.render("result.ejs",{result:[],gooday:[],simgoodays:simgoodays,timestamps:timestamps})
    
  }
  else 
  res.render("result.ejs",{result:[],gooday:[],simgoodays:[],timestamps:timestamps})
  //filter *************************************
  
  
  
  }
  

         }
         else{
          res.redirect('/dashboard')
         }

    }
    
  else{
    res.redirect('/home')
  } 


  })
}









  module.exports={schedule_builder_fri,schedule_builder_mon,schedule_builder_sat,schedule_builder_thu,schedule_builder_tues,schedule_builder_wed}