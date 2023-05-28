const axios = require('axios');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const users = require("./users.json")
const sleep = (ms) =>  new Promise(resolve => setTimeout(resolve, ms))
let index = +fs.readFileSync("index.txt", "utf8")


app.get('/get', (req, res) => {
  res.send(index.toString())
});

async function startFollow() {
  for (let i = index; i <= users.length; i++) {
    if (index >= users.length) return 
    const user = users[i]
    followUser(user)
    await sleep(2000)
    index++
    fs.writeFileSync("index.txt", JSON.stringify(index), "utf8")
  }
}
startFollow()


async function followUser(user, i) {
  try {
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2Q1NmI4Njg0NDhlNTBjYTc0NGRmNWEiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NTAwOTQ5MywiZXhwIjoxNjg3NjAxNDkzfQ.mRbSxGri3MUC74gNcIuh0ywNRGwliukApAyP2Rs1yg0',
      'Content-Length': '0',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://www.frontendmentor.io',
      'Referer': 'https://www.frontendmentor.io/',
      'Sec-Ch-Ua': '"Not:A-Brand";v="99", "Chromium";v="112"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 9; JKM-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36'
    };
    
    const response = await axios.post(`https://backend.frontendmentor.io/rest/v2/auth/profile/follow/users/${user}`, null, {
      headers
    });
    
    if (i % 20 === 0) {
      console.log(i)
    }
  } catch (error) {
    console.log("fail follow: " + i);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});