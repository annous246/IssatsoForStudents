
function errorChecker(arr){
  for(let k in arr){
     if(!arr[k] || arr[k]=="")return false;
     if(arr[k].length>100)return false
  }return true;
}




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


module.exports={errorChecker}