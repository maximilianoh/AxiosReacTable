import React from 'react';
import TableHeaders from './TableHeaders.js';
import TableBodyData from './TableBodyData.js';

function TableContent(props) { 
	let {titles,copyData,func,classCss}=props
	return (
		<div className={classCss}>
			<table>
				<thead>
					<TableHeaders titles={titles}/>
				</thead>
				<tbody>
					<TableBodyData data={copyData} func={func}/>
				</tbody>
			</table>
		</div>
		);
	}

	export default TableContent;