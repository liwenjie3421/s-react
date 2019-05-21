import {Component, Vnode} from '../index.d'

export default function setComponentProps(component: Component, vnode: Vnode) {
    component.props = vnode.props
}