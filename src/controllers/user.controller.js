import UserData from "../models/user.model.js";
export default class UserController{

 getRegister(req,res){
   
    res.render('register');
 }
 getLogin(req,res){

        
    res.render('login',{
        errorMessage:null
    });
 }

 postRegister(req,res){
    const userCreated = UserData.add(req.body.name,req.body.email,req.body.password);
  
        console.log('User SUccessfully created');
        res.render('login',{
            errorMessage:null
        });
 
 }
 postLogin(req,res){
   const isUser = UserData.authenticateUser(req.body.email,req.body.password);
   console.log(isUser);
   if(isUser){
    res.redirect('/');
   }else{
   
    res.render('login',{
        errorMessage: 'Invalid Credentials',
    });
   }
 }

}