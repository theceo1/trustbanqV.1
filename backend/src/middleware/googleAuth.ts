import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User, { IUser } from '../models/User';
import { Request } from 'express';

console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      console.log('Google OAuth callback triggered');
      console.log('Profile:', JSON.stringify(profile, null, 2));

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          console.log('Creating new user');
          user = new User({
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
          });
          await user.save();
          console.log('New user created:', user);
        } else {
          console.log('Existing user found:', user);
        }

        done(null, user);
      } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        done(error as Error);
      }
    }
  )
);

export default passport;