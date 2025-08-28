import { Link } from 'react-router-dom';

const NotFound = () => {

  return (
    <main className="">
      <div className="container mx-auto m-[5rem_0_5rem_0]">
        <div className="max-w-2xl mx-auto text-center">
          
          <h1 className="text-[8rem] font-bold">
            404
          </h1>

          <div className="space-y-6 mb-12">
            <h2 className="text-[2.5rem] font-bold">
              Page Not Found
            </h2>
            
            <p className="text-[1.2rem] p-[12px_24px] leading-relaxed">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-[12px]">
            <Link 
              to="/"
              className="bg-[#302B1F] text-[#E2D4BC] p-[12px_24px] text-[1.1rem] font-semibold uppercase hover:opacity-90 transition-opacity rounded-[4px]"
            >
              Return Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="border-t-2 border-[#302B1F] p-[12px_24px] text-[1.1rem] font-semibold uppercase hover:bg-[#302B1F] hover:text-[#E2D4BC] transition-colors rounded-[4px]"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
