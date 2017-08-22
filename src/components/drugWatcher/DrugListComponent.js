'use strict';

import React from 'react';

require('styles/drugWatcher/DrugList.css');

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <div className="row">
        <div className="col-3">{props.DrugName}</div>
        <div className="col-6">{props.DrugRemark}</div>
        <div className="col-3">Detail</div>
      </div>;
}

class DrugListComponent extends React.Component {
	constructor(props){
        super(props)
        this.state={
            //我们使用state里面的services来保存所有的service
            //刚开始的时候，内容为空
            list:[],
            //这里的view决定了我们要显示哪些service
            view:'type_a'
        }
    }
	
  render() {
	  //const drugList = [{DrugName:'danggui',DrugRemark:'danggui remark2'}, {DrugName:'fuzi',DrugRemark:'fuzi remark'}, 3, 4, 5];
	    const drugItems = this.state.list.map((drug,index) =>
			// Correct! Key should be specified inside the array.
			<ListItem key={index} DrugName={drug.DrugName} DrugRemark={drug.DrugRemark} />
		  );
    return (
      <div className="druglist-component">
		{drugItems}
      </div>
    );
  }
  
	componentDidMount(){
        //组件先按照services为空渲染一遍，你可以理解为先把网页框架渲染出来
        //渲染完毕之后就调用我们这里这个函数用ajax方法去服务器取数据
        const xhr = new XMLHttpRequest()
        //服务器随你喜欢，你可以用php，也可以用node，只要实现了标准的GET方法即可
        //对于post，put，delete等方法同理
        //而很显然，假如你的数据没有必要从数据库中提取，或者长期不变，也不怕泄密
        //那你完全可以在此请求一个json文件
        xhr.open('GET', 'http://localhost:3000/api/drug/list', true)
        //根据情况选择是否要随get请求发送用于身份认证的信息
        xhr.withCredentials = true
        xhr.send()

        xhr.onreadystatechange = () =>{
            if(xhr.readyState == XMLHttpRequest.DONE){
                if(xhr.status == 200){
                    //你当然可以用其他方法编码你的返回信息，但是对于js的世界来说，还有什么比json更方便呢？
                    let gotList = JSON.parse(xhr.responseText)
                    //好了，我们获得了service列表，使用setState方法覆盖当前元素的services数据
                    this.setState({
                        list : gotList
                    })
                }
            }else{
                //alert('ajax失败了:'+XMLHttpRequest.DONE)
            }
        }
    }
}

DrugListComponent.displayName = 'MyDrugWatcherDrugListComponent';

// Uncomment properties you need
// DrugListComponent.propTypes = {};
// DrugListComponent.defaultProps = {};

export default DrugListComponent;
