import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import { getUniverse, deleteUniverse, getStars } from '../../sevices/dataService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ConfirmDialog from '../confirm-dialog/ConfirmDialog';


export default function UniverseDetails() {
  const [universe, setUniverse] = useState(null);
  const [stars, setStars] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const universe = await getUniverse(id);

      if (universe) {
        setUniverse(universe);
        const allStars = await getStars();
        if (allStars.length > 0) {
          const universeStars = allStars.filter(star => star.universeId === universe.id);
          setStars(universeStars);
        }
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
      deleteUniverse(universe.id)
        .then(res => {
          history.push('/');
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
        universe && !loading && (
          <React.Fragment>
            <Card>
              <CardMedia
                style={{ height: `200px` }}
                image="/images/universe.jpg"
                title={universe.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {universe.name}
                </Typography>
                <hr />
                {
                  stars.length > 0 ? (
                    <List subheader={<ListSubheader>Stars</ListSubheader>}>
                      {
                        stars.map(star => (
                          <ListItem key={star.id} component={RouterLink} to={`/stars/${star.id}`}>
                            <ListItemIcon>
                              <Icon fontSize="large" style={{ color: star.color }}>star</Icon>
                            </ListItemIcon>
                            <ListItemText
                              primary={star.name}
                            />
                          </ListItem>
                        ))
                      }
                    </List>
                  ) : (
                    <Typography color="textSecondary">
                      This Universe doesn't have any star...
                    </Typography>
                  )
                }

              </CardContent>
              <CardActions className="justify-content-end">
                <Button size="medium" component={RouterLink} to="/universes">Back</Button>
                <Button size="medium" color="secondary" onClick={() => setOpenModal(true)}>Delete</Button>
                <Button size="medium" color="primary" component={RouterLink} to={`/universes/${universe.id}/edit`}>Edit</Button>
              </CardActions>
            </Card>
          </React.Fragment>
        )
      }
      <ConfirmDialog open={openModal} onClose={handleModalClose} />
    </Container>
  );
}