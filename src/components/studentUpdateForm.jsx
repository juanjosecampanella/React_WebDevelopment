import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentUpdateForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [grades, setGrades] = useState([{ semester: 1, grade: 0 }]);

  useEffect(() => {
    const fetchStudentById = async (studentId) => {
      try {
        const response = await fetch(`http://localhost:3000/students/${studentId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setName(data.name);
        setGrades(data.grades);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudentById(id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated:', { name, grades });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
      <button type="submit">Actualizar estudiante</button>
    </form>
  );
};

export default StudentUpdateForm;
