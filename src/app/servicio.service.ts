import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioCompartido {
  currentComponent: string = 'default';
  mostrarAnimacionCierre: boolean = false;
  private componenteCierreSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  // Método para mostrar u ocultar el Navbar
  notificarAnimacionCierre(animacion: boolean = false) {
    this.componenteCierreSubject.next(animacion);
    console.log("notifiacion de cierre del servicio");
  }

  obtenerNotificacionCierre(): Observable<boolean> {
    return this.componenteCierreSubject.asObservable();
   
  }

  cambiarComponente(nombre: string) {
    this.notificarAnimacionCierre(true); // Agregar esta línea para notificar la animación de cierre
    console.log(" notifiacion de cierre con exito");
    setTimeout(() => {
      this.currentComponent = nombre;
      this.notificarAnimacionCierre(false); // Notificar que la animación de cierre ha terminado
    }, 900); // Ajusta el tiempo según la duración de tu animación inversa
    console.log("tiempo funciona");
  }
}
