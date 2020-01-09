import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MOUSE_HELD } from '../constants/constants';

function mapStateToProps(state) {
  return {
      activeColor: state.activeColor,
      mouseStatus: state.mouseStatus
  };
};

class ConnectedBead extends Component {
  
  constructor(props){
    super(props);
    this.state = { mouseHeld: false, color: this.props.color };
    this.reColor = this.reColor.bind(this);
    this.reColor1 = this.reColor1.bind(this);
  }

  reColor1(){
    if(this.props.activeColor !== this.props.color){
      console.log("reColor: " + this.props.activeColor)
      this.setState({color: this.props.activeColor})
    }
  }

  reColor(e){
    if(this.props.mouseStatus == MOUSE_HELD  && this.props.activeColor !== this.props.color){
      console.log("reColor: " + this.props.activeColor)
      this.setState({color: this.props.activeColor})
    }
  }

  render() {
    console.log("renderingBead");
    const color = this.state.color;
    return (
      <div 
        className="object"
        style={{
          left: this.props.x, 
          top: this.props.y,
          width: this.props.width,
          height: this.props.height,
          borderRadius: 7,
          backgroundColor: color,
          position: "absolute",
          border: "1px solid black",
          padding: 0,
          margin: 0
        }}
        onClick={this.reColor1}
        onMouseOver={this.reColor}
      >
      </div>
    )
  }
}

const Bead = connect(mapStateToProps)(ConnectedBead);

export default Bead;