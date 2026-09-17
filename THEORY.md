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

