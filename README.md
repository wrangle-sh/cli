# Wrangle

Simple yet powerful CLI tool for getting organized about technical debt.

## Why was Wrangle created?

Moving fast and accruing technical debt go hand in hand. We think the limiting factor isn't knowing how to fix the technical debt, it's two things:

- Staging organized about it
- Getting the time to do it and automating as much as possible

This CLI tool aims to solve the first of these points. It outputs a prioritized list of technical debt that requires addressing.

The second point is a planned future project, **Wrangle Managed.** More to come!

## Prerequisites

Wrangle minimizes its LLM usage, adopting a mindset that the 

Wrangle uses LLMs for a large portion of the "higher-level" analysis that we do. More providers are on the roadmap, but OpenAI is the only one for now.

## To Install

Installation is supported on all prominent package managers.

- npm: `npm i -D @wrangle/cli`
- yarn: `yarn i -D @wrangle/cli`
- pnpm: `pnpm i -D @wrangle/cli`

## To Run

`wrangle run` is the main entrypoint.

```shell
wrangle run
```

## Configuration

We use a `wrangle.json` file alongside a published JSON Schema. Configuration to come.

## License

Wrangle is permissively licensed under the [Functional Source License](https://fsl.software/), following in the footsteps of [Sentry](https://open.sentry.io/licensing/). Code releases revert to the MIT License after two years.

The goal here is to enabling most usage while protecting the creators of the tool from the [Free-rider Problem](https://en.wikipedia.org/wiki/Free-rider_problem) -- in other words, someone else commercializing the tool and spinning up a managed code analysis service using it. You're meant to run this on _your_ code, not use it as a significant part of your business offerring.