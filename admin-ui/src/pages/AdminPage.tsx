import { Button } from '@blueprintjs/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';

export const AdminPage = () => {
  const [tabIdx, setTabIdx] = useState(0);
  return (
    <>
      <Button icon="refresh" />
      <Button className="bp4-dark">TEST</Button>
      <Tabs index={tabIdx} onChange={e => setTabIdx(e)}>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Logs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
