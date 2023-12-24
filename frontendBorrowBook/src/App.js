import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddPage from './Components/AddPage';
import BorrowBook from './Components/Forms/BorrowBook';

function App() {
  return (
    <Router>
      <Switch>
         <Route exact path="/" component={AddPage} />
         <Route exact path="/borrowbook" component={BorrowBook} />
      </Switch>
    </Router>
  );
}

export default App;
