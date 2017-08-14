'use strict';

import React from 'react';
import DrugList from './DrugListComponent';
//require('styles/drugWatcher/DrugList.css');

class MainFrameComponent extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
			  <a className="navbar-brand" href="#">Navbar</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarsExampleDefault">
				<ul className="navbar-nav mr-auto">
				  <li className="nav-item active">
					<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
				  </li>
				  <li className="nav-item">
					<a className="nav-link" href="#">Link</a>
				  </li>
				  <li className="nav-item">
					<a className="nav-link disabled" href="#">Disabled</a>
				  </li>
				  <li className="nav-item">
					<a className="nav-link" href="#">My Menu</a>
				  </li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
				  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
				  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
		<div className="container">

			<div className="starter-template">
				<h1>Bootstrap starter template</h1>
				<p className="lead">Use this document as a way to quickly start any new project.
					<br/> All you get is this text and a mostly barebones HTML document.
				</p>
			</div>
			<DrugList/>
		</div>
      </div>
    );
  }
}

//DrugListComponent.displayName = 'MyDrugWatcherDrugListComponent';

// Uncomment properties you need
// DrugListComponent.propTypes = {};
// DrugListComponent.defaultProps = {};

export default MainFrameComponent;
