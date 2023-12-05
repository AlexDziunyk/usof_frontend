import './style.css'
import TimeAgo from 'javascript-time-ago'


const timeAgo = new TimeAgo('en-US')

const UserPostCard = ({avatar, status, author, date}) => {
  return (
    <div className='user-post-card__wrapper'>
      <div className='user-post-card'>
        <div className='user-post-card__avatar'><img src={avatar} alt=''></img></div>
        <div className='user-post-card__content'>
          <p className='user-post-card__author'>{author}</p>
          <p className='user-post-card__date'>Published: {timeAgo.format(Date.parse(date))}</p>
        </div>
      </div>
      <p className={`${status === 'active' ? 'user-post-card__active' : 'user-post-card__inactive'}`}>{status.toUpperCase()}</p>
    </div>
  )
}

export default UserPostCard;