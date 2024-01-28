//functional dependecies
let temp_ban_ckeck=(today,tobeback)=>{
  if(today.year<tobeback.year)return true;
  if(today.year>tobeback.year)return false;
  if(today.month<tobeback.month)return true;
  if(today.month>tobeback.month)return false;
  if(today.day<tobeback.day)return true;
  if(today.day>tobeback.day)return false;
  return false;
}
let free_user=(today,tobeback)=>{
  if(today.year>tobeback.year)return true;
  else if(today.year<tobeback.year)return false
  if(today.month>tobeback.month)return true;
  else if(today.month<tobeback.month)return false
  if(today.day>=tobeback.day)return true;
  return false;
}



let fetchDay=(date)=>{let day='';
  for(let k=date.length-1;k>-1;k--){
    
    if(date[k]=='-'){
      break;
    }
    day+=date[k];
    
  }
  day=rev(day);
  if(day[1]=='0'){
    day=day.substring(0,1);
  }
  return day;

}
let fetchMonth=(date)=>{let month='';let ok=0;
  for(let k=date.length-1;k>-1;k--){
    
    if(date[k]=='-'){
      ok++;continue;
    }
    if(ok==2)break;
   if(ok==1) month+=date[k];
  }month=rev(month);
  
  if(month[1]=='0'){
    month=month.substring(0,1);
  }
  return month;

}
let fetchYear=(date)=>{let year='';
  for(let k=0;k<date.length;k++){
    
    if(date[k]=='-'){
      break;
    }
    year+=date[k];
  }return year;

}



let rev=(s)=>{
  let n=s.length;
  for(let k=0;k<parseInt(n/2);k++){
    let fp=s.substring(0,k);
    let sp=s.substring(k+1,n-k-1);
    let tp=s.substring(n-k);
    s=fp+s[n-k-1]+sp+s[k]+tp;
  }return s;
  }

//********************** */

let ban=(app,people)=>{
  app.post('/ban',async(req,res)=>{
    if(req.session.user=='admin@admin.admin'){
         let email=await req.body.id;
         let initdate={day:'',month:'',year:''};
         let user = await people.findOneAndUpdate({email:email},{ban:1,date:initdate})
         .then(()=>console.log(`user with email ${email} is Banned successfully`))
         .catch("error searching to Ban")
         res.redirect('/users_panel');
    }
    else{
      
      res.redirect('/dashboard')
    }
  })
}


let unban=(app,people)=>{
  app.post('/unban',async(req,res)=>{
    if(req.session.user=='admin@admin.admin'){
    
         let email=await req.body.id;
         let user = await people.findOneAndUpdate({email:email},{ban:0,date:{day:'',month:'',year:''}})
         .then(()=>console.log(`user with email ${email} is Unbanned successfully`))
         .catch("error searching to Unban")
         res.redirect('/users_panel');
    }
    else{
      
      res.redirect('/dashboard')
    }
  })
}

//ban autocheck for temp banned users
let temp_ban_AutoCkeck=async(app,people)=>{
  let all=await people.find({ban:2})
  .then((data)=>{console.log("Checking Temp Banned users");return data;})
  .catch(()=>console.log("Error Checking Temp bans"))
  if(all){
  for(let k=0;k<all.length;k++){
    if(all[k].ban==2){
      let date=await new Date();
      let today={};
       today['day']=date.getDate();
       today['month']=date.getMonth()+1;
       today['year']=date.getFullYear();
      let tobeback=await all[k].date;
      if(free_user(today,tobeback)){
        await people.findOneAndUpdate({email:all[k].email},{ban:0,date:{day:'',month:'',year:''}});
      }

    }
  }

  }
}


let temp_ban=(app,people,messagee)=>{
  app.post('/temp_ban',async(req,res)=>{
    if(req.session.user=='admin@admin.admin'){
      
      messagee.msg='';
      messagee.tobebanned=true;
      messagee.email='';
      
         let email=await req.body.id;
         let date=await req.body.time;
         let user=await people.findOne({email:email});
           console.log(req.body.id)
           console.log(req.body.time)
           console.log(req.body)
         if(user.ban==0){
         let day=await parseInt(fetchDay(date));
         let month=await parseInt(fetchMonth(date));
         let year=await parseInt(fetchYear(date));

              
            let todaydate=await new Date();
            console.log(todaydate);
            let today={}
            today['day']=await todaydate.getDate();
            today['month']=await todaydate.getMonth()+1;
            today['year']=await todaydate.getFullYear();
            let tobeback={};
            tobeback['day']=await day;
            tobeback['month']=await month;
            tobeback['year']=await year;
            console.log(tobeback)
            console.log(today)
            console.log(temp_ban_ckeck(today,tobeback));
            if(temp_ban_ckeck(today,tobeback)){
              await people.findOneAndUpdate({email:email},{ban:2,date:{day:day,month,month,year:year}})
              .then(()=>console.log(`user with email ${email} is temporary banned until ${day}-${month}-${year}`))
              .catch(()=>console.log(`error temp banning user with email ${email} `))
            }
            else{
              messagee.msg="Date of the ban is Invalid";
              messagee.tobebanned=false;
              messagee.email=email;
              
            }
 
         res.redirect('/users_panel');

         }
         else{
          res.redirect('/users_panel');

         }
    }
    else{
      
      res.redirect('/dashboard')
    }
  })
}

module.exports={ban,unban,temp_ban,temp_ban_AutoCkeck}