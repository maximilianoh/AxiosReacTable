import React from 'react';
import TableSimple from './TableSimple';
import HookSimpleTable from './HookSimpleTable';
import TableSimpleAsyncAwait from './TableSimpleAsyncAwait';
import HookSimpleTableAsyncAwait from './HookSimpleTableAsyncAwait';
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
        
        if (option==='1') return <TableSimple/>;
        else if (option==='2') return <HookSimpleTable/>;
        else if (option==='3') return <TableSimpleAsyncAwait/>;
        else if (option==='4') return <HookSimpleTableAsyncAwait/>;
        return true
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
                </div>
                <div className="App-content">
                {
                    this.showComponent()
                }
                </div>
                
            </React.Fragment>
        );
    }
  }
  
  export default OptionMenu;