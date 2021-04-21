const R = require('ramda')
const fs = require('fs')

const readFileSync = path => fs.readFileSync(path, { enconding: 'utf-8' })

const handleReadFile = R.pipe(
  R.converge(R.concat, [
    R.pipe(
      R.replace(/.*\//,''),
      R.replace(/\..*$/,''),
      R.concat(R.__, '  ')
    ),
    R.pipe(
      readFileSync,
      R.toString
    )
  ])
)

R.pipe(
  R.map(handleReadFile),
  R.map(R.split('\n')),
  R.map(R.dropLast(1)),
  R.map(R.map(R.split('  '))),
  R.map(R.map(R.take(3))),
  console.log
)(['../input/eth.csv', '../input/btc.csv'])
