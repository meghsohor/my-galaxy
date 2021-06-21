import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getStar, addStar, updateStar, getUniverses, getColors } from '../../sevices/dataService';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


export default function AddEditStar() {
  const [star, setStar] = useState({
    id: uuidv4(),
    name: '',
    color: '',
    universeId: ''
  });
  const [universes, setUniverses] = useState([]);
  const [colors, setColors] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({
    name: '',
    color: '',
    universeId: '',
  });
  const isInvalid = star.name === '' || star.color === '' || star.universeId === '';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getStar(id).then((res) => {
        if (res) {
          setStar(res);
        } else {
          history.push('/');
        }
      });

    }

  }, [id, history]);

  useEffect(() => {
    getUniverses()
      .then(res => setUniverses(res))
      .catch(err => console.log(err))

    getColors()
      .then(res => setColors(res))
      .catch(err => console.log(err))
  }, [])

  const formSubmit = (e) => {
    e.preventDefault();

    if (!isInvalid) {
      setLoading(true);

      if (!id) {
        addStar(star)
          .then(res => {
            setTimeout(function () {
              history.push("/stars");
            }, 100);
          })
          .catch(err => {
            setLoading(false);
          });
      } else {
        updateStar(star)
          .then(res => {
            setTimeout(function () {
              history.push("/stars");
            }, 100);
          })
          .catch(err => {
            setLoading(false);
          });
      }
    }
  }

  const updateField = (e) => {
    const { name, value } = e.target;
    setStar(star => ({ ...star, [name]: value }));
    setErrors({ ...errors, [name]: '' });
  }

  const validateForm = (e) => {
    const { name, value } = e.target;

    if (value.trim().length === 0) {
      setErrors({ ...errors, [name]: `${name} can't be empty` });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  }


  return (
    <Paper className="mt-3">
      <Container className="py-4" maxWidth="xs">
        <h4>{id ? 'Edit Star' : 'Add Star'}</h4>
        <hr />

        <form noValidate autoComplete="off" onSubmit={formSubmit}>
          <FormGroup>
            <FormControl className="mb-4">
              <TextField label="Name" name="name" required value={star.name}
                onChange={updateField}
                onBlur={validateForm}
                error={errors.name.length > 0}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl className="mb-5" error={errors.color.length > 0}>
              <InputLabel>Color</InputLabel>
              <Select name="color" value={star.color} onChange={updateField} required>
                {
                  colors.length > 0 && colors.map(color => (
                    <MenuItem value={color} key={color}>{color}</MenuItem>
                  ))
                }
              </Select>
              {errors.color && <FormHelperText>{errors.color}</FormHelperText>}
            </FormControl>

            <FormControl className="mb-5" error={errors.universeId.length > 0}>
              <InputLabel>Universe</InputLabel>
              <Select name="universeId" value={star.universeId} onChange={updateField} required>
                {
                  universes.length > 0 && universes.map(universe => (
                    <MenuItem value={universe.id} key={universe.id}>{universe.name}</MenuItem>
                  ))
                }
              </Select>
              {errors.universeId && <FormHelperText>{errors.universeId}</FormHelperText>}
            </FormControl>
          </FormGroup>

          <div className="d-flex justify-content-end">

            <Button variant="contained" color="secondary" onClick={history.goBack}>
              Back
            </Button>
            <Button className="ml-3" type="submit" variant="contained" color="primary" disabled={isInvalid || loading}>
              {id ? 'Update' : 'Create'}
            </Button>

          </div>
        </form>
      </Container>
    </Paper>
  )
}