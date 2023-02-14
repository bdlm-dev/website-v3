import React, {Component} from 'react'

import {home_wrapper, home_link} from './homeButton.module.scss'

export default class HomeButton extends Component {
    render() {
        return (
            <div className={home_wrapper}>
                <a className={home_link} href={`/?theme=${this.props.theme}`} data-theme={`${this.props.theme}`} alt="Home"></a>
            </div>
        );
    }
}