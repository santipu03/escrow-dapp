const express = require("express")
const app = express()
const cors = require("cors")
const port = 3042

app.use(cors())
app.use(express.json())

const contracts = []

app.post("/storeContract", (req, res) => {
    const { contract } = req.body
    console.log(contract)
    contracts.push(contract)
})

app.get("/getContracts", (req, res) => {
    res.send({ contracts })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
