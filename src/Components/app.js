import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Home = () => <div className="p-4">Welcome to the Home Page</div>;
const Chat = () => <div className="p-4">Chat Page</div>;
const Resources = () => <div className="p-4">Resources Page</div>;

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="#" className="hover:underline">Chat</Link>
          <Link to="/resources" className="hover:underline">Resources</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}
  