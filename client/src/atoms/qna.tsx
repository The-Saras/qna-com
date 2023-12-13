import { atom } from "recoil";


export const qnaItems = atom({
    key:'qnaItems',
    default:[]
})


export const questions = atom({
    key:'questions',
    default:[]
});

export const questiontoask = atom({
    key:'questiontoask',
    default:''
});