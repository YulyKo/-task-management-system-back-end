import { Component } from "react";

export default class ModalWindowShell extends Component {
  render() {
    return <div className="modal-window">
      {this.props.children}
    </div>
  }
}
