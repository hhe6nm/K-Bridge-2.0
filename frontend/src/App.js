import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SmoothScroll from "@/components/SmoothScroll";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Team from "@/pages/Team";
import Services from "@/pages/Services";
import Process from "@/pages/Process";
import Success from "@/pages/Success";
import Insights from "@/pages/Insights";
import InsightPost from "@/pages/InsightPost";
import Faq from "@/pages/Faq";
import Locations from "@/pages/Locations";
import Contact from "@/pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SmoothScroll>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/success" element={<Success />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<InsightPost />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#050914",
            color: "#F9F9F7",
            border: "1px solid rgba(198,168,124,0.3)",
            borderRadius: "2px",
          },
        }}
      />
    </div>
  );
}

export default App;
