import { Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    
    return await this.authService.authenticate(email, password);
  }
}
