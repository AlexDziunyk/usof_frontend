
import './style.css';

const ActionButton = ({text}) => {
  return (
    <button className='action-button' type='submit'>
      {text}
    </button>
  )
}

export default ActionButton;