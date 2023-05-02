import passport from 'passport'
// import passportApiKey from "passport-headerapikey";
import passportJwt, { StrategyOptions } from 'passport-jwt'
import { User } from '../models/User.model'
import { JWT_SECRET } from './env'
import { Strategy } from 'passport-strategy'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET as string,
}

export default (passport: any): Strategy => {
    return passport.use(
        "jwt",
        new JwtStrategy(
            options,
            async (jwt_payload, done) => {
                console.log(jwt_payload)
            }
        )
    )
}