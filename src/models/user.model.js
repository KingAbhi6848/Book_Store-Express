const user =[];
export default class UserData {

    constructor(_id ,_name,_email,_password){
        this.id = _id,
        this.name = _name,
        this.email = _email,
        this.password = _password
    }

static add(name,email,password){
    const newUser = new UserData(user.length+1,name,email,password);
    user.push(newUser);
}

static authenticateUser(email, password) {
    // Use some() to check if any user matches the provided credentials
    return user.some(user => user.email === email && user.password === password);
}
}