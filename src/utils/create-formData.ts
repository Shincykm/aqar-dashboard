import { parseISO, format } from 'date-fns';

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

export const handleFormData = (data:any) => {
  const formData = new FormData();

  if (data?.phone_number && data?.country_code) {
    const dialCodeLength = data.country_code.length;
    data.phone_number = String(data.phone_number).slice(dialCodeLength);
  }

  Object.entries(data).forEach(([key, value]) => {
      if (key === "id" && value) {
        formData.append(key, value.toString());
      } else if (typeof value === 'boolean') {
        formData.append(key, value ? '1' : '0');
      } else if (typeof value === 'string' && value !== '') {
        if(key !== "profile_picture" && key !== "licence_picture")
          formData.append(key, value);
      } else if (typeof value === 'number' && value !== 0) {
        formData.append(key, value.toString());
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else if (key === "languages_ids") {
            formData.append(`${key}[${index}]`, JSON.stringify(item?.id));
          }
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof Date) {
        formData.append(key, format(value, 'yyyy-MM-dd')); // Convert date to yyyy-MM-dd
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      }
  });

  return formData;
};