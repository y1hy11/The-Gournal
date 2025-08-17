const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bottom-0 left-0 right-0 w-full">
      <div className="text-center m-[1rem_0_6px_0] border-t-2 border-b-2 uppercase">
            <p className="text-[1.2rem] m-[10px_0_0_0]">
              End of Today's Edition
            </p>
            <h3 className="text-[2.2rem] m-[10px_0_10px_0]">
              THE GOURNAL
            </h3>
            <p className="text-[1.2rem] m-[0_0_10px_0]">
              Your trusted source for daily news.
            </p>
      </div>
      <div className="text-center  m-[1rem_0_10px_0]">
              <p className="text-[0.9rem] uppercase">
                Developed by{' '}
                <a 
                  href="https://github.com/Y1HY11" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold hover:text-[#ffffff]"
                >
                  @Y1HY11
                </a>
              </p>
              <p className="text-[0.9rem] mt-1 m-[10px_0] uppercase">
                © {currentYear} The Gournal. All rights reserved. ALX Frontend Capstone Project
              </p>
      </div>
    </footer>
  );
};

export default Footer;
