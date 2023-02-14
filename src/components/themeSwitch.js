import React, {Component} from 'react';

import {theme_wrapper, theme_switch, circle} from './themeSwitch.module.scss';

class ThemeSwitch extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={theme_wrapper}>
                <button id="theme_switch" className={theme_switch} onClick={this.props.click}></button>
                <label className={`${circle} ${this.props.theme}`} htmlFor="theme_switch" data-theme={`${this.props.theme}`}></label>
            </div>
        )
    }
}

export default ThemeSwitch