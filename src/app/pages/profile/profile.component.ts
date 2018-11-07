import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService

  ){ 

    this.usuario =  this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario){
    //Valores del formulario
    this.usuario.nombre = usuario.nombre;
    
    if( !this.usuario.google){
      this.usuario.email = usuario.email;
    } 
    

    this._usuarioService.actualizarUsuario( this.usuario)
              .subscribe( resp => {
                console.log(resp);
              })
  }

  seleccionImagen( archivo: File ){

    //Si cancela la selección del archivo
    if( !archivo ){
      this.imagenSubir = null;
      return;
    }

    //console.log(archivo);
    if( archivo.type.indexOf('image') < 0){
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    //Si resivimos el archivo seteamos imagenSubir al archivo
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    /*reader.onloadend = () => {
      console.log( reader.result );
    }*/
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
