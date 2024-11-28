import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([
    // {id: 0, tarefa: 'Minha tarefa feita', finalizada: true},
    // {id: 1, tarefa: 'Minha tarefa postergada', finalizada: false}
  ]);
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(!modal);
  }

  const salvarTarefa = () => {
    var tarefa = document.getElementById('content-tarefa');
    setTarefas([...tarefas, {id: new Date().getTime(), tarefa: tarefa.value, finalizada: false}]);
    setModal(false);
    window.localStorage.setItem('tarefas', JSON.stringify([...tarefas, {id: new Date().getTime(), tarefa: tarefa.value, finalizada: false}]));
  }

  const mudarConclusao = (id, opt) => {
    let novasTarefas = tarefas.filter(function(val){
      if (val.id === id) {
        val.finalizada = opt;
      }
      return val;
    });
    setTarefas(novasTarefas);
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }

  const deletarTarefa = (id) => {
    let novasTarefas = tarefas.filter(function(val){
      if (val.id !== id) {
        return val;
      }
    });
    setTarefas(novasTarefas);
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }

  useEffect(() => {
    if (window.localStorage.getItem('tarefas')) {
      setTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
      console.log(window.localStorage.getItem('tarefas'));
    }
  }, [])

  return (
    <div className="App">
      {modal ? 
        <div className='modal'>
          <div className='modalContent'>
            <h3>Adicionar sua tarefa</h3>
            <input type='text' id='content-tarefa' />
            <button onClick={() => salvarTarefa()} >Salvar</button>
          </div>
        </div>
      : <div></div>}
      <div className='addTarefa' onClick={() => abrirModal()}>+</div>
      <div className='boxTarefas'>
        <h2>Minhas Tarefas do Dia!</h2>
        {tarefas.map((val) => {
          if (val.finalizada) {
            return (
              <div className='tarefaSingle'>
                <p onClick={() => mudarConclusao(val.id, false)} key={val.id} style={{textDecoration: 'line-through'}}>{val.tarefa}</p>
                <span onClick={() => deletarTarefa(val.id)}>(x)</span>
              </div>
            )
          } else {
            return (
              <div className='tarefaSingle'>
                <p onClick={() => mudarConclusao(val.id, true)} key={val.id}>{val.tarefa}</p>
                <span onClick={() => deletarTarefa(val.id)}>(x)</span>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
}

export default App;
