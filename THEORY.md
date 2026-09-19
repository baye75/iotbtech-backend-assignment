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

6. `4e6f64652e6a73` and `Tm9kZS5qcw==`.
7. "Flat" = constant memory regardless of input size: bucket grows linearly (O(file size)); pipe processes one chunk at a time so memory stays at chunk size (flat).
8. Bun: runs `.ts` directly (no build step), super fast installs (`bun install` binary lockfile), built-in bundler + test runner. Judgement question — any justified answer. Node remains default for enterprise ecosystem maturity.

9. `GET /api/products/featured` → `{ hit: "featured" }` (registered before `/:id`; order wins). `GET /api/products/42` → `{ hit: "by-id", id: "42" }`. `GET /api/products` → `{ hit: "fallback" }` via the mounted router `app.use` (router `GET /` not defined here, so `app.use("/api/products", ...)` fallback catches it — actually with the given `app.use("/api/products", (req,res)=>...)` the router's `GET "/"` would ALSO exist as a route inside a real setup; the teaching point is order + first-match-wins). Note: in the literal snippet there is no `productRouter` — the `app.use("/api/products", handler)` acts as fallback for `/api/products` after `/` matches nothing. Any answer showing awareness that specific routes must precede catches and that first match wins is correct.
10. `req.params.id` is `string`. Convert with `Number(req.params.id)`. Express leaves URL segments as text because path segments are always textual on the wire.
11. Routes = map URL→controller; controller = transport (parse req, call service, respond); service = data + business rules. Storage change → `product.service.ts` only (data lives in service layer).
12. Missing `app.use(express.json())`. Must be before routes. Without it no middleware parses the body; `req.body` stays `undefined`.
13. Mount prefix `/api/products`: `router.get("/")` → `GET /api/products`; `router.get("/:id")` → `GET /api/products/:id`; `router.get("/top")` → `GET /api/products/top`.
14. (a) 201 Created — resource created; (b) 404 Not Found; (c) 400 Bad Request — malformed/incomplete input; (d) 500 Internal Server Error; (e) 200 OK.

15. Exact order:
   ```
   M1 in
   M2 GET /
   handler starts
   handler ends
   M1 out
   ```
   `M1 out` runs AFTER the handler because `next()` resumes after the downstream chain completes; the code after `next()` runs when control unwinds back.
16. Client sees an endless spinner/hang; terminal shows the earlier logs then silence. Express can't guess intent — middleware ending a request (auth reject) must be allowed, so it never auto-calls `next()`.
17. Express inspects the function's declared param count (`fn.length`): 4 → error handler middleware; fewer → normal. Trimming to 3 silently demotes it to normal middleware and it stops catching errors.
18. (a) `next()` continues to the next regular middleware. (b) `next(err)` skips all remaining regular middleware and jumps to the first 4-param error handler. Error path skips e.g. `express.json` down-stream routes.
19. The middleware attaches a "finish" event listener to `res` and calls `next()`. The listener fires later, when the response has actually been sent (event loop). So the log line is written after `res.send()` completes — end-to-end duration.
20. Express 4: the async rejection is unhandled — Express doesn't auto-forward, often logged as unhandled rejection. Express 5: auto-catches and forwards to error handler. Express 4 fixes: wrap in `try/catch` + `next(err)`, or wrap with `asyncHandler`. Check `npm ls express`.
21. 404 = matched nothing (a route/fallback case, not an error), 500 = handler crashed. 404 handler before error handler so "no route" cases are answered as 404 before any real error can be mislabeled 500. Swapped: unknown paths would hit the error handler first and (with no error) fall through to... the 404 last is fine, but the convention and correct ordering is 404 first then 500 handler; if the error handler is placed before the 404 handler it still functions if written correctly, but the golden-pipeline order (routes → 404 → error) is the normalized, canonical one — and a naive swap places error handler before 404 so unknown routes return the error handler's fallback (500) incorrectly.

