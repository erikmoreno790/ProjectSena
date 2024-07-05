// Clase que representa la categoría
class Category {
  // Nombre de la categoría
  final String name;
  // Descripción de la categoría (puede estar vacía para categorías predefinidas)
  final String description;
  // Lista de servicios asociados a la categoría (ID de referencia)
  final List<String> services;

  // Constructor de la clase Category
  Category({
    required this.name,
    this.description = '',
    this.services = const [],
  });

  // Método para crear un objeto Category desde un JSON
  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      name: json['nombre'],
      description: json['descripcion'] ?? '',
      services: List<String>.from(json['servicios'] ?? []),
    );
  }

  // Método para convertir un objeto Category a JSON
  Map<String, dynamic> toJson() {
    return {
      'nombre': name,
      'descripcion': description,
      'servicios': services,
    };
  }

  // Método para obtener una lista de categorías predefinidas
  static List<Category> predefinedCategories() {
    return [
      Category(name: 'Electricista'),
      Category(name: 'Plomero'),
      Category(name: 'Carpintero'),
      Category(name: 'Pintor'),
      Category(name: 'Instalador de aire acondicionado'),
      Category(name: 'Jardinero'),
      Category(name: 'Técnico de reparación de lavadoras'),
      Category(name: 'Técnico de reparación de refrigeradores'),
      Category(name: 'Técnico de reparación de hornos'),
      Category(name: 'Técnico de reparación de televisores'),
      Category(name: 'Técnico de reparación de equipos de cocina'),
      Category(name: 'Mecánico de automóviles'),
      Category(name: 'Electricista automotriz'),
      Category(name: 'Chapista y pintor'),
      Category(name: 'Mecánico de motocicletas'),
      Category(name: 'Lavado y detallado de autos'),
      Category(name: 'Masajista'),
      Category(name: 'Peluquero / Estilista'),
      Category(name: 'Manicurista / Pedicurista'),
      Category(name: 'Entrenador personal'),
      Category(name: 'Nutricionista / Dietista'),
      Category(name: 'Tutor académico (matemáticas, ciencias, idiomas, etc.)'),
      Category(name: 'Instructor de música'),
      Category(name: 'Instructor de arte'),
      Category(name: 'Coach de desarrollo personal'),
      Category(name: 'Instructor de idiomas'),
      Category(name: 'Abogado'),
      Category(name: 'Contador / Contador público'),
      Category(name: 'Consultor de negocios'),
      Category(name: 'Diseñador gráfico'),
      Category(name: 'Fotógrafo / Videógrafo'),
      Category(name: 'Costurero / Modista'),
      Category(name: 'Joyero'),
      Category(name: 'Artesano de la madera'),
      Category(name: 'Artesano del cuero'),
      Category(name: 'Ceramista'),
      Category(name: 'Desarrollador de software'),
      Category(name: 'Soporte técnico informático'),
      Category(name: 'Diseñador web'),
      Category(name: 'Especialista en redes y seguridad'),
      Category(name: 'Experto en SEO y marketing digital'),
    ];
  }

  // Método para validar si una categoría es predefinida
  static bool isValidCategory(String categoryName) {
    List<Category> categories = predefinedCategories();
    for (Category category in categories) {
      if (category.name == categoryName) {
        return true;
      }
    }
    return false;
  }
}
