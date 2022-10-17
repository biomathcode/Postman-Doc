import api, {route} from "@forge/api";
import ForgeUI, {
  useProductContext,
  Table, Head, Row, Cell,
  Button,
  Code,
  ContentAction,
  Em,
  Form,
  Fragment,
  Heading,
  Macro,
  MacroConfig,
  ModalDialog,
  render,
  SectionMessage,
  SpacePage,
  SpaceSettings,
  StatusLozenge,
  Strong,
  Tag,
  Text,
  TextArea,
  TextField,
  useConfig,
  useEffect,
  useState,
  DateLozenge,
  Tooltip,
} from "@forge/ui";
import { getSettings, saveSettings } from "./storage";
import { codeBlock, t, DecisionBanner, h, p, TagStatus, TextColorPalette, Expand, TwoLayout, ThreeLayout } from "./ui";


// https://confluence.atlassian.com/doc/confluence-storage-format-790796544.html
// body with table

// request to custom elements

//'default' | 'inprogress' | 'moved' | 'new' | 'removed' | 'success';

const requestTypes = {
  "GET": "success",
  "POST": "inprogress",
  "PUT": "new",
  "DELETE": "removed",
  "PATCH": "moved",
  "OPTIONS": "default",
  "HEAD": "success",
  "TRACE": "default",
};

//
const renderToText = () => {
  return (
    <Text>
      <Code text="dasfs" />
    </Text>
  );
};

const App = () => {
  const config = useConfig() || defaultConfig;

  const jsonData = JSON.parse(
    config.postmanCollection || JSON.stringify(defaultConfig),
  );
  return (
    <Fragment>
      <Heading size="large">{jsonData?.info?.name}</Heading>

      {jsonData?.item?.map((el) => {
        const requestEndpoint = config.baseUrl
          ? (config?.baseUrl + "/" + el?.request?.url?.path?.join("/"))
          : el?.request?.url?.raw;
        return (
          <Fragment key={el}>
            <Heading size="medium">{el?.name}</Heading>
            
            {el?.item?.map((sub) => {
              const requestEndpoint = config.baseUrl
                ? (config?.baseUrl + "/" + sub?.request?.url?.path?.join("/"))
                : sub?.request?.url?.raw;

              return (
                <Fragment key={sub}>
                  <Text>
                    <StatusLozenge
                      text={sub?.request?.method}
                      appearance={requestTypes[sub?.request?.method] ||
                        "default"}
                    />{"     "}
                    <Strong>{sub?.name}</Strong>
                  </Text>
                  <Text>
                    <Code text={requestEndpoint} />
                  </Text>
                  {sub?.request?.body?.raw && (
                    <Code
                      text={sub?.request?.body?.raw}
                      language={sub?.request?.body?.options?.raw?.language}
                    />
                  )}
                </Fragment>
              );
            })}
            <Text>
              <StatusLozenge
                text={el?.request?.method}
                appearance={requestTypes[el?.request?.method] || "default"}
              />{"     "}
              <Strong>{el?.name}</Strong>
            </Text>
            <Text>
              <Code text={requestEndpoint} />
            </Text>
            {el?.request?.body?.raw && (
              <Code
                text={el?.request?.body?.raw}
                language={el?.request?.body?.options?.raw?.language}
              />
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

const defaultConfig = {
  info: {
    name: "collection",
  },
};

export const run = render(
  <Macro
    app={<App />}
  />,
);

const Context = () => {
  const [isOpen, setOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalDialog header="Hello" onClose={() => setOpen(false)}>
      <Text>Hello world!!</Text>
    </ModalDialog>
  );
};

export const context = render(
  <ContentAction>
    <Context />
  </ContentAction>,
);

type headerItem = {
  key: string, 
  value: string, 
}


type responseItem = {
  name: string
  request: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTION" | "Head", 
    headers: [headerItem]
  }
}

const SpacePageView = () => {
  const [apiKey, setApiKey] = useState(async () => await getSettings("apikey"));
  const [workspaceID, setWorkspaceID] = useState(async () =>
    await getSettings("workspaceid")
  );

  const [data, setData] = useState({collections: [
    {
      id: 'e367387c-8da5-49cc-8ac6-62572232c9ec', 
      name: 'Atku', 
      createdAt: '2022-07-17T12:28:59.000Z',

    }
  ],
  message: 'Not found'
});

  const context = useProductContext();

  useEffect(async () => {
    console.log("this is the getdata function starting", apiKey, workspaceID);
    const response = await api.fetch(
      `https://api.getpostman.com/collections?workspace=${workspaceID}`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      },
    );
    console.log("this is the response", response);
    const json = await response.json();
    console.log(json);
    setData(json);
  }, []);


  const createPost = async (key, id) => {
   

    const urlId = "https://api.getpostman.com/collections/" + id
    console.log(urlId);

    const newRequest = await api.fetch(urlId, 
    {
      headers: {
      "X-API-Key": apiKey,

      }
    })

    const collectionData = await newRequest.json();


    const name = collectionData.collection.item.map((el) =>   p(el.name  + " " + TagStatus("Something", "Red"))).join('');


    function randomNumber(){  return Math.random() * 100}



    const title =  collectionData.collection.info.name + randomNumber();



    const decision = DecisionBanner('This is a decision');

    const ColorText = p(t("this is the red Color", TextColorPalette.red[0]))




     const Title = h('This is the  headring', 'h1')

     const description = h('this is description', 'h3');

   const code = codeBlock(`{Pratik: 'sharma'}`, 'json');


   const codeJavascript = codeBlock(`function print() {console.log('Pratik Sharma')}`, 'javascript');


   const Testq = Title + description + code + codeJavascript

    const ExpandContnet = Expand('what is Music?', "<p>anything which makes you dance is a form of self expression is music</p>")

    const TwoLayoutString = TwoLayout( p('Layout first coolumn'), p('this is'),'two_right_sidebar');

    const threeLayoug = ThreeLayout(p('Layout Three 1'), p('2'), p('3'), 'three_equal');

    const emojiText = `<p> 🔥 ✍🏻  ✅ </p>`

    const jsondata = {"type":"page",
 "title":title,
 "space": {"key": "COOLHEAD" },
 "body": {
  "storage": {
    "value":  Testq+ emojiText+ TwoLayoutString + TwoLayoutString +  threeLayoug+ ExpandContnet + name + decision +  ColorText,
    "representation": "storage"
  },
 }  
     }

 const response = await api.asApp().requestConfluence(route`/wiki/rest/api/content`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify(jsondata),
});

  console.log(response);
  console.log(`Response: ${response.status} ${response.statusText}`);
    
  }

  console.log("this is the data ", data);

  return (
    <Fragment>
      <SectionMessage title="Welcome to Postman Doc">
        <Text>
          Postman doc helps your kick start documenting your REST APIS. We provied Macro, Space Page dedicated to generating documentation from your Postman Collections. 
          <Tag text="This is change "/>
        </Text>
        <Text>
          Please setup your Postman api key and workspace id by going to <Tag text="Status Settings"/> - <Tag text="Integrations"/> - <Tag text="Postman Doc"/> To get Started. 
        </Text>
      </SectionMessage>
        <Fragment>
          <Table>
            <Head >
              <Cell>
                <Text>Collections</Text>
              </Cell>
              <Cell>
                <Text>Action</Text>
              </Cell>
          </Head>
          {data.collections.map((collection) => {
              return (
                <Row>
                <Cell>
                <Text>
                  
                    {collection?.name + "   "  }   <DateLozenge value={new Date(collection.createdAt).getTime() }/>
                  </Text>
                
                </Cell>
                <Cell>
                  <Tooltip text={"Click to create a new Documentation of Collection " + collection.name}>
                  <Button text="+ Create Doc" onClick={() => createPost(context.spaceKey, collection.id)}/>

                  </Tooltip>
                </Cell>
              </Row>
                
               
              )
            })}

          </Table>
        
           
     
         
            
          
        </Fragment>
     
    </Fragment>
  );
};

export const spacePage = render(
  <SpacePage>
    <SpacePageView />
  </SpacePage>,
);

const ConfigSettings = () => {
  const [apiKey, setApiKey] = useState(async () => await getSettings("apikey"));
  const [workspaceID, setWorkspaceID] = useState(async () =>
    await getSettings("workspaceid")
  );

  const [updated, setUpdated] = useState(false);

  const onSubmit = async (formData) => {
    saveSettings("apikey", formData.postmanAPIkey);
    saveSettings("workspaceid", formData.workspaceID);

    setApiKey(formData.postmanAPIkey);
    setWorkspaceID(formData.workspaceID);

    setUpdated(true);
  };
  return (
    <Fragment>
      <SectionMessage title="Configs">
        <Text>You may have to refresh the page to see the Updates.</Text>
        {apiKey && <Text>Postman API KEY: {apiKey}</Text>}
        {workspaceID && <Text>WorkspaceID : {workspaceID}</Text>}
      </SectionMessage>

      <Form onSubmit={onSubmit}>
        <TextField name="postmanAPIkey" label="Postman Api Key" />
        <TextField name="workspaceID" label="Workspace id" />
      </Form>
      {updated && <Text>Your change are updated</Text>}
    </Fragment>
  );
};

export const space = render(
  <SpaceSettings>
    <ConfigSettings />
  </SpaceSettings>,
);

const Config = () => {
  return (
    <MacroConfig>
      <TextArea
        name="postmanCollection"
        description="Paste your postman collection JSON here "
        label="Paste Postman Collection Json"
        defaultValue={JSON.stringify(defaultConfig)}
      />
      <TextField
        description="default is localhost:3000"
        name="baseUrl"
        label="API base URL "
        defaultValue="http://localhost:3000"
      />
    </MacroConfig>
  );
};

export const config = render(<Config />);
