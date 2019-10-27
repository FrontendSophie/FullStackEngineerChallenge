## Assign Reviewee

- GET `/api/reviewees/:reviewerId`

Response:

```
// success
{
    "errno": 0,
    "data": [
        {
            "id": 9,
            "username": "admin",
            "review": null,
            "role": 0,
        }
    ],
}
```

- POST `/api/reviewees/:reviewerId`

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

- DELETE `/api/reviewees/:reviewerId`

```
revieweeId: number
```

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
