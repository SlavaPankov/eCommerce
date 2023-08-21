export function calculateAge(date: string): number {
  const currentDate = new Date();
  const birthDate = new Date(date);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error('invalid Date');
  }

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }

  return age;
}
