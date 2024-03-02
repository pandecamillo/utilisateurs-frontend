import React from 'react';
import ReactDOM from 'react-dom/client';
import PageApp from './pages/pageApp'
import PageUserAdd from './pages/pageUserAdd'
import PageUserEdit from './pages/pageUserEdit'
import PageUserRead from './pages/pageUserRead';
import Page404 from './pages/page404'
import './style.css';
import {HashRouter, Routes, Route} from 'react-router-dom';

function PageRouter(){
  return(
    <HashRouter>
      <Routes>
          <Route path='/' element={<PageApp/>}/>
          <Route path='new-user' element={<PageUserAdd/>}/>
          <Route path='update-user/:id' element={<PageUserEdit/>}/>
          <Route path='read-user/:id' element ={<PageUserRead/>}/>
          <Route path='*' element={<Page404/>}/>
      </Routes>
    </HashRouter>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root')
  );

root.render(
<PageRouter/>
)

