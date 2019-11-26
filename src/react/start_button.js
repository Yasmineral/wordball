'use strict'
const e = React.createElement
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: false }
  }
  render() {
    if (this.state.start) {
    }
    return e(
      'button',
      { onClick: () => this.setState({ start: true }) },
      'Like'
    )
  }
}
const domContainer = document.querySelector('#like_button_container')
ReactDOM.render(e(LikeButton), domContainer)
