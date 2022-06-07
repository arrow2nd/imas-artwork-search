import { Component, For, Match, Resource, Switch } from 'solid-js'

import Link from 'components/common/link'

import { ImasArtworkAPIResult } from 'types/api'

type Props = {
  items: Resource<ImasArtworkAPIResult[] | undefined>
}

const Results: Component<Props> = ({ items }) => (
  <div>
    <Switch fallback={() => <p>Loading...</p>}>
      <Match when={items.error}>
        <p>{items.error.toString()}</p>
      </Match>
      <Match when={!items.loading}>
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
      </Match>
    </Switch>
  </div>
)

export default Results
