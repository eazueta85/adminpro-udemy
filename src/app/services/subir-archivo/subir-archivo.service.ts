import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      //Peiload que mando a subir
      let formData = new FormData();
      //Inizializar petición AJAX
      let xhr = new XMLHttpRequest();
      //Configuración del FormData | imagen (nombre que recibe backend), archivo(archivo a subir)
      formData.append('imagen', archivo, archivo.name)

      //Para ser notificados de cualquier cambio del estado
      xhr.onreadystatechange = function () {

        //Estado 4 (Cuando termina el proceso)
        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen Subida')
            //Convertir a JSON la respuesta
            resolve( JSON.parse(xhr.response) )
          }else{
            console.log('Fallo la subida');
            reject(xhr.response)
          }

        }

      }

      //URL para mandar hacer la petición
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });


  }
}
