export const handleFormErrors = (error:any, setError:any, setApiError:any) => {
    if (error.response && error.response.data) {
      const serverErrors = error.response.data.errors;
      serverErrors.forEach((err:any) => {
        setError(err.field, {
          type: 'server',
          message: err.message,
        });
      });
    } else {
      setApiError('An unexpected error occurred. Please try again later.');
    }
  };