export interface Vnode {
    tag: string,
    props,
    children: any[]
}

export interface ComponentVnode {
    tag: Component,
    props,
    children: any[]
}

export interface Component {
    props
    <T>(state:T)
    base: HTMLElement
    setState({}): void
    render(): Vnode
}