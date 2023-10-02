/* export const fetchMock(url, options) {
    // Simula la respuesta de la API mock con una promesa.
    return new Promise((resolve, reject) => {
      // Comprueba la URL y las opciones para determinar cómo debe responder la API mock.
      if (url === 'http://localhost:8080/login' && options.method === 'POST') {
        // Simula una respuesta exitosa con un array de usuarios.
        const mockResponse = [
          {
            id: 1,
            username: 'grace.hopper',
            email: 'grace.hopper@systers.xyz',
          },
        ];
        resolve(mockResponse);
      } else {
        // Simula un error si la URL u opciones no coinciden con lo esperado.
        reject(new Error('Solicitud no válida a la API mock'));
      }
    });
  } */
  
  // Define la función que realiza la solicitud POST y devuelve una promesa Promise<LoginUser[]>.
/*   function LoginUser(email, password) {
    const url = 'http://localhost:8080/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
   */