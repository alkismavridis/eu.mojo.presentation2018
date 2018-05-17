import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./Shop.css";
import DomUtils from "../../utils/DomUtils";
import ShopButton from "../ShopButton/ShopButton";
import FormattingUtils from "../../utils/FormattingUtils";
import q from "./Shop.queries";
import GraphQL from "../../utils/GraphQL";

class Shop extends Component {
    static propTypes = {
        //data
        order:PropTypes.object.isRequired,
        lob:PropTypes.object.isRequired,
        shop:PropTypes.object.isRequired,

        //actions
        onPay:PropTypes.func.isRequired,
        onShowModal:PropTypes.func.isRequired,


        //styling
    };

    static defaultProps = {};


    //region LIFE CYCLE
    constructor(props) {
        super(props);
        this.state = {
            open:false
        };
    }
    //endregion




    //region EVENT HANDLERS
    setMenuOpen(isOpen, event) {
        if (event) event.stopPropagation();

        if (isOpen==="toggle") isOpen = !this.state.open;
        this.setState({open:isOpen});

        //update window event
        if (isOpen) window.addEventListener("click", this.handleWindowClick);
        if (isOpen) window.addEventListener("touchend", this.handleWindowClick);
    }

    handlePayClicked() {
        const oldValue = this.props.order.value;
        GraphQL.run(q.EMPTY_CART)
            .then(resp => {
                if (resp.errors) return;
                this.props.onPay(oldValue);
                this.setMenuOpen(false);
            });
    }

    handleWindowClick = (event) => {
        if (this._rootEl && !DomUtils.contains(this._rootEl, event.target)) {
            this.setMenuOpen(false, event);
            window.removeEventListener("click", this.handleWindowClick);
            window.removeEventListener("touchend", this.handleWindowClick);
        }
    };

    openAboutWindow(open) {
        this.props.onShowModal(open? <div className="Shop_aboutModal">
            <b>Developing a Webshop with React and GraphQL.</b>
            <br/>
            This is a small web app that implements an online shop.
            It is written and presented by <b>Alkis Mavridis</b> as a part of:<br/><br/>
            <b>Java developers day</b><br/>
            Vienna, 18.05.2018
            <br/><br/>
            <b>Special thanks to:</b>
            <ul>
                <li>Roja Maschajekhi for the German translation</li>
                <li>Amjad Ibraheem for the Arabic translation</li>
                <li>Hermann Inzillo for the Italian translation</li>
                <li>Yevhen Baiduk for the Ukranian translation</li>
                <li>RocketTheme eCommerce Icon Pack 1 by RocketTheme - http://www.rockettheme.com</li>
                <li>https://icons8.com/ for the User icon</li>
                <li>Cashier by Alfonso Melolonta Urbán from the Noun Project</li>
                <li>shopping by icon 54 from the Noun Project</li>
                <li>https://vathanx.deviantart.com/ for the flag icons</li>
            </ul>
        </div> :  null);
    }
    //endregion




    //region RENDERING
    renderMenu() {
        return (
            <div className="Shop_popup">
                {this.props.order.entries.length === 0 ? null :
                    <ShopButton
                    label={this.props.lob.main.pay.replace("%1", FormattingUtils.toPriceLabel(this.props.order.value, this.props.shop.currency))}
                    onClick={this.handlePayClicked.bind(this)}
                    className={"Shop_buyButton"}/>
                }
                <div className="Shop_aboutBut" onClick={this.openAboutWindow.bind(this, true)}>{this.props.lob.main.about}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="Shop_root" ref={el => this._rootEl=el}>
                <div className="Shop_rootIcon" onClick={this.setMenuOpen.bind(this, "toggle")}/>
                {this.state.open? this.renderMenu() : null}
            </div>
        );
    }

    //endregion
}

export default Shop;