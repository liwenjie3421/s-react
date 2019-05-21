import { Component as ComponentInterface, Vnode } from './index.d'
import { renderComponent } from './render'

class Component implements ComponentInterface{
    public props
    public state
    public base: HTMLElement

    public constructor(props) {
        this.props = props
    }

    public setState(stateChange) {
        Object.assign(this.state, stateChange)
        renderComponent(this)
    }

    public render(): Vnode {
        return {
            tag: '',
            props: {},
            children: []
        }
    }
}

export default Component
