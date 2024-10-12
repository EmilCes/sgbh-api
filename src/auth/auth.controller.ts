import { Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    try {
      const isAuthenticated = await this.authService.authenticate(email, password);
      if (isAuthenticated) {
        return { message: 'Autenticación exitosa' };
      } else {
        throw new HttpException('Autenticación fallida', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Error de autenticación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
