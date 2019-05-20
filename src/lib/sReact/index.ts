import { Vnode } from './index.d'

export const renderDOM = (vnode: Vnode, container: HTMLElement) => {
    container.innerHTML = ''
    return renderElement(vnode, container)
}

export default {
    createElement(tag, props, ...children): Vnode {
        return {
            tag,
            props,
            children
        }
    },
    renderElement
}

function renderElement(vnode: Vnode | string, container: HTMLElement) {
    let element

    if (typeof vnode === 'string') {
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
        }
    }
    return container.appendChild(element)
}

function setAttribute(element: HTMLElement, name: string, value) {
    const attribute = name === 'className' ? 'class' : name
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


