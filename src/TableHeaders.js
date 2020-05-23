import React from 'react';


function TableHeaders(listHeaders) {    
    let headers=listHeaders.titles.map(header=>{
        return <th key={header} >{header}</th>
    })
    return (
        <tr style={{'width':'100%'}}>
            {headers}
        </tr>
    );
}

export default TableHeaders;