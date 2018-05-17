import React, {Component} from 'react';
import PropTypes from "prop-types";
import cx from "classnames";
import "./User.css";
import DomUtils from "../../utils/DomUtils";
import ShopInput from "../ShopInput/ShopInput";
import ShopButton from "../ShopButton/ShopButton";
import GraphQL, {ERROR_CODE} from "../../utils/GraphQL";

import q from "./User.queries";


const MODE = {
    LOGIN:1,
    SIGNIN:2
};


class User extends Component {
    static propTypes = {
        //data
        user: PropTypes.object,
        lob: PropTypes.object.isRequired,


        //actions
        onUserChanged: PropTypes.func.isRequired,

        //styling
    };

    //static defaultProps = {};


    //region LIFE CYCLE
    constructor(props) {
        super(props);

        this._rootEl = true;
        this.state = {
            open:false,
            mode:MODE.LOGIN,
            errorMessage:null,

            //login variables
            userName:"",
            password:"",

            //signin variables
            signinUserName:"",
            signinPassword:"",
            signinPassword2:""
        };
    }

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




    //region UTILS
    getErrorForCode(code, param) {
        switch(code) {
            case ERROR_CODE.USER_ALREADY_EXISTS:
                return this.props.lob.main.userAlreadyExistsError.replace("%1", param);

            case ERROR_CODE.USER_NOT_EXISTS:
                return this.props.lob.main.userNotExistsError.replace("%1", param);

            case ERROR_CODE.WRONG_PASSWORD:
                return this.props.lob.main.wrongPasswordError;

            default: return null;
        }
    }
    //endregion




    //region EVENT HANDLERS
    handleWindowClick = (event) => {
        if (this._rootEl && !DomUtils.contains(this._rootEl, event.target)) {
            this.setMenuOpen(false, event);
            window.removeEventListener("click", this.handleWindowClick);
            window.removeEventListener("touchend", this.handleWindowClick);
        }
    };


    setMode(mode, event) {
        if (event) event.stopPropagation();
        this.setState({
            mode:mode,
            errorMessage:null
        });
    }

    setMenuOpen(isOpen, event) {
        if (event) event.stopPropagation();

        if (isOpen==="toggle") isOpen = !this.state.open;
        this.setState({
            open:isOpen,
            errorMessage:null
        });

        //update window event
        if (isOpen) window.addEventListener("click", this.handleWindowClick);
        if (isOpen) window.addEventListener("touchend", this.handleWindowClick);
    }

    handleTextChange(key, newVal) {
        this.setState({
            [key]:newVal,
            errorMessage:null
        });
    }

    signin() {
        //check error cases
        if (!this.state.signinUserName) {
            this.setState({errorMessage:this.props.lob.main.noUserName});
            return;
        }

        if (!this.state.signinPassword) {
            this.setState({errorMessage:this.props.lob.main.noPassword});
            return;
        }

        if (this.state.signinPassword !== this.state.signinPassword2) {
            this.setState({errorMessage:this.props.lob.main.passwordDoNotMatch});
            return;
        }

        //do the request
        const params = {username:this.state.signinUserName, password:this.state.signinPassword};
        GraphQL.run(q.SIGNIN, params).then(resp => {
            if (resp.errors) {
                const code = GraphQL.getFirstErrorCode(resp.errors);
                this.setState({
                    errorMessage: this.getErrorForCode(code, this.state.signinUserName) || this.props.lob.main.signinError
                });
                return;
            }
            this.props.onUserChanged(resp.data.signin);
            this.setMenuOpen(false);
        }, xhr => {
            console.log("failure");
        });
    }

    handleLoginClick() {
        //check error cases
        if (!this.state.userName) {
            this.setState({errorMessage:this.props.lob.main.noUserName});
            return;
        }

        if (!this.state.password) {
            this.setState({errorMessage:this.props.lob.main.noPassword});
            return;
        }

        //do the request
        GraphQL.run(q.LOGIN, {username:this.state.userName, password:this.state.password}).then(resp => {
            if (resp.errors) {
                const code = GraphQL.getFirstErrorCode(resp.errors);
                this.setState({
                    errorMessage: this.getErrorForCode(code, this.state.userName) || this.props.lob.main.loginError
                });
                return;
            }
            this.props.onUserChanged(resp.data.login);
            this.setMenuOpen(false);
        }, xhr => {
            console.log("failure");
        });
    }

    handleLogoutClick() {
        GraphQL.run(q.LOGOUT).then(resp => {
            this.props.onUserChanged(null);
            this.setMenuOpen(false);
        }, xhr => {
            console.log("failure");
        });
    }
    //endregion



    //region RENDERING
    renderUserMenu() {
        return (
            <div>
                <ShopButton label={this.props.lob.main.logout} style={{width:"100%"}} onClick={this.handleLogoutClick.bind(this)}/>
            </div>
        );
    }

    renderErrorMessage() {
        if (!this.state.errorMessage) return null;
        return <div className="User_errorMes">{this.state.errorMessage}</div>
    }

    renderLogin() {
        return (
            <div>
                <div className={"User_popupLabel"}>{this.props.lob.main.username}</div>
                <ShopInput
                    value={this.state.userName}
                    placeholder={this.props.lob.main.username}
                    onChange={this.handleTextChange.bind(this, "userName")}/>

                <div style={{marginTop:"16px"}} className={"User_popupLabel"}>{this.props.lob.main.password}</div>
                <ShopInput
                    value={this.state.password}
                    type={"password"}
                    placeholder={this.props.lob.main.password}
                    onChange={this.handleTextChange.bind(this, "password")}/>

                {this.renderErrorMessage()}
                <ShopButton label={this.props.lob.main.login} style={{width:"100%", marginTop: "16px"}} onClick={this.handleLoginClick.bind(this)}/>

                <div className="User_signinLabel" onClick={this.setMode.bind(this, MODE.SIGNIN)}>
                    {this.props.lob.main.noAcount}
                </div>
            </div>
        );
    }

    renderSignin() {
        return (
            <div>
                <div className={"User_popupLabel"}>{this.props.lob.main.username}</div>
                <ShopInput
                    value={this.state.signinUserName}
                    placeholder={this.props.lob.main.username}
                    onChange={this.handleTextChange.bind(this, "signinUserName")}/>

                <div style={{marginTop:"16px"}} className={"User_popupLabel"}>{this.props.lob.main.password}</div>
                <ShopInput
                    value={this.state.signinPassword}
                    type={"password"}
                    placeholder={this.props.lob.main.password}
                    onChange={this.handleTextChange.bind(this, "signinPassword")}/>

                <div style={{marginTop:"16px"}} className={"User_popupLabel"}>{this.props.lob.main.repeatPassword}</div>
                <ShopInput
                    value={this.state.signinPassword2}
                    type={"password"}
                    placeholder={this.props.lob.main.repeatPassword}
                    onChange={this.handleTextChange.bind(this, "signinPassword2")}/>

                {this.renderErrorMessage()}

                <ShopButton label={this.props.lob.main.signin} style={{width:"100%", marginTop: "16px"}} onClick={this.signin.bind(this)}/>

                <div className="User_signinLabel" onClick={this.setMode.bind(this, MODE.LOGIN)}>
                    {this.props.lob.main.backToLogin}
                </div>
            </div>
        );
    }


    /**
     * renders either the user menu (if a user is logged in),
     * a login screen, or a signin screen for non logged in users.
     * */
    renderMenu() {
        let content;
        if (this.props.user) content = this.renderUserMenu();
        else if (this.state.mode===MODE.LOGIN) content = this.renderLogin();
        else content = this.renderSignin();

        return (
            <div className={"User_popup"}>{content}</div>
        );
    }

    renderUserLabel() {
        return (
            <div className="User_nameLabel" onClick={this.setMenuOpen.bind(this, "toggle")}>
                {this.props.user.userName}
            </div>
        );
    }


    render() {
        return (
            <div className={cx("User_root", this.state.open?"User_open" : null)} ref={el => this._rootEl=el}>
                <div className="User_userIcon" onClick={this.setMenuOpen.bind(this, "toggle")}/>
                {this.props.user? this.renderUserLabel() : null}
                {this.state.open? this.renderMenu() : null}
            </div>
        );
    }
    //endregion
}

export default User;