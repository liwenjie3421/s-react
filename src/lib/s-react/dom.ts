import { Vnode } from './interface'

import render from './render'
import { renderElement } from './vNode'

export function renderDOM(vnode: Vnode, container: HTMLElement) {
    container.innerHTML = ''
    return renderElement(vnode, container, render)
}

