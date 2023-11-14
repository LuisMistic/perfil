import { Component, OnInit } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';

interface Producto {
  nombre: string;
  estilo: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  fecha?: string; // Agregamos fecha como opcional
}

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent  implements OnInit{
  productos: Producto[] = [
    { nombre: 'blond', estilo: 'Artesanal', precio: 100, cantidad: 0, subtotal: 0 },
    // ... otras sidras
  ];

  nuevoProducto: any = {};
  mostrarAnimacionCierre: boolean = false;


  constructor(public servicioCompartido: ServicioCompartido) {
    // Cargar datos almacenados
    const storedProductos = localStorage.getItem('productos');
    if (storedProductos) {
      this.productos = JSON.parse(storedProductos);
    }
  }

  agregarProductoDesdeFormulario() {
    // Buscar si el producto ya existe en la lista
    const productoExistente = this.buscarProducto(this.nuevoProducto.nombre, this.nuevoProducto.estilo);

    if (productoExistente) {
      // Si el producto ya existe, incrementa la cantidad y actualiza el subtotal
      productoExistente.cantidad++;
      productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
    } else {
      // Si el producto no existe, agrégalo a la lista
      const nuevoProducto = { 
        ...this.nuevoProducto, 
        cantidad: 1, 
        subtotal: this.nuevoProducto.precio 
      };
      this.productos.push(nuevoProducto);
    }

    // Limpia el formulario después de agregar un producto
    this.nuevoProducto = {};

    // Calcula subtotales y totales
    this.calcularSubtotales();
    this.calcularTotal();
  }

  venderProducto(producto: Producto) {
    producto.cantidad++;
    producto.subtotal = producto.cantidad * producto.precio;
    this.actualizarDatos();
  }

  borrarProducto(index: number) {
    // Elimina el producto de la lista
    this.productos.splice(index, 1);

    // Actualiza los datos y almacena en localStorage
    this.actualizarDatos();
  }

  reiniciarPlanilla() {
    // Reiniciar productos y datos almacenados
    this.productos.forEach(producto => {
      producto.cantidad = 0;
      producto.subtotal = 0;
    });
    this.actualizarDatos();
  }

  private actualizarDatos() {
    // Agrega la fecha actual
    const fecha = new Date();
    this.productos.forEach(producto => {
      producto.fecha = fecha.toLocaleString();
    });

    // Actualiza datos y almacena en localStorage
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  calcularTotal() {
    return this.productos.reduce((total, prod) => total + prod.subtotal, 0);
  }

  private calcularSubtotales() {
    // Implementa tu lógica para calcular subtotales aquí
    // Puedes necesitar recorrer la lista de productos y recalcular los subtotales si es necesario.
  }

  private buscarProducto(nombre: string, estilo: string): Producto | undefined {
    return this.productos.find(producto => producto.nombre === nombre && producto.estilo === estilo);
  }
  ngOnInit() {
    // Agrega la clase 'show' después de 500ms (puedes ajustar este valor)
   
    this.servicioCompartido.obtenerNotificacionCierre().subscribe(cierre => {
      // Cuando se recibe la notificación de cierre, puedes activar tu animación aquí
      this.mostrarAnimacionCierre = cierre;
      console.log("Notificación recibida del navbar hacia perfil");
  })
  }
}

