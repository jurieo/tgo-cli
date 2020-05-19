const isPhone = phone => {
  const reg = /^1[3456789]\d{9}$/;
  return !!reg.test(phone);
};
const isEmail = str => {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  return !!reg.test(str);
};
const isCardNo = str => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return !!reg.test(str);
};

export { isPhone, isEmail, isCardNo };
