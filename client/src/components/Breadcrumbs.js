import React from 'react';
import { Breadcrumbs as BreadC, Link, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'; 

const Breadcrumbs = props => {
  const { history, location : { pathname } } = props;
  const pathnames = pathname.split('/').filter(x => x);
  const useStyles = makeStyles(() => ({
    paper: {
        padding: 12,
        margin: '40px',
        maxWidth: 'fit-content'
    }
}));
  const classes = useStyles();
  return (
      <Paper className={classes.paper}>
        <BreadC aria-label="breadcrumb">
          <Link href="/" onClick={() => history.push('/')} underline='none'>Home</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = (index === pathnames.length - 1)
            return ( isLast ? (
              <Typography>
                {name}
              </Typography>
              ) : (
              <Link href="#" onClick={() => history.push(routeTo)} underline='none'>{name}</Link>
              )
            )
          })}
          {/* Los href no cumplen funcion alguna mas que para que aparezca el puntero de una mano selectora cuando se hace hover. */}
        </BreadC>
      </Paper>
  );
}

export default withRouter(Breadcrumbs);
