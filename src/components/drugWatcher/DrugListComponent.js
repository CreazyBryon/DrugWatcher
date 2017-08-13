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
  render() {
	  const drugList = [{DrugName:'danggui',DrugRemark:'danggui remark2'}, {DrugName:'fuzi',DrugRemark:'fuzi remark'}, 3, 4, 5];
	    const drugItems = drugList.map((drug,index) =>
			// Correct! Key should be specified inside the array.
			<ListItem key={index} DrugName={drug.DrugName} DrugRemark={drug.DrugRemark} />
		  );
    return (
      <div className="druglist-component">
		{drugItems}
      </div>
    );
  }
}

DrugListComponent.displayName = 'MyDrugWatcherDrugListComponent';

// Uncomment properties you need
// DrugListComponent.propTypes = {};
// DrugListComponent.defaultProps = {};

export default DrugListComponent;
