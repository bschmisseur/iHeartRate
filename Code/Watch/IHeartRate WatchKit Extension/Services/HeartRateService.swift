//
//  HeartRateService.swift
//  IHeartRate WatchKit Extension
//
//  Created by Bryce Schmisseur on 2/4/21.
//
//  Services to setup the Workout and Healthkit and send HTTP request with the heart rate information

import WatchKit
import Foundation
import HealthKit

///Services to setup the Workout and Healthkit and send HTTP request with the heart rate information
class HeartRateService: NSObject, HKWorkoutSessionDelegate, HKLiveWorkoutBuilderDelegate {
    
    //MARK: Properties

    let healthKitStore:HKHealthStore = HKHealthStore(); //Initalizes HealthStore for health kit
    var session: HKWorkoutSession? //Declares workout session from apples library
    var builder: HKLiveWorkoutBuilder? // Delares workout builder from apple's library
    var userid: String = "" //Declares a string for the user id
    
    //MARK: Methods
    func setUserId(userid: String){
        self.userid = userid;
    }
    
    ///Setup method is to ensure the user has agreeded to the terms of Apple's healthkit
    /// - warning: The parameters must not be null
    /// - parameters:
    ///     - userid: the unique identifier of the user gernerated from Apple's oAuth request
    func setUp() {
        //Sets userid to the given userid
        
        //Create a set for the varibles that are being recorded
        let healthKitRead : Set<HKObjectType> = [HKObjectType.quantityType(forIdentifier: HKQuantityTypeIdentifier.heartRate)!];
        
        //Creates a set for the varibles that we are writing too
        let healthKitWrite : Set<HKSampleType> = [];
        
        //Checks to see if there is health data to read
        if !HKHealthStore.isHealthDataAvailable()
        {
            NSLog("Error Occrued: No Health Data");
            return;
        }
        
        //Declares and Instantiate Health to request information from the user
        let healthStore = HKHealthStore()
        healthStore.requestAuthorization(toShare: healthKitWrite, read: healthKitRead) { (success, error) -> Void in
            NSLog("Authorization For Health Kit Accepted")
        }
        
        // The quantity type to write to the health store.
        let typesToShare: Set = [
            HKQuantityType.workoutType()
        ]

        // The quantity types to read from the health store.
        let typesToRead: Set = [
            HKQuantityType.quantityType(forIdentifier: .heartRate)!
        ]

        // Request authorization for those quantity types.
        healthStore.requestAuthorization(toShare: typesToShare, read: typesToRead) { (success, error) -> Void in
            NSLog("Authorization For Workout Kit Accepted")
        }
    }
    
    ///Starts a work out in order to grab more data points of the users heart rate
    /// - warning: The user must accept the Healthkit pararmeters
    func startRecording() {
        //Creates configuration varibles needed for the workout
        let workoutConfig = HKWorkoutConfiguration()
        workoutConfig.activityType = .walking
        workoutConfig.locationType = .outdoor
        
        // do catch to create the workout
        do {
            session = try HKWorkoutSession(healthStore: healthKitStore, configuration: workoutConfig)
            builder = session!.associatedWorkoutBuilder()
        } catch {
            NSLog("Error Creating WorkoutSession within Do Catch")
            return
        }
        
        //Creates a datasource object to hold the information being recorded
        builder!.dataSource = HKLiveWorkoutDataSource(healthStore: healthKitStore, workoutConfiguration: workoutConfig)

        //Creates Delages to know when new inforamtion is coming in to the objects
        session!.delegate = self
        builder!.delegate = self
        
        //Starts the activity and begins collecting data
        session!.startActivity(with: Date())
        builder!.beginCollection(withStart: Date()) { (success, error) in
            
            guard success else {
                NSLog("Error Starting Workout")
                return
            }
            
            //Confiramtion that the work out has started
            NSLog("Workout Started")
        }
    }
    
    ///Stop recording  and the workout of the users heart rate
    func stopRecording() {
        //Ends the workoutSession and the workoutBuilder
        session!.end()
        builder!.endCollection(withEnd: Date(), completion: { (success, error) in
            self.builder!.finishWorkout(completion: { (successIn, errorIn) in
                    
                guard successIn != nil else {
                    NSLog("Error Stoping workout")
                    return
                }
                
                DispatchQueue.main.async {
                    //Confirmation that the workout has stopped
                    NSLog("Stoped Workout")
                }
            })
        })
    }
    
    //MARK: Inheritied Methods
    
    ///Inherited method to grab the heart rate from the apple watch every time it is recoded
    ///This method also deals with sending the HTTP request to the backend server
    /// - warning: The parameters must not be null
    /// - parameters:
    ///     - workoutBuilder: HKLiveWorkoutBuilder object
    ///     - didCollectDataOf: didCollectDataOf list of collected data from the apple watchs
    func workoutBuilder(_ workoutBuilder: HKLiveWorkoutBuilder, didCollectDataOf collectedTypes: Set<HKSampleType>) {
        //Declares Varibles
        let heartRateUnit = HKUnit(from: "count/s")
        var heartRate:Int?
        
        //Loops throught the data collected
        for type in collectedTypes {
            guard let quantityType = type as? HKQuantityType else {
                return // Nothing to do.
            }
            
            DispatchQueue.main.async()
            {
                // Calculate statistics for the type.
                let statistics = workoutBuilder.statistics(for: quantityType)
                let recentQuantity = statistics?.mostRecentQuantity()
                
                //Checks to see if the data collected is a heart rate
                if (recentQuantity?.is(compatibleWith: heartRateUnit))!
                {
                    //Converts heart rate from count/s to count/min
                    heartRate = (Int)((recentQuantity?.doubleValue(for: heartRateUnit))! * 60)
                    NSLog("Current Heart Rate is \(heartRate!)")
                    
                    //Create Heart Rate Object
                    let currentHeartRate = HeartRate(bpm: heartRate!, userid: self.userid)
                    
                    let dateformatter = DateFormatter()
                    dateformatter.timeZone = TimeZone.current
                    dateformatter.dateFormat = "yyyy-MM-dd HH:mm:ss"

                    let date = dateformatter.string(from: currentHeartRate.date)
                    
                    //Creates JSON
                    let params: [String: Any] = [
                        "bpm": currentHeartRate.bpm,
                        "date": date,
                        "userid": currentHeartRate.userid
                    ]
                    
                    //Sets the url for the rest service call
                    let urlString:String = "https://iheartrate-back.herokuapp.com/api/heartrate/"
                    let url = URL(string: urlString)
                    
                    //Creates a request obejct with HTTP POST method
                    var request = URLRequest(url: url!)
                    request.httpMethod = "POST"
                    request.httpBody = try! JSONSerialization.data(withJSONObject: params, options: .prettyPrinted)
                    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
                    request.addValue("application/json", forHTTPHeaderField: "Accept")
                    
                    //Pushes the data to the rest services
                    URLSession.shared.getAllTasks { (openTasks: [URLSessionTask]) in
                        NSLog("open tasks: \(openTasks)")
                    }

                    //Infroamtion recived by the rest service
                    let task = URLSession.shared.dataTask(with: request, completionHandler: { (responseData: Data?, response: URLResponse?, error: Error?) in
                        NSLog("\(String(describing: response))")
                    })
                    task.resume()
                }
            }
        }
    }
    
    func workoutSession(_ workoutSession: HKWorkoutSession, didChangeTo toState: HKWorkoutSessionState, from fromState: HKWorkoutSessionState, date: Date) {
        
    }
    
    func workoutSession(_ workoutSession: HKWorkoutSession, didFailWithError error: Error) {
        
    }
    
    func workoutBuilderDidCollectEvent(_ workoutBuilder: HKLiveWorkoutBuilder) {
        
    }
}
