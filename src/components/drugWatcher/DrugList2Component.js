'use strict';

import React from 'react';
import HttpService from '../../services/httpService';

require('styles/drugWatcher/DrugList.css');

function ListItem(props) {
 
  function handleClick(e) {
    e.preventDefault();
    props.clickHandler(props.drug);
  }
  
  return <div className="row">
        <div className="col-3"><a href='#' onClick={handleClick}>{props.drug.Name}</a></div>
        <div className="col-3">{props.drug.Category}</div>
        <div className="col-3">{props.drug.Amount+' '+props.drug.Unit}</div>
        <div className="col-3">{props.drug.UpdateTime}</div>
      </div>;
}



class ItemDetail extends React.Component {
	constructor(props){
        super(props)
		
        this.state={
            drug:props.drug
        };
		
		this.handleChange = this.handleChange.bind(this);
		  
    }
	
	handleChange(event) {
		let updateData=this.state.drug;
		updateData.Name=event.target.value;
    this.setState({updateData});
  }
	
	render(){
	 
		
		return <div><div className="row">
			<div className="col-3">Name</div>
			<div className="col-9"><input type="text" value={this.props.drug.Name} onChange={this.handleChange}/></div>
		  </div>
		  <div className="row">
			<div className="col-3">Category</div>
			<div className="col-9">{this.props.drug.Category}</div>
		  </div>
		  <div className="row">
			<div className="col-3">Amount</div>
			<div className="col-9">{this.props.drug.Amount+' '+this.props.drug.Unit}</div>
		  </div>	  
		  <div className="row">
			<div className="col-3">Remark</div>
			<div className="col-9">{this.props.drug.Remark}</div>
		  </div>
		  <div className="row">
			<div className="col-3"></div>
			<div className="col-9"><a href='#' onClick={this.props.clearClick}>Back</a></div>
		  </div>		  
		  </div>
		  
		  ;
	}
}

function loadData(handleRes){
	var res={};
	
	HttpService.jsonp({
		//url: 'http://localhost:3000/api/drug/data',
		url: 'http://localhost:3000/statics/list.js',
		data:{name:123},
		success: res => {
			 
			if (res.retCode == 0) {
				handleRes(res.data);
			} else {
				console.log(res);
			}
		}
	});
	
	return res;
}

class DrugListComponent extends React.Component {
	constructor(props){
        super(props)
		
        this.state={
            
            list:[], 
            selectedDrug:null
        };
		
		this.selectDrug = this.selectDrug.bind(this);
		
		this.clearSelectedDrug = this.clearSelectedDrug.bind(this); 
    }
	
	selectDrug(drugEntity){
		this.setState({selectedDrug:drugEntity});
	}
	
	clearSelectedDrug(){
		this.setState({selectedDrug:null});
	}	
	
  render() {
	let resCtrl=null;
	if(this.state.selectedDrug){
		resCtrl=<ItemDetail drug={this.state.selectedDrug} clearClick={this.clearSelectedDrug}/>
	}else{
	  //const drugList = [{DrugName:'danggui',DrugRemark:'danggui remark2'}, {DrugName:'fuzi',DrugRemark:'fuzi remark'}, 3, 4, 5];
	    resCtrl = this.state.list.map((drug,index) =>
			// Correct! Key should be specified inside the array.
			<ListItem key={index} drug={drug} clickHandler={this.selectDrug} />
		  );
	}
    return (
      <div className="druglist-component">
		{resCtrl}
      </div>
    );
  }
  
	componentDidMount(){
  var thisHandler=this;
  /*
  this.timerID = setInterval(
      () => loadData(function(resList){
						thisHandler.setState({
						list : resList
					})
})
      ,1000
    );
*/

loadData(function(resList){
						thisHandler.setState({
						list : resList
					})
});
 
    }
	
	componentWillUnmount() {
    clearInterval(this.timerID);
  }
}

DrugListComponent.displayName = 'MyDrugWatcherDrugListComponent';

// Uncomment properties you need
// DrugListComponent.propTypes = {};
// DrugListComponent.defaultProps = {};

export default DrugListComponent;
