import Renderer from './Renderer'
import Updater from './Updater'

export default class Internal {

  instance = null

  vnode = null

  state = null

  partialState = {}

  updateCallbacks = []

  constructor(instance) {
    this.instance = instance
  }

  mount(parentNode) {
    this.callHook('componentWillMount')

    const vnode = this.instance.render()

    this.state = Renderer.render(parentNode, vnode)
    this.vnode = vnode

    this.callHook('componentDidMount')
  }

  enqueueUpdate(callback, partialState = null) {
    Object.assign(this.partialState, partialState)
    this.updateCallbacks.push(callback)
    Updater.triggerUpdate(this)
  }

  unmount() {
    // @todo
  }

  callHook(name, ...args) {
    if (this.instance[name]) {
      return this.instance[name](...args)
    }
  }

  static instanceMap = new WeakMap

  static createInstance(vnode) {
    const instance = new vnode.type(vnode.props)
    const internal = new Internal(instance)

    Internal.instanceMap.set(instance, internal)

    return internal
  }

  static getInstance(instance) {
    return Internal.instanceMap.get(instance)
  }
}
