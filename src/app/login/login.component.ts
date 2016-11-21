import { Component, OnInit } from '@angular/core';

export class User {
  constructor(
    public email: string,
    public password: string,
    public rememberMe: boolean) { }
}


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	private user = new User('', '', false);
	private errorMsg = '';
	
  	constructor() { }

	ngOnInit() {
	}

  	checkEmailValidity(email){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
  	}

  	login(){

  		if(!this.user.email || !this.user.password){
  			alert('Cannot leave your email or password blank');
  			return;
  		}

  		if(!this.checkEmailValidity(this.user.email)){
  			alert('The email you have entered is invalid');
  			return;
  		}
  		console.log(this.user);
  	}

  	forgetPassword(){

  	}


}
