import { Request } from 'types/request'

export const fetchArtworks = async ({
  type,
  keyword
}: Request): Promise<any[]> => {
  // 品番で検索
  if (type === 'id') {
    return await feachFromCdId(keyword)
  }

  // アルバム名で検索
  const url = new URL('https://imas-artwork-api.deno.dev/v1/list')

  url.searchParams.append('keyword', keyword)
  url.searchParams.append('order', 'id')
  url.searchParams.append('orderby', 'asc')
  url.searchParams.append('limit', '25')

  const data = await fetchFromApi(url.href)
  const json = await data.json()

  if (!data.ok) {
    throw createNewError(json, data)
  }

  return json
}

const feachFromCdId = async (keyword: string): Promise<any[]> => {
  const data = await fetchFromApi(
    `https://imas-artwork-api.deno.dev/v1/cd/${keyword}`
  )
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

const createNewError = (json: any, data: Response): Error => {
  const message = json.message || data.statusText
  return new Error(`${message} ( ${data.status} )`)
}
