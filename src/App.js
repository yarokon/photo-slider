import React, { Component } from 'react';


const FIRST_INDEX = 0;
const LAST_INDEX = 30;
const THROTTLE_COEFFICIENT = 6;

const importAll = req => req.keys().map(req);
const images = importAll(require.context('./images', false, /\w+.jpg$/));
images.sort((a, b) => a.localeCompare(b));


class App extends Component {
  state = {
    index: FIRST_INDEX,
    tracking: false,
    x: 0,
  }

  onStart = ({ clientX, targetTouches }) => {
    this.setState({
      tracking: true,
      x: targetTouches ? targetTouches[0].clientX : clientX
    });
  }

  onEnd = () => {
    this.setState({
      tracking: false
    });
  }

  onMove = ({ clientX, targetTouches }) => {
    this.setState(({index, tracking, x}) => {
      let updatetedIndex;
      clientX = targetTouches ? targetTouches[0].clientX : clientX;

      if (!tracking || Math.abs(clientX - x) < THROTTLE_COEFFICIENT) {
        return {};
      }

      if (clientX > x) {
        updatetedIndex = index > FIRST_INDEX ? index - 1 : LAST_INDEX;
      } else if (clientX < x) {
        updatetedIndex = index < LAST_INDEX ? index + 1 : FIRST_INDEX;
      }

      return {
        index: updatetedIndex,
        x: clientX
      }
    });
  }

  render() {
    const { index, tracking } = this.state;

    return (
      <main>
        <div
          className="image-container"
          style={{ cursor: tracking ? 'ew-resize' : 'pointer' }}
          onMouseDown={this.onStart}
          onTouchStart={this.onStart}

          onMouseMove={this.onMove}
          onTouchMove={this.onMove}

          onMouseUp={this.onEnd}
          onTouchEnd={this.onEnd}
          onMouseLeave={this.onEnd}
        >
          <img
            src={images[index]}
            alt="Rubik's cube"
            draggable={false}/>
        </div>
      </main>
    );
  }
}

export default App;
