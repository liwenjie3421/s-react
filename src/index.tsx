interface Vnode {
    tag: string,
    props,
    children: any []
}
import sReact, { renderDOM } from './lib/sReact'

// setInterval(() => {
    renderDOM(
        <div className="abc" style={{
            color: 'red',
            width: 300,
            border: '1px solid #ccc'
        }}>
            <input
                onInput={(v) => console.log(`input value is: ${v.target.value}`, v)}
                type="text"
                disabled={false}/>
            <span id="1">1234</span>
            <br />
            <div name="2">
                <img src="#" />
            </div>
            <br />
            999
            <br />
            {
                new Date().toLocaleString()
            }
        </div>,
        document.querySelector('#app'))
// }, 1000)

