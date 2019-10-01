import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Link from 'next/link';
import { TVideo } from '../models/videoStore';
import { getAssetUrl } from '../utils';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export const VideoCard: React.FC<{ video: TVideo }> = ({ video }) => {
  const classes = useStyles({});

  return (
    <Card className={classes.card}>
      <Link href={`/watch/${video.id}`}>
        <a className={classes.link}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={video.title}
              height="200"
              image={getAssetUrl(video.cover)}
              title={video.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {video.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {video.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
};
