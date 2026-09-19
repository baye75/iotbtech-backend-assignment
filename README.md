# BACKEND ASSIGNMENT

A learning project that goes from answering some theory questions on general Backend knwoledge, then the build part which deals with raw CSV generation → streaming aggregation → a
production-shaped Express API for products. It covers the difference between
`readFileSync` and `createReadStream`, and builds a full request → service →
controller → route → middleware pipeline with structured logging and error handling.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Initialize and Install dependencies](#initialize-and-install-dependencies)
- [Phase A — Data Generation & Streaming](#phase-a--data-generation--streaming)
  - [Console Output](#console-output)
  - [generate.ts](#generatets)
  - [aggregate.ts (streaming)](#aggregatets-streaming)
  - [aggregate-naive.ts (readFileSync comparison)](#aggregate-naivets-readfilesync-comparison)
  - [copy.ts (pipeline)](#copyts-pipeline)
  - [Benchmark Results](#benchmark-results)
- [Phase B — Express API](#phase-b--express-api)
  - [Service Layer](#service-layer)
  - [Controller Layer](#controller-layer)
  - [Routes](#routes)
  - [Logger (Winston)](#logger-winston)
  - [Request Logger Middleware](#request-logger-middleware)
  - [API Key Guard](#api-key-guard)
  - [404 Handler](#404-handler)
  - [Error Handler](#error-handler)
- [API Reference](#api-reference)


## Prerequisites

- Node.js **20+** (uses native ESM, `node:` imports, `performance.now()`)
- `npm`
- `tsx` for running TypeScript directly, or `bun`

## Project Structure

```
iotbtech-backend-assignment/
├── THEORY.md
├── README.md
└── mini-project/
    ├── package.json
    ├── tsconfig.json
    ├── .gitignore            ← node_modules/, dist/, logs/
    ├── scripts/
    │   ├── generate.ts        ── Phase A
    │   └── aggregate.ts       ── Phase A
    |   └── aggregate-readfilesync.ts
    ├── data/
    │   └── (generated products.csv lives here — tell git to keep it or ignore it, your call)
    └── src/
        ├── index.ts            ── Phase B + C (boot, mount, pipeline)
        ├── middleware/
        │   ├── requestLogger.ts
        │   ├── requireApiKey.ts
        │   ├── notFoundHandler.ts
        │   └── errorHandler.ts
        ├── routes/
        │   └── product.routes.ts
        ├── controllers/
        │   └── product.controller.ts
        ├── services/
        │   └── product.service.ts
        └── utils/
            └── logger.ts
        (optional) src/utils/loadProducts.ts 
```

## Initialize and Install dependencies:

```bash
npm init -y
npm install express
npm install -D typescript tsx @types/express @types/node
```

## Phase A — Data Generation & Streaming

The script *generate.ts* creates **data/products.csv** with 10,000 rows by default.

### How to run

```bash
npx tsx scripts/generate.ts
ROWS=1000000 npx tsx scripts/generate.ts (for `1,000,000 rows`)
```
A file, `aggregate-readfilesync.ts` that uses readFileSync was added to test and compare results from using createReadStream.

## Console Output

### Checking file size on disk of products.csv when it had 10,000 rows (`ls -lh data/products.csv`):
-rw-r--r--@ 1 muhammad  staff   336K Sep 18 15:04 data/products.csv

### Output of running the aggregate.ts file (10,000 rows) `npx tsx scripts/aggregate.ts`:

books → $209,796,230.54
clothing → $221,427,628.02
electronics → $205,042,469.70
food → $208,246,202.25
home → $204,577,772.77
toys → $214,260,953.79
grand total: $1,263,351,257.07
rows: 10000
runtime: 23.62 ms
heapUsed: 8.15 MB
wrote summary → data/category-summary.csv

### Checking file size on disk of products.csv when it had 1,000,000 rows (using `ls -lh data/products.csv`):
-rw-r--r--@ 1 muhammad  staff    37M Sep 18 16:49 data/products.csv

### Output of running the aggregate.ts (uses createReadStream) file (1,000,000 rows) `npx tsx scripts/aggregate.ts`:
books → $20,951,246,553.88
clothing → $20,915,991,626.51
electronics → $20,928,812,998.67
food → $20,883,502,110.56
home → $20,995,879,103.81
toys → $20,956,858,164.89
grand total: $125,632,290,558.32
rows: 1000000
runtime: 890.00 ms
heapUsed: 8.04 MB

### Output of running the aggregate-readfilesync.ts (uses readFileSync) file (1,000,000 rows) `npx tsx scripts/aggregate.ts`:
[readFileSync] grand total: $125664172778.65
[readFileSync] rows: 1000000
[readFileSync] runtime: 1192.66 ms
[readFileSync] heapUsed: 105.75 MB

### Key Takeaway

readFileSync scales linearly with file size — an 8.04 MB file becomes 105.75 MB of heap because every line becomes a separate string; use it only for small, bounded files.


### Output of `logs/app.logs` after running `cat logs/app.logs`:

```bash
2026-09-19T06:26:14.130Z [INFO]: GET / 404 4ms]
2026-09-19T06:27:48.490Z [INFO]: GET / 200 9ms]
2026-09-19T06:29:05.732Z [INFO]: POST / 401 28ms]
2026-09-19T06:29:41.105Z [INFO]: Product created: {"id":10001,"name":"X","category":"uncategorized","price":1,"stock":0}]
2026-09-19T06:29:41.106Z [INFO]: POST / 201 1ms]
2026-09-19T06:30:59.253Z [INFO]: GET /nope 404 1ms]
2026-09-19T06:31:53.027Z [INFO]: GET /boom 500 5ms]
```
