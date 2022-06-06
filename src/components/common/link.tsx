import { Component } from 'solid-js'

type Props = {
  title: string
  href: string
}

const Link: Component<Props> = ({ title, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
)

export default Link
