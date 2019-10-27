## Review

- GET `/api/reviews/:revieweeId?reviewerId`

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

- PUT `/api/reviews/:revieweeId`

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

- POST `/api/reviews/:revieweeId/feedback/`

```
reviewerId: number,
feedback: string
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
