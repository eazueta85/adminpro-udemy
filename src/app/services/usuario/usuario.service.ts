import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

//import 'rxjs/Rx' //mala practica importa todo el RX
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //Propiedades para saber si esta autenticado el usuario
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
    ){
    //console.log('Servicio de usuario listo');
    this.cargarStorage();
   }

   estaLogueado() {
     return (this.token.length > 5) ? true : false;
   }
   //Para inicializar con datos las Propiedades
   cargarStorage(){

    if( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
    }else{
      this.token = '';
      this.usuario = null;
    }

   }
   //Usuario del tipo Usuario(Modelo)
   guardarStorage( id:string, token:string, usuario:Usuario){

      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(id));

      //Seteo las Propiedades
      this.usuario = usuario;
      this.token = token;
   }

   logout(){
      this.usuario = null;
      this.token = '';
      //Borra todo el localStorage
      //localStorage.clear()
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      this.router.navigate(['/login'])
   }

   loginGoogle( token:string ){

      let url = URL_SERVICIOS + '/login/google';

      return this.http.post(url, { token })
            .pipe(map( (resp: any) => { 
              this.guardarStorage( resp.id, resp.token, resp.usuario);
              return true;
            }));

   }

   login( usuario: Usuario, recordar: boolean = false ){

    if ( recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email')
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
            .pipe(map( (resp: any) => { //como typescryp no sabe que resp trae id coloco any
              this.guardarStorage( resp.id, resp.token, resp.usuario);
              return true;
            }))

   }

   crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .pipe(map( (resp: any) => {
                swal("Usuario Creado!", usuario.email, "success");
                return resp.usuario;
              }));

   }

}
