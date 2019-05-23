import { Vnode, ComponentVnode } from '../index.d'

import { renderElement } from '../render'

export default function renderDOM (vnode: Vnode | ComponentVnode | string | number, container: HTMLElement) {
    container.innerHTML = ''
    renderElement(vnode, container)
}