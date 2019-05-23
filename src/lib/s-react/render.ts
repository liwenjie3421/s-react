import { Vnode, Component, ComponentVnode } from './index.d'

import { createComponent } from './component/'
import { createHTMLElement } from './dom/'

export function renderElement(vnode: ComponentVnode | Vnode | string | number , container: HTMLElement)
export function renderElement(vnode, container: HTMLElement) {
    return container.appendChild(_render(vnode))
}

export function _render(vnode: ComponentVnode | Vnode | string | number): HTMLElement
export function _render(vnode) {
    let element

    if (vnode && typeof vnode.tag === 'function') { // 组件形式
        element = createComponent(vnode)
    } else {
        element = createHTMLElement(vnode)
    }

    return element
}
