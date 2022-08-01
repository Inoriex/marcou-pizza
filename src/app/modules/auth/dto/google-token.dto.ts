import { IsNotEmpty, IsString } from "class-validator";

// Vérification google token est une chaine de caractère et n'est pas vide
export default class GoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
