"use client";
import {
    Controller,
    FieldErrors,
} from 'react-hook-form';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import libphonenumber from 'google-libphonenumber';

import { useEffect, useState } from 'react';

// Define props for the PhoneInput component
interface PhoneInputProps {
    id: string; // Input identifier for referencing and rendering
    control: any; // React Hook Form's 'control' prop for form communication
    errors: FieldErrors;  // React Hook Form's 'errors' prop for validation messages
    setValue: any; 
    value:any;
    isSubmitted: boolean; // Flag indicating form submission status
    isRequired: boolean; // Flag indicating form submission status
};

export const PhoneNumberInput: React.FC<PhoneInputProps> = ({
    control,
    id,
    errors,
    setValue,
    value,
    isSubmitted,
    isRequired,
}) => {
    
    // States and functions
    const [phoneNumberData, setPhoneNumberData] = useState<CountryData>({
        name: 'UAE',  
        dialCode: '+971',  
        countryCode: 'ae', 
        format: '+.. .....-.....',
     });
    
     useEffect(() => {
         console.log(value);
        if (value) {
            
          setValue(id, value, { shouldValidate: isSubmitted });
        }
      }, [value, id, setValue, isSubmitted]);

    const validatePhoneNumber = (
        value: string, // The phone number input value (includes the country code)
        inputInformation: CountryData // Country information for validation(dialcode and country code)
    ) => {
        let isValid = true; // Assume the number is initially valid
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();  // Get an instance of libphonenumber
        
        // Extract the actual phone number (excluding the country code)
        const phoneNumber = value.substring(inputInformation.dialCode.length +1);
        
        // Get the length of an example number based on the country code for validation
        const exampleNumberLengthByCountryCode = phoneUtil 
            .getExampleNumber(inputInformation.countryCode) 
            .getNationalNumber()
            ?.toString().length;
    
        // Check if the input length matches the example number length
        if (phoneNumber.length !== exampleNumberLengthByCountryCode){
          return false;
        }
        
        // Return the validation result
        return isValid;
    };
    
    const handleOnChange = (value: string, inputData: CountryData) => {
        setValue(id, value, { shouldValidate: isSubmitted });
        setValue('country_code', inputData.dialCode, { shouldValidate: isSubmitted });
        setPhoneNumberData(prevData=>inputData);
    };

    return (
        // Use Controller component from react-hook-form
        <Controller
            name={id}
            control={control}
            // Define rules for validation
            rules={{   
                ...(isRequired && { required: 'Phone number is required!' }),
                validate: (fieldValue) => {  
                    const isValid = validatePhoneNumber(
                        fieldValue,
                        phoneNumberData
                    );
                    return isValid || 'Phone Number is not valid!';
                },  
            }}

            render={({ field }) => {
                const phoneValue = (field.value !== undefined) ? String(field.value) : '';
                return (
                    <div className="flex flex-col mb-6 text-primary-blue">
                        {/* PhoneInput component */}
                        <PhoneInput
                            onChange={(value, inputData) =>
                                handleOnChange(value, inputData as CountryData)
                            }
                            value={phoneValue}
                            country={'ae'}
                            inputStyle={{
                                width: '100%',
                                padding: '24px 54px',
                                border: `1px solid ${errors[id] ? '#f44336' : 'rgba(0, 0, 0, 0.23)'}`,
                                borderRadius: '4px',
                                fontSize: '1rem',
                              }}
                              buttonStyle={{
                                border: `1px solid ${errors[id] ? '#f44336' : 'rgba(0, 0, 0, 0.23)'}`,
                                borderRadius: '4px 0 0 4px',
                              }}
                            placeholder="Enter your phone number"
                            enableSearch
                            countryCodeEditable={false}
                            autoFormat
                        />
                        {/* Display error message if any */}
                        {errors[id] && errors[id]?.message && (
                            <span className="text-red-500 text-xs mt-1.5">
                                {errors[id]?.message as React.ReactNode}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );

};

export default PhoneNumberInput;