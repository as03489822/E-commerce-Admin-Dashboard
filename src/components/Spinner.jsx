import SpinnerImg from '../../public/Spinner.gif'

const Spinner = () => {
  return (
    <div className="flex justify-center align-center">
      <img src={SpinnerImg} alt="Loading Please Wait" />
    </div>
  )
}

export default Spinner