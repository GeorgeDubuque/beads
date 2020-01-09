import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import Canvas from './Canvas.js';
import { undo, redo, setActiveColor } from '../actions/rootActions';
import { SketchPicker } from 'react-color';
import Draggable from 'react-draggable';
import ToolBox from './ToolBox';


function mapDispatchToProps(dispatch) {
  return {
      undo: () => dispatch(undo()),
      redo: () => dispatch(redo()),
      setActiveColor: (color) => dispatch(setActiveColor(color))
  }
}

class ConnectedApp extends Component {


  constructor(props){
    super(props);
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(newColor){
    this.props.setActiveColor(newColor.hex);
  }

  render(){
    return (
      <div className="App">
        <Canvas/>
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
          <div className="SketchPicker">
          <div className="handle" id="handle"></div>
          <SketchPicker background={"black"}  onChangeComplete={this.changeColor}></SketchPicker>
          </div>
          

        </Draggable>
        <ToolBox></ToolBox>
      </div>
    );
  }
  
}
const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;
