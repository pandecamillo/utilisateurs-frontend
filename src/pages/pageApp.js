import React from 'react';
import axios from 'axios';
import User from '../components/user';
import Header from '../components/header';
import Footer from '../components/footer';

function PageApp(){
    const [users, setUsers] = React.useState([]);
    const [pageLoaded, setLoaded] = React.useState(false);

    React.useEffect(function(){
        console.log('effect')
        async function fetchAllUsers(){
            try{
                const appMessage = document.getElementById('app-message');
                console.log('send request')
                appMessage.innerHTML = waitElement;
                const res = await axios.get('https://backendutilisateurs.onrender.com/users');
                appMessage.style.display="none";
                console.log('get response')
                setUsers(res.data);
                setLoaded(true);
            }catch{
                const appMessage = document.getElementById('app-message');
                appMessage.innerHTML = requestFalureElement;
                //document.getElementById("container")
                //.innerHTML = "<p>Erreur lors de la connection au server.</p>";
            }          
        }
        fetchAllUsers();
    },[])

    let usersElements = []

    if(users != []){
        usersElements = users.map(
            user=>{
                return(
                  <User
                    key = {user.userid}
                    {...user}
                  />
                    )      
            }      
        );
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
                console.log(pageLoaded)
                console.log('render')
                console.log(users)

    return(
       <div className="app-container">
            <Header/>
            {pageLoaded && usersElements.length === 0 && (
                <p>Aucun Utilisateur</p>
            )}
            {pageLoaded &&(
             <div className='user-list-container'>
                {usersElements}
            </div>)}
            <div id = "app-message" className="app-message"></div>
            {pageLoaded && <Footer/>}    
        </div>
    )
}
export default PageApp;