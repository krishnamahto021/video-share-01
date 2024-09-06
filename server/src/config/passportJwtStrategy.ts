import dotenv from "dotenv";
import passport from "passport";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import User from "../model/userSchema";
dotenv.config();

// options for jwt
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string,
};

// configure the passport
passport.use(
  new JWTStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload._id).select("-password");
      if (!user) {
        return done(null, false);
      }
      return done(null, false);
    } catch (error) {
      console.error(`Error in passwport jwt stratety ${error}`);
      return done(error);
    }
  })
);

export default passport;
