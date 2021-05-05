import Realm from "realm";

export interface IBook {
    id: number;
    title: string;
    image: string;
    author: string;
    description: string;
    chapter_total: number;
    sort: number;
    created_at: string;
    updated_at: string;
}

export interface IChapter {
    id: number;
    title: string;
    book_id: number;
    cache: boolean;
    episode_total: number;
    chapter_num: number;
}

export interface IEpisode {
    id: number
    book_id: number
    title: string
    image: string
    chapter_id: number
    chapter_num: number
    episode_total: number
    chapter_total: number
    number: number
    roast: number
    width: number
    height: number
    multiple: string
}

class MangaBook {
    static schema = {
        name: "Book",
        primaryKey: "id",
        properties: {
            id: "int",
            title: "string",
            image: "string",
            author: "string",
            description: "string",
            chapter_total: "int",
            sort: "int",
            created_at: "string",
            updated_at: "string"
        }
    };
}

class MangaChapter {
    static schema = {
        name: "Chapter",
        primaryKey: "id",
        properties: {
            id: "int",
            title: "string",
            cache: { type: "int", default: 0 },
            book_id: "int",
            episode_total: "int",
            chapter_num: "int"
        }
    };
}

class MangaEpisode {
    static schema = {
        name: "Episode",
        primaryKey: "id",
        properties: {
            id: "int",
            book_id: "int",
            title: "string",
            image: "string",
            chapter_id: "int",
            chapter_num: "int",
            episode_total: "int",
            chapter_total: "int",
            number: "int",
            roast: "int",
            width: "int",
            height: "int",
            multiple: "double"
        }
    };
}

const realm = new Realm({ schema: [MangaBook, MangaChapter, MangaEpisode], schemaVersion: 1 });

export function saveData(table_name: string, data: any) {
    try {
        realm.write(() => {
            // @ts-ignore
            realm.create(table_name, data, true);
        });
    } catch (error) {
        console.log("保存出错" + error);
    }
}

export default realm;
