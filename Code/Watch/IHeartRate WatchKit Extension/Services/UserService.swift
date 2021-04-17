//
//  UserService.swift
//  IHeartRate WatchKit Extension
//
//  Created by Bryce Schmisseur on 2/6/21.
//
// Services to perform all actions of Apple's oAuth Request

import Foundation
import AuthenticationServices

class UserService: NSObject, ASAuthorizationControllerDelegate  {
    
    ///Method for the autherication of the user if there is a user account all ready associated with the Apple's ID
    func pastUserRequest() {
        // Prepare requests for both Apple ID and password providers.
        let requests = [ASAuthorizationAppleIDProvider().createRequest(),
                        ASAuthorizationPasswordProvider().createRequest()]
        
        // Create an authorization controller with the given requests.
        let authorizationController = ASAuthorizationController(authorizationRequests: requests)
        authorizationController.delegate = self
        authorizationController.performRequests()
    }
    
    ///Method for the autherication of the user if the user id trying to create an account
    func authorizationAppleId() {
        //Creates object for Apples Authorization Providers
        let appleIDProvider = ASAuthorizationAppleIDProvider()
        
        //Creates a request object form the Apples Authorization Providers
        let request = appleIDProvider.createRequest()
        
        //Request for the Full name and the email of the user
        request.requestedScopes = [.fullName, .email]
        
        //Performs Apple's oAuth Request
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        authorizationController.performRequests()
        
    }
    
    /// Method to save the user credentials for the user
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        
        //Initializes varible to contain the user credentials of the user
        let appleIDCredential: ASAuthorizationAppleIDCredential = authorization.credential as! ASAuthorizationAppleIDCredential
            
        // Create an account in your system.
        let userIdentifier = appleIDCredential.user
        let fullName = appleIDCredential.fullName
        let email = appleIDCredential.email
        
        //Saves the user within the applicaiton
        session.user = User(id: userIdentifier)
    
        //Logs the information to the console
        NSLog("User Information \n\t ID: \(userIdentifier) \n\t Full Namme: \(String(describing: fullName)) \n\t Email: \(String(describing: email))")
    }
    
}
