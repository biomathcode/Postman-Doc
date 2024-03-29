import api, { route } from "@forge/api";
import ForgeUI, {
  Button,
  Cell,
  Code,
  ContentAction,
  DateLozenge,
  Form,
  Fragment,
  Head,
  Heading,
  Link,
  Macro,
  MacroConfig,
  ModalDialog,
  render,
  Row,
  SectionMessage,
  SpacePage,
  SpaceSettings,
  StatusLozenge,
  Strong,
  Table,
  Tag,
  Text,
  TextArea,
  TextField,
  Tooltip,
  useConfig,
  useEffect,
  useProductContext,
  useState,
} from "@forge/ui";
import { getSettings, saveSettings } from "./storage";
import {
  codeBlock,
  decisionBanner,
  divider,
  expand,
  h,
  p,
  t,
  table,
  tag,
  TextColorPalette,
  threeLayout,
  tr_header,
  tr_row,
  twoLayout,
} from "./ui";

// https://confluence.atlassian.com/doc/confluence-storage-format-790796544.html
// body with table

// request to custom elements

//'default' | 'inprogress' | 'moved' | 'new' | 'removed' | 'success';

const requestColor = {
  GET: "Green",
  POST: "Blue",
  PUT: "Purple",
  DELETE: "Red",
  PATCH: "Orange",
  OPTIONS: "Default",
  HEAD: "Green",
  TRACE: "Default",
};

const requestTypes = {
  GET: "success",
  POST: "inprogress",
  PUT: "new",
  DELETE: "removed",
  PATCH: "moved",
  OPTIONS: "default",
  HEAD: "success",
  TRACE: "default",
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

  function isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const errorconfig = {
    info: {
      name: "Please pass valid JSON",
    },
  };
  const ValidJson = isJsonString(config.postmanCollection);

  const jsonData = ValidJson
    ? JSON.parse(config.postmanCollection)
    : errorconfig;

  return (
    <Fragment>
      <Heading size="large">{jsonData?.info?.name}</Heading>

      {jsonData?.item?.length > 0 ? (
        jsonData?.item?.map((el) => {
          const requestEndpoint = config.baseUrl
            ? config?.baseUrl + "/" + el?.request?.url?.path?.join("/")
            : el?.request?.url?.raw;
          return (
            <Fragment key={el}>
              <Heading size="medium">{el?.name}</Heading>

              {el?.item?.map((sub) => {
                const requestEndpoint = config.baseUrl
                  ? config?.baseUrl + "/" + sub?.request?.url?.path?.join("/")
                  : sub?.request?.url?.raw;

                return (
                  <Fragment key={sub}>
                    <Text>
                      <StatusLozenge
                        text={sub?.request?.method}
                        appearance={
                          requestTypes[sub?.request?.method] || "default"
                        }
                      />
                      {"     "}
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
                />
                {"     "}
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
        })
      ) : (
        <Text>Please add the correct json</Text>
      )}
    </Fragment>
  );
};

const defaultConfig = {
  info: {
    name: "collection",
  },
};

export const run = render(<Macro app={<App />} />);

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
  </ContentAction>
);

type headerItem = {
  key: string;
  value: string;
};

type responseItem = {
  name: string;
  request: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTION" | "Head";
    headers: [headerItem];
  };
};

// api request three conditions
// api key is not set
// api key is wrong
// workspace id is wrong

const SpacePageView = () => {
  const [apiKey, setApiKey] = useState(async () => await getSettings("apikey"));
  const [workspaceID, setWorkspaceID] = useState(
    async () => await getSettings("workspaceid")
  );

  const [isconfig, setIsConfig] = useState(true);

  const [isOpen, setOpen] = useState(false);

  const [isForm, setForm] = useState(false);

  const input = "http://localhost:3000";

  const [collectionId, setCollectionId] = useState("");

  const [data, setData] = useState(null);

  const SpaceContext = useProductContext();

  useEffect(async () => {
    if (apiKey !== "NOT FOUND" && workspaceID !== "NOT FOUND") {
      try {
        const response = await api.fetch(
          `https://api.getpostman.com/collections?workspace=${workspaceID}`,
          {
            headers: {
              "X-API-Key": apiKey,
            },
          }
        );

        const json = await response.json();
        setData(json);
      } catch (e) {
        console.log(e);
      }
    }
  }, [apiKey, workspaceID]);

  const createPost = async (key: string, id: string, input: string) => {
    input = input || "http://locahost:3000";

    const urlId = "https://api.getpostman.com/collections/" + id;

    const newRequest = await api.fetch(urlId, {
      headers: {
        "X-API-Key": apiKey,
      },
    });

    const collectionData = await newRequest.json();

    const name = collectionData.collection.item
      .map((el) => {
        const title = h(el.name, "h2");

        const description = el.description
          ? expand("description", el.description)
          : "";

        const request = el?.request?.method
          ? p(
              tag(
                el?.request?.method,
                requestColor[el?.request?.method || "GET"]
              ) +
                "   " +
                el.name
            )
          : "";

        const headers =
          el?.request?.header?.length > 0
            ? table(
                tr_header(["key", "value"]) +
                  el?.request?.header
                    .map((vl) => tr_row([vl?.key, vl?.value]))
                    .join("")
              )
            : "";

        const requestEndpoint = input
          ? input + "/" + el?.request?.url?.path?.join("/")
          : el?.request?.url?.raw;

        const endpoint = el.request ? codeBlock(requestEndpoint, "text") : "";
        const code = el?.request?.body?.raw
          ? `<p>Body</p>` +
            codeBlock(
              el?.request?.body?.raw,
              el?.request?.body?.options?.raw?.language
            )
          : "";
        const graphql = el?.request?.body?.mode
          ? `<h5>GraphQL Body</h5>` +
            codeBlock(el?.request?.body?.graphql?.query, "graphql")
          : "";

        const urlencodedBody =
          el?.request?.body?.urlencoded?.length > 0
            ? expand(
                "Body",
                table(
                  tr_header(["key", "value"]) +
                    el?.request?.body?.urlencoded
                      ?.map((vl) => {
                        const newValue = vl?.value?.replace(/[<>]/g, "");
                        return tr_row([vl?.key, newValue]);
                      })
                      .join("")
                )
              )
            : "";

        const formData =
          el?.request?.body?.mode === "formdata"
            ? expand(
                "Body",
                table(
                  tr_header(["key", "value"]) +
                    el?.request?.body?.formdata
                      ?.map((vl) => {
                        const newValue = vl?.value?.replace(/[<>]/g, "");
                        return tr_row([vl?.key, newValue]);
                      })
                      .join("")
                )
              )
            : "";

        const insideItems = el?.item
          ? el?.item
              ?.map((sub) => {
                const title = h(sub.name, "h4");
                const description = sub?.description
                  ? expand("description", sub.description)
                  : "";

                const headers =
                  sub?.request?.header?.length > 0
                    ? expand(
                        "headers",
                        table(
                          tr_header(["key", "value"]) +
                            sub?.request?.header
                              .map((vl) => tr_row([vl?.key, vl?.value]))
                              .join("")
                        )
                      )
                    : "";

                const request = sub?.request?.method
                  ? p(
                      tag(
                        sub?.request?.method,
                        requestColor[sub?.request?.method || "GET"]
                      ) +
                        "   " +
                        sub?.name
                    )
                  : "";

                const requestEndpoint = input
                  ? input + "/" + sub?.request?.url?.path?.join("/")
                  : sub?.request?.url?.raw;

                const endpoint = sub.request
                  ? codeBlock(requestEndpoint, "text")
                  : "";
                const code = sub?.request?.body?.raw
                  ? `<h5>Body</h5>` +
                    codeBlock(
                      sub?.request?.body?.raw,
                      sub?.request?.body?.options?.raw?.language
                    )
                  : "";
                const formData =
                  sub?.request?.body?.mode === "formdata"
                    ? expand(
                        "Body",
                        table(
                          tr_header(["key", "value"]) +
                            sub?.request?.body?.formdata
                              ?.map((vl) => {
                                const newValue = vl?.value?.replace(
                                  /[<>]/g,
                                  ""
                                );
                                return tr_row([vl?.key, newValue]);
                              })
                              .join("")
                        )
                      )
                    : "";
                const graphql =
                  sub?.request?.body?.mode === "graphql"
                    ? `<h5>GraphQL Body</h5>` +
                      codeBlock(sub?.request?.body?.graphql?.query, "graphql")
                    : "";
                const urlencodedBody =
                  sub?.request?.body?.urlencoded?.length > 0
                    ? expand(
                        "Body",
                        table(
                          tr_header(["key", "value"]) +
                            sub?.request?.body?.urlencoded
                              ?.map((vl) => {
                                const newValue = vl?.value?.replace(
                                  /[<>]/g,
                                  ""
                                );
                                return tr_row([vl?.key, newValue]);
                              })
                              .join("")
                        )
                      )
                    : "";

                const query =
                  sub?.request?.url?.query?.length > 0
                    ? expand(
                        "query",
                        table(
                          tr_header(["key", "value", "description"]) +
                            sub?.request?.url?.query
                              ?.map((vl) => {
                                const newValue = vl?.value?.replace(
                                  /[<>]/g,
                                  ""
                                );
                                return tr_row([
                                  vl?.key,
                                  newValue,
                                  vl?.description,
                                ]);
                              })
                              .join("")
                        )
                      )
                    : "";

                const responseData = sub?.response
                  ? sub?.response
                      ?.map((res) => {
                        const title = h(
                          tag(
                            res?.code,
                            String(res?.code) === "200" ? "Green" : "Purple"
                          ) +
                            "      " +
                            res?.name,
                          "h5"
                        );
                        // array of key, value object
                        const headers =
                          res?.header?.length > 0
                            ? table(
                                tr_header(["key", "value"]) +
                                  res?.header
                                    .map((vl) => tr_row([vl?.key, vl?.value]))
                                    .join("")
                              )
                            : "";
                        const body = res?.body
                          ? codeBlock(res?.body, res?._postman_previewlanguage)
                          : "";

                        const builder =
                          title +
                          expand("Headers", headers) +
                          expand("Response Body", body);

                        return builder;
                      })
                      .join("")
                  : "";

                return (
                  title +
                  description +
                  headers +
                  request +
                  endpoint +
                  query +
                  urlencodedBody +
                  graphql +
                  code +
                  formData +
                  responseData +
                  divider()
                );
              })
              .join("")
          : "";

        const responseData = el?.response
          ? el?.response
              ?.map((res) => {
                const title = h(
                  tag(
                    el?.code,
                    String(el?.code) === "200" ? "Green" : "Purple"
                  ) +
                    "      " +
                    el?.name,
                  "h5"
                );
                // array of key, value object
                const headers =
                  el?.header?.length > 0
                    ? table(
                        tr_header(["key", "value"]) +
                          el?.header
                            .map((vl) => tr_row([vl?.key, vl?.value]))
                            .join("")
                      )
                    : "";
                const body = el?.body
                  ? codeBlock(el?.body, el?._postman_previewlanguage)
                  : "";

                const builder =
                  title +
                  expand("Headers", headers) +
                  expand("Response Body", body);

                return builder;
              })
              .join("")
          : "";

        return (
          title +
          description +
          headers +
          request +
          endpoint +
          code +
          graphql +
          urlencodedBody +
          formData +
          responseData +
          insideItems +
          divider()
        );
      })
      .join("");

    function randomNumber() {
      return Math.floor(Math.random() * 100);
    }

    const title = collectionData.collection.info.name + " #" + randomNumber();

    const description = collectionData.collection.info.description
      ? expand("description", collectionData.collection.info.description)
      : "";

    const jsondata = {
      type: "page",
      title: title,
      space: { key: key },
      body: {
        storage: {
          value: description + name,
          representation: "storage",
        },
      },
    };

    const response = await api
      .asApp()
      .requestConfluence(route`/wiki/rest/api/content`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsondata),
      });
    const newResponse = await response.json();

    console.log(response);
    console.log("This is the reason", newResponse);
  };

  const onSubmit = async (formData) => {
    await saveSettings("apikey", formData.postmanAPIkey);
    await saveSettings("workspaceid", formData.workspaceID);

    setApiKey(formData.postmanAPIkey);
    setWorkspaceID(formData.workspaceID);

    // setUpdated(true);
  };

  return (
    <Fragment>
      <Fragment>
        {isOpen && (
          <ModalDialog
            header="We Created documentation for your collection. Thank You "
            onClose={() => setOpen(false)}
          >
            <Text>Please Refresh the Page</Text>
          </ModalDialog>
        )}
      </Fragment>

      <Fragment>
        {isForm && (
          <ModalDialog
            header="Postman doc config"
            onClose={() => setForm(false)}
          >
            <Form
              onSubmit={async (data) => {
                await createPost(
                  SpaceContext.spaceKey,
                  collectionId,
                  data.baseUrl
                );
                setForm(false);
                setOpen(true);
              }}
            >
              <TextField label="baseUrl" name="baseUrl" defaultValue={input} />
            </Form>
          </ModalDialog>
        )}
      </Fragment>

      <Text>
        We provied Macro, Space Page dedicated to generating documentation from
        your Postman Collections. Please read a helper doc here :
        <Link href="https://medium.com/@biomathcode/automate-api-documentation-on-atlassian-confluence-with-postman-doc-9b1f3a24eed0">
          Click here to read me
        </Link>
      </Text>

      <Fragment>
        {data ? (
          <Table>
            <Head>
              <Cell>
                <Text>Collections</Text>
              </Cell>
              <Cell>
                <Text>Action</Text>
              </Cell>
            </Head>
            {data?.collections?.map((collection) => {
              return (
                <Row>
                  <Cell>
                    <Text>
                      {collection?.name + "   "}{" "}
                      <DateLozenge
                        value={new Date(collection.createdAt).getTime()}
                      />
                    </Text>
                  </Cell>
                  <Cell>
                    <Tooltip
                      text={
                        "Click to create a new Documentation of Collection " +
                        collection?.name
                      }
                    >
                      <Button
                        text="+ Create Doc"
                        onClick={() => {
                          setCollectionId(collection?.id), setForm(true);
                        }}
                      />
                    </Tooltip>
                  </Cell>
                </Row>
              );
            })}
          </Table>
        ) : (
          <Text>Please set your Postman Api key and Workspace Id</Text>
        )}
      </Fragment>
      {isconfig ? (
        <Fragment>
          <Button
            text="Hide"
            icon="watch"
            appearance="subtle"
            onClick={() => setIsConfig(false)}
          />

          <Form onSubmit={onSubmit}>
            <TextField
              defaultValue={apiKey || "NOT FOUND"}
              name="postmanAPIkey"
              description="Postman API key"
              label="Postman API Key"
            />
            <TextField
              defaultValue={workspaceID || "NOT FOUND"}
              name="workspaceID"
              description="Workspace API key"
              label="Workspace id"
            />
          </Form>
        </Fragment>
      ) : (
        <Button
          appearance="primary"
          icon="settings"
          text="Set Config"
          onClick={() => setIsConfig(true)}
        />
      )}
    </Fragment>
  );
};

export const spacePage = render(
  <SpacePage>
    <SpacePageView />
  </SpacePage>
);

const ConfigSettings = () => {
  const [apiKey, setApiKey] = useState(async () => await getSettings("apikey"));
  const [workspaceID, setWorkspaceID] = useState(
    async () => await getSettings("workspaceid")
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
        <TextField
          defaultValue={apiKey || "Not Found"}
          name="postmanAPIkey"
          label="Postman Api Key"
        />
        <TextField
          defaultValue={apiKey || "Not Found"}
          name="workspaceID"
          label="Workspace id"
        />
      </Form>
      {updated && <Text>Your change are updated</Text>}
    </Fragment>
  );
};

export const space = render(
  <SpaceSettings>
    <ConfigSettings />
  </SpaceSettings>
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
