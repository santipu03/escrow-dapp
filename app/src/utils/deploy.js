import { ethers } from "ethers"
import Escrow from "../artifacts/contracts/Escrow.sol/Escrow"

export default async function deploy(signer, arbiter, beneficiary, value) {
    const factory = new ethers.ContractFactory(Escrow.abi, Escrow.bytecode, signer)
    const deployed = await factory.deploy(arbiter, beneficiary, { value })
    await deployed.deployTransaction.wait()
    return deployed
}
