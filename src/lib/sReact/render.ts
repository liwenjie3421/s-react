import { Vnode, Component, ComponentVnode } from './index.d'

export default renderElement


function renderElement(vnode: ComponentVnode | Vnode | string | number , container: HTMLElement)
function renderElement(vnode, container: HTMLElement) {
    return container.appendChild(_render(vnode))
}

function createComponent(vnode: ComponentVnode) {
    const { tag, props } = vnode
    return new (tag as any)(props)
}

function setComponentProps(component: Component, vnode: Vnode) {
    component.props = vnode.props
    renderComponent(component)
}

function _render(vnode: ComponentVnode)
function _render(vnode: Vnode | string | number): HTMLElement
function _render(vnode) {
    let element
    if (typeof vnode === 'number') {
        element = document.createTextNode(String(vnode))
    } else if (typeof vnode === 'string') {
        element = document.createTextNode(vnode)
    } else if (typeof vnode.tag === 'function') { // 组件形式
        const component = createComponent(vnode)
        setComponentProps(component, vnode)
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
                renderElement(childVnode, element)
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

export const renderComponent = (component: Component) => {
    const vnode = component.render()
    const base = _render(vnode)

    component.base = base
}
