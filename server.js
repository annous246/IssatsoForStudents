const {sockets} =require('./sockets.js')
const {custom_save_fri} =require('./custom_save/friday.js')
const {custom_save_mon} =require('./custom_save/monday.js')
const {custom_save_sat} =require('./custom_save/saturday.js')
const {custom_save_thu} =require('./custom_save/thursday.js')
const {custom_save_tues} =require('./custom_save/tuesday.js')
const {custom_save_wed} =require('./custom_save/wednesday.js')
const {schedule_builder_fri,schedule_builder_mon,schedule_builder_sat,schedule_builder_thu,schedule_builder_tues,schedule_builder_wed} =require('./schedule_builder.js')
const {logSchema,timetableschema,customttschema,userSchema,cacheSchema} =require('./schemas.js')
const {save_schedule} =require('./schedule_saver.js')
const {double_save} =require('./double_saver.js')
const {login} =require('./login.js')
const {register} =require('./register.js')
const {errorChecker} =require('./general_functional_dependencies.js')
const {ban,unban,temp_ban,temp_ban_AutoCkeck}=require('./ban_service')
const {monday_switch,tuesday_switch,wednesday_switch,thursday_switch,friday_switch,saturday_switch}=require('./switch.js')

const ex=require('express');
const db=require('mongoose');
const bc=require('bcrypt');
const bp=require('body-parser');
const nocache = require('nocache');
const session = require('express-session');
const fs = require("fs");
require('dotenv').config()
const app=ex();
const http=require('http');
const socketbuilder=require('socket.io');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Console } = require('console');
const { log } = require('util');
const { release } = require('os');
const { TIMEOUT } = require('dns');
let nm=require('nodemailer')

const server=http.createServer(app);
const io=socketbuilder(server);
//try to be careful when using async in dom (try not to)
//console.log(res);
/*
const cron = require('cron');
const { spawn } = require('child_process');
const path = require('path');

const job = new cron.CronJob({
 cronTime: '00 30 11 * * *', // This means 11:30:00 AM every day. Adjust as needed.
 onTick: function() {
    const child = spawn(process.execPath, [path.join(__dirname, 'yourScript.js')], {
      detached: true,
      stdio: 'ignore'
    });

    child.unref();
    process.exit();
 },
 start: true,
 timeZone: 'America/Los_Angeles' // Adjust as needed.
});
let test;
function restartServer() {
  const spawn = cp.spawn;
  const args = process.argv.slice(1);
  const execPath = args.shift();

  const child = spawn(execPath, args, {
      detached : true,
      stdio: 'ignore'
  });

  child.unref();
  process.exit();
}
setInterval(()=>{restartServer()},1000);*/
let type=['COURS','TD','TP']
let subject=['RESEAU','MATH','POO','GRAPHES','EXPLOITATION','CONCEPTION','FRANCAIS','GESTION','INTERNET','COMPILATION','ANGLAIS']//dont change order
let cadency=["H","QA","QB","Z3","Z4"]
const messagee={msg:"",em:"",un:"",pw:"",cpw:"",prime:false,points:0}
const timestamps={
  s1:{
    begin:"8:30",
    end:"10:00"
  },
  s2:{
    begin:"10:10",
    end:"11:40"
  },
  s3:{
    begin:"11:50",
    end:"13:10"
  },
  s4:{
    begin:"13:50",
    end:"15:20"
  },
  s5:{
    begin:"15:30",
    end:"17:00"
  },
  s6:{
    begin:"17:10",
    end:"18:40"
  },
}

/*
setInterval(()=>{

const options = {
 hostname: 'localhost', // or your server's domain name
 port: 3000, // your server's port
 path: '/your-endpoint',
 method: 'GET',
 headers: {
    'Cookie': 'session=abcd1234', // optional: add a cookie to mimic a client session
    'User-Agent': 'My Custom User Agent' // optional: add a custom User-Agent
 }
};
console.log(http)
const req = http.request(options, (res) => {
 let data = '';

 res.on('data', (chunk) => {
    console.log("hi")
 });


})},5000)*/

let selection=0;
// modeling part
let logModel=new db.model('logModel',logSchema);
let timetablesmodel=new db.model('timetables',timetableschema)
let customttmodel=new db.model("custom timetable",customttschema)
let people=new db.model('users',userSchema)
let cache=new db.model("cache",cacheSchema);
//initial definition part



app.use(bp.json({limit:'5mb'}))
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(nocache());
app.use(function(req, res, next) {
    if (!req.session.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});
app.use((req, res, next) => {
    // Store the current URL in the session
    req.session.lastUrl = req.url;
    next();
});
app.set('views-engine','ejs');
app.use(bp.urlencoded({extended:false}))
app.use(bp.json());
app.use(ex.static('public'));
app.use(ex.static('views/js'));
server.listen(3000,()=>console.log("listening to port 3000"))
//app uses part

db.connect(process.env.LINK,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected"))
.catch(()=>console.log("error connecting"));

//connecting to database
function reinit(m){
    for(let p in m)m[p]="";
}
let tobeback=(today,tobebackdate)=>{
  if(today.year<tobebackdate.year)return false;
  if(today.year>tobebackdate.year)return true;
  if(today.month<tobebackdate.month)return false;
  if(today.month>tobebackdate.month)return true;
  if(today.day<tobebackdate.day)return false;
  if(today.day>tobebackdate.day)return true;
  if(today.hour<tobebackdate.hour)return false;
  if(today.hour>tobebackdate.hour)return true;
  return true;
}



app.get("/",(req,res,done)=>{ if(!req.session.user)res.render("home.ejs",{message:messagee});else{
  if(req.session.user=="admin@admin.admin"){
    res.redirect("/admin_dashboard");

  }
  else{
res.redirect("/dashboard");
    
  }
} 

})


app.get("/home",async(req,res,done)=>{ if(!req.session.user)res.render("home.ejs",{message:messagee});else{
  if(req.session.user=="admin@admin.admin"){
    res.redirect("/admin_dashboard");

  }
  else{
 res.redirect("/dashboard");
    
  }
}})

app.get("/dashboard",async(req,res,done)=>{
  
  if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard')
  else if(req.session.user) {
let user=await people.findOne({email:req.session.user})
.then((data)=>data)
.catch(()=>console.log("error getting user"));
console.log(user.ban)
if(user.ban){res.redirect('/login')
}
else{
  if(user.verification)
    res.render("dashboard.ejs",{message:messagee,user:user});
  else res.redirect('/verification')
}
}




 else res.redirect('/login');messagee.msg='';})



 
app.get("/admin_dashboard",async(req,res,done)=>{if(req.session.user=='admin@admin.admin') res.render("admin_dashboard.ejs",{message:messagee}); else { await req.session.destroy();res.redirect('/login.ejs')}})
app.get("/register",(req,res,done)=>{if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard'); else if(!req.session.user)res.render("register.ejs",{message:messagee});else res.redirect("/dashboard");})
app.get("/login",async(req,res,done)=>{if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard');else if(!req.session.user)res.render("login.ejs",{message:messagee});else{
  user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error"))
  if(user.ban){
    res.render('login.ejs',{message:messagee});
  }
  else if(!user.verified){messagee.msg=''
    res.render('login.ejs',{message:messagee});
    
  }
  else
  res.redirect("dashboard");}})
app.get("/logout",async(req,res,done)=>{ 
  
  if(!req.session.user){
    res.redirect('/login');
  }
  else{if(req.session.user!='admin@admin.admin'){

  
     let data = await people.findOne({email:req.session.user}).then((dt)=>dt).catch(()=>console.log("error searching"))
      await people.findOneAndUpdate({email:req.session.user},{status:data.status-1});}
      req.session.destroy();
     messagee.logout= "successfully logged out"
    res.render("login.ejs",{message:messagee});}})


  app.get('/users_panel',async (req,res)=>{
    if(req.session.user=='admin@admin.admin'){

    let allu= await people.find()
    .then((dt)=> dt)
    .catch(()=>console.log("error searching"))
    res.render('users_panel.ejs',{message:messagee,all_users:allu});
  

    }
    else{
      res.redirect('/login');
    }})



  app.get('/productivity_app',async(req,res)=>{
    if(req.session.user){
      if(req.session.user!="admin@admin.com"){
        let user=await people.findOne({email:req.session.user})
        .then((d)=>d)
        .catch(("error looking for user for productivity app"))
        if(user.verification)
       res.render('productivity_app.ejs',{user:user,progress:user.progress})
      else res.redirect('/dashboard')
      

      }
      else{
        res.redirect('/admin_dashboard')
      }
    }
    else{
      
      res.redirect('/login')
    }
  })





app.get('/timetablesA01G1',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){
  let table=[]
  let tables=await timetablesmodel.findOne({id:"A01G1"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:1,group:1});
    
  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }
})
app.get('/timetablesA01G2',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A01G2"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:1,group:2});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})





app.get('/timetablesA02G1',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A02G1"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:2,group:1});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})
app.get('/timetablesA02G2',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A02G2"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:2,group:2});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})




app.get('/timetablesA03G1',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A03G1"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:3,group:1});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})
app.get('/timetablesA03G2',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A03G2"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:3,group:2});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})






app.get('/timetablesA04G1',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A04G1"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:4,group:1});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})
app.get('/timetablesA04G2',async(req,res)=>{
  if(req.session.user){
  if(req.session.user=="admin@admin.admin"){

  let table=[]
  let tables=await timetablesmodel.findOne({id:"A04G2"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table,classes:4,group:2});

  }
  else{
    res.redirect('/dashboard')
  }

  }
  else{
    res.redirect('/home')
  }})


app.get('/customtimetablemon',async(req,res)=>{
  if(req.session.user){
if(req.session.user!="admin@admin.admin"){
  let user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(user.verification){

  let table=[];
  let tables=await customttmodel.findOne({id:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("cant get custom timetables"))
  if(tables){
    table=await tables.table;
  }
    res.render('customtimetablemon.ejs',{table:table,sndropdown:subject,user:req.session.user})

  }
  else{
    res.redirect('/dashboard')
  }
}
else res.redirect('/admin_dashboard')
  }
else{
  res.redirect('/home')
}
})
app.get('/customtimetabletues',async(req,res)=>{
  if(req.session.user){
if(req.session.user!="admin@admin.admin"){
  let user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(user.verification){

  let table=[];
  let tables=await customttmodel.findOne({id:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("cant get custom timetables"))
  if(tables){
    table=await tables.table;
  }
    res.render('customtimetabletues.ejs',{table:table,sndropdown:subject,user:req.session.user})

  }
  else{
    res.redirect('/dashboard')
  }
}
else res.redirect('/admin_dashboard')
  }
else{
  res.redirect('/home')
}
})
app.get('/customtimetablewed',async(req,res)=>{
  if(req.session.user){
if(req.session.user!="admin@admin.admin"){
  let user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(user.verification){

  let table=[];
  let tables=await customttmodel.findOne({id:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("cant get custom timetables"))
  if(tables){
    table=await tables.table;
  }
    res.render('customtimetablewed.ejs',{table:table,sndropdown:subject,user:req.session.user})

  }
  else{
    res.redirect('/dashboard')
  }
}
else res.redirect('/admin_dashboard')
  }
else{
  res.redirect('/home')
}
})
app.get('/customtimetablethu',async(req,res)=>{
  if(req.session.user){
if(req.session.user!="admin@admin.admin"){
  let user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(user.verification){

  let table=[];
  let tables=await customttmodel.findOne({id:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("cant get custom timetables"))
  if(tables){
    table=await tables.table;
  }
    res.render('customtimetablethu.ejs',{table:table,sndropdown:subject,user:req.session.user})

  }
  else{
    res.redirect('/dashboard')
  }
}
else res.redirect('/admin_dashboard')
  }
else{
  res.redirect('/home')
}
})
app.get('/customtimetablefri',async(req,res)=>{
  if(req.session.user){
if(req.session.user!="admin@admin.admin"){
  let user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(user.verification){

  let table=[];
  let tables=await customttmodel.findOne({id:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("cant get custom timetables"))
  if(tables){
    table=await tables.table;
  }
    res.render('customtimetablefri.ejs',{table:table,sndropdown:subject,user:req.session.user})

  }
  else{
    res.redirect('/dashboard')
  }
}
else res.redirect('/admin_dashboard')
  }
else{
  res.redirect('/home')
}
})
app.get('/customtimetablesat',async(req,res)=>{
  if(req.session.user){
if(req.session.user!="admin@admin.admin"){
  let user=await people.findOne({email:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(user.verification){

  let table=[];
  let tables=await customttmodel.findOne({id:req.session.user})
  .then((d)=>d)
  .catch(()=>console.log("cant get custom timetables"))
  if(tables){
    table=await tables.table;
  }
    res.render('customtimetablesat.ejs',{table:table,sndropdown:subject,user:req.session.user})

  }
  else{
    res.redirect('/dashboard')
  }
}
else res.redirect('/admin_dashboard')
  }
else{
  res.redirect('/home')
}
})










  app.get('/users_list.ejs',async (req,res)=>{if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard')
    else if(req.session.user){
    let em= await req.session.user;
    console.log(em);
    let user=await people.findOne({email:em})
    .then((dt)=>{return dt})
    .catch(()=>console.log("error in search"));

    let allu= await people.find()
    .then((dt)=> dt)
    .catch(()=>console.log("error searching"))
    messagee.email=await em;
    res.render('users_list.ejs',{message:messagee,all_users:allu,user:user});
  

    }
    else{
      res.redirect('/login');
    }})



    
app.get('/verification',async(req,res)=>{

  if(req.session.user&&req.session.user!='admin@admin.admin'){
    let user =await people.findOne({email:req.session.user})
    .then((d)=>d)
    .catch((e)=>console.log("error verifying"))
    if(user.verification){
      res.redirect('/dashboard')
    }
    else{
      //console.log(user)
      res.render('verification.ejs',{email:req.session.user,time:user.verification_delay})
    }

  }
  else if(req.session.user=='admin@admin.admin'){
    res.redirect('/admin_dashboard')

  }
  else{
    res.redirect('/home')
  }
})
app.get('/verified/:linker',async(req,res)=>{  
  console.log("hi")
  
let linker=req.params.linker

linker.replace(/slash/g, "/");
  if(req.session.user&& req.session.user!='admin@admin.admin'){
          
let cmp=bc.compare(linker,req.session.user)
if(cmp){
  await people.findOneAndUpdate({email:req.session.user},{verification:true})
  .then((d)=>d)
  .catch((e)=>console.log("error linking to verification"))
  
  res.redirect('/dashboard')

}
else{
res.redirect('/home')
}
  }

})




//operational part









//sockets
sockets(io,people,timetablesmodel,customttmodel,bc,process.env.PASS,nm);
//******************** */

//scheduling
save_schedule(app,timetablesmodel,errorChecker);
double_save(app,timetablesmodel,errorChecker);
//*********************/

//bans
ban(app,people)
temp_ban_AutoCkeck(app,people);
temp_ban(app,people,messagee);
unban(app,people);
//******************** */

//login/register
register(app,people,messagee,reinit,bc);
login(app,people,messagee,reinit,bc);
//******************** */

custom_save_mon(app,customttmodel,errorChecker);
schedule_builder_mon(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people,cache);
custom_save_tues(app,customttmodel,errorChecker);
schedule_builder_tues(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people);
custom_save_wed(app,customttmodel,errorChecker);
schedule_builder_wed(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people);
custom_save_thu(app,customttmodel,errorChecker);
schedule_builder_thu(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people);
custom_save_fri(app,customttmodel,errorChecker);
schedule_builder_fri(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people);
custom_save_sat(app,customttmodel,errorChecker);
schedule_builder_sat(app,customttmodel,timetablesmodel,subject,type,cadency,timestamps,people);

/****************************************************************************************************************************************************************************** */
monday_switch(app,timetablesmodel)
tuesday_switch(app,timetablesmodel)
wednesday_switch(app,timetablesmodel)
thursday_switch(app,timetablesmodel)
friday_switch(app,timetablesmodel)
saturday_switch(app,timetablesmodel)

/*
  cache.findOneAndRemove({id:'monday'})
.then((d)=>console.log("erased"))
.catch(()=>console.log("error caching"))
*/

app.get('/forgot',(req,res)=>{
  if(!req.session.user){
  res.render('forgot.ejs')

  }
  else{
    res.redirect('/dashboard')
  }
})

app.get('/forget/:linker',async(req,res)=>{
  if( !req.session.user){
  let now= parseInt(((new Date()).getTime())/1000);//get current time as soon
  let link=req.params.linker
  let thelink=  (link.replace(/slash/g,"/"));//link reset
  thelink=await thelink.slice(0,(thelink.indexOf("mailed")))//clear mail

  let sender= await link.slice(link.indexOf("mailed")+6)//get sender
  //check link expiration
  let user=await people.findOne({email:sender})
  .then((d)=>d)
  .catch(()=>console.log("error getting user"))
  if(!user||user.linker!=thelink){
    messagee.msg="Error Occured"
    res.redirect('/login')
  }
  else{
  if(user.password_delay<now){
    //too late
    messagee.msg="Link Has Expired"
    res.redirect('login.ejs')
  }
  else{
    //safe gate IMPORTANT 
    await people.findOneAndUpdate({email:sender},{safe_gate:true})
    .then((d)=>d)
    .catch(()=>console.log("error enabling safe gate"))    
    //get you to pass reset page
        res.render('reset.ejs',{email:sender});
  }

  }

  }
  else{
    res.redirect('/dashboard')
  }
})

app.post('/reset',async(req,res)=>{
  let id=req.body.id
  let p=req.body.password
  let cp=req.body["second password"]
  reset_user =await people.findOne({email:id})
  .then((d)=>d)
  .catch(()=>console.log("error getting reset user")) 
  if(!req.session.user&& reset_user  && p && p.length>5 && p===cp){
     if(reset_user.safe_gate){
      //safe to reset
      let encrypted=await bc.hash(p,10)
      .then((d)=>d)
      .catch(()=>console.log("error encrypting"))

      await people.findOneAndUpdate({email:reset_user.email},{password:encrypted,safe_gate:false,password_delay:0})
      .then((d)=>d)
      .catch(()=>console.log("error restting password"))
      messagee.msg='password reset successfully';
      res.redirect('/login')
     }
     else{messagee.msg='Invalid Request';
      res.redirect('/login')
     }

  }
  else{messagee.msg='Error Occured During Reset';
  res.redirect('/login')

  }
})

//test*******************************************************************************************************************************************************************

/*
let html="<h1>hello</h1>"
let nm=require('nodemailer')
let t=nm.createTransport({
  service:'gmail',
  port:3000,
  secure:true,
  auth:{
    user:'anasrabhi246@gmail.com ',
     pass:'ldny xfsq guwc pyjt'

  },
  tls:{
    rejectUnauthorized:false
  }

})
let mo={from:'<anasrabhi246@gmail.com>',
to:'xabev41d063@gmail.com',
subject:'foff',
html:html


}
t.sendMail(mo,(e,data)=>{
  if(e){
    console.log("fuck")
  }
  else{
    console.log("ggwp")
  }
})

*/

 