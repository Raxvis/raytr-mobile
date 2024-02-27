- Save Rating
- View Items (edit / delete)
- View Category Items
- View Category Item Ratings

```
data: {
  categories: [{
    categoryId: guid,
    categoryName: string,
    ratingSchema: [{
      ratingSchemaId: <guid>
      ratingSchemaName: string,
      ratingSchemaType: string,
      ratingSchemaWeight: int (0-10),
    }],
  }],
  items: [{
    itemId: guid,
    itemName: string,
    itemPicture: string,
    itemDescription: string,
    itemCost: float,
    overallRating: computed,
  }],
  ratings: [{
    categoryId: guid,
    itemId: guid,
    itemCost: float,
    ratingTotal: computed,
    ratingNotes: string,
    ratingTime: datetime,
    scores: [{
      ratingSchemaId: guid,
      scoreValue: int,
    }]
  }]
}
```
