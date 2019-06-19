import React from 'react';
import axios from 'axios';
const CancelToken = axios.CancelToken;

let source = CancelToken.source();

class RequestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            mode:''
        }
    }
    select=(mode)=>{
        this.setState({ mode});
    }
    showComponent=()=>{
        if(this.state.mode==='reset'){
            source = CancelToken.source();
            return true;
        }   
        else if (this.state.mode!=='') {
            let {Component}=this.props;
            
            let objectAxios={cancelToken: source.token}
            return <Component mode={this.state.mode} source={source} objectAxios={objectAxios}/>
        }
        
        else return true;
    }
    
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.Component!==this.props.Component) {
            source = CancelToken.source();
            this.setState({ mode:''});            
        }
    }

    render() {
        return (
            <React.Fragment>
            <div className="Header-option">
           		<button onClick={(e) => this.select('cancel')} className="Button-option">
                        Cancel Request
                </button>
                <button onClick={(e) => this.select('reset')} className="Button-option">
                        Reset Token
                </button>
                <button onClick={(e) => this.select('show')} className="Button-option">
                        Do Request
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

export default RequestComponent;