import React, { useEffect, useState } from 'react';
import ForgeReconciler, {
    Text, Link, Form,
    FormHeader,
    FormSection,
    FormFooter,
    Label,
    RequiredAsterisk,
    HelperMessage,
    Textfield,
    Stack,
    Button,
    Lozenge,
    ModalTransition,
    Modal,
    ModalTitle,
    ModalHeader, ModalBody, ModalFooter, Strong, DynamicTable, Inline, useForm,
    useProductContext,
    SectionMessage,
    SectionMessageAction
} from '@forge/react';
import { invoke } from '@forge/bridge';


export const head = {
    cells: [
        {
            key: "collection",
            content: "Collection Name",
            isSortable: true,
        },
        {
            key: "date",
            content: "Date Created",
            isSortable: true,
        },
        {
            key: "isPublic",
            content: "Status",
            isSortable: true,
        },
        {
            key: "action",
            content: "Action",
            isSortable: true,
        },
    ],
};

const createKey = (input) => {
    return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
}


const App = () => {

    const [isconfig, setIsConfig] = useState(true);
    const [configData, setConfigData] = useState({
        postmanAPIkey: '',
        workspaceID: ''
    })

    const [error, setError] = useState({
        isError: false,
        message: '',
    })

    const [generatedDoc, setGeneratedDoc] = useState({
        status: false,
        link: '',
    });

    const [isForm, setForm] = useState(true);

    const [selectedCollectionId, setSelectedCollectionId] = useState(null);


    const [data, setData] = useState(null);

    useEffect(async () => {
        await invoke('getConfig').then(async (config) => {
            console.log("Config data:", config);
            if (config.postmanAPIkey.length > 0 && config.workspaceID.length > 0) {
                setIsConfig(false);
                setConfigData({
                    postmanAPIkey: config.postmanAPIkey,
                    workspaceID: config.workspaceID
                });

                await invoke('getSpaceData', {
                    postmanAPIkey: config.postmanAPIkey,
                    workspaceID: config.workspaceID
                }).then(setData)
            } else {
                setIsConfig(true);
            }
        })
    }, []);

    useEffect(() => {
        invoke('getSpaceData', {
            postmanAPIkey: configData.postmanAPIkey,
            workspaceID: configData.workspaceID
        }).then(setData)

    }, [configData.postmanAPIkey, configData.workspaceID]);


    const { handleSubmit, register, getFieldId } = useForm();


    const handleForm = async (data) => {
        // handle data inputs
        console.log(data);

        await invoke('storeConfig', {
            postmanAPIkey: data.postmanAPIkey,
            workspaceID: data.workspaceID
        }).then(() => {
            setIsConfig(false);
            setForm(false);

            invoke('getSpaceData', {
                postmanAPIkey: data.postmanAPIkey,
                workspaceID: data.workspaceID
            }).then(setData)
        }).catch((error) => {
            console.error("Error setting config:", error);
        });


    };

    const SpaceContext = useProductContext();




    const rows = data?.collections?.map((collection) => ({
        key: collection.id,
        cells: [
            {
                key: createKey(collection.name),

                content: collection.name,
            },
            {
                key: createKey(collection.name) + "Date",
                content: <Lozenge isBold appearance="default">{new Date(collection.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}</Lozenge>,
            },
            {
                key: createKey(collection.name) + "Status",

                content: <Lozenge appearance={collection.isPublic ? "success" : "removed"}>
                    {collection.isPublic ? "Public" : "Private"}
                </Lozenge>,
            },

            {
                key: createKey(collection.name) + "Action",

                content: (
                    <Button
                        type='button'
                        appearance='primary'
                        icon="plus"
                        children="Create Doc"
                        isDisabled={selectedCollectionId === collection.id}

                        onClick={async () => {

                            setSelectedCollectionId(collection.id);

                            setIsLoading(true);

                            console.log(`sending message, collection: ${JSON.stringify(SpaceContext)} `);

                            invoke('createPage', {
                                title: collection.name,
                                key: SpaceContext.extension.space.id, // Replace with your space key
                                collectionId: collection.id,
                                workspaceId: 'workspaceId',
                                apiKey: "key"
                            }).then((response) => {

                                console.log("Response from createPage:", response);

                                setGeneratedDoc({
                                    status: true,
                                    link: response?._links?.base + response?._links?.webui
                                });

                                setIsLoading(false);
                                setSelectedCollectionId(null);
                                console.log(response);
                            });
                        }}
                    />
                ),
            },
        ],
    }));

    return (
        <Stack space="space.200">


            {
                generatedDoc.status && (

                    <SectionMessage
                        title="New API Documentation Generated"
                        appearance="info"

                    >
                        <Text>Your Last Generated Page {"  "}

                            <Link openNewTab href={generatedDoc.link} >
                                <Strong>{generatedDoc.link}</Strong>
                            </Link>
                        </Text>

                    </SectionMessage>
                )
            }



            <Inline space="space.400">





                <Text>
                    We provied Macro, Space Page dedicated to generating documentation from
                    your Postman Collections. Please read a helper doc here :
                    <Link href="https://medium.com/@biomathcode/automate-api-documentation-on-atlassian-confluence-with-postman-doc-9b1f3a24eed0">
                        Click here to learn more
                    </Link>
                </Text>



            </Inline>

            <Stack >

                {isconfig ? (
                    <>

                        <Form onSubmit={handleSubmit(handleForm)}  >
                            <Inline space='space.200' spread='space-between'>

                                <FormHeader title="Set Configs">
                                    Required fields are marked with an asterisk <RequiredAsterisk />
                                </FormHeader>
                                <Button

                                    iconAfter="editor-close"
                                    appearance="subtle"
                                    onClick={() => setIsConfig(false)}
                                >
                                    Hide
                                </Button>


                            </Inline>
                            <FormSection >
                                <Label labelFor={getFieldId("postmanAPIkey")}>
                                    Postman API key
                                    <RequiredAsterisk />
                                </Label>
                                <Textfield defaultValue={configData.postmanAPIkey} {...register("postmanAPIkey", { required: true })} />
                                <HelperMessage>
                                    Please Visit And get the API key from
                                </HelperMessage>

                                <Label labelFor={getFieldId("workspaceID")}>
                                    Workspace id
                                    <RequiredAsterisk />
                                </Label>
                                <Textfield defaultValue={configData.workspaceID} {...register("workspaceID", { required: true })} />
                            </FormSection>
                            <FormFooter>
                                <Button appearance="primary" type="submit">
                                    Submit
                                </Button>
                            </FormFooter>
                        </Form>


                    </>
                ) : (
                    <Stack space="space.200">


                        <Button
                            appearance="primary"
                            icon="settings"

                            onClick={() => setIsConfig(true)}
                        >
                            Set Config
                        </Button>

                        <Stack>
                            <>
                                {data ? (
                                    <DynamicTable
                                        caption='Postman Collections'
                                        head={head}
                                        rows={rows}


                                    />

                                ) : (
                                    <Text>Please set your Postman Api key and Workspace Id</Text>
                                )}
                            </>
                        </Stack>

                    </Stack>
                )}

            </Stack>



        </Stack>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
