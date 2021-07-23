import css from './ToolbarBrand.module.scss';
import Brand from './Brand';
import { inject } from 'mobx-react';
import { useRouter } from 'next/router';
import ModalPortal from 'components/templates/ModalPortal';
function ToolbarBrand({ handleOpen, handleClose, brands }) {
  const router = useRouter();

  return (
    <ModalPortal
      handleOpen={handleOpen}
      handleClose={() => {
        handleClose();
        brands.searchBrand('');
        brands.searchBrandText = '';
      }}
      slide={1}
      gutter
    >
      <div className={css.wrap}>
        <div className={css.header}>브랜드</div>
        <div className={css.itemWrap}>
          <Brand onClose={handleClose} routerPush={router.push} />
        </div>
      </div>
    </ModalPortal>
  );
}

export default inject('brands')(ToolbarBrand);
