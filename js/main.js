// Constante
const headers = {
        'Content-type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdG9scXB4Y3l1eXBxdG1uemlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU2MDMyNTYsImV4cCI6MTk2MTE3OTI1Nn0.uzSvnkm6SV3kt97XytwcnISZlGeX17gVQwClv34vEWQ',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmdG9scXB4Y3l1eXBxdG1uemlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU2MDMyNTYsImV4cCI6MTk2MTE3OTI1Nn0.uzSvnkm6SV3kt97XytwcnISZlGeX17gVQwClv34vEWQ',
        'Range': '0-9'
    }

Vue.createApp({
    data() {
        return {
            peliculas: [],
            APIUrl: 'https://vftolqpxcyuypqtmnzid.supabase.co/rest/v1/Pelicula-equipo',
            verFormAnyadir: false,
            nuevoNombre: '',
            nuevaDuracion: '',
            isLoading: false,
            peliculasEditables: -1,
            editarNombre: '',
            editarDuracion: '',
            numeroResultadosPorPagina: 5,
            pag: 1,
            paginadorRangoInicio: 0,
            paginadorRangoFinal: 9
        }
    },
    methods: {
        getHeader
        getPeliculas: async function () {
            this.isLoading = true;
            const fetchPeliculas = await fetch(`${this.APIUrl}?select=*`, { headers });
            this.peliculas = await fetchPeliculas.json();
            this.isLoading = false;
        },
        addPelicula: async function() {
            this.isLoading = true;
            // Ocultar el formulario
            this.verFormAnyadir = false;
            // Anyadir la pelicula a la base de datos
            const fetchPeliculas = await fetch(this.APIUrl,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({"name": this.nuevoNombre, "duration": this.nuevaDuracion})
                }
            );
            // Reiniciamos formulario
            this.nuevoNombre = '';
            this.nuevaDuracion = '';
            // Obtenemos de nuevo las peliculas
            this.getPeliculas();
            this.isLoading = false;
        },
        deletePelicula: async function (id) {
            // Borramos de la base de datos
            await fetch(`${this.APIUrl}?id=eq.${id}`,
                {
                    headers: headers,
                    method: 'DELETE'
                }
            );
            this.getPeliculas();
        },
        verEditarPelicula: function(id) {
            // Mostramos el campo a editar
            this.peliculasEditables = id;
            // Obtenemos la informacion
            const peliculaAEditar = this.peliculas.filter(function(pelicula) {
                return pelicula.id === id;
            })[0];
            // Mostramos datos
            this.editarNombre = peliculaAEditar.name;
            this.editarDuracion = peliculaAEditar.duration;
        },
        editarPelicula: async function(id) {
            this.isLoading = true;
            this.peliculasEditables = -1;
            const fetchPeliculas = await fetch(`${this.APIUrl}?id=eq.${id}`,
                {
                    headers: headers,
                    method: 'PATCH',
                    body: JSON.stringify({"name": this.editarNombre, "duration": this.editarDuracion})
                }
            );
            this.getPeliculas();
            this.isLoading = false;
        }
    },
    watch: {
        isLoading(value) {
            if(value) {
                NProgress.start();
            } else {
                NProgress.done();
            }
        }
    },
    mounted: function () {
        this.getPeliculas();
    }
}).mount('#app')
