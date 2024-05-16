import { Component, OnInit } from '@angular/core';
import { ServicioCompartido } from 'src/app/servicio.service';

interface Producto {
  nombre: string;
  estilo: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  fechaCompra?: string;
}

interface Cliente {
  nombre: string;
  productos: Producto[];
  subtotal: number;
  fecha: string;
}

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.css']
})
export class PlanillaComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  nuevoProductoNombre: string = '';
  nuevoProductoEstilo: string = '';
  nuevoProductoPrecio: number = 0;
  nuevoClienteNombre: string = '';
  busquedaCliente: string = '';
  clienteSeleccionado: Cliente | null = null;
  clienteEditando: Cliente | null = null;
  productosSugeridos: string[] = ['Cerveza', 'Vino', 'Refresco', 'Agua'];
  productosBarraAbajo: { nombre: string; estilo: string; cantidad: number; color: string }[] = [];

  constructor(public servicioCompartido: ServicioCompartido) {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      this.clientes = JSON.parse(storedClientes);
      this.clientesFiltrados = this.clientes;
      this.productosBarraAbajo = JSON.parse(localStorage.getItem('productosBarraAbajo') || '[]');
      this.servicioCompartido.actualizarClientes(this.clientes);
    }
  }

  ngOnInit() {
    this.servicioCompartido.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  agregarNuevoCliente() {
    const nombreCliente = this.nuevoClienteNombre.trim();
    
    if (nombreCliente === '') {
      return;
    }
  
    const clienteExistente = this.clientes.find(cliente => cliente.nombre.toLowerCase() === nombreCliente.toLowerCase());
    
    if (clienteExistente) {
      console.log(`El cliente "${nombreCliente}" ya existe.`);
      return;
    }
  
    const nuevaFecha = new Date().toLocaleString();
    const nuevoCliente: Cliente = {
      nombre: nombreCliente,
      productos: [],
      subtotal: 0,
      fecha: nuevaFecha
    };
  
    this.clientes.unshift(nuevoCliente);
    this.clientesFiltrados = [...this.clientes];
    this.nuevoClienteNombre = '';
    this.actualizarDatos();
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteSeleccionado = this.clienteSeleccionado === cliente ? null : cliente;
  }
  
  editarCliente(cliente: Cliente) {
    this.clienteEditando = this.clienteEditando === cliente ? null : { ...cliente };
    this.actualizarDatos();
  }
  
  guardarEdicionCliente(cliente: Cliente) {
    this.clienteEditando = null;
    this.actualizarDatos();
  }
  
  eliminarCliente(index: number, event: MouseEvent) {
    event.stopPropagation();
    this.clientes.splice(index, 1);
    this.clientesFiltrados = this.clientes;
    this.actualizarDatos();
  }

  toggleCliente(cliente: Cliente) {
    this.clienteSeleccionado = this.clienteSeleccionado === cliente ? null : cliente;
  }

  agregarProductoCliente(cliente: Cliente) {
    const nuevoProducto: Producto = {
      nombre: this.nuevoProductoNombre,
      estilo: this.nuevoProductoEstilo,
      precio: this.nuevoProductoPrecio,
      cantidad: 1,
      subtotal: this.nuevoProductoPrecio
    };
  
    cliente.productos.push(nuevoProducto);
    this.actualizarSubtotalCliente(cliente);
    this.actualizarProductosBarraAbajo(nuevoProducto); // Llama a la función para actualizar la barra inferior
  
    this.nuevoProductoNombre = '';
    this.nuevoProductoEstilo = '';
    this.nuevoProductoPrecio = 0;
    this.actualizarDatos();
  }

  venderProducto(cliente: Cliente, producto: Producto) {
    producto.cantidad++;
    producto.subtotal = producto.cantidad * producto.precio;
    producto.fechaCompra = new Date().toLocaleString();
    this.actualizarSubtotalCliente(cliente);
    this.actualizarProductosBarraAbajo(producto); // Llama a la función para actualizar la barra inferior
    this.actualizarDatos();
  }

  borrarProducto(cliente: Cliente, index: number) {
    cliente.productos.splice(index, 1);
    this.actualizarSubtotalCliente(cliente);
    this.actualizarDatos();
  }

  reiniciarPlanilla() {
    this.clientes = [];
    this.clientesFiltrados = [];
    this.productosBarraAbajo = [];
    this.actualizarDatos();
  }

  calcularTotal() {
    return this.clientes.reduce((total, cliente) => total + cliente.subtotal, 0);
  }

  calcularCantidadProductosVendidos(): number {
    let totalProductosVendidos = 0;
    this.clientes.forEach(cliente => {
      cliente.productos.forEach(producto => {
        totalProductosVendidos += producto.cantidad;
      });
    });
    return totalProductosVendidos;
  }

  mostrarFormularioProducto(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
  }

  filtrarClientes() {
    const busqueda = this.busquedaCliente.trim().toLowerCase();
    if (busqueda === '') {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(cliente => 
        cliente.nombre.toLowerCase().includes(busqueda)
      );
    }
  }
  
  private actualizarSubtotalCliente(cliente: Cliente) {
    cliente.subtotal = cliente.productos.reduce((total, producto) => total + producto.subtotal, 0);
  }
  
  private actualizarDatos() {
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    localStorage.setItem('productosBarraAbajo', JSON.stringify(this.productosBarraAbajo));
    this.servicioCompartido.actualizarClientes(this.clientes);
  }

  private actualizarProductosBarraAbajo(producto: Producto) {
    const productoExistente = this.productosBarraAbajo.find(item => item.nombre === producto.nombre && item.estilo === producto.estilo);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      this.productosBarraAbajo.push({
        nombre: producto.nombre,
        estilo: producto.estilo,
        cantidad: 1,
        color: 'orange' // Siempre usar color naranja con letra blanca
      });
    }
  }// En tu componente PlanillaComponent

calcularSubtotalCliente(cliente: Cliente): number {
  return cliente.productos.reduce((total, producto) => total + producto.subtotal, 0);
}

}
