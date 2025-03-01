interface Ongoing {
  title: string;
  url: string;
  cover: string;
  day: string;
  currentEpisode: string;
  date: string;
}

interface Search {
  title: string;
  genre: string[];
  status: string;
  rating: string;
  url: string;
  cover: string;
}

interface DownloadAllEpisodes {
  title: string;
  downloads: DownloadEpisode[];
}

interface DownloadEpisode {
  sd360p: LinkDownload[];
  sd480p: LinkDownload[];
  hd720p: LinkDownload[];
}

interface LinkDownload {
  provider: string;
  url: string;
}
