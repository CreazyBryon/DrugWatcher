 
require('styles/App.css');
require('styles/bootstrap.min.css');


import React from 'react';
import MainFrame from './drugWatcher/MainFrame2Component';



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
