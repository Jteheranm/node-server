¿Qué sucedió al usar async y await?

al usar async y await pudimos ver que que las funciones asincronas se comportan de manera mas sincronica lo que hace que el codigo sea mas facil de entender, como si
trabajaramos en un codigo sincrono, sin bloquear el hilo principal

¿Qué sucedió al usar el método then?

al usar el metodo then, observamos que igual las promesas se resuelven pero sin embargo, la forma de trabajar este metodo resulta ser un estilo mas anidado, lo que hace que el codigo
sea menos legible a medida de que la cantidad de operaciones asincronas aumenten, este metodo es mejor usarlo en situaciones donde no resulte conveniente usar el metodo async y await

¿Qué diferencias encontraste entre async, await y el método then()?

A diferencia del metodo then el metodo async y await proporciona un estilo de codificacion mas similar a la programacion sincrona y hace que el codigo sea mas facil de entender, async y await tambien manejan automaticamente las exepciones lo que facilita el manejo de errores, por su parte el metodo then como es una forma antigua de trabajar con promesas resulta un estilo anidado, lo que hacer el codigo menos legible.
