import { Component as ComponentInterface, Vnode, ComponentVnode } from './interface'

let _render = null

export class Component implements ComponentInterface{
    public props
    public state
    public base: HTMLElement

    public constructor(props) {
        this.props = props
        this.state = {}
    }

    public setState(stateChange) {
        Object.assign(this.state, stateChange)
        renderComponent(this, _render)
    }

    public render(): Vnode {
        return {
            tag: '',
            props: {},
            children: []
        }
    }
}

export function renderComponent (component: Component, render: Function) {
    const vnode = component.render()
    const base = render(vnode)

    // todo 生命周期
    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }
    component.base = base
}

export function createComponent(vnode: ComponentVnode, render: Function) {
    const { tag, props } = vnode
    _render = render
    return new tag(props)
}

export function setComponentProps(component: Component, vnode: Vnode, render: Function) {
    component.props = vnode.props
    renderComponent(component, render)
}
