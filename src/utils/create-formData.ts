export const createFormData = (data: any) => {
  
  const formData = new FormData();
  if (data.hasOwnProperty('amenity_items')) {
    formData.append('amenities[0]', '');
  }

  Object.entries(data).forEach(([key, value]: any) => {
    if (key === 'id' && value) {
      formData.append(key, value.toString());
    } else if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
    } else if (typeof value === 'string' && value !== '') {
      formData.append(key, value);
    } else if (typeof value === 'number' && value !== 0) {
      formData.append(key, value.toString());
    } else if (key === 'amenity_items' && Array.isArray(value)) {
        value.forEach((val, index)=>{
          formData.append(`amenities[${index}]`, val.toString());
        });
    } else if (key === 'pictures' && Array.isArray(value)) {
      value.forEach((file, index) => {
        if (file instanceof File) {
          // file?.preview && delete file.preview;  // Ensure this is safe and file.preview exists
          formData.append(`pictures[${index}]`, file);
        }
      });
    }
  });

  return formData;
};
