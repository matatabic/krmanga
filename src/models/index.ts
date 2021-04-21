import home from "./home";
import guess from "./guess";
import category from "./category";
import categorySetting from "./categorySetting";
import history from "@/models/history";
import collection from "@/models/collection";
import brief from "./brief";
import mangaView from "./mangaView";
import search from "./search";
import user from "./user";
import download from "./download";
import downloadManage from "./downloadManage";
import chapterManage from "./ChapterManage";
import { DvaLoadingState } from "dva-loading-ts";


const models = [home, guess, category, categorySetting, brief, mangaView, search, collection, history, user, download, downloadManage, chapterManage];

export type RootState = {
    home: typeof home.state;
    guess: typeof guess.state;
    category: typeof category.state;
    categorySetting: typeof categorySetting.state;
    collection: typeof collection.state,
    history: typeof history.state,
    brief: typeof brief.state;
    mangaView: typeof mangaView.state;
    search: typeof search.state;
    download: typeof download.state;
    downloadManage: typeof downloadManage.state;
    chapterManage: typeof chapterManage.state;
    user: typeof user.state;
    loading: DvaLoadingState;
} & {
    [key: string]: typeof category.state;
};

export default models;
