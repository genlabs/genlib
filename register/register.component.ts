import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	private user = new User('', '');
	private errorMsg = '';
	private password2 = '';
	private _timeout = null;

  	constructor(public lc: NgZone) { }

  	ngOnInit() {
  	}

	scorePassword(pass) {
	    let score = 0;
	    if (!pass)
	        return score;

	    // award every unique letter until 5 repetitions
	    let letters = new Object();
	    for (var i=0; i<pass.length; i++) {
	        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
	        score += 5.0 / letters[pass[i]];
	    }

	    // bonus points for mixing it up
	    let variations = {
	        digits: /\d/.test(pass),
	        lower: /[a-z]/.test(pass),
	        upper: /[A-Z]/.test(pass),
	        nonWords: /\W/.test(pass),
	    }

	    let variationCount = 0;
	    for (let check in variations) {
	        variationCount += (variations[check] == true) ? 1 : 0;
	    }
	    score += (variationCount - 1) * 10;

	    return score;
	}

	checkPassStrength(pass) {
	    let score = this.scorePassword(pass);
	    if (score > 80)
	        return "strong";
	    if (score > 60)
	        return "good";
	    if (score >= 30)
	        return "weak";

	    return "";
	}

	confirmPassword(){

		if(this.user.password){
			if(this.password2){

				if(this.password2 != this.user.password){
					this.errorMsg = 'Your passwords are different';
				}else{
					this.errorMsg = '';
					this.keyupEmail(); //rechecking
				}
			}else{
				this.errorMsg = 'Please confirm your password';
			}
		}
	}

	checkEmailValidity(email){

		if(email){
	        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    	if(re.test(email)){
	    		this.errorMsg = '';
	    		this.confirmPassword(); //rechecking
	    	}else{
	    		this.errorMsg = 'This is an invalid email';
	    	}			
		}else{
			this.errorMsg = '';
			this.confirmPassword();
		}
  	}

  	keyupEmail(){
  		
  		this._timeout  = null;
     	if(this._timeout){ //if there is already a timeout in process cancel it
       		window.clearTimeout(this._timeout);
     	}
     	this._timeout = window.setTimeout(() => {
        	this._timeout = null;
        	this.lc.run(() => this.checkEmailValidity(this.user.email));
     	},1000);
  	}

  	register(){

  		if(!this.user.email || !this.user.password){
  			this.errorMsg = 'Cannot leave your email or password blank';
  			return;
  		}

  		if(!this.errorMsg){
  			console.log('ok');
  		}

  	}

}
