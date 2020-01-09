# react-pen-draw

> 

[![NPM](https://img.shields.io/npm/v/react-pen-draw.svg)](https://www.npmjs.com/package/react-pen-draw) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-pen-draw
```

## Usage

```jsx
import React, { Component } from 'react'

import PenDraw from 'react-pen-draw'

class Example extends Component {
   state={
    clear:0
  }
  render () {
    return (
      <div>
        <button onClick={()=>{this.setState({clear:1})}}>clear</button>
        <PenDraw 
          clearScreen={this.state.clear}
          lineWidth={2}
          lineColor="#000"
          style={{
            border:"1px solid",
            width:"400px",
            height:"400px"
          }}
        />
      </div>
    )
  }
}
```

## License

MIT © [MuhammadTalib](https://github.com/MuhammadTalib)
