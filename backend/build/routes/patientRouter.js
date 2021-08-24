"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = require("../services/patientsService");
// import { Diagnosis } from '../types';
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.getPatientsNonSensitive());
});
router.get('/:id', (req, res) => {
    const response = patientsService_1.getPatientById(req.params.id);
    if (response) {
        res.send(response);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const process = (newEntry) => {
        const result = patientsService_1.addEntry(newEntry, id);
        return result;
    };
    console.log('req.body', req.body);
    try {
        const response = process(req.body);
        if (response) {
            res.send(response);
        }
        else {
            res.sendStatus(400);
        }
    }
    catch ({ message }) {
        res.status(400).send(message);
    }
});
router.post('/', (req, res) => {
    const process = (newPatient) => {
        const result = patientsService_1.addPatient(newPatient);
        return result;
    };
    console.log('req.body', req.body);
    try {
        const response = process(req.body);
        if (response) {
            res.send(response);
        }
        else {
            res.sendStatus(400);
        }
    }
    catch ({ message }) {
        res.status(400).send(message);
    }
});
exports.default = router;
