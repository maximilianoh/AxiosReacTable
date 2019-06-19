import React from 'react';
import axios from 'axios';

import TableHeaders from './TableHeaders.js';
import TableBodyData from './TableBodyData.js';

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
        }
    }

    nextFilterData(operation){
        let {data,initIndex,pagination}=this.state
        if (operation==='>'){
            let valor=initIndex+pagination;
            if (valor<=data.length){
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
		axios.get('https://jsonplaceholder.typicode.com/users')
			.then(response => {
                this.setState({ data: response.data });
                //this.changeFilerData(0);
                this.setState({ loaded: true });
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
    
    isVisibleTable(){
        let {titles,copyData,loaded}=this.state
        if (loaded){
            return <React.Fragment>
                <div className="Table-div">
                    <table>
                        <thead>
                            <TableHeaders titles={titles}/>
                        </thead>
                        <tbody>
                            <TableBodyData data={copyData}/>
                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                    <button onClick={(e) => this.nextFilterData('<')} className="Button-option">
                        Prev
                    </button>

                    <button onClick={(e) =>this.nextFilterData('>')} className="Button-option">
                        Next
                    </button>
                </div>
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