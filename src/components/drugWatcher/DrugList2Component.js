'use strict';

import React from 'react';
import HttpService from '../../services/httpService';

require('styles/drugWatcher/DrugList.css');


const FAKE_DATA={retCode:0,data:[
  {No:1, Name:'麻黄', Remark:'辛、微苦，温。归肺、膀胱经⒈辛温解表⒉宣肺平喘⒊利水消肿', Category:'解表药',Unit:'两', Amount:'12', UpdateTime:'2017-01-01'},
  {No:2, Name:'防风', Remark:'辛、甘，微温。归膀胱、肝、肺、脾经⒈辛温解表⒉除湿止痛⒊祛风止痉⒋透疹止痒', Category:'解表药',Unit:'两', Amount:'15', UpdateTime:'2017-01-01'},
  {No:3, Name:'薄荷', Remark:'辛，凉。归肺、肝经⒈辛凉解表⒉清利头目⒊利咽透疹⒋疏肝解郁', Category:'解表药',Unit:'两', Amount:'12', UpdateTime:'2017-01-01'},
  {No:4, Name:'桑叶', Remark:'苦、甘，寒。归肝、肺经⒈疏散风热⒉清肺润肺⒊清肝明目', Category:'解表药',Unit:'两', Amount:'12', UpdateTime:'2017-01-01'},
  {No:5, Name:'独活', Remark:'辛、苦，微温。归肾、膀胱经⒈祛风除湿⒉散寒止痛', Category:'祛风湿药',Unit:'两', Amount:'12', UpdateTime:'2017-01-01'},
  {No:6, Name:'藿香', Remark:'辛、微温。归脾、胃、肺经⒈化湿解暑⒉和中止呕⒊辛温解表', Category:'祛湿药',Unit:'两', Amount:'12', UpdateTime:'2017-01-01'},
  {No:7, Name:'石膏', Remark:'辛、甘，大寒。归肺、胃经⒈清热泻火⒉除烦止渴⒊生肌收敛', Category:'清热药',Unit:'两', Amount:'12', UpdateTime:'2017-02-01'}
  
]};

const Category_List=[
{text:'解表药',val:'解表药'},
{text:'祛风湿药',val:'祛风湿药'},
{text:'祛湿药',val:'祛湿药'},
{text:'清热药',val:'清热药'}
];

const Unit_List=[
{text:'两',val:'两'},
{text:'斤',val:'斤'},
{text:'克',val:'克'},
{text:'千克',val:'千克'}
];

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


function MySelect(props){
	let options=props.list.map((item, index) => 
		<option key={index} value={item.val}>{item.text}</option> 
	);
	return <select className="form-control" value={props.selectedVal} onChange={props.changeHandler} name={props.name}>
	{options}
	</select>;
}


class ItemDetail extends React.Component {
	constructor(props){
        super(props)
		
        this.state={
			curDrug:JSON.parse(JSON.stringify(props.drug))
        };
		
		this.handleChange = this.handleChange.bind(this);
		this.okClick = this.okClick.bind(this);		  
    }
	 
	
	handleChange(event) {
		let updateData=this.state.curDrug; 
		
		
		const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name.slice(3);
 
      updateData[name]= value;
   this.setState({updateData});
  }
  
  okClick(event){
	  //this.setState({drug});
	  this.props.drug.Name=this.state.curDrug.Name;
	  
	          for (var prop in this.state.curDrug) {
            this.props.drug[prop]=this.state.curDrug[prop];
        }
	  
	this.props.clearClick();  
  }
	
	render(){
	 
		
		return <div><div className="row">
			<div className="col-3">Name</div>
			<div className="col-9"><input className="form-control" name="txtName" type="text" value={this.state.curDrug.Name} onChange={this.handleChange}/></div>
		  </div>
		  <div className="row">
			<div className="col-3">Category</div>
			<div className="col-9"><MySelect name="selCategory" list={Category_List} selectedVal={this.state.curDrug.Category} changeHandler={this.handleChange}></MySelect></div>
		  </div>
		  <div className="row">
			<div className="col-3">Amount</div>
			<div className="col-9">
			
			  <div className="row">
				<div className="col">
				  <input className="form-control" name="txtAmount" type="number" value={this.state.curDrug.Amount} onChange={this.handleChange}/>
				</div>
				<div className="col">
				  <MySelect name="selUnit" changeHandler={this.handleChange} list={Unit_List} selectedVal={this.state.curDrug.Unit}></MySelect>
				</div>
			  </div>
			
			
			
			
			
			</div>
		  </div>	  
		  <div className="row">
			<div className="col-3">Remark</div>
			<div className="col-9"><textarea className="form-control" name="txtRemark" value={this.state.curDrug.Remark} onChange={this.handleChange} /></div>
		  </div>
		  <div className="row">
			<div className="col-3"></div>
			<div className="col-9">
			<button type="button" className="btn btn-primary" onClick={this.okClick}>确定</button>&nbsp;&nbsp;&nbsp;&nbsp;
			<button type="button" className="btn btn-primary" onClick={this.props.clearClick}>取消</button>
			</div>
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
		this.handleAddClick = this.handleAddClick.bind(this); 
    }
	
	selectDrug(drugEntity){
		this.setState({selectedDrug:drugEntity});
	}
	
	clearSelectedDrug(){
		this.setState({selectedDrug:null});
	}	
	
	handleAddClick(){
		let newDrug={No:0, Name:'new added', Remark:'', Category:'',Unit:'', Amount:'', UpdateTime:''};
		FAKE_DATA.data.unshift(newDrug);
		this.setState({list:FAKE_DATA.data});
	}
	
  render() {
	let resCtrl=null;
	if(this.state.selectedDrug){
		resCtrl=<ItemDetail drug={this.state.selectedDrug} clearClick={this.clearSelectedDrug}/>
	}else{
 
		let items = this.state.list.map((drug,index) =>
			// Correct! Key should be specified inside the array.
			<ListItem key={index} drug={drug} clickHandler={this.selectDrug} />
		  );
		  
		  resCtrl=<div>
		  <div className="row">
        <div className="col-12"><button className="btn btn-primary btn-sm" onClick={this.handleAddClick}>Add</button></div> 
      </div>
		  {items}
		  </div>
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


loadData(function(resList){
						thisHandler.setState({
						list : resList
					})
});
*/ 
 

this.setState({list:FAKE_DATA.data});
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
