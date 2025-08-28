import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Journal from "@pages/Journal";
import NotFound from "@pages/NotFound";

function App() {

  return (
      <div>
        <Router>
          <div>
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Journal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </div>
  );
}

export default App;
