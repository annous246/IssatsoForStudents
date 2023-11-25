

const {dictionnary,forbid,clearup} =require('./filter.js')
const ex=require('express');
const db=require('mongoose');
const bc=require('bcrypt');
const bp=require('body-parser');
const nocache = require('nocache');
const session = require('express-session');
const multer=require('multer');
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
const e = require('express');
const { TIMEOUT } = require('dns');
const server=http.createServer(app);
const io=socketbuilder(server);

//try to be careful when using async in dom (try not to)
//console.log(res);
let test;
const messagee={msg:"",em:"",un:"",pw:"",cpw:"",prime:false,points:0}
let selection=0;
const upload = multer({
    dest: "profiles"
  });
const tests={
  'C++':[{link:'c++/q1.png',answer:3},{link:'c++/q2.png',answer:2},{link:'c++/q3.png',answer:2},{link:'c++/q4.png',answer:3},{link:'c++/q5.png',answer:1}],
  
}
const answers={
  'C++':[['for','while','do while'],['1','6','5'],['variable','operator','label'],['2 4 5','2 8 10','4 8 10'],['switch','jump','size']]
}
let waiting_room=[];
  
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
server.listen(3000,()=>console.log("listening to port 3000"))
//app uses part

db.connect(process.env.LINK,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected"))
.catch(()=>console.log("error connecting"));

//connecting to database
function reinit(m){
    for(let p in m)m[p]="";
}
let all_posts;
let post_schema=new db.Schema({
  id:{
  type:String,
  required:true,
  default:''
  },
  username:{
    required:true,
    type:String
  },
  post:{
    required:true,
    type:String
  },
  date:{
    required:true,
    type:String
  },
  prime:{
    required:true,
    type:Boolean
  },
  vote:{
    required:true,
    default:0,
    type:Number
  },
  upvoters:{
  type:[String],
  default:[]
},
downvoters:{
type:[String],
default:[]
},
})
let generalChatSchema=new db.Schema({
  senderId:{
    type:String,
    required:true,
    default:''

  },
  message:{
    type:String,
    required:true,
    default:''

  },
  senderName:{
    type:String,
    required:true,
    default:''

  }

  
})
let generalChatModel=new db.model('generalChat',generalChatSchema);


let logSchema=new db.Schema({
  username:{
  type:String,
  required:true,
  default:''

  },
  status:{
  type:String,
  required:true,
  default:''

  },
  email:{
  type:String,
  required:true,
  default:''

  },
})






let gameRoomSchema=new db.Schema({
  id:{
    type:String,
    rquired:true,
    default:'',
  },
  player1:{
    type:String,
    rquired:true,
    default:'',

  },
  player2:{
    type:String,
    rquired:true,
    default:'',

  },
  score:{
    type:Number,
    rquired:true,
    default:50,

  },
  clicks:{
    type:Object,
    rquired:true,
    default:{
      'p1':{
      type:Number,
      required:true,
      default:0
    },'p2':{
      type:Number,
      required:true,
      default:0
    }
  },

  },
  start_status:{
    type:Boolean,
    required:true,
    default:false
  },
  ending_date:{
    type: Number,
    required:true,
    default:0
  }

})
let gameRoomModel=new db.model('gameRoom',gameRoomSchema);






let logModel=new db.model('logModel',logSchema);
let testbackcheck=(today,due)=>{
if(today.getFullYear()>due.year)return true;
}

let post_model=new db.model('posts',post_schema);



let seanceschema=new db.Schema({
  seanceName:{
    type:String,
    default:'',
    required:true
  },
  class:{
    type:String,
    default:'',
    required:true
  },
  type:{
    type:String,
    default:'',
    required:true
  },
  period:{
    type:String,
    default:'',
    required:true
  },
  prof:{
    type:String,
    default:'',
    required:true
  },
  state:{
    type:Boolean,
    default:true,
    required:true
  }
})



let timetableschema=new db.Schema({
  id:{
    type:String,
    required:true,
    default:''
  },
  group:{
    type:Number,
    required:true,
    default:1
  },
  table:{
    type:Object,
    required:true,
    default:{
      monday:{
        type:[seanceschema],
        default:[],
      },
      tuesday:{
        type:[seanceschema],
        default:[],
      },
      wednesday:{
        type:[seanceschema],
        default:[],
      },
      thirsday:{
        type:[seanceschema],
        default:[],
      },
      friday:{
        type:[seanceschema],
        default:[],
      },
      saturday:{
        type:[seanceschema],
        default:[],
      },
      sunday:{
        type:[seanceschema],
        default:[],
      },
    }
  }
})
let timetablesmodel=new db.model('timetables',timetableschema)










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



app.get("/",(req,res,done)=>{ if(!req.session.user)res.render("home.ejs",{message:messagee});else res.redirect("/dashboard.ejs");})
app.get("/home.ejs",(req,res,done)=>{ if(!req.session.user)res.render("home.ejs",{message:messagee});else res.redirect("/dashboard.ejs");})
app.get("/dashboard.ejs",async(req,res,done)=>{
  
  if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard.ejs')
  else if(req.session.user) {
let user=await people.findOne({email:req.session.user})
.then((data)=>data)
.catch(()=>console.log("error getting user"));
let gcm=await generalChatModel.find()
.then((data)=>data.length)
.catch(()=>console.log("error getting message count"))
let badges=await user.badges;
  console.log(user.pendingsList)
  console.log(user.friendsList+"friendsffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    let date=new Date();
    let day=date.getDate();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let hour=date.getHours();
    let today={day:day,year:year,month:month,hour:hour};
    let resetedbadges='';console.log(badges["C++"]);
for(let k in badges){
;  if(badges[k]['status']==-1){
    if(tobeback(today,badges[k].releaseDate)){
      badges[k]={status:0,date:{year:'',month:'',day:'',hour:'',minute:'',second:''},questions:[],
      releaseDate:{year:'',month:'',day:'',hour:'',}
      
    }
    resetedbadges+=k+' ';}

  }
    }
    await people.findOneAndUpdate({email:req.session.user},{badges:badges})
    .then((data)=>{console.log("up to date badges");return data})
    .catch(()=>console.log("error Autoupdating badges data"));
    if( resetedbadges!='')messagee.msg='Badges '+resetedbadges+' are Back!';
    console.log("all tests");
    friendslist=[]
    pendingslist=[]
    blockslist=[]
    declineslist=[]
    for(let k in user.friendsList){
      let friend=await people.findOne({email:k})
      .then((data)=>data.username)
      .catch(()=>console.log("error pulling friend"))
      friendslist.push({name:friend,email:k});

    }
    for(let k in user.blocksList){
      let blocked=await people.findOne({email:k})
      .then((data)=>data.username)
      .catch(()=>console.log("error pulling blocked"))
      blockslist.push({name:blocked,email:k});

    }
    for(let k in user.pendingsList){
      let pending=await people.findOne({email:k})
      .then((data)=>data.username)
      .catch(()=>console.log("error pulling pending"))
      pendingslist.push({name:pending,email:k});

    }
    for(let k in user.declinesList){
      let decline=await people.findOne({email:k})
      .then((data)=>data.username)
      .catch(()=>console.log("error pulling pending"))
      declineslist.push({name:decline,email:k});

    }
    res.render("dashboard.ejs",{message:messagee,user:user,allbadges:tests,um:user.um,gcm:gcm,friendslist:friendslist,blockslist:blockslist,declineslist:declineslist,pendingslist:pendingslist});
  
}




 else res.redirect('/login.ejs');messagee.msg='';})



 
app.get("/admin_dashboard.ejs",async(req,res,done)=>{if(req.session.user=='admin@admin.admin') res.render("admin_dashboard.ejs",{message:messagee}); else { await req.session.destroy();res.redirect('/login.ejs')}})
app.get("/register.ejs",(req,res,done)=>{if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard.ejs'); else if(!req.session.user)res.render("register.ejs",{message:messagee});else res.redirect("/dashboard.ejs");})
app.get("/login.ejs",(req,res,done)=>{if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard.ejs');else if(!req.session.user)res.render("login.ejs",{message:messagee});else res.redirect("/dashboard.ejs");})
app.get("/logout.ejs",async(req,res,done)=>{ 
  
  if(!req.session.user){
    res.redirect('/login.ejs');
  }
  else{if(req.session.user!='admin@admin.admin'){

  
     let data = await people.findOne({email:req.session.user}).then((dt)=>dt).catch(()=>console.log("error searching"))
      await people.findOneAndUpdate({email:req.session.user},{status:data.status-1});}
      req.session.destroy();
     messagee.logout= "successfully logged out"
    res.render("logout.ejs",{message:messagee});}})
app.get("/converter.ejs",(req,res,done)=>{
  if(req.session.user&&messagee.prime) res.render("converter.ejs",{message:messagee}); else res.redirect('/login.ejs')
})

app.get('/offline',async(req,res)=>{
  if(req.session.user){
    let data=await people.findOne({email:req.session.user}).then((dt)=>dt);
    await people.findOneAndUpdate({email:req.session.user},{status:data.status-1});
  }
})
app.get('/posting.ejs',async(req,res)=>{
  if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard.ejs');

  else if(req.session.user){
    all_posts=await post_model.find()
    .then((dt)=>dt)
    .catch(()=>console.log("error data not pulled"))
    
    if(selection==0) await all_posts.reverse();
    else if(selection==1){
     all_posts.sort((a,b)=>{if(a.vote<b.vote)return 1;if(a.vote>b.vote)return-1; return 0;});
    }
  res.render('posting.ejs',{allposts:all_posts,email:req.session.user,option:selection});
  }
  else 
  res.redirect('/login.ejs');
})
  app.get('/users_panel.ejs',async (req,res)=>{
    if(req.session.user=='admin@admin.admin'){

    let allu= await people.find()
    .then((dt)=> dt)
    .catch(()=>console.log("error searching"))
    res.render('users_panel.ejs',{message:messagee,all_users:allu});
  

    }
    else{
      res.redirect('/login.ejs');
    }})



  app.get('/productivity_app.ejs',async(req,res)=>{
    if(req.session.user){
      if(req.session.user!="admin@admin.com"){
        let user=await people.findOne({email:req.session.user})
        .then((d)=>d)
        .catch(("error looking for user for productivity app"))
        if(user.prime){res.render('productivity_app.ejs',{user:user,progress:user.progress})}
        else{
          res.redirect('/dashboard.ejs');
        }
        

      }
      else{
        res.redirect('/admin_dashboard.ejs')
      }
    }
    else{
      
      res.redirect('/login.ejs')
    }
  })

app.get('/general_chat.ejs',async(req,res)=>{
  if(!req.session.user){
    res.redirect('/login.ejs');
  }
  else{
    if(req.session.user=="admin@admin.admin"){
      res.redirect('/admin_dashboard.ejs');

    }
    else{
      let user =await people.findOne({email:req.session.user})
      let gcm=await generalChatModel.find()
      .then((data)=>data.length)
      .catch(()=>console.log("error getting GC message count"))

      await people.findOneAndUpdate({email:req.session.user},{um:gcm})
      .then((data)=>data)
      .catch(()=>console.log("error updating message count"))


      .then((data)=>{console.log("user found for general chat");return data})
      .catch(()=>console.log("error finding user for general chat"))
       
      all_messages=[];
       all_messages=await generalChatModel.find()
      .then((data)=>{console.log("all general chat message are pulled");return data;})
      .catch(()=>console.log("error pulling general chat  messages"))
     
      
     
       let all_logs=await logModel.find()
      .then((data)=>{console.log("all general chat Logs are pulled");return data;})
      .catch(()=>console.log("error pulling general Chat Logs  "))
     
      
      
       res.render('general_chat.ejs',{user:user,all:all_messages,logs:all_logs,numberOfMessages:all_messages.length});
    }
  }
})





app.get('/watch_together.ejs',async(req,res)=>{
  if(req.session.user&&req.session.user!='admin@admin.admin'){
    let us=await people.findOne({email:req.session.user})
    .then((data)=>{console.log("user fetched for watch together");return data;})
    .catch(()=>{console.log("error fetching user for watch together");})
    if(us.prime){
  res.render('watch_together.ejs',{user:us.username});
  

    }
    else{
      res.redirect('/dashboard.ejs');
    }
  
  }
  else{
    if(req.session.user=="admin@admin.admin"){
      res.redirect('/admin_dashboard.ejs');

    }
    else{
      
    res.redirect('/login.ejs');
    }
  }
})

let find=(test,testlist)=>{
  for(let k in testlist){
 if(k==test)return true;
  }return false;
}
function getDaysInMonth(year, month) {
  return new Date(year, month , 0).getDate();
}
function count(number, array) {
  for(let k in array)if(array[k]==number)return true;
  return false;
}
function timeleft(today, due) {
  let seconds=0;
  today.day=JSON.stringify(today.day);
  today.month=JSON.stringify(today.month);
  today.year=JSON.stringify(today.year);
  today.hour=JSON.stringify(today.hour);
  today.second=JSON.stringify(today.second);
  today.minute=JSON.stringify(today.minute);

  if(today.day.length<2){
    today.day='0'+today.day;
  }
  if(today.month.length<2){
    today.month='0'+today.month;
  }
  if(today.second.length<2){
    today.second='0'+today.second;
  }
  if(today.minute.length<2){
    today.minute='0'+today.minute;
  }
  if(today.hour.length<2){
    today.hour='0'+today.hour;
  }
  
  due.day=JSON.stringify(due.day);
  due.month=JSON.stringify(due.month);
  due.year=JSON.stringify(due.year);
  due.hour=JSON.stringify(due.hour);
  due.second=JSON.stringify(due.second);
  due.minute=JSON.stringify(due.minute);

  
  if(due.day.length<2){
    due.day='0'+due.day;
  }
  if(due.month.length<2){
    due.month='0'+due.month;
  }
  if(due.second.length<2){
    due.second='0'+due.second;
  }
  if(due.minute.length<2){
    due.minute='0'+due.minute;
  }
  if(due.hour.length<2){
    due.hour='0'+due.hour;
  }
  let tddate=new Date(today.year+'-'+today.month+'-'+today.day+'T'+today.hour+':'+today.minute+':'+today.second);
  
  let duedate=new Date(due.year+'-'+due.month+'-'+due.day+'T'+due.hour+':'+due.minute+':'+due.second);
  
  let difference = (duedate.getTime()-tddate.getTime())/1000;
  return difference
  
}
function parseDate(date){
  let parsed={day:'',month:'',year:'',hour:'',second:'',minute:''}
  parsed.day=JSON.stringify(date.getDate());
  parsed.month=JSON.stringify(date.getMonth()+1);
  parsed.year=JSON.stringify(date.getFullYear());
  parsed.hour=JSON.stringify(date.getHours());
  parsed.second=JSON.stringify(date.getSeconds());
  parsed.minute=JSON.stringify(date.getMinutes());
  return parsed;
}
function dateChecker(date){
  
  if(date.day.length<2){
    date.day='0'+date.day;
  }
  if(date.month.length<2){
    date.month='0'+date.month;
  }
  if(date.second.length<2){
    date.second='0'+date.second;
  }
  if(date.minute.length<2){
    date.minute='0'+date.minute;
  }
  if(date.hour.length<2){
    date.hour='0'+date.hour;
  }
  return date;

}
function toCountedDate(date){
  date =dateChecker(date);
  date=new Date(date.year+'-'+date.month+'-'+date.day+'T'+date.hour+':'+date.minute+':'+date.second);
  return date;
}
app.get('/testin.ejs',async(req,res)=>{
  res.render('testing.ejs',{timeleft:15});
})

app.get('/testing.ejs',async(req,res)=>{
if(req.session.user&&req.session.user!='admin@admin.admin'){
  //check test availability on platform
  console.log("done");
  if(find(test,tests)){
let user=await people.findOne({email:req.session.user})
.then((data)=>data)
.catch(()=>console.log("error finding user data for tests"))
let badges=await user.badges;
//check test existance for user(first time or not)
let  testbadge=null;
for(let k in badges){
  if(k==test){
    testbadge=badges[k];break;
  }
}
if(!testbadge){
  //now date and random quests
  let quests=[]
  while(quests.length<3){
    let rand=parseInt(Math.random()*10)%6;
    let randomnumber=rand+(rand==0);
    if(!count(randomnumber,quests))quests.push(randomnumber);
  }
  let date=new Date();
  let day=date.getDate();
  let year=date.getFullYear();
  let month=date.getMonth()+1;
  let second=date.getSeconds();
  let minute=date.getMinutes();
  let hour=date.getHours();
  let alldays=getDaysInMonth(year,month);
  //add 3 mins and 5 seconds
  second+=5;
  minute+=3;
  minute+=parseInt(second/60);
  second=parseInt(second%60);

  hour+=parseInt(minute/60);
  minute=parseInt(minute%60);

  day+=parseInt(hour/24);
  hour=parseInt(hour%24);

  month+=parseInt(day/(alldays+1));
  day=parseInt((day-1)%(alldays)+1);

  year+=parseInt(month/13);
  month=parseInt((month-1)%12+1);
  


  let tester={status:1,date:{day:day,month:month,year:year,second:second,minute:minute,hour:hour},releaseDate:{hour:'',day:'',month:'',year:''},questions:[quests[0],quests[1],quests[2]]};
  badges[test]=tester
  await people.findOneAndUpdate({email:req.session.user},{badges:badges})
  .then((data)=>{console.log('test data updated');return data})
  .catch(()=>{console.log("error updating test data")});
let today= await new Date();
let due=await toCountedDate(badges[test].date)

  tl=due.getTime()-today.getTime();
  res.render('testing.ejs',{user:user,timeleft:tl,testname:test,answers:answers,quests:quests});
  




}
else{
  let date=new Date();
  let day=date.getDate();
  let year=date.getFullYear();
  let month=date.getMonth()+1;
  let second=date.getSeconds();
  let minute=date.getMinutes();
  let hour=date.getHours();
  let alldays=getDaysInMonth(year,month);
  let specifictest=badges[test];
  if(specifictest.status==2){
    res.redirect('/dashboard.ejs');
  }
  else if(specifictest.status==1){
    //check if user still have time
    let today={day:day,month:month,year:year,minute:minute,second:second,hour:hour}
      let tl=timeleft(today,specifictest.date);
 console.log(badges);
    if(tl>0){

      res.render('testing.ejs',{user:user,timeleft:tl,testname:test,answers:answers,quests:badges[test].questions});
    }
    else{
      messagee.msg="sorry Time is Up, Good luck next time !";
      
  let date=new Date();
  let day=date.getDate();
  let year=date.getFullYear();
  let month=date.getMonth()+1;
  let second=date.getSeconds();
  let minute=date.getMinutes();
  let hour=date.getHours();
  let alldays=getDaysInMonth(year,month);
  //one day delai
  day+=1;
  day+=parseInt(hour/24);
  hour=parseInt(hour%24);

  month+=parseInt(day/(alldays+1));
  day=parseInt((day-1)%(alldays)+1);

  year+=parseInt(month/13);
  month=parseInt((month-1)%12+1);
  


      let tester={status:-1,date:{day:'',month:'',year:'',hour:'',second:'',mintue:''},releaseDate:{day:day,month:month,year:year},questions:[]}
      badges[test]=tester;
      await people.findOneAndUpdate({email:req.session.user},{badges:badges})
      .then((data)=>{console.log("user test date updated");return data})
      .catch(()=>console.log("error updating user test data"))

      res.redirect("/dashboard.ejs");


    }

    
  }
  else if(!specifictest.status){
    let quests=[]
    while(quests.length<3){
      let rand=parseInt(Math.random()*10)%6;
      let randomnumber=rand+(rand==0);
      if(!count(randomnumber,quests))quests.push(randomnumber);
    }
    
    let date=new Date();
    let day=date.getDate();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let second=date.getSeconds();
    let minute=date.getMinutes();
    let hour=date.getHours();
    let alldays=getDaysInMonth(year,month);
    //add 3 minand 5 seconds
    second+=5;
    minute+=3;
    minute+=parseInt(second/60);
    second=parseInt(second%60);
  
    hour+=parseInt(minute/60);
    minute=parseInt(minute%60);
  
    day+=parseInt(hour/24);
    hour=parseInt(hour%24);
  
    month+=parseInt(day/(alldays+1));
    day=parseInt((day-1)%(alldays)+1);
  
    year+=parseInt(month/13);
    month=parseInt((month-1)%12+1);
    //************************* 
  let tester={status:1,date:{day:day,month:month,year:year,second:second,minute:minute,hour:hour},releaseDate:{hour:'',day:'',month:'',year:''},questions:[quests[0],quests[1],quests[2],]};
  badges[test]=tester
    await people.findOneAndUpdate({email:req.session.user},{badges:badges})
    .then((data)=>{console.log('test data updated');return data})
    .catch(()=>{console.log("error updating test data")});
    tl=183;
    res.render('testing.ejs',{user:user,timeleft:tl,testname:test,answers:answers,quests:badges[test].questions});


  }
  else{
    res.redirect('/dashboard.ejs');

  }
}

  }
  else{console.log("test not found")
    res.redirect('/dashboard.ejs');
  }

}
else{
  if(!req.session.user){
    res.redirect('/login.ejs')
  }
  else{
    res.redirect('/admin_dashboard.ejs')

  }
}
})


app.get('/room.ejs',async(req,res)=>{
  if(req.session.user&&req.session.user!="admin@admin.admin"){
    
  let user =await people.findOne({email:req.session.user})
  let email=await user.email;
  //room search
let rooms=await gameRoomModel.find()
.then((data)=>{console.log("pulling all rooms");return data})
.catch(()=>console.log("error pulling rooms"))
let the_room=null;
let player1id='',player2id='';
console.log(user.email)
for(let r in rooms){
  let room=rooms[r];
  player2id=room.player2;
  player1id=room.player1;
  if(player2id==user.email||player1id==user.email){
    
    the_room= room;
    break;
  }
  

}//*******************/
  if(user.play_status==2&&the_room){
    console.log("pulled room  "+the_room)
    if(the_room.start_status==false){
    let time= (new Date()).getTime();
    time=parseInt(time/1000);
    time+=70;
    await gameRoomModel.findOneAndUpdate({id:the_room.id},{start_status:true,ending_date:time})
    .then((data)=>{console.log("game start");return data})
    .catch(()=>console.log("error starting game"))
 
    let user2=await people.findOne({email:the_room.player1})
    .then((data)=>{console.log("player 2 entered");return data})
    .catch(()=>console.log("error finding player in room"))
    
       the_room=await gameRoomModel.findOne({id:the_room.id})
      .then((data)=>data)
      .catch(()=>"error getting new room");
      console.log(the_room);
       the_room.start_status=false;
      



    res.render('room.ejs',{room:the_room,player1:user2,roomid:the_room.id,player2:user,score:the_room.score,status:the_room.start_status,end:the_room.ending_date,player1email:user2.email,player2email:user.email,player1username:user2.username,player2username:user.username})
  

    }
    else{
      let time=await the_room.ending_date-(parseInt(new Date().getTime()/1000));
      console.log(time);
      if(time>0){
      if(player1id==user.email){
        let user2=await people.findOne({email:the_room.player2})
        .then((data)=>{console.log("player 1 rentered");return data})
        .catch(()=>console.log("error finding player in room"))
    

        res.render('room.ejs',{room:the_room,roomid:the_room.id,player1:user,player2:user2,score:the_room.score,status:the_room.start_status,end:the_room.ending_date,player1email:user.email,player2email:user2.email,player1username:user.username,player2username:user2.username})

      }
      else{
        let user2=await people.findOne({email:the_room.player1})
        .then((data)=>{console.log("player 2 rentered");return data})
        .catch(()=>console.log("error finding player in room"))

        res.render('room.ejs',{room:the_room,roomid:the_room.id,player1:user2,player2:user,score:the_room.score,status:the_room.start_status,end:the_room.ending_date,player1email:user2.email,player2email:user.email,player1username:user2.username,player2username:user.username})

      }

      }
      else{//if no time left
        //updated players and reset all


        
        
        let room=null;
        room=await gameRoomModel.findOne({player1:user.email})
        .then((data)=>{console.log("room Destroyed");return data})
        .catch(()=>console.log("error Destroying room"))

        if(!room){
        await gameRoomModel.findOne({player2:user.email})
        .then((data)=>{console.log("room Destroyed");return data})
        .catch(()=>console.log("error Destroying room"))

        }
        let p1=await people.findOne({email:room.player1})
        .then((data)=>data)
        .catch(()=>console.log("error getting user"))
        let p2=await people.findOne({email:room.player2})
        .then((data)=>data)
        .catch(()=>console.log("error getting user"))
         let p1h=p1.history
         let p2h=p2.history
         if(room.score>50){
           p1h.push({status:1,score:room.score,opponent:p2.username,date:new Date(room.ending_date*1000)})
           p2h.push({status:-1,score:100-room.score,opponent:p1.username,date:new Date(room.ending_date*1000)})
           await people.findOneAndUpdate({email:p1.email},{points:p1.points+10,play_status:0,history:p1h})
           .then(()=>console.log("player 1 won 10 points"))
           .catch(()=>console.log("error updating points"))
           await people.findOneAndUpdate({email:p2.email},{points:p2.points-10,play_status:0,history:p2h})
           .then(()=>{console.log("player 2 lost 10 points");socket.broadcast.emit("players safe");socket.emit("players safe")})
           .catch(()=>console.log("error updating points"))
   
         }
         else if(room.score<50){
           p1h.push({status:-1,score:room.score,opponent:p2.username,date:new Date(room.ending_date*1000)})
           p2h.push({status:1,score:100-room.score,opponent:p1.username,date:new Date(room.ending_date*1000)})
           
           await people.findOneAndUpdate({email:p1.email},{points:p1.points-10,play_status:0,history:p1h})
           .then(()=>console.log("player 1 lost 10 points"))
           .catch(()=>console.log("error updating points"))
           await people.findOneAndUpdate({email:p2.email},{points:p2.points+10,play_status:0,history:p2h})
           .then(()=>{console.log("player 2 won 10 points");socket.broadcast.emit("players safe");socket.emit("players safe")})
           .catch(()=>console.log("error updating points"))
   
         }
         else{
           p1h.push({status:0,score:50,opponent:p2.username,date:new Date(room.ending_date*1000)})
           p2h.push({status:0,score:50,opponent:p1.username,date:new Date(room.ending_date*1000)})
           
           await people.findOneAndUpdate({email:p1.email},{play_status:0,history:p1h})
           .then(()=>console.log("player 1 same points"))
           .catch(()=>console.log("error updating points"))
           await people.findOneAndUpdate({email:p2.email},{play_status:0,history:p2h})
           .then(()=>{console.log("player 2 same points");socket.broadcast.emit("players safe");socket.emit("players safe")})
           .catch(()=>console.log("error updating points"))
   
         }
        //destroy room
        await gameRoomModel.findOneAndRemove({id:room.id})
        .then((data)=>{console.log("room Destroyed");return data})
        .catch(()=>console.log("error Destroying room"))

        

        await people.findOneAndUpdate({email:room.p1},{play_status:0})
        .then((d)=>{console.log("player 1 is reseted");return  d})
        .catch(()=>console.log("error updating player status"))

        await people.findOneAndUpdate({email:room.p2},{play_status:0})
        .then((d)=>{console.log("player 2 is reseted");return  d})
        .catch(()=>console.log("error updating player status"))

        res.redirect('/dashboard.ejs');
      }
      
    }

  
   
  }
  else if(user.play_status==0||!the_room){

    
    await people.findOneAndUpdate({email:req.session.user},{play_status:0})
    .then((d)=>{console.log("player is not waiting now");return  d})
    .catch(()=>console.log("error updating player status"))
res.redirect('/dashboard.ejs');
}
else{
  let room=await gameRoomModel.findOne({player1:user.email})
  .then((data)=>{console.log("rendered room  "+ data);return data})
  .catch(()=>console.log("error finding player 1 room"))
  res.render('room.ejs',{room:room,player1:user,player2:'',roomid:room.id,score:room.score,status:room.start_status,end:room.ending_date,player1email:user.email,player2email:''.email,player1username:user.username,player2username:''})

}
}



  
  else{
    if(!req.session.user)res.redirect('/login.ejs');
    else res.redirect('/admin_dashboard.ejs')
  }
})

app.get('/history.ejs',async(req,res)=>{
  
  if(!req.session.user)res.redirect('/login.ejs');
  else{
    if(req.session.user=="admin@admin.admin"){
      res.redirect('/admin_dashboard.ejs');
    }
    else{let user =await people.findOne({email:req.session.user})
    .then((data)=>data)
    .catch(()=>console.log("error finding user"));

      res.render('history.ejs',{user:user});
    }
  }
})



app.get("/class.ejs",async(req,res,done)=>{
  if(req.session.user&&req.session.user!='admin@admin.admin'){
    let user =await people.findOne({email:req.session.user})
    .then((data)=>data)
    .catch(()=>console.log("error finding user"));
    if(user.classroomstate){
           res.redirect("/dashboard.ejs");
          await people.findOneAndUpdate({email:user.email},{classroomstate:false})

    }
    else{
      //get badges;
      let userbadges=user.badges;
      let badges=[];
      for(let k in userbadges){
        if(k!='')badges.push(k);
      }console.log("mybadges"+badges);

       
      res.render('classroom_builder.ejs',{userbadges:badges,user:req.session.user});


    }

  }
  else{
    if(req.session.user){
      res.redirect("/admin_dashboard.ejs");

    }
    else{
      res.redirect('/login.ejs');
    }

  }
})


app.get('/timetables.ejs',async(req,res)=>{
  let table=[]
  let tables=await timetablesmodel.findOne({id:"anas"})
  .then((data)=>data)
  .catch(()=>console.log('error pulling tables')) 
  if(tables)
   table=await tables.table
  res.render('timetables.ejs',{table:table});
})
//rendering part***************************************************************************************************

let userSchema=new db.Schema({
    username:{
        type:String,
        required:true,
        default:""
    },
    email:{
        type:String,
        required:true,
        default:""
    },
    password:{
        type:String,
        required:true,
        default:""
    }, age:{
        type:Number,
        required:true,
    }, picture:{
        type:String,
        default:"#"
    }, points:{
        type:Number,
        default:10,
    },
     prime:{
        type:Boolean,
        default:false,
    },
    status:{
      type:Number,
      default:0,
  },
  ban:{
    type:Number,
    default:0,
    required:true},
    date:{
      type:Object,
      default:{
        day:{
          type:String,
          default:'',

        },
        month:{
          type:String,
          default:'',
          
        },
        year:{
          type:String,
          default:'',
          
        },
      }
    },
    tasks:{
      type:[String],
      default:[],
      required:true
    },
    badges:{
      type:Object,
      default:{'':{
        status:
        {type:Number,default:0,
          required:true}
        ,date:{type:Object,default:{year:'',month:'',day:'',hour:'',minute:'',second:''},
        required:true}
        ,questions:{
        type:[String],
        default:[],
        required:true
      },
      releaseDate:{type:Object,default:{year:'',month:'',day:'',hour:'',},
      required:true}
    }},
    required:true

    },
    play_status:{
      type:Number,
      required:true,
      default:0,
    },
    progress:{
      type:Number,
      required:true,
      default:0

    },
    um:{
      type:Number,
      required:true,
      default:0
    },
    history:{
      type:[Object],
      required:false,
      default:{
        status:{
          type:Number,
          required:true,
          default:0

        },
        opponent:{
          type:String,
          required:true,
          default:''

        },
        date:{
          type:String,
          required:true,
          default:''

        },
        score:{
          type:Number,
          required:true,
          default:50
        }
      }
    },
    classroomstate:{
      type:Boolean,
      default:false
    },
    classrooms:{
      type:[Object],
      default:[]
    },
    friendsList:{
      type:Object,
      default:{},
    },
    blocksList:{
      type:Object,
      default:{},
    },
    declinesList:{
      type:Object,
      default:{},
    },
    pendingsList:{
      type:Object,
      default:{},
    },
    
  
})
let people=new db.model('users',userSchema)

//preparing schemas and models for db
/*
 people.findOneAndUpdate({email:'anas@gmail.com'},{play_status:0})
 people.findOneAndUpdate({email:'azd@azd.com'},{play_status:0})
 gameRoomModel.findOneAndRemove({player1:'anas@gmail.com'})*/




const register=function(){
app.post('/register.ejs',upload.single('picture'),async(req,res,done)=>{
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
    console.log(pic);

   if(dt){
    messagee.msg=await"Email Already Used \n If its yours Proceed to Login Page by clicking the link Below";
    messagee.pw=await pass;
    messagee.cpw=await cpass;
    messagee.em=await em;
    messagee.un=await un;
    await res.redirect('/register.ejs');
    done(null);
   }
   else if(!ep){
       messagee.msg=await "Passwords dont match";
    await  res.redirect('/register.ejs');done(null);
   }
   else if(pass.length<4){
    messagee.msg=await "Password minimum length is 4 characters";
    await  res.redirect('/register.ejs');done(null);

   }
   else if(age<18||age>200){
    messagee.msg=await "Invalid age (At least 18) ";
 await  res.redirect('/register.ejs');done(null);

   }
   
   else{
   
    let usere=new people({username:un,email:em,password:ps,age:age,prime,prime,picture:"",points:points,status:0})
   console.log(un);
    await usere.save()
    .then(()=>console.log("user saved"))
    .catch(()=>console.log("error saving user"))
    await res.redirect('/login.ejs');
    done(null);}
})
};

const login=function(){
    app.post('/login.ejs',async(req,res,done)=>{
             reinit(messagee);
        const em= await req.body.email;
        const hps= await  req.body.password;
         let dt=await people.findOne({email:em})
         .then((data)=>{console.log("login email collected");return data;})
         .catch(()=>console.log("error in collecting login email"));
        if(em=='admin@admin.admin'&&hps=='0000'){
           req.session.user=await 'admin@admin.admin';
          res.redirect('/admin_dashboard.ejs');
        }
        else if(dt){
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
          await temp_ban_AutoCkeck();
         }
         if(authent&&!status){
             req.session.user=await em;
             messagee.username=await dt.username;
             messagee.points=await dt.points;
             messagee.prime=await dt.prime;
            await people.findOneAndUpdate({email:em},{status:dt.status+1})
             res.redirect('/dashboard.ejs');
         }
         else if(!authent){
             messagee.wpm=await "Wrong Password";
             res.redirect('/login.ejs');

         }
         else if(status==1){
          messagee.wpm=await "Sorry you are Indefinitely Banned from Our Plateform";
          res.redirect('/login.ejs');

         }
         else if(status==2){
          messagee.wpm=await `Sorry you are Banned from Our Plateform Until this date ${day}\\${month}\\${year}`;
          res.redirect('/login.ejs');


         }
         }
        
        else{
            messagee.wpm=await "Unlogged Email \n Proceed to Sign up Page Or Check Email Spelling";
            res.redirect('/login.ejs');

        }
    })
}









//operational part
let prime=function(){
    app.post('/prime',async(req,res)=>{
      if(req.session.user){
        if(req.session.user=="admin@admin.com"){
          res.redirect('/admin_dashboard.ejs');
        }
        else{
        
        let em=await req.session.user;
        let dt=await people.findOne({email:em})
        if(dt.prime){
          res.redirect('/dashboard.ejs');
        }
        else{
        let rest=await dt.points-10;
      
       messagee.points=await rest;
       messagee.prime=await true;
       await  people.findOneAndUpdate({email:em},{prime:true,points:rest})
       .then(()=>console.log("user updated to premium"))
       .catch(()=>console.log("error updating to prime"))
       await res.redirect('/dashboard.ejs');

        }

        }

      }
    });

}
let map={
  1000:'M',
  900:'CM',
  500:'D',
  400:'CD',
  100:'C',
  90:'XC',
  50:'L',
  40:'XL',
  10:'X',
  9:'IX',
  5:'V',
  4:'IV',
  1:'I',
}
function convertToRoman(num) {
  let mult=1,res='',cnt=0;
  while(num){
    let k=num%10;
    console.log(num+" "+k+" "+mult);
    k*=mult;mult*=10;
    cnt++;num=parseInt(num/10);if(!k)continue;
    switch(cnt){
      case 1:
      if(map.hasOwnProperty(k)){
        res=map[k]+res;
      }
      else{
        if(k>1&&k<4){
          while(k--){
              res='I'+res;
          }
         }
        else if(k>5&&k<9){
          k-=5;res='V'+res;
          while(k--){
              res=res+'I';
          }

        }
      }
      ;break;
      case 2:
      if(map.hasOwnProperty(k)){
        res=map[k]+res;
      }
      else{
        if(k>10&&k<40){
          while(k){
              res='X'+res;k-=10;
          }
         }
        else if(k>50&&k<90){
          k-=50;let add='L'
          while(k){k-=10;
              add=add+'X';
          }
          res=add+res;

        }
      };break;
      case 3:
      if(map.hasOwnProperty(k)){
        res=map[k]+res;
      }
      else{
        if(k>100&&k<400){
          while(k){k-=100
              res='C'+res;
          }
         }
        else if(k>500&&k<900){
          k-=500;let add='D'
          while(k){
              add=add+'C';k-=100
          }
          res=add+res;

        }
      };break;
      default:
      while(k>0){k-=1000
        res='M'+res;
      }
      ;break;
    }
    
  console.log(res);
  console.log(num);}
  return res;
}
let conversion=async function(){app.post('/convert',async (req,res)=>{
messagee.msg="";
messagee.Roman_number='';
let nb=await req.body.number;
let user=await people.findOne({email:req.session.user})
.then((data)=>data)
.catch(()=>console.log("error searching"))
messagee.prime=await user.prime;
if(nb<0){
  messagee.msg=await "Only Positive Integers are Allowed (>0)";
  res.redirect('/converter.ejs');
}
else if(nb>9999){
  messagee.msg=await "Input Limit is 9999 (for display reasons";
  res.redirect('/converter.ejs');
}
else{

messagee.Roman_number=await convertToRoman(nb);
messagee.prime=user.prime;
res.redirect('/converter.ejs');}

})}

let users_listing=()=>{
  app.get('/users_list.ejs',async (req,res)=>{if(req.session.user=='admin@admin.admin')res.redirect('/admin_dashboard.ejs')
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
      res.redirect('/login.ejs');
    }})
}

let users_ranking=()=>{
  app.get(('/users_ranking.ejs'),async(req,res)=>{
      if(req.session.user){
      let em= await req.session.user;
      console.log(em);
      let user=await people.findOne({email:em})
      .then((dt)=>{return dt})
      .catch(()=>console.log("error in search"));
  
      let allu= await people.find()
      .then((dt)=> dt)
      .catch(()=>console.log("error searching"))
      allu=await allu.sort((a,b)=>{
        if(a.points>b.points)return -1;
        if(a.points<b.points)return 1;
        return 0;
      })
      messagee.email=await em;
      res.render('users_ranking.ejs',{message:messagee,all_users:allu});
    
  
      }
      else{
        res.redirect('/login.ejs');
      }
  
  })
}
let checkup=(m)=>{
  let k=m.length,s=0
  for(let i=0;i<k;i++){
    if(m[i]==' ')s++;
  }
  return s!=k;
}
let posting=()=>{
  app.post(('/posting.ejs'),async(req,res)=>{
      if(req.session.user){
        let user=await people.findOne({email:req.session.user})
        .then((dt)=>dt)
        .catch(()=>console.log("error searching"));
        let date=await new Date();
        let day=await date.getDate();
        let mt=await date.getMonth();
        let y=await date.getFullYear();
        let hr=await date.getHours();
        let mn=await date.getMinutes();
        let sc=await date.getSeconds();
        let msc=await date.getMilliseconds();
        let post=await req.body.te;
        let name=await user.username;
        let prm=await user.prime;
        let dt =y+"-"+mt+"-"+day+" "+hr+":"+mn;
        let id=req.session.user+" "+dt+':'+sc+':'+msc;
        if(checkup(post)){let posted=await new post_model({username:name,post:post,date:dt,prime:prm,id:id});
        
        await posted.save()
        .then(()=>console.log("post saved"))
        .catch(()=>console.log("error saving "))
         all_posts=await post_model.find()
        .then((dt)=>dt)
        .catch(()=>console.log("error pulling posts"))

       
        }
       if(selection==0) await all_posts.reverse();
       else if(selection==1){
        all_posts.sort((a,b)=>{if(a.vote>b.vote)return 1;if(a.vote<b.vote)return-1; return 0;});
       }
        res.redirect('/posting.ejs');
      }
      else{
        res.redirect('/login.ejs');
      }
  
  })
}
let check=(a,e)=>{
  for(let k =0;k<a.length;k++)if(a[k]==e)return true;return false
}
let upvoting=async function(){
    
io.on('connection',(socket)=>{
  console.log(`user connected for upvote`);
  socket.on('upvote',async(data)=>{console.log('up');
    let user=await people.find({email:data.uid})
    .then((dt)=>dt)
    .catch(()=>console.log("error searching"))
    let input=await data.id;
    let post=await post_model.findOne({id:input})
    .then((dt)=>dt)
    .catch(()=>console.log("error post searching"))
    
    if(!check(post.upvoters,data.uid)){
      //remove old vote
     let res=[],ok=true;
     for(let k =0;k<post.downvoters.length;k++){
      if(post.downvoters[k]==data.uid){ok=false;break;};
      
     }
     if(ok){
      post.upvoters.push(data.uid);
      await post_model.findOneAndUpdate({id:input},{upvoters:post.upvoters,vote:post.upvoters.length-post.downvoters.length});
 
     }
     else{
      for(let k =0;k<post.downvoters.length;k++){
       if(post.downvoters[k]==data.uid)continue;
       res.push(post.downvoters[k]);
      }
       post.downvoters=await res;
      await post_model.findOneAndUpdate({id:input},{downvoters:post.downvoters,vote:post.upvoters.length-post.downvoters.length});

     }
     //**************/

    }})
})
}


let downvoting=async function(){
    
  io.on('connection',(socket)=>{
    console.log(`user connected for downvote On`);
    socket.on('downvote',async(data)=>{console.log("down");
      let user=await people.find({email:data.uid})
      .then((dt)=>dt)
      .catch(()=>console.log("error searching"))
      let input=await data.id
      let post=await post_model.findOne({id:input})
      .then((dt)=>dt)
      .catch(()=>console.log("error post searching"))
      if(!check(post.downvoters,data.uid)){
        //remove old vote
       let res=[],ok=true;
       for(let k =0;k<post.upvoters.length;k++){
        if(post.upvoters[k]==data.uid){ok=false;break;};
        
       }
       if(ok){
        post.downvoters.push(data.uid);
        await post_model.findOneAndUpdate({id:input},{downvoters:post.downvoters,vote:post.upvoters.length-post.downvoters.length});

       }
       else{
        for(let k =0;k<post.upvoters.length;k++){
         if(post.upvoters[k]==data.uid)continue;
         res.push(post.upvoters[k]);
        }
         post.upvoters=await res;
        await post_model.findOneAndUpdate({id:input},{upvoters:post.upvoters,vote:post.upvoters.length-post.downvoters.length});

       }
       //**************/
      }
     
   

    
    })})
  
}

let filter=()=>{
  app.post('/posting/filter',async(req,res)=>{
    if(req.session.user){
      if(req.body.selection=="Date"){
        selection=await 0;
        console.log("sorted by Date")
      res.redirect('/posting.ejs')

      }
      else if(req.body.selection=="Popularity"){
         selection=await 1;
         console.log("sorted by Popularity")
        res.redirect('/posting.ejs')

      }
      
    }
    else{
      res.redirect('/login.ejs');
    }
  })
}

let ban=()=>{
  app.post('/ban',async(req,res)=>{
    if(req.session.user=='admin@admin.admin'){
         let email=await req.body.id;
         let initdate={day:'',month:'',year:''};
         let user = await people.findOneAndUpdate({email:email},{ban:1,date:initdate})
         .then(()=>console.log(`user with email ${email} is Banned successfully`))
         .catch("error searching to Ban")
         res.redirect('/users_panel.ejs');
    }
    else{
      
      res.redirect('/dashboard.ejs')
    }
  })
}


let unban=()=>{
  app.post('/unban',async(req,res)=>{
    if(req.session.user=='admin@admin.admin'){
    
         let email=await req.body.id;
         let user = await people.findOneAndUpdate({email:email},{ban:0,date:{day:'',month:'',year:''}})
         .then(()=>console.log(`user with email ${email} is Unbanned successfully`))
         .catch("error searching to Unban")
         res.redirect('/users_panel.ejs');
    }
    else{
      
      res.redirect('/dashboard.ejs')
    }
  })
}

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
//ban autocheck for temp banned users
let temp_ban_AutoCkeck=async()=>{
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
let rev=(s)=>{
let n=s.length;
for(let k=0;k<parseInt(n/2);k++){
  let fp=s.substring(0,k);
  let sp=s.substring(k+1,n-k-1);
  let tp=s.substring(n-k);
  s=fp+s[n-k-1]+sp+s[k]+tp;
}return s;
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
let temp_ban=()=>{
  app.post('/temp_ban',async(req,res)=>{
    if(req.session.user=='admin@admin.admin'){
      
      messagee.msg='';
      messagee.tobebanned=true;
      messagee.email='';
      
         let email=await req.body.id;
         let date=await req.body.time;
         let user=await people.findOne({email:email});

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
 
         res.redirect('/users_panel.ejs');

         }
         else{
          res.redirect('/users_panel.ejs');

         }
    }
    else{
      
      res.redirect('/dashboard.ejs')
    }
  })
}

let add_task=async()=>{
  io.on('connection',async(socket)=>{
   console.log("Socket oppened for task adding");
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
  })
  
}

let remove_task=async()=>{
  io.on('connection',(socket)=>{
   console.log("Socket oppened for task removing");
   socket.on('/remove_task',async(data)=>{
    let email=await data.email
  if(email){
    let user=await people.findOne({email:email})
    .then((d)=>d)
    .catch("error looking for user to remove task");
    if(user.prime){
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
  }
    

   })
  })

  
}
let send_message=()=>{
  io.on('connection',(socket)=>{
    console.log("Socket oppened for general message to Send messages");
    
    socket.on('user_incoming',async(data)=>{
    let Log=new logModel({username:data.username,status:'Just Joined The Chat',email:data.id});
    await Log.save()
    .then((d)=>{console.log("join log saved");return d})
    .catch(()=>console.log("error saving join log"));
    await socket.broadcast.emit('user_came',data.username);
    await socket.emit('user_came','You');

      
    })
    socket.on('user_leaving',async(data)=>{
    let Log=new logModel({username:data.username,status:'Just Left The Chat',email:data.id});
    await Log.save()
    .then((d)=>{console.log("join log saved");return d})
    .catch(()=>console.log("error saving join log"));
    await socket.broadcast.emit('user_left',data.username);
    await socket.emit('user_left','You');

      
    })
    socket.on('Sent',async(data)=>{
      let username=await data.username;
      let email=await data.id;
      let message=await data.message;
      //filtering part
      message=clearup(message);//clearing extra spaces
      message=forbid(message)//removing curse word

      let messageToSave=await new generalChatModel({senderId:email,message:message,senderName:username});
     await messageToSave.save()
      .then((d)=>{console.log("general chat message saved");return d})
      .catch(()=>console.log("error saving general chat message"));
     let ecodata= {}
     ecodata.message=await message;
     ecodata.username=await username;
     ecodata.me='me';
     socket.emit('broadcast',ecodata);
     ecodata.me='';
     socket.broadcast.emit('broadcast',ecodata);


    })
    socket.on('user_leaving',(data)=>{
      
    })
  })

}


let recieve_message=()=>{
  io.on('connection',(socket)=>{
    let all_messages=generalChatModel.find()
    .then((data)=>{console.log("messages pulled to be received");return data})
    .catch(()=>console.log(""))


  })

}
let deleted_message=()=>{
  io.on('connection',(socket)=>{
    console.log('Socket connected for message deletion');
    socket.on('delete-message',async(data)=>{
      console.log("debug");
       let all_msg=await generalChatModel.find()
       .then((data)=>{console.log('messages to delete found ');return data})
       .catch(()=>console.log("error finding messages to delete"))
       let messageToBeDeletedId=await all_msg[data-1]['_id'];
       await generalChatModel.findOneAndUpdate({'_id':messageToBeDeletedId},{message:'Message Deleted'})
       .then((d)=>{console.log("message successfully deleted");return d})
       .catch(()=>console.log("error deleting message"))
       
        socket.broadcast.emit('message-deleted',data);
    })

  })
}

let watch_together=()=>{
  io.on('connection',(socket)=>{
    console.log("Socket oppened for music sharing")
    socket.on('play',(data)=>{
      console.log("fuck");
      socket.broadcast.emit('played',data);
    });
    socket.on('pause',(data)=>{
      console.log("fuck");
      socket.broadcast.emit('paused',data);
    });
  })
}

let testing=()=>{
  app.post('/testing',async(req,res)=>{
    test=null
     test=await req.body.badge;
     console.log("user testing on "+test);
     res.redirect('/testing.ejs');
  
})}
let submit_test=()=>{
  app.post('/testSubmit',async(req,res)=>{
    messagee.msg='';
    let user= await people.findOne({email:req.session.user})
    .then((data)=>data)
    .catch(()=>console.log("error pulling user after test submission"));
    let total_score=0;
    //pull test name
    let testname=test;
    test='';
    let badges=await user.badges;
    let questions=await badges[testname].questions;
    //pull questions values by names
    let question1=req.body.q1;
    let question2=req.body.q2;
    let question3=req.body.q3;
    let percentage='100%';
    console.log(question1)
    console.log(question2)
    console.log(question3)
    console.log(questions[0])
    console.log(questions[1])
    console.log(questions[2])
    //pull answers
    total_score+=(question1==tests[testname][badges[testname].questions[0]-1].answer&&question1)
    total_score+=(question2==tests[testname][badges[testname].questions[1]-1].answer&&question2)
    total_score+=(question3==tests[testname][badges[testname].questions[2]-1].answer&&question3)
    //compare  if(2/3)< succ other wise no
    console.log(total_score);
    if(total_score<2){
      badges[testname].status=-1;
      let date=badges[testname].date;
      let day=date.day;
      let year=date.year;
      let month=date.month;
      let second=date.second;
      let minute=date.minute;
      let hour=date.hour;
      let alldays=getDaysInMonth(year,month);
      //add 3 mins and 5 seconds
      
      day+=1;
    
      month+=parseInt(day/(alldays+1));
      day=parseInt((day-1)%(alldays)+1);
    
      year+=parseInt(month/13);
      month=parseInt((month-1)%12+1);

      badges[testname].date={day:'',month:'',year:'',minute:'',second:'',hour:''}
      badges[testname].releaseDate={day:day,month:month,year:year,hour:hour}
      badges[testname].questions=[];
      badges[testname].status=-1;
      

 messagee.msg='Unfortunately you didnt Pass The '+testname+' Test \n Your next Chance will be on '+year+'/'+month+'/'+day;

    }
    else{
      badges[testname].status=2;
      badges[testname].date={day:'',month:'',year:'',minute:'',second:'',hour:''}
      badges[testname].releaseDate={day:'',month:'',year:'',hour:''}
      badges[testname].questions=[];
      if(total_score==2){
      percentage='60%'
      }
      messagee.msg='Congratulations , You Have Passed The test with a Score Of score of '+percentage+' ! \n Your badge will be Displayed On your dashboard '
    
    }
    //succ status = 2 and initilize
    await people.findOneAndUpdate({email:req.session.user},{badges:badges})
    .then((data)=>{console.log("user updated aeter test");return data})
    .catch(()=>console.log("error submitting test"))
    // fail status =-1 initilize , releasedate+= 1 day
    res.redirect('/dashboard.ejs');
   


  })
}
let play=()=>{
  app.post('/play',async(req,res)=>{
    if(req.session.user&&req.session.user!='admin@admin.admin'){//authenticated
        
     let user =await people.findOne({email:req.session.user})
     .then((data)=>data)
     .catch(()=>{
      console.log("error finding user")
     })
     let playing=await user.play_status;
     if(!playing){//playroom adding
      if(waiting_room.length){
        let player1=await waiting_room[0];
        await waiting_room.shift();
        let room =await gameRoomModel.findOne({player1:player1})
        .then((data)=>data)
        .catch('error pulling waiting room');
        room.id+=await user.email;
        console.log(room.id)
        //changing players status
          await gameRoomModel.findOneAndUpdate({_id:room._id},{id:room.id,player2:user.email})
          .then((data)=>{console.log("room fully prepared");return data})
          .catch(()=>console.log("error prepareing room"))
       
        await people.findOneAndUpdate({email:player1},{play_status:2})
        .then((data)=>{console.log("player 1 status playing");return data})
        .catch(()=>console.log("error updating player 1"))

        await people.findOneAndUpdate({email:user.email},{play_status:2})
        .then((data)=>{console.log("player 2 status playing");return data})
        .catch(()=>console.log("error updating player 2"))

        //adding room
        res.redirect('/room.ejs');

        



      }
      else{
         waiting_room.push(user.email);
         //building 1st part of room
        let id=await user.email+" ";
        await people.findOneAndUpdate({email:req.session.user},{play_status:1})
        .then((d)=>{console.log("player is waiting now");return  d})
        .catch(()=>console.log("error updating player status"))
         let room=await new gameRoomModel({id:id,player1:req.session.user,player2:"",score:50,clicks:{'p1':0,'p2':0}})

         await room.save()
         .then((data)=>{console.log("room added for player 1");return data})
         .catch(()=>console.log("error adding room"))
         res.redirect('/room.ejs');
      }

     }
     else{
      if(user.play_status==1){
        let aux_room=[];
        for(let k in waiting_room){
          if(waiting_room[k]==user.email)continue;
          room.push(waiting_room[k]);
        }
         waiting_room=aux_room
        await gameRoomModel.findOneAndRemove({player1:user.email})
        .then((data)=>{console.log("room Destroyed");return data})
        .catch(()=>console.log("error Destroying room"))
        await people.findOneAndUpdate({email:req.session.user},{play_status:0})
        .then((d)=>{console.log("player is not waiting now");return  d})
        .catch(()=>console.log("error updating player status"))
        res.redirect('/dashboard.ejs')

      }
      else{
        res.redirect('/room.ejs');
      }

     }
    }
    else{if(!req.session.user)
      res.redirect('/login.ejs')
      else res.redirect('/admin_dashboard.ejs')
    }
  })
}


let sockets=()=>{
  io.on('connection',(socket)=>{
    socket.on('end_game',async(data)=>{
      console.log(data);
      console.log("game ended");
      let p1=await people.findOne({email:data.player1.email})
      .then((data)=>data)
      let p2=await people.findOne({email:data.player2.email})
      .then((data)=>data)

      let room=await gameRoomModel.findOne({id:data.id})
      .then((dt)=>{console.log("gameroom found to destroy");console.log(dt);return dt})
      .catch(()=>console.log("error finding gameroom to destroy"))

      
     if(room&&p1.play_status&&p2.play_status){
        let p1h=p1.history;
        let p2h=p2.history;
      if(room.score>50){
        p1h.push({status:1,score:room.score,opponent:p2.username,date:new Date(room.ending_date*1000)})
        p2h.push({status:-1,score:100-room.score,opponent:p1.username,date:new Date(room.ending_date*1000)})
        await people.findOneAndUpdate({email:p1.email},{points:p1.points+10,play_status:0,history:p1h})
        .then(()=>console.log("player 1 won 10 points"))
        .catch(()=>console.log("error updating points"))
        await people.findOneAndUpdate({email:p2.email},{points:p2.points-10,play_status:0,history:p2h})
        .then(()=>{console.log("player 2 lost 10 points");socket.broadcast.emit("players safe");socket.emit("players safe")})
        .catch(()=>console.log("error updating points"))

      }
      else if(room.score<50){
        p1h.push({status:-1,score:room.score,opponent:p2.username,date:new Date(room.ending_date*1000)})
        p2h.push({status:1,score:100-room.score,opponent:p1.username,date:new Date(room.ending_date*1000)})
        
        await people.findOneAndUpdate({email:p1.email},{points:p1.points-10,play_status:0,history:p1h})
        .then(()=>console.log("player 1 lost 10 points"))
        .catch(()=>console.log("error updating points"))
        await people.findOneAndUpdate({email:p2.email},{points:p2.points+10,play_status:0,history:p2h})
        .then(()=>{console.log("player 2 won 10 points");socket.broadcast.emit("players safe");socket.emit("players safe")})
        .catch(()=>console.log("error updating points"))

      }
      else{
        p1h.push({status:0,score:50,opponent:p2.username,date:new Date(room.ending_date*1000)})
        p2h.push({status:0,score:50,opponent:p1.username,date:new Date(room.ending_date*1000)})
        
        await people.findOneAndUpdate({email:p1.email},{play_status:0,history:p1h})
        .then(()=>console.log("player 1 same points"))
        .catch(()=>console.log("error updating points"))
        await people.findOneAndUpdate({email:p2.email},{play_status:0,history:p2h})
        .then(()=>{console.log("player 2 same points");socket.broadcast.emit("players safe");socket.emit("players safe")})
        .catch(()=>console.log("error updating points"))

      }
      await gameRoomModel.findOneAndRemove({id:room.id})
      .then(()=>{console.log("room destroyed");})
      .catch(()=>console.log("error destroying room"))

     }

      


    })
    socket.on('shot',async(data)=>{
      console.log("shot")
      let room;
      if(data.hasOwnProperty('player1')){
          room=await gameRoomModel.findOne({player1:data['player1'].email})
         .then((d)=>d)
          .catch(()=>console.log("error finding room"))
          if(room.score<100){
          room.score++;
      await gameRoomModel.findOneAndUpdate({id:room.id},{score:room.score})

          }
      }
      else{
         room=await gameRoomModel.findOne({player2:data['player2'].email})
        .then((d)=>d)
         .catch(()=>console.log("error finding room"))
         if(room.score>0){
         room.score--;
         await gameRoomModel.findOneAndUpdate({id:room.id},{score:room.score})


         }
      }
      if(room.score>=0&&room.score<=100){
        socket.emit('scored',room)
        socket.broadcast.emit('scored',room)

      }
    })


    console.log("full room socket on");
    socket.on("gameStarted",async(data)=>{
      console.log("second player joined for the first time");
      let room=await gameRoomModel.findOne({player2:data.player2.email})
      .then((data)=>data)
      .catch(()=>console.log("error finding full room"))
      console.log("game starting room is "+data.id)
      let newdata=await gameRoomModel.findOne({id:data.id})
      .then((data)=>data)
      .catch(('error finding room'))
      socket.broadcast.emit('start',newdata)
    })
  socket.on('new message',async(data)=>{
    //gc messages count 
    let gcm=await generalChatModel.find()
    .then((data)=>data.length)
    .catch(("error getting number of messages in GC"))
    //realtime update
    await people.findOneAndUpdate({email:data},{um:gcm})
    .then((data)=>data)
    .catch(()=>console.log("error realtime message count update"))

    socket.broadcast.emit('new messages',gcm);



  })
  socket.on('sound',(data)=>{
    socket.broadcast.emit('sound',data);
    console.log(data);
  })
  //classroom creation

  socket.on('create classroom',async(data)=>{
    let user =await people.findOne({email:data.useremail})
    .then((data)=>data)
    .catch(()=>console.log("error finding user"))
 let classroom={
  classroomtitle:data.classroomtitle,
  domain:data.domain,

  visibility:data.visibility=='private',
  classroomdescription:data.classroomdesc,
  classroomtagss:data.classroomtags


}
let classrooms=[];
classrooms=user.classrooms

if(!classrooms)classrooms=[]
await classrooms.push(classroom);

await people.findOneAndUpdate({email:user.email},{classrooms:classrooms,classroomstate:true})
.then(()=>{console.log("classroom added")
 socket.emit('classroom created')
})
.catch(()=>console.log("error creating classrooms"))


  })
  //friends request sending
socket.on("request send",async(d)=>{
  let receiver=d.rec;
  let sender=d.user;
  
  let rec=await people.findOne({email:receiver})
  .then((data)=>data)
  .catch(()=>console.log("error sending receiver"))
  if(!rec.blocksList.hasOwnProperty(sender)&&!rec.pendingsList.hasOwnProperty(sender)){
    
  let pends=rec.pendingsList;
  
  pends[sender]="true";
  await people.findOneAndUpdate({email:receiver},{pendingsList:pends})
  .then((data)=>data)
  .catch(()=>console.log("error updating"))
  }
  socket.emit("request sent",{})

})
socket.on("friend accept",async(data)=>{

  let user=await people.findOne({email:data.user})
  .then((data)=>data)
  .catch(("error getting friends"))
  let user2=await people.findOne({email:data.email})
  .then((data)=>data)
  .catch(("error getting friends"))
  let pendingslist=user.pendingsList;
  let friendslist=user.friendsList;
  let declineslist=user.declinesList;
  let pendingslist2=user2.pendingsList;
  let friendslist2=user2.friendsList;
  delete pendingslist[data.email];
  delete declineslist[data.email];
  friendslist[data.email]=true
  delete pendingslist2[data.user];
  friendslist2[data.user]=true
  await people.findOneAndUpdate({email:data.user},{pendingsList:pendingslist,friendsList:friendslist,declinesList:declineslist})
  .then((data)=>data)
  .catch(("error updating friends list"))

  await people.findOneAndUpdate({email:data.email},{pendingsList:pendingslist2,friendsList:friendslist2})
  .then((data)=>data)
  .catch(("error updating friends list"))

  socket.emit("friend accepted")
})




socket.on("friend decline",async(data)=>{

  let user=await people.findOne({email:data.user})
  .then((data)=>data)
  .catch(("error getting friends"))
  let user2=await people.findOne({email:data.email})
  .then((data)=>data)
  .catch(("error getting friends"))
  let pendingslist=user.pendingsList;
  let declineslist=user.declinesList;
  let pendingslist2=user2.pendingsList;
  delete pendingslist[data.email];
  declineslist[data.email]=true
  delete pendingslist2[data.user];
  await people.findOneAndUpdate({email:data.user},{pendingsList:pendingslist,declinesList:declineslist})
  .then((data)=>data)
  .catch(("error updating friends list"))

  await people.findOneAndUpdate({email:data.email},{pendingsList:pendingslist2})
  .then((data)=>data)
  .catch(("error updating friends list"))

  socket.emit("friend declined")
})



socket.on("friend block",async(data)=>{
  console.log("done")

  let user=await people.findOne({email:data.user})
  .then((data)=>data)
  .catch(("error getting friends"))
  let user2=await people.findOne({email:data.email})
  .then((data)=>data)
  .catch(("error getting friends"))
  let friendslist=user.friendsList;
  let blockslist=user.blocksList;
  let friendslist2=user2.friendsList;
  delete friendslist[data.email];
  blockslist[data.email]=true
  delete friendslist2[data.user];
  await people.findOneAndUpdate({email:data.user},{friendsList:friendslist,blocksList:blockslist})
  .then((data)=>data)
  .catch(("error updating friends list"))
  await people.findOneAndUpdate({email:data.email},{friendsList:friendslist2})
  .then((data)=>data)
  .catch(("error updating friends list"))

  socket.emit("friend blocked")
  socket.broadcast.emit("friend blocked you",{user:data.email,other:data.user})
})





socket.on("friend unblock",async(data)=>{

  let user=await people.findOne({email:data.user})
  .then((data)=>data)
  .catch(("error getting friends"))
  let user2=await people.findOne({email:data.email})
  .then((data)=>data)
  .catch(("error getting friends"))
  let friendslist=user.friendsList;
  let blockslist=user.blocksList;
  let friendslist2=user2.friendsList;
  delete blockslist[data.email];
  friendslist[data.email]=true
  friendslist2[data.user]=true
  await people.findOneAndUpdate({email:data.user},{friendsList:friendslist,blocksList:blockslist})
  .then((data)=>data)
  .catch(("error updating friends list"))
  await people.findOneAndUpdate({email:data.email},{friendsList:friendslist2})
  .then((data)=>data)
  .catch(("error updating friends list"))

  socket.emit("friend unblocked")
})

socket.on("mdbeb",async(v)=>{
  let olddata=await timetablesmodel.findOne({id:'anas'})
  .then((d)=>d)
  .catch(()=>console.log(zav))
  let monday=olddata.table.monday

  if(v<=monday.length){
    monday[v-1].status=!(monday[v-1].status);
     olddata.table.monday=await monday
    await timetablesmodel.findOneAndUpdate({id:'anas'},{table:olddata.table})
    console.log("old");
    
   olddata=await timetablesmodel.findOne({id:'anas'})
  .then((d)=>d)
  .catch(()=>console.log("er"))
  for(let k of olddata.table.monday)
  console.log("status"+k.status+" "+k.seanceName)

  }
   socket.emit("mdbebo");


  

})
  



socket.on("tdbeb",async(v)=>{
  let olddata=await timetablesmodel.findOne({id:'anas'})
  .then((d)=>d)
  .catch(()=>console.log(zav))
  let monday=olddata.table.monday

  if(v<=monday.length){
    monday[v-1].status=!(monday[v-1].status);
     olddata.table.monday=await monday
    await timetablesmodel.findOneAndUpdate({id:'anas'},{table:olddata.table})
    console.log("old");
    
   olddata=await timetablesmodel.findOne({id:'anas'})
  .then((d)=>d)
  .catch(()=>console.log("er"))
  for(let k of olddata.table.monday)
  console.log("status"+k.status+" "+k.seanceName)

  }
   socket.emit("tdbebo");


  

})





socket.on("wdbeb",async(v)=>{
  let olddata=await timetablesmodel.findOne({id:'anas'})
  .then((d)=>d)
  .catch(()=>console.log(zav))
  let monday=olddata.table.monday

  if(v<=monday.length){
    monday[v-1].status=!(monday[v-1].status);
     olddata.table.monday=await monday
    await timetablesmodel.findOneAndUpdate({id:'anas'},{table:olddata.table})
    console.log("old");
    
   olddata=await timetablesmodel.findOne({id:'anas'})
  .then((d)=>d)
  .catch(()=>console.log("er"))
  for(let k of olddata.table.monday)
  console.log("status"+k.status+" "+k.seanceName)

  }
   socket.emit("wdbebo");


  

})
  

  
  })}

let add_classroom=()=>{
  app.post('/add_classroom',async(req,res)=>{
    let user=await people.findOne({email:req.session.user})
    .then((data)=>data)
    .catch(()=>console.log("error finding user"))
    let badgecount=0;console.log(badgecount)
    for(let k in user.badges){console.log(k+" badge");
    if(k!='')badgecount++;
    }
    if(!badgecount)res.redirect('/dashboard.ejs')
    else res.redirect('/class.ejs');
  })
}

function errorChecker(arr){
  for(let k of arr){
     if(!k || k=="")return false;
  }return true;
}



ban()
downvoting();
upvoting();
users_listing();
conversion();
register();
login();
prime();
users_ranking();
posting();
filter();
temp_ban_AutoCkeck();
temp_ban();
unban();
add_task();
remove_task();
send_message();
deleted_message();
watch_together();
testing();
submit_test();
play();
sockets();
add_classroom();
/*
people.findOneAndUpdate({email:"anas@gmail.com"},{points:-10,pendingsList:{},friendsList:{},blocksList:{},declinesList:{}}).then(()=>console.log("zab")).catch("errr");
people.findOneAndUpdate({email:"azd@azd.com"},{points:-10,pendingsList:{},friendsList:{},blocksList:{},declinesList:{}}).then(()=>console.log("zab")).catch("errr");
people.findOneAndUpdate({email:"test@gmail.com"},{points:-10,pendingsList:{},friendsList:{},blocksList:{},declinesList:{}}).then(()=>console.log("zab")).catch("errr");
*/

//test********************************************



let save_schedule=()=>{
  app.post('/mtimetable',async(req,res)=>{
    let ok=true
    let count=1;
    let olddata=await timetablesmodel.findOne({id:"anas"})
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
      let obj={id:"anas",group:1,table:table}
      let tobesaved=new timetablesmodel(obj)
      tobesaved.save()
      .then(()=>console.log("saved"))
      .catch("error saving new table");

      }

    }

    
  //tuesday*****************************************



   ok=true
   count=1;
   olddata=await timetablesmodel.findOne({id:"anas"})
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
    let obj={id:"anas",group:1,table:table}
    let tobesaved=new timetablesmodel(obj)
    tobesaved.save()
    .then(()=>console.log("saved"))
    .catch("error saving new table");

    }

  }







  //wednesday*****************************************



  ok=true
  count=1;
  olddata=await timetablesmodel.findOne({id:"anas"})
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
   while(req.body['tsc'+count]){
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
   let obj={id:"anas",group:1,table:table}
   let tobesaved=new timetablesmodel(obj)
   tobesaved.save()
   .then(()=>console.log("saved"))
   .catch("error saving new table");

   }

 }









    res.redirect('/timetables.ejs')

  })


  
}


/*
 timetablesmodel.findOneAndRemove({"id":"anas"})
.then(()=>console.log("rest"))
.catch(()=>console.log("error catcjing"))*/
save_schedule();

