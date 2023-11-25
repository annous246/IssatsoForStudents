let dictionnary={

"arse":"",
"arsehead":"",
"arsehole":"",
"ass":"",
"asshole":"",
"bastard":"",
"bitch":"",
"bloody":"",
"bollocks":"",
"brotherfucker":"",
"bugger":"",
"bullshit":"",
"child-fucker":"",
"Christ on a bike":"",
"Christ on a cracker":"",
"cock":"",
"cocksucker":"",
"crap":"",
"cunt":"",
"damn":"",
"damn it":"",
"dick":"",
"dickhead":"",
"dyke":"",
"fatherfucker":"",
"frigger":"",
"fuck":"",
"goddamn":"",
"godsdamn":"",
"hell":"",
"holy shit":"",
"horseshit":"",
"in shit":"",
"jesus christ":"",
"jesus fuck":"",
"jesus h. Christ":"",
"jesus harold christ":"",
"jesus mary and joseph":"",
"jesus wept":"",
"kike":"",
"motherfucker":"",
"nigga":"",
"nigra":"",
"pigfucker":"",
"piss":"",
"prick":"",
"pussy":"",
"shit":"",
"shit ass":"",
"shite":"",
"sisterfucker":"",
"slut":"",
"son of a whore":"",
"son of a bitch":"",
"spastic":"",
"sweet jesus":"",
"turd":"",
"twat":"",
"wanker":"",

}

function clearup(s){
let result='';let ok=0;
for(let k in s){
    if(s[k]==' '&&!ok){
        ok=1;result+=' ';
    }
    else if(s[k]!=' '&&ok){
        ok=0;
    }
    if(s[k]==' ')continue;
    result+=s[k];

}ok=0;
let end='',lastc=0;
for(let k in result){
if(result[k]==' '&&!ok){continue;

}
else{
    ok=1;lastc=k;
}
if(ok)end+=result[k];
}
if(lastc!=-1){
    end=end.substring(0,lastc+1);
}
return end
}


function forbid(message){
for(let k in message){
    if(message[k]=='*')continue;
    let begin=k,end=-1;let submessage=''
    for(let j=k;j<message.length;j++){
         submessage+=message[j].toLowerCase();
        if(dictionnary.hasOwnProperty(submessage))
        if(j<message.length-1){
            if(message[j+1]==' ')end=j;
        }
        else end=j;
            
        
    
    }
    if(end!=-1){let nextmessage=''
     nextmessage=message.substring(0,begin);
        for(let b=begin;b<=end;b++){
            nextmessage+='*';
        }
        nextmessage+=message.substring(end+1,);
    message=nextmessage;}
  }
  return message

}
let o={'h':"bro"};
console.log(o.hasOwnProperty('h'))
delete o['h']
console.log(o.hasOwnProperty('h'))
module.exports={dictionnary,clearup,forbid}