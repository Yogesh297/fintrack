import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import expense from './../assets/images/expense.jpg'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import ExpenseOverview from './../expense/ExpenseOverview'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #dfe9f3, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 900,
    width: '100%',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 400,
    width: '100%',
    objectFit: 'cover',
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f51b5',
      textDecoration: 'none',
    }
  },
  content: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  infoText: {
    marginTop: theme.spacing(2),
    color: '#555',
    lineHeight: 1.6,
    fontSize: '1rem',

  },
  link: {
    color: '#3f51b5',
    fontWeight: 500,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}))

export default function Home() {
  const classes = useStyles()
  return (
    <>
      {auth.isAuthenticated() &&
        <ExpenseOverview />
      }
      {!auth.isAuthenticated() && typeof window !== "undefined" &&
        <div className={classes.root}>
          <Card className={classes.card}>
            <Typography variant="h5" className={classes.title}>
              Welcome to MERN Expense Tracker
            </Typography>

            <CardMedia
              className={classes.media}
              image={expense}
              title="Unicorn Coin"
            />
    

            <CardContent className={classes.content}>
              <Typography variant="body1" component="p">
                Manage your personal and shared expenses efficiently using our secure, intuitive dashboard.
              </Typography>

              <Typography variant="body2" className={classes.infoText}>
                Create an account to track your transactions, visualize spending habits, and stay within your budget effortlessly.
              </Typography>

              <Typography variant="body2" className={classes.infoText}>
                <Link to='/signup' className={classes.link}>Sign up</Link> now or <Link to='/signin' className={classes.link}>Log in</Link> if you already have an account.
              </Typography>
            </CardContent>
          </Card>
        </div>
      }
    </>
  )
}