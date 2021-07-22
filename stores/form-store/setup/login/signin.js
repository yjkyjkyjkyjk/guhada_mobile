// import hooks from 'stores/form-store/hooks/login/SigninHooks';

export default {
  fields: {
    email: {
      name: 'email',
      label: '이메일',
      autoComplete: 'email',
      placeholder: '아이디 (이메일)',
      rules: 'required|email|string',
      // hooks,
    },
    password: {
      type: 'password',
      name: 'password',
      label: '비밀번호',
      autoComplete: 'password',
      placeholder: '비밀번호',
      // rules: 'required|password',
      // hooks,
    },
    saveid: {},
  },
};
