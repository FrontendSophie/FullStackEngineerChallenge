## Assign Reviewee

- GET `/api/reviews/:id/reviewee`

Response:

```
// success
{
    "errno": 0,
    "data": [
        {
            "id": 9,
            "username": "admin",
            "role": 0,
        }
    ],
}
```

- POST `/api/reviews/:id/reviewee`

```
revieweeId: number
```

Response:

```
// success
{
    "errno": 0,
    "message": "added successfully"
}

// fail
{
    "errno": -1
}
```

- DELETE `/api/reviews/:reviewerId/reviewee/:revieweeId`

Response:

```
// success
{
    "errno": 0,
    "message": "deleted successfully"
}

// fail
{
    "errno": -1
}
```

## Review

- GET `/api/reviews/:id?reviewerId`

Response:

```
// success
{
    "errno": 0,
    "data": [
        {
            "id": 1,
            "review": "hello",
            "feedback": null
        },
        {
            "id": 58,
            "review": "test",
            "feedback": null
        }
    ]
}

// fail
{
    "errno": -1
}
```

- PUT `/api/reviews/:id`

```
reviewerId: number,
review: string
```

Response:

```
// success
{
    "errno": 0,
    "message": "updated successfully"
}

// fail
{
    "errno": -1
}
```
