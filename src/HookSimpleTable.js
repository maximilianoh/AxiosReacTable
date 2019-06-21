import React, { useState, useEffect} from 'react';
import axios from 'axios';

import CancelRequest from './CancelRequest.js';
import TableContent from './TableContent.js';
import TablePagButton from './TablePagButton.js'


function HookSimpleTable(props) {
    const titles2=['Firstname','Username','ID','Actions'];
    const pagination2=5;
    const [cancel2, setCancel2] = useState(false);
    const [initIndex2, setInitIndex2] = useState(0);
    const [data2, setData2] = useState([]);
    const [dataFilter2, setDataFilter2] = useState([]);
    const [dataLoaded2, setDataLoaded2] = useState(false);

    const [showInput2, setShowInput2] = useState(false);
    const [inputChange2, setInputChange2] = useState('');
    const [object2, setObject2] = useState({});
    const [wrongE2, setWrongE2] = useState(false);
    const [wrongA2, setWrongA2] = useState(false);
    const constObject3={name:'',username:'',
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhras: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        }
    const [objectAdd2, setObjectAdd2] = useState(constObject3);

   function nextFilterData2(operation){
        if (operation==='>'){
            let valueDireccion=initIndex2+pagination2;
            if (valueDireccion<data2.length){
                setInitIndex2(valueDireccion);
            }
        }
        else{
            let valueDireccion=initIndex2-pagination2;
            if (valueDireccion>=0){
                setInitIndex2(valueDireccion);
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
    }, [props,setCancel2]);

    useEffect(() => {
        //we truly aren’t using anything from the outer scope of the component in our effect
        const dataFilter = data2.filter((data, index) => {
            return (index >= initIndex2 && index < initIndex2 + pagination2);
        })
        setDataFilter2(dataFilter)
    }, [initIndex2,data2]);


    function cleanEdit2(){
        setShowInput2(false);
        setInputChange2('');
        setWrongE2(false);
        setWrongA2(false);
        document.querySelector("#inputName").value='';
        document.querySelector("#inputUsername").value='';
        let edit=document.querySelector("#editUsername");
        if(edit)edit.value='';
    }
    function changeData2(){
        if (inputChange2.length<3 || inputChange2.length>12) {
            setWrongE2(true);
            return;
        }
        else setWrongE2(false);
        let objeto={...object2, username: inputChange2};
        axios.put('https://jsonplaceholder.typicode.com/users/'+object2.id, objeto)
        .then(response => {
            let objectCopy=data2.map(data=>{
                if(data.id===response.data.id){
                    return response.data
                }
                return data;
            });
            setData2(objectCopy);
        })
        .catch(function (thrown) {
            console.log(thrown)
        });
        cleanEdit2();
    }
    function funShowInput2(type,object){
        if (type==='edit'){
            setShowInput2(true);
            setObject2(object)    
        }
        else if(type==='delete'){
            cleanEdit2();
            axios.delete('https://jsonplaceholder.typicode.com/users/'+object.id)
            .then(() => {
                let objectCopy=data2.filter(data=>{
                    return data.id!==object.id;
                });
                setData2(objectCopy);
                if(initIndex2===objectCopy.length){
                    let valueDireccion=initIndex2-pagination2
                    if (valueDireccion>0) setInitIndex2(valueDireccion );
                    else setInitIndex2(0 );
                }
            })
            .catch(function (thrown) {
                console.log(thrown)
            });
            cleanEdit2();
        }
               
    }
    function addUserFunction2(){
        if(objectAdd2.name.length<3 || objectAdd2.username<3 || objectAdd2.name.length>12 ||objectAdd2.username>12 ){
            setWrongA2(true);
            return;
        }
        else{
            setWrongA2(false);
        }
        axios.post('https://jsonplaceholder.typicode.com/users/', objectAdd2)
        .then(response => {
            let objectCopy=[...data2,response.data];
            setData2(objectCopy);
        })
        .catch(function (thrown) {
            console.log(thrown)
        });
        cleanEdit2();
    }
    
    function addUser2(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Name</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd={...objectAdd2,name:e.target.value };
                                setObjectAdd2(objectAdd);}
                            }
                            id="inputName"
                            placeholder="min. 3 character, max. 12"/>
                    </div>
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd={...objectAdd2,username:e.target.value };
                                setObjectAdd2(objectAdd);}
                            }
                            id="inputUsername"
                            placeholder="min. 3 character, max. 12"/> 
                    </div>
                </div>
                <div className="right">
                    <button onClick={(e) => addUserFunction2()} className="bottonAdd">
                            Add User
                    </button>
                </div>
            </div>
            {wrongA2?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }
    function funInputChange2(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setInputChange2(e.target.value)}
                            id="editUsername" placeholder={object2.username}/>
                    </div>
                </div>
                <div className="right">
                <button onClick={(e) => changeData2()} className="Button-option">
                        Change Username
                </button>
                </div>
            </div>
            {wrongE2?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }

    

    function isVisibleTable(){
        if (dataLoaded2){
            return <React.Fragment>
            { cancel2?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            {addUser2()}
                            {showInput2?
                                funInputChange2()
                                :
                                true
                            }
                            <TableContent titles={titles2} copyData={dataFilter2} func={funShowInput2} classCss="Table-div2"/>
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