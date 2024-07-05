import 'package:latlong2/latlong.dart';

// Clase que representa al usuario
class User {
  // Nombre del usuario
  final String name;
  // Correo electrónico del usuario
  final String email;
  // Contraseña del usuario (debería ser cifrada)
  final String password;
  // Número de teléfono del usuario
  final String phoneNumber;
  // Tipo de usuario (Customer, Supplier, Admin)
  final String userType;
  // Ubicación del usuario
  final LatLng location;
  // URL de la foto de perfil del usuario
  final String profilePhoto;
  // Lista de servicios asociados al usuario
  final List<String> services;

  // Constructor de la clase User
  User({
    required this.name,
    required this.email,
    required this.password,
    required this.phoneNumber,
    required this.userType,
    required this.location,
    this.profilePhoto = '',
    this.services = const [],
  });

  // Método para crear un objeto User desde un JSON
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
      password: json['password'],
      phoneNumber: json['phoneNumber'],
      userType: json['userType'],
      location: LatLng(json['location']['coordinates'][1], json['location']['coordinates'][0]),
      profilePhoto: json['profilePhoto'] ?? '',
      services: List<String>.from(json['services'] ?? []),
    );
  }

  // Método para convertir un objeto User a JSON
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'password': password,
      'phoneNumber': phoneNumber,
      'userType': userType,
      'location': {
        'type': 'Point',
        'coordinates': [location.longitude, location.latitude]
      },
      'profilePhoto': profilePhoto,
      'services': services,
    };
  }
}
