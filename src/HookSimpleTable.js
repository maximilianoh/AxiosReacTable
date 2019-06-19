import React, { useState, useEffect} from 'react';
import axios from 'axios';

import TableHeaders from './TableHeaders.js';
import TableBodyData from './TableBodyData.js';


function HookSimpleTable() {
    const titles2=['Firstname','Username','ID'];
    const pagination2=3;
    const [initIndex2, setInitIndex2] = useState(0);
    const [data2, setData2] = useState([]);
    const [dataFilter2, setDataFilter2] = useState([]);
    const [dataLoaded2, setDataLoaded2] = useState(false);

   function nextFilterData2(operation){
        if (operation==='>'){
            let valor=initIndex2+pagination2;
            if (valor<=data2.length){
                setInitIndex2(valor);
            }
        }
        else{
            let valor=initIndex2-pagination2;
            if (valor>=0){
                setInitIndex2(valor);
            }
        }
    
    }

    useEffect(() => {
        const getPosts = ()=>{axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then(result => {
                setData2(result.data);
                setDataLoaded2(true);
            })
            .catch(e => {
                console.log(e);
            })
            ;
        }
        getPosts();
    }, [])

    useEffect(() => {
        //we truly aren’t using anything from the outer scope of the component in our effect
        const dataFilter = data2.filter((data, index) => {
            return (index >= initIndex2 && index < initIndex2 + pagination2);
        })
        setDataFilter2(dataFilter)
    }, [initIndex2,data2])

    function isVisibleTable(){
        if (dataLoaded2){
            return <React.Fragment>
                <div className="Table-div">
                    <table>
                        <thead>
                            <TableHeaders titles={titles2}/>
                        </thead>
                        <tbody>
                            <TableBodyData data={dataFilter2}/>
                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                    <button onClick={(e) => nextFilterData2('<')} className="Button-option">
                        Prev
                    </button>

                    <button onClick={(e) => nextFilterData2('>')} className="Button-option">
                        Next
                    </button>
                </div>
            </React.Fragment>;
        }
        else return true
    }

    return (
        isVisibleTable()
    );
}

export default HookSimpleTable;