import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VideoCard } from './videoCard';
import { TVideo } from '../types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 20,
  },
  cardContainer: {
    display: 'flex',
    margin: theme.spacing(1),
  },
}));

export const VideoList: React.FC<{ videos: TVideo[] }> = ({ videos }) => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      {videos.map(video => (
        <div key={video.id} className={classes.cardContainer}>
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};
