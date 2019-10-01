import { types, flow, cast } from 'mobx-state-tree';
import { client } from '../client';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export type TVideo = ReturnType<typeof Video.create>;
export type TVideoStore = ReturnType<typeof VideoStore.create>;

const videosQuery = /* GraphQL */ `
  query {
    videos {
      id
      title
      description
      cover {
        url
      }
    }
  }
`;

const videoQuery = /* GraphQL */ `
  query getVideo($id: ID!) {
    video(id: $id) {
      id
      title
      description
      cover {
        url
      }
      media {
        url
      }
    }
  }
`;

type VideoItem = {
  id: string;
  title: string;
  description: string;
  media?: { url: string };
  cover: { url: string };
};

export const Video = types
  .model('Video', {
    id: types.string,
    title: types.string,
    description: types.string,
    cover: types.string,
    media: types.maybe(types.string),
  })
  .actions(() => ({}));

export const VideoStore = types
  .model('VideoStore', {
    videos: types.array(Video),
    currentVideo: types.maybe(Video),
  })
  .actions(self => ({
    fetchVideos: flow(function* fetchVideos() {
      const res: { videos: VideoItem[] } = yield client.request(videosQuery);

      const videos = res.videos.map(video => ({
        id: video.id,
        title: video.title,
        description: video.description,
        cover: video.cover.url,
      }));

      self.videos = cast(videos);
    }),
    fetchCurrentVideo: flow(function* fetchCurrentVideo(id: string) {
      const res: { video: VideoItem } = yield client.request(videoQuery, { id });

      const {
        title,
        description,
        cover: { url: cover },
        media: { url: media },
      } = res.video;

      const video = {
        id,
        title,
        description,
        cover,
        media,
      };

      self.currentVideo = cast(video);
    }),
  }));
