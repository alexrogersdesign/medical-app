"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnosis = void 0;
const diagnosis_json_1 = __importDefault(require("../data/diagnosis.json"));
const diagnosisList = diagnosis_json_1.default;
const getDiagnosis = () => {
    return diagnosisList;
};
exports.getDiagnosis = getDiagnosis;
