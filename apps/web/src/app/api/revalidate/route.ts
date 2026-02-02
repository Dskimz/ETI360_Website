import {NextResponse} from 'next/server'
import {revalidatePath} from 'next/cache'

type SanityWebhookPayload = {
  document?: {
    slug?: {current?: string}
    _type?: string
  }
}

function getExpectedWebhookSecret() {
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET
  if (!expectedSecret) {
    return {ok: false as const, response: NextResponse.json({message: 'Missing env var: SANITY_WEBHOOK_SECRET'}, {status: 500})}
  }
  return {ok: true as const, expectedSecret}
}

async function revalidatePaths(paths: Set<string>) {
  await Promise.all(Array.from(paths).map((path) => revalidatePath(path)))
}

function buildPaths(params: {slug?: string; type?: string}) {
  const paths = new Set<string>(['/', '/insights'])
  const slug = params.slug
  const type = params.type

  if (slug && slug !== 'home') {
    if (type === 'insight') {
      paths.add(`/insights/${slug}`)
    } else {
      paths.add(`/${slug}`)
    }
  }

  return paths
}

// Sanity webhooks are configured as POST, but we also support GET so you can test quickly in a browser
// or if a provider sends a non-POST "ping".
export async function GET(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  const secretCheck = getExpectedWebhookSecret()
  if (!secretCheck.ok) return secretCheck.response

  if (!secret || secret !== secretCheck.expectedSecret) {
    return NextResponse.json({message: 'Invalid secret'}, {status: 401})
  }

  const slug = url.searchParams.get('slug') || undefined
  const type = url.searchParams.get('type') || undefined
  const paths = buildPaths({slug, type})

  try {
    await revalidatePaths(paths)
  } catch (error) {
    return NextResponse.json(
      {message: 'Revalidation failed', error: String(error)},
      {status: 500},
    )
  }

  return NextResponse.json({revalidated: Array.from(paths)})
}

export async function POST(request: Request) {
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  const secretCheck = getExpectedWebhookSecret()
  if (!secretCheck.ok) return secretCheck.response

  if (!secret || secret !== secretCheck.expectedSecret) {
    return NextResponse.json({message: 'Invalid secret'}, {status: 401})
  }

  let payload: SanityWebhookPayload = {}
  try {
    payload = (await request.json()) as SanityWebhookPayload
  } catch (error) {
    console.warn('Unable to parse Sanity webhook body', error)
  }

  const paths = buildPaths({
    slug: payload.document?.slug?.current,
    type: payload.document?._type,
  })

  try {
    await revalidatePaths(paths)
  } catch (error) {
    return NextResponse.json(
      {message: 'Revalidation failed', error: String(error)},
      {status: 500},
    )
  }

  return NextResponse.json({revalidated: Array.from(paths)})
}

export function OPTIONS() {
  return new NextResponse(null, {status: 204})
}
