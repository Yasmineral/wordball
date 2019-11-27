const e = React.createElement;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: false };
  }

  render() {
    if (this.state.start) {
      console.log(new Hole(200, 200, 1, 30))
      return <canvas id="canvas" width="500" height="900"></canvas>
    }

    return e(
       'button',
       { onClick: () => this.setState({ start: true }) },
       'START'
     );
   }
}


const domContainer = document.querySelector('#canvas_div');
ReactDOM.render(e(App),domContainer);
