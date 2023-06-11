// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")

async function main() {
  const DECIMALS = "18"
  const INITIAL_VALUE = "200000000000000000000"

  const Feed = await ethers.getContractFactory("MockV3Aggregator")
  const feed = await Feed.deploy(DECIMALS, INITIAL_VALUE)
  await feed.deployed()
  console.log("Feed deployed to", feed.address)

  const Consumer = await ethers.getContractFactory("Consumer")
  const consumer = await Consumer.deploy(feed.address)
  await consumer.deployed()
  console.log("Consumer deployed to", consumer.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
