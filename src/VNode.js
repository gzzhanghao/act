import Component from './Component'

export default {

  getType(vnode) {
    if (vnode == null || vnode === false) {
      return 'placeholder'
    }
    if (typeof vnode !== 'object') {
      return 'text'
    }
    if (Array.isArray(vnode)) {
      return 'list'
    }
    if (typeof vnode.type === 'string') {
      return 'element'
    }
    if (vnode.type.prototype instanceof Component) {
      return 'component'
    }
    return 'stateless'
  },
}
