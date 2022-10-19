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
import { codeBlock, t, decisionBanner, h, p, tag, TextColorPalette, expand, twoLayout, threeLayout, divider } from "./ui";


// https://confluence.atlassian.com/doc/confluence-storage-format-790796544.html
// body with table

// request to custom elements

//'default' | 'inprogress' | 'moved' | 'new' | 'removed' | 'success';

const requestColor = {
  "GET": "Green", 
  "POST": "Blue", 
  "PUT": "Purple", 
  "DELETE": "Red", 
  "PATCH": "Orange",
  "OPTIONS":"Default", 
  "HEAD": "Green", 
  "TRACE": "Default", 
}

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

  const [isOpen, setOpen] = useState(false);

  const [isForm, setForm] = useState(false);

  const input = 'http://localhost:3000'

  const [collectionId, setCollectionId] = useState('');

  const [data, setData] = useState({collections: [
    {
      id: 'e367387c-8da5-49cc-8ac6-62572232c9ec', 
      name: 'Atku', 
      createdAt: '2022-07-17T12:28:59.000Z',

    }
  ],
  message: 'Not found'
});

  const SpaceContext = useProductContext();

  useEffect(async () => {
    
    const response = await api.fetch(
      `https://api.getpostman.com/collections?workspace=${workspaceID}`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      },
    );

    const json = await response.json();
  
    setData(json);
  }, []);


  const createPost = async (key, id, input) => {

    input = input || 'http://locahost:3000';
   

    const urlId = "https://api.getpostman.com/collections/" + id




    const newRequest = await api.fetch(urlId, 
    {
      headers: {
      "X-API-Key": apiKey,

      }
    })

    const collectionData = await newRequest.json();


    const name = collectionData.collection.item.map((el) => {
       const title = h(el.name, "h2");
       const request = el?.request?.method ? p(tag(el?.request?.method,requestColor[el?.request?.method || 'GET'] ) + "   " + el.name) : '';

       const requestEndpoint =  input
          ? (input + "/" + el?.request?.url?.path?.join("/"))
          : el?.request?.url?.raw;

      const endpoint = el.request ?  codeBlock(requestEndpoint, "text") : "";
       const code = el?.request?.body?.raw ? (`<p>Body</p>` + codeBlock(el?.request?.body?.raw,el?.request?.body?.options?.raw?.language)) : "";

      const insideItems =  el?.item?.map((sub) => {
        const title = h(sub.name, "h4");
        const request = sub?.request?.method ? p(tag(sub?.request?.method,requestColor[sub?.request?.method || "GET"] ) + "   " + sub?.name) : '';

        const requestEndpoint = input
           ? (input + "/" + sub?.request?.url?.path?.join("/"))
           : sub?.request?.url?.raw;
 
         const endpoint = codeBlock(requestEndpoint, "text") 
        const code = sub?.request?.body?.raw ? (`<p>Body</p>` + codeBlock(sub?.request?.body?.raw,sub?.request?.body?.options?.raw?.language)) : "";

        return title + request + endpoint+  code + divider();
      }).join('')
      

      return title + request + endpoint+  code + insideItems;
    }).join('');
    
    function randomNumber(){  return Math.floor(Math.random() * 100)} 



    const title =  collectionData.collection.info.name + " #" +  randomNumber();



    const jsondata = {"type":"page",
 "title":title,
 "space": {"key": key },
 "body": {
  "storage": {
    "value":  name,
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

    
  }



  return (
    <Fragment>
      <Fragment>
      {isOpen && (
      <ModalDialog header="We Created documentation for your collection. Thank You " onClose={() => setOpen(false)}>
        <Text>Please Refresh the Page</Text>
      </ModalDialog>
    )}

      </Fragment>
    
<Fragment>
{
                isForm && (
                  <ModalDialog header="Postman doc config" onClose={() => setForm(false)}>
                    <Form
                      onSubmit={async (data) => {
                        
                        await createPost(SpaceContext.spaceKey, collectionId, data.baseUrl);
                        setForm(false);
                        setOpen(true);
                      }}
                    >
                      <TextField label="baseUrl" name="baseUrl" defaultValue={input} />
                    </Form>
                  </ModalDialog>
                )
                }
</Fragment>


   
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
                  <Button text="+ Create Doc" onClick={() => { setCollectionId(collection.id), setForm(true)}}/>

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
    await saveSettings("apikey", formData.postmanAPIkey);
   await saveSettings("workspaceid", formData.workspaceID);

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
