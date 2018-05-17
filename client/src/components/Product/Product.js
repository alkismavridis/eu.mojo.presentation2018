import React, {Component} from 'react';
import PropTypes from "prop-types";
import cx from "classnames";
import "./Product.css";
import ShopButton from "../ShopButton/ShopButton";
import FormattingUtils from "../../utils/FormattingUtils";

import q from "./Product.queries";
import GraphQL from "../../utils/GraphQL";
import CommentViewer from "../CommentViewer/CommentViewer";

class Product extends Component {
    static propTypes = {
        //data
        lob:PropTypes.object.isRequired,
        product:PropTypes.object.isRequired,
        shop:PropTypes.object.isRequired,

        timesBought:PropTypes.number, //optional, if present, the


        //actions
        onQuantityChanged:PropTypes.func,
        onCountChanged:PropTypes.func,
        onRemoveProduct:PropTypes.func,
        onShowModal:PropTypes.func.isRequired,


        //styling
        className:PropTypes.string,
        style:PropTypes.object,
    };




    //region EVENT HANDLERS
    handleQuantityChangeBy(delta) {
        GraphQL.run(q.ADD_TO_CART, {productId:this.props.product.id, times:delta, lang:this.props.lob.language})
            .then(resp => {
                if (!resp.data || !this.props.onQuantityChanged) return;

                const order = resp.data.addToCart;
                this.props.onQuantityChanged(order.value, order.entry);
            });
    }

    handleDeleteClicked() {
        const idToRemove = this.props.product.id;

        GraphQL.run(q.REMOVE_FROM_CART, {productId:idToRemove})
            .then(resp => {
                if (!resp.data || !this.props.onRemoveProduct) return;

                this.props.onRemoveProduct(idToRemove, resp.data.removeFromCart.value);
            });
    }

    handleRootCLick(event) {
        event.preventDefault();
    }

    openCommentWindow() {
       this.props.onShowModal(<CommentViewer product={this.props.product}/>);
    }
    //endregion




    //region RENDERING
    renderActionRow() {
        if (this.props.timesBought) {
            return <div className="Product_counterWrapper">
                <div className="Product_emptyDeleteBut"/>
                <div className="Product_counterDiv">
                    <ShopButton label="-" onClick={this.handleQuantityChangeBy.bind(this, -1)} className="Product_amountBut"/>
                    <div className="Product_counterLabel">{this.props.timesBought}</div>
                    <ShopButton label="+" onClick={this.handleQuantityChangeBy.bind(this, 1)} className="Product_amountBut"/>
                </div>
                <div className="Product_deleteBut" onClick={this.handleDeleteClicked.bind(this)}>×</div>
            </div>;
        }
        else {
            return <ShopButton label={this.props.lob.main.buy} onClick={this.handleQuantityChangeBy.bind(this, 1)} className="Product_buy"/>;
        }
    }

    render() {
        const prod = this.props.product;
        return (
            <div className={cx("Product_root", this.props.className)} style={this.props.style} onClick={this.handleRootCLick.bind(this)}>
                <div className="Product_title" title={prod.name}>{prod.name}</div>
                <div className="Product_price">{FormattingUtils.toPriceLabel(prod.price, this.props.shop.currency)}</div>
                <div className="Product_descDiv">
                    <div className="Product_description">{prod.description}</div>
                    <div className="Product_commentIcon" onClick={this.openCommentWindow.bind(this)}>🗎</div>
                </div>
                {this.renderActionRow()}
            </div>
        );
    }
    //endregion
}

export default Product;