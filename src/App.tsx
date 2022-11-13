import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoardContextProvider from "./contexts/BoardContext";
import BoardPage from "./pages/board/BoardPage";
import BoardDetail from "./pages/board/BoardDetail";
import BoardList from "./pages/board/BoardList";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <BoardContextProvider>
            <Routes>
              <Route path="/" element={<BoardList />} />
              <Route path="/boards" element={<BoardList />} />
              <Route path="/boards/:id" element={<BoardPage />} />
              <Route path="/boards/:id/detail" element={<BoardDetail />} />
            </Routes>
          </BoardContextProvider>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;
