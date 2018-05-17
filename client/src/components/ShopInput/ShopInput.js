import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./ShopInput.css";

class ShopInput extends Component {
    static propTypes = {
        //data
        type:PropTypes.string,
        placeholder:PropTypes.string,


        //actions
        onChange:PropTypes.func,
        onAction:PropTypes.func,

        //styling
    };

    static defaultProps = {

    };



    //region LIFE CYCLE
    //constructor(props) {
    //    super(props);
    //    this.state = {};
    //}

    //componentDidMount() {}
    //static getDerivedStateFromProps(nextProps, prevState) {}
    //shouldComponentUpdate(nextProps, nextState) { return true; }
    //getSnapshotBeforeUpdate(prevProps, prevState) { return null; }
    //componentDidUpdate(prevProps, prevState, snapshot) {}
    //componentWillUnmount() {}

    //componentDidCatch(error, info) {
    //    console.error("Exception caught");
    //}

    //endregion




    //region EVENT HANDLERS
    handleAction(event) {
        event.preventDefault();
        if (this.props.onAction) this.props.onAction();
    }

    handleChange(event) {
        if (this.props.onChange) this.props.onChange(event.target.value);
    }
    //endregion




    //region RENDERING
    render() {
        return (
            <form className="ShopInput_root" onSubmit={this.handleAction.bind(this)}>
                <input
                    {...this.props}
                    className="ShopInput_input"
                    onChange={this.handleChange.bind(this)}/>
            </form>
        );
    }

    //endregion
}

export default ShopInput;