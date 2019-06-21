import React from 'react';
import axios from 'axios';

import CancelRequest from './CancelRequest.js';
import TableContent from './TableContent.js';
import TablePagButton from './TablePagButton.js'

class TableSimpleAsyncAwait extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loaded3:false,
            data3:[],
            copyData3:[],
            titles3:['Firstname','Username','ID','Actions'],
            pagination3:4,
            initIndex3:0,
            cancel3:false,
            showInput3:false,
            inputChange3:'',
            object3:{},
            wrongE3:false,
            wrongA3:false,
            objectAdd3:{name:'',username:'',
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
            },
        };
        this._isMounted = false;
        this.nextFilterData3=this.nextFilterData3.bind(this);
        this.showInput3=this.showInput3.bind(this);
    }
    nextFilterData3(operation){
        let {data3,initIndex3,pagination3}=this.state
        if (operation==='>'){
            let valueDireccion=initIndex3+pagination3;
            if (valueDireccion<data3.length){
                this.setState({ initIndex3: valueDireccion });
            }
        }
        else{
            let valueDireccion=initIndex3-pagination3;
            if (valueDireccion>=0){
                this.setState({ initIndex3: valueDireccion });
            }
        }
    }
    
    async componentDidMount() {
        this._isMounted = true
        try {
            if(this.props.mode==="cancel"){
                this.props.source.cancel('Operation canceled');
                this.setState({ cancel3: true });
                this.setState({ loaded3: true });
            }
            let res = await axios.get('https://jsonplaceholder.typicode.com/users',this.props.objectAxios);
            if (this._isMounted) {
                this.setState({ data3: res.data });
                this.setState({ loaded3: true });
            }
        } catch(thrown) {
             if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
              } else {
                console.log(thrown)
              }
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.initIndex3 !== this.state.initIndex3 || prevState.data3!==this.state.data3) {
            let {data3,pagination3,initIndex3}=this.state
            const dataFilter = data3.filter((data, index) => {
                return (index >= initIndex3 && index < initIndex3 + pagination3);
            })
            this.setState({ copyData3: dataFilter });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    cleanEdit3(){
        this.setState({ inputChange3: ''});
        this.setState({ showInput3: false });
        this.setState({ wrongE3: false });
        this.setState({ wrongA3: false });
        document.querySelector("#inputName").value='';
        document.querySelector("#inputUsername").value='';
        let edit=document.querySelector("#editUsername");
        if(edit)edit.value='';
    }
    changeData3=async()=>{
        let {object3,inputChange3,data3}=this.state;
        if (inputChange3.length<3 || inputChange3.length>12) {
            this.setState({ wrongE3: true });
            return;
        }
        else this.setState({ wrongE3: false });
        let objeto={...object3, username: inputChange3};
        try{
            let response = await axios.put('https://jsonplaceholder.typicode.com/users/'+object3.id, objeto)
            let objectCopy3=data3.map(data=>{
                if(data.id===response.data.id){
                    return response.data
                }
                
                return data;
            });
            this.setState({ data3: objectCopy3 });
        } catch(thrown) {
            console.log(thrown)
        }
    }
    showInput3=async(type,object3)=>{
        if (type==='edit'){
            this.setState({ showInput3: true });
            this.setState({object3}); 
        }
        else if(type==='delete'){
            try{
                await axios.delete('https://jsonplaceholder.typicode.com/users/'+object3.id)
                let objectCopy=this.state.data3.filter(data=>{
                    return data.id!==object3.id;
                });
                this.setState({ data3: objectCopy });
                if(this.state.initIndex3===this.state.data3.length){
                    let valueDireccion=this.state.initIndex3-this.state.pagination3
                    if (valueDireccion>0) this.setState({ initIndex3: valueDireccion });
                    else this.setState({ initIndex3: 0 });
                }
            }
            catch(thrown) {
                console.log(thrown)
            }
            this.cleanEdit3();
        }
               
    }
    addUserFunction3=async()=>{
        
        let {objectAdd3,data3}=this.state;
        if(objectAdd3.name.length<3 || objectAdd3.username<3 || objectAdd3.name.length>12 ||objectAdd3.username>12 ){
            this.setState({ wrongA3: true });
            return;
        }
        else{
            this.setState({ wrongA3: false }); 
        }
        try{
            let response = await axios.post('https://jsonplaceholder.typicode.com/users/', objectAdd3)            
            let objectCopy3=[...data3,response.data];
            this.setState({ data3: objectCopy3 });
        }
        catch(thrown) {
            console.log(thrown)
        }
        this.cleanEdit3();
    }
    
    addUser3(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Name</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd3={...this.state.objectAdd3,name:e.target.value };
                                this.setState({objectAdd3})}
                            }
                            id="inputName"
                            placeholder="min. 3 character, max. 12"/>
                    </div>
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd3={...this.state.objectAdd3,username:e.target.value };
                                this.setState({objectAdd3})}
                            }
                            id="inputUsername"
                            placeholder="min. 3 character, max. 12"/> 
                    </div>
                </div>
                <div className="right">
                    <button onClick={(e) => this.addUserFunction3()} className="bottonAdd">
                            Add User
                    </button>
                </div>
            </div>
            {this.state.wrongA3?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }
    inputChange3(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => this.setState({ inputChange3: e.target.value })}
                            id="editUsername" placeholder={this.state.object3.username}/>
                    </div>
                </div>
                <div className="right">
                <button onClick={(e) => this.changeData3()} className="Button-option">
                        Change Username
                </button>
                </div>
            </div>
            {this.state.wrongE3?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }


    
    isVisibleTable(){
        let {titles3,copyData3,loaded3,cancel3,showInput3}=this.state
        if (loaded3){
            return <React.Fragment>
            { cancel3?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            {this.addUser3()}
                            {showInput3?
                                this.inputChange3()
                                :
                                true
                            }
                            <TableContent titles={titles3} copyData={copyData3} func={this.showInput3}/>
                            <TablePagButton fun={this.nextFilterData3}/>
                        </React.Fragment>
            }
            </React.Fragment>;
        }
        else return true
    }


    render() {
        
        return (
            this.isVisibleTable()
        );
    }
  }
  
  export default TableSimpleAsyncAwait;