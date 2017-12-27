# Node Queue

Working with queues on Node JS.

## Getting Started

Development:

```
npm run dev
PORT=<PORT-NUMBER> npm run dev
```

Then access `http://localhost:3000` on your browser.

Production:

```
npm start
PORT=<PORT-NUMBER> npm start
```

## Routes

API endpoint: `/api/v1`

To execute this API's methods, check the following routes:

- Create job:
    - Route: `POST /queue`
    - Body: 
    
        ```
        {
            "title" : "Hello World",
            "to" : "caue@dindigital.com"
        }
        ```
        