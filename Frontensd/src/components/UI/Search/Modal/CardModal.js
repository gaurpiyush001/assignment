
import classes from './CardModal.module.css';

const CardModal = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default CardModal;