import Link from 'next/link';

const PageNotFound = () => {
  return (
    <>
      <div className="text-center text-gray-800">Oops! You look lost. . .</div>
      <div className="text-center text-gray-500 mt-2">Calista hasn't created this page yet.</div>
      <div className="text-center text-gray-400 mt-2">Checkout the <Link className='underline hover:text-gray-500' href="/">homepage</Link></div>
      <div className="text-center text-gray-300 mt-2">Before this text</div>
      <div className="text-center text-gray-200 mt-2">Fades away</div>
    </>
  )
}

export default PageNotFound