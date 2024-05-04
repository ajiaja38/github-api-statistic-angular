interface IOwner {
  login: string;
  id: number;
  avatar_url: string;
}

export interface IRepo {
  id: number;
  name: string;
  url: string;
  private: boolean;
  owner: IOwner;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clones_url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  open_issues_count: number;
  topics: string[];
  size: number;
  visibility: string;
}
