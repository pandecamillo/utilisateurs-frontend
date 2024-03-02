import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderUser(props) {
// we will add atribute type 'ajout', 'modifier', 'lecture' if (lecture && image)
    const navigate = useNavigate()
    console.log(props.type)

    function goToApp(){
        navigate("/");
    }

    return ( 
       <header className='my-header-user'>
            <img className="back" src="icons/back.png" alt="back" onClick={goToApp}/>
            <h1>{props.type}</h1>
       </header>
     );
}

export default HeaderUser;