import "reflect-metadata"
import express from "express"

import usersRoutes from "./routes/users"
import loginRouter from "./routes/login"

const app = express()
app.use(express.json())

app.use("/users", usersRoutes)
app.use("/login", loginRouter)

export default app
