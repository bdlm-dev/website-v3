import React, {Component} from 'react';
import clsx from 'clsx'

import './pomodoro.scss'
import ThemeSwitch from '../components/themeSwitch.js'
import HomeButton from '../components/homeButton.js'

export default class Pomodoro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: "light",
            option: 0,
            paused: true,
        }
        this.playButton = null;

        this.toggleTheme = this.toggleTheme.bind(this);
        this.updateSelector = this.updateSelector.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
    }

    updateSelector = (choice) => {
        document.querySelector(`#btn${this.state.option}`).classList.remove("selected");
        this.setState({option: choice}, () => {document.querySelector(`#btn${choice}`).classList.add("selected");});
    }

    componentDidMount() {
        this.togglePlaying();
        this.setState({theme: new URLSearchParams(document.location.search).get("theme") === "dark" ? "dark" : "light"});
    }

    toggleTheme() {
        this.setState({theme: this.state.theme === "light" ? "dark" : "light"});
      }

    togglePlaying() {
        if (this.playButton === null) {
            this.playButton = document.querySelector(".player");
        }
        this.setState({paused: !this.state.paused}, () => {
            this.playButton.classList.remove(this.state.paused ? "playing" : "paused");
            this.playButton.classList.add(this.state.paused ? "paused" : "playing");
        });
    }

    render() {
        var classList = clsx({
            "app": true,
            "dark": this.state.theme === "dark",
            "light": this.state.theme === "light",
          });
        
        return(
            <div className={classList}>
                <div className="main_wrapper">
                    <ThemeSwitch theme={this.state.theme} click={this.toggleTheme}/>
                    <HomeButton theme={this.state.theme}/>
                    <div className="main">
                        <div className="selectors">
                            <button className="button selected" onClick={() => {this.updateSelector(0)}} id="btn0">Study</button>
                            <button className="button" onClick={() => {this.updateSelector(1)}} id="btn1">Short Break</button>
                            <button className="button" onClick={() => {this.updateSelector(2)}} id="btn2">Long Break</button>
                        </div>
                        <div className="time">
                            25:00
                        </div>
                        <div className="time_control_wrapper">
                            <button className="time_control player playing" onClick={() => {this.togglePlaying();}}></button>
                            <button className="time_control" ></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export const Head = () => <title>Pomodoro</title>

// TODO:
// actually use the point of components,
// and split this entire thing up.

//figure out timer tomorrow with
// https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/