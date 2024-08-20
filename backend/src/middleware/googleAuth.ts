// backend/src/middleware/googleAuth.ts
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User, { IUser } from '../models/User';
import { Request } from 'express';

// Debugging logs to verify environment variables
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      // Log the profile information from Google
      console.log('Google Profile:', profile);

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          console.log('No user found, creating a new user');
          user = new User({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
          });
          await user.save();
          console.log("New user created:", user);
        } else {
          console.log('User found:', user);
        }

        done(null, user);
      } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        done(error as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  console.log('Serializing user:', user);
  done(null, user._id.toString());
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      console.error('User not found during deserialization');
      return done(new Error('User not found'), null);
    }
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error as Error, null);
  }
});

export default passport;
