import React, { useState, useEffect } from 'react';
import ForgeReconciler, { useConfig, Button, Label, SectionMessage, Stack, Textfield } from '@forge/react';
import { view } from '@forge/bridge';

const useSubmit = () => {
  const [error, setError] = useState();
  const [message, setMessage] = useState('');

  const submit = async (fields) => {
    const payload = { config: fields };

    try {
      await view.submit(payload);
      setError(false);
      setMessage(`Submitted successfully.`);
    } catch (error) {
      setError(true);
      setMessage(`${error.code}: ${error.message}`);
    }
  };

  return {
    error,
    message,
    submit
  };
};

const Config = () => {
  const [value, setValue] = useState('');
  const { error, message, submit } = useSubmit();
  const config = useConfig();

  useEffect(() => {
    setValue(config?.myField);
  }, [config?.myField]);

  return (
    <Stack space="space.200">
      <Label labelFor="myField">Config field:</Label>
      <Textfield id="myField" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button appearance="subtle" onClick={view.close}>
        Close
      </Button>
      <Button appearance="primary" onClick={() => submit({ myField: value })}>
        Submit
      </Button>
      {typeof error !== 'undefined' && (
        <SectionMessage appearance={error ? 'error' : 'success'}>{message}</SectionMessage>
      )}
    </Stack>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Config />
  </React.StrictMode>
);
