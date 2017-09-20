import Renderer from './Renderer'
import Internal from './Internal'
import Component from './Component'

const React = {

  createElement(type, config, ...children) {
    return { type, props: config || {}, children }
  },
}

class Test extends Component {

  componentDidMount() {
    window.test = Internal.getInstance(this)
  }

  render() {
    return (
      <h2>{this.props.a}</h2>
    )
  }
}

function App() {
  return (
    <div contentEditable>heheda</div>
  )
}

window.ret = Renderer.render(document.body, (
  <div>
    <h1>helloworld</h1>
    <App />
    <Test a={123}>asdf</Test>
  </div>
))
