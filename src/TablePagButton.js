
import React from 'react';

function TablePagButton(props) { 
	let {fun}=props
	return (
		<div className="Buttons">
            <button onClick={(e) => fun('<')} className="Button-option">
				Prev
			</button>

			<button onClick={(e) =>fun('>')} className="Button-option">
				Next
			</button>
		</div>
	);
}

export default TablePagButton;