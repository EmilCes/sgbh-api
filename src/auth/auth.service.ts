import { Injectable } from '@nestjs/common';
import * as ldap from 'ldapjs';

@Injectable()
export class AuthService {
  private client: ldap.Client;

  constructor() {

    const ldapServer = process.env.LDAP_SERVER;

    this.client = ldap.createClient({
      url: `ldap://${ldapServer}`, 
      reconnect: true,
    });

    // Manejo de errores de conexión
    this.client.on('error', (err) => {
      console.error('Error en la conexión LDAP:', err);
    });
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.bind(email, password, (err) => {
        if (err) {
          console.error('LDAP bind falló:', err.message);
          reject(false);
        } else {
          console.log('LDAP bind exitoso');
          resolve(true);
        }
      });
    });
  }
    
}
