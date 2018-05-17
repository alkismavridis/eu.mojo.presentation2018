import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./ShoppingCart.css";
import DomUtils from "../../utils/DomUtils";
import q from "./ShopingCart.queries";
import GraphQL from "../../utils/GraphQL";
import FormattingUtils from "../../utils/FormattingUtils";
import Product from "../Product/Product";

class ShoppingCart extends Component {
    static propTypes = {
        //data
        order:PropTypes.object.isRequired,
        shop:PropTypes.object.isRequired,
        lob: PropTypes.object.isRequired,


        //actions
        onEmptyChart:PropTypes.func.isRequired,
        onQuantityChanged:PropTypes.func.isRequired,
        onRemoveProduct:PropTypes.func.isRequired,
        onShowModal:PropTypes.func.isRequired,

        //styling
    };

    static defaultProps = {};

    state = {
        open:false
    };


    //region LIFE CYCLE
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
    setMenuOpen(isOpen, event) {
        if (event) event.stopPropagation();

        if (isOpen==="toggle") isOpen = !this.state.open;
        if (isOpen && this.props.order.entries.length===0) return; //do not open when order is empty
        this.setState({open:isOpen});

        //update window event
        if (isOpen) window.addEventListener("click", this.handleWindowClick);
        if (isOpen) window.addEventListener("touchend", this.handleWindowClick);
    }

    handleWindowClick = (event) => {
        if (this._rootEl && !DomUtils.contains(this._rootEl, event.target)) {
            this.setMenuOpen(false, event);
            window.removeEventListener("click", this.handleWindowClick);
            window.removeEventListener("touchend", this.handleWindowClick);
        }
    };

    handleEmptyClick() {
        GraphQL.run(q.EMPTY_CART)
            .then(resp => {
                if (resp.errors) return;
                this.props.onEmptyChart();
                this.setMenuOpen(false);
            });
    }
    //endregion




    //region RENDERING
    renderPopup() {
        return (
            <div className="ShoppingCart_popup">
                <div className="ShoppingCart_emptyBut" onClick={this.handleEmptyClick.bind(this)}>
                    {this.props.lob.main.emptyCart}
                </div>
                {this.props.order.entries.map(e => <Product
                    key={e.product.id}
                    lob={this.props.lob}
                    product={e.product}
                    shop={this.props.shop}
                    onQuantityChanged={this.props.onQuantityChanged}
                    onShowModal={this.props.onShowModal}
                    onRemoveProduct={this.props.onRemoveProduct}
                    timesBought={e.times}
                    className="ShoppingCart_prod"/>)
                }
            </div>
        );
    }

    render() {
        return (
            <div className="ShoppingCart_root" ref={el => this._rootEl=el}>
                <div className="ShoppingCart_rootIcon" onClick={this.setMenuOpen.bind(this, "toggle")}/>
                <div className="ShoppingCart_priceLabel" onClick={this.setMenuOpen.bind(this, "toggle")}>
                    {FormattingUtils.toPriceLabel(this.props.order.value, this.props.shop.currency)}
                </div>
                {this.state.open? this.renderPopup() : null}
            </div>
        );
    }

    //endregion
}

export default ShoppingCart;