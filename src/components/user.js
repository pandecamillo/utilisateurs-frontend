import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User(props) {

    const navigate = useNavigate();

    function goToRead(){
        navigate('read-user/'+ props.userid);
    }


    function capitalise(word){
        return word.charAt(0).toUpperCase()+ word.slice(1).toLowerCase();
    }


    //<img src="icons/edit.png" width="28px" alt="edit" onClick={goToUpdate}/>
    //<img src="icons/delete.png" width="28px" alt="delete" onClick={props.handleClick}/>

    return ( 
        <div className='user-container' onClick={goToRead}>
            <img id ="user-profile" className="user-profile" src={props.userprofile} alt="profile"/>
            <div className='user-info'>
                <h1 className='user-info-name'>{capitalise(props.usernom)} {capitalise(props.userprenom)}</h1>
                <p className="user-info-phone">+243 {props.userphone.slice(0,3)} {props.userphone.slice(3,6)} {props.userphone.slice(6,9)}</p>
            </div>
        </div>
        
     );
}

export default User;