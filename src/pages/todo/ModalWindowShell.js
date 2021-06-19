import React, { Component }  from 'react';
import PropTypes from 'prop-types';

export default class ModalWindowShell extends Component {
  static get propTypes() { 
    return { 
      children: PropTypes.object,
    };
  }

  render() {
    return <div className="modal-window">
      {this.props.children}
    </div>;
  }
}
