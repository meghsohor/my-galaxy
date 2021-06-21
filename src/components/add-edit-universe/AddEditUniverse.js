import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getUniverse, addUniverse, updateUniverse } from '../../sevices/dataService';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function AddEditUniverse() {
  const [universe, setUniverse] = useState({
    id: uuidv4(),
    name: '',
    maxSize: ''
  });
  const { id } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState({
    name: '',
    maxSize: '',
  });
  const isInvalid = universe.name === '' || universe.maxSize === '';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getUniverse(id).then((res) => {
        if (res) {
          setUniverse(res);
        } else {
          history.push('/');
        }
      });

    }

  }, [id, history]);

  const formSubmit = (e) => {
    e.preventDefault();

    if (!isInvalid) {
      setLoading(true);

      if (!id) {
        addUniverse(universe)
          .then(res => {
            setTimeout(function () {
              history.push("/universes");
            }, 100);
          })
          .catch(err => {
            setLoading(false);
          });
      } else {
        updateUniverse(universe)
          .then(res => {
            setTimeout(function () {
              history.push("/universes");
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
    setUniverse(universe => ({ ...universe, [name]: value }));
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
        <h4>{id ? 'Edit Universe' : 'Add Universe'}</h4>
        <hr />

        <form noValidate autoComplete="off" onSubmit={formSubmit}>
          <FormGroup>
            <FormControl className="mb-4">
              <TextField label="Name" name="name" required value={universe.name}
                onChange={updateField}
                onBlur={validateForm}
                error={errors.name.length > 0}
                helperText={errors.name}
              />
            </FormControl>

            <FormControl className="mb-5">
              <TextField label="Max. Size" name="maxSize" type="number" required value={universe.maxSize}
                onChange={updateField}
                onBlur={validateForm}
                error={errors.maxSize.length > 0}
                helperText={errors.maxSize}
              />
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