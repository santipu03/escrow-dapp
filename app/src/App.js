import { ethers } from "ethers"
import { useEffect, useState } from "react"
import deploy from "./utils/deploy"
import getContract from "./utils/getContract"
import Escrow from "./Escrow"
import server from "./server"

const provider = new ethers.providers.Web3Provider(window.ethereum)

export async function approve(escrowContract, signer) {
    const approveTxn = await escrowContract.connect(signer).approve()
    await approveTxn.wait()
}

function App() {
    const [escrows, setEscrows] = useState([])
    const [account, setAccount] = useState()
    const [signer, setSigner] = useState()

    useEffect(() => {
        async function getAccounts() {
            const accounts = await provider.send("eth_requestAccounts", [])

            setAccount(accounts[0])
            setSigner(provider.getSigner())
        }

        getAccounts()
        retrieveContracts()
    }, [account])

    async function postContract(escrow) {
        console.log(escrow)
        try {
            await server.post(`storeContract`, {
                contract: escrow,
            })
        } catch (e) {
            console.error(e)
        }
    }

    async function setStoredContractInState(contract) {
        const escrowContract = await getContract(signer, contract.address)

        const escrow = {
            address: contract.address,
            arbiter: contract.arbiter,
            beneficiary: contract.beneficiary,
            value: contract.value.toString(),
            approved: contract.approved,
            handleApprove: async () => {
                await approve(escrowContract, signer)
                const index = escrows.findIndex(
                    (escrow) => escrow.address === escrowContract.address
                )
                const arrayWithoutItem = escrows.filter(
                    (escrow) => escrow.address !== escrowContract.address
                )
                let approvedEscrow = escrows[index]
                approvedEscrow.approved = true
                setEscrows([...arrayWithoutItem, approvedEscrow])
                postContract(approvedEscrow)
            },
        }

        return escrow
    }

    async function retrieveContracts() {
        try {
            const {
                data: { contracts },
            } = await server.get(`getContracts`)

            if (contracts.length > 0) {
                let contractsArray = []
                for (let i = 0; i < contracts.length; i++) {
                    const contract = await setStoredContractInState(contracts[i])
                    contractsArray.push(contract)
                }
                setEscrows(contractsArray)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function newContract() {
        const beneficiary = document.getElementById("beneficiary").value
        const arbiter = document.getElementById("arbiter").value
        const value = ethers.BigNumber.from(
            (document.getElementById("wei").value * 10 ** 18).toString()
        )
        const escrowContract = await deploy(signer, arbiter, beneficiary, value)

        const escrow = {
            address: escrowContract.address,
            arbiter,
            beneficiary,
            value: value.toString(),
            approved: false,
            handleApprove: async () => {
                await approve(escrowContract, signer)
                const index = escrows.findIndex(
                    (escrow) => escrow.address === escrowContract.address
                )
                const arrayWithoutItem = escrows.filter(
                    (escrow) => escrow.address !== escrowContract.address
                )
                let approvedEscrow = escrows[index]
                approvedEscrow.approved = true
                setEscrows([...arrayWithoutItem, approvedEscrow])
                postContract(approvedEscrow)
            },
        }

        postContract(escrow)
        setEscrows([...escrows, escrow])
    }

    return (
        <>
            <header>Escrow Smart Contract</header>
            <div className="main">
                <div className="contract">
                    <h1> New Contract </h1>
                    <label>
                        Arbiter Address
                        <input type="text" id="arbiter" />
                    </label>

                    <label>
                        Beneficiary Address
                        <input type="text" id="beneficiary" />
                    </label>

                    <label>
                        Deposit Amount (in ETH)
                        <input type="text" id="wei" />
                    </label>

                    <div
                        className="button"
                        id="deploy"
                        onClick={(e) => {
                            e.preventDefault()

                            newContract()
                        }}
                    >
                        Deploy
                    </div>
                </div>

                <div className="existing-contracts">
                    <h1> Existing Contracts </h1>

                    <div id="container">
                        {escrows.length === 0 ? (
                            <div className="no-contracts">No existing contracts...</div>
                        ) : (
                            escrows.map((escrow) => {
                                return <Escrow key={escrow.address} {...escrow} />
                            })
                        )}
                    </div>
                </div>
            </div>
            <footer>Made with ❤ by santipu</footer>
        </>
    )
}

export default App
