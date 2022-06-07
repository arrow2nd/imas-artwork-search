import type { Component } from 'solid-js'

import Footer from 'components/footer'
import Header from 'components/header'
import UI from 'components/ui'

import styles from './App.module.css'

const App: Component = () => (
  <main class={`container ${styles.app}`}>
    <Header />
    <UI class={styles.ui} />
    <Footer />
  </main>
)

export default App
