import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

import './style.css';

const RatingBlock = ({likes, addLike, addDislike, isLiked}) => {
  return (
    <div className='rating'>
      <div onClick={addLike} className={`rating_plus ${isLiked === 'like' && 'rating_count_active'}`}><FiPlus /></div>
      <div className='rating_count'>{likes}</div>
      <div onClick={addDislike} className={`rating_minus ${isLiked === 'dislike' && 'rating_count_active'}`}><FiMinus /></div>
    </div>
  )
}

export default RatingBlock;