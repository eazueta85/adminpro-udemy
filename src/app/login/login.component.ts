import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor( 
      public router: Router,
      public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    //Pasar los valores a la vista
    this.email = localStorage.getItem('email') || ''
    if( this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '320531561082-bf1fdn395kg6ucktdhnkv9qnnlv55ldn.apps.googleusercontent.com',
        cookiepolity: 'single_host_origin',
        scope: 'profile email'
    });

    this.attachSignin( document.getElementById('btnGoogle'));

    })
  }

  attachSignin( element ){

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
      //.subscribe( resp => this.router.navigate(['/dashboard']));
      //Redireccion manual por problema que no carga bien al entrar la primera vez el fondo
      .subscribe( () => window.location.href = "#/dashboard");
      //console.log( token )
    });

  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ){
      return;
    }
    //Valores directos del name del formulario: forma.value.email, forma.value.password
    //creo un usuario del tipo modelo Usuario
    let usuario = new Usuario( null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame )
                .subscribe( resp => this.router.navigate(['/dashboard']));

    //this.router.navigate([ '/dashboard' ]);

  }

}
