import css from './ReviewDetailComment.module.scss';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const emojis = [
  ['thumbsup', '👍'],
  ['clap', '👏'],
  ['thank', '🙌'],
  ['pray', '🙏'],
  ['like', '😊'],
  ['love', '😍'],
  ['cool', '😎'],
  ['heart', '💖'],
];

const ReviewDetailComment = ({ avatar, handleSubmit }) => {
  /**
   * states
   */
  const textareaRef = useRef();
  const [input, setInput] = useState('');
  const [textareaRows, setTextareaRows] = useState(1);

  /**
   * handlers
   */
  const handleEmojiClick = (e) => {
    if (e.target.tagName === 'SPAN') {
      setInput(input + e.target.textContent);
    }
  };
  const handleChange = (e) => {
    if (
      !(
        input.charAt(input.length - 1) === ' ' &&
        e.target.value.charAt(e.target.value.length - 1) === ' '
      )
    ) {
      setInput(e.target.value);
    }
  };
  const handleReviewSubmit = () => {
    handleSubmit(input);
    setInput('');
  };

  /**
   * side effects
   */
  useEffect(() => {
    if (textareaRef.current) {
      setTextareaRows(textareaRef.current.value.split('\n').length);
      if (
        textareaRef.current.nextElementSibling.clientWidth >
        textareaRef.current.clientWidth
      ) {
        textareaRef.current.style.minHeight = `${textareaRef.current.scrollHeight}px`;
      } else {
        textareaRef.current.style.minHeight = '18px';
      }
    }
  }, [input]);

  /**
   * render
   */
  return (
    <div className={css['detail-comment']}>
      <div className={css['detail-comment__emojis']} onClick={handleEmojiClick}>
        {emojis.map(([label, emoji]) => (
          <span key={label} aria-label={label}>
            {emoji}
          </span>
        ))}
      </div>
      <div className={css['detail-comment__comment']}>
        <div
          className={css['comment__avatar']}
          style={{ backgroundImage: avatar }}
        />
        <div className={css['comment__form']}>
          <textarea
            ref={textareaRef}
            rows={textareaRows}
            className={css['form__textarea']}
            placeholder="댓글을 입력해주세요"
            value={input}
            onChange={handleChange}
          />
          <pre className={css['form__wrap']}>{input}</pre>
          <button className={css['form__submit']} onClick={handleReviewSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

ReviewDetailComment.propTypes = {
  avatar: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default ReviewDetailComment;
