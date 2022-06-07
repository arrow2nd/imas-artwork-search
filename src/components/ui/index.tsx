import { Component, createResource, createSignal } from 'solid-js'

import { Request } from 'types/request'

import { fetchArtworks } from './fetch'
import Results from './results'

const UI: Component = () => {
  const [type, setType] = createSignal<string>('id')
  const [keyword, setKeyword] = createSignal<string>('')
  const [request, setRequest] = createSignal<Request>()

  const [results] = createResource(request, fetchArtworks)

  const placeholder = () =>
    `例: ${type() === 'id' ? 'LACA-15905' : 'FR@GMENT WING 02'}`

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    setRequest({
      type: type(),
      keyword: keyword()
    })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <select onChange={(e) => setType(e.currentTarget.value)}>
            <option value="id">品番から</option>
            <option value="keyword">アルバム名から</option>
          </select>
          <input
            placeholder={placeholder()}
            onChange={(e) => setKeyword(e.currentTarget.value)}
          />
          <button type="submit">検索</button>
        </form>
      </div>
      <Results items={results} />
    </>
  )
}

export default UI
