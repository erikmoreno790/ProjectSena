import 'package:latlong2/latlong.dart';

// Clase que representa al servicio
class Service {
  // Título del servicio
  final String title;
  // Descripción del servicio
  final String description;
  // Categoría del servicio (ID de referencia)
  final String category;
  // Precio del servicio
  final double price;
  // Proveedor del servicio (ID de referencia)
  final String supplier;
  // Ubicación del servicio
  final LatLng location;
  // Estado del servicio (pending, in progress, completed)
  final String status;
  // Fecha de creación del servicio
  final DateTime date;

  // Constructor de la clase Service
  Service({
    required this.title,
    required this.description,
    required this.category,
    required this.price,
    required this.supplier,
    required this.location,
    this.status = 'pending',
    required this.date,
  });

  // Método para crear un objeto Service desde un JSON
  factory Service.fromJson(Map<String, dynamic> json) {
    return Service(
      title: json['title'],
      description: json['description'],
      category: json['category'],
      price: json['price'].toDouble(),
      supplier: json['supplier'],
      location: LatLng(json['location']['coordinates'][1], json['location']['coordinates'][0]),
      status: json['status'] ?? 'pending',
      date: DateTime.parse(json['date']),
    );
  }

  // Método para convertir un objeto Service a JSON
  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'category': category,
      'price': price,
      'supplier': supplier,
      'location': {
        'type': 'Point',
        'coordinates': [location.longitude, location.latitude]
      },
      'status': status,
      'date': date.toIso8601String(),
    };
  }
}


  