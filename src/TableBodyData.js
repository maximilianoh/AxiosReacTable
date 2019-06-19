import React from 'react';


function TableBodyData(listdatos) {
    let data=listdatos.data.map(data=>{
        return <tr key={'tr'+data.id} style={{'width':'100%'}}>
            <td key={'td'+data.name} style={{'width':'45%'}}>{data.name}</td>
            <td key={'td'+data.username} style={{'width':'40%'}}>{data.username}</td>
            <td key={'td'+data.id} style={{'width':'15%'}}>{data.id}</td>
        </tr>
    })
    return (
        <React.Fragment>
        {data}
        </React.Fragment>
    );
}

export default TableBodyData;