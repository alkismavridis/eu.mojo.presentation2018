import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./LanguageMenu.css";

import enFlag from "../../data/img/flags/en.png";
import deFlag from "../../data/img/flags/de.png";
import grFlag from "../../data/img/flags/gr.png";
import uaFlag from "../../data/img/flags/ua.png";
import syFlag from "../../data/img/flags/sy.png";
import itFlag from "../../data/img/flags/it.png";
import DomUtils from "../../utils/DomUtils";

class LanguageMenu extends Component {
    static propTypes = {
        //data
        lob:PropTypes.object.isRequired,

        //actions
        onChangeLanguage:PropTypes.func.isRequired,

        //styling
    };

    static defaultProps = {};


    //region LIFE CYCLE
    constructor(props) {
        super(props);

        this._rootEl = null;

        this.state = {
            open:false
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
    handleWindowClick = (event) => {
        if (this._rootEl && !DomUtils.contains(this._rootEl, event.target)) {
            this.setOpen(false);
            window.removeEventListener("click", this.handleWindowClick);
            window.removeEventListener("touchend", this.handleWindowClick);
        }
    };

    getIconFor(langCode) {
        switch(langCode) {
            case "de": return deFlag;
            case "en": return enFlag;
            case "gr": return grFlag;
            case "it": return itFlag;
            case "ar": return syFlag;
            case "uk": return uaFlag;
            default: return null;
        }
    }
    //endregion




    //region EVENT HANDLERS

    setOpen(isOpen, event) {
        if (event) event.stopPropagation();

        if (isOpen==="toggle") isOpen = !this.state.open;
        this.setState({open:isOpen});

        //update window event
        if (isOpen) window.addEventListener("click", this.handleWindowClick);
        if (isOpen) window.addEventListener("touchend", this.handleWindowClick);
    }

    selectLanguage(newLang) {
        this.props.onChangeLanguage(newLang);
        this.setOpen(false);
    }
    //endregion




    //region RENDERING
    renderMenu() {
        return (
            <div className={"LanguageMenu_menuPopup"}>
                <img src={syFlag} className="LanguageMenu_langIcon" alt="ar" onClick={this.selectLanguage.bind(this, "ar")}/>
                <img src={deFlag} className="LanguageMenu_langIcon" alt="de" onClick={this.selectLanguage.bind(this, "de")}/>
                <img src={enFlag} className="LanguageMenu_langIcon" alt="en" onClick={this.selectLanguage.bind(this, "en")}/>
                <img src={grFlag} className="LanguageMenu_langIcon" alt="gr" onClick={this.selectLanguage.bind(this, "gr")}/>
                <img src={itFlag} className="LanguageMenu_langIcon" alt="it" onClick={this.selectLanguage.bind(this, "it")}/>
                <img src={uaFlag} className="LanguageMenu_langIcon" alt="uk" onClick={this.selectLanguage.bind(this, "uk")}/>
            </div>
        );
    }


    render() {
        return (
            <div className="LanguageMenu_root" ref={el => this._rootEl = el}>
                <img
                    alt="current language"
                    src={this.getIconFor(this.props.lob.language)}
                    className="LanguageMenu_currentLangIcon"
                    onClick={this.setOpen.bind(this, "toggle")}/>

                {this.state.open? this.renderMenu() : null}
            </div>
        );
    }
    //endregion
}

export default LanguageMenu;