# Cache API

## Project Commands:

- Run in development mode: `npm run start:dev`
- Run in production mode: `npm run start`
- Test : `npm run test`

## Endpoints

- Returns value of a key: `GET /cache/:key`
- Returns all keys: `GET /cache`
- Creates/ updates cache data: `/POST /cache`

```json
{
  "key": "test1",
  "value": "test value1"
}
```
- Deletes a key: `/DELETE /cache/:key`
- Deletes all key: `/DELETE /cache`


## Key points about the project:
- Cache evict mechanism is FIFO based.
- TTL is implemented using MongoDB TTL feature. (`createdAt` Cache Object field is responsible for that). I made default expiration time is `DEFAULT_EXPIRE_TIME = 60;`
- Also note that I made cache size `MAX_CACHE_SIZE = 5;`. You can change these parameters.
- `e2e` testing is added to the project. However, due to time limitation,I couldn't done all the necessary tests like: unit testing, adding more test cases in `e2e` testing.
-  MongoDB URL: `mongodb+srv://admin:12345@cluster0.9aczl.mongodb.net/Cache`
