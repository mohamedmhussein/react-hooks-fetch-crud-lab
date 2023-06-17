import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {

    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(questions => setQuestions(questions))

  }, [])

  function handleItemAdd(newItem) {
    setQuestions([...questions, newItem])
  }

  function handleDelete(question) {

    const updatedList = questions.filter(item => item.id !== question.id)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    },
    )
      .then(res => res.json())
      .then(item => { setQuestions(updatedList) })
  }

  function updateIndex(updated) {
    const updatedItems = questions.map((item) => {
      if (item.id === updated.id) {
        return updated;
      } else {
        return item;
      }
    });
    setQuestions(updatedItems);

  }

  function CorrectedIndexChange(event, id) {
    console.log(event.target.value)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: event.target.value,
      })
    })
      .then(r => r.json())
      .then(updated => {
        updateIndex(updated)
        console.log(updated.correctIndex)
      })

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddItem={handleItemAdd} /> : <QuestionList questions={questions} handleDelete={handleDelete} onCorrectIndexChange={CorrectedIndexChange} />}
    </main>
  );
}

export default App;
