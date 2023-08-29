export function createObjectFromFormData(
  data: { [p: string]: FormDataEntryValue },
  index: number = 0
) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(
        ([key, value]) =>
          key.includes(index.toString()) ||
          (key === 'defaultShipping' && Number(value) === index) ||
          (key === 'defaultBilling' && Number(value) === index)
      )
      .map(([key, value]) => [key.split('_')[0], value.toString()])
  );
}
