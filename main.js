const fs = require('fs');
const axios = require("axios");
const config = require("./config")

/*
* You can use this query to get the raw data for batchlist.txt you will have to cleanup it tho
* db.getCollection('item-histories').find({ "item.state": "draft", "item.type" : "GGUM" }, {_id:1})
* */

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
   const response = await axios({
       method: 'post',
       url: config.api + `/item-drafts/${id}/review`,
       headers : {
            "Authorization": "Bearer " + config.jwt
       }
    });
    console.log("review", id);
    console.log("status", response.status);
};

const approve = async (id) => {
    const response = await axios({
        method: 'post',
        url: config.api + `/item-drafts/${id}/approve`,
        headers : {
            "Authorization": "Bearer " + config.jwt
        }
    });
    console.log("approve", id);
    console.log("status", response.status);
};

const massApprover = async () => {
    const data = await getData();
    await Promise.all(data.map(review));
    await Promise.all(data.map(approve));
}

massApprover();