// Constante
const headers = {
        'Content-type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eGV6cGhjb2lpcGphb2d4bnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU0MzgzMjksImV4cCI6MTk2MTAxNDMyOX0.RaIi-WWMMgSq9I7pPvV8JDr7dC7e6M1XvEjY186DVIM',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50eGV6cGhjb2lpcGphb2d4bnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU0MzgzMjksImV4cCI6MTk2MTAxNDMyOX0.RaIi-WWMMgSq9I7pPvV8JDr7dC7e6M1XvEjY186DVIM'
    }

Vue.createApp({
    data() {
        return {
            APIURL: 'https://ntxezphcoiipjaogxnzi.supabase.co/rest/v1/peliculas',
            peliculas:[],
            verForm: false,
            nuevoNombre:'',
            nuevaDuracion:'',
            isLoading: false,
            peliculasEditables: -1
        }
    },
    methods: {
        getPeliculas: async function () {
            this.isLoading = true
            const fetchPeliculas = await fetch(`${this.APIURL}?select=*`, { headers });
            this.peliculas = await fetchPeliculas.json();
            this.isLoading = false
        },
        addPeliculas: async function () {
            this.isLoading = true
            // OCultar el Formulario
            this.verForm = false;
            //Añadir la pelicula a la base de datos
            const fetchPeliculas = await fetch(this.APIURL,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({"name":this.nuevoNombre, "duration": this.nuevaDuracion})
                });
            // Reiniciamos formulario
            this.nuevoNombre = '';
            this.nuevaDuracion = '';
            this.getPeliculas();
            this.isLoading = false

        },
        deletePelicula: async function (id) {
            // Borramos de la base de datos
             await fetch(`${this.APIURL}?id=eq.${id}`,
                {
                    headers: headers,
                    method: 'DELETE'
                }
            );
            this.getPeliculas();
        },

    },
    watch: {
        isLoading(value){
            if(value){
                NProgress.start()
            } else {
                NProgress.done();
            }
        }
    },
    mounted: function () {
        this.getPeliculas ()
    }
}).mount('#app')