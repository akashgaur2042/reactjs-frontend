import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

 

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name]: value })
}

  return {
    handleInputChange,
    user,
    errors,
  }
};

export default useForm;