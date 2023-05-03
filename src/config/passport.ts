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
    return new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'iamasecret',
        },
        async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id)
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        }
    )
}