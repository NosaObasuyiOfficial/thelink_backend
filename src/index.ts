import express from 'express'
import logger from 'morgan'
import subscribe from "./routes/subscribeRoute"
import cors from 'cors';

const PORT = 4040
const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cors({ origin: true, credentials: true }));

app.use('/subscribe', subscribe)

app.listen(PORT, () => {
    console.log(`App is currently running on port ${PORT}`)
})


export default app;
