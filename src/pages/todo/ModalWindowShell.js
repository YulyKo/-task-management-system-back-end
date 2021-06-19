import React, { Component }  from 'react';
import PropTypes from 'prop-types';

export default class ModalWindowShell extends Component {
  static get propTypes() { 
    return { 
      children: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    return <div className="modal-window">
      <button onClick={this.toggleHidden.bind(this)} >
        Click to hide modal
      </button>
      {this.props.children}
    </div>;
  }
}
