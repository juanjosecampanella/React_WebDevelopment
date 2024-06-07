import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grades, setGrades] = useState([{ semester: 1, grade: 0 }]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { name, age, grades });
    navigate.push('/'); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Edad:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Notas:</label>
        {grades.map((grade, index) => (
          <div key={index} className="form-group">
            <label>Semestre:</label>
            <input type="number" value={grade.semester} onChange={(e) => {
              const newGrades = [...grades];
              newGrades[index].semester = parseInt(e.target.value);
              setGrades(newGrades);
            }} />
            <label>Nota:</label>
            <input type="number" value={grade.grade} onChange={(e) => {
              const newGrades = [...grades];
              newGrades[index].grade = parseInt(e.target.value);
              setGrades(newGrades);
            }} />
          </div>
        ))}
        <button type="button" onClick={() => setGrades([...grades, { semester: grades.length + 1, grade: 0 }])}>Añadir nota</button>
      </div>
      <button type="submit">Crear estudiante</button>
    </form>
  );
};

export default StudentForm;
