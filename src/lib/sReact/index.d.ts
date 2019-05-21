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
    base: HTMLElemet
    <T>(state:T)
    setState({}): void
    render(): Vnode
}