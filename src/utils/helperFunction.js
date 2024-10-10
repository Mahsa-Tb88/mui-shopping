globalThis.getNewSearchParams = (oldParams, key, value) => {
  if (!oldParams.get) {
    oldParams = new URLSearchParams(oldParams);
  }
  const params = Object.fromEntries(oldParams);
  if (value) {
    params[key] = value;
  } else {
    delete params[key];
  }
  return params;
};
