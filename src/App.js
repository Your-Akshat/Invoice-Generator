import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import PageLayout from './layout/PageLayout/PageLayout';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <Router> 
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </Router>
  );
}

export default App;
