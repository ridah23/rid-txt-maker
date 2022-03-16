const ig = require("instatouch");
const axios = require('axios');
//const tt = require('tiktok-scraper');
const exec = require('child_process').exec;
const os = require("os");
const { isUrl } = require("../../src/helpers/functions");
const options = {
  count: 0,
  mediaType: "all",
  timeout: 0,
};

async function instagram(url) {
  if (!url) {
    throw new Error("Input url !!");
  }
  if (!isUrl(url)) {
    throw new Error("Wrong url !!");
  }
  url = url.split("?")[0];
  let data = await ig.getPostMeta(url, options);
  let validasi = data.graphql.shortcode_media.__typename;
  if (validasi == "GraphVideo") {
    let link = data.graphql.shortcode_media.video_url;
    let type = "Video";
    return { link, type, moreinfo: data };
  } else if (validasi == "GraphImage") {
    let link = data.graphql.shortcode_media.display_url;
    let type = "Image";
    return { link, type, moreinfo: data };
  } else if (validasi == "GraphSidecar") {
    let link = data.graphql.shortcode_media.edge_sidecar_to_children.edges;
    let h = [];
    for (let i = 0; i < link.length; i++) {
      let hasil = link[i].node.display_url;
      h.push({ slide: i + 1, url: hasil, type: "Slide" });
      console.log('\n                  ___                       ___           ___                 \n      ___        \/__\/\\        ___          \/  \/\\         \/  \/\\          ___   \n     \/  \/\\       \\  \\:\\      \/  \/\\        \/  \/:\/        \/  \/:\/         \/__\/|  \n    \/  \/:\/        \\__\\:\\    \/  \/:\/       \/  \/:\/        \/  \/:\/         |  |:|  \n   \/  \/:\/     ___ \/  \/::\\  \/__\/::\\      \/  \/:\/  ___   \/  \/:\/  ___     |  |:|  \n  \/  \/::\\    \/__\/\\  \/:\/\\:\\ \\__\\\/\\:\\__  \/__\/:\/  \/  \/\\ \/__\/:\/  \/  \/\\  __|__|:|  \n \/__\/:\/\\:\\   \\  \\:\\\/:\/__\\\/    \\  \\:\\\/\\ \\  \\:\\ \/  \/:\/ \\  \\:\\ \/  \/:\/ \/__\/::::\\  \n \\__\\\/  \\:\\   \\  \\::\/          \\__\\::\/  \\  \\:\\  \/:\/   \\  \\:\\  \/:\/     ~\\~~\\:\\ \n      \\  \\:\\   \\  \\:\\          \/__\/:\/    \\  \\:\\\/:\/     \\  \\:\\\/:\/        \\  \\:\\\n       \\__\\\/    \\  \\:\\         \\__\\\/      \\  \\::\/       \\  \\::\/          \\__\\\/\n                 \\__\\\/                     \\__\\\/         \\__\\\/                \n')
      return h;
    }
  }
}
async function facebook_url(url) {
  if (!url) {
    throw new Error("Input URL");
  }
  var fb_data = ''
  axios.get(url).then(async (data) => {
    fb_data = data.data.split('hd_src:"')[1].split('",sd_src:"')[0]
  })
  return fb_data;
}
async function facebook_title(url) {
  if (!url) {
    throw new Error("Input URL");
  }
  var fb_data = ''
  axios.get(url).then(async (data) => {
    fb_data = data.data.split('<title id="pageTitle">')[1].split('</title>')[0]
  })
  return fb_data;
}
async function facebook_caption(url) {
  if (!url) {
    throw new Error("Input URL");
  }
  var fb_data = ''
  axios.get(url).then(async (data) => {
    fb_data = data.data.split('<meta name="description" content="')[1].split('" />')[0]
  })
  return fb_data;
}
module.exports = instagram;
module.exports = facebook_url;
module.exports = facebook_title;
module.exports = facebook_caption;
