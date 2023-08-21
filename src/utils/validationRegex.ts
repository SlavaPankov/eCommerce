const emailRegex = /^(?!\s)[a-z0-9-_]+@(?:[a-z0-9-_]+\.)+[a-z]{2,}(?!\s$)$/i;
const textRegex = /^[а-яa-z]+$/i;
const passwordRegex = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d)(?=\S*?)\S{8,30}$/;
const cityRegex = /^(?!\s)[A-Za-zА-Яа-я]+[\s-]?[A-Za-zА-Яа-я]*(?!\s$)$/i;
const postalCodeRegex = /[0-9]{6}/g;

export { emailRegex, textRegex, passwordRegex, cityRegex, postalCodeRegex };
