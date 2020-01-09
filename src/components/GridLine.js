import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
      activeColor: state.activeColor
  };
};

class ConnectedGridLine extends Component {
  
  render() {
    return (
      <div 
        className="object"
        style={{
          left: this.props.x, 
          top: this.props.y,
          width: this.props.width,
          height: this.props.height,
          backgroundColor: this.props.color,
          position: "absolute",
          padding: 0,
          margin: 0,
          pointerEvents: "none"
        }}
      >

      </div>
    )
  }
}

const GridLine = connect(mapStateToProps)(ConnectedGridLine);

export default GridLine;