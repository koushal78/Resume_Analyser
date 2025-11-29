import * as cheerio from "cheerio";
import axios from "axios";
import ResumeFeedback from "../model/feedback.js";



export const health = (req,res)=>{
    res.json({sucees:true,message:"route is working fine ... "})

}

export const getDetails = async (req, res) => {
  let inputUrl = req.body.url;

  const id = makeUrl(inputUrl);
  const url = `https://www.linkedin.com/jobs/view/${id}/`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const organization = $(".topcard__org-name-link").text().trim();
  const title = $(".top-card-layout__title").text().trim();
  const container = $(".show-more-less-html__markup");

  let description = container.text();
  description = description
    .replace(/\s+/g, " ")
    .replace(/ \./g, ".")
    .trim();


    



 

  res.json({ organization, title, description });
};

const makeUrl = (url) => {
  const match =
    url.match(/currentJobId=(\d+)/) || url.match(/view\/(\d+)/);
  return match ? match[1] : null;
};
