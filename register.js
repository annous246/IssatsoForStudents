
const register=function(app,people,messagee,reinit,bc){
  app.post('/register',async(req,res,done)=>{
    if(req.session.user&&req.session.user!='admin@admin.admin'){
      res.redirect('/dashboard')
    }
    else if(req.session.user&&req.session.user=='admin@admin.admin'){
      res.redirect('/admin_dashboard')
    }
    
    else{
      await reinit(messagee);
      let un= await req.body.username;
      let em=await req.body.email;
      let pass= await req.body.password;
      let cpass= await req.body.confirm;
      let ep=await(req.body.password==req.body.confirm)
      let ps= await bc.hash(req.body.password,10);
      let age=await req.body.age;
      let prime=await req.body.prime;
      let points=await req.body.points;
      let pic=await req.body.picture;
      let dt;
      await people.findOne({email:em})
      .then((data)=>{dt=data})
      .catch(()=>{console.log("error while finding one")})
     if(em=="admin@admin.admin"){
      messagee.msg=await"Wrong Email Format";
      messagee.pw=await pass;
      messagee.cpw=await cpass;
      messagee.em=await em;
      messagee.un=await un;
      await res.redirect('/register');
      done(null);
  
     }
     else if(dt){
      messagee.msg=await"Email Already Used \n If its yours Proceed to Login Page ";
      messagee.pw=await pass;
      messagee.cpw=await cpass;
      messagee.em=await em;
      messagee.un=await un;
      await res.redirect('/register');
      done(null);
     }
     else if(!ep){
         messagee.msg=await "Passwords dont match";
      await  res.redirect('/register');done(null);
     }
     else if(pass.length<6){
      messagee.msg=await "Password minimum length is 6 characters";
      await  res.redirect('/register');done(null);
  
     }
     else if(age<18||age>200){
      messagee.msg=await "Invalid age (At least 18) ";
   await  res.redirect('/register');done(null);
  
     }
     
     else{
          
        



     
      let usere=new people({username:un,email:em,password:ps,age:age,status:0})
      await usere.save()
      .then(()=>console.log("user saved"))
      .catch(()=>console.log("error saving user"))
      messagee.msg="Your account is registered successfully"
      await res.render('login.ejs',{message:messagee});
      done(null);}

    }
  })
  };
  
module.exports={register}  