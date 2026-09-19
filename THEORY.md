# QUESTION 1:

## Exact Output of the first consoloe.log:

[
  '/Users/muhammad/.nvm/versions/node/v24.18.0/bin/node',
  '/Users/muhammad/dev/iotbtech/backend/iotbtech-backend-assignment/mini-project/app.js',
  '--port',
  '8080',
  '--host',
  'localhost'
]

## Exact Output of the second consoloe.log:

[ '--port', '8080', '--host', 'localhost' ]

## Why They Differ:

The outputs differ because of the **splice(2)** method used in the second console.log which only prints out the output starting after the second index.

The index `0` represents the path to the executable Node.js file that runs our script (app.js).
The index `1` represents the path to the script file (app.js) which Node.js ran for us.
The index `2` represents the first argument we passed.

## QUESTUIN 2:

We alwways almost write `process.argv.slice(2)` (that is to leave out the first elements of `peocess.env`) because these first two elements contain the path to the Node.js executable and the path to your JavaScript script file respectively.

When someone runs the script from a different folder, it doesn't have an effect on the output, also when it is run with a wrapper like `bun run app.js`, it still gives an output similar to running it with `node`, but in this case, the first element in the out will point to the `bun` executable `"/Users/muhammad/.bun/bin/bun` that ran our script.

## QUESTUIN 3:

```javascript
console.log(Buffer.from("مرحبا").length);  
console.log(Buffer.from("hello").length);  
console.log("مرحبا".length);              
```
`Output of first console.log: 10`
`Output. of second console.log: 5`
`Output of third console.log: 5`

The first two are different even though they both contain 5 characters each because the Arrabic characters of `مرحبا` are Unicode characters where a character takes 2 bytes each in UTF-8 encoding, where as the characters of `hello` are ASCII characters which take 1 byte per character in UTF-8 encoding.
The third one is different because normal JavaScript strings are encoded in UTF-16 and one character take 1 byte.

## Question 4

Read path must allocate ~5 GB in RAM, and this is assuming that there are no multi-bytes characters present. With multi-bytes characters present, we might be looking at a maximum of 10 GB size of file being sent to RAM, and since the machine has 8 GB RAM, it can crash the machine. The file goes to external memory which is the  memory that Node allocates directly from the OS. Stream reads bounded chunks, discards each chunk after processing, so it doesn't load up the entire file at once and hence the memory remains intact.

## Question 5

If an error occurs midwayduring file copy, `pipe()` does notprovide for error cleanup; source isn't destroyed and this leads to file leak; but for `pipeline()`, in case of an error ,idway during copy, it destroys the streams and propagates to an awaitable promise.

## Question 6
 
First console.log gave: `4e6f64652e6a73`
Second console.log gave: `Tm9kZS5qcw==`

## Question 7

By "flat", it means the memory remains constant regardless of input size. Bucket grows linearly in size while pipe processes one chunk at a time so memory stays constant at chunk size.

## Question 8

Bun runs `.ts` files directly without any build step, its package manager is super fast for installs (`bun install` binary lockfile), it also has a built-in bundler and test runner. However, I wouldn't choose Bun out of the box as Node remains default for most production applications and has the largest ecosystem.

## Question 9


## Question 10

`req.params.id` is given as a `string`. To convert it to number, we use `Number(req.params.id)`. Express leaves it as text because path segments are always text on the wire.

## Question 11

Routes maps URL to controller. Controller parses request, response, and calls service. Service is where the data and business logic are defined. The only file to edit is one that stores the data;`product.service.ts` only since data lives in the service layer.

## Question 12

The missing line is `app.use(express.json())`. It has to go before routes. Without it, `req.body` stays `undefined`.

## Question 13

The prefix behaviour of `app.use("/api/products", productRouter)` means it mounts the router at a path prefix. The prefix is not a route — it's a filter that strips the matching portion of the URL before the router sees it. `router.get("/")` responds to `GET /api/products`; `router.get("/:id")` responds to `GET /api/products/:id`; `router.get("/top")` responds to `GET /api/products/top`.

## Question 14

(a) 201 Created — resource created; (b) 404 Not Found; (c) 400 Bad Request — malformed/incomplete input; (d) 500 Internal Server Error; (e) 200 OK.

## Question 15

15. Exact order:
   ```
   M1 in
   M2 GET /
   handler starts
   handler ends
   M1 out
   ```
   `M1 out` runs AFTER the handler because `next()` resumes after the downstream chain completes; the code after `next()` runs when control unwinds back.

## Question 16

The page hangs and the client sees a continuous spinner. The terminal shows the earlier logs in the app and then go silent. Express cannot auto-call the `next()` function, it must be explicitly stated.

## Question 17

By default, the parameter count of an error handler accepted byExpress is 4, while anything less than that is treated as normal middleware. If the parameters are reduced to 3,it defaults to normal middleware and won't catch errors.

## Question 18

## Question 19

The middleware attaches an event listener, "finish", to `res` and calls `next()`. The listener fires later, when the response has been sent. Hence the log line is written after `res.send()` completes — end-to-end duration.

## Question 20

## Question 21


