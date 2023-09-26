import { AppDataSource } from "./data-source"
import { erc20TransferEventListener, ethTransferEventListener, nft1155BatchTrasferEventListener, nft1155TrasferEventListener, nft721TrasferEventListener } from "./listener"
import express from "express"
import { saveErc20Balance } from "./services/balance.service";
import bodyParser from "body-parser";
import { getWallet } from "./services/wallet.service";

const app = express();
app.use(bodyParser.json());

(async () => {
    await AppDataSource.initialize()
    .then(async (res) => {
        console.log("Database Connected")
    })
    .catch(error => console.log(error));
})();

erc20TransferEventListener()
ethTransferEventListener()
nft721TrasferEventListener()
nft1155TrasferEventListener()
nft1155BatchTrasferEventListener()

app.get("/:walletAddress", async (req, res) => {
    const data = await getWallet(req.params.walletAddress)
    return res.send(data)
})

app.post("/addToken", async (req: any, res: any) => {
    const erc20Bal = await saveErc20Balance(req.body)
    return res.send(erc20Bal)
})

app.listen(3001, () => {
    console.log("Server started listening")
})