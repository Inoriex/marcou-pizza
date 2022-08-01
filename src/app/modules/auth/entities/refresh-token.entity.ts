import { sign } from "jsonwebtoken";
import { ObjectId } from "mongoose";

// création refresh token puis sign in
class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: number;
  userId: ObjectId;
  userAgent: string;
  ipAddress: string;

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}

export default RefreshToken;
