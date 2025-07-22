//thier is a bit clutter in the code ,be careful if u are trying to understand ,hello from lavishkamboj16@gmail.com


require('dotenv').config()
let express=require('express');
let app=express()
let cors=require('cors')
const db=require('./config/db')
const userModel=require('./models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const auth=require('./auth')

const userTaskModel=require('./models/userTask')
const PORT = process.env.PORT || 8000;
//handling middlewares
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));

app.use(cors({ // your React app
  origin: process.env.FRONTEND_URL,
  credentials: true,         // ✅allow cookies
}));


app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.post('/send_inputData',async(req,res)=>{
   const token = req.cookies.token;
   let user_name
  
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // make user info available in req
      user_name=req.user.user;
      console.log(user_name)
    } catch (err) {
      return res.status(400).send('Invalid token.');
    }
    const {task} =req.body
    console.log(task)
    await userTaskModel.create({
  task:task,
  username:user_name
 
}
)
console.log("user registered successfully");
    res.send({message:'data transfer successful'})
    })

    app.get('/auth',auth,(req,res)=>{
        res.send(`Welcome ${req.user.user}`);
    })

app.get('/getUserData',async(req,res)=>{
const token = req.cookies.token;
   let user_name
  
    if (!token) {
      return res.status(401).send({message:'Access denied. No token provided.'});
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // make user info available in req
      user_name=req.user.user;
      console.log(user_name)
    } catch (err) {
      return res.status(400).send({message:'Invalid token.'});
    }
const user_data=await userTaskModel.find({username:user_name})
// res.send(user_data)
res.status(200).json(user_data)
})
app.get('/log-out', (req, res) => {
  res.clearCookie('token', {
  httpOnly: false,
  secure: true,
  sameSite: 'lax',
    path: '/',
});
res.json({ message: 'Logged out successfully' });
});

app.post('/deleteTask',async(req,res)=>{
  console.log(req.body.index)
  await userTaskModel.findByIdAndDelete(req.body.index);
  res.send({message:'deleted successfuly'})
})
app.post('/signup',async(req,res)=>{
  console.log(req.body)
  try{
    const user=await userModel.findOne({username:req.body.username})
    if(user){
      res.status(409).send({ message: 'User already exists' });
    }
    else{


  const hash_pass=await bcrypt.hash(req.body.password,10)
  await userModel.create({username:req.body.username,password:hash_pass});

const token=jwt.sign({
  user:req.body.username,
  pass:req.body.password
},
process.env.JWT_SECRET
)
console.log("token-"+token)

//cookie
res.cookie('token', token, {
  httpOnly: false,         // allow JS to access (optional)
  secure: true,           // must be true if you're on HTTPS
  sameSite: 'lax',         // controls cross-origin cookie behavior
  path: '/',               // cookie available to all paths
  maxAge: 86400000         // 1 day
});
console.log('Cookie being set:', token);

  res.send({message:'user successfuly signed up'})
   }
  }
  catch{
    res.status(500).send({message:'some error occured'})
  }
}

)


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password) // ✅ Use req.body, not req.params
  
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
  
      return res.status(404).send({ message: 'User or password is incorrect' });
    }
    
    const isMatch=await bcrypt.compare(password,user.password)
    if (!isMatch) {
      return res.status(401).send({ message: 'User or password is incorrect' });

      
    }
    //making token
    const token=jwt.sign({
  user:username,
  pass:password
},
process.env.JWT_SECRET
)
console.log("token-"+token)

//cookie
res.cookie('token', token, {
  httpOnly: false,         // allow JS to access (optional)
  secure: true,           // must be true if you're on HTTPS
  sameSite: 'lax',         // controls cross-origin cookie behavior
  path: '/',               // cookie available to all paths
  maxAge: 86400000         // 1 day
});
console.log('Cookie being set:', token);

    // ✅ Successful login
    res.send({ message: 'Login successful', user: { username: user.username } });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(PORT,()=>{
    console.log('listening at '+{PORT});
})
