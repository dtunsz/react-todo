import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateTodo from './components/CreateTodo';
import Layout from './components/Layout';
import Todo from './components/Todo';
import CategoryTodo from './components/CategoryTodo';

function App() {
  return (
    <Router>
        <Layout>
            <Switch>
                <Route path="/create">
                    <CreateTodo />
                </Route>
                <Route exact path="/todos">
                    <Todo />
                </Route>
                <Route path="/todos/:category">
                    <CategoryTodo />
                </Route>
            </Switch>
        </Layout>
    </Router>
  );
}

export default App;
