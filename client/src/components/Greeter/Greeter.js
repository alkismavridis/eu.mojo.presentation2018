import React, {Component} from 'react';

class Greeter extends Component {
    static propTypes = {


    };


    render() {
        return (
            <div className="Example_root" style={{color:this.props.color}}>
                Hello {this.props.name}
                {this.props.withButton?
                    <button>Click me {this.props.times} times</button> :
                    null
                }
            </div>
        );
    }
}

export default Greeter;