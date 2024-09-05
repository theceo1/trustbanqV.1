import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Google OAuth credentials are not set in environment variables');
  process.exit(1);
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: '/api/auth/google/callback'
},
  async (accessToken, refreshToken, profile, done) => {
    console.log('Google OAuth callback triggered');
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        console.log('No user found with Google ID:', profile.id);
        user = new User({
          email: profile.emails?.[0].value,
          googleId: profile.id,
          name: profile.displayName,
        });
        await user.save();
        console.log('New user created:', user.email);
      } else {
        console.log('Existing user found:', user.email);
      }
      done(undefined, user);  // Use undefined instead of null
    } catch (error) {
      console.error('Error in Google OAuth strategy:', error);
      done(error, undefined);  // Use undefined instead of null
    }
  }
));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user: any, done) => {
  done(undefined, user.id);  // Use undefined instead of null
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(undefined, user);  // Use undefined instead of null
  } catch (error) {
    done(error, undefined);  // Use undefined instead of null
  }
});

export default passport;
