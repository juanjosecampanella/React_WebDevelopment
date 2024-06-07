import React from 'react';
import { useParams } from 'react-router-dom';
import StudentUpdateForm from '../components/studentUpdateForm';

const EditStudent = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Editar Estudiante</h2>
      <StudentUpdateForm studentId={id} />
    </div>
  );
};

export default EditStudent;
