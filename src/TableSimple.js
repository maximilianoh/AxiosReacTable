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
            titles:['Firstname','Username','ID'],
            pagination:3,
            initIndex:0,
            cancel:false
        };
        this._isMounted = false;
        this.nextFilterData=this.nextFilterData.bind(this);
    }

    nextFilterData(operation){
        let {data,initIndex,pagination}=this.state
        if (operation==='>'){
            let valor=initIndex+pagination;
            if (valor<data.length){
                this.setState({ initIndex: valor });
            }
        }
        else{
            let valor=initIndex-pagination;
            if (valor>=0){
                this.setState({ initIndex: valor });
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

    isVisibleTable(){
        let {titles,copyData,loaded,cancel}=this.state
        if (loaded){
            return <React.Fragment>
            { cancel?
                        <CancelRequest/>
                        :
                        <React.Fragment>
                            <TableContent titles={titles} copyData={copyData}/>
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