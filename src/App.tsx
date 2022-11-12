import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./pages/board/Board";
import BoardDetail from "./pages/board/BoardDetail";
import BoardList from "./pages/board/BoardList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App h-[100vh] bg-slate-500 text-white">
        <Router>
          <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/boards" element={<BoardList />} />
            <Route path="/boards/:id" element={<Board />} />
            <Route path="/boards/new" element={<BoardDetail />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;
