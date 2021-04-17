//
//  HeartRate.swift
//  IHeartRate WatchKit Extension
//
//  Created by Bryce Schmisseur on 1 Febuary 2021
//
//  Creates a Heart Rate object in order to store the properties of the heart rate

import UIKit

///Heart rate object model to store properties of heart rate
struct HeartRate: Codable {
    
    //MARK: Properties
    
    var bpm: Int // measure of heart rate
    var date: Date // the date in which the heart rate was recorded
    var userid: String // the unique identifier of the user
    
    //MARK: Initialization
    
    ///Initialization method of the `Heart Rate` object
    /// - warning: The parameters must not be null
    /// - parameters:
    ///     - bpm: the mesure of heart rate
    ///     - userid: the unique identifier of the user
    init(bpm: Int, userid: String){
        
        self.bpm = bpm
        self.date = Date()
        self.userid = userid
    }
    
    //MARK: Methods
    
    /// This function is used for testing in order to log the `Heart Rate` object information to the console
    /// - Returns: Logs out the heart rate information within the object using NSLog
    func log() {
        let dateFormat = DateFormatter();
        dateFormat.dateFormat = "yyyy-MM-dd HH:mm:ss";
        NSLog("Heart Rate \n\t BPM: %i \n\t Date: %@", self.bpm, dateFormat.string(from: self.date))
    }
    
    /// This function is used for to encode the contents of the
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(bpm, forKey: .bpm)
        try container.encode(date, forKey: .date)
        try container.encode(userid, forKey: .userid)

    }
}
