import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/students');
        if (!response.ok) {
          throw new Error('Error al obtener los estudiantes');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error al eliminar el estudiante:', error);
    }
  };

  return (
    <div>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            <span>ID: {student._id}</span>
            <div className="student-info">
              <span>{student.name}</span>
              <span>- Edad: {student.age}</span>
            </div>
            <div className="actions">
              <Link to={`/edit-student/${student._id}`}>
                <button className="edit">Editar</button>
              </Link>
              <button className="delete" onClick={() => handleDelete(student._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
