import { useState } from 'react';
import NavBar from './../components/Navigation/NavBar';
import Header from './../components/Home/Header';
import HowItWorks from './../components/Home/HowItWorks';
import Footer from './../components/Navigation/Footer';
import firebase from 'firebase';
import Cookies from 'universal-cookie';
import Loading from './../components/Navigation/Loading';

const Home = (props) => {
    const cookies = new Cookies();

    if(cookies.get('currAppleId') !== undefined){
        window.location.href = '/Dashboard'
    }

    const [isLoading, setIsLoading] = useState(false);

    var provider = new firebase.auth.OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');

    const onSignIn = () => {
        firebase.auth().signInWithRedirect(provider);
        setIsLoading(true);
    }

    // Result from Redirect auth flow.
    firebase
        .auth()
        .getRedirectResult()
        .then((result) => {
            if (result.credential) {
                setIsLoading(true);
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // You can get the Apple OAuth Access and ID Tokens.
                // eslint-disable-next-line no-unused-vars
                var accessToken = credential.accessToken;
                // eslint-disable-next-line no-unused-vars
                var idToken = credential.idToken;

                // ...
            }
            // The signed-in user info.
            var appleId = result.additionalUserInfo.profile.sub;
            var user = result.user;
            cookies.set('currAppleId', appleId);
            cookies.set('displayName', user.displayName);
            window.location.href = "/Dashboard";
        }).catch((error) => {
            // Handle Errors here.
            // eslint-disable-next-line no-unused-vars
            var errorCode = error.code;
            // eslint-disable-next-line no-unused-vars
            var errorMessage = error.message;
            // The email of the user's account used.
            // eslint-disable-next-line no-unused-vars
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // eslint-disable-next-line no-unused-vars
            var credential = error.credential;

            // ...
        });

    return (
        <div style={{width: '100%'}}>
            <NavBar onSignIn={onSignIn}/>
            <Header/>
            <HowItWorks/>
            <Footer/>
            <Loading open={isLoading}/>
        </div>
    )
}

export default Home
