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
            titles3:['Firstname','Username','ID'],
            pagination3:4,
            initIndex3:0,
            cancel3:false
        };
        this._isMounted = false;
        this.nextFilterData3=this.nextFilterData3.bind(this);
    }
    nextFilterData3(operation){
        let {data3,initIndex3,pagination3}=this.state
        if (operation==='>'){
            let valor=initIndex3+pagination3;
            if (valor<data3.length){
                this.setState({ initIndex3: valor });
            }
        }
        else{
            let valor=initIndex3-pagination3;
            if (valor>=0){
                this.setState({ initIndex3: valor });
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
    
    isVisibleTable(){
        let {titles3,copyData3,loaded3,cancel3}=this.state
        if (loaded3){
            return <React.Fragment>
            { cancel3?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            <TableContent titles={titles3} copyData={copyData3}/>
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