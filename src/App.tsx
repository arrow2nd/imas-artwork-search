import type { Component } from 'solid-js'

import Header from 'components/header'
import UI from 'components/ui'

const App: Component = () => {
  return (
    <div class="container">
      <Header />
      <UI />
    </div>
  )
}

export default App
