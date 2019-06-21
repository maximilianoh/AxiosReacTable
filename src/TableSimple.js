import React from 'react';
import axios from 'axios';

import CancelRequest from './CancelRequest.js';
import TableContent from './TableContent.js';
import TablePagButton from './TablePagButton.js'

class TableSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loaded:false,
            data:[],
            copyData:[],
            titles:['Firstname','Username','ID','Actions'],
            pagination:3,
            initIndex:0,
            cancel:false,
            showInput:false,
            inputChange:'',
            object:{},
            wrongE:false,
            wrongA:false,
            objectAdd:{name:'',username:'',
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
        this.nextFilterData=this.nextFilterData.bind(this);
        this.showInput=this.showInput.bind(this);
    }

    nextFilterData(operation){
        let {data,initIndex,pagination}=this.state
        if (operation==='>'){
            let valueDireccion=initIndex+pagination;
            if (valueDireccion<data.length){
                this.setState({ initIndex: valueDireccion });
            }
        }
        else{
            let valueDireccion=initIndex-pagination;
            if (valueDireccion>=0){
                this.setState({ initIndex: valueDireccion });
            }
        }
    }
    
    componentDidMount() {
        this._isMounted = true
        if(this.props.mode==="cancel"){
            this.props.source.cancel('Operation canceled');
            this.setState({ cancel: true });
            this.setState({ loaded: true });

        }
        axios.get('https://jsonplaceholder.typicode.com/users', this.props.objectAxios)
        .then(response => {
            if (this._isMounted) {
                this.setState({ data: response.data });
                this.setState({ loaded: true });
            }
        })
        .catch(function (thrown) {
          if ((thrown)) {
            console.log('Request canceled', thrown.message);
          } else {
            console.log(thrown)
          }
        });

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.initIndex !== this.state.initIndex || prevState.data!==this.state.data) {
            let {data,pagination,initIndex}=this.state
            const dataFilter = data.filter((data, index) => {
                return (index >= initIndex && index < initIndex + pagination);
            })
            this.setState({ copyData: dataFilter });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    cleanEdit(){
        this.setState({ inputChange: ''});
        this.setState({ showInput: false });
        this.setState({ wrongE: false });
        this.setState({ wrongA: false });
        document.querySelector("#inputName").value='';
        document.querySelector("#inputUsername").value='';
        let edit=document.querySelector("#editUsername");
        if(edit)edit.value='';
    }
    changeData(){
        let {object,inputChange,data}=this.state;
        if (inputChange.length<3 || inputChange.length>12) {
            this.setState({ wrongE: true });
            return;
        }
        else this.setState({ wrongE: false });
        let objeto={...object, username: inputChange};
        axios.put('https://jsonplaceholder.typicode.com/users/'+object.id, objeto)
        .then(response => {
            let objectCopy=data.map(data=>{
                if(data.id===response.data.id){
                    return response.data
                }
                return data;
            });
            this.setState({ data: objectCopy });
        })
        .catch(function (thrown) {
            console.log(thrown)
        });
        this.cleanEdit();
    }
    showInput(type,object){
        if (type==='edit'){
            this.setState({ showInput: true });
            this.setState({object}); 
        }
        else if(type==='delete'){
            this.cleanEdit();
            axios.delete('https://jsonplaceholder.typicode.com/users/'+object.id)
            .then(() => {
                let objectCopy=this.state.data.filter(data=>{
                    return data.id!==object.id;
                });
                this.setState({ data: objectCopy });
                if(this.state.initIndex===this.state.data.length){
                    let valueDireccion=this.state.initIndex-this.state.pagination
                    if (valueDireccion>0) this.setState({ initIndex: valueDireccion });
                    else this.setState({ initIndex: 0 });
                }
            })
            .catch(function (thrown) {
                console.log(thrown)
            });
            this.cleanEdit();
        }
               
    }
    addUserFunction(){
        let {objectAdd,data}=this.state;
        if(objectAdd.name.length<3 || objectAdd.username<3 || objectAdd.name.length>12 ||objectAdd.username>12 ){
            this.setState({ wrongA: true });
            return;
        }
        else{
            this.setState({ wrongA: false }); 
        }
        axios.post('https://jsonplaceholder.typicode.com/users/', objectAdd)
        .then(response => {
            let objectCopy=[...data,response.data];
            this.setState({ data: objectCopy });
        })
        .catch(function (thrown) {
            console.log(thrown)
        });
        this.cleanEdit();
    }
    addUser(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Name</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd={...this.state.objectAdd,name:e.target.value };
                                this.setState({objectAdd})}
                            }
                            id="inputName"
                            placeholder="min. 3 character, max. 12"/>
                    </div>
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => {
                                let objectAdd={...this.state.objectAdd,username:e.target.value };
                                this.setState({objectAdd})}
                            }
                            id="inputUsername"
                            placeholder="min. 3 character, max. 12"/> 
                    </div>
                </div>
                <div className="right">
                    <button onClick={(e) => this.addUserFunction()} className="bottonAdd">
                            Add User
                    </button>
                </div>
            </div>
            {this.state.wrongA?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }
    inputChange(){
        return <React.Fragment>
            <div className="parent">
                <div className="left">
                    <div className="addUserClass">
                        <label>Username</label>
                        <input type="text" onChange={(e) => this.setState({ inputChange: e.target.value })}
                            id="editUsername" placeholder={this.state.object.username}/>
                    </div>
                </div>
                <div className="right">
                <button onClick={(e) => this.changeData()} className="Button-option">
                        Change Username
                </button>
                </div>
            </div>
            {this.state.wrongE?
                <p>The field does not meet the policy requirements.</p>
                :
                true
            }
        </React.Fragment>
    }

    isVisibleTable(){
        let {titles,copyData,loaded,cancel,showInput}=this.state
        if (loaded){
            return <React.Fragment>
            { cancel?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            {this.addUser()}
                            {showInput?
                                this.inputChange()
                                :
                                true
                            }
                            <TableContent titles={titles} copyData={copyData} func={this.showInput}/>
                            <TablePagButton fun={this.nextFilterData}/>
                            
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
  
  export default TableSimple;