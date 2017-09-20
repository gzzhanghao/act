import Internal from './Internal'

export default class Component {

  constructor(props) {
    this.props = props
  }

  setState(partialState, callback) {
    Internal.getInstance(this).enqueueUpdate(callback, partialState)
  }

  forceUpdate(callback) {
    Internal.getInstance(this).enqueueUpdate(callback)
  }
}
