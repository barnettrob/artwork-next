import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-md px-6 py-8">
      <h1 className="text-center text-gray-100">Oops! You look lost. . .</h1>
      <div className="page-not-found-fade">
        <div className="text-center text-gray-300 mt-2">Calista hasn't created this page yet.</div>
        <div className="text-center text-gray-400 mt-2">Checkout the <Link className='underline hover:text-gray-200' href="/">homepage</Link></div>
        <div className="text-center text-gray-300 mt-2">Before this text</div>
        <div className="text-center text-gray-200 mt-2">Fades away</div>
      </div>
    </div>
  )
}

export default PageNotFound