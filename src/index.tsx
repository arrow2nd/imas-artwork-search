/* @refresh reload */
import { render } from 'solid-js/web'

import 'milligram'

import App from './App'

render(() => <App />, document.getElementById('root') as HTMLElement)
