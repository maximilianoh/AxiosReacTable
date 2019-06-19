import React from 'react';
import axios from 'axios';

import TableHeaders from './TableHeaders.js';
import TableBodyData from './TableBodyData.js';

class TableSimpleAsyncAwait extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loaded3:false,
            data3:[],
            copyData3:[],
            titles3:['Firstname','Username','ID'],
            pagination3:3,
            initIndex3:0,
        }
    }
    nextFilterData3(operation){
        let {data3,initIndex3,pagination3}=this.state
        if (operation==='>'){
            let valor=initIndex3+pagination3;
            if (valor<=data3.length){
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
        try {
            let res = await axios.get('https://jsonplaceholder.typicode.com/users');
            this.setState({ data3: res.data });
            this.setState({ loaded3: true })
        } catch(error) {
             console.log(error)
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
    
    isVisibleTable(){
        let {titles3,copyData3,loaded3}=this.state
        if (loaded3){
            return <React.Fragment>
                <div className="Table-div">
                    <table>
                        <thead>
                            <TableHeaders titles={titles3}/>
                        </thead>
                        <tbody>
                            <TableBodyData data={copyData3}/>
                        </tbody>
                    </table>
                </div>
                <div className="Buttons">
                    <button onClick={(e) => this.nextFilterData3('<')} className="Button-option">
                        Prev
                    </button>

                    <button onClick={(e) =>this.nextFilterData3('>')} className="Button-option">
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
  
  export default TableSimpleAsyncAwait;