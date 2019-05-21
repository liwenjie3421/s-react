import { Vnode, Component, ComponentVnode } from './index.d'

import { createComponent } from './component/'

export function renderElement(vnode: ComponentVnode | Vnode | string | number , container: HTMLElement)
export function renderElement(vnode, container: HTMLElement) {
    return container.appendChild(_render(vnode))
}

export function _render(vnode: ComponentVnode | Vnode | string | number): HTMLElement
export function _render(vnode) {
    let element

    if (typeof vnode === 'number') {
        element = document.createTextNode(String(vnode))
    } else if (typeof vnode === 'string') {
        element = document.createTextNode(vnode)
    } else {
        const { tag, props, children } = vnode
        if (typeof tag === 'string') {
            element = document.createElement(tag)
            if (props) {
                Object.keys(props).map((propKey) => {
                    setAttribute(element, propKey, props[propKey])
                })
            }
            children.map((childVnode) => {
                renderElement(childVnode, element)
            })
        } else if (typeof tag === 'function') { // 组件形式
            element = createComponent(vnode)
        }
    }
    return element
}

function setAttribute(element: HTMLElement, name: string, value) {
    if (name === 'style') { // style属性
        if (typeof value === 'object') {
            Object.keys(value).map((cssName) => {
                const cssValue = value[cssName]
                element.style[cssName] = typeof cssValue === 'number'
                    ? `${cssValue}px` : cssValue

            })
        }
    } else if (/^on\w+/.test(name)) { // 绑定方法
        element[name.toLocaleLowerCase()] = value
    } else { // 普通属性
        element[value ? 'setAttribute' : 'removeAttribute'](name, value)
    }
}

