import { Otakudesu } from "./src/lib/otakudesu";
const express = require("express");
const serverless = require("serverless-http");

const api = express();
api.use(express.json());
const otakudesu = new Otakudesu("https://otakudesu.io/");

api.get("/api/otakudesu", async (req: any, res: any) => {
  const { s } = req.query;
  if (s) {
    const search = await otakudesu.search(s);
    res.json({
      search,
    });
  } else {
    const ongoing = await otakudesu.ongoing();
    res.json({ ongoing });
  }
});

api.get("/api/otakudesu/download", async (req: any, res: any) => {
  const { url } = req.query;
  if (url) {
    const download = await otakudesu.downloadAllEpisodes(url);
    res.json({
      download,
    });
  } else {
    res.json({
      msg: "Harap masukan url",
      contoh:
        "/api/otakudesu/download?url=https://otakudesu.cloud/anime/maou-gakuin-s2-p2-sub-indo",
    });
  }
});

module.exports.handler = serverless(api);
