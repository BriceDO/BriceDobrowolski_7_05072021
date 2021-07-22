<template>
    <div>
        <div class="card mb-5 mt-5">
        <div class="card-body">
            <div class="tab-content" id="myTabContent">
                    <div class="form-group">
                        <p>Bonjour (prenom) !</p>
                        <textarea class="form-control" id="message" rows="3" placeholder="Quelque chose à dire ?"></textarea>
                    </div>
            </div>
            <div class="btn-toolbar justify-content-between">
                    <form>
                        <div class="form-group">
                            <input type="file" class="form-control-file" id="exampleFormControlFile1">
                        </div>
                    </form>
                        <button type="submit" class="btn btn-primary me-2 mt-2">Partager</button>
            </div>
        </div>
    </div>

    </div>
</template>

<script>

export default {
    name:'CreateArticle',
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>