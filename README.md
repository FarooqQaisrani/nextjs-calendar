# Next.js + Tailwind CSS Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## Preview

Preview the example live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-tailwindcss)

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss&project-name=with-tailwindcss&repository-name=with-tailwindcss)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


## **User Story:**

> As a user I can select my preferred dates for a unit so that I can book my stay.
> 

## Acceptance Criteria's:

### **Forward scenarios:**

> Given that I am any user
When I open Booking Calendar
I can see available dates
So that I can book my stay
> 

> Given that I am user
When I open Booking Calendar
I can select Check-in and Checkout date
So that I can book my stay
> 

> Given that I am user
When I open Specific stay unit
I can see available dates
So that I can book my stay
> 

> Given that I am user
When I open Specific stay unit
And I select preferred dates
I can see preferred dates as highlighted
So that I can book my stay
> 

### **Negative scenarios:**

> Given that I am user
When I open Specific stay unit
I can see Unavailable dates
So that I cannot book those days
> 

> Given that I am user
When I click available date
I can see minimum length of stay
So that I can make my decision
> 

### **Edge-cases:**

> Given that I am user
When I see available dates
And Length of stay is for specific date is longer than check-out date
I should see Checkout-out only badge 
So that I can make my decision
>