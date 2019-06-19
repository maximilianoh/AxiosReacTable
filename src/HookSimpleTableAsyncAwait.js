import React, { useState, useEffect} from 'react';
import axios from 'axios';

import TableHeaders from './TableHeaders.js';
import TableBodyData from './TableBodyData.js';


function HookSimpleTableAsyncAwait() {
    const titles4=['Firstname','Username','ID'];
    const pagination4=3;
    const [initIndex4, setInitIndex4] = useState(0);
    const [data4, setData4] = useState([]);
    const [dataFilter4, setDataFilter4] = useState([]);
    const [dataLoaded4, setDataLoaded4] = useState(false);

   function nextFilterData4(operation){
        if (operation==='>'){
            let valor=initIndex4+pagination4;
            if (valor<=data4.length){
                setInitIndex4(valor);
            }
        }
        else{
            let valor=initIndex4-pagination4;
            if (valor>=0){
                setInitIndex4(valor);
            }
        }
    
    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                let result = await axios.get('https://jsonplaceholder.typicode.com/users');
                setData4(result.data);
                setDataLoaded4(true);
            } catch(error) {
             console.log(error)
            }
        }
        getPosts();
    }, [])

    useEffect(() => {
        //we truly aren’t using anything from the outer scope of the component in our effect
        const dataFilter = data4.filter((data, index) => {
            return (index >= initIndex4 && index < initIndex4 + pagination4);
        })
        setDataFilter4(dataFilter)
    }, [initIndex4,data4])


    function isVisibleTable(){
        if (dataLoaded4){
            return <React.Fragment>
                <div className="Table-div">
                    <table>
                        <thead>
                            <TableHeaders titles={titles4}/>
                        </thead>
                        <tbody>
                            <TableBodyData data={dataFilter4}/>
                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                    <button onClick={(e) => nextFilterData4('<')} className="Button-pag">
                        Prev
                    </button>

                    <button onClick={(e) => nextFilterData4('>')} className="Button-pag">
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

export default HookSimpleTableAsyncAwait;