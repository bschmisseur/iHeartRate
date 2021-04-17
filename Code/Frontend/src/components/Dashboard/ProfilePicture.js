import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AWS from 'aws-sdk'
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Loading from './../Navigation/Loading';
import UserService from './../../services/UserService';


const S3_BUCKET ='iheartrate-pictures';
const REGION ='us-west-1';


AWS.config.update({
    accessKeyId: 'AKIA4CZAE7UDP6PCURON',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: '100px',
        height: '100px',
        marginTop: '25px',
        marginBottom: '25px',
        alignSelf: 'center'
    },
}));

const ProfilePicture = (props) => {
    useEffect(() => {
        UserService.get(props.curAppleId).then(response => {
            let user = response[0];
            if(user === undefined){

            } else {
                let profilePicture = user["profilePicture"];
                setPictureSRC('https://iheartrate-pictures.s3-us-west-1.amazonaws.com/' + profilePicture);
            }  
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const classes = useStyles();

    const [pictureSRC, setPictureSRC] = useState(" ")
    const inputFileMenu = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileInput = (e) => {
        setPictureSRC(URL.createObjectURL(e.target.files[0]));
        uploadFile(e.target.files[0]);
    }

    const handleIconButton = () => {
        inputFileMenu.current.click();
    }

    const uploadFile = async (file) => {
        setIsLoading(true);
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {

            })
            .send((err) => {
                if (err) console.log(err)
            })

        UserService.get(props.curAppleId).then(response => {
        let user = response[0];
        console.log(user);

        if(user === undefined){
            let json = JSON.stringify({
                "_id": "",
                "displayName": props.displayName,
                "appleId" : props.curAppleId,
                "profilePicture": file.name,
                });

            UserService.saveUser(json);
        } else {
            let json = JSON.stringify({
                "_id": user["_id"],
                "displayName": props.displayName,
                "appleId" : props.curAppleId,
                "profilePicture": file.name,
                });
            UserService.update(json)
            
        }
        })
        setIsLoading(false);
    }

    var iconButton = <IconButton style={{width: '75px', height: '75px', margin: '5px'}}className={classes.avatar} onClick={handleIconButton}>
                        <Avatar style={{width: '50px', height: '50px'}} src={pictureSRC} alt={props.displayName}>
                        {props.displayName.charAt(0)}
                        </Avatar>
                    </IconButton>;
    if(!props.small){
        iconButton = <IconButton className={classes.avatar} onClick={handleIconButton}>
                        <Avatar style={{width: '75px', height: '75px'}} src={pictureSRC} alt={props.displayName}>
                        {props.displayName.charAt(0)}
                        </Avatar>
                    </IconButton>;
    }

    return (
    <div>
        <input accept="image/*" id="contained-button-file" onChange={handleFileInput} style={{display: 'none' }} ref={inputFileMenu} type="file"/>
            {iconButton}
        <Loading open={isLoading}/>
    </div>
    )
}

export default ProfilePicture;