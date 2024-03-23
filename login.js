const{temp_ban_AutoCkeck}=require('./ban_service')
const login=function(app,people,messagee,reinit,bc){
  app.post('/login',async(req,res,done)=>{
    if(!req.session.user){
        reinit(messagee);
   const em= await req.body.email;
   const hps= await  req.body.password;
    let dt=await people.findOne({email:em})
    .then((data)=>{console.log("login email collected");return data;})
    .catch(()=>console.log("error in collecting login email"));
     if(dt){
       await console.log(dt.password);
    let authent=   await  bc.compare(hps,dt.password)
    .then((dt)=>{console.log("authentificated succ");return dt;})
    .catch(()=>console.log("error authenticating"))
    await console.log(authent);
    const status=await dt.ban;
    let day=dt.date.day;
    let month=dt.date.month;
    let year=dt.date.year;
    if(authent){
     await temp_ban_AutoCkeck(app,people);
    }
    if(authent&&!status){
     
        req.session.user=await em;
        messagee.username=await dt.username;
       await people.findOneAndUpdate({email:em},{status:dt.status+1})
       let user=await people.findOne({email:req.session.user})
       .then((data)=>data)
       .catch((e)=>console.log("error logging"))

       if(user.verification){
        res.redirect('/dashboard');

       }
       else{//yet to be verified
         res.redirect('/verification')


       }
    }
    else if(!authent){
        messagee.msg=await "Wrong Password";
        res.redirect('/login');

    }
    else if(status==1){
     messagee.msg=await "Sorry you are Indefinitely Banned from Our Plateform";
     res.redirect('/login');

    }
    else if(status==2){
     messagee.msg=await `Sorry you are Banned from Our Plateform Until this date ${day}\\${month}\\${year}`;
     res.redirect('/login');


    }
    }
   
   else{
       messagee.msg=await "Unlogged Email \n Proceed to Sign up Page Or Check Email Spelling";
       res.redirect('/login');

   }

    }
    else if(req.session.user=="admin@admin.admin"){
        res.redirect('/admin_dashboard')
    }
    else res.redirect('/dashboard')
  })
}

module.exports={login}



