import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tarefas/");
      const data = await res.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const addTodo = async () => {
    const todoData = {
      title,
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tarefas/criar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const data = await res.json();
      setTodos((prev) => [...prev, data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const updateTodo = async (pk) => {
    const todoData = {
      title: newTitle,
    };
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tarefas/${pk}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const data = await res.json();
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === pk) {
            return data;
          } else {
            return todo;
          }
        })
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const deleteTodo = async (pk) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/tarefas/${pk}/`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== pk));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div>
        <input
          type="text"
          placeholder="Nova atividade..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>
      {todos.map((todo) => (
        <div>
          <h3>Tarefa: {todo.title}</h3>
          <p>
            Modificado em {new Date(todo.created_at).toLocaleString("pt-BR")}
          </p>
          <input
            type="text"
            placeholder="Novo título..."
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={() => updateTodo(todo.id)}>Alterar</button>
          <button onClick={() => deleteTodo(todo.id)}>Concluir</button>
        </div>
      ))}
    </>
  );
}

export default App;
