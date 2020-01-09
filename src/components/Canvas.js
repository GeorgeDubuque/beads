import React, { Component } from 'react';
import './Canvas.css';
import { connect } from 'react-redux';
import Bead from './Bead';
import Brush from './Brush';
import { placeBead, setBrushPosition, undo, redo, setMouseStatus } from '../actions/rootActions';
import GridLine from './GridLine';
import { MOUSE_HELD } from '../constants/constants';
import Button from 'react-bootstrap/Button';


function mapStateToProps(state) {
  return {
    beads: state.beads,
    brushPosition: state.brushPosition,
    activeColor: state.activeColor,
    mouseStatus: state.mouseStatus
  };
};

function mapDispatchToProps(dispatch) {
  return {
    placeBead: (beads) => dispatch(placeBead(beads)),
    setBrushPosition: (xy) => dispatch(setBrushPosition(xy)),
    undo: () => dispatch(undo()),
    redo: () => dispatch(redo()),
    setMouseStatus: (status) => dispatch(setMouseStatus(status))
  }
}

function getBeadHash(x, y) {
  return x + " " + y;
}


const beadSize = 20;
const snapX = beadSize / 2;
const snapY = beadSize;

class ConnectedCanvas extends Component {

  constructor(props) {
    super(props);
    this.intervalId = 0;
    this.placeObject = this.placeObject.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this.snap = this.snap.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
  }

  checkCollisions(x, y, snapX, snapY) {
    const beads = this.props.beads;
    const center = beads[getBeadHash(x, y)];
    // const topLeft = beads[getBeadHash(x-snapX, y-snapY)];
    // const top = beads[getBeadHash(x, y-snapY)];
    // const topRight = beads[getBeadHash(x+snapX, y-snapY)];
    const right = beads[getBeadHash(x + snapX, y)];
    // const bottomRight = beads[getBeadHash(x+snapX, y+snapY)];
    // const bottom = beads[getBeadHash(x, y+snapY)];
    // const botomLeft = beads[getBeadHash(x-snapX, y+snapY)];
    const left = beads[getBeadHash(x - snapX, y)];
    return center || left || right;
    // topLeft || top || topRight || right || bottomRight || bottomRight || botomLeft || left || bottom;
  }

  snap(numToRound, multiple) {
    if (multiple === 0)
      return numToRound;

    var remainder = numToRound % multiple;
    if (remainder === 0)
      return numToRound;

    return numToRound + multiple - remainder;
  }

  brush() {
    var x = this.props.brushPosition.x;
    var y = this.props.brushPosition.y;
    return (
      <Brush
        x={x}
        y={y}
        width={beadSize}
        height={beadSize}
        color={this.props.activeColor}
      />
    );
  }

  mouseDown() {
    // this.setState({mouseHeld: true});
    console.log("mouseDown");
    this.props.setMouseStatus(MOUSE_HELD);
  }

  mouseUp() {
    console.log("mouseUp");
    this.props.setMouseStatus("");
    // this.setState({mouseHeld: false});

  }

  placeObject() {

    let beads = Object.assign({}, this.props.beads);
    var x = this.props.brushPosition.x;
    var y = this.props.brushPosition.y;
    if (!this.checkCollisions(x, y, snapX, snapY)) {
      beads[getBeadHash(x, y)] = (
        <Bead
          x={x}
          y={y}
          width={beadSize}
          height={beadSize}
          color={this.props.activeColor}
        />
      );
      this.props.placeBead(beads);
    }

  }

  _onMouseMove(e) {
    var x = e.clientX - beadSize;
    var y = e.clientY - beadSize;

    x = this.snap(x, beadSize / 2);
    y = this.snap(y, beadSize);
    this.props.setBrushPosition({ x: x, y: y });
    console.log(this.props.mouseStatus);
    if (this.props.mouseStatus == MOUSE_HELD) {
      this.placeObject();
    }
  }

  renderGridLines() {
    var numXLines = window.innerWidth / snapX;
    var numYLines = window.innerHeight / snapY;
    var lines = [];
    var gridColor = "#BEBEBE";
    // var gridColor = "#4E4E4E"; dark mooooode!
    for (var i = 1; i < numXLines; i++) {
      var x = i * snapX;
      lines.push(
        <GridLine x={x} color={gridColor} height={"100%"} width={1} />
      )
    }
    for (var i = .5; i < numYLines; i++) {
      var y = i * snapY;
      lines.push(
        <GridLine y={y} color={gridColor} height={1} width={"100%"} />
      )
    }
    return lines;
  }



  render() {
    return (
      <>
        <div
          className="Canvas" id="canvas"
          onMouseMove={this._onMouseMove}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onClick={this.placeObject}
        >
          {this.renderGridLines()}
          {Object.values(this.props.beads)}
          {this.brush()}
        </div>
        <Button onClick={this.props.undo} variant="light">Undo</Button>
        <Button onClick={this.props.redo}>Redo</Button>
      </>
    );
  }

}
const Canvas = connect(mapStateToProps, mapDispatchToProps)(ConnectedCanvas);

export default Canvas;
