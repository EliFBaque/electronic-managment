export const repairsMock = Array.from({ length: 500}, (_, i) => ({
  id: `${i + 1}`,
  cliente: `Cliente ${i + 1}`,
  marca: `Marca ${i + 1}`,
  modelo: `Modelo ${i + 1}`,
  nroSerie: `SN${i + 1}`,
  aceptado: 'Si',
  tipo: `Tipo ${i + 1}`,
  email: `cliente${i + 1}@email.com`,
  telefono: `123-456-${i + 1}`,
  fechaEntrada: '2024-03-20',
  fechaSalida: '2024-03-25',
  test: 'test',
}));