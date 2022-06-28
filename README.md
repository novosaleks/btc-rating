# API endpoints:
___
## Create account


```http
POST /user/create
```

### Body
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

### Responses

```javascript
{
  "ok" : bool,
  "message" : string,
}
```

The `ok` attribute describes if the transaction was successful or not.

The `message` attribute contains a message commonly used to indicate errors or successful operations

### Status Codes


| Status Code | Description |
| :--- | :--- |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |

___
## Login

```http
POST /user/login
```

### Body
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

### Responses

```javascript
{
  "ok" : bool,
  "message" : string,
}
```

The `ok` attribute describes if the transaction was successful or not.

The `message` attribute contains a message commonly used to indicate errors or successful operations

### Status Codes
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 403 | `FORBIDDEN` |
___ 
## BtcRate

```http
GET /btcRate
```

### Responses

```javascript
{
  "ok" : bool,
  "message" : string, 
  "payload": {updatedAt: string, rate: number} | undefined
}
```

The `ok` attribute describes if the transaction was successful or not.

The `message` attribute contains a message commonly used to indicate errors or successful operations

The `payload` attribute contains useful data returned from third-party API

### Status Codes
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
___

# Auth implementation:

If authorization succeed, `ACCESS_TOKEN` would be stored in cookies. It needs for auth sessions.  
`ACCESS_TOKEN` is valid for 1 hour.  
  
Each account stored in `users.json` file on the server-side. Each password is encrypted.  
  
You need create `.env` file in root directory and then store `SECRET_API_KEY=[value]` with random *[value]* 
