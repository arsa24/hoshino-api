import { fetchWebsite } from "../utils/fetch_website";

export class Otakudesu {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getCurrentUrl(): Promise<string> {
    const $ = await fetchWebsite(this.url);
    const url: string = $("a#skip").attr("href") ?? "";
    return url;
  }

  async ongoing(): Promise<Ongoing[]> {
    const url: string = await this.getCurrentUrl();
    let $ = await fetchWebsite(url);
    let result: Ongoing[] = [];
    $("div.rapi div.venz ul")
      .eq(0)
      .children("li")
      .each((i: number, e) => {
        result.push({
          cover:
            $(e).find("div.thumbz").children("img").attr("src")?.trim() ?? "",
          currentEpisode: $(e).find("div.epz").text().trim(),
          day: $(e).find("div.epztipe").text().trim(),
          title: $(e).find("h2.jdlflm").text(),
          date: $(e).find("div.newnime").text().trim(),
          url: $(e).find("div.thumb").children("a").attr("href")?.trim() ?? "",
        });
      });
    return result;
  }

  async search(s: string): Promise<Search[]> {
    const url: string = await this.getCurrentUrl();
    let $ = await fetchWebsite(url, {
      params: {
        s,
        post_type: "anime",
      },
    });
    let result: Search[] = [];

    $('li[style="list-style:none;"]').each((i: number, e) => {
      let genres: string[] = $(e)
        .find("div.set b:contains('Genres')")
        .parent()
        .find("a")
        .map((_, element) => $(element).text().trim())
        .get();
      result.push({
        cover: $(e).find("img.attachment-post-thumbnail").attr("src") ?? "",
        genre: genres,
        rating: $(e).find("div.set b:contains('Rating')").parent().text(),
        status: $(e).find("div.set b:contains('Status')").parent().text(),
        title: $(e).find("h2 a").text(),
        url: $(e).find("h2 a").attr("href")?.trim() ?? "",
      });
    });
    return result;
  }

  async downloadAllEpisodes(url: string): Promise<DownloadAllEpisodes[]> {
    const $ = await fetchWebsite(url);
    const promises = $("div.episodelist")
      .eq(1)
      .find("ul li")
      .map((i: number, e: any) => {
        const episodeUrl = $(e).find("span a").attr("href")?.trim() ?? "";
        const title = $(e).find("span a").text().trim();

        return this.downloadEpisode(episodeUrl).then((downloads) => ({
          index: i,
          data: { title, downloads },
        }));
      })
      .get();

    const data = await Promise.all(promises);
    const result: DownloadAllEpisodes[] = data
      .sort((a, b) => a.index - b.index)
      .map((item) => item.data);
    return result;
  }

  async downloadEpisode(url: string): Promise<DownloadEpisode[]> {
    let result: DownloadEpisode[] = [];
    let $ = await fetchWebsite(url);
    const getDownloadLinks = (resolution: string): LinkDownload[] => {
      return $(`strong:contains('${resolution}')`)
        .parent()
        .find("a")
        .map((_, e) => ({
          provider: $(e).text().trim(),
          url: $(e).attr("href")?.trim() ?? "",
        }))
        .get();
    };

    result.push({
      sd360p: getDownloadLinks("360p"),
      sd480p: getDownloadLinks("480p"),
      hd720p: getDownloadLinks("720p"),
    });

    return result;
  }
}
