# Protected

[![npm version](https://badge.fury.io/js/protected-ts.svg)](https://badge.fury.io/js/protected-ts)

> Protected decorator for managing object updates.

This module is primarily used to validate user input. Imagine a use case where you want to have multi-user
access to a single entity, but depending on the user's access level they can only change certain parts of that
entity.

The best example to give is the one that this module was written for, an Article Management system.

```ts
class Article {
  public title: string

  public submissionDate: Date

  public status: string
}
```

We want our Junior level editors to be able to update the Article with a new status, but we only want senior level
editors to have access to modifying more sensitive properties like the title. This module allows us to annotate
each property with the information we need to keep isolation of responsibility between users.

```ts
class Article {
  @Protected({
    roles: ["admin", "senior"]
  })
  public title: string

  @Protected({
    immutable: true
  })
  public date: string

  public status: string
}
```

### Updating Properties

You can execute update using `attemptUpdate`. It behaves similarly to `Object.assign()`, but it executes your rules
before you

```ts
const article = new Article()
article.title = "A Nice Title"
article.date = "2019"

attemptUpdate(
  article,
  {
    title: "An Evil Title!",
    date: "2020"
  },
  {
    ruleArgs: {
      roles: ["admin"]
    }
  }
)

article.title // 'A Nice Title' (changed)
article.date // '2019' (unchanged)
```

You can also choose to throw an error if an update attempt fails.

```ts
attemptUpdate(
  article,
  {
    title: "An Evil Title!",
    date: "2020"
  },
  {
    fail: true, // Throw error
    ruleArgs: {
      roles: ["admin"]
    }
  }
)

//throws ProtectedFailure
{
    target: article,
    property: date,
    attemptedUpdate: '2020',
    rule: 'immutable'
}
```

### Rules

| Rule      | Args    | Shorthand       |
| --------- | ------- | --------------- |
| roles     | any[]   | `@Roles(any[])` |
| immutable | boolean | `@Immutable()`  |
