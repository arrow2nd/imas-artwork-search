import { Component } from 'solid-js'

import Link from 'components/common/link'

const Footer: Component = () => (
  <footer>
    <div>※データは毎月1日に更新されます</div>
    <div>
      <span>{'Developed by arrow2nd / '}</span>
      <Link
        title="src on GitHub"
        href="https://github.com/arrow2nd/imas-artwork-search"
      />
      <span>{' / '}</span>
      <Link title="API" href="https://github.com/arrow2nd/imas-artwork-api" />
    </div>
    <div>
      The rights to all content related to THE IDOLM@STER belong to BANDAI NAMCO
      Entertainment Inc.
    </div>
  </footer>
)

export default Footer
