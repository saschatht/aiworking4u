import { FormEvent, useState } from "react";

import { generateClient } from "aws-amplify/api";
import { Schema } from "../amplify/data/resource";

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@cloudscape-design/global-styles/index.css";

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import { Form, Textarea } from "@cloudscape-design/components";
import FormField from "@cloudscape-design/components/form-field";

Amplify.configure(outputs);

const client = generateClient<Schema>();
export default function App() {
  const [prompt, setPrompt] = useState<string>("Como puedo ayudarte?");
  //const [answer, setAnswer] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = await client.queries.generateBedrock({
      prompt,
    });

    if (!errors) {
      setAnswer(data);
      setPrompt("");
    } else {
      console.log(errors);
    }
  };

  return (

    <SpaceBetween size="m">
      <Header variant="h1">AIworking4U</Header>

      <Container>
        <SpaceBetween size="s">
          <span>Hola, como puedo ayudarte?</span>
          <Textarea
            value={answer}
            rows={20}
            disableBrowserAutocorrect
            disableBrowserSpellcheck
          ></Textarea>
          <form onSubmit={sendPrompt}>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button variant="primary">Submit</Button>
                </SpaceBetween>
              }
            >
              <Container>
                <SpaceBetween direction="vertical" size="l">
                  <FormField label="Prompt">
                    <Input
                      onChange={({ detail }) => setPrompt(detail.value)}
                      value={prompt}
                    />
                </FormField>
                </SpaceBetween>
              </Container>
            </Form>
          </form>
          <Button variant="primary" onClick={signOut}>Sign out</Button>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
    
  );
}