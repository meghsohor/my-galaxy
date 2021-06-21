import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

export async function getUniverses() {
  return API.get('universes')
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export async function getUniversesWithStarCount() {
  try {
    const stars = await getStars();

    return API.get('universes')
      .then(({ data }) => {
        if (data.length > 0) {
          const universes = data.map(universe => ({ ...universe, curSize: stars.filter(i => i.universeId === universe.id).length }));
          return universes;
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

export async function getUniverse(id) {
  return API.get(`universes/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

export async function addUniverse(data) {
  return API.post(`universes`, data)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

export async function updateUniverse(data) {
  return API.put(`universes/${data.id}`, data)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}
export async function deleteUniverse(id) {
  return API.delete(`universes/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

export async function getStars() {
  return API.get('stars')
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

export async function getStarsWithUniverseName() {
  try {
    const universes = await getUniverses();

    return API.get('stars')
      .then(({ data }) => {
        if (data.length > 0) {
          const stars = data.map(star => ({ ...star, universe: universes.find(i => i.id === star.universeId).name }));
          return stars
        }
      })
      .catch(error => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
}


export async function getStar(id) {
  return API.get(`stars/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

export async function getStarWithUniverse(id) {
  try {
    const star = await getStar(id);
    if (star) {
      const universe = await getUniverse(star.universeId);
      const starWithUniverse = { ...star, universe: universe.name };
      return starWithUniverse;
    }
    return null;

  } catch (error) {
    throw new Error(error);
  }
}

export async function addStar(data) {
  return API.post(`stars`, data)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

export async function updateStar(data) {
  return API.put(`stars/${data.id}`, data)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}
export async function deleteStar(id) {
  return API.delete(`stars/${id}`)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}

export async function getColors() {
  return API.get(`colors`)
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return null;
    });
}