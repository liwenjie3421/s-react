import { Vnode } from './index.d'
import renderElement from './render'

export const renderDOM = (vnode: Vnode, container: HTMLElement) => {
    container.innerHTML = ''
    return renderElement(vnode, container)
}

export { default as Component } from './component'

export default {
    createElement(tag, props, ...children): Vnode {
        return {
            tag,
            props,
            children
        }
    }
}
