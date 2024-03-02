import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header(props) {

    const navigate = useNavigate()
    
    function goToAdd(){
        navigate("new-user");
    }

    return ( 
       <header className='my-header'>
            <h1>UTILISATEURS</h1>
            <button onClick={goToAdd} className='btn-add-new-user'>
                <img src="icons/add.png" alt="add" width={25}/>
                <p>Nouveau</p>
            </button>
       </header>
     );
}

export default Header;