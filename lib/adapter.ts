// // adapter.ts
// import { Adapter } from "next-auth/adapters";
// import dbConnect from "@/lib/mongoose";

// import User, { IUserDoc } from "@/database/user.model";
// import Account, { IAccountDoc } from "@/database/account.model";
// import Session, { ISessionDoc } from "@/database/session.model";
// import VerificationToken, { IVerificationTokenDoc } from "@/database/verification-token.model";

// export function MongooseAdapter(): Adapter {
//   return {
//     // --- USERS ---
//     async createUser(user) {
//       await dbConnect();
//       const newUser = await User.create(user);
//       return newUser.toObject();
//     },

//     async getUser(id) {
//       await dbConnect();
//       const user = await User.findById(id);
//       return user ? user.toObject() : null;
//     },

//     async getUserByEmail(email) {
//       await dbConnect();
//       const user = await User.findOne({ email });
//       return user ? user.toObject() : null;
//     },

//     async getUserByAccount({ provider, providerAccountId }) {
//       await dbConnect();
//       const account = await Account.findOne({ provider, providerAccountId });
//       if (!account) return null;
//       const user = await User.findById(account.userId);
//       return user ? user.toObject() : null;
//     },

//     async updateUser(user) {
//       await dbConnect();
//       const updated = await User.findByIdAndUpdate(user.id, user, { new: true });
//       return updated ? updated.toObject() : null;
//     },

//     async deleteUser(id) {
//       await dbConnect();
//       const deleted = await User.findByIdAndDelete(id);
//       return deleted ? deleted.toObject() : null;
//     },

//     // --- ACCOUNTS ---
//     async linkAccount(account) {
//       await dbConnect();
//       const newAccount = await Account.create(account);
//       return newAccount.toObject();
//     },

//     async unlinkAccount({ provider, providerAccountId }) {
//       await dbConnect();
//       const deleted = await Account.findOneAndDelete({ provider, providerAccountId });
//       return deleted ? deleted.toObject() : null;
//     },

//     // --- SESSIONS ---
//     async createSession(session) {
//       await dbConnect();
//       const newSession = await Session.create(session);
//       return newSession.toObject();
//     },

//     async getSessionAndUser(sessionToken) {
//       await dbConnect();
//       const session = await Session.findOne({ sessionToken });
//       if (!session) return null;
//       const user = await User.findById(session.userId);
//       if (!user) return null;
//       return {
//         session: session.toObject(),
//         user: user.toObject(),
//       };
//     },

//     async updateSession(session) {
//       await dbConnect();
//       const updated = await Session.findOneAndUpdate(
//         { sessionToken: session.sessionToken },
//         session,
//         { new: true }
//       );
//       return updated ? updated.toObject() : null;
//     },

//     async deleteSession(sessionToken) {
//       await dbConnect();
//       const deleted = await Session.findOneAndDelete({ sessionToken });
//       return deleted ? deleted.toObject() : null;
//     },

//     // --- VERIFICATION TOKENS ---
//     async createVerificationToken(token) {
//       await dbConnect();
//       const newToken = await VerificationToken.create(token);
//       return newToken.toObject();
//     },

//     async useVerificationToken({ identifier, token }) {
//       await dbConnect();
//       const existing = await VerificationToken.findOneAndDelete({ identifier, token });
//       return existing ? existing.toObject() : null;
//     },
//   };
// }
