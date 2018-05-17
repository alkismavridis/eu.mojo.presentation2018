import React, {Component} from 'react';
import PropTypes from "prop-types";
import cx from "classnames";
import "./ShopButton.css";

class ShopButton extends Component {
    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
    };



    //region RENDERING
    render() {
        return (
            <button {...this.props} className={cx(this.props.className, "ShopButton_root")}>
                {this.props.label}
            </button>
        );
    }

    //endregion
}

export default ShopButton;