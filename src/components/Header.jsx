
const Header = () => {

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="border-b-2">
      <div className="container mx-auto">
        <div className="flex justify-between  items-center m-[5px] text-xs uppercase">
          <div>{formattedDate}</div>
          <div>Late Edition</div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-[3.5rem] text-bold font-700">
            THE GOURNAL
          </h1>
          <p className="m-[5px] text-[1.1rem] uppercase">
            Your trusted source for daily news
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;