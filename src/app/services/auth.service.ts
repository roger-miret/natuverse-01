import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { autoSignIn, confirmSignUp, fetchAuthSession, fetchUserAttributes, signIn, signOut, signUp, type SignInInput } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { language, UserOrNull } from '../models/user';
import { resolveNavigation } from '../shared/helpers/navigation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router=inject(Router);

  pendingEmail:undefined|string;

  //STREAMS
  isLoggedInSubj = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubj.asObservable();

  userSubj = new BehaviorSubject<UserOrNull>(null);
  user$ = this.userSubj.asObservable();

  auth_loading$ = signal<boolean>(false);

  constructor() { }

  //POTSER NO CAL, atès que només obté userId i username, mentre que getCurrentSession obté més dades (token)
  // async getCurrentAuthenticatedUser() {
  //   // this.auth_loadingSubj.next(true);
  //   this.auth_loading.set(true);
  //   try {
  //     const { username, userId, signInDetails } = await getCurrentUser();
  //     console.log(`The username: ${username}`);
  //     console.log(`The userId: ${userId}`);
  //     console.log(`The signInDetails: ${signInDetails}`);//Abans això retornava valor, ara no ('undefined')(?)
  //     this.signinDetails=signInDetails;
  //     this.isLoggedInSubj.next(true);
  //     this.currentuserSubj.next(username);//he de traspassar-ho tot, no sols username
  //   } catch (err) {
  //     console.log(err);
  //     console.log('no hi ha usuari autenticat');
  //   }
  //   // this.auth_loadingSubj.next(false);
  //   this.auth_loading.set(false);
  // }

  //OBTÉ TOTA LA INFORMACIÓ NECESSÀRIA DE L'USUARI, ÉS EL QUE GENERALMENT ES CRIDA DES DELS COMPONENTS
  async getCurrentSession() {
    this.auth_loading$.set(true);

    try {
      const { accessToken, idToken } = (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};
      if(idToken){
        this.userSubj.next({
          sub: idToken.payload['sub']!,
          email: idToken.payload['email']! as string,
          email_verified: idToken.payload['email_verified'] as 'true'|'false',
          username: idToken.payload['cognito:username']!  as string,
          token: idToken!,
          turistear: idToken.payload['custom:turistear']!  as '0'|'1',
          taxonomia: idToken.payload['custom:taxonomia']! as '0'|'1',
          dark_mode_pref: idToken.payload['custom:dark_mode_pref']! as '0'|'1',
          language: idToken.payload['custom:language']! as language,
          isLoggedIn: true,
        });
        this.isLoggedInSubj.next(true);
      }else{
        this.isLoggedInSubj.next(false);
      }
      console.log('access token: '+accessToken);
      console.log('id token'+idToken);
    } catch (err) {
      console.log(err);
      this.isLoggedInSubj.next(false);
    }
    this.auth_loading$.set(false);
    //temporal mentre faig config
    this.router.navigate(['/config']);
  }

  //GET USER ATTRIBUTES
  async handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log(userAttributes);

    } catch (error) {
      console.log(error);
    }
  }
  //SIGNIN
  async handleSignIn({ username, password }: SignInInput) {
    this.auth_loading$.set(true);
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      if (isSignedIn) {
        alert('signin successful!');
        await this.getCurrentSession(); //abans tenia fetchAttributes
        const user = this.userSubj.getValue();
        resolveNavigation(user, this.router);
      }
      else {//no sé si cal
        alert('Signin looks successful but returned isSignedIn is false... Next step:'+nextStep);
      }
    } catch (error) {
      alert('Error signing in: '+error);
    }
    this.auth_loading$.set(false);
  }

  //SIGNUP
  async signUp(email: string, password: string, taxonomia:0|1, turistear:0|1): Promise<any> {
    this.auth_loading$.set(true);
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username:email,
        password,
        options: {
          userAttributes: {
            'custom:taxonomia': taxonomia.toString(),
            'custom:turistear': turistear.toString(),
            'custom:dark_mode_pref': '0',
            'custom:language': 'cat'
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
    this.auth_loading$.set(false);
  }

  //CONFIRM SIGNUP
  async handleSignUpConfirmation(confirmationCode:string) {
    this.auth_loading$.set(true);
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username:this.pendingEmail!,
        confirmationCode
      });
      alert('Code confirmed!');
      if (isSignUpComplete) {
        this.pendingEmail=undefined;
        await this.handleAutoSignIn();//cal await?
      } else {
        console.log('Next step:', nextStep); //Pro de moment no he configurat nextstep->default?
      }
    } catch (error) {
      console.log('error confirming sign up', error);
      alert('Error: insert a valid code');
    }
    this.auth_loading$.set(false);
  }

  //AUTO SIGN IN (DESPRÉS DE SIGN UP)
  async handleAutoSignIn() {
    this.auth_loading$.set(true);
    try {
      const signInOutput = await autoSignIn();
      alert('autosignin completat!');
      if(signInOutput.isSignedIn){
        alert('You are now logged in!');
        await this.getCurrentSession();
        resolveNavigation(this.userSubj.getValue(), this.router);
      }
    } catch (error) {
      console.log(error);
    }
    this.auth_loading$.set(false);
  }

  //SIGNOUT
  async handleSignOut() {
    this.auth_loading$.set(true);
    let signedOut:any=undefined;
    try {
      signOut({ global: true }).then(res=>{
        alert('signout completed!');
        this.router.navigate(['/auth/signin'])});
        this.isLoggedInSubj.next(false);
        this.userSubj.next(null);
    } catch (error) {
      console.log('error signing out: ', error);
    }
    this.auth_loading$.set(false);
  }
  
}
