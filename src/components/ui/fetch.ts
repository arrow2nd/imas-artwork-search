import { Request } from 'types/request'

export const fetchArtworks = async ({
  type,
  keyword
}: Request): Promise<any[]> => {
  // 品番で検索
  if (type === 'id') {
    return [
      (await fetch(`https://imas-artwork-api.deno.dev/v1/cd/${keyword}`)).json()
    ]
  }

  // アルバム名で検索
  const url = new URL('https://imas-artwork-api.deno.dev/v1/list')

  url.searchParams.append('keyword', keyword)
  url.searchParams.append('order', 'id')
  url.searchParams.append('orderby', 'asc')
  url.searchParams.append('limit', '25')

  return (await fetch(url)).json()
}
