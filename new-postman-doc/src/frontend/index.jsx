import React, { useEffect, useState } from 'react';
import ForgeReconciler, { useConfig, CodeBlock, Text } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);

  const config = useConfig();

  useEffect(async () => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  return (
    <>
      <Text>{data ? data : 'Loading...'}</Text>
      <Text>Macro configuration data:</Text>
      <CodeBlock language="json" text={JSON.stringify(config, null, 2)} />
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
