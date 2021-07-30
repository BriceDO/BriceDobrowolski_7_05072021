<template> 
    <div>
        <div class="container">
            <p class="text-right mt-3"><router-link :to="{name: 'allArticles'}">Retour au fil d'actualité</router-link></p>
            <div class="row">
                <div class="col">
                    <div class="card mb-3">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                                    </div>
                                    <div>
                                        <div class="ms-3 text-muted">prénom, nom</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> Le date</div>
                                <a class="card-link" href="#">
                                    <h5 class="card-title"><router-link to="/" >titre</router-link></h5>
                                </a>
                                <p class="card-text">contenu</p>
                                <div>
                                    <img src="https://picsum.photos/50/50" class="img-fluid img-thumbnail rounded mx-auto d-block" alt="" >
                                </div>
                            </div>
                            <div class="card-footer border-bottom">
                                <i class="fa fa-comment "></i>
                                <span class="card-link ms-2 ">nb commentaire</span>
                            </div>
                        </div>
                    </div>   
                <div class="container mt-2 mb-2">   
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-10">
                            <div class="d-flex flex-row align-items-center add-comment p-2 bg-white rounded">
                                <img class="rounded-circle" src="https://i.imgur.com/QvDFBCC.jpg" width="40">
                                <input type="text" class="form-control border-0 no-box-shadow ml-1" placeholder="Votre commentaire...">
                            </div>
                            <div class="p-3 bg-white mt-2 rounded">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex flex-row"><img class="rounded-circle me-2" src="https://i.imgur.com/Yxje2El.jpg" width="25%">
                                        <div class="d-flex flex-column ml-2">
                                            <span class="ms-1">Prenom Nom</span>
                                            <small class="ms-1 text-muted"> <i class="fa fa-clock-o"></i> Date</small>
                                        </div>
                                    </div>
                                        <b-dropdown id="dropdown-dropleft" dropleft variant="primary" class="m-2 float-right">
                                            <b-dropdown-item href="#">Modifier</b-dropdown-item>
                                            <b-dropdown-item href="#">Supprimer</b-dropdown-item>
                                        </b-dropdown>
                                </div>
                                    <div class="text-justify mt-2">
                                        <p>Contenu.</p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OneArticle',
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>