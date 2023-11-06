//const { network } = require("../helper-hardhat-config")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.parseEther("0.25") // 0.25 is the premium in LINK per request
const GAS_PRICE_LINK = 1e9 // link per gas
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args = [BASE_FEE, GAS_PRICE_LINK]
    if (developmentChains.includes(network.name)) {
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
            waitConfirmations: 1,
        })
        log("Mocks Deployed!")
        log("----------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
