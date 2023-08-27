interface IFormData {
  [k: string]: string;
}

const userActions: IFormData = {
  firstName: 'setFirstName',
  lastName: 'setLastName',
  email: 'changeEmail',
  dateOfBirth: 'setDateOfBirth'
};

export const getUserData = (token: string) => {
  return fetch(`https://api.europe-west1.gcp.commercetools.com/ecommerce_f1nal/me/`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((res) => res.json());
};

export const updateUserData = (
  token: string,
  id: string,
  version: number,
  field: string,
  value: string
) => {
  return fetch(`https://api.europe-west1.gcp.commercetools.com/ecommerce_f1nal/customers/${id}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      version,
      actions: [
        {
          action: userActions[field],
          [field]: value
        }
      ]
    })
  });
};
