import React, {Component} from 'react';
import Greeter from "../Greeter/Greeter.js";

class Example extends Component {
    static propTypes = {
    };





    render() {
        return (
            <div className="Example_root">
                <Greeter name="Hermann" withButton={true}/>
                <Greeter name="Erik" color="red"/>
                <Greeter name="Nina" color="purple" withButton={false}/>
                <Greeter color="green"/>
            </div>
        );
    }
}

export default Example;