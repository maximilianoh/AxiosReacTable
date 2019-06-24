import React, { useState, useEffect} from 'react';
import axios from 'axios';

import CancelRequest from './CancelRequest.js';
import TableContent from './TableContent.js';
import TablePagButton from './TablePagButton.js'


function HookSimpleTableAsyncAwait(props) {
    const titles4=['Firstname','Username','ID','Actions'];
    const pagination4=2;
    const [cancel4, setCancel4] = useState(false);
    const [initIndex4, setInitIndex4] = useState(0);
    const [data4, setData4] = useState([]);
    const [dataFilter4, setDataFilter4] = useState([]);
    const [dataLoaded4, setDataLoaded4] = useState(false);

    const [showInput4, setShowInput4] = useState(false);
    const [inputChange4, setInputChange4] = useState('');
    const [object4, setObject4] = useState({});
    const [wrongE4, setWrongE4] = useState(false);
    const [wrongA4, setWrongA4] = useState(false);
    const constObject4={name:'',username:'',
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
    const [objectAdd4, setObjectAdd4] = useState(constObject4);

   function nextFilterData4(operation){
        if (operation==='>'){
            let valueDireccion=initIndex4+pagination4;
            if (valueDireccion<data4.length){
                setInitIndex4(valueDireccion);
            }
        }
        else{
            let valueDireccion=initIndex4-pagination4;
            if (valueDireccion>=0){
                setInitIndex4(valueDireccion);
            }
        }
    
    }

    useEffect(() => {
        let isSubscribed = true
        const getPosts = async () => {
            try {
                if(props.mode==="cancel"){
                    props.source.cancel('Request canceled');
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
                console.log(thrown.message);
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

    function cleanEdit4(){
        setShowInput4(false);
        setInputChange4('');
        setWrongE4(false);
        setWrongA4(false);
        setObjectAdd4(constObject4);
        document.querySelector("#inputName").value='';
        document.querySelector("#inputUsername").value='';
        let edit=document.querySelector("#editUsername");
        if(edit)edit.value='';
    }
    const changeData4=async()=>{
        if (inputChange4.length<3 || inputChange4.length>14) {
            setWrongE4(true);
            return;
        }
        else setWrongE4(false);
        let objeto={...object4, username: inputChange4};
        let response= await axios.put('https://jsonplaceholder.typicode.com/users/'+object4.id, objeto)
        try{ 
            let objectCopy=data4.map(data=>{
                if(data.id===response.data.id){
                    return response.data
                }
                return data;
            });
            setData4(objectCopy);
        }
        catch(thrown){
            console.log(thrown)
        };
        cleanEdit4();
    }
    const funShowInput4=async(type,object)=>{
        if (type==='edit'){
            setShowInput4(true);
            setObject4(object)    
        }
        else if(type==='delete'){
            await axios.delete('https://jsonplaceholder.typicode.com/users/'+object.id)
            try{
                let objectCopy=data4.filter(data=>{
                    return data.id!==object.id;
                });
                setData4(objectCopy);
                if(initIndex4===objectCopy.length){
                    let valueDireccion=initIndex4-pagination4
                    if (valueDireccion>0) setInitIndex4(valueDireccion );
                    else setInitIndex4(0 );
                }
            }
            catch(thrown){
                console.log(thrown)
            };
            cleanEdit4();
        }
               
    }
    const  addUserFunction4=async()=>{
        if(objectAdd4.name.length<3 || objectAdd4.username<3 || objectAdd4.name.length>14 ||objectAdd4.username>14 ){
            setWrongA4(true);
            return;
        }
        else{
            setWrongA4(false);
        }
        try{
            let response= await axios.post('https://jsonplaceholder.typicode.com/users/', objectAdd4)
            let objectCopy=[...data4,response.data];
            setData4(objectCopy);
        }
        catch(thrown){
            console.log(thrown)
        };
        cleanEdit4();
    }
    function addUser4(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Name</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd={...objectAdd4,name:e.target.value };
                                setObjectAdd4(objectAdd);}
                            }
                            id="inputName"
                            placeholder="min. 3 character, max. 14"/>
                    </div>
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd={...objectAdd4,username:e.target.value };
                                setObjectAdd4(objectAdd);}
                            }
                            id="inputUsername"
                            placeholder="min. 3 character, max. 14"/> 
                    </div>
                </div>
                <div className="right">
                    <button onClick={(e) => addUserFunction4()} className="bottonAdd">
                            Add User
                    </button>
                </div>
            </div>
            {wrongA4?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }
    function funInputChange4(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => setInputChange4(e.target.value)}
                            id="editUsername" placeholder={object4.username} />
                    </div>
                </div>
                <div className="right">
                <button onClick={(e) => changeData4()} className="Button-option">
                        Change Username
                </button>
                </div>
            </div>
            {wrongE4?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }



    function isVisibleTable(){
        if (dataLoaded4){
             return <React.Fragment>
            { cancel4?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            {addUser4()}
                            {showInput4?
                                funInputChange4()
                                :
                                true
                            }
                            <TableContent titles={titles4} copyData={dataFilter4} func={funShowInput4} classCss="Table-div4"/>
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