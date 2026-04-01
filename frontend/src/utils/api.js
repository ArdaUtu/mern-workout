const API_BASE_URL = 'http://localhost:4000/api/workouts';

function xhrRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', url, true);

    const headers = options.headers || {};
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = () => {
      const responseText = xhr.responseText || '';
      let data = null;

      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch {
        data = responseText;
      }

      resolve({
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        data
      });
    };

    xhr.onerror = () => {
      reject(new Error('De backend is niet bereikbaar'));
    };

    xhr.send(options.body || null);
  });
}

async function request(path = '', options = {}) {
  const url = `${API_BASE_URL}${path}`;

  if (typeof fetch === 'function') {
    const response = await fetch(url, options);
    const text = await response.text();

    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    return {
      ok: response.ok,
      status: response.status,
      data
    };
  }

  return xhrRequest(url, options);
}

export async function getWorkouts() {
  return request();
}

export async function createWorkout(workout) {
  return request('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workout)
  });
}

export async function updateWorkoutById(id, workout) {
  return request(`/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workout)
  });
}

export async function deleteWorkoutById(id) {
  return request(`/${id}`, {
    method: 'DELETE'
  });
}
