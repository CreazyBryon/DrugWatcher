 
require('styles/App.css');

import React from 'react';
import DrugList from './drugWatcher/DrugListComponent';
import MyCalculator from './drugWatcher/MyCalculator';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Hello world!</div>
		<DrugList />
		<MyCalculator/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
