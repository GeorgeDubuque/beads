import React, { Component } from 'react';
import './ToolBox.css';
import {connect} from 'react-redux';
import Canvas from './Canvas.js';
import { undo, redo, setActiveColor } from '../actions/rootActions';
import { SketchPicker } from 'react-color';
import Draggable from 'react-draggable';


function mapDispatchToProps(dispatch) {
  return {
      undo: () => dispatch(undo()),
      redo: () => dispatch(redo()),
      setActiveColor: (color) => dispatch(setActiveColor(color))
  }
}

class ConnectedToolBox extends Component {
  constructor(props){
    super(props);
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(newColor){
    this.props.setActiveColor(newColor.hex);
  }

  render(){
    return (
        <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        >
          <div className="tb container-fluid">
          <div className="handle" id="handle"></div>
          </div>
        </Draggable>
    );
  }
  
}
const ToolBox = connect(null, mapDispatchToProps)(ConnectedToolBox);

export default ToolBox;
