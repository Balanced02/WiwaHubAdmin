import express, { Router } from "express";
import path from "path";
import passport from "passport";
import passportLocal from "passport-local";
import multer from "multer";
import cfg from "./controllers/config";
import jwt from "jsonwebtoken";
import Users from "./models/Users";

import { Register, Logout, Login, AuthMe, RedirectNoAuth} from "./controllers/auth";
import { GetProducts, ChangePremium, } from "./controllers/api";

const router = Router();
const api = Router();

router.use(express.static(path.join(__dirname, "../client/build")));


var upload = multer({ dest: "./public/logos" });

// PassportJS Setup
router.use(passport.initialize());
router.use(passport.session())


const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser())
passport.deserializeUser(Users.deserializeUser())

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: cfg.jwtSecret
//     },
//     function(jwtPayload, cb) {
//       //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//       return Users.findOne(jwtPayload.id)
//         .then(user => {
//           return cb(null, user);
//         })
//         .catch(err => {
//           return cb(err);
//         });
//     }
//   )
// );

//image upload temporary function

router.use("/api", api);

api.get("/me", AuthMe);
api.get("/auth/logout", Logout);
api.post("/auth/register", Register);
api.post('/auth/login', passport.authenticate('local'), Login)
// api.post("/auth/login", function(req, res, next) {
//   passport.authenticate("local", { session: false }, (err, user, info) => {
//     if (err || !user) {
//       console.log(user);
//       return res.status(400).json({
//         message: "Something is not right",
//         user: user
//       });
//     }
//     req.login(user, { session: false }, err => {
//       if (err) {
//         res.send(err);
//       }
//       // generate a signed son web token with the contents of user object and return it in the response
//       const token = jwt.sign(user.toJSON(), cfg.jwtSecret);
//       console.log("Logged In!!!");
//       return res.json({
//         user: {
//           ...user,
//           salt: undefined,
//           hash: undefined
//         },
//         token
//       });
//     });
//   })(req, res);
// });
api.use(RedirectNoAuth)

api.post('/getProducts/:id', GetProducts);
api.post('/changePremium', ChangePremium);

export default router;
