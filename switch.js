
function monday_switch(app,timetablesmodel){app.get('/switch',async(req,res)=>{
    if(!req.session.user||req.session.user!="admin@admin.admin"){
      res.redirect('dashboard');
    }
    else{
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
  
      //switch monday *********************************************
      let md=JSON.parse(JSON.stringify(g11.table.monday))
      let md2=JSON.parse(JSON.stringify(g12.table.monday))
      let mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sp
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g11.table.monday=md
      g12.table.monday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A01G1"},{table:g11.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A01G2"},{table:g12.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
      
      //switch monday *********************************************
       md=JSON.parse(JSON.stringify(g21.table.monday))
       md2=JSON.parse(JSON.stringify(g22.table.monday))
       mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sp
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g21.table.monday=md
      g22.table.monday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A02G1"},{table:g21.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A02G2"},{table:g22.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
  
  
      
      //switch monday *********************************************
      md=JSON.parse(JSON.stringify(g31.table.monday))
      md2=JSON.parse(JSON.stringify(g32.table.monday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sp
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g31.table.monday=md
     g32.table.monday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A03G1"},{table:g31.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A03G2"},{table:g32.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
  
     
      //switch monday *********************************************
      md=JSON.parse(JSON.stringify(g41.table.monday))
      md2=JSON.parse(JSON.stringify(g42.table.monday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sp
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g41.table.monday=md
     g42.table.monday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A04G1"},{table:g41.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A04G2"},{table:g42.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
      
      res.redirect('home');
    }
  })}
  











  
function tuesday_switch(app,timetablesmodel){app.get('/switch',async(req,res)=>{
    if(!req.session.user||req.session.user!="admin@admin.admin"){
      res.redirect('dashboard');
    }
    else{
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
  
      //switch tuesday *********************************************
      let md=JSON.parse(JSON.stringify(g11.table.tuesday))
      let md2=JSON.parse(JSON.stringify(g12.table.tuesday))
      let mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g11.table.tuesday=md
      g12.table.tuesday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A01G1"},{table:g11.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A01G2"},{table:g12.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
      
      //switch tuesday *********************************************
       md=JSON.parse(JSON.stringify(g21.table.tuesday))
       md2=JSON.parse(JSON.stringify(g22.table.tuesday))
       mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g21.table.tuesday=md
      g22.table.tuesday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A02G1"},{table:g21.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A02G2"},{table:g22.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
  
  
      
      //switch tuesday *********************************************
      md=JSON.parse(JSON.stringify(g31.table.tuesday))
      md2=JSON.parse(JSON.stringify(g32.table.tuesday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g31.table.tuesday=md
     g32.table.tuesday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A03G1"},{table:g31.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A03G2"},{table:g32.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
  
     
      //switch tuesday *********************************************
      md=JSON.parse(JSON.stringify(g41.table.tuesday))
      md2=JSON.parse(JSON.stringify(g42.table.tuesday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g41.table.tuesday=md
     g42.table.tuesday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A04G1"},{table:g41.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A04G2"},{table:g42.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
      
      res.redirect('home');
    }
  })}
  














  
function wednesday_switch(app,timetablesmodel){app.get('/switch',async(req,res)=>{
    if(!req.session.user||req.session.user!="admin@admin.admin"){
      res.redirect('dashboard');
    }
    else{
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
  
      //switch wednesday *********************************************
      let md=JSON.parse(JSON.stringify(g11.table.wednesday))
      let md2=JSON.parse(JSON.stringify(g12.table.wednesday))
      let mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g11.table.wednesday=md
      g12.table.wednesday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A01G1"},{table:g11.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A01G2"},{table:g12.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
      
      //switch wednesday *********************************************
       md=JSON.parse(JSON.stringify(g21.table.wednesday))
       md2=JSON.parse(JSON.stringify(g22.table.wednesday))
       mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g21.table.wednesday=md
      g22.table.wednesday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A02G1"},{table:g21.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A02G2"},{table:g22.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
  
  
      
      //switch wednesday *********************************************
      md=JSON.parse(JSON.stringify(g31.table.wednesday))
      md2=JSON.parse(JSON.stringify(g32.table.wednesday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g31.table.wednesday=md
     g32.table.wednesday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A03G1"},{table:g31.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A03G2"},{table:g32.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
  
     
      //switch wednesday *********************************************
      md=JSON.parse(JSON.stringify(g41.table.wednesday))
      md2=JSON.parse(JSON.stringify(g42.table.wednesday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g41.table.wednesday=md
     g42.table.wednesday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A04G1"},{table:g41.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A04G2"},{table:g42.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
      
      res.redirect('home');
    }
  })}
  















  
function thursday_switch(app,timetablesmodel){app.get('/switch',async(req,res)=>{
    if(!req.session.user||req.session.user!="admin@admin.admin"){
      res.redirect('dashboard');
    }
    else{
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
  
      //switch thursday *********************************************
      let md=JSON.parse(JSON.stringify(g11.table.thursday))
      let md2=JSON.parse(JSON.stringify(g12.table.thursday))
      let mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g11.table.thursday=md
      g12.table.thursday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A01G1"},{table:g11.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A01G2"},{table:g12.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
      
      //switch thursday *********************************************
       md=JSON.parse(JSON.stringify(g21.table.thursday))
       md2=JSON.parse(JSON.stringify(g22.table.thursday))
       mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g21.table.thursday=md
      g22.table.thursday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A02G1"},{table:g21.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A02G2"},{table:g22.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
  
  
      
      //switch thursday *********************************************
      md=JSON.parse(JSON.stringify(g31.table.thursday))
      md2=JSON.parse(JSON.stringify(g32.table.thursday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g31.table.thursday=md
     g32.table.thursday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A03G1"},{table:g31.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A03G2"},{table:g32.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
  
     
      //switch thursday *********************************************
      md=JSON.parse(JSON.stringify(g41.table.thursday))
      md2=JSON.parse(JSON.stringify(g42.table.thursday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g41.table.thursday=md
     g42.table.thursday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A04G1"},{table:g41.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A04G2"},{table:g42.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
      
      res.redirect('home');
    }
  })}
  







  
function friday_switch(app,timetablesmodel){app.get('/switch',async(req,res)=>{
    if(!req.session.user||req.session.user!="admin@admin.admin"){
      res.redirect('dashboard');
    }
    else{
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
  
      //switch friday *********************************************
      let md=JSON.parse(JSON.stringify(g11.table.friday))
      let md2=JSON.parse(JSON.stringify(g12.table.friday))
      let mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g11.table.friday=md
      g12.table.friday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A01G1"},{table:g11.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A01G2"},{table:g12.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
      
      //switch friday *********************************************
       md=JSON.parse(JSON.stringify(g21.table.friday))
       md2=JSON.parse(JSON.stringify(g22.table.friday))
       mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g21.table.friday=md
      g22.table.friday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A02G1"},{table:g21.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A02G2"},{table:g22.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
  
  
      
      //switch friday *********************************************
      md=JSON.parse(JSON.stringify(g31.table.friday))
      md2=JSON.parse(JSON.stringify(g32.table.friday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g31.table.friday=md
     g32.table.friday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A03G1"},{table:g31.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A03G2"},{table:g32.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
  
     
      //switch friday *********************************************
      md=JSON.parse(JSON.stringify(g41.table.friday))
      md2=JSON.parse(JSON.stringify(g42.table.friday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g41.table.friday=md
     g42.table.friday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A04G1"},{table:g41.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A04G2"},{table:g42.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
      
      res.redirect('home');
    }
  })}
  





  
function saturday_switch(app,timetablesmodel){app.get('/switch',async(req,res)=>{
    if(!req.session.user||req.session.user!="admin@admin.admin"){
      res.redirect('dashboard');
    }
    else{
      let g11=await timetablesmodel.findOne({id:"A01G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g12=await timetablesmodel.findOne({id:"A01G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g21=await timetablesmodel.findOne({id:"A02G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g22=await timetablesmodel.findOne({id:"A02G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g31=await timetablesmodel.findOne({id:"A03G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g32=await timetablesmodel.findOne({id:"A03G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g41=await timetablesmodel.findOne({id:"A04G1"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
      let g42=await timetablesmodel.findOne({id:"A04G2"})
      .then((d)=>d)
      .catch(()=>console.log("error getting timetable"))
  
      //switch saturday *********************************************
      let md=JSON.parse(JSON.stringify(g11.table.saturday))
      let md2=JSON.parse(JSON.stringify(g12.table.saturday))
      let mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g11.table.saturday=md
      g12.table.saturday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A01G1"},{table:g11.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A01G2"},{table:g12.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
      
      //switch saturday *********************************************
       md=JSON.parse(JSON.stringify(g21.table.saturday))
       md2=JSON.parse(JSON.stringify(g22.table.saturday))
       mx=Math.max(md.length,md2.length)
      for(let it=0;it<mx;it++){
        let seance=md[it];
        let seance2=md2[it];
        if(it==md.length||it==md2.length)break;
        //switch
        if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                  let sn=JSON.parse(JSON.stringify(seance.seanceName))
                  let st=JSON.parse(JSON.stringify(seance.type))
                  let sc=JSON.parse(JSON.stringify(seance.class))
                  let sp=JSON.parse(JSON.stringify(seance.prof))
  
                  seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                  seance.type=JSON.parse(JSON.stringify(seance2.type))
                  seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                  seance.class=JSON.parse(JSON.stringify(seance2.class))
                  
  
                  seance2.seanceName=sn
                  seance2.type=st
                  seance2.prof=sp
                  seance2.class=sc
                  if(seance2.period=="2"||seance2.period=="QA"){
                    seance2.period="3"
                  }
                  else 
                  seance2.period="2"
  
                  
                  if(seance.period=="2"||seance.period=="QA"){
                    seance.period="3"
                  }
                  else 
                  seance.period="2"
  
        }
      }
      g21.table.saturday=md
      g22.table.saturday=md2
  
      await timetablesmodel.findOneAndUpdate({id:"A02G1"},{table:g21.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      await timetablesmodel.findOneAndUpdate({id:"A02G2"},{table:g22.table})
      .then((d)=>d)
      .catch(()=>console.log("error switching"))
  
      
      //******************************************************** */
  
  
  
      
      //switch saturday *********************************************
      md=JSON.parse(JSON.stringify(g31.table.saturday))
      md2=JSON.parse(JSON.stringify(g32.table.saturday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g31.table.saturday=md
     g32.table.saturday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A03G1"},{table:g31.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A03G2"},{table:g32.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
  
     
      //switch saturday *********************************************
      md=JSON.parse(JSON.stringify(g41.table.saturday))
      md2=JSON.parse(JSON.stringify(g42.table.saturday))
      mx=Math.max(md.length,md2.length)
     for(let it=0;it<mx;it++){
       let seance=md[it];
       let seance2=md2[it];
       if(it==md.length||it==md2.length)break;
       //switch
       if(seance && seance.status &&seance2 && seance2.status && seance.period!='H'&& seance.period!='1' && seance2.period!='H'&& seance2.period!='1'){
                 let sn=JSON.parse(JSON.stringify(seance.seanceName))
                 let st=JSON.parse(JSON.stringify(seance.type))
                 let sc=JSON.parse(JSON.stringify(seance.class))
                 let sp=JSON.parse(JSON.stringify(seance.prof))
  
                 seance.seanceName=JSON.parse(JSON.stringify(seance2.seanceName))
                 seance.type=JSON.parse(JSON.stringify(seance2.type))
                 seance.prof=JSON.parse(JSON.stringify(seance2.prof))
                 seance.class=JSON.parse(JSON.stringify(seance2.class))
                 
  
                 seance2.seanceName=sn
                 seance2.type=st
                 seance2.prof=sp
                 seance2.class=sc
                 if(seance2.period=="2"||seance2.period=="QA"){
                   seance2.period="3"
                 }
                 else 
                 seance2.period="2"
  
                 
                 if(seance.period=="2"||seance.period=="QA"){
                   seance.period="3"
                 }
                 else 
                 seance.period="2"
  
       }
     }
     g41.table.saturday=md
     g42.table.saturday=md2
  
     await timetablesmodel.findOneAndUpdate({id:"A04G1"},{table:g41.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     await timetablesmodel.findOneAndUpdate({id:"A04G2"},{table:g42.table})
     .then((d)=>d)
     .catch(()=>console.log("error switching"))
  
     
     //******************************************************** */
      
      res.redirect('home');
    }
  })}
  

  module.exports={monday_switch,tuesday_switch,wednesday_switch,thursday_switch,friday_switch,saturday_switch}