import { Component } from 'solid-js'

import styles from './index.module.css'

const Header: Component = () => (
  <header class={styles.header}>
    <h1 class={styles.title}>imas-artwork-search</h1>
    <span>アイマス CD のアートワークが検索できる Web アプリ</span>
  </header>
)

export default Header
