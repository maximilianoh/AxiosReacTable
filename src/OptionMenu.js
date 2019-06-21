import React from 'react';
import TableSimple from './TableSimple';
import HookSimpleTable from './HookSimpleTable';
import TableSimpleAsyncAwait from './TableSimpleAsyncAwait';
import HookSimpleTableAsyncAwait from './HookSimpleTableAsyncAwait';
import RequestComponent from './RequestComponent';
class OptionMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            option:0
        }
    }
    select=(option)=>{
        this.setState({ option});
    }

    showComponent=()=>{
        let {option}=this.state;

        let Component;
        if (option==='1') Component= TableSimple;
        else if (option==='2') Component= HookSimpleTable;
        else if (option==='3') Component= TableSimpleAsyncAwait;
        else if (option==='4') Component= HookSimpleTableAsyncAwait;
        else return true;
        return <RequestComponent Component={Component}/>
    }

    render() {
        return (
            <React.Fragment>
                <div className="Header-option">
                    <button onClick={(e) => this.select('1')} className="Button-option">
                        TableSimple
                    </button>
                    <button onClick={(e) => this.select('2')} className="Button-option">
                        HookSimpleTable
                    </button>
                    <button onClick={(e) => this.select('3')} className="Button-option">
                        TableSimpleAsyncAwait
                    </button>
                    <button onClick={(e) => this.select('4')} className="Button-option">
                        HookSimpleTableAsyncAwait
                    </button>
                    <button onClick={(e) => this.select('')} className="Button-option">
                        Reset
                    </button>
                </div>
                {
                    this.showComponent()
                }

                
            </React.Fragment>
        );
    }
  }
  
  export default OptionMenu;