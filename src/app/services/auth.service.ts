import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { signIn, signUp, type SignInInput, ConfirmSignUpInput, confirmSignUp, autoSignIn, signOut, fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router=inject(Router);

  pendingEmail:undefined|string;

  signinDetails:any;
  //molaria unir isLoggedIn i currentUser perquè un reaccionés als canvis de l'altre
  isLoggedInSubj = new BehaviorSubject<boolean>(false);//tipejar
  isLoggedIn$ = this.isLoggedInSubj.asObservable();

  currentuserSubj = new BehaviorSubject<any>('');
  currentUser$ = this.currentuserSubj.asObservable();

  tokenSubj = new BehaviorSubject<any>('');//access o id token?
  token$ = this.tokenSubj.asObservable();

  auth_loading = signal<boolean>(false);

  // auth_loadingSubj = new BehaviorSubject<boolean>(false);
  // auth_loading$ = this.auth_loadingSubj.asObservable();

  //auth_state$ = new BehaviorSubject<any>({
    // isLoggedIn:false,
    // currentUser:null,
    // token:null,
    // loading:false
  // })

  async getCurrentAuthenticatedUser() {
    // this.auth_loadingSubj.next(true);
    this.auth_loading.set(true);
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);//Abans això retornava valor, ara no ('undefined')(?)
      this.signinDetails=signInDetails;
      this.isLoggedInSubj.next(true);
      this.currentuserSubj.next(username);//he de traspassar-ho tot, no sols username
    } catch (err) {
      console.log(err);
      console.log('no hi ha usuari autenticat');
    }
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);
  }

  //POTSER NO CAL
  async getCurrentSession() {
    // this.auth_loadingSubj.next(true);
    this.auth_loading.set(true);

    try {
      const { accessToken, idToken } = (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};
      if(idToken){
        this.isLoggedInSubj.next(true);
        this.currentuserSubj.next(idToken.payload['email']);
        this.tokenSubj.next(idToken);
      }else{
        this.isLoggedInSubj.next(false);
        this.currentuserSubj.next(null);
        this.tokenSubj.next(null);
      }
      console.log('access token: '+accessToken);
      console.log('id token'+idToken);
    } catch (err) {
      console.log(err);
    }
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);

  }

  constructor() { }

  async handleSignIn({ username, password }: SignInInput) {
    // this.auth_loadingSubj.next(true);
    this.auth_loading.set(true);

    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        this.router.navigate(['/mock-turistear']);
        alert('signin successful!');
        this.isLoggedInSubj.next(true);
        this.getCurrentAuthenticatedUser();
      } else {
        alert('Signin successful! Next step:'+nextStep);
      }
    } catch (error) {
      alert('Error signing in: '+error);
    }
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);

  }

  async signUp(email: string, password: string, taxonomia:0|1, turistear:0|1): Promise<any> {
    // this.auth_loadingSubj.next(true);
    this.auth_loading.set(true);

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username:email,
        password,
        options: {
          userAttributes: {
            'custom:taxonomia': taxonomia.toString(),
            'custom:turistear': turistear.toString()
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
      alert('error signing up:'+error);
    }
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);

  }

  async handleSignUpConfirmation(confirmationCode:string) {
    // this.auth_loadingSubj.next(true);
    this.auth_loading.set(true);

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
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);

  }

  async handleAutoSignIn() {
    this.auth_loading.set(true);
    // this.auth_loadingSubj.next(true);
    try {
      const signInOutput = await autoSignIn();
      alert('autosignin completat!');
      if(signInOutput){
        alert('You are now logged in!');
        this.isLoggedInSubj.next(true);
        this.getCurrentAuthenticatedUser();
        this.router.navigate(['/mock-turistear']);
      }
    } catch (error) {
      console.log(error);
    }
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);

  }

  async handleSignOut() {
    this.auth_loading.set(true);
    // this.auth_loadingSubj.next(true);
    let signedOut:any=undefined;
    try {
      signOut({ global: true }).then(res=>{
        alert('signout completed!');
        this.router.navigate(['home'])});
        this.isLoggedInSubj.next(false);
        this.currentuserSubj.next(undefined);
    } catch (error) {
      console.log('error signing out: ', error);
    }
    // this.auth_loadingSubj.next(false);
    this.auth_loading.set(false);

  }

  
}
