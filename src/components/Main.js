 
require('styles/App.css');
require('styles/bootstrap.min.css');


import React from 'react';
import MainFrame from './drugWatcher/MainFrame2Component';
//import logo from '../favicon.svg';

let yeomanImage = require('../images/yeoman.png');
//<img src={yeomanImage} alt="Yeoman Generator" />

class AppComponent extends React.Component {
  render() {
	  
    return (
      <div className="index">
	  
		  <MainFrame/>
		
      
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
