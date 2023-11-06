const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")
//const { expect } = require("hardhat-waffle")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle unit test", async function () {
          let raffle, vrfCoordinatorC2Mock
          const chainId = network.config.chainId
          beforeEach(async () => {
              const { deployer } = getNamedAccounts()
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorC2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
          })

          describe("constructor", async function () {
              it("Initializes the raffle correctly", async function () {
                  //最好一个it只有一个assert
                  const raffleState = await raffle.getRaffleState()
                  const interval = await raffle.getInterval()
                  assert.equal(raffleState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"])
              })
          })

          describe("enterRaffle", async function () {
              it("reverts when you don't pay enough", async function () {
                  await expect(raffle.enterRaffle()).to.be.revertedWith(
                      "Raffle__NotENoughRTHEntered",
                  )
              })
          })
      })
