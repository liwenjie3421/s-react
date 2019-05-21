import { Component, Vnode } from '../index.d'

import { _render } from '../render'
import setComponentProps from './setProps'

export function renderComponent(component: Component) {
    const vnode = component.render()
    const base = _render(vnode)
    component.base = base
}

export function createComponent(vnode: Vnode): HTMLElement {
    const {tag, props} = vnode
    const component: Component = new (tag as any)(props)
    setComponentProps(component, vnode)
    renderComponent(component)
    return component.base
}