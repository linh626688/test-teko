import React from "react";
import Categories from "../categories/Categories";
import './App.css'
import LogoIcon from '../../assert/images/logo.png'

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-header">
        <img className="app-logo" alt="logo" src={LogoIcon}/>
        <div className="app-title-page">Matthew Computer store</div>
      </div>
      <div className="app-content">
        <div className="app-sticky-content">
          <Categories/>
        </div>
      </div>
    </div>
  );
}

export default App;
