//
//  InterfaceController.swift
//  IHeartRate WatchKit Extension
//
//  Created by Bryce Schmisseur on 2/3/21.
//
//

import WatchKit
import Foundation
import AuthenticationServices
import HealthKit

class InterfaceController: WKInterfaceController {
    
    //MARK: UI Properties
    
    //Delcares Variables
    @IBOutlet var startStopButton: WKInterfaceButton! // Varible to assign onClick methods for start and stop button
    @IBOutlet weak var signIn: WKInterfaceAuthorizationAppleIDButton! // Variable to Apple ID Button
    
    override func willActivate() {
        heartRateService.setUp();
    
    }
    
    //MARK: Properties
    
    var isRecording: Bool = false //Boolean value of if the application is recording or not
    var heartRateService = HeartRateService() //Heart rate service to use methods of saving the information
    var userService = UserService() // User service object in order user methods of saving a user
    
    //MARK: Button Methods

    ///On Click method for the start stop button in order to start/stop recording the users heart rate information
    @IBAction func startStop(){
        //Determinds if the user is starting or stopping recording
        if(!isRecording){
            //Ensures HealthKit and WorkoutKit is enabled
            heartRateService.setUserId(userid: session.user.id)
            
            //Sets isRecoding to True
            isRecording = true
            
            //Changes the display of the button to STOP
            heartRateService.startRecording()
            let attString = NSMutableAttributedString(string: "Stop")
            attString.setAttributes([NSAttributedString.Key.foregroundColor: UIColor(hue: 0, saturation: 1, brightness: 1.0, alpha: 1.0)], range: NSMakeRange(0, attString.length))
            startStopButton.setAttributedTitle(attString)
            startStopButton.setBackgroundColor(UIColor(hue: 0.0083, saturation: 0.77, brightness: 1, alpha: 0.29))
        } else {
            //Sets isRecording to False
            isRecording = false
            
            //Changes the display of the button to START
            heartRateService.stopRecording()
            let attString = NSMutableAttributedString(string: "Start")
            attString.setAttributes([NSAttributedString.Key.foregroundColor: UIColor(hue: 0.3722, saturation: 1, brightness: 1.0, alpha: 1.0)], range: NSMakeRange(0, attString.length))
            startStopButton.setAttributedTitle(attString)
            startStopButton.setBackgroundColor(UIColor(hue: 0.3722, saturation: 1, brightness: 1.0, alpha: 0.29))
        }
    }
    
    ///On click method to complete the proeccess of authorizing the user
    @IBAction func pushAppleID() {
        userService.authorizationAppleId()
        
        pushController(withName: "Home", context: nil)
    }
}
