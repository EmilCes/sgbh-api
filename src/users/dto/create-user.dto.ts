import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena' })
    name: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena' })
    lastName: string;

    @IsNotEmpty()
    @IsString({ message: 'El correo institucional debe ser una cadena' })
    institutionalEmail: string;

    @IsNotEmpty()
    role: Role;
}
