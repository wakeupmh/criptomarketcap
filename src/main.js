const R = require('ramda')
const fs = require('fs')

const readF = path => fs.readFileSync(path, { enconding: 'utf-8' })

R.pipe(
  R.map(readF),
  R.map(R.toString),
  R.map(R.split('\n')),
  R.map(R.dropLast(1)),
  R.map(R.map(R.split(' '))),
  console.log
)(['../input/eth.csv', '../input/btc.csv'])
