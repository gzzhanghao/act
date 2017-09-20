import Internal from './Internal'
import VNode from './VNode'

export default {

  render(parentNode, vnode) {
    return this[VNode.getType(vnode)](parentNode, vnode)
  },

  placeholder(parentNode, vnode) {
    const node = document.createComment('placeholder')
    parentNode.appendChild(node)
    return node
  },

  text(parentNode, vnode) {
    const node = document.createTextNode(vnode)
    parentNode.appendChild(node)
    return node
  },

  list(parentNode, vnode) {
    return vnode.map(vnode => this.render(parentNode, vnode))
  },

  element(parentNode, vnode) {
    const node = document.createElement(vnode.type)
    for (const [key, value] of Object.entries(vnode.props)) {
      node.setAttribute(key, value)
    }
    parentNode.appendChild(node)
    return { node, children: vnode.children.map(child => this.render(node, child)) }
  },

  component(parentNode, vnode) {
    const instance = Internal.createInstance(vnode)
    instance.mount(parentNode)
    return instance
  },

  stateless(parentNode, vnode) {
    return this.render(parentNode, vnode.type.call(null, vnode.props))
  },
}
