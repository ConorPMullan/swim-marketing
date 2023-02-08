function isValidId(id): boolean {
  if (id == undefined || id == null) return false;
  const matchValidInputForIdRegex = /^\d+$/g;
  return matchValidInputForIdRegex.test(`${id}`);
}

function isValidString(str): boolean {
  if (str == undefined || str == null) return false;
  const matchValidInputForIdRegex = new RegExp("^[a-zA-Z0-9 _.,/+:-]*$");
  return matchValidInputForIdRegex.test(`${str}`);
}

export { isValidId, isValidString };
