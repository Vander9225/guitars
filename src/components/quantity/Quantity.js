import useBucket from '../useBucket';
import { INCREMENT, DECREMENT } from '../../constants';
import './quantity.css'

const Quantity = (props) => {
  const { guitarId, quantity } = props;
  const { changeQuantity } = useBucket();

  const handleChangeQuantity = (e) => {
    const { name } = e.target;
    if (name === DECREMENT) {
      changeQuantity(guitarId, quantity - 1 );
    }
    if (name === INCREMENT) {
      changeQuantity(guitarId, quantity + 1);
    }
  };

  return (
    <div className="quantity">
      <button name={DECREMENT} className="crement" onClick={handleChangeQuantity}>
        -
      </button>
      <span>{quantity} шт.</span>
      <button name={INCREMENT} className="crement" onClick={handleChangeQuantity}>
        +
      </button>
    </div>
  );
};

export default Quantity;
