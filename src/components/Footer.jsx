const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 position-fixed left-0 right-0 bottom-0 w-full">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b pb-8">
          <div className="text-center m-[6px_0_6px_0]">
            <h3 className="text-[2rem]">
              THE GOURNAL
            </h3>
            <p className="text-[1.2rem]">
              Your trusted source for daily news.
            </p>
          </div>
        </div>
        <div className="border-t-0.5 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center  m-[1rem_0_6px_0]">
              <p className="text-[0.9rem]">
                Developed by{' '}
                <a 
                  href="https://github.com/Y1HY11" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-[#a06a6a]"
                >
                  @Y1HY11
                </a>
              </p>
              <p className="text-[0.9rem] mt-1 m-[0.2rem_0]">
                © {currentYear} The Gournal. All rights reserved. ALX Frontend Engineering Capstone Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
