import { useContext } from 'react';
import { ClassificationContext } from '../context/ClassificationContext';

const useClassification = () => {
  return useContext(ClassificationContext);
};

export default useClassification;