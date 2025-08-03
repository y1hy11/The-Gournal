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
        <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center m-[5px] mb-6  uppercase tracking-wide">
                <div>{formattedDate}</div>
                <div>Late Edition</div>
            </div>
            <div className="text-center mb-8">
                <h1 className="text-[3.5rem] mb-4">
                    THE GOURNAL
                </h1>
                <p className="m-[5px] text-[1.2rem] md:text-xl">
                    "All the News That's Fit to Print"
                </p>
            </div>
        </div>
    </header>
);
};

export default Header;