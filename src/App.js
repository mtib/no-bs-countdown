import React, { Component } from 'react';
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const sparams = new URLSearchParams(window.location.search);
    let future;
    if (sparams.has("d") && sparams.has("t")) {
      future = new Date(`${sparams.get("d")}T${sparams.get("t")}`);
      console.log(future, `${sparams.get("d")}T${sparams.get("t")}`);
    } else {
      future = new Date(now);
      future.setDate(now.getDate() + 1);
    }
    const title = sparams.has("m") ? sparams.get("m") : "Simple Countdown";
    this.state = {
      targetTime: future,
      creationTime: now,
      title: title,
    };
    this.newCountdown = this.newCountdown.bind(this);
  }

  newCountdown(date, time, title) {
    this.setState({
      targetTime: new Date(`${date}T${time}`),
      title: title,
    })
  }

  render() {
    const date = InputConversion.toInputDate(this.state.targetTime);
    const time = InputConversion.toInputTime(this.state.targetTime);
    window.history.pushState([date, time], `${date} ${time}`, `?d=${date}&t=${time}&m=${encodeURIComponent(this.state.title)}`)
    return (<div className="App-counter">
      <h1>{this.state.title}</h1>
      <CountDown targetTime={this.state.targetTime} />
      <Form newCountdown={this.newCountdown} initialTarget={this.state.targetTime} title={this.state.title} />
    </div>);
  }
}
class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    }
    this.tickInterval = setInterval(() => this.tick(), 10);
  }

  tick() {
    this.setState((state) => {
      return {
        currentTime: new Date(),
      }
    })
  }

  render() {
    return (
      <div>
        <div className="App-ms-counter"><ParsedTime end={this.props.targetTime.getTime()} start={this.state.currentTime.getTime()} /></div>
        <div className="App-info">
          <p>{this.state.currentTime.toLocaleString()} — {this.props.targetTime.toLocaleString()}</p>
        </div>
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    const creation = new Date();
    this.state = {
      creation: creation,
      selectedDate: InputConversion.toInputDate(this.props.initialTarget),
      selectedTime: InputConversion.toInputTime(this.props.initialTarget),
      selectedTitle: this.props.title,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault()
    switch (e.target.type) {
      case "date":
        this.setState({
          selectedDate: e.target.value,
        })
        break
      case "time":
        this.setState({
          selectedTime: e.target.value,
        })
        break
      case "text":
        this.setState({
          selectedTitle: e.target.value,
        })
        break
      default:
        console.log("Unexpected")
    }
  }

  render() {
    return (
      <div className="App-footer">
        <div>Setup new Countdown</div>
        <div className="App-form">
          <input type="text" value={this.state.selectedTitle} placeholder="Title" onChange={this.handleChange}></input>
          <input type="date" value={this.state.selectedDate} onChange={this.handleChange}></input>
          <input type="time" value={this.state.selectedTime} onChange={this.handleChange}></input>
          <button onClick={() => this.props.newCountdown(this.state.selectedDate, this.state.selectedTime, this.state.selectedTitle)}>Go</button>
        </div>
      </div>
    );
  }
}

class ParsedTime extends Component {
  render() {
    const diff = this.props.end - this.props.start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / (1000)) % 60;
    const millis = Math.floor(diff) % 1000;
    return (<span>
      <OptionalTime value={days} unit="days" />
      <OptionalTime value={hours} unit="h" />
      <OptionalTime value={minutes} unit="min" />
      <OptionalTime value={seconds} unit="s" />
      <code>{millis.toString().padStart(3, "0")}</code> ms</span>)
  }
}

class OptionalTime extends Component {
  render() {
    if (this.props.value > 0) {
      return (
        <span><code>{this.props.value}</code> {this.props.unit} </span>
      );
    } else {
      return (<span></span>);
    }
  }
}

class InputConversion {

  static toInputDate(d) {
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`
  }

  static toInputTime(d) {
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`
  }

}

export default App;