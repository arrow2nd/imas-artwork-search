import { Component, createResource, createSignal } from 'solid-js'

import { Request } from 'types/request'

import { fetchArtworks } from './fetch'
import Results from './results'

type Props = {
  class: string
}

const UI: Component<Props> = (props) => {
  const [error, setError] = createSignal<string>('')
  const [request, setRequest] = createSignal<Request>()
  const [results] = createResource(request, fetchArtworks)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const fields = new FormData(e.target)
    const type = fields.get('type')
    const keyword = fields.get('keyword')

    if (!type || !keyword) {
      setError('⚠️ 入力されていないフィールドがあります')
      return
    }

    setError('')
    setRequest({
      type: type.toString(),
      keyword: keyword.toString()
    })
  }

  return (
    <div class={props.class}>
      <div>
        <form onSubmit={handleSubmit}>
          <label>検索タイプ</label>
          <select name="type">
            <option value="id">品番から（完全一致）</option>
            <option value="keyword">アルバム名から</option>
          </select>
          <label>キーワード</label>
          <input
            name="keyword"
            placeholder="LACA-15905, FR@GMENT WING 02 etc..."
          />
          <button type="submit">検索</button>
        </form>
      </div>
      {error() && <blockquote>{error()}</blockquote>}
      <Results items={results} />
    </div>
  )
}

export default UI
