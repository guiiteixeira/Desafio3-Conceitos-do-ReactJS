import React,{ useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  function handleAddRepository() {
    const newProject = {
      title: `Novo Projeto ${Date.now()}`,
      url: 'http://algumlugar.com',
      techs: ['ReactJS']
    }

    api.post('repositories',newProject).then(response => {
      setRepositories([...repositories,response.data]);
    });
  }

  function handleRemoveRepository(id) {

    var newArray = [...repositories];
    var index = newArray.findIndex(repository => repository.id === id);
    newArray.splice(index,1);
    setRepositories(newArray);

    api.delete(`repositories/${id}`);
  }

  return (
    <div>
      <h1>{repositories.length} elementos na lista</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
