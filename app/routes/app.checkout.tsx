import { Banner, Box, Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import React from 'react';

function CheckoutComponent(props: { name: string }) {
  return (
    <Box background="bg-fill-critical">
      <Text tone="critical" as="h1" >{props.name} </Text>
    </Box>
  );
}

export default function AdditionalPage() {
   
  return (
    <Page>
      <TitleBar title="Your Checkouts" />
      <Box padding={'100'}>
      <Banner title="Warning" tone="warning" />
      </Box>
      <CheckoutComponent name={'this is 1'} />
      
    </Page>
  );
}
