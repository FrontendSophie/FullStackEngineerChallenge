## Current User

- GET `/api/users/current`

Response:

```
// success
{
    "data": {
        "uid": xx,
        "username": "admin",
        "role": 0
    },
    "errno": 0
}

```

- POST `/api/users/login`

```
    username: string,
    password: string
```

Response:

```
    // success
    {
        "errno": 0,
    }

    // fail
    {
        "message": "login failed",
        "errno": -1
    }
```

- POST `/api/users/logout`

Response:

```
    // success
    {
        "errno": 0,
        "message": "logout successfully"
    }
```

## Emloyee List

- GET `/api/users`

Response:

```
// success
    {
        "errno": 0,
        "data": [
            {
                "id": 9,
                "username": "admin",
                "role": 0
            }
        ],
    }
```

- GET `/api/users/:id`

Response:

```
// success
    {
        "errno": 0,
        "data": {
            "id": 10,
            "username": "sophie",
            "role": 1
        }
    }
```

- POST `/api/users`

```
    username: string,
    password: string
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

- DELETE `/api/users/:id`

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

- PUT `/api/users/:id`

```
    username: string
```

Response:

```
    // success
    {
        "errno": 0,
        message: "updated successfully"
    }

    // fail
    {
        "errno": -1
    }
```
