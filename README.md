# Next.js Calendar example with Tailwind CSS

## How to run

```bash
yarn install
yarn dev
```

## How to test

Run the server

```bash
yarn dev
```

Then run tests

```bash
yarn cypress
```

## **User Story:**

> As a user I can select my preferred dates for a unit so that I can book my stay.

## Acceptance Criteria's:

### **Forward scenarios:**

> Given that I am any user
> When I open Booking Calendar
> I can see available dates
> So that I can book my stay

> Given that I am user
> When I open Booking Calendar
> I can select Check-in and Checkout date
> So that I can book my stay

> Given that I am user
> When I open Specific stay unit
> I can see available dates
> So that I can book my stay

> Given that I am user
> When I open Specific stay unit
> And I select preferred dates
> I can see preferred dates as highlighted
> So that I can book my stay

### **Negative scenarios:**

> Given that I am user
> When I open Specific stay unit
> I can see Unavailable dates
> So that I cannot book those days

> Given that I am user
> When I click available date
> I can see minimum length of stay
> So that I can make my decision

### **Edge-cases:**

> Given that I am user
> When I see available dates
> And Length of stay is for specific date is longer than check-out date
> I should see Checkout-out only badge
> So that I can make my decision
