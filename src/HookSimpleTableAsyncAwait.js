import React, { useState, useEffect} from 'react';
import axios from 'axios';

import CancelRequest from './CancelRequest.js';
import TableContent from './TableContent.js';
import TablePagButton from './TablePagButton.js'


function HookSimpleTableAsyncAwait(props) {
    const titles4=['Firstname','Username','ID'];
    const pagination4=2;
    const [cancel4, setCancel4] = useState(false);
    const [initIndex4, setInitIndex4] = useState(0);
    const [data4, setData4] = useState([]);
    const [dataFilter4, setDataFilter4] = useState([]);
    const [dataLoaded4, setDataLoaded4] = useState(false);

   function nextFilterData4(operation){
        if (operation==='>'){
            let valor=initIndex4+pagination4;
            if (valor<data4.length){
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
        let isSubscribed = true
        const getPosts = async () => {
            try {
                if(props.mode==="cancel"){
                    props.source.cancel('Operation canceled');
                    setDataLoaded4(true);
                    setCancel4(true);
                }
                let result = await axios.get('https://jsonplaceholder.typicode.com/users', props.objectAxios);
                if (isSubscribed) {
                    setData4(result.data);
                    setDataLoaded4(true);
                }
            } catch(thrown) {
             if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
              } else {
                console.log(thrown)
              }
        }
        }
        getPosts();
        return () => isSubscribed = false
    }, [props])

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
            { cancel4?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            <TableContent titles={titles4} copyData={dataFilter4}/>
                            <TablePagButton fun={nextFilterData4}/>
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

export default HookSimpleTableAsyncAwait;