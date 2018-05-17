import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./ShopCategoryViewer.css";
import Product from "../Product/Product";
import ShopButton from "../ShopButton/ShopButton";
import GraphQL from "../../utils/GraphQL";
import q from "./ShopCategoryViewer.queries";

class ShopCategoryViewer extends Component {
    static propTypes = {
        //data
        /** language object. We need this for translations. */
        lob: PropTypes.object.isRequired,
        /** the category to view. */
        category: PropTypes.object,
        /** a reference to the global shop object. */
        shop:PropTypes.object.isRequired,

        //actions
        /** this will be called when the buy button is clicked.. */
        onAddProduct:PropTypes.func.isRequired,
        /** this callback helps us navigate through categories.. */
        onCategoryChanged:PropTypes.func.isRequired,
        /** opens a modal window */
        onShowModal:PropTypes.func.isRequired,
    };


    //region EVENT HANDLERS
    loadCategory(categoryId) {
        GraphQL.run(q.LOAD_CATEGORY, {categoryId:categoryId, lang:this.props.lob.language})
            .then(resp => {
                if (resp.errors) return;
                this.props.onCategoryChanged(resp.data.shop.category);
            })
    }
    //endregion




    //region RENDERING

    renderPrevDiv() {
        const prevCategory = this.props.category? this.props.category.prev : null;
        if (!prevCategory) return null;

        return  <div className="ShopCategoryViewer_prev" >
            <ShopButton
                label={prevCategory.name}
                onClick={this.loadCategory.bind(this, prevCategory.id)}
                className="ShopCategoryViewer_categoryBut"/>
        </div>;
    }

    renderNextDiv() {
        const nextCategory = this.props.category? this.props.category.next : null;
        if (!nextCategory) return null;

        return  <div className="ShopCategoryViewer_next">
            <ShopButton
                label={nextCategory.name}
                onClick={this.loadCategory.bind(this, nextCategory.id)}
                className="ShopCategoryViewer_categoryBut"/>
        </div>;
    }

    renderProductdiv() {
        if (!this.props.category) return <div className="ShopCategoryViewer_current" />;

        return  <div className="ShopCategoryViewer_current">
            {this.props.category.products.map(p =>
                <Product
                    lob={this.props.lob}
                    key={p.id}
                    product={p}
                    className="ShopCategoryViewer_prod"
                    onQuantityChanged={this.props.onAddProduct}
                    onShowModal={this.props.onShowModal}
                    shop={this.props.shop}/>)
            }
        </div>;
    }

    renderTitleDiv() {
        if (!this.props.category) return null;

        return <div className="ShopCategoryViewer_title">
            {this.props.category.name}
        </div>;
    }



    render() {
        return (
            <div className="ShopCategoryViewer_root">
                {this.renderTitleDiv()}
                {this.renderPrevDiv()}
                {this.renderProductdiv()}
                {this.renderNextDiv()}
            </div>
        );
    }

    //endregion
}

export default ShopCategoryViewer;