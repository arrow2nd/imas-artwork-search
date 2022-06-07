import { Component, createResource, createSignal } from 'solid-js'

import { Request } from 'types/request'

import { fetchArtworks } from './fetch'
import Results from './results'

const UI: Component = () => {
  const [error, setError] = createSignal<string>('')
  const [request, setRequest] = createSignal<Request>()
  const [results] = createResource(request, fetchArtworks)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const fields = new FormData(e.target)
    const typeA = fields.get('type')
    const keywordA = fields.get('keyword')

    if (!typeA || !keywordA) {
      setError('⚠️ 入力されていないフィールドがあります')
      return
    }

    setError('')
    setRequest({
      type: typeA.toString(),
      keyword: keywordA.toString()
    })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <select name="type">
            <option value="id">品番から</option>
            <option value="keyword">アルバム名から</option>
          </select>
          <input
            name="keyword"
            placeholder="LACA-15905, FR@GMENT WING 02 etc..."
          />
          <button type="submit">検索</button>
        </form>
      </div>
      {error() && <blockquote>{error()}</blockquote>}
      <Results items={results} />
    </>
  )
}

export default UI
