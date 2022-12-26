const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

// app.get("/set", (req, res) => {
//     const { address } = req.params
//     const balance = balances[address] || 0
//     res.send({ balance })
// })

// app.post("/send", (req, res) => {
//     const { amount, recipient, msgHash, signature, recoveryBit } = req.body
//     let recoveredPublicKey, senderAddress

//     recoverPublicKey(msgHash, signature, recoveryBit).then((publicKey) => {
//         recoveredPublicKey = publicKey
//         senderAddress = `0x${toHex(keccak256(recoveredPublicKey).slice(1).slice(-20))}`

//         setInitialBalance(senderAddress)
//         setInitialBalance(recipient)

//         if (balances[senderAddress] < amount) {
//             res.status(400).send({ message: "Not enough funds!" })
//         } else if (usedSignatures.includes(signature)) {
//             res.status(400).send({ message: "Signature already used!" })
//         } else {
//             usedSignatures.push(signature)
//             balances[senderAddress] -= amount
//             balances[recipient] += amount
//             res.send({ balance: balances[senderAddress], senderAddress })
//         }
//     })
// })

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
