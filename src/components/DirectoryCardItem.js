import React from 'react';
import history from '../redux/history';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import colors from '../styles/colors';

const styles = makeStyles({
  item: {
    position: 'relative',
    width: '100%',
    height: '168px',
    borderRadius: '6px',
    boxShadow: '0px 2px 6px rgba(10, 23, 51, 0.04), 0px 4px 12px rgba(10, 23, 51, 0.04)'
  },
  cardButton: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  cardContent: {
    height: '100%',
    padding: '14px',
  },
  directoryTitle: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: 1.45,
    color: colors.greyScale.dark,
    textTransform: 'capitalize',
    marginTop: '10px'
  },
  directoryImageWrapper: {
    position: 'relative',
    height: '64px',
    width: '64px',
    overflow: 'hidden',
    margin: '0 auto'
  },
  directoryImage: {
    width: '100%',
    height: '100%'
  }
});

export default function DirectoryCard(props) {
  const classes = styles();
  const { directoryName, directoryImage } = props;

  const directoryTitle = str => str.split('-').join(' ');

  return (
    <Card className={classes.item}>
      <Button onClick={() => history.push(`/directories/${directoryName}`)} className={classes.cardButton}>
        <CardContent className={classes.cardContent}>
          <div className={classes.directoryImageWrapper}>
            {
              directoryImage ? (
                <img src={directoryImage} alt={'directory'} className={classes.directoryImage}/>
              ) : null
            }
          </div>
          <Typography variant={'subtitle2'} className={classes.directoryTitle}>{directoryTitle(directoryName)}</Typography>
        </CardContent>
      </Button>
    </Card>
  )
}