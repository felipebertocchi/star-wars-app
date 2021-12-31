import React from 'react';
import { Breadcrumbs as BreadC, Link, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const Breadcrumbs = props => {
  const { history, location: { pathname } } = props;
  const pathnames = pathname.split('/').filter(x => x);
  const useStyles = makeStyles(() => ({
    paper: {
      padding: 10,
      margin: '34px',
      marginLeft: '120px',
      maxWidth: 'fit-content'
    },
    font: {
      fontSize: 16
    }
  }));
  const classes = useStyles();
  const atHome = (window.location.pathname === '/' || window.location.pathname === '/login')

  if (atHome) {
    return <></>
  }
  return (
    <Paper className={classes.paper}>
      <BreadC aria-label="breadcrumb">
        <Link key={0} className={classes.font} component="button" onClick={() => history.push('/')} underline='none'>Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = (index === pathnames.length - 1)
          return (isLast ? (
            <Typography key={index} className={classes.font}>
              {name}
            </Typography>
          ) : (
            <Link key={index} className={classes.font} component="button" onClick={() => history.push(routeTo)} underline='none'>{name}</Link>
          )
          )
        })}
      </BreadC>
    </Paper>
  );
}

export default withRouter(Breadcrumbs);
