import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTeacherDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena' })
    name: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena' })
    lastName: string;

    @IsNotEmpty({ message: 'El número personal es obligatorio' })
    @IsInt({ message: 'El número personal debe ser un número entero' })
    personalNumber: number;

    @IsOptional()
    @IsInt({ message: 'La antigüedad debe ser un número entero' })
    antiquity?: number;

    @IsOptional()
    @IsString({ message: 'La cuenta personal debe ser una cadena' })
    personalAccount?: string;

    @IsOptional()
    @IsString({ message: 'La cuenta institucional debe ser una cadena' })
    institutionalAccount?: string;

    @IsOptional()
    @IsString({ message: 'El numero teléfonico debe ser una cadena' })
    phoneNumber?: string;

    @IsOptional()
    @IsString({ message: 'La extensión debe ser una cadena' })
    extension?: string;

    @IsOptional()
    uvAdmissionDate?: Date;

    @IsOptional()
    birthdate?: Date;
}
