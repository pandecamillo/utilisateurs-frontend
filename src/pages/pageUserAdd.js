import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import defaultImage from '../components/defaultImage';
import HeaderUser from '../components/headerUser';

function PageUserAdd(){
    const [user, setUser] = React.useState({usernom:'', userprenom:'', userphone:'', userprofile:defaultImage});
    
    function handleChange(event){
        setUser(prev=> ({...prev, [event.target.name] : event.target.value}))
    }

    const navigate = useNavigate() 

    function goToApp(){
      navigate("/");
    }



    async function addUser(){
        if(user.usernom === '' || user.userprenom === ''){
          alert('Vous devez remplir le champ')
          return;
      }
      if(!user.userphone){
        alert("Veuillez donner votre numero");
        return;
      }
      if(user.userphone.length != 9){
        alert("Votre numero doit avoir 9 chiffres")
        return;
      }
      if(!user.userprofile){
        setUser(prev=> ({...prev, userprofile:defaultImage}))  
      }
      document.getElementById('btn-ajout').disabled = true;
      try{
        console.log('send request')
        document.getElementById('info-message').style.visibility="visible";
        await axios.post('https://backendutilisateurs.onrender.com/user', user)
        document.getElementById('info-message').style.visibility="hidden"
        console.log('get response')
        goToApp();
      }catch{
        console.log("Erreur lors de l'ajout")
        const appMessage = document.getElementById('app-message');
        appMessage.innerHTML = requestFalureElement;
          //document.getElementById("container")
          //.innerHTML = "<p>Erreur lors de la connection au server.</p>";
      }
    }

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

      function convertToBase64(file){
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          () => {
            setUser(user=>({...user, userprofile:reader.result}));
            console.log(user)
          },
          false,
        );
      
        if (file) {
          reader.readAsDataURL(file);
        }       
      }

      function importData() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
          // you can use this method to get file and perform respective operations
                  let files = Array.from(input.files)[0];
                  convertToBase64(files);
              };
        input.click();      
      }

      function handlePhone(event){
        if(user.userphone.length === 9){
            console.log(user.userphone)
            event.preventDefault();
        } 
      }

    return(
        <div className='app-container'>
          <HeaderUser type="NOUVEAU UTILISATEUR"/>
          <p className="info-message" id="info-message">Veuillez patienter ...</p>
          <div className='form'>
              <div className="user-profile-input">
                <img id ="user-profile" className="user-profile" src={user.userprofile} alt="profile" onClick={importData}/>
                <img src="icons/camera.png" alt="camera" className="btn-camera" onClick={importData}/>
              </div>
              <input autoComplete='off' maxLength={15}  type="text" name="usernom" onChange={handleChange} placeholder='Votre nom' value={user.usernom}/>
              <input autoComplete='off' maxLength={15}  type="text" name="userprenom" onChange={handleChange} placeholder='Votre prenom' value={user.userprenom}/>
              <div className="phone-input">
                <label htmlFor="userphone">+243</label>
                <input autoComplete='off' type="number" name="userphone" placeholder='Votre telephone' onChange={handleChange} onKeyPress={handlePhone} value={user.userphone}/>
              </div>
              <button className='btn-add-user' onClick={addUser} id="btn-ajout">AJOUTER</button>
          </div>
          </div>
    )
}
export default PageUserAdd;