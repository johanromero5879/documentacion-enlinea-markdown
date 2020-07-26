import express, { json } from "express"
import cors from "cors"
import session from "express-session"
import connect_redis from "connect-redis"
import redis from "redis"
import indexRouter from "./routes/index.routes"

// Configurar redis
const session_key = "supersecret"
const RedisStore = connect_redis(session)
const redisClient = redis.createClient()

//Configurar session middleware
const session_middleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: session_key,
    resave: false,
    saveUninitialized: false,
})

const app = express()

/**
 * Configuraciones express
 */
app.set("port", 3000)

/**
 * Middlewares
 */
app.use(cors({
    credentials: true,
    origin: ["http://localhost:8000", "http://localhost:8010"]
}))

app.use(json())

//Session redis
app.use(session_middleware)

/**
 * Rutas
 */
indexRouter(app)

export default app

