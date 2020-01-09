import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
      activeColor: state.activeColor
  };
};

class ConnectedBrush extends Component {
  
  render() {
    return (
      <div 
        className="object"
        onMouseDown={false}
        style={{
          left: this.props.x, 
          top: this.props.y,
          width: this.props.width,
          height: this.props.height,
          borderRadius: 100,
          backgroundColor: this.props.color,
          position: "absolute",
          padding: 0,
          margin: 0,
          pointerEvents: "none",
        }}
      >

      </div>
    )
  }
}

const Brush = connect(mapStateToProps)(ConnectedBrush);

export default Brush;