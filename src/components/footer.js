import React from 'react';

function Footer(props) {

    function goToWhatsappChat(){
        window.location.href = "https://wa.me/+243893196755";
    }
    
    return ( 
       <footer id="footer" className='my-footer'>
                <small>Créer par <span style={{fontWeight:"bold"}}>Camillo Pande</span></small>
                <button  className="btn-whatsapp" onClick={goToWhatsappChat}>
                    <img src="icons/whatsapp.png" alt="whatsapp"  width={35}/>
                    <p>Contactez moi</p>
                    </button>
       </footer>
     );
}

export default Footer;