
export const createFormData = (data : any) => {
  console.log(data, "inside formdata");
  
  const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if(key === "id"){
          formData.append(key, value.toString());
        } 

        if (value === true || value === false) {
          formData.append(key, value ? '1' : '0');
        } else if (typeof value === 'string' && value !== '') {
          formData.append(key, value);
        } else if (typeof value === 'number' && value !== 0) {
          formData.append(key, value.toString());
        } else if (key === 'pictures' && Array.isArray(value) && typeof value === 'File') {
          value.forEach((file, index) => {
            delete file.preview;
            formData.append(`pictures[${index}]`, file);
          });
        } 

      });
    return formData;
}