import express from "express";

import { enquiryInsert, enquiryList, enquiryDelete, enquirysingleRow, enquiryUpdate } from "../../controllers/web/enquiryController.js";

let enquiryRouter = express.Router();


enquiryRouter.post('/insert', enquiryInsert);
enquiryRouter.get('/view', enquiryList);
enquiryRouter.delete('/delete/:id',enquiryDelete);
enquiryRouter.get('/single/:id',enquirysingleRow);
enquiryRouter.put('/update/:id',enquiryUpdate);


export default enquiryRouter;

