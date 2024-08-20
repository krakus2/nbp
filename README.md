# NBP Example App

The app is a web-based currency tool that uses the NBP public API to display current exchange rates for various currencies. It features a homepage with a list of currencies, detailed historical data and charts for individual currencies, and a currency converter to calculate values between PLN and other currencies.

## How to start it locally

- npm install
- npm run prepare
- npm run dev

## Used technologies

- Vite - industry standard build tool at the moment
- Panda CSS + Ark UI + Park UI - styling. Although Chakra + Emotion were excellent, its successor better supports the latest React version by transitioning from standard CSS-in-JS solutions to build-time generated styles.
- TanStack Router - routing. I chose TanStack Router because of my positive experiences with other TanStack libraries. It provides excellent TypeScript support, file-based routing, an intuitive API, and well-written documentation, making it a great choice for the project.
- TanStack Query + axios - handling async server state and API layer
- Vitest + React Testing Library - testing

## Notes about the solution

- The styling is quite basic, with a primary focus on code quality.
- From a UX perspective, some states are not managed. For instance, there is no loading state for the table, and there are gaps that need to be addressed for a production-ready app.
- Custom components are kept as close as possible to their usage, while generic UI elements from Park UI are organized in the components/ui folder.
- NBP API-related services are located in the services/nbp directory. This was an arbitrary decision that may be less effective in a larger project (but might be also beneficial - it depends as always :). If services were declared closer to their usage, more domain logic could be centralized there. Currently, adapting API data to domain interfaces is handled in components. In a larger-scale application, another adapter layer or service hooks might be used to move this logic out of components. This would facilitate different testing approaches, allowing for more unit tests rather than integration tests.
