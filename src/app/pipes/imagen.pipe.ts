import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';
    //Si no viene una imagen
    if( !img ){
      return url + '/usuarios/xxx';
    }
    //Si es una imagen de google por el https
    if( img.indexOf('https') >= 0){
      return img;
    }
    //Imagen por tipo 
    switch (tipo){

      case 'usuario':
        url+= '/usuarios/'+ img;
      break;

      case 'medico':
        url+= '/medicos/'+ img;
      break;

      case 'hospital':
        url+= '/hospitals/'+ img;
      break;

      default:
       console.log('Tipo de imagen no existe')
       url += '/usuarios/xxx';
    }
    return url;
  }

}
