import React from 'react';
import TableHeaders from './TableHeaders.js';
import TableBodyData from './TableBodyData.js';

function TableContent(props) { 
	let {titles,copyData}=props
	return (
		<div className="Table-div">
			<table>
				<thead>
					<TableHeaders titles={titles}/>
				</thead>
				<tbody>
					<TableBodyData data={copyData}/>
				</tbody>
			</table>
		</div>
		);
	}

	export default TableContent;