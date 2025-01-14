import type { H3Event } from 'h3'

import { resolveResponse } from '@trpc/server/http'
import { defineEventHandler, setResponseStatus, toWebRequest } from 'h3'

export function defineTRPCEventHandler(
  opts: Pick<Parameters<typeof resolveResponse>[0], 'router' | 'onError'> & {
    createContext: (event: H3Event) => Promise<any>
  },
) {
  return defineEventHandler(async (event) => {
    if (event.method === 'OPTIONS') {
      setResponseStatus(event, 204, 'No Content')
      return
    }

    const pathSegments = event.context.params?.trpc
    if (!pathSegments) throw new Error('No trpc path segments found')
    const path = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments

    const res = await resolveResponse({
      ...opts,
      // eslint-disable-next-line ts/no-unsafe-return
      createContext: async () => opts.createContext(event),
      error: null,
      path,
      req: toWebRequest(event),
    })

    // allow handling event in trpc (e.g. sendRedirect or sendStream)
    if (event.handled) return

    return res
  })
}
