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

  const data = await fetch(url.href)
  const json = await data.json()

  if (!data.ok) {
    throw new Error(json.message || data.statusText)
  }

  return json
}

const feachFromCdId = async (keyword: string): Promise<any[]> => {
  const data = await fetch(`https://imas-artwork-api.deno.dev/v1/cd/${keyword}`)
  const json = await data.json()

  if (!data.ok) {
    throw new Error(json.message || data.statusText)
  }

  return [json]
}
