
const db=require('mongoose');

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
  
  
  
  
  
  
  
  
  let testbackcheck=(today,due)=>{
  if(today.getFullYear()>due.year)return true;
  }
  
  
  
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
  
  
  
  let customsschema=new db.Schema({
    seanceName:{
      type:String,
      default:'',
      required:true
    },
    type:{
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
  
  
  
  
  
  
  
  let customttschema=new db.Schema({
    id:{
      type:String,
      required:true,
      default:''
    },
      table:{
      type:Object,
      required:true,
      default:{
        monday:{
          type:[customsschema],
          default:[],
          required:true,
        },
        tuesday:{
          type:[customsschema],
          default:[],
          required:true,
        },
        wednesday:{
          type:[customsschema],
          default:[],
          required:true,
        },
        thursday:{
          type:[customsschema],
          default:[],
          required:true,
        },
        friday:{
          type:[customsschema],
          default:[],
          required:true,
        },
        saturday:{
          type:[customsschema],
          default:[],
          required:true,
        },
        sunday:{
          type:[customsschema],
          default:[],
          required:true,
        },
      }
    }
  })
  
  
  
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
    verification:{
      type:Boolean,
      required:true,
      default:false
    },
    verification_delay:{
      type:Number,
      required:true,
      default:0

    },
    password_delay:{
      type:Number,
      required:true,
      default:0

    },
    safe_gate:{
      type:Boolean,
      required:true,
      default:false,

    },
    linker:{
      type:String,
      required:false,
      default:""
    }
    
  
  })

  let cacheSchema=new db.Schema({
    id:{
      type:String,
      required:true,
      default:""
    },
    days:{
      type:[[Object]],
      required:true,
      default:[]
    }
  })
  
  exports.logSchema = logSchema
  exports.timetableschema = timetableschema
  exports.customttschema = customttschema
  exports.userSchema = userSchema
  exports.cacheSchema = cacheSchema
  
  