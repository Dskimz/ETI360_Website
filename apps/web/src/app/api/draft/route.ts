import {draftMode} from 'next/headers'
import {NextResponse} from 'next/server'

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'

  if (!process.env.NEXT_PREVIEW_SECRET) {
    return new NextResponse('Missing env var: NEXT_PREVIEW_SECRET', {status: 500})
  }

  if (secret !== process.env.NEXT_PREVIEW_SECRET) {
    return new NextResponse('Invalid preview secret', {status: 401})
  }

  ;(await draftMode()).enable()

  return NextResponse.redirect(new URL(slug, request.url))
}
