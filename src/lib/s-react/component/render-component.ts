import { Component, Vnode, ComponentVnode } from '../index.d'

import { _render } from '../render'


export function renderComponent(component: Component) {
    const vnode = component.render()
    const base = _render(vnode)
    component.base = base
}

export function createComponent(vnode: ComponentVnode): HTMLElement {
    const {tag, props} = vnode
    const component: Component = new (tag as any)(props)
    setComponentProps(component, vnode)
    renderComponent(component)
    return component.base
}

function setComponentProps(component: Component, vnode: ComponentVnode) {
    component.props = vnode.props
}
