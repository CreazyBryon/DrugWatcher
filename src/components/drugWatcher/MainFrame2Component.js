'use strict';

import React from 'react';
import DrugList from './DrugList2Component';
//require('styles/drugWatcher/DrugList.css');
require('styles/drugWatcher/MainFrame2.css');


class MainFrameComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {subPage: 'home'};
	}
	
	handleClick(e, pageStr) {
    e.preventDefault();
	this.setState({
						subPage : pageStr
					});
    console.log('The link was clicked.');
  }
	
  render() {
	  let subPage = this.state.subPage;
	  let subPageObj=null;
	  if(subPage=='home'){
		  subPageObj = <DrugList/>;
	  }else if(subPage=='about'){
		  subPageObj = <h1>about page</h1>;
	  }else if(subPage=='contact'){
		  subPageObj = <h1>contact page</h1>;
	  }
	  
    return (
      <div className="container">
      <div className="header clearfix">
        <nav>
          <ul className="nav nav-pills float-right">
            <li className="nav-item">
              <a className={`nav-link ${this.state.subPage=='home'?'active':''}`} href="#" onClick={(e)=> this.handleClick(e,'home')}>Home</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.subPage=='about'?'active':''}`} href="#" onClick={(e)=> this.handleClick(e,'about')}>About</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.subPage=='contact'?'active':''}`} href="#" onClick={(e)=> this.handleClick(e,'contact')}>Contact</a>
            </li>
          </ul>
        </nav>
        <h3 className="text-muted">Project name</h3>
      </div>

      <div className="jumbotron">
	  {subPageObj}
      </div>

      <footer className="footer">
        <p>© Company 2017</p>
      </footer>

    </div>
    );
  }
}

//DrugListComponent.displayName = 'MyDrugWatcherDrugListComponent';

// Uncomment properties you need
// DrugListComponent.propTypes = {};
// DrugListComponent.defaultProps = {};

export default MainFrameComponent;
