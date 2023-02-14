import React, {Component} from 'react';
import clsx from 'clsx'

import './app.scss'
import ThemeSwitch from '../components/themeSwitch.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
    }
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    this.setState({themeL: new URLSearchParams(document.location.search).get("theme") === "dark" ? "dark" : "light"});
  }

  toggleTheme() {
    this.setState({theme: this.state.theme === "light" ? "dark" : "light"});
  }

  render() {
    var classList = clsx({
      "app": true,
      "dark": this.state.theme === "dark",
      "light": this.state.theme === "light",
    });

    return (
      <div className={classList}>
        <ThemeSwitch theme={this.state.theme} click={this.toggleTheme}/>
        <div className="landing">
          <div className="spacer" />

          <span className="initials">bdlm</span>

          <div className="tagline_wrapper">
            <span className="tagline">
              a student interested in everything tech,
            </span>
            <span className="tagline">
              finding delight in solving new problems.
            </span>
          </div>

          <div className="links">
            <a className="pomodoro_link" href={`/pomodoro?theme=${this.state.theme}`}>pomodoro</a>
          </div>
        </div>
      </div>
    )
  }
}

// consider using redux for state management in future build
// rewrite