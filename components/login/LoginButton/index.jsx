import css from './LoginButton.module.scss';
import cn from 'classnames';

const LoginButton = ({ children, style, className, onClick, disabled }) => (
  <div className={css.wrap}>
    <button
      className={cn(
        { [css.isGray]: className === 'isGray' },
        { [css.isColored]: className === 'isColored' }
      )}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  </div>
);

export default LoginButton;
