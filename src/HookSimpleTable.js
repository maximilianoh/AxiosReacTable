import React, { useState, useEffect} from 'react';
import axios from 'axios';

import CancelRequest from './CancelRequest.js';
import TableContent from './TableContent.js';
import TablePagButton from './TablePagButton.js'


function HookSimpleTable(props) {
    const titles2=['Firstname','Username','ID'];
    const pagination2=5;
    const [cancel2, setCancel2] = useState(false);
    const [initIndex2, setInitIndex2] = useState(0);
    const [data2, setData2] = useState([]);
    const [dataFilter2, setDataFilter2] = useState([]);
    const [dataLoaded2, setDataLoaded2] = useState(false);

   function nextFilterData2(operation){
        if (operation==='>'){
            let valor=initIndex2+pagination2;
            if (valor<data2.length){
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
        let isSubscribed = true
        if(props.mode==="cancel"){
            props.source.cancel('Operation canceled');
            setDataLoaded2(true);
            setCancel2(true);
        }
        const getPosts = ()=>{
            axios.get('https://jsonplaceholder.typicode.com/users', props.objectAxios)
            .then(result => {
                if (isSubscribed) {
                    setData2(result.data);
                    setDataLoaded2(true);
                }
            })
            .catch(e => {
                console.log(e.message);
            })
            ;
        }
        getPosts();
        return () => isSubscribed = false
    }, [props,setCancel2])

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
            { cancel2?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            <TableContent titles={titles2} copyData={dataFilter2}/>
                            <TablePagButton fun={nextFilterData2}/>
                        </React.Fragment>
            }
            </React.Fragment>;
        }
        else return true
    }

    return (
        isVisibleTable()
    );
}

export default HookSimpleTable;