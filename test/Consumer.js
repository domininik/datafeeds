const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { expect } = require("chai")

describe("Consumer", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    const DECIMALS = "18"
    const INITIAL_VALUE = "200000000000000000000"

    const Feed = await ethers.getContractFactory("MockV3Aggregator")
    const feed = await Feed.deploy(DECIMALS, INITIAL_VALUE)

    const Consumer = await ethers.getContractFactory("Consumer")
    const consumer = await Consumer.deploy(feed.address)

    const result = INITIAL_VALUE

    return { consumer, feed, result }
  }

  describe("Deployment", function () {
    it("Should set the right feed", async function () {
      const { consumer, feed } = await loadFixture(deployFixture)

      expect(await consumer.getFeed()).to.equal(feed.address)
    })
  })

  describe("Getting data", async function () {
    it("Should return data from the feed", async function () {
      const { consumer, result } = await loadFixture(deployFixture);

      expect(await consumer.getLatestData()).to.eq(result)
    })
  })
})