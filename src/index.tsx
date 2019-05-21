import { renderDOM, Component, createElement } from './lib/sReact'

// setInterval(() => {

    class Say extends Component {
        public state: {
            word: string
        }
        public constructor(props) {
            super(props)
            this.state = {
                word: 'hello world'
            }
        }

        public render() {
            const {word} = this.state
            return <div>{word}</div>
        }
    }

    renderDOM(
        <div className="abc" style={{
            color: 'red',
            width: 300,
            border: '1px solid #ccc'
        }}>
        <Say />
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

