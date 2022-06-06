import Link from 'components/common/link'
import { Component, For, Resource, Show } from 'solid-js'

type Props = {
  items: Resource<any[] | undefined>
}

const Results: Component<Props> = ({ items }) => {
  return (
    <div>
      <Show when={!items.loading} fallback={() => <p>Loading...</p>}>
        <table>
          <thead>
            <tr>
              <th>品番</th>
              <th>タイトル</th>
              <th>WebサイトURL</th>
              <th>アートワークURL</th>
            </tr>
          </thead>
          <tbody>
            <For each={items()}>
              {({ id, title, website, image }) => (
                <tr>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>
                    <Link title={website} href={website} />
                  </td>
                  <td>
                    <Link title={image} href={image} />
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </Show>
    </div>
  )
}

export default Results
