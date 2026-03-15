import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
selector:'app-signup',
templateUrl:'./signup.component.html',
styleUrls:['./signup.component.css']
})
export class SignupComponent{

email=''
password=''

constructor(private router:Router){}

signup(){

const users=JSON.parse(localStorage.getItem('users') || '[]')

users.push({
email:this.email,
password:this.password
})

localStorage.setItem('users',JSON.stringify(users))

alert("Account Created")

this.router.navigate(['/'])

}

}