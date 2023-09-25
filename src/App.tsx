import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SuperHeroesPage from "./pages/SuperHeroesPage";
import RQSuperHeroesPage from "./pages/RQSuperHeroesPage";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RQSuperHeroPage from "./pages/RQSuperHeroPage";
import ParallelQueriesPage from "./pages/ParallelQueriesPage";
import DynamicParallelPage from "./pages/DynamicParallelPage";
import DependentQueriesPage from "./pages/DependentQueriesPage";
import PaginatedQueriesPage from "./pages/PaginatedQueriesPage";
import InfiniteQueriesPage from "./pages/InfiniteQueriesPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/rq-infinite" element={<InfiniteQueriesPage />} />
          <Route path="/rq-paginated" element={<PaginatedQueriesPage />} />
          <Route
            path="/rq-dependent"
            element={<DependentQueriesPage email="hyeon9782@gmail.com" />}
          />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
