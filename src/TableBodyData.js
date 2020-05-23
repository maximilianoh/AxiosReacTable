import React from 'react';


function TableBodyData(props) {
    let {data,func}=props
    let fullData=data.map(data=>{
        return <tr key={'tr'+data.id+data.name+data.username} style={{'width':'100%'}}>
            <td key={'td'+data.name} style={{'width':'45%'}}>{data.name}</td>
            <td key={'td'+data.username} style={{'width':'30%'}}>{data.username}</td>
            <td key={'td'+data.id} style={{'width':'15%'}}>{data.id}</td>
            <td key={'tdAccion'+data.id} style={{'width':'10%'}}>
                <button onClick={(e) => func('edit',data)} className="Button-option">
                        Edit
                </button>
                <button onClick={(e) => func('delete',data)} className="Button-option">
                        Delete
                </button>
            </td>
        </tr>
    })
    return (
        <React.Fragment>
        {fullData}
        </React.Fragment>
    );
}

export default TableBodyData;