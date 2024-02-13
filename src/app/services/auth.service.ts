import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signUp, type SignInInput, ConfirmSignUpInput, confirmSignUp, autoSignIn, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router=inject(Router);

  pendingEmail:undefined|string;

  isLoggedInSubj = new BehaviorSubject<boolean>(false);//tipejar
  isLoggedIn$ = this.isLoggedInSubj.asObservable();
  // signinDetails:any;


  async getCurrentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};
      if(idToken){
        this.isLoggedInSubj.next(true);
      }else{
        this.isLoggedInSubj.next(false);
      }
      console.log('access token: '+accessToken);
      console.log(idToken);
    } catch (err) {
      console.log(err);
    }
  }

  constructor() { }

  async handleSignIn({ username, password }: SignInInput) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        this.router.navigate(['/mock-turistear']);
        this.isLoggedInSubj.next(true);
      } else {
        alert('Signin successful! Next step:'+nextStep);
      }
    } catch (error) {
      alert('Error signing in: '+error);
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username:email,
        password,
        options: {
          userAttributes: {
            // nickname:nickname
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
      this.pendingEmail=email;
      if (nextStep.signUpStep==='CONFIRM_SIGN_UP') {
        alert('signup successful! A code was sent to email');
        this.router.navigate(['auth/confirm']);
      } else {
        console.log('Next step:', nextStep); //Pro de moment no he configurat nextstep->default?
      }
  
      console.log(userId);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async handleSignUpConfirmation(confirmationCode:string) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username:this.pendingEmail!,
        confirmationCode
      });
      if (isSignUpComplete) {
        this.pendingEmail=undefined;
        await this.handleAutoSignIn();
      } else {
        console.log('Next step:', nextStep); //Pro de moment no he configurat nextstep->default?
      }
    } catch (error) {
      console.log('error confirming sign up', error);
      alert('Error: insert a valid code');
    }
  }

  async handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
      alert('autosignin completat!');
      if(signInOutput){
        alert('You are now logged in!');
        this.isLoggedInSubj.next(true);
        this.router.navigate(['/mock-turistear']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleSignOut() {
    let signedOut:any=undefined;
    try {
      signOut({ global: true }).then(res=>{
        alert('signout completed!');
        this.router.navigate(['home'])});
        this.isLoggedInSubj.next(false);
    } catch (error) {
      console.log('error signing out: ', error);
    }
    if(signedOut){
    }
  }

  
}