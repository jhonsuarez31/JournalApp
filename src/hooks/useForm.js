import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setformValidations ] = useState( {} );

    useEffect(() => {
        createValidators()
    }, [formState])
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const isFormValidate = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if( formValidation[formValue] !=  null) return false
         }
        return true 
    }, [formValidation])



    const createValidators = () =>{

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            
            const [ fn, errorMessage ] = formValidations[formField]
            
            formCheckedValues[`${ formField }Valied`] = fn( formState[formField]) ? null : errorMessage
            
        }
        setformValidations(formCheckedValues)
       
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValidate
    }
}