//
//  Session.swift
//  IHeartRate WatchKit Extension
//
//  Created by Bryce Schmisseur on 2/7/21.
//
// Global variable to store information of the user

import Foundation

/// Sesssion object to create global varibale to store the user
class Session {
    var user:User // The current user object
    
    ///Initialization method of the `Session` object
    /// - warning: The parameters must not be null
    /// - parameters:
    ///     - user: a user object
    init(user:User) {
        self.user = user
    }
}

//Creates session varibale for the application to access
var session = Session(user: User(id: ""))
