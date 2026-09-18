## Checking file size on disk of products.csv when it had 10,000 rows (using `ls -lh data/products.csv`):
-rw-r--r--@ 1 muhammad  staff   336K Sep 18 15:04 data/products.csv

## Output of running the aggregate.ts file (10,000 rows) `npx tsx scripts/aggregate.ts`:

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

## Checking file size on disk of products.csv when it had 1,000,000 rows (using `ls -lh data/products.csv`):
-rw-r--r--@ 1 muhammad  staff    37M Sep 18 16:49 data/products.csv

## Output of running the aggregate.ts (uses createReadStream) file (1,000,000 rows) `npx tsx scripts/aggregate.ts`:
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

## Output of running the aggregate-readfilesync.ts (uses readFileSync) file (1,000,000 rows) `npx tsx scripts/aggregate.ts`:
[readFileSync] grand total: $125664172778.65
[readFileSync] rows: 1000000
[readFileSync] runtime: 1192.66 ms
[readFileSync] heapUsed: 105.75 MB

We see that using readFileSync, the headUsed (memory) is 105.75MB which is about 13x the heapUsed with createReadStream (8.04MB).
The runtime is comparable, even though using createReadStream is still faster (890.00ms) compared to readFileSync (1192.66ms).
