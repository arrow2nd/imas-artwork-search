import { ImasArtworkAPIError, ImasArtworkAPIResult } from 'types/api'
import { Request } from 'types/request'

export const fetchArtworks = async ({
  type,
  keyword
}: Request): Promise<ImasArtworkAPIResult[]> => {
  // 品番で検索
  if (type === 'id') {
    return await feachFromCdId(keyword)
  }

  // アルバム名で検索
  const url = new URL('https://imas-artwork-api.deno.dev/v1/list')

  url.searchParams.append('keyword', keyword)
  url.searchParams.append('order', 'asc')
  url.searchParams.append('orderby', 'id')

  const data = await fetchFromApi(url.href)
  const json = await data.json()

  if (!data.ok) {
    throw createNewError(json, data)
  }

  return json
}

const feachFromCdId = async (
  keyword: string
): Promise<ImasArtworkAPIResult[]> => {
  const url = `https://imas-artwork-api.deno.dev/v1/cd/${keyword}`
  const data = await fetchFromApi(url)
  const json = await data.json()

  if (!data.ok) {
    throw createNewError(json, data)
  }

  return [json]
}

const fetchFromApi = async (url: string): Promise<Response> => {
  try {
    // 5秒でタイムアウトさせる
    const ctrl = new AbortController()
    const id = setTimeout(() => ctrl.abort(), 5000)

    const data = await fetch(url)
    clearTimeout(id)

    return data
  } catch (err) {
    console.error(err)
    throw new Error('Failed to access API')
  }
}

const createNewError = (json: ImasArtworkAPIError, data: Response): Error => {
  const message = json.message || data.statusText
  return new Error(`${message} ( ${data.status} )`)
}
