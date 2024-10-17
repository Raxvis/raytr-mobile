# TODO

- Item page add Multiple scores (labels)
- Rating page (adding item name to rating)
- Edit Rating
- Items page
- Categories page
- Calculate average score on new rating
- Items display average score

## New

```
items
  categories
  ratings
    scores
      ratingMetric
```

```
  itemId: uuid,
  itemName: string,
  itemDescription: string,
  itemImages: string,
  score: 0.0,
  prices - Children: [{
    priceId: uuid,
    itemId: uuid,
    price: 0.00,
    location: string,
  }],
  categories - XREF: [{
    categoryId: uuid,
    categoryName: string,
  }],
  ratings - Children: [{
    ratingId: uuid,
    itemId: uuid,
    ratingNotes: string,
    ratingTime: unix,
    overallRating: 0,
    compositeRating: 0,
    scores - Children: [{
      scoreId: uuid,
      ratingId: uuid,
      score: 0,
      ratingMetric - Parent: {
        ratingMetricId: uuid,
        ratingMetricName: string,
      }
    }]
  }]
```

Items will live as the main component. We will gather Rating Metrics from all Categories when a new Item is added. Default Rating Metrics will exist and be pulled in, only if new Category is added (ie, you have Whiskey, Bourbon, and then add Rye, we might add "Sweetness" as a Rating Metric).

- Categories as Tags (Pull all schema from matching items)
- Overall Rating as always there slider
- Overall Rating / Composite Rating
  - If overall rating is empty use composite
- Pages
  - Feed (latest ratings)
  - Items (list of all Items)
  - Add Rating
  - Categories (list of all Categories)
  - Profile
- Add lists which items can get added to

## Other things?

- Revisit needing ratingMetric (we could just use scoreName?)

## Next Features

- UPCs by scanning image
  - Pulls in Picture
  - Pulls in information about item

## Fast Follow

- Home button navigates to home instead of all the way back
- Error handling for all saves and deletes

## API services

- Categories get submitted up with Rating Metric
- Categories get renamed and set with name to name conversion
  - whisky -> Whiskey
  - bourbon -> Bourbon
  - Cigar -> Cigars
- Provide default categories with default Raiting Metrics
  - Whiksey -> [Smell, Taste, Burn]
  - Cigars -> [Smell, Taste, Smoke]

## Cleanup

- PropTypes for all components
- TSLint the whole thing

## Pro Version

- User Account
- Sync Data
- Group Lists
