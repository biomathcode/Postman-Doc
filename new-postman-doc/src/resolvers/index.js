//https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-page/#api-pages-post
import api, { route } from '@forge/api';
import Resolver from '@forge/resolver';
import { kvs } from '@forge/kvs'
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



const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Hello, world!';
});

resolver.define('getSpaceData', async (req) => {

  console.log('this is payload in req', req.payload)


  const workspaceID = req.payload.workspaceID

  const apiKey = req.payload.postmanAPIkey

  const response = await api.fetch(
    `https://api.getpostman.com/collections?workspace=${workspaceID}`,
    {
      headers: {
        "X-API-Key": apiKey,
      },
    }
  );

  const spaceData = await response.json();

  console.log(spaceData);


  return spaceData;
});



resolver.define('createPage', async (req) => {

  const input = "http://locahost:3000";

  const key = req.payload.key;

  const collectionId = req.payload.collectionId;

  const data = await kvs.getSecret('config')

  const apiKey = data.postmanAPIkey;

  const urlId = "https://api.getpostman.com/collections/" + collectionId;

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


  console.log('spaceId', key)


  const jsondata = {
    type: "page",
    title: title,
    space: { key: key },
    spaceId: key,
    body: {
      storage: {
        value: description + name,
        representation: "storage",
      },
    },
  };

  const response = await api
    .asApp()
    .requestConfluence(route`/wiki/api/v2/pages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsondata),
    });
  const newResponse = await response.json();

  console.log('this is the response ', response);
  return newResponse
})


resolver.define('storeConfig', async (req) => {
  //TODO: Add the Config here 

  const { postmanAPIkey, workspaceID } = req.payload;

  console.log('this is the payload', req.payload)
  await kvs.setSecret("config", { postmanAPIkey, workspaceID });
})

resolver.define('getConfig', async (req) => {
  const data = await kvs.getSecret('config')

  console.log('config', data)

  return data;
})

export const handler = resolver.getDefinitions();





