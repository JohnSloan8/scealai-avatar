import { Serializable } from "../utils/serializable";

export class Story extends Serializable {
    _id: string;
    title: string;
    date: Date;
    lastUpdated: Date;
    dialect: string;
    text: string;
    htmlText: string;
    author: string;
    studentId: string;
    wordCount: number;
    feedback: {
        seenByStudent: boolean;
        text: string;
        audioId: string;
    };
    activeRecording: string;
}
