import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import { getStarWithUniverse, deleteStar } from '../../sevices/dataService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';


export default function StarDetails() {
  const [star, setStar] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const star = await getStarWithUniverse(id);
      if (star) {
        setStar(star);
        setLoading(false);
      } else {
        history.push('/');
      }
    }

    if (id) {
      fetchData();
    }

  }, [id, history]);

  const handleModalClose = (res) => {
    setOpenModal(false);
    if (res) {
      setLoading(true);
      deleteStar(star.id)
        .then(res => {
          history.push('/stars');
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        })
    }
  }


  return (
    <Container className="py-4" maxWidth="xs">
      {loading && (
        <Backdrop open={true} style={{ zIndex: 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {
        star && !loading && (
          <React.Fragment>
            <Card>
              <CardMedia
                style={{ height: `200px` }}
                image="/images/star.jpg"
                title={star.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className="d-flex">
                  <Icon fontSize="large" style={{ color: star.color }} className="mr-2">star</Icon>
                  {star.name}
                </Typography>
                <hr />
                <List subheader={<ListSubheader>Universe</ListSubheader>}>
                  <ListItem component={RouterLink} to={`/universes/${star.universeId}`}>
                    <ListItemIcon>
                      <Icon fontSize="large">public</Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={star.universe}
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions className="justify-content-end">
                <Button size="medium" component={RouterLink} to="/stars">Back</Button>
                <Button size="medium" color="secondary" onClick={() => setOpenModal(true)}>Delete</Button>
                <Button size="medium" color="primary" component={RouterLink} to={`/stars/${star.id}/edit`}>Edit</Button>
              </CardActions>
            </Card>
          </React.Fragment>
        )
      }
      <ConfirmDialog open={openModal} onClose={handleModalClose} />
    </Container>
  );
}