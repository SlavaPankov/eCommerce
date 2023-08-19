const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,3}$/;
const textRegex = /^[а-яa-z]+$/i;
const passwordRegex = /^(?=\S*?[A-ZА-Я])(?=\S*?[a-zа-я])(?=\S*?\d)(?=\S*?)\S{8,30}$/;
const cityRegex = /^[а-яa-z\-\s]+$/i;
const postalCodeRegex = /[0-9]{6}/g;

export { emailRegex, textRegex, passwordRegex, cityRegex, postalCodeRegex };
