
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
  function  convertToRoman(num=0) {
    let mult=1,res='',cnt=0;
    while(num>0){
      let k=num%10;
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
        while(k){k-=1000
          res='M'+res;
        }
        ;break;
      }
      
    }
     return  res;
  }
  