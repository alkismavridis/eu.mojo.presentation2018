import React, { Component } from 'react';

import "./MainPage.css";
import User from "../User/User";
import Shop from "../Shop/Shop";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import LanguageMenu from "../LanguageMenu/LanguageMenu";

import LOB from "../../data/lob/lob.js";
import ShopCategoryViewer from "../ShopCategoryViewer/ShopCategoryViewer";
import GraphQL from "../../utils/GraphQL";
import q from "./MainPage.queries";
import ShopUtils from "../../utils/ShopUtils";
import DomUtils from "../../utils/DomUtils";


const DEFAULT_LANGUAGE = "en";


function makeEmptyOrder() {
    return {
        value:0,
        entries:[]
    };
}


class MainPage extends Component {


    //region LIFE CYCLE
    constructor(props) {
        super(props);

        this._modal = null;

        this.state = {
            user:null,
            currentCategory:null,
            order:makeEmptyOrder(),
            shop:{
                currency:""
            },
            lob: LOB.en,
            modalContent:null
        };
    }

    componentDidMount() {
        //choose language to load
        let lang = DEFAULT_LANGUAGE;
        if (window && window.sessionStorage && window.sessionStorage.lang) {
            lang = window.sessionStorage.lang;
        }

        //if the language is not supported, revert to default
        if(!LOB[lang]) lang = DEFAULT_LANGUAGE;
        this.doInitFetch(lang, 0);
    }
    //endregion




    //region EVENT HANDLERS
    doInitFetch(lang, catId) {
        GraphQL.run(q.INIT_FETCH, {lang:lang, categoryId:catId})
            .then(resp => {
                if (!resp.data) return;

                //we want to track category separately... Make it its onw variable and save it into state.
                const currentCategory = resp.data.shop.category;
                resp.data.shop.category = null;

                this.setState({
                    user:resp.data.user,
                    order:resp.data.order,
                    shop:resp.data.shop,
                    currentCategory:currentCategory,
                    lob:LOB[lang]
                });
            });
    }

    handleLanguageChange(newLang) {
        if(!LOB[newLang]) return;
        this.setState({
            lob: LOB[newLang]
        });

        //save it into sessionStorage
        if (window && window.sessionStorage && window.sessionStorage) {
            window.sessionStorage.lang = newLang;
        }

        console.log(this.state.currentCategory? this.state.currentCategory.id : 0);
        this.doInitFetch(newLang, this.state.currentCategory? this.state.currentCategory.id : 0);
    }

    handleUserChange(newUser) {
        this.setState({ user:newUser });
    }

    /** Must be called once the payment has taken place.
     * No request is being sent by this method.
     * Actual request is sent elsewhere. This method handles the side effects of the payment,
     * like emptying the cart.
     * */
    handlePay(value) {
        //TODO make animation

        this.setState({
            order:makeEmptyOrder()
        });
    }

    /** call this when a product is added, or a quantity of an entry is changed */
    handleProductAdded(value, entry) {
        const order = this.state.order;
        order.value = value;
        ShopUtils.addToOrder(order, entry);

        this.setState({order:order});
    }

    handleCartEmptied() {
        this.setState({order:makeEmptyOrder()});
    }

    setModalContent(cont) {
        this.setState({
            modalContent:cont
        });
    }

    /** handles the modal overlay click. PLease note that this method will fire even if one clicks inside the modal window. */
    handleModalOverlayClick(event) {
        if (DomUtils.contains(this._modal, event.target)) return;
        this.setModalContent(null);
    }

    handleCategoryChanged(newCategory) {
        this.setState({currentCategory:newCategory});
    }

    handleProductRemoved(productId, newValue) {
        const order = this.state.order;
        order.value = newValue;
        ShopUtils.removeFromOrder(order, productId);
        this.setState({order:order});
    }
    //endregion




    //region RENDERING
    renderModalWindow() {
        if (!this.state.modalContent) return;

        return <div className="MainPage_modalOverlay" onClick={this.handleModalOverlayClick.bind(this)}>
            <div className="MainPage_modalWindow" ref={el => this._modal = el}>
                {this.state.modalContent}
            </div>
        </div>;
    }

    render() {
        return (
            <div className="MainPage_root" style={{direction:this.state.lob.direction}}>
                <Shop
                    shop={this.state.shop}
                    order={this.state.order}
                    lob={this.state.lob}
                    onShowModal={this.setModalContent.bind(this)}
                    onPay={this.handlePay.bind(this)}/>

                <LanguageMenu
                    onChangeLanguage={this.handleLanguageChange.bind(this)}
                    lob={this.state.lob}/>

                <User
                    onUserChanged={this.handleUserChange.bind(this)}
                    user={this.state.user}
                    lob={this.state.lob}/>

                <ShoppingCart
                    order={this.state.order}
                    lob={this.state.lob}
                    onQuantityChanged={this.handleProductAdded.bind(this)}
                    onShowModal={this.setModalContent.bind(this)}
                    onRemoveProduct={this.handleProductRemoved.bind(this)}
                    shop={this.state.shop}
                    onEmptyChart={this.handleCartEmptied.bind(this)}/>

                <ShopCategoryViewer
                    lob={this.state.lob}
                    shop={this.state.shop}
                    category={this.state.currentCategory}
                    onAddProduct={this.handleProductAdded.bind(this)}
                    onShowModal={this.setModalContent.bind(this)}
                    onCategoryChanged={this.handleCategoryChanged.bind(this)}/>

                {this.renderModalWindow()}
            </div>
        );
    }
    //endregion

}

export default MainPage;