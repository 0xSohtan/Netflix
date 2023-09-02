export default function handler(req, res) {

  const list = {
    series: [
      {
        title: 'Detectiv Conan',
        link_url: 'detectiv-conan',
        thumbnail: 'https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/Episodes.jpeg',
        description: '',
        episodeNumbers: '',       
        episode: [
          { id: 3, title: "Die Doppelgängering", thumbnail: '', description: "Beschreibung von Film A", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/003%20Detektiv%20Conan%20Die%20Doppelg%C3%A4ngerin.mp4" },
          { id: 4, title: "Auf Schatzsuche", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/004%20Detektiv%20Conan%20Auf%20Schatzsuche.mp4" },
          { id: 11, title: "Mord bei Mondschein", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/011%20Detektiv%20Conan%20Mord%20bei%20Mondschein.mp4" },
          { id: 12, title: "Der Schein trügt", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/12%20Detektiv%20Conan%20Der%20Schein%20tr%C3%BCgt.mp4" },
          { id: 15, title: "Der Tote im Badezimmer", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/15%20Detektiv%20Conan%20Der%20Tote%20im%20Badezimmer.mp4" },
          { id: 17, title: "Eine Nacht im Kaufhaus", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/17%20Detektiv%20Conan%20Eine%20Nacht%20im%20Kaufhaus.mp4" },
          { id: 20, title: "Eine gespenstische Entdeckung", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/20%20Detektiv%20Conan%20Eine%20gespenstische%20Entdeckung.mp4" },
          { id: 22, title: "Das Albtraumschiff (1)", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/22%20Detektiv%20Conan%20Das%20Albtraumschiff%20(1).mp4" },
          { id: 23, title: "Das Albtraumschiff (2)", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/23%20Detektiv%20Conan%20Das%20Albtraumschiff%20(2).mp4" },
          { id: 33, title: "Der Schatz der Erfahrung", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/33%20Detektiv%20Conan%20Der%20Schatz%20der%20Erfahrung.mp4" },
          { id: 34, title: "Die Mumie im Wald (1)", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/34%20Detektiv%20Conan%20Die%20Mumie%20im%20Wald%20(1).mp4" },
          { id: 35, title: "Die Mumie im Wald (2)", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/35%20Detektiv%20Conan%20Die%20Mumie%20im%20Wald%20(2).mp4" },
          { id: 38, title: "Feuer und Flamme", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/38%20Detektiv%20Conan%20Feuer%20und%20Flamme.mp4" },
          { id: 39, title: "Geld stinkt nicht (1)", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/39%20Detektiv%20Conan%20Geld%20stinkt%20nicht%20(1).mp4" },
          { id: 40, title: "Geld stinkt nicht (2)", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/40%20Detektiv%20Conan%20Geld%20stinkt%20nicht%20(2).mp4" },
          { id: 46, title: "Mediziner unter sich", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/46%20Detektiv%20Conan%20Mediziner%20unter%20sich.mp4" },
          { id: 50, title: "Der verschwundene Bibliothekar", thumbnail: '', description: "Beschreibung von Film B", url: "https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/50%20Detektiv%20Conan%20Der%20verschwundene%20Bibliothekar.mp4" },
        ]
      }
    ],

    movies: [
      {
        title: 'Detectiv Conan Movies',
        link_url: 'detectiv-conan',
        thumbnail: 'https://shdw-drive.genesysgo.net/BiVmb2T6GY3vWNWYg8ojh1Tjyeiejkot8ZNB7WwRJWAL/Movies.jpeg',
        description: '',
        movieNumber: '',
        movies: [
          { id: 1 }
        ]
      }
    ]
  }

    ;

  res.status(200).json(list);
}






