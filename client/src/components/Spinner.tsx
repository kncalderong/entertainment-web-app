const Spinner = () => {
  return (
    <>
      <div className="relative">
        <div className="w-20 h-20 border-dark-blue border-2 rounded-full"></div>
        <div className="w-20 h-20 border-red border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>

      <div className="relative">
        <div className="w-10 h-10 border-dark-blue border-2 rounded-full"></div>
        <div className="w-10 h-10 border-red border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>

      <div className="relative">
        <div className="w-5 h-5 border-dark-blue border-2 rounded-full"></div>
        <div className="w-5 h-5 border-red border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </>
  )
}

export default Spinner
