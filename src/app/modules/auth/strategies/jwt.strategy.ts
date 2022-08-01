import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

// Strategy d'appel d'api, lors de l'envoit d'une requete, on vérifie que le token est valide dans le Bearer et on valide le payload
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET,
    });
  }

  validate(payload) {
    return {
      userId: payload.userId,
    };
  }
}
