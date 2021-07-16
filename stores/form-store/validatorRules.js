const rules = {
  password: {
    function: (val = '') =>
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(val),
  },
};

export default rules;
