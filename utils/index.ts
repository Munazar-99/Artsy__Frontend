export async function fetcher(url: string, options = {}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getPosts`)
    const result = await response.json()
    const data:ResBody[] = result.data.reverse()
    return data;
}