import './style.css'

const Category = ({title, description}) => {
  return (
    <div className='category'>
      <h4 className='category__title'>{title}</h4>
      <p className='category__description'>{description}</p>
    </div>
  )
}

export default Category;