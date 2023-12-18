import { atom } from "recoil";


export const qnaItems = atom({
    key:'qnaItems',
    default:[]
})


export const questions = atom<any[]>({
    key:'questions',
    default:[]
});

export const questiontoask = atom({
    key:'questiontoask',
    default:''
});

export const qnaCreate = atom({
    key:'qnaCreate',
    default:''
});