---
title: Introduction
subtitle: Build voice AI agents that can make and receive phone calls
slug: quickstart/introduction
---

## What is Vapi?

Vapi is the developer platform for building voice AI agents. We handle the complex infrastructure so you can focus on creating great voice experiences.

**Voice agents** allow you to:
- Have natural conversations with users
- Make and receive phone calls
- Integrate with your existing systems and APIs
- Handle complex workflows like appointment scheduling, customer support, and more

## How voice agents work

Every Vapi assistant combines three core technologies:

<CardGroup cols={3}>
  <Card title="Speech-to-Text" icon="microphone" iconType="solid">
    Converts user speech into text that your agent can understand
  </Card>
  <Card title="Large Language Model" icon="brain" iconType="solid">
    Processes the conversation and generates intelligent responses
  </Card>
  <Card title="Text-to-Speech" icon="volume-high" iconType="solid">
    Converts your agent's responses back into natural speech
  </Card>
</CardGroup>

You have full control over each component, with dozens of providers and models to choose from; OpenAI, Anthropic, Google, Gladia, Deepgram, ElevenLabs, and many, many more.

## Two ways to build voice agents

Vapi offers two main primitives, designed for different use cases:

<CardGroup cols={2}>
  <Card 
    title="Assistants" 
    icon="robot" 
    iconType="solid"
    href="/assistants/quickstart"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    **Best for:** Most use cases and fast iteration
    <br />
    Assistants use a single system prompt plus tools and structured outputs. Perfect for:
    - Customer support
    - Lead qualification
    - Booking and routing
  </Card>
  <Card 
    title="Squads" 
    icon="users" 
    iconType="solid"
    href="/squads"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    **Best for:** Multi-assistant setups with specialization
    <br />
    Squads orchestrate multiple assistants with context-preserving transfers. Ideal for:
    - Medical triage and scheduling
    - E‑commerce orders, returns, VIP
    - Property management routing
  </Card>
</CardGroup>

## Key capabilities

- **Real-time conversations:** Sub-600ms response times with natural turn-taking
- **Phone integration:** Make and receive calls on any phone number
- **Web integration:** Embed voice calls directly in your applications  
- **Tool integration:** Connect to your APIs, databases, and existing systems
- **Multi-assistant orchestration (Squads):** Compose specialized assistants with seamless transfers

## Choose your path

<CardGroup cols={2}>
  <Card
    title="Phone Calls"
    icon="phone"
    iconType="solid"
    href="/quickstart/phone"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    - Create a voice agent for inbound/outbound calls
    - Build customer support or sales automation
    - Get started with no coding required

    *Build your first voice agent in 5 minutes using our dashboard.*
  </Card>
  <Card
    title="Web Integration"
    icon="browser"
    iconType="solid"
    href="/quickstart/web"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    - Add voice capabilities to your web application
    - Integrate voice chat into your existing product
    - Build with code and SDKs

    *Embed live voice conversations directly in your app.*
  </Card>
</CardGroup>

## Developer tools

### Vapi CLI

The Vapi CLI brings the full power of the platform to your terminal:

<CardGroup cols={1}>
  <Card
    title="CLI Overview"
    icon="terminal"
    iconType="solid"
    href="/cli"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    Install in seconds with:
    ```bash
    curl -sSL https://vapi.ai/install.sh | bash
    ```
    Everything from the dashboard, now in your terminal.
  </Card>
</CardGroup>

## Popular use cases

<CardGroup cols={3}>
  <Card 
    title="Customer Support" 
    icon="headset" 
    iconType="solid"
    href="/assistants/examples/inbound-support"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    
    Automate inbound support calls with agents that can access your knowledge base and escalate to humans when needed.
  </Card>
  <Card 
    title="Sales & Lead Qualification" 
    icon="phone-office" 
    iconType="solid"
    href="/assistants/examples/lead-qualification"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    
    Make outbound sales calls, qualify leads, and schedule appointments with sophisticated branching logic.
  </Card>
  <Card 
    title="Appointment Scheduling" 
    icon="calendar-check" 
    iconType="solid"
    href="/assistants/examples/appointment-scheduling"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    
    Handle booking requests, check availability, and confirm appointments with conditional routing.
  </Card>
  <Card 
    title="Medical Triage & Scheduling" 
    icon="stethoscope" 
    iconType="solid"
    href="/squads/examples/clinic-triage-scheduling"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-squad">Built with Squads</div>
    
    Emergency routing and appointment scheduling for healthcare.
  </Card>
  <Card 
    title="E-commerce Order Management" 
    icon="shopping-cart" 
    iconType="solid"
    href="/squads/examples/ecommerce-order-management"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-squad">Built with Squads</div>
    
    Order tracking, returns, and customer support workflows.
  </Card>
  <Card 
    title="See more examples" 
    icon="book" 
    iconType="solid" 
    href="/examples"
  >
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    See our collection of examples covering a wide range of use cases.
  </Card>
</CardGroup>


---
title: Phone calls
subtitle: Learn to make your first phone call with a voice agent
slug: quickstart/phone
---

## Overview

Vapi makes it easy to build voice agents that can make and receive phone calls. In under 5 minutes, you'll create a voice assistant and start talking to it over the phone.

**In this quickstart, you'll learn to:**
- Create an assistant using the Dashboard or programmatically
- Set up a phone number  
- Make your first inbound and outbound calls

## Prerequisites

- [A Vapi account](https://dashboard.vapi.ai)
- For SDK usage: API key from the Dashboard

<Tip>
**Using the Vapi CLI?** You can create assistants, manage phone numbers, and make calls directly from your terminal:

```bash
# Install the CLI
curl -sSL https://vapi.ai/install.sh | bash

# Login and create an assistant
vapi login
vapi assistant create
```

[Learn more about the Vapi CLI →](/cli)
</Tip>

## Create your first voice assistant

<Tabs>
  <Tab title="Dashboard">
    <Steps>
      <Step title="Open the Vapi Dashboard">
        Go to [dashboard.vapi.ai](https://dashboard.vapi.ai) and log in to your account.
      </Step>

      <Step title="Create a new assistant">
        In the dashboard, create a new assistant using the customer support specialist template.

        <Frame caption="Creating a new assistant">
          <img src="file:9c79d894-9642-4e94-8bc4-719ebe8f18cb" />
        </Frame>
      </Step>

      <Step title="Configure your assistant">
        Set the first message and system prompt for your assistant:

        **First message:**
        ```plaintext
        Hi there, this is Alex from TechSolutions customer support. How can I help you today?
        ```

        **System prompt:**
        ```plaintext
        You are Alex, a customer service voice assistant for TechSolutions. Your primary purpose is to help customers resolve issues with their products, answer questions about services, and ensure a satisfying support experience.
        - Sound friendly, patient, and knowledgeable without being condescending
        - Use a conversational tone with natural speech patterns
        - Speak with confidence but remain humble when you don't know something
        - Demonstrate genuine concern for customer issues
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="TypeScript (Server SDK)">
    <Steps>
      <Step title="Install the SDK">
        <CodeBlocks>
        ```bash title="npm"
        npm install @vapi-ai/server-sdk
        ```

        ```bash title="yarn"
        yarn add @vapi-ai/server-sdk
        ```

        ```bash title="pnpm"
        pnpm add @vapi-ai/server-sdk
        ```

        ```bash title="bun"
        bun add @vapi-ai/server-sdk
        ```
        </CodeBlocks>
      </Step>

      <Step title="Create the assistant">
        ```typescript
        import { VapiClient } from '@vapi-ai/server-sdk';

        const vapi = new VapiClient({ token: process.env.VAPI_API_KEY! });

        const assistant = await vapi.assistants.create({
          name: 'Customer Support Assistant',
          model: {
            provider: 'openai',
            model: 'gpt-4o',
            messages: [{ role: 'system', content: 'You are Alex, a customer service voice assistant for TechSolutions.' }]
          },
          voice: { provider: '11labs', voiceId: 'cgSgspJ2msm6clMCkdW9' },
          firstMessage: 'Hi there, this is Alex from TechSolutions customer support. How can I help you today?'
        });

        console.log(assistant.id);
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python (Server SDK)">
    <Steps>
      <Step title="Install the SDK">
        ```bash
        pip install vapi_server_sdk
        ```
      </Step>

      <Step title="Create the assistant">
        ```python
        import os
        from vapi import Vapi

        client = Vapi(token=os.getenv("VAPI_API_KEY"))

        assistant = client.assistants.create(
            name="Customer Support Assistant",
            model={
                "provider": "openai",
                "model": "gpt-4o",
                "messages": [{"role": "system", "content": "You are Alex, a customer service voice assistant for TechSolutions."}],
            },
            voice={"provider": "11labs", "voiceId": "cgSgspJ2msm6clMCkdW9"},
            first_message="Hi there, this is Alex from TechSolutions customer support. How can I help you today?",
        )

        print(assistant.id)
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="cURL">
    <Steps>
      <Step title="Create the assistant">
        ```bash
        curl -X POST "https://api.vapi.ai/assistant" \
          -H "Authorization: Bearer $VAPI_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{
            "name": "Customer Support Assistant",
            "model": {
              "provider": "openai",
              "model": "gpt-4o",
              "messages": [{ "role": "system", "content": "You are Alex, a customer service voice assistant for TechSolutions." }]
            },
            "voice": { "provider": "11labs", "voiceId": "cgSgspJ2msm6clMCkdW9" },
            "firstMessage": "Hi there, this is Alex from TechSolutions customer support. How can I help you today?"
          }'
        ```
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Set up a phone number

<Tabs>
  <Tab title="Dashboard">
    <Steps>
      <Step title="Create a phone number">
        In the Phone Numbers tab, create a free US phone number or import an existing number from another provider.
        
        <Frame caption="Create a phone number">
          <img src="file:4938e90f-335f-45b7-ae7e-d0ea9af0dab6" />
        </Frame>
        
        <Warning>
          Free Vapi phone numbers are only available for US national use. For international calls, you'll need to import a number from Twilio or another provider.
        </Warning>
      </Step>

      <Step title="Attach your assistant to the number">
        Select your assistant in the inbound settings for your phone number. When this number is called, your assistant will automatically answer.
        
        <Frame>
          <img src="file:175a16f7-5a84-41e8-a88f-297c33dcfd4b" />
        </Frame>
      </Step>
    </Steps>
  </Tab>

  <Tab title="TypeScript (Server SDK)">
    <Steps>
      <Step title="Create a phone number (API)">
        ```typescript
        const res = await fetch('https://api.vapi.ai/phone-number', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            provider: 'vapi',
            assistantId: 'your-assistant-id',
            numberDesiredAreaCode: '415',
          }),
        });
        const phoneNumber = await res.json();
        console.log(phoneNumber.id);
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="Python (Server SDK)">
    <Steps>
      <Step title="Create a phone number (API)">
        ```python
        import os, requests

        res = requests.post(
            "https://api.vapi.ai/phone-number",
            headers={
                "Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}",
                "Content-Type": "application/json",
            },
            json={
                "provider": "vapi",
                "assistantId": "your-assistant-id",
                "numberDesiredAreaCode": "415",
            },
            timeout=30,
        )
        phone_number = res.json()
        print(phone_number["id"])
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="cURL">
    <Steps>
      <Step title="Create a phone number (API)">
        ```bash
        curl -X POST "https://api.vapi.ai/phone-number" \
          -H "Authorization: Bearer $VAPI_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{
            "provider": "vapi",
            "assistantId": "your-assistant-id",
            "numberDesiredAreaCode": "415"
          }'
        ```
      </Step>

      
    </Steps>
  </Tab>
</Tabs>

## Make your first calls

<Steps>
  <Step title="Test inbound calling">
    Call the phone number you just created. Your assistant will pick up and start the conversation with your configured first message.
  </Step>

  <Step title="Place an outbound call">
    <Tabs>
      <Tab title="Dashboard">
        In the dashboard, go to the outbound calls section:
        1. Enter your own phone number as the target
        2. Select your assistant
        3. Click "Make Call"

        <Frame caption="Making an outbound call">
          <img src="file:b1a5f73c-c70b-4e83-82b1-4d1da55d671c" />
        </Frame>
      </Tab>

      <Tab title="TypeScript (Server SDK)">
        ```typescript
        const call = await vapi.calls.create({
          assistant: { assistantId: 'your-assistant-id' },
          phoneNumberId: 'your-phone-number-id',
          customer: { number: '+1234567890' },
        });
        console.log(call.id);
        ```
      </Tab>

      <Tab title="Python (Server SDK)">
        ```python
        call = client.calls.create(
            assistant_id="your-assistant-id",
            phone_number_id="your-phone-number-id",
            customer={"number": "+1234567890"},
        )
        print(call.id)
        ```
      </Tab>

      <Tab title="cURL">
        ```bash
        curl -X POST "https://api.vapi.ai/call" \
          -H "Authorization: Bearer $VAPI_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{
            "assistant": { "assistantId": "your-assistant-id" },
            "phoneNumberId": "your-phone-number-id",
            "customer": { "number": "+1234567890" }
          }'
        ```
      </Tab>
    </Tabs>

    Your assistant will call the specified number immediately.
  </Step>

  <Step title="Test web calling (optional)">
    You can also test your assistant directly in the dashboard by clicking the call button—no phone number required.
    
    <Frame>
      <img src="file:5e8c1fcb-37a1-4cc8-a93e-6959c7115451" />
    </Frame>
  </Step>
</Steps>

## Next steps

Now that you have a working voice assistant:

- **Customize the conversation:** Update the system prompt to match your use case
- **Add tools:** Connect your assistant to external APIs and databases  
- **Configure models:** Try different speech and language models for better performance
- **Scale with APIs:** Use Vapi's REST API to create assistants programmatically

<Tip>
Ready to integrate voice into your application? Check out the [Web integration guide](/quickstart/web-integration) to embed voice calls directly in your app.
</Tip> 


---
title: Web calls
subtitle: >-
  Build voice interfaces and backend integrations using Vapi's Web and Server
  SDKs
slug: quickstart/web
---

## Overview

Build powerful voice applications that work across web browsers, mobile apps, and backend systems. This guide covers both client-side voice interfaces and server-side call management using Vapi's comprehensive SDK ecosystem.

**In this quickstart, you'll learn to:**
- Create real-time voice interfaces for web and mobile
- Build automated outbound and inbound call systems
- Handle events and webhooks for call management
- Implement voice widgets and backend integrations

<Tip>
**Developing locally?** The Vapi CLI makes it easy to initialize projects and test webhooks:

```bash
# Initialize Vapi in your project
vapi init

# Forward webhooks to local server
vapi listen --forward-to localhost:3000/webhook
```

[Learn more about the Vapi CLI →](/cli)
</Tip>

## Choose your integration approach

<CardGroup cols={2}>
  <Card title="Client-Side Voice Interfaces" icon="globe">
    **Best for:** User-facing applications, voice widgets, mobile apps
    - Browser-based voice assistants and widgets
    - Real-time voice conversations
    - Mobile voice applications (iOS, Android, React Native, Flutter)
    - Direct user interaction with assistants
  </Card>
  <Card title="Server-Side Call Management" icon="server">
    **Best for:** Backend automation, bulk operations, system integrations
    - Automated outbound call campaigns
    - Inbound call routing and management
    - CRM integrations and bulk operations
    - Webhook processing and real-time events
  </Card>
</CardGroup>

## Web voice interfaces

Build browser-based voice assistants and widgets for real-time user interaction.

### Installation and setup

<Tabs>
  <Tab title="Web SDK">
    Build browser-based voice interfaces:

    <CodeBlocks>
    ```bash title="npm"
    npm install @vapi-ai/web
    ```

    ```bash title="yarn"
    yarn add @vapi-ai/web
    ```

    ```bash title="pnpm"
    pnpm add @vapi-ai/web
    ```

    ```bash title="bun"
    bun add @vapi-ai/web
    ```
    </CodeBlocks>

    ```typescript
    import Vapi from '@vapi-ai/web';

    const vapi = new Vapi('YOUR_PUBLIC_API_KEY');

    // Start voice conversation
    vapi.start('YOUR_ASSISTANT_ID');

    // Listen for events
    vapi.on('call-start', () => console.log('Call started'));
    vapi.on('call-end', () => console.log('Call ended'));
    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        console.log(`${message.role}: ${message.transcript}`);
      }
    });
    ```
  </Tab>

  <Tab title="React Native">
    Build voice-enabled mobile apps:

    ```bash
    npm install @vapi-ai/react-native
    ```

    ```jsx
    import { VapiProvider, useVapi } from '@vapi-ai/react-native';

    const VoiceApp = () => {
      const { start, stop, isConnected } = useVapi();

      return (
        <View>
          <Button
            title={isConnected ? "End Call" : "Start Call"}
            onPress={() => isConnected ? stop() : start('ASSISTANT_ID')}
          />
        </View>
      );
    };

    export default () => (
      <VapiProvider apiKey="YOUR_PUBLIC_API_KEY">
        <VoiceApp />
      </VapiProvider>
    );
    ```
  </Tab>

  <Tab title="Flutter">
    Create voice apps with Flutter:

    ```yaml
    dependencies:
      vapi_flutter: ^1.0.0
    ```

    ```dart
    import 'package:vapi_flutter/vapi_flutter.dart';

    class VoiceWidget extends StatefulWidget {
      @override
      _VoiceWidgetState createState() => _VoiceWidgetState();
    }

    class _VoiceWidgetState extends State<VoiceWidget> {
      final VapiClient _vapi = VapiClient('YOUR_PUBLIC_API_KEY');
      bool _isConnected = false;

      @override
      Widget build(BuildContext context) {
        return ElevatedButton(
          onPressed: () {
            if (_isConnected) {
              _vapi.stop();
            } else {
              _vapi.start('YOUR_ASSISTANT_ID');
            }
          },
          child: Text(_isConnected ? 'End Call' : 'Start Call'),
        );
      }
    }
    ```
  </Tab>

  <Tab title="iOS">
    Build native iOS voice apps:

    ```swift
    import VapiSDK

    class VoiceViewController: UIViewController {
        private let vapi = VapiClient(apiKey: "YOUR_PUBLIC_API_KEY")
        
        @IBAction func startCallTapped(_ sender: UIButton) {
            vapi.start(assistantId: "YOUR_ASSISTANT_ID")
        }
        
        override func viewDidLoad() {
            super.viewDidLoad()
            vapi.delegate = self
        }
    }

    extension VoiceViewController: VapiClientDelegate {
        func vapiCallDidStart() {
            print("Call started")
        }
        
        func vapiCallDidEnd() {
            print("Call ended")
        }
    }
    ```
  </Tab>
</Tabs>

### Voice widget implementation

Create a voice widget for your website:

<Tabs>
  <Tab title="HTML Script Tag">
    The fastest way to get started. Copy this snippet into your website:

    ```html
    <script>
      var vapiInstance = null;
      const assistant = "assistant_id"; // Substitute with your assistant ID
      const apiKey = "your_public_api_key"; // Substitute with your Public key from Vapi Dashboard.
      const buttonConfig = {}; // Modify this as required

      (function (d, t) {
        var g = document.createElement(t),
          s = d.getElementsByTagName(t)[0];
        g.src =
          "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
        g.defer = true;
        g.async = true;
        s.parentNode.insertBefore(g, s);

        g.onload = function () {
          vapiInstance = window.vapiSDK.run({
            apiKey: apiKey, // mandatory
            assistant: assistant, // mandatory
            config: buttonConfig, // optional
          });
        };
      })(document, "script");
    </script>
    ```
  </Tab>

  <Tab title="React/TypeScript">
    Build a complete React voice widget:

    ```tsx
    import React, { useState, useEffect } from 'react';
    import Vapi from '@vapi-ai/web';

    interface VapiWidgetProps {
      apiKey: string;
      assistantId: string;
      config?: Record<string, unknown>;
    }

    const VapiWidget: React.FC<VapiWidgetProps> = ({ 
      apiKey, 
      assistantId, 
      config = {} 
    }) => {
      const [vapi, setVapi] = useState<Vapi | null>(null);
      const [isConnected, setIsConnected] = useState(false);
      const [isSpeaking, setIsSpeaking] = useState(false);
      const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);

      useEffect(() => {
        const vapiInstance = new Vapi(apiKey);
        setVapi(vapiInstance);

        // Event listeners
        vapiInstance.on('call-start', () => {
          console.log('Call started');
          setIsConnected(true);
        });

        vapiInstance.on('call-end', () => {
          console.log('Call ended');
          setIsConnected(false);
          setIsSpeaking(false);
        });

        vapiInstance.on('speech-start', () => {
          console.log('Assistant started speaking');
          setIsSpeaking(true);
        });

        vapiInstance.on('speech-end', () => {
          console.log('Assistant stopped speaking');
          setIsSpeaking(false);
        });

        vapiInstance.on('message', (message) => {
          if (message.type === 'transcript') {
            setTranscript(prev => [...prev, {
              role: message.role,
              text: message.transcript
            }]);
          }
        });

        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
        });

        return () => {
          vapiInstance?.stop();
        };
      }, [apiKey]);

      const startCall = () => {
        if (vapi) {
          vapi.start(assistantId);
        }
      };

      const endCall = () => {
        if (vapi) {
          vapi.stop();
        }
      };

      return (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1000,
          fontFamily: 'Arial, sans-serif'
        }}>
          {!isConnected ? (
            <button
              onClick={startCall}
              style={{
                background: '#12A594',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(18, 165, 148, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(18, 165, 148, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 165, 148, 0.3)';
              }}
            >
              🎤 Talk to Assistant
            </button>
          ) : (
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '20px',
              width: '320px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              border: '1px solid #e1e5e9'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isSpeaking ? '#ff4444' : '#12A594',
                    animation: isSpeaking ? 'pulse 1s infinite' : 'none'
                  }}></div>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>
                    {isSpeaking ? 'Assistant Speaking...' : 'Listening...'}
                  </span>
                </div>
                <button
                  onClick={endCall}
                  style={{
                    background: '#ff4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  End Call
                </button>
              </div>
              
              <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                marginBottom: '12px',
                padding: '8px',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                {transcript.length === 0 ? (
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                    Conversation will appear here...
                  </p>
                ) : (
                  transcript.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        marginBottom: '8px',
                        textAlign: msg.role === 'user' ? 'right' : 'left'
                      }}
                    >
                      <span style={{
                        background: msg.role === 'user' ? '#12A594' : '#333',
                        color: '#fff',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        display: 'inline-block',
                        fontSize: '14px',
                        maxWidth: '80%'
                      }}>
                        {msg.text}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          <style>{`
            @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `}</style>
        </div>
      );
    };

    export default VapiWidget;

    // Usage in your app:
    // <VapiWidget 
    //   apiKey="your_public_api_key" 
    //   assistantId="your_assistant_id" 
    // />
    ```
  </Tab>
</Tabs>

## Server-side call management

Automate outbound calls and handle inbound call processing with server-side SDKs.

### Installation and setup

<Tabs>
  <Tab title="TypeScript">
    Install the TypeScript Server SDK:

    <CodeBlocks>
    ```bash title="npm"
    npm install @vapi-ai/server-sdk
    ```

    ```bash title="yarn"
    yarn add @vapi-ai/server-sdk
    ```

    ```bash title="pnpm"
    pnpm add @vapi-ai/server-sdk
    ```

    ```bash title="bun"
    bun add @vapi-ai/server-sdk
    ```
    </CodeBlocks>

    ```typescript
    import { VapiClient } from "@vapi-ai/server-sdk";

    const vapi = new VapiClient({
      token: process.env.VAPI_API_KEY!
    });

    // Create an outbound call
    const call = await vapi.calls.create({
      phoneNumberId: "YOUR_PHONE_NUMBER_ID",
      customer: { number: "+1234567890" },
      assistantId: "YOUR_ASSISTANT_ID"
    });

    console.log(`Call created: ${call.id}`);
    ```
  </Tab>

  <Tab title="Python">
    Install the Python Server SDK:

    ```bash
    pip install vapi_server_sdk
    ```

    ```python
    from vapi import Vapi

    vapi = Vapi(token=os.getenv("VAPI_API_KEY"))

    # Create an outbound call
    call = vapi.calls.create(
        phone_number_id="YOUR_PHONE_NUMBER_ID",
        customer={"number": "+1234567890"},
        assistant_id="YOUR_ASSISTANT_ID"
    )

    print(f"Call created: {call.id}")
    ```
  </Tab>

  <Tab title="Java">
    Add the Java SDK to your project:

    ```xml
    <dependency>
        <groupId>ai.vapi</groupId>
        <artifactId>server-sdk</artifactId>
        <version>1.0.0</version>
    </dependency>
    ```

    ```java
    import ai.vapi.VapiClient;
    import ai.vapi.models.Call;

    VapiClient vapi = VapiClient.builder()
        .apiKey(System.getenv("VAPI_API_KEY"))
        .build();

    // Create an outbound call
    Call call = vapi.calls().create(CreateCallRequest.builder()
        .phoneNumberId("YOUR_PHONE_NUMBER_ID")
        .customer(Customer.builder().number("+1234567890").build())
        .assistantId("YOUR_ASSISTANT_ID")
        .build());

    System.out.println("Call created: " + call.getId());
    ```
  </Tab>

  <Tab title="Ruby">
    Install the Ruby Server SDK:

    ```bash
    gem install vapi-server-sdk
    ```

    ```ruby
    require 'vapi'

    vapi = Vapi::Client.new(api_key: ENV['VAPI_API_KEY'])

    # Create an outbound call
    call = vapi.calls.create(
      phone_number_id: "YOUR_PHONE_NUMBER_ID",
      customer: { number: "+1234567890" },
      assistant_id: "YOUR_ASSISTANT_ID"
    )

    puts "Call created: #{call.id}"
    ```
  </Tab>

  <Tab title="C#">
    Install the C# Server SDK:

    ```bash
    dotnet add package Vapi.ServerSDK
    ```

    ```csharp
    using Vapi;

    var vapi = new VapiClient(Environment.GetEnvironmentVariable("VAPI_API_KEY"));

    // Create an outbound call
    var call = await vapi.Calls.CreateAsync(new CreateCallRequest
    {
        PhoneNumberId = "YOUR_PHONE_NUMBER_ID",
        Customer = new Customer { Number = "+1234567890" },
        AssistantId = "YOUR_ASSISTANT_ID"
    });

    Console.WriteLine($"Call created: {call.Id}");
    ```
  </Tab>

  <Tab title="Go">
    Install the Go Server SDK:

    ```bash
    go get github.com/VapiAI/server-sdk-go
    ```

    ```go
    package main

    import (
        "fmt"
        "os"
        "github.com/VapiAI/server-sdk-go"
    )

    func main() {
        client := vapi.NewClient(os.Getenv("VAPI_API_KEY"))

        // Create an outbound call
        call, err := client.Calls.Create(&vapi.CreateCallRequest{
            PhoneNumberID: "YOUR_PHONE_NUMBER_ID",
            Customer: &vapi.Customer{
                Number: "+1234567890",
            },
            AssistantID: "YOUR_ASSISTANT_ID",
        })

        if err != nil {
            panic(err)
        }

        fmt.Printf("Call created: %s\n", call.ID)
    }
    ```
  </Tab>
</Tabs>

### Creating assistants

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    const assistant = await vapi.assistants.create({
      name: "Sales Assistant",
      firstMessage: "Hi! I'm calling about your interest in our software solutions.",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        messages: [{
          role: "system",
          content: "You are a friendly sales representative. Keep responses under 30 words."
        }]
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    });
    ```
  </Tab>

  <Tab title="Python">
    ```python
    assistant = vapi.assistants.create(
        name="Sales Assistant",
        first_message="Hi! I'm calling about your interest in our software solutions.",
        model={
            "provider": "openai",
            "model": "gpt-4o",
            "temperature": 0.7,
            "messages": [{
                "role": "system",
                "content": "You are a friendly sales representative. Keep responses under 30 words."
            }]
        },
        voice={
            "provider": "11labs",
            "voiceId": "21m00Tcm4TlvDq8ikWAM"
        }
    )
    ```
  </Tab>

  <Tab title="Java">
    ```java
    Assistant assistant = vapi.assistants().create(CreateAssistantRequest.builder()
        .name("Sales Assistant")
        .firstMessage("Hi! I'm calling about your interest in our software solutions.")
        .model(Model.builder()
            .provider("openai")
            .model("gpt-4o")
            .temperature(0.7)
            .messages(List.of(Message.builder()
                .role("system")
                .content("You are a friendly sales representative. Keep responses under 30 words.")
                .build()))
            .build())
        .voice(Voice.builder()
            .provider("11labs")
            .voiceId("21m00Tcm4TlvDq8ikWAM")
            .build())
        .build());
    ```
  </Tab>

  <Tab title="Ruby">
    ```ruby
    assistant = vapi.assistants.create(
      name: "Sales Assistant",
      first_message: "Hi! I'm calling about your interest in our software solutions.",
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        messages: [{
          role: "system",
          content: "You are a friendly sales representative. Keep responses under 30 words."
        }]
      },
      voice: {
        provider: "11labs",
        voiceId: "21m00Tcm4TlvDq8ikWAM"
      }
    )
    ```
  </Tab>

  <Tab title="C#">
    ```csharp
    var assistant = await vapi.Assistants.CreateAsync(new CreateAssistantRequest
    {
        Name = "Sales Assistant",
        FirstMessage = "Hi! I'm calling about your interest in our software solutions.",
        Model = new Model
        {
            Provider = "openai",
            ModelName = "gpt-4o",
            Temperature = 0.7,
            Messages = new List<Message>
            {
                new Message
                {
                    Role = "system",
                    Content = "You are a friendly sales representative. Keep responses under 30 words."
                }
            }
        },
        Voice = new Voice
        {
            Provider = "11labs",
            VoiceId = "21m00Tcm4TlvDq8ikWAM"
        }
    });
    ```
  </Tab>

  <Tab title="Go">
    ```go
    assistant, err := client.Assistants.Create(&vapi.CreateAssistantRequest{
        Name:         "Sales Assistant",
        FirstMessage: "Hi! I'm calling about your interest in our software solutions.",
        Model: &vapi.Model{
            Provider:    "openai",
            Model:       "gpt-4o",
            Temperature: 0.7,
            Messages: []vapi.Message{
                {
                    Role:    "system",
                    Content: "You are a friendly sales representative. Keep responses under 30 words.",
                },
            },
        },
        Voice: &vapi.Voice{
            Provider: "11labs",
            VoiceID:  "21m00Tcm4TlvDq8ikWAM",
        },
    })
    ```
  </Tab>
</Tabs>

### Bulk operations

Run automated call campaigns for sales, surveys, or notifications:

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    async function runBulkCallCampaign(assistantId: string, phoneNumberId: string) {
      const prospects = [
        { number: "+1234567890", name: "John Smith" },
        { number: "+1234567891", name: "Jane Doe" },
        // ... more prospects
      ];

      const calls = [];
      for (const prospect of prospects) {
        const call = await vapi.calls.create({
          assistantId,
          phoneNumberId,
          customer: prospect,
          metadata: { campaign: "Q1_Sales" }
        });
        calls.push(call);

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      return calls;
    }
    ```
  </Tab>

  <Tab title="Python">
    ```python
    import time

    def run_bulk_call_campaign(assistant_id: str, phone_number_id: str):
        prospects = [
            {"number": "+1234567890", "name": "John Smith"},
            {"number": "+1234567891", "name": "Jane Doe"},
            # ... more prospects
        ]

        calls = []
        for prospect in prospects:
            call = vapi.calls.create(
                assistant_id=assistant_id,
                phone_number_id=phone_number_id,
                customer=prospect,
                metadata={"campaign": "Q1_Sales"}
            )
            calls.append(call)

            # Rate limiting
            time.sleep(2)

        return calls
    ```
  </Tab>

  <Tab title="Java">
    ```java
    public List<Call> runBulkCallCampaign(String assistantId, String phoneNumberId) {
        List<Customer> prospects = Arrays.asList(
            Customer.builder().number("+1234567890").name("John Smith").build(),
            Customer.builder().number("+1234567891").name("Jane Doe").build()
            // ... more prospects
        );

        List<Call> calls = new ArrayList<>();
        for (Customer prospect : prospects) {
            Call call = vapi.calls().create(CreateCallRequest.builder()
                .assistantId(assistantId)
                .phoneNumberId(phoneNumberId)
                .customer(prospect)
                .metadata(Map.of("campaign", "Q1_Sales"))
                .build());
            calls.add(call);

            // Rate limiting
            Thread.sleep(2000);
        }

        return calls;
    }
    ```
  </Tab>

  <Tab title="Ruby">
    ```ruby
    def run_bulk_call_campaign(assistant_id, phone_number_id)
      prospects = [
        { number: "+1234567890", name: "John Smith" },
        { number: "+1234567891", name: "Jane Doe" },
        # ... more prospects
      ]

      calls = []
      prospects.each do |prospect|
        call = vapi.calls.create(
          assistant_id: assistant_id,
          phone_number_id: phone_number_id,
          customer: prospect,
          metadata: { campaign: "Q1_Sales" }
        )
        calls << call

        # Rate limiting
        sleep(2)
      end

      calls
    end
    ```
  </Tab>

  <Tab title="C#">
    ```csharp
    public async Task<List<Call>> RunBulkCallCampaign(string assistantId, string phoneNumberId)
    {
        var prospects = new List<Customer>
        {
            new Customer { Number = "+1234567890", Name = "John Smith" },
            new Customer { Number = "+1234567891", Name = "Jane Doe" },
            // ... more prospects
        };

        var calls = new List<Call>();
        foreach (var prospect in prospects)
        {
            var call = await vapi.Calls.CreateAsync(new CreateCallRequest
            {
                AssistantId = assistantId,
                PhoneNumberId = phoneNumberId,
                Customer = prospect,
                Metadata = new Dictionary<string, object> { ["campaign"] = "Q1_Sales" }
            });
            calls.Add(call);

            // Rate limiting
            await Task.Delay(2000);
        }

        return calls;
    }
    ```
  </Tab>

  <Tab title="Go">
    ```go
    func runBulkCallCampaign(client *vapi.Client, assistantID, phoneNumberID string) ([]*vapi.Call, error) {
        prospects := []*vapi.Customer{
            {Number: "+1234567890", Name: "John Smith"},
            {Number: "+1234567891", Name: "Jane Doe"},
            // ... more prospects
        }

        var calls []*vapi.Call
        for _, prospect := range prospects {
            call, err := client.Calls.Create(&vapi.CreateCallRequest{
                AssistantID:   assistantID,
                PhoneNumberID: phoneNumberID,
                Customer:      prospect,
                Metadata:      map[string]interface{}{"campaign": "Q1_Sales"},
            })
            if err != nil {
                return nil, err
            }
            calls = append(calls, call)

            // Rate limiting
            time.Sleep(2 * time.Second)
        }

        return calls, nil
    }
    ```
  </Tab>
</Tabs>

## Webhook integration

Handle real-time events for both client and server applications:

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    import express from 'express';

    const app = express();
    app.use(express.json());

    app.post('/webhook/vapi', async (req, res) => {
      const { message } = req.body;

      switch (message.type) {
        case 'status-update':
          console.log(`Call ${message.call.id}: ${message.call.status}`);
          break;
        case 'transcript':
          console.log(`${message.role}: ${message.transcript}`);
          break;
        case 'function-call':
          return handleFunctionCall(message, res);
      }

      res.status(200).json({ received: true });
    });

    function handleFunctionCall(message: any, res: express.Response) {
      const { functionCall } = message;
      
      switch (functionCall.name) {
        case 'lookup_order':
          const orderData = { orderId: functionCall.parameters.orderId, status: 'shipped' };
          return res.json({ result: orderData });
        default:
          return res.status(400).json({ error: 'Unknown function' });
      }
    }

    app.listen(3000, () => console.log('Webhook server running on port 3000'));
    ```
  </Tab>

  <Tab title="Python">
    ```python
    from flask import Flask, request, jsonify

    app = Flask(__name__)

    @app.route('/webhook/vapi', methods=['POST'])
    def handle_vapi_webhook():
        payload = request.get_json()
        message = payload.get('message', {})
        
        if message.get('type') == 'status-update':
            call = message.get('call', {})
            print(f"Call {call.get('id')}: {call.get('status')}")
            
        elif message.get('type') == 'transcript':
            print(f"{message.get('role')}: {message.get('transcript')}")
            
        elif message.get('type') == 'function-call':
            return handle_function_call(message)
        
        return jsonify({"received": True}), 200

    def handle_function_call(message):
        function_call = message.get('functionCall', {})
        function_name = function_call.get('name')
        
        if function_name == 'lookup_order':
            order_data = {
                "orderId": function_call.get('parameters', {}).get('orderId'),
                "status": "shipped"
            }
            return jsonify({"result": order_data})
        
        return jsonify({"error": "Unknown function"}), 400

    if __name__ == '__main__':
        app.run(port=5000)
    ```
  </Tab>

  <Tab title="Java">
    ```java
    @RestController
    @RequestMapping("/webhook")
    public class VapiWebhookController {

        @PostMapping("/vapi")
        public ResponseEntity<?> handleVapiWebhook(@RequestBody Map<String, Object> payload) {
            Map<String, Object> message = (Map<String, Object>) payload.get("message");
            String type = (String) message.get("type");

            switch (type) {
                case "status-update":
                    Map<String, Object> call = (Map<String, Object>) message.get("call");
                    System.out.println("Call " + call.get("id") + ": " + call.get("status"));
                    break;
                case "transcript":
                    System.out.println(message.get("role") + ": " + message.get("transcript"));
                    break;
                case "function-call":
                    return handleFunctionCall(message);
            }

            return ResponseEntity.ok(Map.of("received", true));
        }

        private ResponseEntity<?> handleFunctionCall(Map<String, Object> message) {
            Map<String, Object> functionCall = (Map<String, Object>) message.get("functionCall");
            String functionName = (String) functionCall.get("name");

            if ("lookup_order".equals(functionName)) {
                Map<String, Object> parameters = (Map<String, Object>) functionCall.get("parameters");
                Map<String, Object> orderData = Map.of(
                    "orderId", parameters.get("orderId"),
                    "status", "shipped"
                );
                return ResponseEntity.ok(Map.of("result", orderData));
            }

            return ResponseEntity.badRequest().body(Map.of("error", "Unknown function"));
        }
    }
    ```
  </Tab>

  <Tab title="Ruby">
    ```ruby
    require 'sinatra'
    require 'json'

    post '/webhook/vapi' do
      payload = JSON.parse(request.body.read)
      message = payload['message']

      case message['type']
      when 'status-update'
        call = message['call']
        puts "Call #{call['id']}: #{call['status']}"
      when 'transcript'
        puts "#{message['role']}: #{message['transcript']}"
      when 'function-call'
        return handle_function_call(message)
      end

      content_type :json
      { received: true }.to_json
    end

    def handle_function_call(message)
      function_call = message['functionCall']
      function_name = function_call['name']

      case function_name
      when 'lookup_order'
        order_data = {
          orderId: function_call['parameters']['orderId'],
          status: 'shipped'
        }
        content_type :json
        { result: order_data }.to_json
      else
        status 400
        content_type :json
        { error: 'Unknown function' }.to_json
      end
    end
    ```
  </Tab>

  <Tab title="C#">
    ```csharp
    [ApiController]
    [Route("webhook")]
    public class VapiWebhookController : ControllerBase
    {
        [HttpPost("vapi")]
        public IActionResult HandleVapiWebhook([FromBody] WebhookPayload payload)
        {
            var message = payload.Message;

            switch (message.Type)
            {
                case "status-update":
                    Console.WriteLine($"Call {message.Call.Id}: {message.Call.Status}");
                    break;
                case "transcript":
                    Console.WriteLine($"{message.Role}: {message.Transcript}");
                    break;
                case "function-call":
                    return HandleFunctionCall(message);
            }

            return Ok(new { received = true });
        }

        private IActionResult HandleFunctionCall(WebhookMessage message)
        {
            var functionCall = message.FunctionCall;

            switch (functionCall.Name)
            {
                case "lookup_order":
                    var orderData = new
                    {
                        orderId = functionCall.Parameters["orderId"],
                        status = "shipped"
                    };
                    return Ok(new { result = orderData });
                default:
                    return BadRequest(new { error = "Unknown function" });
            }
        }
    }
    ```
  </Tab>

  <Tab title="Go">
    ```go
    package main

    import (
        "encoding/json"
        "fmt"
        "net/http"
    )

    type WebhookPayload struct {
        Message WebhookMessage `json:"message"`
    }

    type WebhookMessage struct {
        Type         string                 `json:"type"`
        Call         *Call                  `json:"call,omitempty"`
        Role         string                 `json:"role,omitempty"`
        Transcript   string                 `json:"transcript,omitempty"`
        FunctionCall *FunctionCall          `json:"functionCall,omitempty"`
    }

    func handleVapiWebhook(w http.ResponseWriter, r *http.Request) {
        var payload WebhookPayload
        if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }

        message := payload.Message

        switch message.Type {
        case "status-update":
            fmt.Printf("Call %s: %s\n", message.Call.ID, message.Call.Status)
        case "transcript":
            fmt.Printf("%s: %s\n", message.Role, message.Transcript)
        case "function-call":
            handleFunctionCall(w, message)
            return
        }

        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(map[string]bool{"received": true})
    }

    func handleFunctionCall(w http.ResponseWriter, message WebhookMessage) {
        functionCall := message.FunctionCall

        switch functionCall.Name {
        case "lookup_order":
            orderData := map[string]interface{}{
                "orderId": functionCall.Parameters["orderId"],
                "status":  "shipped",
            }
            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(map[string]interface{}{"result": orderData})
        default:
            http.Error(w, `{"error": "Unknown function"}`, http.StatusBadRequest)
        }
    }

    func main() {
        http.HandleFunc("/webhook/vapi", handleVapiWebhook)
        fmt.Println("Webhook server running on port 8080")
        http.ListenAndServe(":8080", nil)
    }
    ```
  </Tab>
</Tabs>

## Next steps

Now that you understand both client and server SDK capabilities:

- **Explore use cases:** Check out our [examples section](/assistants/examples/inbound-support) for complete implementations
- **Add tools:** Connect your voice agents to external APIs and databases with [custom tools](/tools/custom-tools)
- **Configure models:** Try different [speech and language models](/assistants/speech-configuration) for better performance
- **Scale with squads:** Use [Squads](/squads) for multi-assistant setups and complex processes

## Resources

**Client SDKs:**
- [Web SDK GitHub](https://github.com/VapiAI/web)
- [React Native SDK GitHub](https://github.com/VapiAI/react-native)
- [Flutter SDK GitHub](https://github.com/VapiAI/flutter)
- [iOS SDK GitHub](https://github.com/VapiAI/ios)
- [Python Client GitHub](https://github.com/VapiAI/python)

**Server SDKs:**
- [TypeScript SDK GitHub](https://github.com/VapiAI/server-sdk-typescript)
- [Python SDK GitHub](https://github.com/VapiAI/server-sdk-python)
- [Java SDK GitHub](https://github.com/VapiAI/server-sdk-java)
- [Ruby SDK GitHub](https://github.com/VapiAI/server-sdk-ruby)
- [C# SDK GitHub](https://github.com/VapiAI/server-sdk-csharp)
- [Go SDK GitHub](https://github.com/VapiAI/server-sdk-go)

**Documentation:**
- [API Reference](/api-reference)
- [Discord Community](https://discord.gg/pUFNcf2WmH) 

---
title: Guides
subtitle: >-
  Explore real-world, cloneable examples to build voice agents with Assistants
  and Squads
slug: guides
---

<Frame>
  <img src="file:138ddf79-a0b6-4e62-8838-b3c6baedeaf5" alt="Vapi Guides" />
</Frame>

<CardGroup cols={2}>
  <Card title="Appointment Scheduling" icon="calendar-check" href="/assistants/examples/appointment-scheduling">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Build an appointment scheduling assistant that can schedule appointments for a barbershop
  </Card>
  <Card title="Medical Triage & Scheduling" icon="stethoscope" href="/squads/examples/clinic-triage-scheduling">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-squad">Built with Squads</div>
    <br />
    Build a medical triage and scheduling assistant that can triage patients and schedule appointments for a clinic
  </Card>
  <Card title="Ecommerce Order Management" icon="shopping-cart" href="/squads/examples/ecommerce-order-management">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-squad">Built with Squads</div>
    <br />
    Build an ecommerce order management assistant that can track orders and process returns
  </Card>
  <Card title="Property Management" icon="building" href="/squads/examples/property-management">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-squad">Built with Squads</div>
    <br />
    Build a call routing workflow that dynamically routes tenant calls based on verification and inquiry type
  </Card>
  <Card title="Lead Qualification" icon="phone" href="/assistants/examples/lead-qualification">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Create an outbound sales agent that can schedule appointments automatically
  </Card>
    <Card title="Multilingual Support (Structured)" icon="globe" href="/squads/examples/multilingual-support">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-squad">Built with Squads</div>
    <br />
    Build a structured multilingual support workflow with language selection and dedicated conversation paths
  </Card>
  <Card title="Dynamic Multilingual Agent" icon="language" href="/assistants/examples/multilingual-agent">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Build a dynamic agent with automatic language detection and real-time language switching
  </Card>
  <Card title="Support Escalation" icon="headset" href="/assistants/examples/support-escalation">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Build an intelligent support escalation system with dynamic routing based on customer tier and issue complexity
  </Card>
  <Card title="Docs Agent" icon="book-open" href="/assistants/examples/docs-agent">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Build a docs agent that can answer questions about your documentation
  </Card>
  <Card title="Inbound Support" icon="headset" href="/assistants/examples/inbound-support">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Build a technical support assistant that remembers where you left off between calls
  </Card>
  <Card title="Voice Widget" icon="microphone" href="/assistants/examples/voice-widget">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge vapi-badge-assistant">Built with Assistants</div>
    <br />
    Easily integrate the Vapi Voice Widget into your website for enhanced user interaction
  </Card>
  <Card title="Vapi CLI" icon="terminal" href="/cli">
    <div className='absolute top-4 right-4'>
      <Icon icon="arrow-up-right-from-square" />
    </div>
    <div class="vapi-badge" style="background-color: #0e0e13; color: #12a594;">Developer Tool</div>
    <br />
    Build voice AI agents faster with the Vapi CLI - project integration, local testing, and IDE enhancement
  </Card>

</CardGroup>

---
title: Vapi CLI
description: Command-line interface for building voice AI applications faster
slug: cli
---

## Overview

The Vapi CLI is the official command-line interface that brings world-class developer experience to your terminal and IDE. Build, test, and deploy voice AI applications without leaving your development environment.

**In this guide, you'll learn to:**
- Install and authenticate with the Vapi CLI
- Initialize Vapi in existing projects
- Manage assistants, phone numbers, and workflows from your terminal
- Forward webhooks to your local development server
- Turn your IDE into a Vapi expert with MCP integration

## Installation

Install the Vapi CLI in seconds with our automated scripts:

<Tabs>
  <Tab title="macOS/Linux">
    ```bash
    curl -sSL https://vapi.ai/install.sh | bash
    ```
  </Tab>
  <Tab title="Windows">
    ```powershell
    iex ((New-Object System.Net.WebClient).DownloadString('https://vapi.ai/install.ps1'))
    ```
  </Tab>
  <Tab title="Docker">
    ```bash
    docker run -it ghcr.io/vapiai/cli:latest --help
    ```
  </Tab>
</Tabs>

## Quick start

<Steps>
  <Step title="Authenticate">
    Connect your Vapi account:
    ```bash
    vapi login
    ```
    This opens your browser for secure OAuth authentication.
  </Step>
  
  <Step title="Initialize your project">
    Add Vapi to an existing project:
    ```bash
    vapi init
    ```
    The CLI auto-detects your tech stack and sets up everything you need.
  </Step>
  
  <Step title="Create your first assistant">
    Build a voice assistant:
    ```bash
    vapi assistant create
    ```
    Follow the interactive prompts to configure your assistant.
  </Step>
</Steps>

## Key features

### 🚀 Project integration

Drop Vapi into any existing codebase with intelligent auto-detection:

```bash
vapi init
# Detected: Next.js application
# ✓ Installed @vapi-ai/web SDK
# ✓ Generated components/VapiButton.tsx
# ✓ Created pages/api/vapi/webhook.ts
# ✓ Added environment template
```

Supports React, Vue, Next.js, Python, Go, Flutter, React Native, and dozens more frameworks.

### 🤖 MCP integration

Turn your IDE into a Vapi expert with Model Context Protocol:

```bash
vapi mcp setup
```

Your IDE's AI assistant (Cursor, Windsurf, VSCode) gains complete, accurate knowledge of Vapi's APIs and best practices. No more hallucinated code or outdated examples.

### 🔗 Local webhook testing

Forward webhooks to your local server for debugging:

```bash
# Terminal 1: Create tunnel (e.g., with ngrok)
ngrok http 4242

# Terminal 2: Forward webhooks
vapi listen --forward-to localhost:3000/webhook
```

<Note>
**Important:** `vapi listen` is a local forwarder only - it does NOT provide a public URL. You need a separate tunneling service (like ngrok) to expose the CLI's port to the internet. Update your webhook URLs in Vapi to use the tunnel's public URL.
</Note>

### 🔐 Multi-account management

Switch between organizations and environments seamlessly:

```bash
# List all authenticated accounts
vapi auth status

# Switch between accounts
vapi auth switch production

# Add another account
vapi auth login
```

### 📱 Complete feature parity

Everything you can do in the dashboard, now in your terminal:

- **Assistants**: Create, update, list, and delete voice assistants
- **Phone numbers**: Purchase, configure, and manage phone numbers
- **Calls**: Make outbound calls and view call history
- **Workflows**: Manage conversation flows (visual editing in dashboard)
- **Campaigns**: Create and manage AI phone campaigns at scale
- **Tools**: Configure custom functions and integrations
- **Webhooks**: Set up and test event delivery
- **Logs**: View system logs, call logs, and debug issues

## Common commands

<AccordionGroup>
  <Accordion title="Assistant management">
    ```bash
    # List all assistants
    vapi assistant list
    
    # Create a new assistant
    vapi assistant create
    
    # Get assistant details
    vapi assistant get <assistant-id>
    
    # Update an assistant
    vapi assistant update <assistant-id>
    
    # Delete an assistant
    vapi assistant delete <assistant-id>
    ```
  </Accordion>
  
  <Accordion title="Phone number management">
    ```bash
    # List your phone numbers
    vapi phone list
    
    # Purchase a new number
    vapi phone create
    
    # Update number configuration
    vapi phone update <phone-number-id>
    
    # Release a number
    vapi phone delete <phone-number-id>
    ```
  </Accordion>
  
  <Accordion title="Call operations">
    ```bash
    # List recent calls
    vapi call list
    
    # Make an outbound call
    vapi call create
    
    # Get call details
    vapi call get <call-id>
    
    # End an active call
    vapi call end <call-id>
    ```
  </Accordion>
  
  <Accordion title="Debugging and logs">
    ```bash
    # View system logs
    vapi logs list
    
    # View call-specific logs
    vapi logs calls <call-id>
    
    # View error logs
    vapi logs errors
    
    # View webhook logs
    vapi logs webhooks
    ```
  </Accordion>
</AccordionGroup>

## Configuration

The CLI stores configuration in `~/.vapi-cli.yaml`. You can also use environment variables:

```bash
# Set API key via environment
export VAPI_API_KEY=your-api-key

# View current configuration
vapi config get

# Update configuration
vapi config set <key> <value>

# Manage analytics preferences
vapi config analytics disable
```

## Auto-updates

The CLI automatically checks for updates and notifies you when new versions are available:

```bash
# Check for updates manually
vapi update check

# Update to latest version
vapi update
```

## Next steps

Now that you have the Vapi CLI installed:

- **[Initialize a project](/cli/init):** Add Vapi to your existing codebase
- **[Set up MCP](/cli/mcp):** Enhance your IDE with Vapi intelligence
- **[Test webhooks locally](/cli/webhook):** Debug webhooks with tunneling services
- **[Manage authentication](/cli/auth):** Work with multiple accounts

---

**Resources:**
- [GitHub Repository](https://github.com/VapiAI/cli)
- [Report Issues](https://github.com/VapiAI/cli/issues)
- [Discord Community](https://discord.gg/vapi) 

---
title: Assistants quickstart
subtitle: Build your first assistant and make a phone call in minutes
slug: assistants/quickstart
---

## Overview

Create a voice assistant with a simple prompt, attach a phone number, and make your first call. You’ll also learn how to add tools to take real actions.

**In this quickstart, you’ll:**
- Create an assistant (Dashboard or SDK)
- Attach a phone number
- Make inbound and outbound calls

## Prerequisites

- A Vapi account and API key

## 1) Create an assistant

<Tabs>
  <Tab title="Dashboard">
    <Steps>
      <Step title="Open Assistants">
        Go to the [Vapi Dashboard](https://dashboard.vapi.ai) → Assistants → Create Assistant.
      </Step>
      <Step title="Add a system prompt">
        ```txt title="System Prompt" maxLines=8
        You are a friendly phone support assistant. Greet the caller and offer help. Keep responses under 30 words. If a transfer is requested, confirm reason first.
        ```
      </Step>
      <Step title="Publish and test">
        Click Publish and then “Talk to Assistant” to validate behavior.
      </Step>
    </Steps>
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    import { VapiClient } from "@vapi-ai/server-sdk";

    const vapi = new VapiClient({ token: process.env.VAPI_API_KEY! });

    const assistant = await vapi.assistants.create({
      name: "Support Assistant",
      firstMessage: "Hello! How can I help you today?",
      model: {
        provider: "openai",
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a friendly phone support assistant. Keep responses under 30 words." }
        ]
      }
    });
    ```
  </Tab>
</Tabs>

## 2) Add a phone number

<Tabs>
  <Tab title="Dashboard">
    In the Dashboard, go to Phone Numbers → Create Phone Number → assign your assistant.
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    const number = await vapi.phoneNumbers.create({
      name: "Support Line",
      assistantId: assistant.id
    });
    ```
  </Tab>
</Tabs>

## 3) Make your first calls

<Steps>
  <Step title="Inbound call">
    Call the phone number you created. Your assistant will answer with the first message.
  </Step>
  <Step title="Outbound call (SDK)">
    ```typescript
    await vapi.calls.create({
      assistantId: assistant.id,
      customer: { number: "+1234567890" }
    });
    ```
  </Step>
</Steps>

## Next steps

- **Add tools**: [Custom tools](/tools/custom-tools)
- **Tune speech**: [Speech configuration](/customization/speech-configuration)
- **Structure data**: [Structured outputs](/assistants/structured-outputs)
- **Move to multi-assistant**: [Squads](/squads)

---
title: Transient vs permanent configurations
subtitle: Learn to choose between inline and stored assistant configurations
slug: assistants/concepts/transient-vs-permanent-configurations
---

## Overview

Choose between **transient** (inline) and **permanent** (stored) configurations to optimize your Vapi implementation for flexibility, reusability, and management needs.

**In this guide, you'll learn to:**

- Understand when to use transient vs permanent configurations
- Implement both approaches with practical examples
- Apply best practices for each configuration type

## Key differences

| Aspect               | Transient                       | Permanent                            |
| -------------------- | ------------------------------- | ------------------------------------ |
| **Definition**       | Complete JSON in API request    | ID reference to stored configuration |
| **Storage**          | Exists only during API call     | Stored on Vapi servers               |
| **Reusability**      | Defined per request             | Reusable across multiple calls       |
| **Dashboard access** | Not visible                     | Visible and manageable               |
| **Best for**         | Dynamic, personalized scenarios | Shared, reusable setups              |

## Transient configurations

Use **transient configurations** when you need dynamic, call-specific behavior without pre-creating stored configurations.

### When to use transient

<CardGroup cols={2}>
  <Card title="Dynamic personalization" icon="user">
    **Best for:** Customer-specific data Embed user information directly in
    system messages
  </Card>
  <Card title="A/B testing" icon="flask">
    **Best for:** Configuration experiments Test different setups without
    permanent storage
  </Card>
  <Card title="Temporary campaigns" icon="calendar">
    **Best for:** Short-term promotions Event-specific assistants that don't
    need persistence
  </Card>
  <Card title="Development testing" icon="code">
    **Best for:** Rapid prototyping Iterate quickly without managing stored
    configs
  </Card>
</CardGroup>

### Customer service with pre-filled data

<CodeBlocks>
```json title="Transient assistant"
{
  "assistant": {
    "name": "Customer Service Agent",
    "model": {
      "provider": "openai",
      "model": "gpt-4o",
      "messages": [
        {
          "role": "system",
          "content": "You are a customer service representative for Acme Corp. The customer's name is John Smith and their account status is premium. Provide personalized assistance based on their business account history."
        }
      ],
      "temperature": 0.7
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "N2lVS1w4EtoT3dr4eOWO"
    },
    "firstMessage": "Hello John, I see you're calling about your business account. How can I help you today?"
  }
}
```
```bash title="Create call with transient assistant"
curl -X POST "https://api.vapi.ai/call" \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumberId": "your-phone-number-id",
    "customer": {
      "number": "+1234567890"
    },
    "assistant": {
      "name": "Personalized Sales Agent",
      "model": {
        "provider": "openai",
        "model": "gpt-4",
        "messages": [
          {
            "role": "system",
            "content": "You are calling John about their interest in Enterprise Solution. Their budget is $5000."
          }
        ]
      },
      "voice": {
        "provider": "11labs",
        "voiceId": "N2lVS1w4EtoT3dr4eOWO"
      },
      "firstMessage": "Hi John, this is Sarah from Acme Corp calling about Enterprise Solution. Do you have a moment to chat?"
    }
  }'
```
</CodeBlocks>

### A/B testing scenario

<CodeBlocks>
```json title="Variant A - Enthusiastic approach"
{
  "assistant": {
    "name": "A/B Test Assistant - Variant A",
    "model": {
      "provider": "openai",
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "You are an enthusiastic sales representative. Use upbeat language and emphasize benefits."
        }
      ],
      "temperature": 0.9
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "energetic-voice-id"
    },
    "firstMessage": "Hey there! Exciting news - I'd love to tell you about our amazing new features!",
    "analysisPlan": {
      "summaryPrompt": "Rate the customer's engagement level and interest in the product on a scale of 1-10.",
      "structuredDataPlan": {
        "enabled": true,
        "schema": {
          "type": "object",
          "properties": {
            "engagement_score": { "type": "number" },
            "interest_level": {
              "type": "string",
              "enum": ["high", "medium", "low"]
            },
            "conversion_likelihood": { "type": "number" }
          }
        }
      }
    }
  }
}
```
```json title="Variant B - Professional approach"
{
  "assistant": {
    "name": "A/B Test Assistant - Variant B",
    "model": {
      "provider": "openai",
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "You are a professional sales consultant. Use formal language and focus on business value."
        }
      ],
      "temperature": 0.3
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "professional-voice-id"
    },
    "firstMessage": "Good afternoon. I'm calling to discuss how our enterprise solutions can benefit your organization.",
    "analysisPlan": {
      "summaryPrompt": "Rate the customer's engagement level and interest in the product on a scale of 1-10.",
      "structuredDataPlan": {
        "enabled": true,
        "schema": {
          "type": "object",
          "properties": {
            "engagement_score": { "type": "number" },
            "interest_level": {
              "type": "string",
              "enum": ["high", "medium", "low"]
            },
            "conversion_likelihood": { "type": "number" }
          }
        }
      }
    }
  }
}
```
</CodeBlocks>

### Transient tools

Create custom tools for specific integrations or workflows:

<CodeBlocks>
```json title="Customer-specific function tool"
{
  "tools": [
    {
      "type": "function",
      "name": "check_inventory",
      "description": "Check product inventory for the customer's specific region",
      "parameters": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string",
            "description": "The product ID to check"
          },
          "region": {
            "type": "string",
            "description": "Customer's region code"
          }
        },
        "required": ["productId", "region"]
      },
      "server": {
        "url": "https://api.customer-integration.com/inventory",
        "secret": "customer-webhook-secret",
        "timeoutSeconds": 30
      }
    }
  ]
}
```
```json title="Context-specific transfer tool"
{
  "tools": [
    {
      "type": "transferCall",
      "destinations": [
        {
          "type": "assistant",
          "assistantName": "technical-support",
          "description": "Transfer to technical support specialist",
          "message": "Let me connect you with our technical team who can better assist with your technical question."
        },
        {
          "type": "number",
          "number": "+1234567890",
          "description": "Emergency escalation line",
          "message": "Transferring you to our priority support team."
        }
      ]
    }
  ]
}
```
</CodeBlocks>

<Warning>
  **Transient limitations:** Configurations exist only during the API call and
  cannot be managed through the dashboard or reused across calls.
</Warning>

## Permanent configurations

Use **permanent configurations** for reusable setups that multiple teams can access and manage through the dashboard.

### When to use permanent

<CardGroup cols={2}>
  <Card title="Shared resources" icon="users">
    **Best for:** Team collaboration Assistants used across multiple departments
  </Card>
  <Card title="Dashboard management" icon="cog">
    **Best for:** Non-technical users Visual configuration management
  </Card>
  <Card title="Reusable setups" icon="refresh">
    **Best for:** Standard workflows Consistent configurations across calls
  </Card>
  <Card title="Version control" icon="git-branch">
    **Best for:** Change tracking Maintain configuration history
  </Card>
</CardGroup>

### Creating permanent configurations

<Steps>
  <Step title="Create the assistant">
    Store your assistant configuration on Vapi servers
  </Step>
  <Step title="Get the assistant ID">
    Use the returned UUID to reference the assistant
  </Step>
  <Step title="Reference in API calls">
    Use the ID instead of inline configuration
  </Step>
</Steps>

<CodeBlocks>
```bash title="Create permanent assistant"
curl -X POST "https://api.vapi.ai/assistant" \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "General Support Assistant",
    "model": {
      "provider": "openai",
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful customer service representative for Acme Corp. Provide accurate information about our products and services."
        }
      ]
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "N2lVS1w4EtoT3dr4eOWO"
    },
    "firstMessage": "Hello! Thank you for calling Acme Corp. How can I assist you today?"
  }'
```
```bash title="Create permanent tool"
curl -X POST "https://api.vapi.ai/tool" \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "function",
    "name": "update_crm_contact",
    "description": "Update contact information in the CRM system",
    "parameters": {
      "type": "object",
      "properties": {
        "contactId": {
          "type": "string",
          "description": "CRM contact ID"
        },
        "updates": {
          "type": "object",
          "description": "Fields to update"
        }
      },
      "required": ["contactId", "updates"]
    },
    "server": {
      "url": "https://api.yourcrm.com/contacts/update",
      "secret": "your-webhook-secret"
    }
  }'
```
```bash title="Use permanent configurations"
curl -X POST "https://api.vapi.ai/call" \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumberId": "your-phone-number-id",
    "customer": {
      "number": "+1234567890"
    },
    "assistantId": "your-assistant-id",
    "assistantOverrides": {
      "toolIds": ["tool-id-1", "tool-id-2"],
      "variableValues": {
        "customerName": "John Smith",
        "accountId": "ACC123456"
      }
    }
  }'
```
</CodeBlocks>

## Mixed configurations

Combine transient and permanent configurations for maximum flexibility:

<CodeBlocks>
```json title="Squad with mixed configurations"
{
  "squad": [
    {
      "assistantId": "permanent-receptionist-assistant-id",
      "assistantDestinations": [
        {
          "type": "assistant",
          "assistantName": "technical-support"
        }
      ]
    },
    {
      "assistant": {
        "name": "technical-support",
        "model": {
          "provider": "openai",
          "model": "gpt-4",
          "messages": [
            {
              "role": "system",
              "content": "You are a technical support specialist for Enterprise Software. The customer has high priority issue."
            }
          ]
        },
        "voice": {
          "provider": "11labs",
          "voiceId": "technical-voice-id"
        }
      },
      "assistantDestinations": []
    }
  ]
}
```
```json title="Server message with transient assistant"
{
  "assistant": {
    "name": "Dynamic Inbound Handler",
    "model": {
      "provider": "openai",
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "The caller is from West Coast calling during business hours. Adjust your approach accordingly."
        }
      ]
    },
    "voice": {
      "provider": "11labs",
      "voiceId": "appropriate-voice-for-region"
    },
    "firstMessage": "Hello! I see you're calling from West Coast. How can I help you today?"
  }
}
```
</CodeBlocks>

## Best practices

<AccordionGroup>
  <Accordion title="Choosing the right approach">
    **Use transient when:**
    - Customer data needs to be embedded in system messages
    - Testing different configurations temporarily
    - Creating user-specific personalizations
    - Rapid prototyping and development

    **Use permanent when:**
    - Multiple teams need access to the same configuration
    - Non-technical users manage configurations via dashboard
    - Consistency across multiple API calls is required
    - Version control and change tracking are important

  </Accordion>
  
  <Accordion title="Performance considerations">
    - **Transient:** Slightly larger request payloads but no additional API calls
    - **Permanent:** Smaller request payloads but requires initial creation calls
    - **Mixed:** Optimize by using permanent for stable configs, transient for dynamic parts
  </Accordion>
  
  <Accordion title="Security and access control">
    - **Transient:** Full configuration visible in API requests - avoid sensitive data
    - **Permanent:** Stored securely on Vapi servers with proper access controls
    - **Recommendation:** Use permanent configurations for sensitive integrations
  </Accordion>
</AccordionGroup>

## Limitations

<Tabs>
  <Tab title="Transient limitations">
    - **No persistence:** Cannot retrieve or reuse after API call - **No
    dashboard access:** Not visible in Vapi dashboard - **No version control:**
    Cannot track configuration changes - **Request size:** Larger payloads may
    impact performance
  </Tab>
  <Tab title="Permanent limitations">
    - **Setup overhead:** Requires separate creation API calls - **ID
    management:** Need to track and manage configuration UUIDs - **Update
    complexity:** Changes require additional API calls
  </Tab>
</Tabs>

## Next steps

Now that you understand transient vs permanent configurations:

- **[Assistant creation guide](/docs/assistants):** Learn to build and customize assistants
- **[Tool integration](/docs/tools):** Connect external services and functions
- **[Squad configuration](/docs/squads):** Set up multi-assistant workflows
- **[API reference](/fern/api-reference):** Explore all configuration options


---
title: Variables
subtitle: Personalize assistant messages with dynamic and default variables
slug: assistants/dynamic-variables
---

## Overview

Use dynamic variables in the system prompt or any message in the dashboard with double curly braces (e.g., `{{name}}`).

To set values, make a phone call request through the API and set `assistantOverrides`. You cannot set variable values directly in the dashboard.

For example, set the assistant's first message to "Hello, `{{name}}`!" and assign `name` to `John` by passing `assistantOverrides` with `variableValues`:

```json
{
  "variableValues": {
    "name": "John"
  }
}
```


## Using dynamic variables in a phone call

<Steps>

  <Step title="Prepare Your Request">

  Create a JSON payload with these key-value pairs:

  - **`assistantId`**: Replace `"your-assistant-id"` with your assistant's actual ID.
  - **`assistantOverride`**: Customize your assistant's behavior.
    - **`variableValues`**: Include dynamic variables in the format `{ "variableName": "variableValue" }`. Example: `{ "name": "John" }`.
  - **`customer`**: Represent the call recipient.
    - **`number`**: Replace `"+1xxxxxxxxxx"` with the recipient's phone number (E.164 format).
  - **`phoneNumberId`**: Replace `"your-phone-id"` with your registered phone number's ID. Find it on the [Phone number](https://dashboard.vapi.ai/phone-numbers) page.

  </Step>

  <Step title="Send the Request">

  Send the JSON payload to the `/call/phone` endpoint using your preferred method (e.g., HTTP POST request).

  ```json
  {
    "assistantId": "your-assistant-id",
    "assistantOverrides": {
      "variableValues": {
        "name": "John"
      }
    },
    "customer": {
      "number": "+1xxxxxxxxxx"
    },
    "phoneNumberId": "your-phone-id"
  }
  ```

  </Step>

</Steps>

<Note>
  Ensure `{{variableName}}` is included in all prompts where needed.
</Note>

## Default Variables

These variables are automatically filled based on the current (UTC) time, so you don't need to set them manually in `variableValues`:

| Variable                | Description                       | Example                   |
| ----------------------- | --------------------------------- | ------------------------- |
| `{{now}}`               | Current date and time (UTC)       | Jan 1, 2024 12:00 PM      |
| `{{date}}`              | Current date (UTC)                | Jan 1, 2024               |
| `{{time}}`              | Current time (UTC)                | 12:00 PM                  |
| `{{month}}`             | Current month (UTC)               | January                   |
| `{{day}}`               | Current day of month (UTC)        | 1                         |
| `{{year}}`              | Current year (UTC)                | 2024                      |
| `{{customer.number}}`   | Customer's phone number           | +1xxxxxxxxxx              |
| `{{customer.X}}`        | Any other customer property       |                           |

## Advanced date and time usage

You can use advanced date and time formatting in any prompt or message that supports dynamic variables in the dashboard or API. We use [LiquidJS](https://liquidjs.com/) for formatting - see their docs for details.

Format a date or time using the LiquidJS `date` filter:

```liquid
{{"now" | date: "%A, %B %d, %Y, %I:%M %p", "America/Los_Angeles"}}
```
Outputs: `Monday, January 01, 2024, 03:45 PM`

**Examples:**
- 24-hour time:
  ```liquid
  {{"now" | date: "%H:%M", "Europe/London"}}
  ```
  → `17:30`
- Day of week:
  ```liquid
  {{"now" | date: "%A"}}
  ```
  → `Tuesday`
- With customer number:
  ```liquid
  Hello, your number is {{customer.number}} and the time is {{"now" | date: "%I:%M %p", "America/New_York"}}
  ```

**Common formats:**

| Format String   | Output         | Description         |
|----------------|---------------|---------------------|
| `%Y-%m-%d`     | 2024-01-01    | Year-Month-Day      |
| `%I:%M %p`     | 03:45 PM      | Hour:Minute AM/PM   |
| `%H:%M`        | 15:45         | 24-hour time        |
| `%A`           | Monday        | Day of week         |
| `%b %d, %Y`    | Jan 01, 2024  | Abbrev. Month Day   |
```

## Using dynamic variables in the dashboard

To use dynamic variables in the dashboard, include them in your prompts or messages using double curly braces. For example:

```
Hello, {{name}}!
```

When you start a call, you must provide a value for each variable (like `name`) in the call configuration or via the API/SDK.

<Note>
Always use double curly braces (`{{variableName}}`) to reference dynamic variables in your prompts and messages.
</Note>
</rewritten_file>

---
title: Multilingual support
subtitle: Enable voice assistants to speak multiple languages fluently
slug: customization/multilingual
description: >-
  Configure multilingual voice AI agents with automatic language detection,
  cross-language conversation, and localized voices
---

## Overview

Configure your voice assistant to communicate in multiple languages with automatic language detection, native voice quality, and cultural context awareness.

**In this guide, you'll learn to:**
- Set up automatic language detection for speech recognition
- Configure multilingual voice synthesis
- Design language-aware system prompts
- Test and optimize multilingual performance

<Note>
**Multilingual Support:** Multiple providers support automatic language detection. **Deepgram** (Nova 2, Nova 3 with "Multi" setting), **Google STT** (with "Multilingual" setting), and **Gladia** (automatic language detection) all offer seamless multilingual conversations.
</Note>

## Configure automatic language detection

Set up your transcriber to automatically detect and process multiple languages.

<Tabs>
  <Tab title="Dashboard">
    1. Navigate to **Assistants** in your [Vapi Dashboard](https://dashboard.vapi.ai/)
    2. Create a new assistant or edit an existing one
    3. In the **Transcriber** section:
       - **Provider**: Select `Deepgram` (recommended), `Google`, or `Gladia`
       - **Model**: For Deepgram, choose `Nova 2` or `Nova 3`; for Google, choose `Latest`; for Gladia, choose `Solaria`
       - **Language / Mode**: Set `Multi` (Deepgram), `Multilingual` (Google), or choose the language you want to transcribe (Gladia)
    4. **Other providers**: May require a single languages and not auto-detect
    5. Click **Save** to apply the configuration
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    import { VapiClient } from "@vapi-ai/server-sdk";

    const vapi = new VapiClient({ token: "YOUR_VAPI_API_KEY" });

    // Recommended: Deepgram for multilingual support
    const assistant = await vapi.assistants.create({
      name: "Multilingual Assistant",
      transcriber: {
        provider: "deepgram",
        model: "nova-2", // or "nova-3"
        language: "multi"
      }
    });

    // Alternative: Google for multilingual support
    const googleMultilingual = {
      provider: "google",
      model: "latest",
      language: "multilingual"
    };
    ```
  </Tab>
  <Tab title="Python (Server SDK)">
    ```python
    from vapi import Vapi
    import os

    client = Vapi(token=os.getenv("VAPI_API_KEY"))

    # Recommended: Deepgram for multilingual support
    assistant = client.assistants.create(
        name="Multilingual Assistant",
        transcriber={
            "provider": "deepgram",
            "model": "nova-2",  # or "nova-3"
            "language": "multi"
        }
    )

    # Alternative: Google for multilingual support
    google_multilingual = {
        "provider": "google",
        "model": "latest",
        "language": "multilingual"
    }
    ```
  </Tab>
  <Tab title="cURL">
    ```bash
    # Recommended: Deepgram for multilingual support
    curl -X POST "https://api.vapi.ai/assistant" \
         -H "Authorization: Bearer $VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "name": "Multilingual Assistant",
           "transcriber": {
             "provider": "deepgram",
             "model": "nova-2",
             "language": "multi"
           }
         }'

    # Alternative: Google for multilingual support
    curl -X POST "https://api.vapi.ai/assistant" \
         -H "Authorization: Bearer $VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "transcriber": {
             "provider": "google",
             "model": "latest",
             "language": "multilingual"
           }
         }'
    ```
  </Tab>
</Tabs>

<Note>
**Provider Performance:** **Deepgram** offers the best balance of speed and multilingual accuracy. **Google** provides broader language support but may be slower. **Gladia** offers excellent automatic language recognition and code-switching with strong accuracy reported by customers. All three support automatic language detection within conversations.
</Note>

## Set up multilingual voices

Configure your assistant to use appropriate voices for each detected language.

<Tabs>
  <Tab title="Dashboard">
    1. In the **Voice** section of your assistant:
       - **Provider**: Select `Azure` (best multilingual coverage)
       - **Voice**: Choose `multilingual-auto` for automatic voice selection
    2. **Alternative**: Configure specific voices for each language:
       - Select a primary voice (e.g., `en-US-AriaNeural`)
       - Click **Add Fallback Voices**
       - Add voices for other languages:
         - Spanish: `es-ES-ElviraNeural`
         - French: `fr-FR-DeniseNeural`
         - German: `de-DE-KatjaNeural`
    3. Click **Save** to apply the voice configuration
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    // Option 1: Automatic voice selection (recommended)
    const voice = {
      provider: "azure",
      voiceId: "multilingual-auto"
    };

    // Option 2: Specific voices with fallbacks
    const voiceWithFallbacks = {
      provider: "azure",
      voiceId: "en-US-AriaNeural", // Primary voice
      fallbackPlan: {
        voices: [
          { provider: "azure", voiceId: "es-ES-ElviraNeural" },
          { provider: "azure", voiceId: "fr-FR-DeniseNeural" },
          { provider: "azure", voiceId: "de-DE-KatjaNeural" }
        ]
      }
    };

    await vapi.assistants.update(assistantId, { voice });
    ```
  </Tab>
  <Tab title="Python (Server SDK)">
    ```python
    # Option 1: Automatic voice selection (recommended)
    voice = {
        "provider": "azure",
        "voiceId": "multilingual-auto"
    }

    # Option 2: Specific voices with fallbacks
    voice_with_fallbacks = {
        "provider": "azure",
        "voiceId": "en-US-AriaNeural",  # Primary voice
        "fallbackPlan": {
            "voices": [
                {"provider": "azure", "voiceId": "es-ES-ElviraNeural"},
                {"provider": "azure", "voiceId": "fr-FR-DeniseNeural"},
                {"provider": "azure", "voiceId": "de-DE-KatjaNeural"}
            ]
        }
    }

    client.assistants.update(assistant_id, voice=voice)
    ```
  </Tab>
  <Tab title="cURL">
    ```bash
    curl -X PATCH "https://api.vapi.ai/assistant/YOUR_ASSISTANT_ID" \
         -H "Authorization: Bearer $VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "voice": {
             "provider": "azure",
             "voiceId": "multilingual-auto"
           }
         }'
    ```
  </Tab>
</Tabs>

<Note>
**Voice Provider Support:** Unlike transcription, all major voice providers (Azure, ElevenLabs, OpenAI, etc.) support multiple languages. Azure offers the most comprehensive coverage with 400+ voices across 140+ languages.
</Note>

## Configure language-aware prompts

Create system prompts that explicitly list supported languages and handle multiple languages gracefully.

<Tabs>
  <Tab title="Dashboard">
    1. In the **Model** section, update your system prompt to explicitly list supported languages:
    ```
    You are a helpful assistant that can communicate in English, Spanish, and French.

    Language Instructions:
    - You can speak and understand: English, Spanish, and French
    - Automatically detect and respond in the user's language
    - Switch languages seamlessly when the user changes languages
    - Maintain consistent personality across all languages
    - Use culturally appropriate greetings and formality levels

    If a user speaks a language other than English, Spanish, or French, politely explain that you only support these three languages and ask them to continue in one of them.
    ```
    2. Click **Save** to apply the prompt changes
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    const systemPrompt = `You are a helpful assistant that can communicate in English, Spanish, and French.

Language Instructions:
- You can speak and understand: English, Spanish, and French
- Automatically detect and respond in the user's language
- Switch languages seamlessly when the user changes languages
- Maintain consistent personality across all languages
- Use culturally appropriate greetings and formality levels

If a user speaks a language other than English, Spanish, or French, politely explain that you only support these three languages and ask them to continue in one of them.`;

    const model = {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        }
      ]
    };

    await vapi.assistants.update(assistantId, { model });
    ```
  </Tab>
  <Tab title="Python (Server SDK)">
    ```python
    system_prompt = """You are a helpful assistant that can communicate in English, Spanish, and French.

Language Instructions:
- You can speak and understand: English, Spanish, and French
- Automatically detect and respond in the user's language
- Switch languages seamlessly when the user changes languages
- Maintain consistent personality across all languages
- Use culturally appropriate greetings and formality levels

If a user speaks a language other than English, Spanish, or French, politely explain that you only support these three languages and ask them to continue in one of them."""

    model = {
        "provider": "openai",
        "model": "gpt-4",
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            }
        ]
    }

    client.assistants.update(assistant_id, model=model)
    ```
  </Tab>
  <Tab title="cURL">
    ```bash
    curl -X PATCH "https://api.vapi.ai/assistant/YOUR_ASSISTANT_ID" \
         -H "Authorization: Bearer $VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "model": {
             "provider": "openai",
             "model": "gpt-4",
             "messages": [
               {
                 "role": "system",
                 "content": "You are a helpful assistant that can communicate in English, Spanish, and French..."
               }
             ]
           }
         }'
    ```
  </Tab>
</Tabs>

<Warning>
**Critical for Multilingual Success:** You must explicitly list the supported languages in your system prompt. Assistants struggle to understand they can speak multiple languages without this explicit instruction.
</Warning>

## Add multilingual greetings

Configure greeting messages that work across multiple languages.

<Tabs>
  <Tab title="Dashboard">
    1. In the **First Message** field, enter a multilingual greeting:
    ```
    Hello! I can assist you in English, Spanish, or French. How can I help you today?
    ```
    2. **Optional**: For more personalized greetings, use the **Advanced Message Configuration**:
       - Enable **Language-Specific Messages**
       - Add greetings for each target language
    3. Click **Save** to apply the greeting
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    // Simple multilingual greeting
    const firstMessage = "Hello! I can assist you in English, Spanish, or French. How can I help you today?";

    // Language-specific greetings (advanced)
    const multilingualGreeting = {
      contents: [
        {
          type: "text",
          text: "Hello! How can I help you today?",
          language: "en"
        },
        {
          type: "text",
          text: "¡Hola! ¿Cómo puedo ayudarte hoy?",
          language: "es"
        },
        {
          type: "text",
          text: "Bonjour! Comment puis-je vous aider?",
          language: "fr"
        }
      ]
    };

    await vapi.assistants.update(assistantId, { firstMessage });
    ```
  </Tab>
  <Tab title="Python (Server SDK)">
    ```python
    # Simple multilingual greeting
    first_message = "Hello! I can assist you in English, Spanish, or French. How can I help you today?"

    # Language-specific greetings (advanced)
    multilingual_greeting = {
        "contents": [
            {
                "type": "text",
                "text": "Hello! How can I help you today?",
                "language": "en"
            },
            {
                "type": "text",
                "text": "¡Hola! ¿Cómo puedo ayudarte hoy?",
                "language": "es"
            },
            {
                "type": "text",
                "text": "Bonjour! Comment puis-je vous aider?",
                "language": "fr"
            }
        ]
    }

    client.assistants.update(assistant_id, first_message=first_message)
    ```
  </Tab>
  <Tab title="cURL">
    ```bash
    curl -X PATCH "https://api.vapi.ai/assistant/YOUR_ASSISTANT_ID" \
         -H "Authorization: Bearer $VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "firstMessage": "Hello! I can assist you in English, Spanish, or French. How can I help you today?"
         }'
    ```
  </Tab>
</Tabs>

## Test your multilingual assistant

Validate your configuration with different languages and scenarios.

<Tabs>
  <Tab title="Dashboard">
    1. Use the **Test Assistant** feature in your dashboard
    2. Test these scenarios:
       - Start conversations in different languages
       - Switch languages mid-conversation
       - Use mixed-language input
    3. Monitor the **Call Analytics** for:
       - Language detection accuracy
       - Voice quality consistency
       - Response appropriateness
    4. Adjust configuration based on test results
  </Tab>
  <Tab title="TypeScript (Server SDK)">
    ```typescript
    // Create test call
    const testCall = await vapi.calls.create({
      assistantId: "your-multilingual-assistant-id",
      customer: {
        number: "+1234567890"
      }
    });

    // Monitor call events
    vapi.on('call-end', (event) => {
      console.log('Language detection results:', event.transcript);
      console.log('Call summary:', event.summary);
    });
    ```
  </Tab>
  <Tab title="Python (Server SDK)">
    ```python
    # Create test call
    test_call = client.calls.create(
        assistant_id="your-multilingual-assistant-id",
        customer={
            "number": "+1234567890"
        }
    )

    # Retrieve call details for analysis
    call_details = client.calls.get(test_call.id)
    print(f"Language detection: {call_details.transcript}")
    ```
  </Tab>
  <Tab title="cURL">
    ```bash
    # Create test call
    curl -X POST "https://api.vapi.ai/call" \
         -H "Authorization: Bearer $VAPI_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
           "assistantId": "your-multilingual-assistant-id",
           "customer": {
             "number": "+1234567890"
           }
         }'
    ```
  </Tab>
</Tabs>

## Provider capabilities (Accurate as of testing)

### Speech Recognition (Transcription)

| Provider | Multilingual Support | Languages | Notes |
|----------|---------------------|-----------|-------|
| **Deepgram** | ✅ Full auto-detection | 100+ | **Recommended**: Nova 2/Nova 3 with "Multi" language setting |
| **Google STT** | ✅ Full auto-detection | 125+ | Latest models with "Multilingual" language setting |
| **Gladia** | ✅ Full auto-detection | 110+ | Supports automatic language detection and code-switching |
| **Assembly AI** | ❌ English only | English | No multilingual support |
| **Azure STT** | ❌ Single language | 100+ | Many languages, but no auto-detection |
| **OpenAI Whisper** | ❌ Single language | 90+ | Many languages, but no auto-detection |
| **Speechmatics** | ❌ Single language | 50+ | Many languages, but no auto-detection |
| **Talkscriber** | ❌ Single language | 40+ | Many languages, but no auto-detection |

### Voice Synthesis (Text-to-Speech)

| Provider | Languages | Multilingual Voice Selection | Best For |
|----------|-----------|------------------------------|----------|
| **Azure** | 140+ | ✅ Automatic | Maximum language coverage |
| **ElevenLabs** | 30+ | ✅ Automatic | Premium voice quality |
| **OpenAI TTS** | 50+ | ✅ Automatic | Consistent quality across languages |
| **PlayHT** | 80+ | ✅ Automatic | Cost-effective scaling |

## Common challenges and solutions

<AccordionGroup>
  <Accordion title="Language detection is inaccurate">
    **Solutions:**
    - Use Deepgram (Nova 2/Nova 3 with "Multi"), Google STT (with "Multilingual"), or Gladia (automatic language detection)
    - Ensure high-quality audio input for better detection accuracy
    - Test with native speakers of target languages
    - Consider provider-specific language combinations for optimal results
  </Accordion>

  <Accordion title="Assistant doesn't realize it can speak multiple languages">
    **Solutions:**
    - **Explicitly list all supported languages** in your system prompt
    - Include language capabilities in the assistant's instructions
    - Test the prompt with multilingual conversations
    - Avoid generic "multilingual" statements without specifics
  </Accordion>

  <Accordion title="Transcription is too slow">
    **Solutions:**
    - Use Deepgram Nova 2/Nova 3 for optimal speed and multilingual support
    - For Google STT, use latest models for better performance
    - Consider the speed vs accuracy tradeoff for your use case
    - Optimize audio quality and format to improve processing speed
  </Accordion>

  <Accordion title="Voice quality varies between languages">
    **Solutions:**
    - Test different voice providers for each language
    - Use Azure for maximum language coverage
    - Configure fallback voices as backup options
    - Consider premium providers for key languages
  </Accordion>
</AccordionGroup>

## Next steps

Now that you have multilingual support configured:

- **[Build a complete multilingual agent](../assistants/examples/multilingual-agent):** Follow our step-by-step implementation guide
- **[Custom voices](custom-voices/custom-voice):** Set up region-specific custom voices
- **[System prompting](../prompting-guide):** Design effective multilingual prompts
- **[Call analysis](../call-analysis):** Monitor language performance and usage


---
title: Personalization with user information
subtitle: Add customer-specific information to your voice assistant conversations
slug: assistants/personalization
---

## Overview

Personalization lets you include customer-specific information in your voice assistant conversations. When a customer calls, your server can provide data about that customer, which is then used to tailor the conversation in real time.

This approach is ideal for use cases like customer support, account management, or any scenario where the assistant should reference details unique to the caller.

## How Personalization Works

<Steps>
  <Step title="Customer Calls Your Number">
    When a call comes in, Vapi sends a request to your server instead of using a fixed assistant configuration.
  </Step>

  <Step title="Your Server Looks Up the Caller">
    Your server receives the request, identifies the caller (for example, by phone number), and fetches relevant customer data from your database or CRM.
  </Step>

  <Step title="Your Server Responds with Assistant Details">
    Your server responds to Vapi with either:
    - An existing assistant ID and a set of dynamic variables to personalize the conversation, or
    - A complete assistant configuration, with customer data embedded directly in the prompts or instructions.
  </Step>

  <Step title="Vapi Handles the Call">
    Vapi uses the personalized assistant configuration or variables to guide the conversation, referencing the customer's information as needed.
  </Step>
</Steps>

## Prerequisites

- A Vapi phone number
- A created Vapi Assistant
- A server endpoint to receive Vapi's requests

## Implementation

<Steps>
  <Step title="Add Dynamic Variables to Your Assistant">
    Use variable placeholders in your assistant's instructions or messages with the `{{variable_name}}` syntax.

    Example:  
    `"Hello {{customerName}}! I see you've been a {{accountType}} customer since {{joinDate}}."`
  </Step>

  <Step title="Configure Your Phone Number to Use Your Server">
    Update your phone number so that Vapi sends incoming call events to your server, rather than using a static assistant.

    ```json
    PATCH /phone-number/{id}
    {
      "assistantId": null,
      "squadId": null,
      "server": {
        "url": "https://your-server.com/api/assistant-selector"
      }
    }
    ```

    <Note>
      Your server must respond within 7.5 seconds, or the call will fail.
    </Note>
  </Step>

  <Step title="Implement Your Server Endpoint">
    Your server should handle POST requests from Vapi and return either:

    **Option 1: Use an Existing Assistant with Dynamic Variables**

    ```javascript
    app.post("/api/assistant-selector", async (req, res) => {
      if (req.body.message?.type === "assistant-request") {
        const phoneNumber = req.body.call.from.phoneNumber;
        const customer = await crmAPI.getCustomerByPhone(phoneNumber);

        res.json({
          assistantId: "asst_customersupport",
          assistantOverrides: {
            variableValues: {
              customerName: customer.name,
              accountType: customer.tier,
              joinDate: customer.createdAt
            }
          }
        });
      }
    });
    ```

    **Option 2: Return a Complete Assistant Configuration**

    ```javascript
    app.post("/api/assistant-selector", async (req, res) => {
      if (req.body.message?.type === "assistant-request") {
        const phoneNumber = req.body.call.from.phoneNumber;
        const customer = await crmAPI.getCustomerByPhone(phoneNumber);

        res.json({
          assistant: {
            name: "Dynamic Customer Support Assistant",
            model: {
              provider: "openai",
              model: "gpt-4o",
              messages: [{
                role: "system",
                content: `You are helping ${customer.name}, a ${customer.tier} member since ${customer.createdAt}.`
              }]
            },
            voice: {
              provider: "11labs",
              voiceId: "shimmer"
            }
          }
        });
      }
    });
    ```
  </Step>
</Steps>

## Error Handling

If your server encounters an error or cannot find the customer, return a response like this to end the call with a spoken message:

```json
{
  "error": "Unable to find customer record. Please try again later."
}
```

## Common Issues

<Note>
- Use the exact `{{variable_name}}` syntax for variables in your assistant configuration.
- Your server must respond within 7.5 seconds.
- Implement fallbacks for missing or incomplete customer data.
- Ensure your endpoint is highly available to avoid missed calls.
</Note>


---
title: Voice formatting plan
subtitle: Format LLM output for natural-sounding speech
slug: assistants/voice-formatting-plan
---

## Overview

Voice formatting automatically transforms raw text from your language model (LLM) into a format that sounds natural when spoken by a text-to-speech (TTS) provider. This process—called **Voice Input Formatted**—is enabled by default for all assistants.

Formatting helps with things like:

- Expanding numbers and currency (e.g., `$42.50` → "forty two dollars and fifty cents")
- Expanding abbreviations (e.g., `ST` → "STREET")
- Spacing out phone numbers (e.g., `123-456-7890` → "1 2 3 4 5 6 7 8 9 0")

You can turn off formatting if you want the TTS to read the raw LLM output.

## How voice input formatting works

When enabled, the formatter runs a series of transformations on your text, each handled by a specific function. Here's the order and what each function does:

| **Step** | **Function Name** | **Description** | **Before** | **After** | **Default** | **Precedence** |
| :------- | :---------------- | :-------------- | :--------- | :-------- | :---------- | :------------ |
| 1 | `removeAngleBracketContent` | Removes anything within `<...>`, except for `<break>`, `<spell>`, or double angle brackets `<< >>`. | `Hello <tag> world` | `Hello  world` | ✅ | - |
| 2 | `removeMarkdownSymbols` | Removes markdown symbols like `_`, `` ` ``, and `~`. Asterisks (`*`) are preserved in this step. | `**Wanted** to say *hi*` | `**Wanted** to say *hi*` | ✅ | 0 |
| 3 | `removePhrasesInAsterisks` | Removes text surrounded by single or double asterisks. | `**Wanted** to say *hi*` | ` to say` | ❌ | 0 |
| 4 | `replaceNewLinesWithPeriods` | Converts new lines (`\n`) to periods for smoother speech. | `Hello  world\n to say\nWe have NASA` | `Hello  world .  to say . We have NASA` | ✅ | 0 |
| 5 | `replaceColonsWithPeriods` | Replaces `:` with `.` for better phrasing. | `price: $42.50` | `price. $42.50` | ✅ | 0 |
| 6 | `formatAcronyms` | Converts known acronyms to lowercase (e.g., NASA → nasa) or spaces out unknown all-caps words unless they contain vowels. | `NASA and .NET` | `nasa and .net` | ✅ | 0 |
| 7 | `formatDollarAmounts` | Converts currency amounts to spoken words. | `$42.50` | `forty two dollars and fifty cents` | ✅ | 0 |
| 8 | `formatEmails` | Replaces `@` with "at" and `.` with "dot" in emails. | `JOHN.DOE@example.COM` | `JOHN dot DOE at example dot COM` | ✅ | 0 |
| 9 | `formatDates` | Converts date strings into spoken date format. | `2023 05 10` | `Wednesday, May 10, 2023` | ✅ | 0 |
| 10 | `formatTimes` | Expands or simplifies time expressions. | `14:00` | `14` | ✅ | 0 |
| 11 | `formatDistances`, `formatUnits`, `formatPercentages`, `formatPhoneNumbers` | Converts units, distances, percentages, and phone numbers into spoken words. | `5km`, `43 lb`, `50%`, `123-456-7890` | `5 kilometers`, `forty three pounds`, `50 percent`, `1 2 3 4 5 6 7 8 9 0` | ✅ | 0 |
| 12 | `formatNumbers` | Formats general numbers: years read as digits, large numbers spelled out, negative and decimal numbers clarified. | `-9`, `2.5`, `2023` | `minus nine`, `two point five`, `2023` | ✅ | 0 |
| 13 | `removeAsterisks` | Removes all asterisk characters from the text. | `**Bold** and *italic*` | `Bold and italic` | ✅ | 1 |
| 14 | `Applying Replacements` | Applies user-defined final replacements like expanding street abbreviations. | `320 ST 21 RD` | `320 STREET 21 ROAD` | ✅ | - |

---

## Customizing the formatting plan

You can control some aspects of formatting:

### Enabled
Formatting is on by default. To disable, set:
```js
voice.chunkPlan.formatPlan.enabled = false
```

### Number-to-digits cutoff
Controls when numbers are read as digits instead of words.
- **Default:** `2025` (current year)
- Example: With a cutoff of `2025`, numbers above this are read as digits.
- To spell out larger numbers, set the cutoff higher (e.g., `300000`).

### Replacements
Add exact or regex-based substitutions to customize output.
- **Example 1:** Replace `hello` with `hi`:
  ```js
  { type: 'exact', key: 'hello', value: 'hi' }
  ```
- **Example 2:** Replace words matching a pattern:
  ```js
  { type: 'regex', regex: '\b[a-zA-Z]{5}\b', value: 'hi' }
  ```

<Note>
Currently, only replacements and the number-to-digits cutoff are customizable. Other options are not exposed.
</Note>

---

## Turning formatting off

To disable all formatting and use raw LLM output, set either of these to `false`:

```js
voice.chunkPlan.enabled = false
// or
voice.chunkPlan.formatPlan.enabled = false
```

---

## Summary

- Voice input formatting improves clarity and naturalness for TTS.
- Each transformation step targets a specific pattern for better speech output.
- You can customize or disable formatting as needed.

---
title: Flush syntax
subtitle: Control voice transmission timing for responsive conversations
slug: assistants/flush-syntax
description: >-
  Force immediate voice transmission with VAPI's flush syntax for real-time
  interactions
---

## Overview

The flush syntax is a VAPI audio control token that forces immediate transmission of LLM output to voice providers, eliminating buffering delays for real-time voice interactions.

**When to use flush syntax:**

- Acknowledge user requests immediately during processing
- Provide feedback during long-running tool executions
- Create natural conversation pauses
- Support custom LLM integrations with processing delays

<Tip>
  Use flush strategically—overuse can cause audio fragmentation and degrade
  conversation quality.
</Tip>

## How it works

The flush syntax bypasses normal buffering to provide immediate audio feedback:

1. **Detection**: VAPI scans LLM output for flush syntax using regex pattern
2. **Split**: Text is divided at the flush position
3. **Immediate Send**: Content before flush is sent instantly to voice provider
4. **Continue**: Remaining text follows normal buffering

<CodeBlocks>
```typescript title="Processing Example"
const { sendToTTS, flush, remainingBuffer } = ttsBuffer(buffer, voice);
if (sendToTTS.length > 0) {
  pushBuffer(sendToTTS, flush); // flush=true triggers immediate send
  buffer = remainingBuffer;
}
```
```python title="Conceptual Flow"
# 1. LLM generates: "I'm processing your request... <flush /> Here's the result"
# 2. VAPI detects flush syntax
# 3. Sends "I'm processing your request..." immediately to voice
# 4. Continues with "Here's the result" using normal buffering
```
</CodeBlocks>

## Syntax formats

VAPI supports three flush formats with case-insensitive matching:

<CodeBlocks>
  ```html title="Self-closing (Recommended)"
  <flush />
  ``` ```html title="Opening tag"
  <flush>``` ```html title="Closing tag"</flush>
  ```
</CodeBlocks>

<Note>
All formats use regex pattern `/<\s*flush\s*\/?>|<\s*\/\s*flush\s*>/i` allowing whitespace variations.
</Note>

## Configuration requirements

Flush syntax requires proper voice configuration:

<CodeBlocks>
```json title="Assistant Configuration"
{
  "voice": {
    "chunkPlan": {
      "enabled": true  // Required for flush to work
    }
  }
}
```
```typescript title="TypeScript SDK"
const assistant = await vapi.assistants.create({
  voice: {
    chunkPlan: {
      enabled: true
    }
  }
  // ... other configuration
});
```
</CodeBlocks>

<Warning>
  Flush will NOT work when `chunkPlan.enabled: false`. The tags will appear in
  voice output instead of being processed.
</Warning>

## Usage examples

### Basic acknowledgment

```javascript
"I'm processing your request... <flush /> Let me check that for you.";
```

### Tool processing feedback

```javascript
"Looking up that information... <flush /> This may take a moment.";
```

### Conversation flow

```javascript
"That's a great question. <flush /> Based on the data I have...";
```

### Custom LLM integration

```javascript
"Here's your answer: 42. <flush /> Would you like an explanation?";
```

## Best practices

### When to use flush

<CardGroup cols={2}>
  <Card title="Acknowledge requests" icon="check">
    Immediately confirm you've received and understood the user's request
  </Card>
  <Card title="Long operations" icon="clock">
    Provide feedback during tool calls or processing that takes time
  </Card>
  <Card title="Natural pauses" icon="pause">
    Create conversation breaks at logical points
  </Card>
  <Card title="Custom delays" icon="gear">
    Support external LLM integrations with processing delays
  </Card>
</CardGroup>

### When to avoid flush

- **Every response** - Causes audio fragmentation
- **Mid-sentence** - Breaks natural speech flow
- **Short responses** - Normal buffering is sufficient
- **Multiple per response** - Can create choppy audio

### Implementation guidelines

1. **Place at natural boundaries** - Use between complete thoughts or sentences
2. **Test with your voice provider** - Effectiveness varies by provider
3. **Monitor conversation quality** - Ensure audio remains smooth and natural
4. **Document usage** - Include in code comments for team understanding

## Advanced usage

### Dynamic insertion

```typescript
const acknowledgment = "I understand your request";
const detailedResponse = await processRequest(userInput);
const responseWithFlush = `${acknowledgment} <flush /> ${detailedResponse}`;
```

### System prompt integration

```javascript
const systemPrompt = `When providing lengthy responses, use <flush /> after acknowledging the user's request to provide immediate feedback.`;
```

### Nested handling

```javascript
"Starting process... <flush> Step 1 complete </flush> Moving to step 2...";
```

## Troubleshooting

<AccordionGroup>
  <Accordion title="Flush tags appear in voice output">
    **Cause**: `chunkPlan.enabled` is set to `false` or missing **Solution**: -
    Verify `chunkPlan.enabled: true` in voice configuration - Check assistant
    configuration in dashboard or API calls - Test with a minimal configuration
    to isolate the issue
  </Accordion>

{" "}
<Accordion title="Syntax not recognized">
  **Cause**: Malformed flush syntax or typos **Solution**: - Use exact formats:
  `<flush />
  `, `<flush>`, or `</flush>` - Avoid extra parameters or attributes - Check for
  typos in tag spelling
</Accordion>

  <Accordion title="Audio sounds choppy or fragmented">
    **Cause**: Overuse of flush syntax 
    **Solution**: 
    - Reduce flush frequency in responses 
    - Place only at sentence boundaries 
    - Test with real users to
    validate experience
  </Accordion>
</AccordionGroup>

## Technical considerations

### Provider compatibility

- **Effectiveness varies** by voice provider
- **Test thoroughly** with your chosen provider
- **Monitor performance** impact on response times

### Cost implications

- **Increased API calls** to voice provider
- **Higher usage** on usage-based pricing
- **Monitor billing** if using flush frequently

### VAPI-only feature

- **Platform exclusive** - not available on other voice platforms
- **Configuration dependent** - requires chunking enabled
- **Version specific** - ensure using compatible VAPI version

## Next steps

Now that you understand flush syntax:

- **[Voice formatting plan](/assistants/voice-formatting-plan):** Control voice output formatting and timing
- **[Background messages](/assistants/background-messages):** Send messages during conversations
- **[Custom tools](/tools/custom-tools):** Build tools that benefit from flush syntax feedback

---
title: Background messages
subtitle: Silently update chat history with background messages
slug: assistants/background-messages
---

## Overview

Background messages let you add information to the chat history without interrupting or notifying the user. This is useful for logging actions, tracking background events, or updating conversation context silently.

For example, you might want to log when a user presses a button or when a background process updates the conversation. These messages help you keep a complete record of the conversation and system events, all without disrupting the user experience.

<Steps>
  <Step title="Add a Button to Trigger the Message">
    Add a button to your interface with an `onClick` event handler that will call a function to send the system message:
    ```html
    <button id="log-action" onClick="logUserAction()">Log Action</button>
    ```
  </Step>

  <Step title="Log the Action as a System Message">
    When the button is clicked, the `logUserAction` function will silently insert a system message into the chat history:
    ```js
    function logUserAction() {
      // Function to log the user action
      vapi.send({
        type: "add-message",
        message: {
          role: "system",
          content: "The user has pressed the button, say peanuts",
        },
      });
    }
    ```
    - `vapi.send`: The primary function to interact with your assistant, handling various requests or commands.
    - `type: "add-message"`: Specifies the command to add a new message.
    - `message`: This is the actual message that you want to add to the message history.
      - `role`: "system" Designates the message origin as 'system', ensuring the addition is unobtrusive. Other possible values of role are 'user' | 'assistant' | 'tool' | 'function'
      - `content`: The actual message text to be added.
  </Step>
</Steps>

<Card title="Practical Use Cases">
    - Silent logging of user activities.
    - Contextual updates in conversations triggered by background processes.
    - Non-intrusive user experience enhancements through additional information provision.
</Card>

---
title: Idle messages
subtitle: Keep users engaged during conversation pauses
slug: assistants/idle-messages
---

## Overview

Idle messages automatically prompt users during periods of inactivity to maintain engagement and reduce call abandonment. They are set up using [Assistant Hooks](/assistants/assistant-hooks) to trigger on customer silence timeout, and can be configured to say exact messages or use a model-generated message based on the conversation history.

**Idle messages help you:**

- Re-engage users who become distracted or experience audio delays
- Reduce call abandonment rates during silent periods
- Provide proactive assistance when users hesitate or need guidance

<Tip>
  Idle messages are automatically disabled during tool calls and warm transfers
  to avoid interrupting system processes.
</Tip>

## How idle messages work

When a user stops speaking, Vapi starts a timer. Based on the configured timeout periods in `customer.speech.timeout` hooks, the assistant will trigger the action, which can be configured to say messages to the user.

<CardGroup cols={3}>
  <Card title="Detection" icon="timer" iconType="solid">
    Timer starts when user stops speaking
  </Card>
  <Card title="Activation" icon="message" iconType="solid">
    Fetches a message to say to the user
  </Card>
  <Card title="Reset" icon="refresh" iconType="solid">
    Counter resets when user responds (optional)
  </Card>
</CardGroup>

## Configuration

Configure idle messages using [Assistant Hooks](/assistants/assistant-hooks). Use the `customer.speech.timeout` hook to send a message when the user is silent for a specified period:

<CodeBlocks>
```typescript title="TypeScript (Server SDK)"
import { VapiClient } from "@vapi-ai/server-sdk";

const client = new VapiClient({ token: process.env.VAPI_API_KEY });

await client.assistants.create({
  name: "Support Assistant",
  hooks: [
    {
      on: "customer.speech.timeout",
      options: {
        timeoutSeconds: 10,
        triggerMaxCount: 3,
        triggerResetMode: "onUserSpeech"
      },
      do: [
        {
          type: "say",
          exact: [
            "Are you still there?",
            "Can I help you with anything else?",
            "I'm here whenever you're ready to continue."
          ]
        }
      ],
      name: "idle_message_check"
    }
  ]
});
```

```python title="Python (Server SDK)"
from vapi import Vapi
import os

client = Vapi(token=os.getenv("VAPI_API_KEY"))

assistant = client.assistants.create(
    name="Support Assistant",
    hooks=[
        {
            "on": "customer.speech.timeout",
            "options": {
                "timeoutSeconds": 10,
                "triggerMaxCount": 3,
                "triggerResetMode": "onUserSpeech"
            },
            "do": [
                {
                    "type": "say",
                    "exact": [
                        "Are you still there?",
                        "Can I help you with anything else?",
                        "I'm here whenever you're ready to continue."
                    ]
                }
            ],
            "name": "idle_message_check"
        }
    ]
)
```

```bash title="cURL"
curl -X POST "https://api.vapi.ai/assistant" \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Support Assistant",
    "hooks": [{
      "on": "customer.speech.timeout",
      "options": {
        "timeoutSeconds": 10,
        "triggerMaxCount": 3,
        "triggerResetMode": "onUserSpeech"
      },
      "do": [{
        "type": "say",
        "exact": [
          "Are you still there?",
          "Can I help you with anything else?",
          "I am here whenever you are ready to continue."
        ]
      }],
      "name": "idle_message_check"
    }]
  }'
```

</CodeBlocks>

<Note>
  Learn more about hook options and actions in **[Assistant hooks](/assistants/assistant-hooks)**.
</Note>

## Configuration options

### Timeout and triggering

| Option                | Type     | Range           | Default   | Description |
| --------------------- | -------- | --------------- | --------- | ----------- |
| `timeoutSeconds`      | number   | 1-1000 seconds  | 7.5       | How long to wait for customer speech before triggering |
| `triggerMaxCount`     | number   | 1-10            | 3         | Maximum times the timeout hook triggers per call |
| `triggerResetMode`    | string   | `never`\|`onUserSpeech` | `never`   | Whether to reset the trigger count when the user speaks |

### Message action

| Field        | Type              | Description |
| ------------ | ----------------- | ----------- |
| `say.exact`  | string or string[]| Speak one of the provided messages verbatim |
| `say.prompt` | string            | Use a model-generated response based on the given prompt and context (e.g., `{{transcript}}`) |

### Advanced configuration

<Tabs>
  <Tab title="Basic setup (single timeout)">
    ```json
    {
      "hooks": [
        {
          "on": "customer.speech.timeout",
          "options": { "timeoutSeconds": 10 },
          "do": [{ "type": "say", "exact": "Are you still there?" }]
        }
      ]
    }
    ```
  </Tab>
  <Tab title="With reset counter">
    ```json
    {
      "hooks": [
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 15,
            "triggerMaxCount": 5,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [{ "type": "say", "exact": "Hello, are you there?" }]
        }
      ]
    }
    ```
  </Tab>
  <Tab title="End call after 30s of silence">
    ```json
    {
      "hooks": [
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 10,
            "triggerMaxCount": 3,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [{ "type": "say", "exact": "Are you still there? Please let me know how I can help you." }]
        },
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 20,
            "triggerMaxCount": 3,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [{ "type": "say", "prompt": "The user has not responded in 20s. Based on the above conversation in {{transcript}} ask the user if they need help or if not you will be ending the call" }]
        },
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 30,
            "triggerMaxCount": 3,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [
            { "type": "say", "exact": "I'll be ending the call now, please feel free to call back at any time." },
            { "type": "tool", "tool": { "type": "endCall" } }
          ]
        }
      ]
    }
    ```
  </Tab>
</Tabs>

## Multilingual support

Handle multiple languages by creating language-specific assistants or dynamically configuring hook messages:

<Tabs>
  <Tab title="Language-specific assistants">
    ```typescript
    // English assistant
    await client.assistants.create({
      name: "EN Support",
      hooks: [{
        on: "customer.speech.timeout",
        options: { timeoutSeconds: 10 },
        do: [{ type: "say", exact: [
          "Are you still there?",
          "Can I help you with anything else?"
        ] }]
      }]
    });

    // Spanish assistant
    await client.assistants.create({
      name: "ES Support",
      hooks: [{
        on: "customer.speech.timeout",
        options: { timeoutSeconds: 10 },
        do: [{ type: "say", exact: [
          "¿Sigues ahí?",
          "¿Puedo ayudarte con algo más?"
        ] }]
      }]
    });
    ```

  </Tab>
  <Tab title="Dynamic updates">
    ```typescript
    await client.assistants.create({
      name: "Multi Support",
      hooks: [{
        on: "customer.speech.timeout",
        options: { timeoutSeconds: 10 },
        do: [{ type: "say", prompt: "Based on the above conversation in {{transcript}} ask the user in the language of the conversation if they need help or if not you will be ending the call. If no conversation is provided, default to English." }]
      }]
    });
    ```

  </Tab>
</Tabs>

## Best practices

### Message content guidelines

- **Keep messages concise** - Users may be distracted, so shorter is better
- **Use encouraging tone** - Avoid demanding or impatient language
- **Offer specific help** - Guide users toward productive next steps

<Check>
  **Good examples:** - "Are you still there?" - "Is there anything specific you
  need help with?" - "I'm here whenever you're ready to continue."
</Check>

<Error>
  **Avoid:** - "Why aren't you responding?" - "Hello? Hello? Are you there?" -
  Long explanations or complex questions
</Error>

### Timing recommendations

Choose timeout duration based on your use case:

<CardGroup cols={3}>
  <Card title="Urgent calls" icon="clock">
    **5-10 seconds** For transactional or time-sensitive interactions
  </Card>
  <Card title="Support calls" icon="headset">
    **10-20 seconds** For general customer service and assistance
  </Card>
  <Card title="Complex topics" icon="brain">
    **20-30 seconds** For problem-solving or decision-making conversations
  </Card>
</CardGroup>

## Troubleshooting

### Messages not triggering

<Steps>
  <Step title="Verify configuration">
    Check that idle messages are properly configured in hooks:
    ```typescript
    const assistant = await client.assistants.get(assistantId);
    console.log('Hook config:', assistant.hooks);
    ```
  </Step>
  <Step title="Check message generation time">
    Account for message generation time (1-2 seconds) if using `say.prompt`:
  </Step>
  <Step title="Verify message limits">
    Ensure the maximum count hasn't been reached. If the maximum count is reached, you will see a log in the call logs that mentions hook not triggered because of max count.
    ```json
    {
      "options": {
        "triggerMaxCount": 5,
        "triggerResetMode": "onUserSpeech"
      }
    }
    ```
  </Step>
</Steps>

### Common issues and solutions

<AccordionGroup>
  <Accordion title="Messages trigger too frequently">
    **Solution:** Increase the timeout duration
    ```json
    { "idleTimeoutSeconds": 25 }
    ```
  </Accordion>
  
  <Accordion title="Max count reached too quickly">
    **Solution:** Enable reset on user speech and increase max count
    ```json
    {
      "idleMessageMaxSpokenCount": 5,
      "idleMessageResetCountOnUserSpeechEnabled": true  
    }
    ```
  </Accordion>
  
  <Accordion title="Messages interrupt processing">
    **Solution:** This shouldn't happen - all hooks are automatically disabled during tool calls and transfers. If it persists, contact support.
  </Accordion>
</AccordionGroup>

## Limitations

- **Generative variability**: Using `say.prompt` produces model-generated text that may vary; use `say.exact` for strict control
- **Trigger limits**: `triggerMaxCount` caps how many times the timeout hook fires per call (1-10)
- **Timeout range**: `timeoutSeconds` supports 1-1000 seconds (default ~7.5s); account for processing delays
- **Processing delays**: Allow 2-3 seconds of audio processing time when choosing timeout values

## Next steps

Now that you have idle messages configured:

- **[Background messages](/assistants/background-messages):** Add contextual information silently
- **[Assistant hooks](/assistants/assistant-hooks):** Handle call events and state changes
- **[Voice formatting plan](/assistants/voice-formatting-plan):** Control speech patterns and delivery

---
title: Assistant hooks
subtitle: Automate actions on call events and interruptions
slug: assistants/assistant-hooks
---

## Overview

Assistant hooks let you automate actions when specific events occur during a call. Use hooks to transfer calls, run functions, or send messages in response to events like call ending or speech interruptions.

Supported events include:

- `call.ending`: When a call is ending
- `assistant.speech.interrupted`: When the assistant's speech is interrupted
- `customer.speech.interrupted`: When the customer's speech is interrupted
- `customer.speech.timeout`: When the customer doesn't speak within a specified time

You can combine actions and add filters to control when hooks trigger. Multiple `customer.speech.timeout` hooks can be attached to an assistant with staggered trigger delay to support different actions at different timing in the conversation.

## How hooks work

Hooks are defined in the `hooks` array of your assistant configuration. Each hook includes:

- `on`: The event that triggers the hook
- `do`: The actions to perform (supports `tool` and `say`)
- `filters`: (Optional) Conditions that must be met for the hook to trigger
- `options`: (Optional) Configuration options for certain hook types like `customer.speech.timeout`
- `name`: (Optional) Custom name to identify the hook

**Action Types:**
- `say`: Speak a message. Use `exact` for predetermined text or `prompt` for AI-generated responses
- `tool`: Execute a tool like `transferCall`, `function`, `endCall`, etc.

<Note>
The `call.endedReason` filter can be set to any of the [call ended reasons](/api-reference/calls/get#response.body.endedReason).  
The transfer destination type follows the [transfer call tool destinations](/api-reference/tools/create#request.body.transferCall.destinations) schema.
</Note>

## Example: Transfer on pipeline error

Transfer a call to a fallback number if a pipeline error occurs:

```json
{
  "hooks": [{
    "on": "call.ending",
    "filters": [{
      "type": "oneOf",
      "key": "call.endedReason",
      "oneOf": ["pipeline-error"]
    }],
    "do": [{
      "type": "tool",
      "tool": {
        "type": "transferCall",
        "destinations": [{
          "type": "number",
          "number": "+1234567890",
          "callerId": "+1987654321"
        }]
      }
    }]
  }]
}
```

You can also transfer to a SIP destination:

```json
{
  "hooks": [{
    "on": "call.ending",
    "filters": [{
      "type": "oneOf",
      "key": "call.endedReason",
      "oneOf": ["pipeline-error"]
    }],
    "do": [{
      "type": "tool",
      "tool": {
        "type": "transferCall",
        "destinations": [{
          "type": "sip",
          "sipUri": "sip:user@domain.com"
        }]
      }
    }]
  }]
}
```

## Example: Combine actions on pipeline error

Perform multiple actions—say a message, call a function, and transfer the call—when a pipeline error occurs:

```json
{
  "hooks": [{
    "on": "call.ending",
    "filters": [{
      "type": "oneOf",
      "key": "call.endedReason",
      "oneOf": ["pipeline-error"]
    }],
    "do": [
      {
        "type": "say",
        "exact": "I apologize for the technical difficulty. Let me transfer you to our support team."
      },
      {
        "type": "tool",
        "tool": {
          "type": "function",
          "function": {
            "name": "log_error",
            "parameters": {
              "type": "object",
              "properties": {
                "error_type": {
                  "type": "string",
                  "value": "pipeline_error"
                }
              }
            },
            "description": "Logs the error details for monitoring"
          },
          "async": true,
          "server": {
            "url": "https://your-server.com/api"
          }
        }
      },
      {
        "type": "tool",
        "tool": {
          "type": "transferCall",
          "destinations": [{
            "type": "number",
            "number": "+1234567890",
            "callerId": "+1987654321"
          }]
        }
      }
    ]
  }]
}
```
 
<Note>
Use `"oneOf": ["pipeline-error"]` as a catch-all filter for any pipeline-related error reason.
</Note>

## Example: Handle speech interruptions

Respond when the assistant's speech is interrupted by the customer:

```json
{
  "hooks": [{
    "on": "assistant.speech.interrupted",
    "do": [{
      "type": "say",
      "exact": ["Sorry about that", "Go ahead", "Please continue"]
    }]
  }]
}
```

Handle customer speech interruptions in a similar way:

```json
{
  "hooks": [{
    "on": "customer.speech.interrupted",
    "do": [{
      "type": "say",
      "exact": "I apologize for interrupting. Please continue."
    }]
  }]
}
```

## Example: Handle customer speech timeout

Respond when the customer doesn't speak within a specified time:

```json
{
  "hooks": [{
    "on": "customer.speech.timeout",
    "options": {
      "timeoutSeconds": 10,
      "triggerMaxCount": 2,
      "triggerResetMode": "onUserSpeech"
    },
    "do": [{
      "type": "say",
      "prompt": "Are you still there? Please let me know how I can help you."
    }],
    "name": "customer_timeout_check"
  }]
}
```

<Note>
The `customer.speech.timeout` hook supports special options:
- `timeoutSeconds`: How long to wait for customer speech (1-1000 seconds, default: 7.5)
- `triggerMaxCount`: Maximum times the hook triggers per call (1-10, default: 3)
- `triggerResetMode`: Whether to reset the trigger count when user speaks (default: "never")
</Note>

## Example: End call if user hasn't spoken for 30s

Assistant checks with the user at the 10 and 20s mark from when the user is silent, and ends the call after 30s of silence. 

```json
{
  "hooks": [
    {
      "hooks": [
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 10,
            "triggerMaxCount": 3,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [
            {
              "type": "say",
              "exact": "Are you still there? Please let me know how I can help you."
            }
          ]
        },
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 20,
            "triggerMaxCount": 3,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [
            {
              "type": "say",
              "prompt": "The user has not responded in 20s. Based on the above conversation in {{transcript}} ask the user if they need help or if not you will be ending the call"
            }
          ]
        }
      ]
    },
    {
      "hooks": [
        {
          "on": "customer.speech.timeout",
          "options": {
            "timeoutSeconds": 30,
            "triggerMaxCount": 3,
            "triggerResetMode": "onUserSpeech"
          },
          "do": [
            {
              "type" : "say",
              "exact" : "I'll be ending the call now, please feel free to call back at any time."
            },
            {
              "type": "tool",
              "tool": {
                "type": "endCall"
              }
            }
          ]
        }
      ]
    }
  ]
}
```


## Common use cases

- Transfer to a human agent on errors
- Route to a fallback system if the assistant fails
- Handle customer or assistant interruptions gracefully
- Prompt customers who become unresponsive during a call
- Log errors or events for monitoring

## Slack Webhook on Call Failure 

You can set up automatic Slack notifications when calls fail by combining assistant hooks with Slack webhooks. This is useful for monitoring call quality and getting immediate alerts when issues occur.

### Step 1: Generate a Slack webhook

Follow the [Slack webhook documentation](https://api.slack.com/messaging/webhooks) to create an incoming webhook:

1. Create a Slack app (if you don't have one already)
2. Enable incoming webhooks in your app settings
3. Create an incoming webhook for your desired channel
4. Copy the webhook URL (it will look like `YOUR_SLACK_WEBHOOK_URL_HERE`)

### Step 2: Create a serverless function

Set up a serverless function (using a service like [val.town](https://val.town)) to convert Vapi tool call requests into Slack messages:

```javascript
export default async function(req: Request): Promise<Response> {
  try {
    const json = await req.json();
    console.log(json);
    
    const callId = json.message.call.id;
    const reason = json.message.toolCalls[0].function.arguments.properties.callEndedReason.value;
    
    fetch("<your-slack-webhook-url>", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `🚨 Call Failed\nCall ID: ${callId}\nReason: ${reason}`
      }),
    });
    
    return Response.json({
      results: [{ 
        "result": "success", 
        "toolCallId": "hook-function-call" 
      }],
    });
  } catch (err) {
    console.error("JSON parsing error:", err);
    return new Response("Invalid JSON", { status: 400 });
  }
}
```

### Step 3: Configure the assistant hook

Add this hook configuration to your assistant to trigger Slack notifications on call failures:

```json
{
  "hooks": [{
    "on": "call.ending",
    "filters": [{
      "type": "oneOf",
      "key": "call.endedReason",
      "oneOf": ["pipeline-error"]
    }],
    "do": [{
      "type": "tool",
      "tool": {
        "type": "function",
        "function": {
          "name": "report_error",
          "parameters": {
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "value": "A call error occurred."
              }
            }
          },
          "description": "Reports a call error to Slack."
        },
        "async": false,
        "server": {
          "url": "<your-serverless-function-url>"
        }
      }
    }]
  }]
}
```

<Note>
Replace `<your-slack-webhook-url>` with your actual Slack webhook URL and `<your-serverless-function-url>` with your serverless function endpoint.
</Note>

---
title: Background speech denoising
description: Filter out noise and background speech while users are talking
---

## Overview

Background speech denoising helps create clearer conversations by filtering out unwanted sounds while users speak. Vapi offers two complementary denoising technologies that can be used independently or together for optimal results.

**In this guide, you'll learn to:**
- Enable Smart Denoising using Krisp technology (recommended for most users)
- Configure experimental Fourier denoising with customizable parameters
- Combine both methods for enhanced noise reduction
- Fine-tune settings for different environments

<Note>
**For most use cases, Smart Denoising alone provides excellent results.** Fourier denoising is a highly experimental feature that requires significant tuning and may not work well in all environments.
</Note>

## Denoising methods

### Smart Denoising (Krisp)

Smart Denoising uses Krisp's AI-powered technology to remove background noise in real-time. This method is highly effective for common noise sources like:
- Keyboard typing
- Background conversations
- Traffic and street noise
- Air conditioning and fans
- Pet sounds

### Fourier Denoising (Experimental)

Fourier denoising uses frequency-domain filtering to remove consistent background noise. This experimental method offers fine-grained control through multiple parameters and includes automatic media detection for TV/music/radio backgrounds.

<Warning>
Fourier denoising is highly experimental and comes with significant limitations:
- Requires extensive tweaking to work properly
- May not work well in all audio environments (e.g., when headphones are used)
- Can introduce audio artifacts or distortions
- Should only be used when Smart Denoising alone is insufficient

**For most users, Smart Denoising should be sufficient.** Only proceed with Fourier denoising if you have specific requirements and are prepared to test extensively.
</Warning>

## Configuration

Background speech denoising is configured through the `backgroundSpeechDenoisingPlan` property on your assistant:

<CodeBlocks>
```typescript title="TypeScript SDK"
import { VapiClient } from "@vapi-ai/server-sdk";

const vapi = new VapiClient({ 
  token: process.env.VAPI_API_KEY 
});

const assistant = await vapi.assistants.create({
  name: "Customer Support",
  backgroundSpeechDenoisingPlan: {
    // Enable Smart Denoising
    smartDenoisingPlan: {
      enabled: true
    },
    // Enable Fourier Denoising (optional)
    fourierDenoisingPlan: {
      enabled: true,
      mediaDetectionEnabled: true,
      staticThreshold: -35,
      baselineOffsetDb: -15,
      windowSizeMs: 3000,
      baselinePercentile: 85
    }
  }
});
```
```python title="Python SDK"
from vapi import Vapi
import os

client = Vapi(token=os.getenv("VAPI_API_KEY"))

assistant = client.assistants.create(
    name="Customer Support",
    backgroundSpeechDenoisingPlan={
        # Enable Smart Denoising
        "smartDenoisingPlan": {
            "enabled": True
        },
        # Enable Fourier Denoising (optional)
        "fourierDenoisingPlan": {
            "enabled": True,
            "mediaDetectionEnabled": True,
            "staticThreshold": -35,
            "baselineOffsetDb": -15,
            "windowSizeMs": 3000,
            "baselinePercentile": 85
        }
    }
)
```
```bash title="cURL"
curl -X POST "https://api.vapi.ai/assistant" \
     -H "Authorization: Bearer $VAPI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Customer Support",
       "backgroundSpeechDenoisingPlan": {
         "smartDenoisingPlan": {
           "enabled": true
         },
         "fourierDenoisingPlan": {
           "enabled": true,
           "mediaDetectionEnabled": true,
           "staticThreshold": -35,
           "baselineOffsetDb": -15,
           "windowSizeMs": 3000,
           "baselinePercentile": 85
         }
       }
     }'
```
</CodeBlocks>

## Smart Denoising configuration

Smart Denoising has a simple on/off configuration:

<ParamField path="smartDenoisingPlan.enabled" type="boolean" default="false">
  Enable or disable Krisp-powered smart denoising
</ParamField>

### Example: Smart Denoising only

<CodeBlocks>
```typescript title="TypeScript SDK"
const assistant = await vapi.assistants.create({
  name: "Support Agent",
  backgroundSpeechDenoisingPlan: {
    smartDenoisingPlan: {
      enabled: true
    }
  }
});
```
```python title="Python SDK"
assistant = client.assistants.create(
    name="Support Agent",
    backgroundSpeechDenoisingPlan={
        "smartDenoisingPlan": {
            "enabled": True
        }
    }
)
```
</CodeBlocks>

## Fourier Denoising configuration

Fourier denoising offers multiple parameters for fine-tuning:

<ParamField path="fourierDenoisingPlan.enabled" type="boolean" default="false">
  Enable or disable experimental Fourier denoising
</ParamField>

<ParamField path="fourierDenoisingPlan.mediaDetectionEnabled" type="boolean" default="true">
  Automatically detect and filter consistent background media (TV/music/radio)
</ParamField>

<ParamField path="fourierDenoisingPlan.staticThreshold" type="number" default="-35">
  Fallback threshold in dB when no baseline is established (-80 to 0)
</ParamField>

<ParamField path="fourierDenoisingPlan.baselineOffsetDb" type="number" default="-15">
  How far below the rolling baseline to filter audio, in dB (-30 to -5)
  - Lower values (e.g., -10) = more aggressive filtering
  - Higher values (e.g., -20) = more conservative filtering
</ParamField>

<ParamField path="fourierDenoisingPlan.windowSizeMs" type="number" default="3000">
  Rolling window size in milliseconds for baseline calculation (1000 to 30000)
  - Larger windows = slower adaptation, more stability
  - Smaller windows = faster adaptation, less stability
</ParamField>

<ParamField path="fourierDenoisingPlan.baselinePercentile" type="number" default="85">
  Percentile for baseline calculation (1 to 99)
  - Higher percentiles (e.g., 85) = focus on louder speech
  - Lower percentiles (e.g., 50) = include quieter speech
</ParamField>

### Example: Adding Fourier Denoising to Smart Denoising

<CodeBlocks>
```typescript title="TypeScript SDK"
const assistant = await vapi.assistants.create({
  name: "Call Center Agent",
  backgroundSpeechDenoisingPlan: {
    // Always enable Smart Denoising first
    smartDenoisingPlan: {
      enabled: true
    },
    // Add Fourier Denoising for additional filtering
    fourierDenoisingPlan: {
      enabled: true,
      mediaDetectionEnabled: true,
      // More aggressive filtering for noisy environments
      baselineOffsetDb: -10,
      // Faster adaptation for dynamic environments
      windowSizeMs: 2000,
      // Focus on louder, clearer speech
      baselinePercentile: 90
    }
  }
});
```
```python title="Python SDK"
assistant = client.assistants.create(
    name="Call Center Agent",
    backgroundSpeechDenoisingPlan={
        # Always enable Smart Denoising first
        "smartDenoisingPlan": {
            "enabled": True
        },
        # Add Fourier Denoising for additional filtering
        "fourierDenoisingPlan": {
            "enabled": True,
            "mediaDetectionEnabled": True,
            # More aggressive filtering for noisy environments
            "baselineOffsetDb": -10,
            # Faster adaptation for dynamic environments
            "windowSizeMs": 2000,
            # Focus on louder, clearer speech
            "baselinePercentile": 90
        }
    }
)
```
</CodeBlocks>

## Combined denoising

For maximum noise reduction, combine both methods. Processing order:
1. Smart Denoising (Krisp) processes first
2. Fourier Denoising processes the Krisp output

## Environment-specific configurations

### Quiet office environment

Minimal speech denoising for clear environments:

<CodeBlocks>
```typescript title="TypeScript SDK"
const assistant = await vapi.assistants.create({
  name: "Office Assistant",
  backgroundSpeechDenoisingPlan: {
    smartDenoisingPlan: {
      enabled: true
    }
    // No Fourier denoising needed
  }
});
```
```python title="Python SDK"
assistant = client.assistants.create(
    name="Office Assistant",
    backgroundSpeechDenoisingPlan={
        "smartDenoisingPlan": {
            "enabled": True
        }
        # No Fourier denoising needed
    }
)
```
</CodeBlocks>

### Noisy call center

Aggressive filtering for high-noise environments:

<CodeBlocks>
```typescript title="TypeScript SDK"
const assistant = await vapi.assistants.create({
  name: "Call Center Agent",
  backgroundSpeechDenoisingPlan: {
    smartDenoisingPlan: {
      enabled: true
    },
    fourierDenoisingPlan: {
      enabled: true,
      mediaDetectionEnabled: true,
      baselineOffsetDb: -10, // Aggressive filtering
      windowSizeMs: 2000,    // Fast adaptation
      baselinePercentile: 90 // Focus on clear speech
    }
  }
});
```
```python title="Python SDK"
assistant = client.assistants.create(
    name="Call Center Agent",
    backgroundSpeechDenoisingPlan={
        "smartDenoisingPlan": {
            "enabled": True
        },
        "fourierDenoisingPlan": {
            "enabled": True,
            "mediaDetectionEnabled": True,
            "baselineOffsetDb": -10,  # Aggressive filtering
            "windowSizeMs": 2000,      # Fast adaptation
            "baselinePercentile": 90   # Focus on clear speech
        }
    }
)
```
</CodeBlocks>

### Home environment with TV/music

Optimized for media background noise:

<CodeBlocks>
```typescript title="TypeScript SDK"
const assistant = await vapi.assistants.create({
  name: "Home Assistant",
  backgroundSpeechDenoisingPlan: {
    smartDenoisingPlan: {
      enabled: true
    },
    fourierDenoisingPlan: {
      enabled: true,
      mediaDetectionEnabled: true, // Essential for TV/music
      baselineOffsetDb: -15,
      windowSizeMs: 4000,
      baselinePercentile: 80
    }
  }
});
```
```python title="Python SDK"
assistant = client.assistants.create(
    name="Home Assistant",
    backgroundSpeechDenoisingPlan={
        "smartDenoisingPlan": {
            "enabled": True
        },
        "fourierDenoisingPlan": {
            "enabled": True,
            "mediaDetectionEnabled": True,  # Essential for TV/music
            "baselineOffsetDb": -15,
            "windowSizeMs": 4000,
            "baselinePercentile": 80
        }
    }
)
```
</CodeBlocks>

## Best practices

<Tip>
**For most users, Smart Denoising alone is the recommended solution.** It handles the vast majority of common noise scenarios effectively without configuration complexity. Only consider adding Fourier denoising if you have specific requirements that Smart Denoising cannot address.
</Tip>

### When to use each method

**Smart Denoising only:**
- General-purpose noise reduction
- Unpredictable noise patterns
- When simplicity is preferred

**Smart Denoising + Fourier Denoising:**
- Maximum noise reduction required
- Consistent background noise that Smart Denoising alone cannot fully handle
- Complex acoustic environments with media (TV/music/radio)
- Premium user experiences requiring fine-tuned control
- Willing to invest time in testing and tuning
- Not using headphones (Fourier may cause issues with headphone audio)

<Note>
Fourier Denoising should never be used alone. It's designed to complement Smart Denoising by providing additional filtering after Krisp has done the initial noise reduction.
</Note>

### Performance considerations

**Audio quality**: Aggressive filtering may affect voice quality. Test different settings to find the right balance between noise reduction and natural speech preservation.

### Testing recommendations

1. Test in your target environment
2. Start with default settings
3. Adjust parameters incrementally
4. Monitor user feedback
5. A/B test different configurations

## Troubleshooting fourier denoising

<AccordionGroup>
  <Accordion title="Voice sounds robotic or distorted">
    Reduce filtering aggressiveness:
    - Increase `baselineOffsetDb` (e.g., -20 instead of -15)
    - Decrease `baselinePercentile` (e.g., 75 instead of 85)
    - Try Smart Denoising only
  </Accordion>
  <Accordion title="Background noise still audible">
    Increase filtering:
    - Enable both denoising methods
    - Decrease `baselineOffsetDb` (e.g., -12 instead of -15)
    - Ensure `mediaDetectionEnabled` is true for TV/music
  </Accordion>
  <Accordion title="Speech cutting out intermittently">
    Adjust detection sensitivity:
    - Increase `windowSizeMs` for more stability
    - Adjust `staticThreshold` if baseline isn't establishing
    - Check if user's voice level is consistent
  </Accordion>
</AccordionGroup>

---
title: Pronunciation dictionaries
subtitle: Control how your AI assistant pronounces specific words and phrases
slug: assistants/pronunciation-dictionaries
---

## Overview

Pronunciation dictionaries allow you to customize how your AI assistant pronounces specific words, names, acronyms, or technical terms. This feature is particularly useful for ensuring consistent pronunciation of brand names, proper nouns, or industry-specific terminology that might be mispronounced by default.

**Note:** Pronunciation dictionaries are exclusive to ElevenLabs voices and require specific model configurations.

## How Pronunciation Dictionaries Work

<Steps>
  <Step title="Create Pronunciation Rules">
    Define specific words or phrases and how they should be pronounced using either phonetic notation or word substitutions.
  </Step>

  <Step title="Upload Dictionary to Vapi">
    Create a pronunciation dictionary through Vapi's API with your custom rules.
  </Step>

  <Step title="Configure Your Assistant">
    Associate the pronunciation dictionary with your assistant's voice configuration.
  </Step>

  <Step title="Automatic Application">
    When your assistant encounters the specified words during conversation, it will use your custom pronunciations automatically.
  </Step>
</Steps>

## Sample Audio Examples

Below are examples demonstrating the difference between pronunciations with and without pronunciation dictionaries:

Corrected pronunciations:
- "Nginx" → "Engine-X" (using alias rule)
- "Kubernetes" → "/ˌkuːbərˈneɪtiːz/" (using phoneme rule)

**Without Pronunciation Dictionary:**
<audio controls src="file:eb5a0ab5-a861-4a37-a9fd-59ff006dbf37">Your browser does not support the audio element.</audio>

**With Pronunciation Dictionary:**
<audio controls src="file:4333dfec-d345-40bc-8127-7dabd3fb9c4e">Your browser does not support the audio element.</audio>


## Prerequisites

- A Vapi assistant configured with an ElevenLabs voice
- Understanding of phonetic notation (IPA or CMU Arpabet) for phoneme-based rules
- Access to Vapi's API for dictionary creation

## Types of Pronunciation Rules

### Phoneme Rules

Phoneme rules specify exact pronunciation using phonetic alphabets. These provide the most precise control over pronunciation.

**Supported Alphabets:**
- **IPA (International Phonetic Alphabet)**: More universal, uses symbols like `/tə'meɪtoʊ/`
- **CMU Arpabet**: ASCII-based format, uses notation like `T AH M EY T OW`

**Model Compatibility:**
Phoneme rules only work with specific ElevenLabs models:
- `eleven_turbo_v2`
- `eleven_flash_v2`

### Alias Rules

Alias rules replace words with alternative spellings or phrases. These work with all ElevenLabs models and are useful for:
- Converting acronyms to full phrases (e.g., "UN" → "United Nations")
- Providing phonetic spellings for difficult words
- Standardizing pronunciation across different contexts

## Implementation

<Steps>
  <Step title="Create a Pronunciation Dictionary">
    Use Vapi's API to create a pronunciation dictionary with your custom rules.

    ```bash
    POST https://api.vapi.ai/provider/11labs/pronunciation-dictionary
    Content-Type: application/json
    Authorization: Bearer YOUR_API_KEY
    ```

    ```json
    {
      "name": "My Custom Dictionary",
      "rules": [
        {
          "stringToReplace": "tomato",
          "type": "phoneme",
          "phoneme": "/tə'meɪtoʊ/",
          "alphabet": "ipa"
        },
        {
          "stringToReplace": "Vapi",
          "type": "phoneme", 
          "phoneme": "V AE P IY",
          "alphabet": "cmu-arpabet"
        },
        {
          "stringToReplace": "UN",
          "type": "alias",
          "alias": "United Nations"
        }
      ]
    }
    ```

    The API will respond with:
    ```json
    {
      "pronunciationDictionaryId": "rjshI10OgN6KxqtJBqO4",
      "versionId": "xJl0ImZzi3cYp61T0UQG",
      "name": "My Custom Dictionary",
      "rules": [...],
      "createdAt": "2024-01-15T10:30:00Z"
    }
    ```
  </Step>

  <Step title="Configure Your Assistant's Voice">
    Update your assistant configuration to use the pronunciation dictionary.

    ```json
    {
      "voice": {
        "model": "eleven_turbo_v2_5",
        "voiceId": "sarah",
        "provider": "11labs",
        "stability": 0.5,
        "similarityBoost": 0.75,
        "pronunciationDictionaryLocators": [
          {
            "pronunciationDictionaryId": "rjshI10OgN6KxqtJBqO4",
            "versionId": "xJl0ImZzi3cYp61T0UQG"
          }
        ]
      }
    }
    ```

    <Note>
      When a pronunciation dictionary is added, SSML parsing will be automatically enabled for your assistant.
    </Note>
  </Step>

  <Step title="Test Your Pronunciation">
    Create a test call or use the Vapi playground to verify that your custom pronunciations are working correctly.
  </Step>
</Steps>

## Using Your Own ElevenLabs Account (BYOK)

If you're using your own ElevenLabs API key (Bring Your Own Key), you can create pronunciation dictionaries directly in your ElevenLabs account and reference them in Vapi:

1. Create a pronunciation dictionary in your ElevenLabs account
2. Note the `pronunciationDictionaryId` and `versionId` from ElevenLabs
3. Use these IDs in your Vapi assistant configuration:

```json
{
  "voice": {
    "model": "eleven_turbo_v2_5",
    "voiceId": "your-voice-id",
    "provider": "11labs",
    "pronunciationDictionaryLocators": [
      {
        "pronunciationDictionaryId": "your-elevenlabs-dict-id",
        "versionId": "your-elevenlabs-version-id"
      }
    ]
  }
}
```

## Managing Pronunciation Dictionaries

### List Your Dictionaries

```bash
GET https://api.vapi.ai/provider/11labs/pronunciation-dictionary
Authorization: Bearer YOUR_API_KEY
```

### Update Dictionary Rules

```bash
PATCH https://api.vapi.ai/provider/11labs/pronunciation-dictionary/{dictionaryId}
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

```json
{
  "rules": [
    {
      "stringToReplace": "tomato",
      "type": "phoneme",
      "phoneme": "/tə'mɑːtoʊ/",
      "alphabet": "ipa"
    }
  ]
}
```

## Best Practices

<Note>
- **Case Sensitivity**: Pronunciation dictionary searches are case-sensitive. Create separate entries for different capitalizations if needed.
- **Order Matters**: Rules are applied in the order they appear in the dictionary. The first matching rule is used.
- **Testing**: Always test pronunciation changes with your specific voice and model combination.
- **Phoneme Accuracy**: Ensure proper stress marking for multi-syllable words when using phoneme rules.
- **Model Compatibility**: Remember that phoneme rules only work with specific ElevenLabs models.
</Note>

## Common Issues

**Pronunciation Not Applied**
- Verify you're using a compatible ElevenLabs model for phoneme rules
- Check that the `stringToReplace` exactly matches the text in your content (case-sensitive)
- Ensure the pronunciation dictionary is properly referenced in your voice configuration

**SSML Conflicts**
- When pronunciation dictionaries are enabled, SSML parsing is automatically activated
- Ensure any existing SSML tags in your content are properly formatted

**Performance Impact**
- Large dictionaries may slightly increase processing time
- Consider organizing rules by frequency of use for optimal performance 

---
title: Speech configuration
subtitle: Control when your assistant starts and stops speaking
slug: customization/speech-configuration
---

## Overview

Speech configuration lets you control exactly when your assistant starts and stops speaking during a conversation. By tuning these settings, you can make your assistant feel more natural, avoid interrupting the customer, and reduce awkward pauses.

<Note>
  Speech speed can be controlled, but only PlayHT currently supports this
  feature with the `speed` field. Other providers do not currently support
  speed.
</Note>

The two main components are:

- **Speaking Plan**: Controls when the assistant begins speaking after the customer finishes or pauses.
- **Stop Speaking Plan**: Controls when the assistant stops speaking if the customer starts talking.

Fine-tuning these plans helps you adapt the assistant's responsiveness to your use case—whether you want fast, snappy replies or a more patient, human-like conversation flow.

<Note>Currently, these configurations can only be set via API.</Note>

The rest of this page explains each setting and provides practical examples for different scenarios.

## Start Speaking Plan

This plan defines the parameters for when the assistant begins speaking after the customer pauses or finishes.

- **Wait Time Before Speaking**: You can set how long the assistant waits before speaking after the customer finishes. The default is 0.4 seconds, but you can increase it if the assistant is speaking too soon, or decrease it if there's too much delay.
  **Example:** For tech support calls, set `waitSeconds` for the assistant to more than 1.0 seconds to give customers time to complete their thoughts, even if they have some pauses in between.

- **Smart Endpointing Plan**: This feature uses advanced processing to detect when the customer has truly finished speaking, especially if they pause mid-thought.

  In general, turn-taking includes the following tasks:

  - **End-of-turn prediction** - predicting when the current speaker is likely to finish their turn.
  - **Backchannel prediction** - detecting moments where a listener may provide short verbal acknowledgments like "uh-huh", "yeah", etc. to show engagement, without intending to take over the speaking turn. This is better handled by the assistant's stopSpeakingPlan.

  We offer different providers that can be audio-based, text-based, or audio-text based:

  **Audio-based providers:**

  - **Krisp**: Audio-based model that analyzes prosodic and acoustic features such as changes in intonation, pitch, and rhythm to detect when users finish speaking. Since it's audio-based, it always notifies when the user is done speaking, even for brief acknowledgments. Vapi offers configurable acknowledgement words and a well-configured stop speaking plan to handle this properly.

    Configure Krisp with a threshold between 0 and 1 (default 0.5), where 1 means the user definitely stopped speaking and 0 means they're still speaking. Use lower values for snappier conversations and higher values for more conservative detection.

    When interacting with an AI agent, users may genuinely want to interrupt to ask a question or shift the conversation, or they might simply be using backchannel cues like "right" or "okay" to signal they're actively listening. The core challenge lies in distinguishing meaningful interruptions from casual acknowledgments. Since the audio-based model signals end-of-turn after each word, configure the stop speaking plan with the right number of words to interrupt, interruption settings, and acknowledgement phrases to handle backchanneling properly.

  **Audio-text based providers:**

  - **Deepgram Flux**: Deepgram's latest transcriber model with built-in conversational speech recognition. Flux combines high-quality speech-to-text with native turn detection, while delivering ultra-low latency and Nova-3 level accuracy.

  - **Assembly**: Transcriber that also reports end-of-turn detection. To use Assembly, choose it as your transcriber without setting a separate smart endpointing plan. As transcripts arrive, we consider the `end_of_turn` flag that Assembly sends to mark the end-of-turn, stream to the LLM, and generate a response.

  **Text-based providers:**

  - **Off**: Disabled by default. When smart endpointing is set to "Off", the system will automatically use the transcriber's end-of-turn detection if available. If no transcriber EOT detection is available, the system defaults to LiveKit if the language is set to English or to Vapi's standard endpointing mode.
  - **LiveKit**: Recommended for English conversations as it provides the most sophisticated solution for detecting natural speech patterns and pauses. LiveKit can be fine-tuned using the `waitFunction` parameter to adjust response timing based on the probability that the user is still speaking.
  - **Vapi**: Recommended for non-English conversations or as an alternative when LiveKit isn't suitable

  ![LiveKit Smart Endpointing Configuration](file:ce67da3b-3806-4589-8b4a-4c3b769e17f7)

  **LiveKit Smart Endpointing Configuration:**
  When using LiveKit, you can customize the `waitFunction` parameter which determines how long the bot will wait to start speaking based on the likelihood that the user has finished speaking:

  ```
  waitFunction: "200 + 8000 * x"
  ```

  This function maps probabilities (0-1) to milliseconds of wait time. A probability of 0 means high confidence the caller has stopped speaking, while 1 means high confidence they're still speaking. The default function (`200 + 8000 * x`) creates a wait time between 200ms (when x=0) and 8200ms (when x=1). You can customize this with your own mathematical expression, such as `4000 * (1 - cos(pi * x))` for a different response curve.

  **Example:** In insurance claims, smart endpointing helps avoid interruptions while customers think through complex responses. For instance, when the assistant asks "do you want a loan," the system can intelligently wait for the complete response rather than interrupting after the initial "yes" or "no." For responses requiring number sequences like "What's your account number?", the system can detect natural pauses between digits without prematurely ending the customer's turn to speak.

- **Transcription-Based Detection**: Customize how the assistant determines that the customer has stopped speaking based on what they're saying. This offers more control over the timing. **Example:** When a customer says, "My account number is 123456789, I want to transfer $500."
  - The system detects the number "123456789" and waits for 0.5 seconds (`WaitSeconds`) to ensure the customer isn't still speaking.
  - If the customer were to finish with an additional line, "I want to transfer $500.", the system uses `onPunctuationSeconds` to confirm the end of the speech and then proceed with the request processing.
  - In a scenario where the customer has been silent for a long and has already finished speaking but the transcriber is not confident to punctuate the transcription, `onNoPunctuationSeconds` is used for 1.5 seconds.

## Stop Speaking Plan

The Stop Speaking Plan defines when the assistant stops talking after detecting customer speech.

- **Words to Stop Speaking**: Define how many words the customer needs to say before the assistant stops talking. If you want immediate reaction, set this to 0. Increase it to avoid interruptions by brief acknowledgments like "okay" or "right". **Example:** While setting an appointment with a clinic, set `numWords` to 2-3 words to allow customers to finish brief clarifications without triggering interruptions.

- **Voice Activity Detection**: Adjust how long the customer needs to be speaking before the assistant stops. The default is 0.2 seconds, but you can tweak this to balance responsiveness and avoid false triggers.
  **Example:** For a banking call center, setting a higher `voiceSeconds` value ensures accuracy by reducing false positives. This avoids interruptions caused by background sounds, even if it slightly delays the detection of speech onset. This tradeoff is essential to ensure the assistant processes only correct and intended information.

- **Pause Before Resuming**: Control how long the assistant waits before starting to talk again after being interrupted. The default is 1 second, but you can adjust it depending on how quickly the assistant should resume.
  **Example:** For quick queries (e.g., "What's the total order value in my cart?"), set `backoffSeconds` to 1 second.

Here's a code snippet for Stop Speaking Plan -

```json
 "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1
  }
```

## Considerations for Configuration

- **Customer Style**: Think about whether the customer pauses mid-thought or provides continuous speech. Adjust wait times and enable smart endpointing as needed.

- **Background Noise**: If there's a lot of background noise, you may need to tweak the settings to avoid false triggers. Default for phone calls is 'office' and default for web calls is 'off'.

```json
  "backgroundSound": "off",
```

- **Conversation Flow**: Aim for a balance where the assistant is responsive but not intrusive. Test different settings to find the best fit for your needs.

---
title: Voice pipeline configuration
subtitle: Configure start and stop speaking plans for natural conversation flow
slug: customization/voice-pipeline-configuration
description: >-
  Complete guide to configuring VAPI's voice pipeline for optimal conversation
  timing and interruption handling
---

## Overview

Configure VAPI's voice pipeline to create natural conversation experiences through precise timing control. This guide covers how voice data moves through processing stages and how to optimize endpointing and interruption detection.

**Voice pipeline configuration enables you to:**

- Fine-tune conversation timing for specific use cases
- Control when and how your assistant begins responding
- Configure interruption detection and recovery behavior
- Optimize response timing for different languages and contexts

For implementation examples, see **[Configuration examples](#configuration-examples)**.

## Quick start

### English conversations (recommended)

```json
{
  "startSpeakingPlan": {
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "2000 / (1 + exp(-10 * (x - 0.5)))"
    },
    "waitSeconds": 0.4
  },
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.0
  }
}
```

**What this provides:**

- Smart endpointing detects when users finish speaking (English only)
- Fast interruption using voice detection (50-100ms response)
- Natural timing with balanced wait periods

### Non-English languages

```json
{
  "startSpeakingPlan": {
    "transcriptionEndpointingPlan": {
      "onPunctuationSeconds": 0.1,
      "onNoPunctuationSeconds": 1.5,
      "onNumberSeconds": 0.5
    },
    "waitSeconds": 0.4
  },
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.0
  }
}
```

**What this provides:**

- Text-based endpointing works with any language
- Punctuation detection for natural conversation flow
- Same fast interruption and timing as English setup

## Voice pipeline flow

### Complete processing pipeline

```
User Audio → VAD → Transcription → Start Speaking Decision → LLM → TTS → waitSeconds → Assistant Audio
```

### Start speaking process

<Steps>
  <Step title="User stops speaking">
    Voice Activity Detection (VAD) detects utterance-stop
  </Step>
  <Step title="Endpointing decision">
    System evaluates completion using this priority order:
    1. **Transcriber EOT detection** (if transcriber has built-in EOT and no smart endpointing plan)
    2. **Custom Rules** (highest priority when configured)
    3. **Smart Endpointing Plan** (LiveKit for English, Vapi for non-English)
  </Step>
  <Step title="Response generation">
    LLM request sent immediately → TTS processes → waitSeconds applied →
    Assistant speaks
  </Step>
</Steps>

### Stop speaking process

<Steps>
  <Step title="User starts speaking">
    VAD detects utterance-start during assistant speech
  </Step>
  <Step title="Interruption evaluation">
    System checks for: - `interruptionPhrases` → Instant pipeline clear -
    `acknowledgementPhrases` → Ignore interruption - Threshold evaluation based
    on `numWords` setting
  </Step>
  <Step title="Pipeline management">
    If threshold met → Clear pipeline → Apply `backoffSeconds` → Ready for next
    input
  </Step>
</Steps>

## Start speaking plan

The start speaking plan determines when your assistant begins responding after a user stops talking.

### Transcription endpointing

Analyzes transcription text to determine user completion based on patterns like punctuation and numbers.

<Note>
This plan is only used if `smartEndpointingPlan` is not set and transcriber does not have built-in endpointing capabilities. If both are provided, `smartEndpointingPlan` takes precedence. This plan will also be overridden by any matching `customEndpointingRules`.
</Note>

<Tabs>
  <Tab title="Configuration">
    ```json
    {
      "startSpeakingPlan": {
        "transcriptionEndpointingPlan": {
          "onPunctuationSeconds": 0.1,
          "onNoPunctuationSeconds": 1.5,
          "onNumberSeconds": 0.5
        },
        "waitSeconds": 0.4
      }
    }
    ```
  </Tab>
  <Tab title="Properties">
    **onPunctuationSeconds** (Default: 0.1)  
    Wait time after punctuation marks are detected

    **onNoPunctuationSeconds** (Default: 1.5)
    Wait time when no punctuation is detected

    **onNumberSeconds** (Default: 0.5)
    Wait time after numbers are detected

  </Tab>
</Tabs>

**When to use:**

- Non-English languages (LiveKit not supported)
- Fallback when smart endpointing unavailable
- Predictable, rule-based endpointing behavior

### Smart endpointing

Uses AI models to analyze speech patterns, context, and audio cues to predict when users have finished speaking. Only available for English conversations.

**Important:** If your transcriber has built-in end-of-turn detection (like Deepgram Flux or Assembly) and you don't configure a smart endpointing plan, the system will automatically use the transcriber's EOT detection instead of smart endpointing.

<Tabs>
  <Tab title="Configuration">
    ```json
    {
      "startSpeakingPlan": {
        "smartEndpointingPlan": {
          "provider": "livekit",
          "waitFunction": "2000 / (1 + exp(-10 * (x - 0.5)))"
        },
        "waitSeconds": 0.4
      }
    }
    ```
  </Tab>
  <Tab title="Providers">
    **Text-based providers:**
    - **livekit**: Advanced model trained on conversation data (English only)
    - **vapi**: VAPI-trained model (non-English conversations or LiveKit alternative)
    
    **Audio-based providers:**
    - **krisp**: Audio-based model analyzing prosodic features (intonation, pitch, rhythm)
    
    **Audio-text based providers:**
    - **deepgram-flux**: Deepgram's latest transcriber model with built-in conversational speech recognition. (English only)
    - **assembly**: Transcriber with built-in end-of-turn detection (English only)

  </Tab>
</Tabs>

**When to use:**

- **Deepgram Flux**: English conversations using Deepgram as a transcriber. 
- **Assembly**: Best used when Assembly is already your transcriber provider for English conversations with integrated end-of-turn detection
- **LiveKit**: English conversations where Deepgram is not the transcriber of choice.
- **Vapi**: Non-English conversations with default stop speaking plan settings
- **Krisp**: Non-English conversations with a robustly configured stop speaking plan

### Deepgram Flux configuration

Deepgram Flux's end-of-turn detection is configured at the transcriber level, allowing you to fine-tune how aggressive or conservative the bot should be in detecting when users finish speaking. Do NOT set a `smartEndpointingPlan` to leverage Deepgram's end-of-turn events.

**Configuration parameters:**

- **eotThreshold** (Default: 0.7): Confidence level required to trigger end-of-turn detection
  - **0.5-0.6:** Aggressive detection - responds quickly but may interrupt users mid-sentence
  - **0.6-0.8:** Balanced detection (default: 0.7) - good balance between responsiveness and accuracy
  - **0.9-1.0:** Conservative detection - waits longer to ensure users have finished speaking

- **eotTimeoutMs** (Default: 5000): Maximum wait time in milliseconds before forcing turn end
  - **2000-3000:** Fast timeout for quick interactions
  - **4000-6000:** Standard timeout (default: 5000) - natural conversation flow
  - **7000-10000:** Extended timeout for complex or thoughtful responses

**Configuration example:**

```json
{
  "transcriber": {
    "provider": "deepgram",
    "model": "flux-general-en",
    "language": "en",
    "eotThreshold": 0.7,
    "eotTimeoutMs": 5000
  }
}
```

### LiveKit's Wait function

Mathematical expression that determines wait time based on speech completion probability. The function takes a confidence value (0-1) and returns a wait time in milliseconds.

**Aggressive (Fast Response):**

```json
"waitFunction": "2000 / (1 + exp(-10 * (x - 0.5)))"
```

- **Behavior:** Responds quickly when confident user is done speaking
- **Use case:** Customer service, gaming, real-time interactions
- **Timing:** ~200ms wait at 50% confidence, ~50ms at 90% confidence

**Normal (Balanced):**

```json
"waitFunction": "(20 + 500 * sqrt(x) + 2500 * x^3 + 700 + 4000 * max(0, x-0.5)) / 2"
```

- **Behavior:** Waits for natural pauses in conversation
- **Use case:** Most conversations, general purpose
- **Timing:** ~800ms wait at 50% confidence, ~300ms at 90% confidence

**Conservative (Careful Response):**

```json
"waitFunction": "700 + 4000 * max(0, x-0.5)"
```

- **Behavior:** Very patient, rarely interrupts users
- **Use case:** Healthcare, formal settings, sensitive conversations
- **Timing:** ~2700ms wait at 50% confidence, ~700ms at 90% confidence

### Vapi heuristic endpointing

Vapi's text-based endpointing uses heuristic rules to analyze transcription patterns and determine when users have finished speaking. The system applies these rules in priority order using the `transcriptionEndpointingPlan` settings:

**Heuristic priority order:**

1. **Number detection**: If the latest message ends with a number, waits for `onNumberSeconds` (default: 0.5)
2. **Punctuation detection**: If the message contains punctuation, waits for `onPunctuationSeconds` (default: 0.1)
3. **No punctuation fallback**: If no punctuation is detected, waits for `onNoPunctuationSeconds` (default: 1.5)
4. **Default**: If no rules match, waits 0ms (immediate response)

**How it works:**

The system continuously analyzes the latest user message and applies the first matching rule. Each rule sets a specific timeout delay before triggering the end-of-turn event.

**Configuration example:**

```json
{
  "startSpeakingPlan": {
    "smartEndpointingPlan": {
      "provider": "vapi"
    },
    "transcriptionEndpointingPlan": {
      "onPunctuationSeconds": 0.1,
      "onNoPunctuationSeconds": 1.5,
      "onNumberSeconds": 0.5
    }
  }
}
```

**When to use:**

- Non-English conversations where LiveKit isn't available
- Scenarios requiring predictable, rule-based endpointing behavior
- Fallback option when other smart endpointing providers aren't suitable

### Krisp threshold configuration

Krisp's audio-base model returns a probability between 0 and 1, where 1 means the user definitely stopped speaking and 0 means they're still speaking.

**Threshold settings:**

- **0.0-0.3:** Very aggressive detection - responds quickly but may interrupt users mid-sentence
- **0.4-0.6:** Balanced detection (default: 0.5) - good balance between responsiveness and accuracy
- **0.7-1.0:** Conservative detection - waits longer to ensure users have finished speaking

**Configuration example:**

```json
{
  "startSpeakingPlan": {
    "smartEndpointingPlan": {
      "provider": "krisp",
      "threshold": 0.5
    }
  }
}
```

**Important considerations:**
Since Krisp is audio-based, it always notifies when the user is done speaking, even for brief acknowledgments. Configure the stop speaking plan with appropriate `acknowledgementPhrases` and `numWords` settings to handle backchanneling properly.

### Assembly turn detection

AssemblyAI's turn detection model uses a neural network to detect when someone has finished speaking. The model understands the meaning and flow of speech to make better decisions about when a turn has ended.

When the model detects an end-of-turn, it returns `end_of_turn=True` in the response.

**Quick start configurations:**

To use Assembly's turn detection, set Assembly as your transcriber provider and configure these fields in the assistant's transcriber (**do not set any smartEndpointingPlan**):

**Aggressive (Fast Response):**

```json
{
  "endOfTurnConfidenceThreshold": 0.4,
  "minEndOfTurnSilenceWhenConfident": 160,
  "maxTurnSilence": 400
}
```

- **Use cases:** Agent Assist, IVR replacements, Retail/E-commerce, Telecom
- **Behavior:** Ends turns very quickly, optimized for short responses

**Balanced (Natural Flow):**

```json
{
  "endOfTurnConfidenceThreshold": 0.4,
  "minEndOfTurnSilenceWhenConfident": 400,
  "maxTurnSilence": 1280
}
```

- **Use cases:** Customer Support, Tech Support, Financial Services, Travel & Hospitality
- **Behavior:** Natural middle ground, allowing enough pause for conversational turns

**Conservative (Patient Response):**

```json
{
  "endOfTurnConfidenceThreshold": 0.7,
  "minEndOfTurnSilenceWhenConfident": 800,
  "maxTurnSilence": 3600
}
```

- **Use cases:** Healthcare, Mental Health Support, Sales & Consulting, Legal & Insurance
- **Behavior:** Holds the floor longer, optimized for reflective or complex speech

For detailed information about how Assembly's turn detection works, see the [AssemblyAI Turn Detection documentation](https://www.assemblyai.com/docs/speech-to-text/universal-streaming/turn-detection).

### Wait seconds

Final audio delay applied after all processing completes, before the assistant speaks.

**Range:** 0-5 seconds (Default: 0.4)

**Recommended settings:**

- **0.0-0.2:** Gaming, real-time interactions
- **0.3-0.5:** Standard conversations, customer service
- **0.6-0.8:** Healthcare, formal settings

#### Pipeline timing relationship

`waitSeconds` is applied at the END of the voice pipeline processing:

```
Endpointing Triggers → LLM Processes → TTS Generates → waitSeconds Delay → Assistant Speaks
```

**Relationship with other timing components:**

- **Endpointing timing:** Varies by method (smart vs transcription)
- **LLM processing:** ~800ms average for standard responses
- **TTS generation:** ~500ms average for short responses
- **waitSeconds:** Applied as final delay before audio output

#### Complete pipeline timeline

Understanding exact timing helps optimize your voice pipeline configuration. This timeline shows what happens at every moment during the conversation flow.

```
0.0s: User stops speaking
0.1s: Smart endpointing evaluation begins
0.6s: Smart endpointing triggers (varies by waitFunction)
0.6s: LLM request sent immediately
1.4s: LLM response received (0.8s processing)
1.9s: TTS audio generated (0.5s processing)
1.9s: waitSeconds (0.4s) starts
2.3s: Assistant begins speaking
```

**Total Response Time:** Smart Endpointing (0.6s) + LLM (0.8s) + TTS (0.5s) + waitSeconds (0.4s) = **2.3s**

**Key optimization insights:**

- The 0.6s endpointing time varies based on your waitFunction choice
- Aggressive functions reduce endpointing to ~0.2s
- Conservative functions increase endpointing to ~2.7s
- Total response time ranges from 1.9s (aggressive) to 4.7s (conservative)

### Custom endpointing rules

Highest priority rules that override all other endpointing decisions when patterns match.

```json
{
  "customEndpointingRules": [
    {
      "type": "assistant",
      "regex": "(phone|email|address)",
      "timeoutSeconds": 3.0
    },
    {
      "type": "user",
      "regex": "\\d{3}-\\d{3}-\\d{4}",
      "timeoutSeconds": 2.0
    }
  ]
}
```

**Use cases:**

- **Data collection:** Extended wait times for phone numbers, addresses
- **Spelling:** Extra time for letter-by-letter input
- **Complex responses:** Additional processing time for detailed information

## Stop speaking plan

The stop speaking plan controls how interruptions are detected and handled when users speak while the assistant is talking.

### Number of words

Sets the interruption detection method and threshold.

**VAD-based (numWords = 0):**

```json
{
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.2
  }
}
```

- **How it works:** Uses Voice Activity Detection for faster interruption (50-100ms)
- **Benefits:** Language independent, very responsive
- **Considerations:** More sensitive to background noise

**Transcription-based (numWords > 0):**

```json
{
  "stopSpeakingPlan": {
    "numWords": 2
  }
}
```

- **How it works:** Waits for specified number of transcribed words
- **Benefits:** More accurate, reduces false positives
- **Considerations:** Slower response (200-500ms delay)

**Range:** 0-10 words (Default: 0)

### Voice seconds

VAD duration threshold when `numWords = 0`. Determines how long voice activity must be detected before triggering an interruption.

**Range:** 0-0.5 seconds (Default: 0.2)

**Recommended settings:**

- **0.1:** Very sensitive (risk of background noise triggering)
- **0.2:** Balanced sensitivity (recommended)
- **0.4:** Conservative (reduces false positives)

#### The numWords=0 and voiceSeconds relationship

When `numWords = 0`, the voice pipeline uses **Voice Activity Detection (VAD)** instead of waiting for transcription:

```
User Starts Speaking → VAD Detects Voice → Continuous for voiceSeconds Duration → Interrupt Assistant
```

**Why this matters:**

- **Faster:** VAD detection ~50-100ms vs transcription 200-500ms
- **More sensitive:** Detects "um", "uh", throat clearing, background noise
- **Language independent:** Works with any language

### Backoff seconds

Duration that blocks all assistant audio output after user interruption, creating a recovery period.

**Range:** 0-10 seconds (Default: 1.0)

**Recommended settings:**

- **0.5:** Quick recovery for fast-paced interactions
- **1.0:** Natural pause for most conversations
- **2.0:** Deliberate pause for formal settings

#### Pipeline timing relationship

```
User Interrupts → Assistant Audio Stopped → backoffSeconds Blocks All Output → Ready for New Input
```

**Relationship with waitSeconds:**

- `backoffSeconds`: Applied during interruption (blocks output)
- `waitSeconds`: Applied to normal responses (delays output)
- **Sequential, not cumulative:** `backoffSeconds` completes first, then normal flow resumes with `waitSeconds`

#### Complete interruption timeline

**How to read this timeline:** This shows the complete flow from interruption to recovery. Notice how backoffSeconds creates a "quiet period" before normal processing resumes.

```
0.0s: Assistant speaking: "I can help you book..."
1.2s: User interrupts: "Actually, wait"
1.2s: backoffSeconds (1.0s) starts → All audio blocked
2.2s: backoffSeconds completes → Ready for new input
2.5s: User says: "What about tomorrow?"
3.0s: Endpointing triggers → LLM processes
3.8s: TTS completes → waitSeconds (0.4s) starts
4.2s: Assistant responds: "For tomorrow..."
```

**Total Recovery Time:** backoffSeconds (1.0s) + normal processing (1.8s) + waitSeconds (0.4s) = **3.2s**

**Key insight:** Adjust backoffSeconds based on how quickly you want the assistant to recover from interruptions. Healthcare might use 2.0s for deliberate pauses, while gaming might use 0.5s for quick recovery.

## Configuration examples

### E-commerce customer support

```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.4,
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "2000 / (1 + exp(-10 * (x - 0.5)))"
    }
  },
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.15,
    "backoffSeconds": 0.8
  }
}
```

**Optimized for:** Fast response to quick customer queries, efficient order status and product questions.

### Non-English languages (Spanish example)

```json
{
  "transcriber": { "language": "es" },
  "startSpeakingPlan": {
    "waitSeconds": 0.4,
    "transcriptionEndpointingPlan": {
      "onPunctuationSeconds": 0.1,
      "onNoPunctuationSeconds": 2.0
    }
  },
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.3,
    "backoffSeconds": 1.2
  }
}
```

**Optimized for:** Text-based endpointing with longer timeouts for different speech patterns and international support.

### Audio-based endpointing (Krisp example)

```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.4,
    "smartEndpointingPlan": {
      "provider": "krisp",
      "threshold": 0.5
    }
  },
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.0,
    "acknowledgementPhrases": [
      "okay",
      "right",
      "uh-huh",
      "yeah",
      "mm-hmm",
      "got it"
    ]
  }
}
```

**Optimized for:** Non-English conversations with robust backchanneling configuration to handle audio-based detection limitations.

### Audio-text based endpointing (Assembly example)

```json
{
  "transcriber": {
    "provider": "assembly",
    "endOfTurnConfidenceThreshold": 0.4,
    "minEndOfTurnSilenceWhenConfident": 400,
    "maxTurnSilence": 1280
  },
  "startSpeakingPlan": {
    "waitSeconds": 0.4
  },
  "stopSpeakingPlan": {
    "numWords": 0,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.0
  }
}
```

**Optimized for:** English conversations with integrated transcriber and sophisticated end-of-turn detection.

### Audio-text based endpointing (Deepgram Flux example)

```json
{
  "transcriber": {
    "provider": "deepgram",
    "model": "flux-general-en",
    "language": "en",
    "eotThreshold": 0.7,
    "eotTimeoutMs": 5000
  },
  "stopSpeakingPlan": {
    "numWords": 2,
    "voiceSeconds": 0.2,
    "backoffSeconds": 1.0,
    "acknowledgementPhrases": [
      "okay",
      "right",
      "uh-huh",
      "yeah",
      "mm-hmm",
      "got it"
    ]
  }
}
```

**Optimized for:** English conversations where Deepgram is set as transcriber.

### Education and training

```json
{
  "startSpeakingPlan": {
    "waitSeconds": 0.7,
    "smartEndpointingPlan": {
      "provider": "livekit",
      "waitFunction": "(20 + 500 * sqrt(x) + 2500 * x^3 + 700 + 4000 * max(0, x-0.5)) / 2"
    },
    "customEndpointingRules": [
      {
        "type": "assistant",
        "regex": "(spell|define|explain|example)",
        "timeoutSeconds": 4.0
      }
    ]
  },
  "stopSpeakingPlan": {
    "numWords": 1,
    "backoffSeconds": 1.5
  }
}
```

**Optimized for:** Learning pace with extra time for complex questions and explanations.

## Next steps

Now that you understand voice pipeline configuration:

- **[Speech configuration](speech-configuration):** Learn about provider-specific voice settings
- **[Custom transcriber](custom-transcriber):** Configure transcription providers for your language
- **[Voice fallback plan](../voice-fallback-plan):** Set up backup voice options
- **[Debugging voice agents](../debugging):** Troubleshoot voice pipeline issues

---
title: Voice Fallback Plan
subtitle: >-
  Configure fallback voices that activate automatically if your primary voice
  fails.
slug: voice-fallback-plan
---

<Note>
  Voice fallback plans can currently only be configured through the API. We are working on making this available through our dashboard.
</Note>

## Introduction

Voice fallback plans give you the ability to continue your call in the event that your primary voice fails. Your assistant will sequentially fallback to only the voices you configure within your plan, in the exact order you specify. 

<Note>
  Without a fallback plan configured, your call will end with an error in the event that your chosen voice provider fails.
</Note>

## How It Works

When a voice failure occurs, Vapi will:
1. Detect the failure of the primary voice
2. If a custom fallback plan exists:
  - Switch to the first fallback voice in your plan
  - Continue through your specified list if subsequent failures occur
  - Terminate only if all voices in your plan have failed

## Configuration

Add the `fallbackPlan` property to your assistant's voice configuration, and specify the fallback voices within the `voices` property.
- Please note that fallback voices must be valid JSON configurations, and not strings.
- The order matters. Vapi will choose fallback voices starting from the beginning of the list.

```json
{
  "voice": {
    "provider": "openai",
    "voiceId": "shimmer",
    "fallbackPlan": {
        "voices": [
            {
                "provider": "cartesia",
                "voiceId": "248be419-c632-4f23-adf1-5324ed7dbf1d"
            },
            {
                "provider": "11labs",
                "voiceId": "cgSgspJ2msm6clMCkdW9"
            }
        ]
    }
  }
}
```

## Best practices

- Use <b>different providers</b> for your fallback voices to protect against provider-wide outages.
- Select voices with **similar characteristics** (tone, accent, gender) to maintain consistency in the user experience.

## How will pricing work?

There is no change to the pricing of the voices. Your call will not incur any extra fees while using fallback voices, and you will be able to see the cost for each voice in your end-of-call report.

---
title: OpenAI Realtime
subtitle: >-
  Build voice assistants with OpenAI's native speech-to-speech models for
  ultra-low latency conversations
slug: openai-realtime
---

## Overview

OpenAI’s Realtime API enables developers to use a native speech-to-speech model. Unlike other Vapi configurations which orchestrate a transcriber, model and voice API to simulate speech-to-speech, OpenAI’s Realtime API natively processes audio in and audio out.

**In this guide, you'll learn to:**
- Choose the right realtime model for your use case
- Configure voice assistants with realtime capabilities
- Implement best practices for production deployments
- Optimize prompts specifically for realtime models

## Available models

<Tip>
  The `gpt-realtime-2025-08-28` model is production-ready.
</Tip>

OpenAI offers three realtime models, each with different capabilities and cost/performance trade-offs:

| Model | Status | Best For | Key Features |
|-------|---------|----------|--------------|
| `gpt-realtime-2025-08-28` | **Production** | Production workloads | Production Ready |
| `gpt-4o-realtime-preview-2024-12-17` | Preview | Development & testing | Balanced performance/cost |
| `gpt-4o-mini-realtime-preview-2024-12-17` | Preview | Cost-sensitive apps | Lower latency, reduced cost |

## Voice options

Realtime models support a specific set of OpenAI voices optimized for speech-to-speech:

<CardGroup cols={2}>
  <Card title="Standard Voices" icon="microphone">
    Available across all realtime models:
    - `alloy` - Neutral and balanced
    - `echo` - Warm and engaging  
    - `shimmer` - Energetic and expressive
  </Card>
  <Card title="Realtime-Exclusive Voices" icon="sparkles">
    Only available with realtime models:
    - `marin` - Professional and clear
    - `cedar` - Natural and conversational
  </Card>
</CardGroup>

<Warning>
  The following voices are **NOT** supported by realtime models: ash, ballad, coral, fable, onyx, and nova.
</Warning>

## Configuration

### Basic setup

Configure a realtime assistant with function calling:

<CodeBlocks>
```json title="Assistant Configuration"
{
  "model": {
    "provider": "openai",
    "model": "gpt-realtime-2025-08-28",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant. Be concise and friendly."
      }
    ],
    "temperature": 0.7,
    "maxTokens": 250,
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "getWeather",
          "description": "Get the current weather",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "The city name"
              }
            },
            "required": ["location"]
          }
        }
      }
    ]
  },
  "voice": {
    "provider": "openai",
    "voiceId": "alloy"
  }
}
```
```typescript title="TypeScript SDK"
import { Vapi } from '@vapi-ai/server-sdk';

const vapi = new Vapi({ token: process.env.VAPI_API_KEY });

const assistant = await vapi.assistants.create({
  model: {
    provider: "openai",
    model: "gpt-realtime-2025-08-28",
    messages: [{
      role: "system",
      content: "You are a helpful assistant. Be concise and friendly."
    }],
    temperature: 0.7,
    maxTokens: 250,
    tools: [{
      type: "function",
      function: {
        name: "getWeather",
        description: "Get the current weather",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city name"
            }
          },
          required: ["location"]
        }
      }
    }]
  },
  voice: {
    provider: "openai",
    voiceId: "alloy"
  }
});
```
```python title="Python SDK"
from vapi import Vapi

vapi = Vapi(token=os.getenv("VAPI_API_KEY"))

assistant = vapi.assistants.create(
    model={
        "provider": "openai",
        "model": "gpt-realtime-2025-08-28",
        "messages": [{
            "role": "system",
            "content": "You are a helpful assistant. Be concise and friendly."
        }],
        "temperature": 0.7,
        "maxTokens": 250,
        "tools": [{
            "type": "function",
            "function": {
                "name": "getWeather",
                "description": "Get the current weather",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The city name"
                        }
                    },
                    "required": ["location"]
                }
            }
        }]
    },
    voice={
        "provider": "openai",
        "voiceId": "alloy"
    }
)
```
</CodeBlocks>

### Using realtime-exclusive voices

To use the enhanced voices only available with realtime models:

```json
{
  "voice": {
    "provider": "openai",
    "voiceId": "marin"  // or "cedar"
  }
}
```

### Handling instructions

<Info>
  Unlike traditional OpenAI models, realtime models receive instructions through the session configuration. Vapi automatically converts your system messages to session instructions during WebSocket initialization.
</Info>

The system message in your model configuration is automatically optimized for realtime processing:

1. System messages are converted to session instructions
2. Instructions are sent during WebSocket session initialization  
3. The instructions field supports the same prompting strategies as system messages

## Prompting best practices

<Note>
  Realtime models benefit from different prompting techniques than text-based models. These guidelines are based on [OpenAI's official prompting guide](https://cookbook.openai.com/examples/realtime_prompting_guide).
</Note>

### General tips

- **Iterate relentlessly**: Small wording changes can significantly impact behavior
- **Use bullet points over paragraphs**: Clear, short bullets outperform long text blocks
- **Guide with examples**: The model closely follows sample phrases you provide
- **Be precise**: Ambiguity or conflicting instructions degrade performance
- **Control language**: Pin output to a target language to prevent unwanted switching
- **Reduce repetition**: Add variety rules to avoid robotic phrasing
- **Capitalize for emphasis**: Use CAPS for key rules to make them stand out

### Prompt structure

Organize your prompts with clear sections for better model comprehension:

```
# Role & Objective
You are a customer service agent for Acme Corp. Your goal is to resolve issues quickly.

# Personality & Tone  
- Friendly, professional, and empathetic
- Speak naturally at a moderate pace
- Keep responses to 2-3 sentences

# Instructions
- Greet callers warmly
- Ask clarifying questions before offering solutions
- Always confirm understanding before proceeding

# Tools
Use the available tools to look up account information and process requests.

# Safety
If a caller becomes aggressive or requests something outside your scope, 
politely offer to transfer them to a specialist.
```

### Realtime-specific techniques

<Tabs>
  <Tab title="Speaking Speed">
    Control the model's speaking pace with explicit instructions:
    
    ```
    ## Pacing
    - Deliver responses at a natural, conversational speed
    - Do not rush through information
    - Pause briefly between key points
    ```
  </Tab>
  <Tab title="Personality">
    Realtime models excel at maintaining consistent personality:
    
    ```
    ## Personality
    - Warm and approachable like a trusted advisor
    - Professional but not robotic
    - Show genuine interest in helping
    ```
  </Tab>
  <Tab title="Conversation Flow">
    Guide natural conversation progression:
    
    ```
    ## Conversation Flow
    1. Greeting: Welcome caller and ask how you can help
    2. Discovery: Understand their specific needs
    3. Solution: Offer the best available option
    4. Confirmation: Ensure they're satisfied before ending
    ```
  </Tab>
</Tabs>

## Migration guide

Transitioning from standard STT/TTS to realtime models:

<Steps>
  <Step title="Update your model configuration">
    Change your model to one of the realtime options:
    ```json
    {
      "model": {
        "provider": "openai",
        "model": "gpt-realtime-2025-08-28"  // Changed from gpt-4
      }
    }
    ```
  </Step>
  
  <Step title="Verify voice compatibility">
    Ensure your selected voice is supported (alloy, echo, shimmer, marin, or cedar)
  </Step>
  
  <Step title="Remove transcriber configuration">
    Realtime models handle speech-to-speech natively, so transcriber settings are not needed
  </Step>
  
  <Step title="Test function calling">
    Your existing function configurations work unchanged with realtime models
  </Step>
  
  <Step title="Optimize your prompts">
    Apply realtime-specific prompting techniques for best results
  </Step>
</Steps>

## Best practices

### Model selection strategy

<AccordionGroup>
  <Accordion title="When to use gpt-realtime-2025-08-28">
    **Best for production workloads requiring:**
    - Structured outputs for form filling or data collection
    - Complex function orchestration
    - Highest quality voice interactions
    - Responses API integration
  </Accordion>
  
  <Accordion title="When to use gpt-4o-realtime-preview">
    **Best for development and testing:**
    - Prototyping voice applications
    - Balanced cost/performance during development
    - Testing conversation flows before production
  </Accordion>
  
  <Accordion title="When to use gpt-4o-mini-realtime-preview">
    **Best for cost-sensitive applications:**
    - High-volume voice interactions
    - Simple Q&A or routing scenarios
    - Applications where latency is critical
  </Accordion>
</AccordionGroup>

### Performance optimization

- **Temperature settings**: Use 0.5-0.7 for consistent yet natural responses
- **Max tokens**: Set appropriate limits (200-300) for conversational responses
- **Voice selection**: Test different voices to match your brand personality
- **Function design**: Keep function schemas simple for faster execution

### Error handling

Handle edge cases gracefully:

```json
{
  "messages": [{
    "role": "system", 
    "content": "If you don't understand the user, politely ask them to repeat. Never make assumptions about unclear requests."
  }]
}
```

## Current limitations

<Warning>
  Be aware of these limitations when implementing realtime models:
</Warning>

- **Knowledge Bases** are not currently supported with the Realtime API
- **Endpointing and Interruption** models are managed by Vapi's orchestration layer
- **Custom voice cloning** is not available for realtime models
- **Some OpenAI voices** (ash, ballad, coral, fable, onyx, nova) are incompatible
- **Transcripts** may have slight differences from traditional STT output

## Additional resources

- [OpenAI Realtime Documentation](https://platform.openai.com/docs/guides/realtime)
- [Realtime Prompting Guide](https://platform.openai.com/docs/guides/realtime-models-prompting)
- [Prompting Cookbook](https://cookbook.openai.com/examples/realtime_prompting_guide)
- [Vapi Discord Community](https://discord.com/invite/pUFNcf2WmH)

## Next steps

Now that you understand OpenAI Realtime models:
- **[Phone Calling Guide](/phone-calling):** Set up inbound and outbound calling
- **[Assistant Hooks](/assistants/assistant-hooks):** Add custom logic to your conversations
- **[Voice Providers](/providers/voice/openai):** Explore other voice options

---
title: Provider Keys
subtitle: Bring your own API keys to Vapi.
slug: customization/provider-keys
---


Have a custom model or voice with one of the providers? Or an enterprise account with volume pricing?

No problem! You can bring your own API keys to Vapi. You can add them in the [Dashboard](https://dashboard.vapi.ai) under the **Provider Keys** tab. Once your API key is validated, you won't be charged when using that provider through Vapi. Instead, you'll be charged directly by the provider.

## Transcription Providers

Currently, the only available transcription provider is `deepgram`. To use a custom model, you can specify the deepgram model ID in the `transcriber.model` parameter of the [Assistant](/api-reference/assistants/create-assistant).

## Model Providers

We are currently have support for any OpenAI-compatible endpoint. This includes services like [OpenRouter](https://openrouter.ai/), [AnyScale](https://www.anyscale.com/), [Together AI](https://www.together.ai/), or your own server.

To use one of these providers, you can specify the `provider` and `model` in the `model` parameter of the [Assistant](/api-reference/assistants/create-assistant).

You can find more details in the [Custom LLMs](/customization/custom-llm/fine-tuned-openai-models) section of the documentation.

## Voice Providers

All voice providers are supported. Once you've validated your API through the [Dashboard](https://dashboard.vapi.ai), any voice ID from your provider can be used in the `voice.voiceId` field of the [Assistant](/api-reference/assistants/create-assistant).

## Cloud Providers

Vapi stores recordings of conversations with assistants in the cloud.  By default, Vapi stores these recordings in its
own bucket in Cloudflare R2.  You can configure Vapi to store recordings in your own bucket in AWS S3, GCP, or
Cloudflare R2. 

You can find more details on how to configure your Cloud Provider keys here:

  * [AWS S3](/providers/cloud/s3)
  * [GCP Cloud Storage](/providers/cloud/gcp)
  * [Cloudflare R2](/providers/cloud/cloudflare)

---
title: Custom transcriber
subtitle: Integrate your own transcription service with Vapi
slug: customization/custom-transcriber
---
## Overview

A custom transcriber lets you use your own transcription service with Vapi, instead of a built-in provider. This is useful if you need more control, want to use a specific provider like Deepgram, or have custom processing needs.

This guide shows you how to set up Deepgram as your custom transcriber. The same approach can be adapted for other providers.

You'll learn how to:
- Stream audio from Vapi to your server
- Forward audio to Deepgram for transcription
- Return real-time transcripts back to Vapi

## Why Use a Custom Transcriber?

- **Flexibility:** Integrate with your preferred transcription service.
- **Control:** Implement specialized processing that isn't available with built‑in providers.
- **Cost Efficiency:** Leverage your existing transcription infrastructure while maintaining full control over the pipeline.
- **Customization:** Tailor the handling of audio data, transcript formatting, and buffering according to your specific needs.

## How it works

<Steps>
  <Step title="Connection initialization">
    Vapi connects to your custom transcriber endpoint (e.g. `/api/custom-transcriber`) via WebSocket. It sends an initial JSON message like this:
    ```json
    {
      "type": "start",
      "encoding": "linear16",
      "container": "raw",
      "sampleRate": 16000,
      "channels": 2
    }
    ```
  </Step>
  <Step title="Audio streaming">
    Vapi then streams binary PCM audio to your server.
  </Step>
  <Step title="Transcription processing">
    Your server forwards the audio to Deepgram (or your chosen transcriber) using its SDK. Deepgram processes the audio and returns transcript events that include a `channel_index` (e.g. `[0, ...]` for customer, `[1, ...]` for assistant). The service buffers the incoming data, processes the transcript events (with debouncing and channel detection), and emits a final transcript.
  </Step>
  <Step title="Response">
    The final transcript is sent back to Vapi as a JSON message:
    ```json
    {
      "type": "transcriber-response",
      "transcription": "The transcribed text",
      "channel": "customer" // or "assistant"
    }
    ```
  </Step>
</Steps>

## Implementation steps

<Steps>
  <Step title="Project setup">
    Create a new Node.js project and install the required dependencies:
    ```bash
    mkdir vapi-custom-transcriber
    cd vapi-custom-transcriber
    npm init -y
    ```
    
    <CodeBlocks>
    ```bash title="npm"
    npm install ws express dotenv @deepgram/sdk
    ```

    ```bash title="yarn"
    yarn add ws express dotenv @deepgram/sdk
    ```

    ```bash title="pnpm"
    pnpm add ws express dotenv @deepgram/sdk
    ```

    ```bash title="bun"
    bun add ws express dotenv @deepgram/sdk
    ```
    </CodeBlocks>
    
    Create a `.env` file with the following content:
    ```env
    DEEPGRAM_API_KEY=your_deepgram_api_key
    PORT=3001
    ```
  </Step>

  <Step title="Add code files">
    Add the following files to your project:

    **transcriptionService.js**
    ```js
    const { createClient, LiveTranscriptionEvents } = require("@deepgram/sdk");
    const EventEmitter = require("events");

    const PUNCTUATION_TERMINATORS = [".", "!", "?"];
    const MAX_RETRY_ATTEMPTS = 3;
    const DEBOUNCE_DELAY_IN_SECS = 3;
    const DEBOUNCE_DELAY = DEBOUNCE_DELAY_IN_SECS * 1000;
    const DEEPGRAM_API_KEY = process.env["DEEPGRAM_API_KEY"] || "";

    class TranscriptionService extends EventEmitter {
      constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
        this.flowLogger = require("./fileLogger").createNamedLogger(
          "transcriber-flow.log"
        );
        if (!DEEPGRAM_API_KEY) {
          throw new Error("Missing Deepgram API Key");
        }
        this.deepgramClient = createClient(DEEPGRAM_API_KEY);
        this.logger.logDetailed(
          "INFO",
          "Initializing Deepgram live connection",
          "TranscriptionService",
          {
            model: "nova-2",
            sample_rate: 16000,
            channels: 2,
          }
        );
        this.deepgramLive = this.deepgramClient.listen.live({
          encoding: "linear16",
          channels: 2,
          sample_rate: 16000,
          model: "nova-2",
          smart_format: true,
          interim_results: true,
          endpointing: 800,
          language: "en",
          multichannel: true,
        });
        this.finalResult = { customer: "", assistant: "" };
        this.audioBuffer = [];
        this.retryAttempts = 0;
        this.lastTranscriptionTime = Date.now();
        this.pcmBuffer = Buffer.alloc(0);

        this.deepgramLive.addListener(LiveTranscriptionEvents.Open, () => {
          this.logger.logDetailed(
            "INFO",
            "Deepgram connection opened",
            "TranscriptionService"
          );
          this.deepgramLive.on(LiveTranscriptionEvents.Close, () => {
            this.logger.logDetailed(
              "INFO",
              "Deepgram connection closed",
              "TranscriptionService"
            );
            this.emitTranscription();
            this.audioBuffer = [];
          });
          this.deepgramLive.on(LiveTranscriptionEvents.Metadata, (data) => {
            this.logger.logDetailed(
              "DEBUG",
              "Deepgram metadata received",
              "TranscriptionService",
              data
            );
          });
          this.deepgramLive.on(LiveTranscriptionEvents.Transcript, (event) => {
            this.handleTranscript(event);
          });
          this.deepgramLive.on(LiveTranscriptionEvents.Error, (err) => {
            this.logger.logDetailed(
              "ERROR",
              "Deepgram error received",
              "TranscriptionService",
              { error: err }
            );
            this.emit("transcriptionerror", err);
          });
        });
      }

      send(payload) {
        if (payload instanceof Buffer) {
          this.pcmBuffer =
            this.pcmBuffer.length === 0
              ? payload
              : Buffer.concat([this.pcmBuffer, payload]);
        } else {
          this.logger.warn("TranscriptionService: Received non-Buffer data chunk.");
        }
        if (this.deepgramLive.getReadyState() === 1 && this.pcmBuffer.length > 0) {
          this.sendBufferedData(this.pcmBuffer);
          this.pcmBuffer = Buffer.alloc(0);
        }
      }

      sendBufferedData(bufferedData) {
        try {
          this.logger.logDetailed(
            "INFO",
            "Sending buffered data to Deepgram",
            "TranscriptionService",
            { bytes: bufferedData.length }
          );
          this.deepgramLive.send(bufferedData);
          this.audioBuffer = [];
          this.retryAttempts = 0;
        } catch (error) {
          this.logger.logDetailed(
            "ERROR",
            "Error sending buffered data",
            "TranscriptionService",
            { error }
          );
          this.retryAttempts++;
          if (this.retryAttempts <= MAX_RETRY_ATTEMPTS) {
            setTimeout(() => {
              this.sendBufferedData(bufferedData);
            }, 1000);
          } else {
            this.logger.logDetailed(
              "ERROR",
              "Max retry attempts reached, discarding data",
              "TranscriptionService"
            );
            this.audioBuffer = [];
            this.retryAttempts = 0;
          }
        }
      }

      handleTranscript(transcription) {
        if (!transcription.channel || !transcription.channel.alternatives?.[0]) {
          this.logger.logDetailed(
            "WARN",
            "Invalid transcript format",
            "TranscriptionService",
            { transcription }
          );
          return;
        }
        const text = transcription.channel.alternatives[0].transcript.trim();
        if (!text) return;
        const currentTime = Date.now();
        const channelIndex = transcription.channel_index
          ? transcription.channel_index[0]
          : 0;
        const channel = channelIndex === 0 ? "customer" : "assistant";
        this.logger.logDetailed(
          "INFO",
          "Received transcript",
          "TranscriptionService",
          { channel, text }
        );
        if (transcription.is_final || transcription.speech_final) {
          this.finalResult[channel] += ` ${text}`;
          this.emitTranscription();
        } else {
          this.finalResult[channel] += ` ${text}`;
          if (currentTime - this.lastTranscriptionTime >= DEBOUNCE_DELAY) {
            this.logger.logDetailed(
              "INFO",
              `Emitting transcript after ${DEBOUNCE_DELAY_IN_SECS}s inactivity`,
              "TranscriptionService"
            );
            this.emitTranscription();
          }
        }
        this.lastTranscriptionTime = currentTime;
      }

      emitTranscription() {
        for (const chan of ["customer", "assistant"]) {
          if (this.finalResult[chan].trim()) {
            const transcript = this.finalResult[chan].trim();
            this.logger.logDetailed(
              "INFO",
              "Emitting transcription",
              "TranscriptionService",
              { channel: chan, transcript }
            );
            this.emit("transcription", transcript, chan);
            this.finalResult[chan] = "";
          }
        }
      }
    }

    module.exports = TranscriptionService;
    ```

    **server.js**
    ```js
    const express = require("express");
    const http = require("http");
    const TranscriptionService = require("./transcriptionService");
    const FileLogger = require("./fileLogger");
    require("dotenv").config();

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.send("Custom Transcriber Service is running");
    });

    const server = http.createServer(app);

    const config = {
      DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
      PORT: process.env.PORT || 3001,
    };

    const logger = new FileLogger();
    const transcriptionService = new TranscriptionService(config, logger);

    transcriptionService.setupWebSocketServer = function (server) {
      const WebSocketServer = require("ws").Server;
      const wss = new WebSocketServer({ server, path: "/api/custom-transcriber" });
      wss.on("connection", (ws) => {
        logger.logDetailed(
          "INFO",
          "New WebSocket client connected on /api/custom-transcriber",
          "Server"
        );
        ws.on("message", (data, isBinary) => {
          if (!isBinary) {
            try {
              const msg = JSON.parse(data.toString());
              if (msg.type === "start") {
                logger.logDetailed(
                  "INFO",
                  "Received start message from client",
                  "Server",
                  { sampleRate: msg.sampleRate, channels: msg.channels }
                );
              }
            } catch (err) {
              logger.error("JSON parse error", err, "Server");
            }
          } else {
            transcriptionService.send(data);
          }
        });
        ws.on("close", () => {
          logger.logDetailed("INFO", "WebSocket client disconnected", "Server");
          if (
            transcriptionService.deepgramLive &&
            transcriptionService.deepgramLive.getReadyState() === 1
          ) {
            transcriptionService.deepgramLive.finish();
          }
        });
        ws.on("error", (error) => {
          logger.error("WebSocket error", error, "Server");
        });
        transcriptionService.on("transcription", (text, channel) => {
          const response = {
            type: "transcriber-response",
            transcription: text,
            channel,
          };
          ws.send(JSON.stringify(response));
          logger.logDetailed("INFO", "Sent transcription to client", "Server", {
            channel,
            text,
          });
        });
        transcriptionService.on("transcriptionerror", (err) => {
          ws.send(
            JSON.stringify({ type: "error", error: "Transcription service error" })
          );
          logger.error("Transcription service error", err, "Server");
        });
      });
    };

    transcriptionService.setupWebSocketServer(server);

    server.listen(config.PORT, () => {
      console.log(`Server is running on http://localhost:${config.PORT}`);
    });
    ```
  </Step>

  <Step title="Test your integration">
    1. **Deploy your server:**
    ```bash
    node server.js
    ```
    2. **Expose your server:**
    Use a tool like ngrok to expose your server via HTTPS/WSS.
    3. **Initiate a call with Vapi:**
    Use the following CURL command (update the placeholders with your actual values):
    ```bash
    curl -X POST https://api.vapi.ai/call \
         -H "Authorization: Bearer YOUR_API_KEY" \
         -H "Content-Type: application/json" \
         -d '{
      "phoneNumberId": "YOUR_PHONE_NUMBER_ID",
      "customer": {
        "number": "CUSTOMER_PHONE_NUMBER"
      },
      "assistant": {
        "transcriber": {
          "provider": "custom-transcriber",
          "server": {
            "url": "wss://your-server.ngrok.io/api/custom-transcriber",
            "credentialId": "cred_transcriber_auth_123"
          }
        },
        "firstMessage": "Hello! I am using a custom transcriber with Deepgram."
      },
      "name": "CustomTranscriberTest"
    }'
    ```
    
    **Expected behavior:**
    - Vapi connects via WebSocket to your custom transcriber at `/api/custom-transcriber`.
    - The `"start"` message initializes the Deepgram session.
    - PCM audio data is forwarded to Deepgram.
    - Deepgram returns transcript events, which are processed with channel detection and debouncing.
    - The final transcript is sent back as a JSON message:
      ```json
      {
        "type": "transcriber-response",
        "transcription": "The transcribed text",
        "channel": "customer" // or "assistant"
      }
      ```
  </Step>
</Steps>

## Notes and limitations

- **Streaming support requirement:**  
  The custom transcriber must support streaming. Vapi sends continuous audio data over the WebSocket, and your server must handle this stream in real time.
- **Authentication:**  
  For secure transcriber endpoints, use **Custom Credentials** with `credentialId`. Create [Custom Credentials](../../server-url/server-authentication) in the dashboard to manage Bearer Token, OAuth 2.0, or HMAC authentication. For backward compatibility, the legacy `secret` field is still supported and sends the value as an `x-vapi-secret` HTTP header.
- **Buffering:**  
  The solution buffers PCM audio and performs simple validation (e.g. ensuring stereo PCM data length is a multiple of 4). If the audio data is malformed, it is trimmed to a valid length.
- **Channel detection:**  
  Transcript events from Deepgram include a `channel_index` array. The service uses the first element to determine whether the transcript is from the customer (`0`) or the assistant (`1`). Ensure Deepgram's response format remains consistent with this logic.

---

## Conclusion

Using a custom transcriber with Vapi gives you the flexibility to integrate any transcription service into your call flows. This guide walked you through the setup, usage, and testing of a solution that streams real-time audio, processes transcripts with multi‑channel detection, and returns formatted responses back to Vapi. Follow the steps above and use the provided code examples to build your custom transcriber solution.
