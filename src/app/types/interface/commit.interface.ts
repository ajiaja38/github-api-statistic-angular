interface DataCommiter {
  name: string;
  email: string;
  date: string;
}

export interface ICommits {
  sha: string;
  commit: {
    author: DataCommiter;
    commiter: DataCommiter;
    message: string;
  };
}
