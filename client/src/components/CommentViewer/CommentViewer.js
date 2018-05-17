import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./CommentViewer.css";
import GraphQL from "../../utils/GraphQL";
import q from "./CommentViewer.queries";

class CommentViewer extends Component {
    //region PROPS AND STATE
    static propTypes = {
        /** The product to fetch the comments for. */
        product: PropTypes.object.isRequired,
    };

    state = {};
    //endregion



    //region LIFE CYCLE
    /*componentDidMount() {
        GraphQL.run(q.GET_COMMENTS, {productId:this.props.product.id})
            .then(resp => {
              if (resp.errors) return;
            })
    }*/
    //endregion




    //region EVENT HANDLERS
    handleSubmit() {
        GraphQL.run(q.SUBMIT_COMMENT, {productId:this.props.product.id, text:this.state.commentText})
            .then(resp => {
                if (resp.errors) return;
                console.log(resp);
            });
    }
    //endregion




    //region RENDERING
    render() {
        return (
            <div className="CommentViewer_root">
                TODO
            </div>
        );
    }

    //endregion
}

export default CommentViewer;