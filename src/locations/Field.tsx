import React, { useState, useEffect } from 'react';
import { FormLabel, TextInput, Flex } from '@contentful/f36-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { useSDK, useFieldValue } from '@contentful/react-apps-toolkit';

interface FieldProps {
  name: string,
  colour: string,
}

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [existingValues] = useFieldValue<FieldProps[]>();
  const defaultValue: FieldProps[] = [{ name: '', colour: '' }]; 

  const [values, setValues] = useState<FieldProps[]>(existingValues || defaultValue);

  const updateName = (index: number, name: string) => {
    const newValues = [...values];
    newValues[index].name = name;
    setValues(newValues);
    sdk.field.setValue(newValues);
  }

  const updateColour = (index: number, colour: string) => {
    const newValues = [...values];
    newValues[index].colour = colour;
    setValues(newValues);
    sdk.field.setValue(newValues);
  }

  const addField = () => {
    const newValues = [...values, { name: "", colour: "" }];
    setValues(newValues);
    sdk.field.setValue(newValues);
  }; 

  const removeField = (index: number) => {
    const newValues = [...values];
    const filteredValues = newValues.filter((_, i) => i !== index);
    setValues(filteredValues);
    sdk.field.setValue(newValues);
  }

  useEffect(() => {
    sdk.window.startAutoResizer();
 }, [sdk.window, sdk.field]);

  return (
    <>

    <Flex flexDirection="column">
      {values.map((val: FieldProps, index: number) => (
            <Flex key={index} flexDirection="row" alignItems="center" gap="2" justifyContent={"space-between"} >
            <div>
          <FormLabel>Name</FormLabel>
              <TextInput name="name" value={val.name} onChange={(event) => updateName(index, event.target.value)} />
              </div>
              <div>
              <FormLabel>Fave Colour</FormLabel>
              <TextInput name='colour' value={val.colour} onChange={(event) => updateColour(index, event.target.value) } />
              </div>
              <div>
                <button onClick={() => removeField(index)}>-</button>
                </div>
          </Flex>
      ))}
    <button style={{alignSelf: "flex-start", marginTop: "2vw"}} onClick={() => addField()}>+</button>
    </Flex>
    </>

  );
};

export default Field;
