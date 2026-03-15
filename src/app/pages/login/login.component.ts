import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent{

email=''
password=''

constructor(private router:Router){}

login(){

const users=JSON.parse(localStorage.getItem('users') || '[]')

const user=users.find((u:any)=>
u.email===this.email && u.password===this.password
)

if(user){

this.router.navigate(['/upload'])

}
else{

alert("Invalid Credentials")

}

}

}