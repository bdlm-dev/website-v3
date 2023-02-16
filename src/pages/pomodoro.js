import React, {Component} from 'react';
import clsx from 'clsx'

import './pomodoro.scss'
import ThemeSwitch from '../components/themeSwitch.js'
import HomeButton from '../components/homeButton.js'

export default class Pomodoro extends Component {
    constructor(props) {
        super(props)
        this.timeOptions = {
            '0': 1500,
            '1': 300,
            '2': 900,
        }

        this.state = {
            theme: "dark",
            option: 0,
            paused: true,
            time: 1500,
        }

        this.playButton = null;

        this.toggleTheme = this.toggleTheme.bind(this);
        this.updateSelector = this.updateSelector.bind(this);
        this.togglePlaying = this.togglePlaying.bind(this);
    }

    timer = () => {
        this.interval = setInterval(
            () => {
                this.setState(prevState => ({
                    time: prevState.time-1,
                }), () => {
                    if (this.state.time === 0) {
                        this.stopTimer();
                    }
                });
            }, 1000,
        )
    }

    startTimer = () => {
        this.timer();
    }

    stopTimer = () => {
        clearInterval(this.interval);
    }

    updateSelector = (choice) => {
        document.querySelector(`#btn${this.state.option}`).classList.remove("selected");
        this.setState({option: choice}, () => {document.querySelector(`#btn${choice}`).classList.add("selected");});
        this.checkButtons(choice);
    }

    checkButtons = (choice="NONE") => {
        this.setState({time: this.timeOptions[choice === "NONE" ? this.state.option : choice]});
        this.stopTimer();
        if (!this.state.paused) {
            this.togglePlaying();
        }
    }

    componentDidMount() {
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
            this.playButton.classList.remove(this.state.paused ?  "paused" : "playing");
            this.playButton.classList.add(this.state.paused ?  "playing" : "paused");
            if (!this.state.paused) {
                this.startTimer();
            }
            else {
                this.stopTimer();
            }
        });
    }

    zeroPad = (num, places) => String(num).padStart(places, '0')

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
                            {Math.floor(this.zeroPad(this.state.time/60, 2))}:{this.zeroPad(this.state.time % 60, 2)}
                        </div>
                        <div className="time_control_wrapper">
                            <button className="time_control player playing" onClick={() => {this.togglePlaying();}}></button>
                            <button className="time_control" onClick={()=>{this.checkButtons();}}></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const Head = () => <title>bdlm - Pomodoro</title>

// TODO:
// split up into multiple components

// redo the playing buttons as button-label pairs