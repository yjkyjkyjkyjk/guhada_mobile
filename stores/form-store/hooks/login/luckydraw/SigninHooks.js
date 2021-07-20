import _ from 'lodash';
import API from 'childs/lib/API';
import { root } from 'store';

export default {
  onInit(form) {},

  onSubmit(form) {},

  onSuccess(form) {
    let loginData = form.values();
    API.user
      .post(
        `/loginUser`,
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        const { data: resData } = res;
        const { data } = resData;

        if (resData.resultCode === 200) {
          root.login.handleLoginSuccess({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
          });

          root.luckyDraw.setLuckydrawLoginModal(false);
          root.luckyDraw.getEventUser();
        }
      })
      .catch((e) => {
        if (_.get(e, 'status') === 200) {
          root.toast.getToast(_.get(e, 'data.message'));
        } else {
          root.toast.getToast('다시 시도해주세요.');
        }
      });
  },

  onChange(field) {
    if (field.name === 'password') {
      field.invalidate();
    }
  },

  onError(form) {},

  onClear(instance) {},

  onReset(instance) {},
};
