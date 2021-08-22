import express from 'express';
import { getPatientsNonSensitive, addPatient, getPatientById, addEntry } from '../services/patientsService';
import { NewEntry, NewPatient } from '../types';
// import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req,res) => {
    res.send(getPatientsNonSensitive());
});

router.get('/:id', (req,res) => {
    const response = getPatientById(req.params.id);
    if(response){
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const process = (newEntry: NewEntry) => {
        const result = addEntry(newEntry, id);
        return result;
    };
    console.log('req.body', req.body);
    try {
        const response = process(req.body);
        if (response){
            res.send(response);
        } else {
            res.sendStatus(400);
        }
    } catch ({message}) {
        res.status(400).send(message);
    }
});

router.post('/', (req, res) => {
    const process = (newPatient: NewPatient) => {
        const result = addPatient(newPatient);
        return result;
    };
    console.log('req.body', req.body);
    try {
        const response = process(req.body);
        if (response){
            res.send(response);
        } else {
            res.sendStatus(400);
        }
    } catch ({message}) {
        res.status(400).send(message);
    }
    

} );

export default router;