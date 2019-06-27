const fs = require('fs');
const axios = require("axios");
const config = require("./config")

/*
* You can use this query to get the raw data for batchlist.txt you will have to cleanup it tho
* db.getCollection('items').find({ accountId: ObjectId("5c9bf1cd4ecd5700100f6a13"), type : "GGUM" }, {_id:1})
* db.getCollection('item-histories').find({ "item.accountId": ObjectId("5d0a3029b94ffe5469e11f28"), "item.type" : "3PL" }, {_id:1})
* */

let failsReview = [];
let failsApprove = [];
const getData = async () => {
    try {
        const data = await fs.readFileSync('batchlist.txt', 'utf8');
        const dataString = data.toString();
        return dataString.split("\r\n").filter(x => x);
    } catch(e) {
        console.log('Error:', e.stack);
    }
};

const review = async (id) => {
    try{
        const response = await axios({
            method: 'post',
            url: config.api + `/item-drafts/${id}/review`,
            headers : {
                "Authorization": "Bearer " + config.jwt
            }
        });
        console.log("review", id);
        console.log("status", response.status);
    }catch(e) {
        failsReview.push(id);
    }

};

const approve = async (id) => {
    try{
        const response = await axios({
            method: 'post',
            url: config.api + `/item-drafts/${id}/approve`,
            headers : {
                "Authorization": "Bearer " + config.jwt
            }
        });
        console.log("approve", id);
        console.log("status", response.status);
    }catch(e) {
        failsApprove.push(id);
    }

};

const massApprover = async () => {
    const data = await getData();
    await Promise.all(data.map(review));
    await Promise.all(data.map(approve));
    console.log('review fails', failsApprove)
    console.log('approve fails', failsApprove)
}

massApprover();
