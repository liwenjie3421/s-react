export interface Vnode {
    tag: string,
    props,
    children: any[]
}

export type tag = new (props) => Component

export interface ComponentVnode {
    tag: tag,
    props,
    children: any[]
}

export interface Component {
    base: HTMLElement,
    props,
    state,
    setState({}): void,
    render(): Vnode,
}
