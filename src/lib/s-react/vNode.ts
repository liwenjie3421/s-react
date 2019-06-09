import { Vnode, ComponentVnode } from './interface'

export const createElement = (tag, props, ...children): Vnode => {
    return {
        tag,
        props,
        children
    }
}

export function renderElement(vnode: ComponentVnode | Vnode | string | number , container: HTMLElement, render: Function) {
    return container.appendChild(render(vnode))
}
