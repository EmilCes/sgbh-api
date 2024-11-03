import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as ldap from 'ldapjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  private client: ldap.Client;
  private isProduction: boolean;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {

    this.isProduction = process.env.NODE_ENV === 'production';

    if (this.isProduction) {
      const ldapServer = process.env.LDAP_SERVER;

      this.client = ldap.createClient({
        url: `ldap://${ldapServer}`,
        reconnect: true,
      });

      // Handle connection errora
      this.client.on('error', (err) => {
        console.error('Error en la conexión LDAP:', err);
      });
    }
  }

  async authenticate(email: string, password: string): Promise<{ token: string } | boolean> {

    const user = await this.prismaService.user.findUnique({
      where: { institutionalEmail: email },
      select: { role: true }
    })

    if (!user) {
      throw new UnauthorizedException("Credenciales Inválidas");
    }

    if (this.isProduction) {
      return new Promise((resolve, reject) => {
        this.client.bind(email, password, (err: any) => {
          if (err) {
            reject(false);
          } else {
            resolve(this.generateJwt(email, user.role));
          }
        });
      });

    } else {
      return this.generateJwt(email, user.role);
    }
  }

  public generateJwt(email: string, role: string): { token: string } {
    const payload = { email, role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

}
