// Função para calcular a diferença em minutos entre dois tempos
export const diffInMinutes = (createdAt: string): number => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  // Diferença em milissegundos
  const diffMs = currentTime.getTime() - createdTime.getTime();

  // Converter milissegundos para minutos
  return diffMs / 1000 / 60;
};
