# tRPC Nitro Event Handler

[tRPC](https://trpc.io/docs/) event handler for [Nitro](https://nitro.build/) with support for Nitro's helper functions (e.g. `sendStream` or `sendRedirect`). 
Also works with any Nitro based framework like [Nuxt](https://nuxt.com/) or [SolidStart](https://start.solidjs.com/).

> [!WARNING]
> Only works with tRPC v11

## Installation

```bash
npm install @falcondev-oss/nitro-trpc-event-handler
```

## Usage

`api/trpc/[trpc].ts` (← make sure to name the path segment `trpc`)

```typescript
import { defineTRPCEventHandler } from '@falcondev-oss/nitro-trpc-event-handler'
import { appRouter } from './trpc/router'

export default defineTRPCEventHandler({
  router: appRouter,
  createContext: (event) => {
    // add your own tRPC context here
    return {
      event,
    }
  }
})

```