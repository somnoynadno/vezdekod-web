import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {
    AdaptivityProvider,
    AppRoot,
    Avatar,
    Badge,
    Button,
    ButtonGroup,
    CardGrid,
    Cell,
    Checkbox,
    ConfigProvider,
    ContentCard,
    FormItem,
    FormLayout,
    Group,
    Header,
    IconButton,
    MiniInfoCell,
    Pagination,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Radio,
    RadioGroup,
    SimpleCell,
    SplitCol,
    SplitLayout,
    useAdaptivity,
    View,
    ViewWidth,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {api} from "./http/api";

import {
    Icon20ArrowshapeUpRightOutline,
    Icon20BookmarkOutline,
    Icon20Check,
    Icon20CheckCircleOutline,
    Icon20FireCircleFillRed,
    Icon20PalleteOutline,
    Icon20ViewCircleFillRed,
    Icon20WalletOutline
} from '@vkontakte/icons';

const App = () => {
    const {viewWidth} = useAdaptivity();

    const OFFSET = 20;
    const CUSTOM_BG = "url(https://freefrontend.com/assets/img/css-background-patterns/css-pattern-3.png)";

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(0);
    const [activePanel, setActivePanel] = useState("list");

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("theme"));

    useEffect(() => {
        api.GetMailbox(page * OFFSET, (page + 1) * OFFSET).then(res => setMessages(res));
    }, [page]);

    return (
        <ConfigProvider appearance={selectedTheme}>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout header={<PanelHeader separator={false}/>}>
                        <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
                            <View activePanel={activePanel} style={{backgroundImage: selectedTheme === "custom" ? CUSTOM_BG : "none"}}>
                                {selectedMessage && <Panel id="message">
                                    <PanelHeader
                                        before={
                                            <PanelHeaderBack
                                                onClick={() => setActivePanel("list")}
                                            />
                                        }
                                    >
                                        {selectedMessage.title}
                                    </PanelHeader>
                                    <Group>
                                        <SimpleCell disabled={true}
                                                    description={selectedMessage.author.email}
                                                    before={<Avatar src={selectedMessage.author.avatar}/>}
                                        >
                                            {selectedMessage.author.name}
                                        </SimpleCell>
                                        {selectedMessage.confidence && <MiniInfoCell
                                            textWrap="full"
                                            textLevel="primary"
                                            before={<Icon20ViewCircleFillRed/>}
                                        >
                                            Конфиденциальное
                                        </MiniInfoCell>}
                                        {selectedMessage.important && <MiniInfoCell
                                            textWrap="full"
                                            textLevel="primary"
                                            before={<Icon20FireCircleFillRed/>}
                                        >
                                            Важное
                                        </MiniInfoCell>}
                                        {selectedMessage.finance && <MiniInfoCell
                                            textWrap="full"
                                            textLevel="primary"
                                            before={<Icon20WalletOutline/>}
                                        >
                                            Финансы
                                        </MiniInfoCell>}
                                        {selectedMessage.newThread && <MiniInfoCell
                                            textWrap="full"
                                            textLevel="primary"
                                            before={<Icon20ArrowshapeUpRightOutline/>}
                                        >
                                            Новый тред
                                        </MiniInfoCell>}
                                        <Cell disabled>
                                            {selectedMessage.text}
                                            <br/>
                                            <br/>
                                            Получено: {selectedMessage.dateTime}<br/>
                                        </Cell>
                                        <CardGrid size={"s"}>
                                            {selectedMessage.file && <ContentCard
                                                onClick={() => {
                                                }}
                                                src={selectedMessage.file.preview}
                                                header={selectedMessage.file.filePath}
                                                maxHeight={150}
                                            />
                                            }
                                        </CardGrid>
                                    </Group>
                                </Panel>}
                                <Panel id="list">
                                    <PanelHeader before={<IconButton
                                        onClick={() => setActivePanel("settings")}
                                        style={{marginLeft: 10}}><Icon20PalleteOutline/></IconButton>}>
                                        VEZDEKOD SUPER MAIL SERVICE
                                    </PanelHeader>
                                    <Group header={<Header mode="secondary">Messages</Header>}>
                                        <ButtonGroup mode="horizontal" gap="space" stretched style={{paddingLeft: 20}}>
                                            <Button
                                                size="l"
                                                appearance="accent"
                                                mode="tertiary"
                                                before={<Icon20CheckCircleOutline/>}
                                                onClick={() => {
                                                    let s = new Set(selectedIds);
                                                    for (let i = page * OFFSET; i < (page + 1) * OFFSET; i++) {
                                                        s.add(i);
                                                    }
                                                    setSelectedIds(s);
                                                }}
                                            >
                                                Выделить всё
                                            </Button>
                                            <Button
                                                size="l"
                                                appearance="accent"
                                                mode="tertiary"
                                                before={<Icon20Check/>}
                                                disabled={!selectedIds.size}
                                                onClick={() => {
                                                    selectedIds.forEach((v) => api.MarkRead(v));
                                                    setSelectedIds(new Set());
                                                    api.GetMailbox(page * OFFSET, (page + 1) * OFFSET).then(res => setMessages(res));
                                                }}
                                            >
                                                Прочитано
                                            </Button>
                                            <Button
                                                size="l"
                                                appearance="accent"
                                                mode="tertiary"
                                                before={<Icon20BookmarkOutline/>}
                                                disabled={!selectedIds.size}
                                                onClick={() => {
                                                    selectedIds.forEach((v) => api.SetFlag(v));
                                                    setSelectedIds(new Set());
                                                    api.GetMailbox(page * OFFSET, (page + 1) * OFFSET).then(res => setMessages(res));
                                                }}
                                            >
                                                Поставить флаг
                                            </Button>
                                        </ButtonGroup>
                                        {
                                            messages.map((m, i) => {
                                                return <SimpleCell key={page * OFFSET + i}
                                                                   before={<Checkbox
                                                                       checked={selectedIds.has(page * OFFSET + i)}
                                                                       onClick={() => {
                                                                           let s = new Set(selectedIds);
                                                                           if (s.has(page * OFFSET + i)) {
                                                                               s.delete(page * OFFSET + i);
                                                                           } else {
                                                                               s.add(page * OFFSET + i);
                                                                           }
                                                                           setSelectedIds(s);
                                                                       }}/>}
                                                                   checked={m.read}
                                                                   description={<span onClick={() => {
                                                                       setSelectedMessage(m);
                                                                       setActivePanel("message");
                                                                   }}>
                                                               {m.text}
                                                           </span>}
                                                                   indicator={<>
                                                                       {m.read ? '' :
                                                                           <Badge mode="new" aria-label="Новое"/>}
                                                                       {m.flag ? '' :
                                                                           <Badge mode="prominent" aria-label="Флаг"/>}
                                                                   </>}
                                                                   style={{opacity: m.read ? 0.5 : 1}}
                                                                   expandable>
                                                    <div onClick={() => {
                                                        setSelectedMessage(m);
                                                        setActivePanel("message");
                                                    }}>
                                                        {m.author.email}] ({m.dateTime}) {m.title}
                                                    </div>
                                                </SimpleCell>
                                            })
                                        }
                                        <Pagination
                                            currentPage={page}
                                            onChange={(n) => setPage(n)}
                                            totalPages={messages.length > 0 ? page + 1 : page}
                                        />
                                    </Group>
                                </Panel>
                                <Panel id="settings">
                                    <PanelHeader
                                        before={
                                            <PanelHeaderBack
                                                onClick={() => setActivePanel("list")}
                                            />
                                        }
                                    >
                                        Настройки
                                    </PanelHeader>
                                    <Group>
                                        <FormLayout>
                                            <FormItem top="Выберите тему">
                                                <RadioGroup>
                                                    <Radio onClick={() => {
                                                        setSelectedTheme("light");
                                                        localStorage.setItem("theme", "light");
                                                    }}
                                                           checked={selectedTheme === "light"}>
                                                        Светлая
                                                    </Radio>
                                                    <Radio onClick={() => {
                                                        setSelectedTheme("dark");
                                                        localStorage.setItem("theme", "dark");

                                                    }}
                                                           checked={selectedTheme === "dark"}>
                                                        Тёмная
                                                    </Radio>
                                                    <Radio onClick={() => {
                                                        setSelectedTheme("custom");
                                                        localStorage.setItem("theme", "custom");

                                                    }}
                                                           checked={selectedTheme === "custom"}>
                                                        Кастомная
                                                    </Radio>
                                                </RadioGroup>
                                            </FormItem>
                                        </FormLayout>
                                    </Group>
                                </Panel>
                            </View>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
};

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);
