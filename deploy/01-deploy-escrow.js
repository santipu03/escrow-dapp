const { network } = require("hardhat")
const { verify } = require("../utils/verify")

const developmentChains = ["hardhat", "localhost"]

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const arbiterAddress = "0xBaF3a4589D21Dad93F95FAE8a8a6697195AbF385"
    const beneficiaryAddress = "0x1F203934407e3e718Aea89f97183bB1F0Ad7C058"
    const args = [arbiterAddress, beneficiaryAddress]

    waitConfirmations = developmentChains.includes(network.name) ? 1 : 6

    const escrowContract = await deploy("Escrow", {
        log: true,
        from: deployer,
        args: args,
        waitConfirmations: waitConfirmations,
    })

    log("----------------------------")

    if (!developmentChains.includes(network.name)) {
        await verify(escrowContract.address, args)
    }
}
