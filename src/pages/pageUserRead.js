import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import defaultImage from '../components/defaultImage';
import HeaderUser from '../components/headerUser';

function PageUserRead(){
    const [user, setUser] = React.useState({usernom:'', userprenom:'', userphone:'', userprofile:defaultImage});
    const [pageLoaded, setLoaded] = React.useState(false);
    const location = useLocation();

    const locationuserid= location.pathname.split('/')[2];
    console.log('read user :' + locationuserid)

    React.useEffect(function(){
        async function getUserData(iduser){
            try{
              const appMessage = document.getElementById('app-message');
              console.log('send request')
              appMessage.innerHTML = waitElement;
              const res = await axios.get('https://backendutilisateurs.onrender.com/user/' + iduser )
              appMessage.style.display="none";
              console.log('get response')
              setUser({usernom:res.data[0].usernom,userprenom:res.data[0].userprenom,userphone:res.data[0].userphone, userprofile:res.data[0].userprofile})
              setLoaded(true)
            }catch(e){
              const appMessage = document.getElementById('app-message');
              appMessage.innerHTML = requestFalureElement;
              console.log("Erreur lors de la connection au server" + e)
        }
            
        }
        getUserData(locationuserid);
    },[locationuserid])

    const navigate = useNavigate() 

    function goToEdit(){
      navigate("/update-user/"+locationuserid)
    }

    function goToApp(){
        navigate('/')
    }

   async function deleteUser(){
            try{
              console.log("send request")
              document.getElementById('info-message').style.visibility="visible";
                await axios.delete('https://backendutilisateurs.onrender.com/user/' + locationuserid);
                document.getElementById('info-message').style.visibility="hidden"
                console.log("get response")
                goToApp()
            }catch{
             console.log("error server")
            }    
    }

    function capitalise(word){
      return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
  }

    const waitElement = `<img
                            src="icons/wait.gif"
                            style="width:80%;"
                          />`
    const requestFalureElement = `<img
                                        src="icons/no-wifi.png"
                                        style="width:100%;"
                                    />
                                    <p 
                                    style="font-weight:bolder;
                                    font-size:1rem;
                                     margin:20px;
                                     text-align:center;
                                      color: orange">
                                    Erreur au niveau du serveur
                                    </p>
                                    <small style="font-weight:small;font-size:small; margin:20px; text-align:center">
                                        Veuillez réessayer plus tard
                                    </small>`

    return(
      <div className='app-container'>
        <HeaderUser type="INFO DE L'UTILISATEUR"/>
              {!pageLoaded && <div id = "app-message" className="app-message"></div>}
               {pageLoaded && (
                <div className="user-read">
                      <p id="info-message" className="info-message">Veuillez patienter ...</p>
                      <img id ="user-profile" className="user-profile-read" src={user.userprofile} alt="profile"/>
                      <div className="user-info-read">
                        <p>Nom : <span>{capitalise(user.usernom)}</span></p>
                        <p>Prenom : <span>{capitalise(user.userprenom)}</span></p>
                        <p>Contact : <span>+243 {user.userphone.slice(0,3)} {user.userphone.slice(3,6)} {user.userphone.slice(6,9)}</span></p>
                      </div>
                  </div>
               )}
        {pageLoaded && (
          <div className="user-controls">
          <img src="icons/delete.png" alt="delete" width={45} onClick={deleteUser}/>
          <img src="icons/edit.png" alt="edit" width={45} onClick={goToEdit}/>
      </div>
        )}
      </div>
    )
}
export default PageUserRead;