import { Vnode, Component, ComponentVnode } from './interface'
import { renderElement } from './vNode'
import { createComponent, setComponentProps } from './component'

export default render

function render(vnode: ComponentVnode): HTMLElement
function render(vnode: Vnode | string | number): HTMLElement
function render(vnode) {
    let element
    if (typeof vnode === 'number') {
        element = document.createTextNode(String(vnode))
    } else if (typeof vnode === 'string') {
        element = document.createTextNode(vnode)
    } else if (typeof vnode.tag === 'function') { // 组件形式
        const component = createComponent(vnode, render)
        setComponentProps(component, vnode, render)
        return component.base
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
                renderElement(childVnode, element, render)
            })
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
